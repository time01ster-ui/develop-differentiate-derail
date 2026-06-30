// The discovery-loop engine: a reducer over the 8-stage state machine. It is
// shared by all three acts. Only the content modules and the act-specific stage
// views differ; the reducer reads the active act's ladder/claims/economy from
// the content registry (getAct) so the same gates work for every act.

import { getAct } from '../content/registry'
import { NO_HIRES, type Hired } from '../content/resources'
import { remaining, rungStatus } from '../content/resources'
import type {
  ActId,
  ClaimId,
  ClaimResult,
  Distance,
  HypChoice,
  QChoice,
  RunStage,
  Theme,
  VGroup,
} from '../content/types'

export interface LoopState {
  act: ActId // which act is loaded (develop / differentiate / derail)
  started: boolean // has the student passed the onboarding card?
  libraryDone: boolean // has the student been through the Library study module?
  readingSubmitted: boolean // has the student submitted completed guided notes (earns the reading points)?
  step: number // 0..7
  theme: Theme
  qChoice: QChoice | null
  hypChoice: HypChoice | null
  rungs: string[] // selected rung ids; ceiling = max level among them
  hired: Hired // team you've paid for (operator / interpreter)
  control: boolean // must be true to pass Design (derived: the right negative control is chosen)
  controlChoices: string[] // Act I: which candidate control(s) the student selected (teaches what a control is)
  replicates: number // 1..6; must be >=3 to pass Design (embryos, or model runs in Act II)
  distance: Distance | null // Act I honesty label (2D vs 3D)
  modelLabeled: boolean // Act II honesty label: "this is a model, not Mateo's tissue"
  runStage: RunStage // Act I segmentation state
  everMeasured: boolean // Acts I/III: at least one field measured
  measuredGroups: VGroup[] // which groups have been measured (Act III gates on BOTH, to force the contrast)
  // ---- Act II mechanotransduction bench ----
  stiffness: number // 0..1 substrate stiffness (soft -> firm), a model range
  shape: number // 0..1 cell shape (round/confined -> flat/spread)
  benchSampled: boolean // has the student taken at least one bench reading?
  vGroup: VGroup // which group the canvas shows
  vEmbryo: number // index into replicates
  scanning: boolean
  claim: ClaimId | null
  claimResult: ClaimResult | null
}

export const initialState: LoopState = {
  act: 'develop',
  started: false,
  libraryDone: false,
  readingSubmitted: false,
  step: 0,
  theme: 'darkfield',
  qChoice: null,
  hypChoice: null,
  rungs: [],
  hired: NO_HIRES,
  control: false,
  controlChoices: [],
  replicates: 2,
  distance: null,
  modelLabeled: false,
  runStage: 'idle',
  everMeasured: false,
  measuredGroups: [],
  stiffness: 0.5,
  shape: 0.5,
  benchSampled: false,
  vGroup: 'treat',
  vEmbryo: 0,
  scanning: false,
  claim: null,
  claimResult: null,
}

/** A fresh per-act state. Each act is self-contained: its own budget, notebook,
 *  and progress reset (the visible XP/badges persist separately via progress.ts).
 *  Theme is the one display preference carried across. */
export function freshAct(act: ActId, theme: Theme, libraryDone = false): LoopState {
  return { ...initialState, act, theme, started: true, libraryDone }
}

export type Action =
  | { type: 'HYDRATE'; payload: Partial<LoopState> }
  | { type: 'START' }
  | { type: 'FINISH_LIBRARY' }
  | { type: 'SUBMIT_READING' }
  | { type: 'START_ACT'; act: ActId } // jump to a new act (resets the loop)
  | { type: 'JUMP'; step: number }
  | { type: 'NEXT' }
  | { type: 'BACK' }
  | { type: 'SET_THEME'; theme: Theme }
  | { type: 'PICK_Q'; id: QChoice }
  | { type: 'PICK_HYP'; id: HypChoice }
  | { type: 'TOGGLE_RUNG'; id: string }
  | { type: 'HIRE'; role: keyof Hired }
  | { type: 'TOGGLE_CONTROL' }
  | { type: 'TOGGLE_CONTROL_CHOICE'; id: string } // Act I: pick/unpick a candidate control
  | { type: 'SET_REP'; value: number }
  | { type: 'SET_DIST'; dist: Distance }
  | { type: 'TOGGLE_MODEL_LABEL' }
  | { type: 'SET_GROUP'; group: VGroup }
  | { type: 'SET_EMBRYO'; index: number }
  | { type: 'START_SCAN' }
  | { type: 'SEGMENT_DONE' }
  | { type: 'MEASURE' }
  | { type: 'SET_STIFFNESS'; value: number }
  | { type: 'SET_SHAPE'; value: number }
  | { type: 'SAMPLE_BENCH' }
  | { type: 'PICK_CLAIM'; id: ClaimId }
  | { type: 'CLIMB_LADDER' }
  | { type: 'RESTART' }
  | { type: 'RESET_ALL' } // full reset to the onboarding screen (keeps theme + earned badges)

/** Highest selected rung level (the claim ceiling), or 0 if none. Reads the
 *  active act's ladder so each act gates claims against its own rungs. */
export function ceiling(rungs: string[], act: ActId): number {
  const all = getAct(act).rungs
  const sel = all.filter((r) => rungs.includes(r.id))
  return sel.length ? Math.max(...sel.map((r) => r.lvl)) : 0
}

/** Whether the footer Next gate passes for the current state. Steps 3 (Design)
 *  and 4 (Run) differ by act; the rest are shared. */
export function canAdvance(s: LoopState): boolean {
  switch (s.step) {
    case 0:
      return s.qChoice === 'testable'
    case 1:
      return !!s.hypChoice
    case 2:
      return s.rungs.length > 0
    case 3:
      // Design is fair when controlled, replicated, and the measurement is
      // honestly labeled. Act I labels distance (2D/3D); Acts II and III label
      // the work as a model, not a measurement of a real patient.
      return s.control && s.replicates >= 3 && (s.act === 'develop' ? !!s.distance : s.modelLabeled)
    case 4:
      // Run is done once a real reading exists: a bench sample (Act II), a
      // measured field (Act I), or BOTH margin groups measured (Act III, so the
      // student actually compares normal tissue against the invasive front).
      if (s.act === 'differentiate') return s.benchSampled
      if (s.act === 'derail') return s.measuredGroups.includes('treat') && s.measuredGroups.includes('ctrl')
      return s.everMeasured
    case 5:
      return true
    case 6:
      return s.claimResult === 'valid'
    case 7:
      return false
    default:
      return false
  }
}

export function loopReducer(s: LoopState, a: Action): LoopState {
  const cfg = getAct(s.act).resource
  switch (a.type) {
    case 'HYDRATE':
      return { ...s, ...a.payload }
    case 'START':
      return { ...s, started: true }
    case 'FINISH_LIBRARY':
      return { ...s, libraryDone: true }
    case 'SUBMIT_READING':
      return { ...s, readingSubmitted: true }
    case 'START_ACT':
      return freshAct(a.act, s.theme, false)
    case 'JUMP':
      // Clicking the stepper navigates only to a completed or current stage.
      return a.step <= s.step ? { ...s, step: a.step } : s
    case 'NEXT':
      return canAdvance(s) && s.step < 7 ? { ...s, step: s.step + 1 } : s
    case 'BACK':
      return s.step > 0 ? { ...s, step: s.step - 1 } : s
    case 'SET_THEME':
      return { ...s, theme: a.theme }
    case 'PICK_Q':
      return { ...s, qChoice: a.id }
    case 'PICK_HYP':
      return { ...s, hypChoice: a.id }
    case 'TOGGLE_RUNG': {
      if (s.rungs.includes(a.id)) {
        // deselecting is always allowed (refunds its cost)
        return { ...s, rungs: s.rungs.filter((x) => x !== a.id) }
      }
      // selecting requires the rung be reachable now (equipment, tissue, team, budget)
      if (!rungStatus(cfg, a.id, s.rungs, s.hired).selectable) return s
      return { ...s, rungs: s.rungs.concat(a.id) }
    }
    case 'HIRE': {
      const role = a.role
      if (!s.hired[role]) {
        // hiring: must be able to afford it
        if (remaining(cfg, s.rungs, s.hired) < cfg.hireCost[role]) return s
        return { ...s, hired: { ...s.hired, [role]: true } }
      }
      // firing: drop any selected rung that depended on this person
      const rungs = s.rungs.filter((id) => {
        const req = cfg.reqMap[id]
        if (!req) return true
        if (role === 'operator' && req.needsOperator) return false
        if (role === 'interpreter' && req.needsInterpreter) return false
        return true
      })
      return { ...s, hired: { ...s.hired, [role]: false }, rungs }
    }
    case 'TOGGLE_CONTROL':
      return { ...s, control: !s.control }
    case 'TOGGLE_CONTROL_CHOICE': {
      // Act I teaches what a control IS by making the student pick it. The gate
      // (s.control) passes only when the right negative control ('neg') is chosen;
      // distractors and the positive control alone do not satisfy it.
      const next = s.controlChoices.includes(a.id) ? s.controlChoices.filter((x) => x !== a.id) : s.controlChoices.concat(a.id)
      return { ...s, controlChoices: next, control: next.includes('neg') }
    }
    case 'SET_REP':
      // Changing replicate count invalidates cached experiment data (handled by
      // the consumer keying its memo on `replicates`). Keep the viewed index in
      // range so a high index does not point past the new replicate count.
      return { ...s, replicates: a.value, vEmbryo: Math.min(s.vEmbryo, a.value - 1) }
    case 'SET_DIST':
      return { ...s, distance: a.dist }
    case 'TOGGLE_MODEL_LABEL':
      return { ...s, modelLabeled: !s.modelLabeled }
    case 'SET_GROUP':
      return { ...s, vGroup: a.group, runStage: 'idle', scanning: false }
    case 'SET_EMBRYO':
      return { ...s, vEmbryo: a.index, runStage: 'idle', scanning: false }
    case 'START_SCAN':
      return s.runStage === 'idle' ? { ...s, scanning: true } : s
    case 'SEGMENT_DONE':
      return { ...s, runStage: 'segmented', scanning: false }
    case 'MEASURE':
      return s.runStage === 'segmented'
        ? {
            ...s,
            runStage: 'measured',
            everMeasured: true,
            measuredGroups: s.measuredGroups.includes(s.vGroup) ? s.measuredGroups : s.measuredGroups.concat(s.vGroup),
          }
        : s
    case 'SET_STIFFNESS':
      return { ...s, stiffness: a.value }
    case 'SET_SHAPE':
      return { ...s, shape: a.value }
    case 'SAMPLE_BENCH':
      return { ...s, benchSampled: true }
    case 'PICK_CLAIM': {
      const c = getAct(s.act).claims.find((x) => x.id === a.id)
      if (!c) return s
      const ok = c.req <= ceiling(s.rungs, s.act)
      return { ...s, claim: a.id, claimResult: ok ? 'valid' : 'blocked' }
    }
    case 'CLIMB_LADDER':
      return { ...s, step: 2, claim: null, claimResult: null }
    case 'RESTART':
      // Replay the CURRENT act with a fresh grant, skipping the library gate.
      return freshAct(s.act, s.theme, true)
    case 'RESET_ALL':
      // Back to the very start (onboarding + the intro video), as a first-time
      // visit would see it. Keeps only the display theme; the persisted loop
      // mirror is overwritten by this fresh state. Earned badges/XP persist
      // separately (progress.ts) and are intentionally untouched.
      return { ...initialState, theme: s.theme }
    default:
      return s
  }
}
