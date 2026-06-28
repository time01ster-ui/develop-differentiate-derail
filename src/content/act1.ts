// Act I "Develop" content, every string is the single source of truth, lifted
// verbatim from the hi-fi prototype. Acts II/III will provide sibling content
// modules consumed by the same engine + components.

import type { ClaimOpt, HypothesisOpt, QuestionOpt, Rung, Theme } from './types'

export const THEME_ORDER: Theme[] = ['darkfield', 'spectral', 'amber']

/** Accent swatch per theme (for the LOOK switcher). Matches tokens.css --accent. */
export const THEME_ACCENT: Record<Theme, string> = {
  darkfield: '#37cfe6',
  spectral: '#a78bfa',
  amber: '#f0a830',
}

export const STAGE_LABELS = [
  'Ask',
  'Hypothesize',
  'Choose tools',
  'Design',
  'Run / Measure',
  'Analyze',
  'Conclude',
  'Iterate',
] as const

export const RUNGS: Rung[] = [
  { id: 'spatial', lvl: 1, name: 'Spatial layout', tools: 'Cellpose · Voronoi · nearest-neighbor', cv: '--c-blue', avail: true },
  { id: 'ecm', lvl: 2, name: 'ECM architecture', tools: 'FN1 profile · fiber alignment', cv: '--c-green', avail: true },
  { id: 'migration', lvl: 3, name: 'Migration dynamics', tools: 'live imaging · strain maps', cv: '--c-amber', avail: true },
  { id: 'molforce', lvl: 4, name: 'Molecular force', tools: 'FRET tension sensors', cv: '--c-pink', avail: false },
  { id: 'tissue', lvl: 5, name: 'Tissue mechanics', tools: 'AFM · Brillouin · magnetic actuation', cv: '--c-red', avail: false },
]

export const RUNG_NAMES: Record<number, string> = {
  0: 'No tools selected',
  1: 'Spatial layout',
  2: 'ECM architecture',
  3: 'Migration dynamics',
  4: 'Molecular force',
  5: 'Tissue mechanics',
}

export const RUNG_COLORS: Record<number, string> = {
  0: '--muted',
  1: '--c-blue',
  2: '--c-green',
  3: '--c-amber',
  4: '--c-pink',
  5: '--c-red',
}

export const QUESTIONS: QuestionOpt[] = [
  { id: 'broad', tag: 'TOO BROAD', text: 'Why do some babies have a cleft lip?', note: 'A real question, but you can’t measure “why” directly. Narrow it.' },
  { id: 'testable', tag: 'TESTABLE', text: 'Do neural crest cells space themselves non-randomly as they build the frontal bone?', note: 'Sharp, falsifiable, and measurable with geometry. This is the one.' },
  { id: 'vague', tag: 'TOO VAGUE', text: 'Is FN1 important in development?', note: '“Important” isn’t a measurement. What exactly would you compare?' },
]

export const HYPOTHESES: HypothesisOpt[] = [
  { id: 'fn1', text: 'A graded FN1 “road” directs neural crest migration, producing ordered nuclear spacing.', prediction: 'FN1-rich tissue shows larger, more regular spacing than FN1-blocked control.' },
  { id: 'chance', text: 'Spacing is set purely by chance, the cells land wherever they land.', prediction: 'no difference between FN1-rich and control.' },
  { id: 'shape', text: 'Spacing is dictated only by the skull’s final bone shape, downstream of the cells.', prediction: 'spacing is identical regardless of FN1.' },
]

export const CLAIMS: ClaimOpt[] = [
  { id: 'spaced', req: 1, text: 'Nuclei are non-randomly spaced in FN1-rich tissue compared to control.' },
  { id: 'migrate', req: 3, text: 'Neural crest cells migrate directionally along a graded FN1 cue.' },
  { id: 'tension', req: 4, text: 'FN1 generates the mechanical tension that orders the cells building the bone.' },
]

/**
 * Tap-to-reveal "why?" notes per rung (touch-first, no hover dependence).
 * The locked-rung text is grounded in the Atit-lab conversation: a direct force
 * measurement needs the instrument, a trained operator, AND an interpreter,  * plus tissue the method even works on, and that hardware is not in a browser
 * or a high-school classroom. This is what makes "spacing is the honest ceiling"
 * a real constraint, not an arbitrary game rule.
 */
export const RUNG_WHY: Record<string, string> = {
  spatial:
    'Free and honest: Cellpose finds nuclei, Voronoi + nearest-neighbor turn their positions into spacing numbers. It describes where cells sit, the bottom rung.',
  ecm:
    'Still describable in an image: stain FN1 and trace fiber alignment. Fibronectin runs low→high in the direction the cells grow, so you can map the road, but a road is not a force.',
  migration:
    'Now you need time, not just a snapshot: live imaging across E12.5→13.5 and strain maps. Doable, but it costs paid imaging and tracking you don’t have in the browser.',
  molforce:
    'Locked. FRET tension sensors report force between molecules, but they need transgenic reporters and subcellular live microscopy. Not available here.',
  tissue:
    'Locked. A direct stiffness/tension number (AFM · Brillouin · magnetic actuation) needs the instrument, a person trained to run it, AND a person who can interpret it, plus tissue it works on at all (AFM is usually dead tissue; most magnetic-actuation tools never became routine). None of that is in a browser. That is exactly why spacing stays your ceiling.',
}

/** Adaptive copy for the claim-ceiling panel, keyed on the reached ceiling. */
export function ceilNote(ceil: number): string {
  if (ceil === 0) return 'Select at least one instrument to set what you can claim.'
  if (ceil <= 2) return 'You can describe structure and spacing, not force or tension. The honest ceiling for this slice.'
  if (ceil === 3) return 'You can speak to directional movement, but still not mechanical force.'
  return 'You can make a force claim, backed by a real tension measurement.'
}

/** The pseudoreplication lesson paragraph; adapts to whether the honest test held. */
export function analyzeLesson(embSig: boolean, replicates: number): string {
  return embSig
    ? 'Both tests agree here, and the honest per-embryo test is the one you can trust, because its n is real embryos, not pooled cells. Do not read the agreement as proof that pooling was fine: the pooled number still overstates your evidence by counting hundreds of cells as if each were its own experiment.'
    : 'This is the trap. Pooling every cell makes the result look very strong, but the honest per-embryo test (n=' +
        replicates +
        ') can’t confirm it. The spacing pattern may be real, your evidence just isn’t strong enough to claim it yet.'
}

export const PINNED_QUOTE = 'Spatial organization is not the same thing as tension.'
