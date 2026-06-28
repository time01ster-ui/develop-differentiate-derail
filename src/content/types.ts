// Shared types for the discovery loop. Kept separate so content (act1.ts) and
// the engine (state/loop.ts) can both import without a circular dependency.

export type Theme = 'darkfield' | 'spectral' | 'amber'
/** Which of the three acts is loaded. The engine + chrome are shared; each act
 *  supplies its own content pack (see content/registry.ts). */
export type ActId = 'develop' | 'differentiate' | 'derail'
export type RunStage = 'idle' | 'segmented' | 'measured'
export type VGroup = 'treat' | 'ctrl'
export type QChoice = 'broad' | 'testable' | 'vague'
/** A hypothesis option id. Universal across acts (each act defines its own ids),
 *  so this is a plain string rather than an Act-I-only union. */
export type HypChoice = string
export type Distance = '2d' | '3d'
/** A claim option id. Universal across acts (each act defines its own ids). */
export type ClaimId = string
export type ClaimResult = 'valid' | 'blocked'

export interface Rung {
  id: string
  lvl: number
  name: string
  tools: string
  /** CSS custom-property name for the rung color, e.g. '--c-blue'. */
  cv: string
  avail: boolean
}

export interface QuestionOpt {
  id: QChoice
  tag: string
  text: string
  note: string
}

export interface HypothesisOpt {
  id: HypChoice
  text: string
  /** The falsifiable prediction revealed when selected. */
  prediction: string
}

export interface ClaimOpt {
  id: ClaimId
  /** Minimum ladder rung required to support this claim. */
  req: number
  text: string
}

/** A dramatic act-opening story, shown before step 1, that sets up the act
 *  through what a scientist observed (clues), without giving the mechanism away. */
export interface ActStoryContent {
  kicker: string
  title: string
  paragraphs: string[]
  /** Scaffolding pointers ("how to crack this case"): work in teams, draw the
   *  pathway, read deeper in the notebooks, plus a clue toward the answer. */
  clues?: string[]
  /** Optional Library chapter id the "open the notebooks" button jumps to. */
  libraryRef?: string
  /** Act-specific label for the notebook button (names that act's notebook). */
  notebookLabel?: string
}
