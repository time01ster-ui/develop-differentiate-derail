// Reflection store. The student's written answers, comparisons, and to-do lists
// are free text (paragraphs), too large for the URL, so they live in localStorage
// here. The loop's PROGRESS still rides in the URL (never localStorage alone); this
// is only the student's own writing, and the panel offers a "copy" so it is never
// trapped. A Supabase teacher layer that collects these is the natural Phase 4.

// Each stage's reflection is the 6 Rs learning cycle (Manuel's signature Cornell
// Notes framework): RECORD -> REDUCE -> RECITE -> REVIEW -> REFLECT -> REVISE.
// The REVISE step is the captured evidence of SELF-CORRECTION: the student
// rewrites their answer, fixing what they got wrong and saying what changed. A
// reflection counts as complete only once it has been revised.
export interface Reflection {
  record: string // RECORD: one line, what you did or saw at this step
  answer: string // RECITE: your answer in your own words, before seeing the model
  submitted: boolean // RECITE submitted -> REVIEW (the model) unlocks
  comparison: string // REFLECT: what yours did well, what it missed, how it connects
  revision: string // REVISE: the rewritten answer + what you changed (self-correction)
  revised: boolean // REVISE done -> the 6 Rs cycle for this step is complete
  todos: string // carry-forward to the next cycle (reapply)
}

export type Reflections = Record<number, Reflection>

const KEY = 'ddd_reflect_v2'

export function emptyReflection(): Reflection {
  return { record: '', answer: '', submitted: false, comparison: '', revision: '', revised: false, todos: '' }
}

export function loadReflections(): Reflections {
  if (typeof window === 'undefined') return {}
  try {
    const raw = window.localStorage.getItem(KEY)
    return raw ? (JSON.parse(raw) as Reflections) : {}
  } catch {
    return {}
  }
}

export function saveReflections(r: Reflections): void {
  if (typeof window === 'undefined') return
  try {
    window.localStorage.setItem(KEY, JSON.stringify(r))
  } catch {
    /* storage may be blocked on managed devices; the in-session state still holds */
  }
}
