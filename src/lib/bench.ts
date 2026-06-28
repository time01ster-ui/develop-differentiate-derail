// The Act II mechanotransduction bench: a deterministic MODEL of how a model
// crest cell's mechanics bias its fate. It is explicitly a model the student
// sets by hand, not a measurement of Mateo's tissue (that honesty is the whole
// point of Act II, and why the in-vivo force rung stays locked).
//
// Science guardrails baked into the math:
//  - Nuclear YAP/TAZ rises with BOTH substrate stiffness AND cell spread, never
//    with a single stiffness number alone (a round, confined cell on firm matrix
//    keeps YAP/TAZ cytoplasmic). Shape gates what stiffness can do.
//  - Firm + spread biases the bone program (RUNX2 over the Sox9 cartilage
//    default), with the canonical YAP/TAZ targets CTGF and CYR61 rising alongside.
//  - The mapping is a tendency under a set of conditions, not a clean one-way law.

export type Fate = 'bone' | 'cartilage'

export interface BenchReadout {
  stiffness: number // 0..1 input
  shape: number // 0..1 input (round/confined -> flat/spread)
  nuclear: number // 0..1 nuclear YAP/TAZ fraction
  fate: Fate
  confidence: number // 0..1 how decisive the lean is
  ctgf: number // 0..1 CTGF (CCN2) target activity
  cyr61: number // 0..1 CYR61 (CCN1) target activity
}

const clamp01 = (x: number): number => Math.max(0, Math.min(1, x))

/**
 * The core model. `gate` encodes confinement: a round cell (shape -> 0) cannot
 * build the actomyosin tension that drives YAP/TAZ inward, so even firm matrix
 * gives only a weak nuclear signal. Both inputs must be high for a bone lean.
 */
export function bench(stiffness: number, shape: number): BenchReadout {
  const s = clamp01(stiffness)
  const h = clamp01(shape)
  const base = 0.5 * s + 0.5 * h // both inputs contribute
  const gate = 0.45 + 0.55 * h // shape gates how much the cell can pull
  const nuclear = clamp01(base * gate)
  const fate: Fate = nuclear > 0.5 ? 'bone' : 'cartilage'
  const confidence = clamp01(Math.abs(nuclear - 0.5) * 2)
  const ctgf = clamp01(nuclear * 0.98 + 0.01)
  const cyr61 = clamp01(nuclear * 0.9 + 0.05)
  return { stiffness: s, shape: h, nuclear, fate, confidence, ctgf, cyr61 }
}

/**
 * Deterministic per-run jitter (no Math.random, so runs are reproducible and
 * SSR/replay safe). A small hash on the run index nudges the nuclear fraction so
 * the Analyze stage can show that AGREEMENT ACROSS RUNS, not one dramatic drag,
 * is what counts. The jitter is small (+/- ~0.05), so a decisive setting still
 * clusters and a borderline one scatters across the 0.5 line.
 */
function jitter(i: number): number {
  const x = Math.sin((i + 1) * 12.9898) * 43758.5453
  return (x - Math.floor(x) - 0.5) * 0.1 // ~[-0.05, 0.05]
}

/** Nuclear YAP/TAZ fraction for each of `runs` replicate model runs at a setting. */
export function benchReplicates(stiffness: number, shape: number, runs: number): number[] {
  const center = bench(stiffness, shape).nuclear
  return Array.from({ length: Math.max(1, runs) }, (_, i) => clamp01(center + jitter(i)))
}

/** Fraction of replicate runs that agree with the central fate call (0..1). */
export function benchAgreement(stiffness: number, shape: number, runs: number): number {
  const central = bench(stiffness, shape).fate
  const reps = benchReplicates(stiffness, shape, runs)
  const agree = reps.filter((n) => (n > 0.5 ? 'bone' : 'cartilage') === central).length
  return agree / reps.length
}
