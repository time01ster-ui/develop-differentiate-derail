// The multi-act content registry. The discovery-loop engine (state/loop.ts) and
// the shared chrome (Stepper, StageChrome, ReflectionPanel, ToolsStage,
// ConcludeStage, App) are act-agnostic: they read the ACTIVE act's content pack
// from here via getAct(state.act) instead of importing one act's module directly.
//
// Each act assembles a pack from its own content modules. Act I "Develop" is the
// reference pack and is byte-for-byte the same data it always was; Acts II and
// III register alongside it. This is the seam that makes the trilogy one app.

import type { ActId, ActStoryContent, ClaimOpt, HypothesisOpt, QuestionOpt, Rung } from './types'
import type { ResourceConfig } from './resources'
import { ACT1_RESOURCE } from './resources'
import type { Illustration } from './illustrations'
import { STAGE_ILLUSTRATIONS } from './illustrations'
import type { StageReflection } from './reflect'
import { REFLECT } from './reflect'
import type { LibraryChapter, LibraryExtension } from './library'
import { EXTENSIONS, LIBRARY, LIBRARY_FOR_STAGE, READ_BEFORE_CHOOSING } from './library'
import {
  CLAIMS,
  HYPOTHESES,
  PINNED_QUOTE,
  QUESTIONS,
  RUNGS,
  RUNG_COLORS,
  RUNG_NAMES,
  RUNG_WHY,
  STAGE_LABELS,
  ceilNote,
} from './act1'
import { ACT1_STORY, PASS_LINE, PROCESS_STEPS, STAGE_BRIEF, STAGE_GOAL } from './story'
import { ACT2 } from './act2'
import { ACT3 } from './act3'

/** Everything the shared engine + chrome need to run one act. The data lives in
 *  the per-act content modules; this is just the aggregation they register. */
export interface ActContent {
  id: ActId
  /** 1, 2, 3 (for "Act II" style labels). */
  index: number
  /** "Develop" / "Differentiate" / "Derail". */
  shortTitle: string
  // ---- the Measurement Ladder + claims (engine: ceiling, claim gating) ----
  rungs: Rung[]
  rungNames: Record<number, string>
  rungColors: Record<number, string>
  rungWhy: Record<string, string>
  ceilNote: (ceil: number) => string
  pinnedQuote: string
  /** Prose under the pinned quote in the claim-ceiling aside (why the top rung
   *  stays out of reach, in this act's terms). */
  ceilingAside: string
  /** Short label for the ladder's bottom rung, shown in the Tools footer
   *  ("down arrow = <this> only"). Act-specific so it names the right rung. */
  ladderFooter: string
  questions: QuestionOpt[]
  hypotheses: HypothesisOpt[]
  claims: ClaimOpt[]
  resource: ResourceConfig
  // ---- chrome ----
  stageLabels: readonly string[]
  stageBrief: Record<number, string>
  /** The one concrete GOAL per step, shown words-first above the illustration. */
  stageGoal?: Record<number, string>
  /** The real lab pipeline behind Run/Measure, shown so students know what they measure. */
  processSteps?: { label: string; text: string }[]
  /** Optional dramatic act-opening story, shown before step 1 (sets up the act). */
  story?: ActStoryContent
  passLine: Record<number, string>
  stageIllustrations: Record<number, Illustration>
  reflect: Record<number, StageReflection>
  // ---- library ----
  chapters: LibraryChapter[]
  libraryForStage: Record<number, string>
  readBeforeChoosing: Set<number>
  extensions: LibraryExtension[]
}

const DEVELOP: ActContent = {
  id: 'develop',
  index: 1,
  shortTitle: 'Develop',
  rungs: RUNGS,
  rungNames: RUNG_NAMES,
  rungColors: RUNG_COLORS,
  rungWhy: RUNG_WHY,
  ceilNote,
  pinnedQuote: PINNED_QUOTE,
  ceilingAside: "Even with more money, you can't make a tension claim here: the machine isn't in this lab, and your embryo is alive.",
  ladderFooter: 'spatial spacing only',
  questions: QUESTIONS,
  hypotheses: HYPOTHESES,
  claims: CLAIMS,
  resource: ACT1_RESOURCE,
  stageLabels: STAGE_LABELS,
  stageBrief: STAGE_BRIEF,
  stageGoal: STAGE_GOAL,
  processSteps: PROCESS_STEPS,
  story: ACT1_STORY,
  passLine: PASS_LINE,
  stageIllustrations: STAGE_ILLUSTRATIONS,
  reflect: REFLECT,
  chapters: LIBRARY,
  libraryForStage: LIBRARY_FOR_STAGE,
  readBeforeChoosing: READ_BEFORE_CHOOSING,
  extensions: EXTENSIONS,
}

/** The registry. Acts register here; getAct() falls back to Develop so a stale
 *  persisted act id can never blank the screen. */
export const ACTS: Partial<Record<ActId, ActContent>> = {
  develop: DEVELOP,
  differentiate: ACT2,
  derail: ACT3,
}

export function getAct(id: ActId): ActContent {
  return ACTS[id] ?? DEVELOP
}

/** Stage labels are shared across acts (Ask, Hypothesize, ...), so the Stepper
 *  can read them without an act. */
export { STAGE_LABELS }
