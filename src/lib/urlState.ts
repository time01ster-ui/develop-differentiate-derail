// URL-state persistence (TOOLING.md §6.3: "Supabase or URL state — never
// localStorage alone"). The URL hash is the source of truth so a student can
// resume on any managed/shared device and a teacher can share a replay link.
// localStorage is used only as a same-device convenience mirror, never alone.

import type { LoopState } from '../state/loop'
import type { ActId, Distance, QChoice, RunStage, Theme, VGroup } from '../content/types'

const LS_KEY = 'ddd_act1_v1'

export function encodeState(s: LoopState): string {
  const p = new URLSearchParams()
  if (s.act !== 'develop') p.set('a', s.act)
  if (s.started) p.set('go', '1')
  if (s.libraryDone) p.set('lib', '1')
  p.set('s', String(s.step))
  p.set('t', s.theme)
  if (s.qChoice) p.set('q', s.qChoice)
  if (s.hypChoice) p.set('h', s.hypChoice)
  if (s.rungs.length) p.set('r', s.rungs.join(','))
  const hir = (s.hired.operator ? 'o' : '') + (s.hired.interpreter ? 'i' : '')
  if (hir) p.set('hir', hir)
  p.set('c', s.control ? '1' : '0')
  p.set('rep', String(s.replicates))
  if (s.distance) p.set('d', s.distance)
  if (s.modelLabeled) p.set('ml', '1')
  p.set('run', s.runStage)
  p.set('g', s.vGroup)
  p.set('e', String(s.vEmbryo))
  if (s.measuredGroups.length) p.set('mg', s.measuredGroups.join(','))
  // Act II bench: 0..1 sliders stored as 0..100 ints
  p.set('st', String(Math.round(s.stiffness * 100)))
  p.set('sh', String(Math.round(s.shape * 100)))
  if (s.benchSampled) p.set('bs', '1')
  if (s.claim) p.set('cl', s.claim)
  return p.toString()
}

const THEMES: Theme[] = ['darkfield', 'spectral', 'amber']
const ACTS: ActId[] = ['develop', 'differentiate', 'derail']
const QS: QChoice[] = ['broad', 'testable', 'vague']
const RUN: RunStage[] = ['idle', 'segmented', 'measured']
const GROUPS: VGroup[] = ['treat', 'ctrl']
const DISTS: Distance[] = ['2d', '3d']

function intIn(v: string | null, lo: number, hi: number, dflt: number): number {
  const n = v == null ? NaN : parseInt(v, 10)
  return Number.isFinite(n) && n >= lo && n <= hi ? n : dflt
}

export function decodeState(raw: string): Partial<LoopState> {
  const p = new URLSearchParams(raw)
  const out: Partial<LoopState> = {}
  const a = p.get('a')
  if (a && (ACTS as string[]).includes(a)) out.act = a as ActId
  if (p.has('go')) out.started = p.get('go') === '1'
  if (p.has('lib')) out.libraryDone = p.get('lib') === '1'
  const hir = p.get('hir') ?? ''
  out.hired = { operator: hir.includes('o'), interpreter: hir.includes('i') }
  out.step = intIn(p.get('s'), 0, 7, 0)
  const t = p.get('t')
  if (t && (THEMES as string[]).includes(t)) out.theme = t as Theme
  const q = p.get('q')
  if (q && (QS as string[]).includes(q)) out.qChoice = q as QChoice
  // hypothesis + claim ids are per-act free strings (validated by the act when rendered)
  const h = p.get('h')
  if (h) out.hypChoice = h
  const r = p.get('r')
  if (r) out.rungs = r.split(',').filter(Boolean)
  if (p.has('c')) out.control = p.get('c') === '1'
  out.replicates = intIn(p.get('rep'), 1, 6, 2)
  const d = p.get('d')
  if (d && (DISTS as string[]).includes(d)) out.distance = d as Distance
  if (p.has('ml')) out.modelLabeled = p.get('ml') === '1'
  const run = p.get('run')
  if (run && (RUN as string[]).includes(run)) out.runStage = run as RunStage
  const g = p.get('g')
  if (g && (GROUPS as string[]).includes(g)) out.vGroup = g as VGroup
  const mg = p.get('mg')
  if (mg) out.measuredGroups = mg.split(',').filter((x): x is VGroup => (GROUPS as string[]).includes(x))
  out.vEmbryo = intIn(p.get('e'), 0, 5, 0)
  if (p.has('st')) out.stiffness = intIn(p.get('st'), 0, 100, 50) / 100
  if (p.has('sh')) out.shape = intIn(p.get('sh'), 0, 100, 50) / 100
  if (p.has('bs')) out.benchSampled = p.get('bs') === '1'
  const cl = p.get('cl')
  if (cl) out.claim = cl
  return out
}

/** Load persisted state: URL hash wins, else the localStorage mirror. */
export function loadPersisted(): Partial<LoopState> | null {
  if (typeof window === 'undefined') return null
  const hash = window.location.hash.replace(/^#/, '')
  if (hash) return decodeState(hash)
  try {
    const ls = window.localStorage.getItem(LS_KEY)
    if (ls) return decodeState(ls)
  } catch {
    /* storage may be blocked on managed devices — fine, we never rely on it alone */
  }
  return null
}

/** Persist to URL (source of truth) and mirror to localStorage (convenience). */
export function persist(s: LoopState): void {
  if (typeof window === 'undefined') return
  const enc = encodeState(s)
  try {
    window.history.replaceState(null, '', '#' + enc)
  } catch {
    /* ignore */
  }
  try {
    window.localStorage.setItem(LS_KEY, enc)
  } catch {
    /* ignore */
  }
}
