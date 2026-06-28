/**
 * measure.ts — the genuine in-browser measurement + statistics layer.
 *
 * These pure functions are ported VERBATIM from the hi-fi design prototype
 * (`Develop — Act I.dc.html`). They are correct and must not be "improved":
 * the Welch t-test and the regularized incomplete-beta p-value are what make
 * the statistics real rather than faked, and the whole pseudoreplication
 * lesson depends on `pooledWelch` vs `perEmbryoWelch` giving different answers.
 *
 * In the real app (per TOOLING.md §5) `genEmbryo` is the one deliberate
 * placeholder: it synthesizes a faithful nuclei field with a seeded RNG
 * instead of segmenting a real micrograph. Everything downstream consumes the
 * same `{x, y}` point interface, so swapping in Cellpose centroids later
 * leaves the geometry/stats untouched.
 */

export interface Pt {
  x: number
  y: number
}

/** Deterministic RNG so embryos are reproducible across reloads/devices. */
export function mulberry32(a: number): () => number {
  return function () {
    a |= 0
    a = (a + 0x6d2b79f5) | 0
    let t = Math.imul(a ^ (a >>> 15), 1 | a)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

/**
 * Synthesize one embryo's nuclei field.
 * ordered = FN1-rich: Poisson-disc-ish dart-throwing → regular spacing.
 * !ordered = control: uniform random → denser, irregular.
 */
export function genEmbryo(seed: number, ordered: boolean): Pt[] {
  const rng = mulberry32(seed)
  const pts: Pt[] = []
  if (ordered) {
    const minD = 0.055 + rng() * 0.027
    const n = Math.round(72 + rng() * 26)
    let tries = 0
    while (pts.length < n && tries < 9000) {
      const x = 0.04 + rng() * 0.92,
        y = 0.04 + rng() * 0.92
      let ok = true
      for (const q of pts) {
        const dx = x - q.x,
          dy = y - q.y
        if (dx * dx + dy * dy < minD * minD) {
          ok = false
          break
        }
      }
      if (ok) pts.push({ x, y })
      tries++
    }
  } else {
    const n = Math.round(96 + rng() * 54)
    for (let i = 0; i < n; i++) pts.push({ x: 0.03 + rng() * 0.94, y: 0.03 + rng() * 0.94 })
  }
  return pts
}

/** O(n²) nearest-neighbor distance per point. */
export function nnDistances(pts: Pt[]): number[] {
  const out: number[] = []
  for (let i = 0; i < pts.length; i++) {
    let m = Infinity
    for (let j = 0; j < pts.length; j++) {
      if (i === j) continue
      const dx = pts[i].x - pts[j].x,
        dy = pts[i].y - pts[j].y
      const d = Math.sqrt(dx * dx + dy * dy)
      if (d < m) m = d
    }
    out.push(m)
  }
  return out
}

export function mean(a: number[]): number {
  return a.reduce((s, x) => s + x, 0) / a.length
}

/** Sample variance (n − 1). */
export function variance(a: number[]): number {
  const m = mean(a)
  return a.reduce((s, x) => s + (x - m) * (x - m), 0) / (a.length - 1)
}

export function gammaln(x: number): number {
  const c = [
    76.18009172947146, -86.50532032941677, 24.01409824083091, -1.231739572450155,
    0.1208650973866179e-2, -0.5395239384953e-5,
  ]
  let y = x,
    t = x + 5.5
  t -= (x + 0.5) * Math.log(t)
  let s = 1.000000000190015
  for (let j = 0; j < 6; j++) {
    y += 1
    s += c[j] / y
  }
  return -t + Math.log((2.5066282746310005 * s) / x)
}

export function betacf(a: number, b: number, x: number): number {
  const MAX = 100,
    EPS = 3e-7,
    FP = 1e-30
  let qab = a + b,
    qap = a + 1,
    qam = a - 1,
    c = 1,
    d = 1 - (qab * x) / qap
  if (Math.abs(d) < FP) d = FP
  d = 1 / d
  let h = d
  for (let m = 1; m <= MAX; m++) {
    const m2 = 2 * m
    let aa = (m * (b - m) * x) / ((qam + m2) * (a + m2))
    d = 1 + aa * d
    if (Math.abs(d) < FP) d = FP
    c = 1 + aa / c
    if (Math.abs(c) < FP) c = FP
    d = 1 / d
    h *= d * c
    aa = (-(a + m) * (qab + m) * x) / ((a + m2) * (qap + m2))
    d = 1 + aa * d
    if (Math.abs(d) < FP) d = FP
    c = 1 + aa / c
    if (Math.abs(c) < FP) c = FP
    d = 1 / d
    const del = d * c
    h *= del
    if (Math.abs(del - 1) < EPS) break
  }
  return h
}

/** Regularized incomplete beta function → the t-distribution p-value. */
export function betai(a: number, b: number, x: number): number {
  if (x <= 0) return 0
  if (x >= 1) return 1
  const bt = Math.exp(
    gammaln(a + b) - gammaln(a) - gammaln(b) + a * Math.log(x) + b * Math.log(1 - x),
  )
  if (x < (a + 1) / (a + b + 2)) return (bt * betacf(a, b, x)) / a
  return 1 - (bt * betacf(b, a, 1 - x)) / b
}

export interface WelchResult {
  t: number
  df: number
  p: number
}

/** Welch's unequal-variance t-test (two-sided p). */
export function welch(a: number[], b: number[]): WelchResult {
  const ma = mean(a),
    mb = mean(b),
    va = variance(a),
    vb = variance(b),
    na = a.length,
    nb = b.length
  const se = Math.sqrt(va / na + vb / nb)
  const t = Math.abs((ma - mb) / se)
  const df =
    Math.pow(va / na + vb / nb, 2) /
    ((va * va) / (na * na * (na - 1)) + (vb * vb) / (nb * nb * (nb - 1)))
  const p = betai(df / 2, 0.5, df / (df + t * t))
  return { t, df, p }
}

export function fmtP(p: number): string {
  if (p < 0.001) return '< 0.001'
  if (p < 0.01) return p.toFixed(4)
  return p.toFixed(3)
}

// ---- Experiment-level helpers (aggregate the per-embryo geometry) ----

export interface ExperimentData {
  reps: number
  treat: Pt[][]
  ctrl: Pt[][]
}

/**
 * Generate (and the caller caches) one experiment for a given replicate count.
 * Seeds match the prototype exactly so results are identical run-to-run.
 */
export function buildExperiment(reps: number): ExperimentData {
  const treat: Pt[][] = []
  const ctrl: Pt[][] = []
  for (let i = 0; i < reps; i++) {
    treat.push(genEmbryo(1009 + i * 37, true))
    ctrl.push(genEmbryo(6007 + i * 53, false))
  }
  return { reps, treat, ctrl }
}

/** Pooled "every cell counts" test — the pseudoreplication trap. */
export function pooledWelch(data: ExperimentData): WelchResult {
  const treatAll = ([] as number[]).concat(...data.treat.map(nnDistances))
  const ctrlAll = ([] as number[]).concat(...data.ctrl.map(nnDistances))
  return welch(treatAll, ctrlAll)
}

/** Honest per-embryo test — one mean per embryo is the real n. */
export function perEmbryoWelch(data: ExperimentData): WelchResult {
  const treatMeans = data.treat.map((e) => mean(nnDistances(e)))
  const ctrlMeans = data.ctrl.map((e) => mean(nnDistances(e)))
  return welch(treatMeans, ctrlMeans)
}

export function embryoMeans(embryos: Pt[][]): number[] {
  return embryos.map((e) => mean(nnDistances(e)))
}

export function pooledCellCount(data: ExperimentData): number {
  return (
    data.treat.reduce((s, e) => s + e.length, 0) + data.ctrl.reduce((s, e) => s + e.length, 0)
  )
}
