// Visible gamification, bound to RIGOR (not speed or clicks). Research points and
// badges are earned only for genuine science moves: asking a testable question,
// designing a fair experiment, taking a real measurement, spotting
// pseudoreplication, matching a claim to the evidence. This gives the visible
// game layer the user asked for while keeping the documented overjustification
// risk in check (the reward marks competence, it never gates the science). The
// player record persists across acts in localStorage; the loop's progress still
// rides in the URL.

export interface Badge {
  id: string
  label: string
  hint: string
  points: number
}

/** Earned only for rigor. Ordered roughly by where they occur in the loop. */
export const BADGES: Badge[] = [
  { id: 'testable_question', label: 'Sharp Question', hint: 'Ask a question a scientist could actually test.', points: 10 },
  { id: 'prediction', label: 'Prediction Made', hint: 'Commit to a hypothesis with a falsifiable prediction.', points: 10 },
  { id: 'tooled_up', label: 'Tooled Up', hint: 'Choose at least one instrument you can actually run.', points: 10 },
  { id: 'fair_design', label: 'Fair Design', hint: 'Run a control with 3 or more replicates and an honest distance label.', points: 15 },
  { id: 'verified_measure', label: 'Verified Measurement', hint: 'Segment and measure at least one embryo yourself.', points: 15 },
  { id: 'pseudoreplication_spotter', label: 'Pseudoreplication Spotter', hint: 'See why pooling cells fakes a big sample size.', points: 20 },
  { id: 'honest_ceiling', label: 'Honest Ceiling', hint: 'Match your claim to your evidence, with no over-claim.', points: 25 },
  { id: 'self_corrector', label: 'Self-Corrector', hint: 'Revise a wrong first answer into a right one (the 6 Rs REVISE step).', points: 20 },
  { id: 'studied_library', label: 'Did the Reading', hint: 'Submit your Cornell guided notes for a chapter.', points: 15 },
  { id: 'scholar', label: 'Scholar', hint: 'Submit guided notes for 3 or more chapters.', points: 25 },
  { id: 'loop_closed', label: 'Closed the Loop', hint: 'Reach the end of the discovery loop.', points: 20 },
]

export const RANKS: { name: string; min: number }[] = [
  { name: 'Lab Intern', min: 0 },
  { name: 'Research Assistant', min: 35 },
  { name: 'Investigator', min: 80 },
  { name: 'Principal Investigator', min: 130 },
]

export interface GameState {
  badges: string[]
}

export const emptyGame: GameState = { badges: [] }

const POINTS: Record<string, number> = Object.fromEntries(BADGES.map((b) => [b.id, b.points]))

export function xpOf(badges: string[]): number {
  return badges.reduce((s, id) => s + (POINTS[id] ?? 0), 0)
}

export interface RankInfo {
  name: string
  idx: number
  prevMin: number
  nextMin: number | null
  nextName: string | null
}

export function rankOf(xp: number): RankInfo {
  let idx = 0
  for (let i = 0; i < RANKS.length; i++) if (xp >= RANKS[i].min) idx = i
  const next = RANKS[idx + 1] ?? null
  return {
    name: RANKS[idx].name,
    idx,
    prevMin: RANKS[idx].min,
    nextMin: next ? next.min : null,
    nextName: next ? next.name : null,
  }
}

const KEY = 'ddd_game_v1'

export function loadGame(): GameState {
  if (typeof window === 'undefined') return { ...emptyGame }
  try {
    const raw = window.localStorage.getItem(KEY)
    if (!raw) return { ...emptyGame }
    const g = JSON.parse(raw) as GameState
    return { badges: Array.isArray(g.badges) ? g.badges : [] }
  } catch {
    return { ...emptyGame }
  }
}

export function saveGame(g: GameState): void {
  if (typeof window === 'undefined') return
  try {
    window.localStorage.setItem(KEY, JSON.stringify(g))
  } catch {
    /* storage may be blocked on managed devices; in-session state still holds */
  }
}

export function badgeById(id: string): Badge | undefined {
  return BADGES.find((b) => b.id === id)
}
