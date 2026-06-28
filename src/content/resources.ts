// The resource model: a real research economy layered onto the Measurement
// Ladder so FREE / PAID / LOCKED finally MEAN something (the red-team's #1
// currency finding: the old chips were decoration). A rung is reachable only if
// you can AFFORD it, STAFF it, have the EQUIPMENT, and have the right TISSUE.
//
// Faithfulness is preserved: the top rungs (force/tension) stay out of reach for
// SHOWABLE reasons drawn from the real lab, the instrument isn't in this lab,
// you'd need a trained operator AND an interpreter, and AFM needs dead tissue
// while your embryo is alive. So nuclear spacing is genuinely the honest ceiling,
// and now the student can SEE exactly why.

export const STARTING_BUDGET = 50000
export const HIRE_COST = { operator: 12000, interpreter: 8000 } as const

export interface Hired {
  operator: boolean
  interpreter: boolean
}
export const NO_HIRES: Hired = { operator: false, interpreter: false }

export interface RungReq {
  /** one-line plain purpose shown under the rung name */
  purpose: string
  /** equipment/run cost in dollars (0 = runs free in the browser) */
  cost: number
  needsOperator: boolean
  needsInterpreter: boolean
  /** is the instrument physically available in this (browser) lab? */
  equipInLab: boolean
  /** name of the missing instrument, for the locked checklist */
  equipName?: string
  /** 'any' works on the live embryo; 'dead' cannot (AFM) */
  tissue: 'any' | 'dead'
}

export const RUNG_REQ: Record<string, RungReq> = {
  spatial: { purpose: 'where the cells sit', cost: 0, needsOperator: false, needsInterpreter: false, equipInLab: true, tissue: 'any' },
  ecm: { purpose: 'the road (FN1) they crawl on', cost: 8000, needsOperator: false, needsInterpreter: false, equipInLab: true, tissue: 'any' },
  migration: { purpose: 'how they move over time', cost: 30000, needsOperator: true, needsInterpreter: false, equipInLab: true, tissue: 'any' },
  molforce: { purpose: 'the pulling force between molecules', cost: 0, needsOperator: true, needsInterpreter: true, equipInLab: false, equipName: 'FRET rig', tissue: 'any' },
  tissue: { purpose: 'the real stiffness/force of the tissue', cost: 0, needsOperator: true, needsInterpreter: true, equipInLab: false, equipName: 'AFM / Brillouin', tissue: 'dead' },
}

/**
 * Per-act resource economy. Each act runs the SAME ladder machinery (budget,
 * hires, per-rung gates) on its OWN rung data, so the engine reads the active
 * act's config rather than the Act-I globals directly.
 */
export interface ResourceConfig {
  reqMap: Record<string, RungReq>
  startingBudget: number
  hireCost: { operator: number; interpreter: number }
}

/** Act I "Develop" economy. */
export const ACT1_RESOURCE: ResourceConfig = {
  reqMap: RUNG_REQ,
  startingBudget: STARTING_BUDGET,
  hireCost: HIRE_COST,
}

export function hireSpend(cfg: ResourceConfig, hired: Hired): number {
  return (hired.operator ? cfg.hireCost.operator : 0) + (hired.interpreter ? cfg.hireCost.interpreter : 0)
}

export function rungSpend(cfg: ResourceConfig, rungs: string[]): number {
  return rungs.reduce((s, id) => s + (cfg.reqMap[id]?.cost ?? 0), 0)
}

export function spent(cfg: ResourceConfig, rungs: string[], hired: Hired): number {
  return hireSpend(cfg, hired) + rungSpend(cfg, rungs)
}

export function remaining(cfg: ResourceConfig, rungs: string[], hired: Hired): number {
  return cfg.startingBudget - spent(cfg, rungs, hired)
}

export interface Requirement {
  label: string
  met: boolean
  /** not-applicable: shown greyed (a moot requirement on a permanently locked rung). */
  na?: boolean
}

/**
 * Full status of one rung given the current resources. `hardLocked` = can never
 * be selected in this build (no instrument, or wrong tissue), the faithful
 * reason tension is unreachable. `selectable` = all requirements met right now.
 */
export function rungStatus(cfg: ResourceConfig, rungId: string, rungs: string[], hired: Hired) {
  const req = cfg.reqMap[rungId]
  const selected = rungs.includes(rungId)
  // budget available to ADD this rung (its own cost not yet counted unless selected)
  const others = rungs.filter((r) => r !== rungId)
  const avail = remaining(cfg, others, hired)
  const affordable = avail >= req.cost

  const hardLocked = !req.equipInLab || req.tissue === 'dead'

  const reqs: Requirement[] = []
  reqs.push(
    req.equipInLab
      ? { label: 'equipment is in this lab', met: true }
      : { label: `${req.equipName}, not in this lab`, met: false },
  )
  if (req.tissue === 'dead') reqs.push({ label: 'needs dead tissue; your embryo is alive', met: false })

  if (hardLocked) {
    // staffing and run-cost are moot on a rung that can never run in this lab,
    // so show them greyed (not as fixable red ✗) to stop the false cause-effect.
    if (req.needsOperator) reqs.push({ label: 'a trained operator would also be needed', met: false, na: true })
    if (req.needsInterpreter) reqs.push({ label: 'a data interpreter would also be needed', met: false, na: true })
  } else {
    if (req.needsOperator) reqs.push({ label: hired.operator ? 'trained operator (hired)' : 'trained operator, not hired', met: hired.operator })
    if (req.needsInterpreter) reqs.push({ label: hired.interpreter ? 'data interpreter (hired)' : 'data interpreter, not hired', met: hired.interpreter })
    reqs.push(
      req.cost === 0
        ? { label: 'free (runs in your browser)', met: true }
        : { label: `$${req.cost.toLocaleString()} run cost${affordable ? '' : ', over budget'}`, met: affordable },
    )
  }

  const selectable = !hardLocked && reqs.every((r) => r.met)
  return { req, selected, reqs, affordable, hardLocked, selectable }
}

/** Can hiring this role happen right now (enough budget, not already hired)? */
export function canHire(cfg: ResourceConfig, role: keyof Hired, rungs: string[], hired: Hired): boolean {
  if (hired[role]) return true
  return remaining(cfg, rungs, hired) >= cfg.hireCost[role]
}

