// Generate a representative EXAMPLE lab report as standalone HTML, for embedding
// on the portal (student + teacher views) so both audiences can see the hand-in
// deliverable. Reproducible: drives the real reducer through a complete Act I run
// (the same path the completability test proves), then renders the same
// reportToHtml() the live export uses. Run:
//   node --import tsx scripts/gen-example-report.mts > /tmp/example-lab-report.html
// then print to PDF with headless Chrome.

import { freshAct, loopReducer, type Action, type LoopState } from '../src/state/loop.ts'
import { getAct } from '../src/content/registry.ts'
import { buildExperiment } from '../src/lib/measure.ts'
import { emptyReflection, type Reflections } from '../src/lib/reflections.ts'
import { buildReport, reportToHtml } from '../src/lib/report.ts'

function apply(s: LoopState, ...actions: Action[]): LoopState {
  return actions.reduce(loopReducer, s)
}

const A = getAct('develop')
const free = A.rungs.find((r) => r.lvl === 1)!
let s = freshAct('develop', 'darkfield', true)
s = apply(
  s,
  { type: 'PICK_Q', id: 'testable' },
  { type: 'NEXT' },
  { type: 'PICK_HYP', id: A.hypotheses[0].id },
  { type: 'NEXT' },
  { type: 'TOGGLE_RUNG', id: free.id },
  { type: 'NEXT' },
  { type: 'TOGGLE_CONTROL' },
  { type: 'SET_REP', value: 3 },
  { type: 'SET_DIST', dist: '2d' },
  { type: 'NEXT' },
  { type: 'SEGMENT_DONE' },
  { type: 'MEASURE' },
  { type: 'NEXT' }, // Analyze
  { type: 'NEXT' }, // Conclude
  { type: 'PICK_CLAIM', id: A.claims[0].id },
  { type: 'NEXT' }, // Iterate
)

// A realistic 9th-grade 6 Rs trail so the "What I corrected" section is populated.
const reflections: Reflections = {
  0: {
    ...emptyReflection(),
    submitted: true,
    revision: 'I started with "why do babies get clefts," but that is a why I cannot measure. I changed it to whether the crest cells space themselves non-randomly, which I can actually count.',
    revised: true,
    todos: 'Write the testable version of my question first, before I get attached to the big one.',
  },
  6: {
    ...emptyReflection(),
    submitted: true,
    revision: 'My first instinct was to say FN1 pulls the cells into place. I changed it to "the cells are non-randomly spaced," because I measured spacing, not force.',
    revised: true,
    todos: 'Match the claim to the tool I actually used, and name out loud the thing I did not measure.',
  },
}

const badges = ['studied_library', 'testable_question', 'prediction', 'tooled_up', 'fair_design', 'verified_measure', 'honest_ceiling', 'self_corrector', 'loop_closed']
const report = buildReport(s, reflections, badges, buildExperiment(s.replicates))
process.stdout.write(reportToHtml(report, 'Jordan Rivera (sample student)', 'Example run, Act I'))
