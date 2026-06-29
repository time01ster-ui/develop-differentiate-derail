// The lab-report builder must produce a complete, act-correct record from a real
// finished run. This drives the actual reducer to the Iterate stage for each act
// (the same path completability.test.ts proves is reachable free-only) and then
// asserts buildReport() fills every section: the run summary, the measurements,
// and the audit's item #13 (a Claim/Evidence/Reasoning/Limitation artifact).

import assert from 'node:assert/strict'
import { test } from 'node:test'
import { freshAct, loopReducer, type Action, type LoopState } from '../src/state/loop.ts'
import { getAct } from '../src/content/registry.ts'
import { buildExperiment } from '../src/lib/measure.ts'
import { emptyReflection, type Reflections } from '../src/lib/reflections.ts'
import { buildExampleReport, buildReport, reportToHtml } from '../src/lib/report.ts'
import type { ActId } from '../src/content/types.ts'

function apply(s: LoopState, ...actions: Action[]): LoopState {
  return actions.reduce(loopReducer, s)
}

/** Drive one act to its Iterate stage (step 7) with a valid bottom claim, free-only. */
function runToIterate(act: ActId): LoopState {
  const A = getAct(act)
  let s = freshAct(act, 'darkfield', true)
  const free = A.rungs.find((r) => r.lvl === 1)!
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
  )
  s = act === 'develop' ? loopReducer(s, { type: 'SET_DIST', dist: '2d' }) : loopReducer(s, { type: 'TOGGLE_MODEL_LABEL' })
  s = loopReducer(s, { type: 'NEXT' })
  if (act === 'differentiate') {
    s = loopReducer(s, { type: 'SAMPLE_BENCH' })
  } else if (act === 'derail') {
    s = apply(s, { type: 'SET_GROUP', group: 'treat' }, { type: 'SEGMENT_DONE' }, { type: 'MEASURE' })
    s = apply(s, { type: 'SET_GROUP', group: 'ctrl' }, { type: 'SEGMENT_DONE' }, { type: 'MEASURE' })
  } else {
    s = apply(s, { type: 'SEGMENT_DONE' }, { type: 'MEASURE' })
  }
  s = loopReducer(s, { type: 'NEXT' }) // -> Analyze
  s = loopReducer(s, { type: 'NEXT' }) // -> Conclude
  const claim = A.claims[0] // bottom claim is always within the free-tool ceiling
  s = loopReducer(s, { type: 'PICK_CLAIM', id: claim.id })
  s = loopReducer(s, { type: 'NEXT' }) // -> Iterate
  assert.equal(s.step, 7, `[${act}] should reach Iterate`)
  assert.equal(s.claimResult, 'valid', `[${act}] bottom claim should validate`)
  return s
}

for (const act of ['develop', 'differentiate', 'derail'] as ActId[]) {
  test(`buildReport fills every section for "${act}"`, () => {
    const s = runToIterate(act)
    const data = buildExperiment(s.replicates)
    const r = buildReport(s, {}, ['testable_question', 'fair_design'], data)

    // run summary is fully resolved (no "No ... selected" leaks)
    assert.match(r.actLabel, /^Act (I|II|III) · /)
    assert.ok(r.caseLine.length > 0)
    assert.ok(!/No question selected/.test(r.question), `[${act}] question resolved`)
    assert.ok(!/No hypothesis selected/.test(r.hypothesis), `[${act}] hypothesis resolved`)
    assert.ok(r.tools.length > 0 && r.tools[0] !== 'No tools selected', `[${act}] tools resolved`)
    assert.equal(r.budgetTotal, getAct(act).resource.startingBudget)
    assert.equal(r.budgetSpent, 0, `[${act}] free-only run spends nothing`)

    // design + measurements present
    assert.equal(r.design.length, 3)
    assert.ok(r.measurements.length >= 2, `[${act}] measurements present`)
    assert.ok(r.analyze.length > 0, `[${act}] analyze present`)

    // the audit's item #13: a supported CER with a real limitation
    assert.ok(r.cer.supported, `[${act}] CER supported for a valid bottom claim`)
    assert.ok(!/No claim logged/.test(r.cer.claim), `[${act}] claim text resolved`)
    assert.ok(r.cer.evidence.length > 0, `[${act}] CER evidence present`)
    assert.ok(r.cer.reasoning.length > 0, `[${act}] CER reasoning present`)
    assert.ok(r.cer.limitation.length > 0, `[${act}] CER limitation present`)

    // badges + rank derived
    assert.ok(r.badges.some((b) => b.label === 'Sharp Question'))
    assert.ok(r.xp > 0 && r.rank.length > 0)
  })
}

test('buildReport stays correct after a reload (claimResult not in the URL)', () => {
  // On the Iterate stage a page reload rehydrates from the URL hash, which carries
  // the claim id + rungs but NOT the transient claimResult. The report must still
  // mark a within-ceiling claim as supported.
  const s = runToIterate('develop')
  const reloaded: LoopState = { ...s, claimResult: null }
  const r = buildReport(reloaded, {}, [], buildExperiment(reloaded.replicates))
  assert.equal(r.cer.supported, true, 'a within-ceiling claim survives reload as supported')
  assert.ok(!/not supported/i.test(r.cer.reasoning))
})

test('buildReport surfaces a blocked over-claim honestly (not supported)', () => {
  const s = runToIterate('develop')
  // force an over-claim: the top Act I claim needs a rung the free run never reached
  const over = getAct('develop').claims[getAct('develop').claims.length - 1]
  const blocked = loopReducer(s, { type: 'PICK_CLAIM', id: over.id })
  const r = buildReport(blocked, {}, [], buildExperiment(blocked.replicates))
  assert.equal(blocked.claimResult, 'blocked')
  assert.equal(r.cer.supported, false)
  assert.match(r.cer.reasoning, /not supported/)
})

test('reportToHtml builds a self-contained document and escapes the student name', () => {
  const s = runToIterate('develop')
  const r = buildReport(s, {}, ['testable_question'], buildExperiment(s.replicates))
  const html = reportToHtml(r, '<script>alert(1)</script>', 'June 29, 2026')
  assert.match(html, /^<!doctype html>/i)
  assert.match(html, /<\/html>\s*$/i)
  assert.ok(html.includes('DISCOVERY LAB REPORT'))
  assert.ok(html.includes(r.cer.claim))
  assert.ok(html.includes('LIMITATION'))
  // the injected name must be escaped, never live markup
  assert.ok(!html.includes('<script>alert(1)</script>'), 'student name must be HTML-escaped')
  assert.ok(html.includes('&lt;script&gt;'), 'escaped name present')
})

test('buildExampleReport produces a complete, supported exemplar (the start-of-run + portal example)', () => {
  const r = buildExampleReport()
  assert.equal(r.actLabel, 'Act I · Develop')
  assert.equal(r.cer.supported, true)
  assert.ok(!/No claim logged/.test(r.cer.claim))
  assert.ok(r.measurements.length >= 2)
  assert.ok(r.sixRs.length >= 1, 'the exemplar shows the 6 Rs corrections')
  assert.ok(r.badges.length >= 1 && r.xp > 0)
})

test('Act III report labels the disordered (ctrl) group as the invasive margin', () => {
  // regression: the derail framing was inverted; treat = normal tissue (ordered),
  // ctrl = invasive margin (disordered), matching AnalyzeStage3.
  const s = runToIterate('derail')
  const r = buildReport(s, {}, [], buildExperiment(s.replicates))
  const keys = r.measurements.map((m) => m.k).join(' | ')
  assert.match(keys, /Matched normal tissue/)
  assert.match(keys, /Invasive margin/)
})

test('buildReport captures the 6 Rs revisions a student wrote', () => {
  const s = runToIterate('develop')
  const reflections: Reflections = { 0: { ...emptyReflection(), revision: 'I narrowed the question to spacing.', revised: true, todos: 'pre-register the test' } }
  const r = buildReport(s, reflections, [], buildExperiment(s.replicates))
  assert.equal(r.sixRs.length, 1)
  assert.equal(r.sixRs[0].stage, 'Ask')
  assert.match(r.sixRs[0].revised, /narrowed the question/)
  assert.match(r.sixRs[0].next, /pre-register/)
})
