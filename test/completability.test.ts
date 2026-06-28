// Completability guarantee: every act must be finishable from start to the final
// stage WITHOUT spending a cent of the grant (free bottom rung only). This proves
// the budget economy can never soft-lock a student: the paid rungs only raise the
// optional claim ceiling, they are never required to advance. It drives the real
// reducer through all 8 gates of each act, asserting canAdvance passes every step.

import assert from 'node:assert/strict'
import { test } from 'node:test'
import {
  canAdvance,
  ceiling,
  freshAct,
  loopReducer,
  type Action,
  type LoopState,
} from '../src/state/loop.ts'
import { NO_HIRES, remaining, rungStatus } from '../src/content/resources.ts'
import { getAct } from '../src/content/registry.ts'
import type { ActId } from '../src/content/types.ts'

const ACTS: ActId[] = ['develop', 'differentiate', 'derail']

function apply(s: LoopState, ...actions: Action[]): LoopState {
  return actions.reduce(loopReducer, s)
}

/** Assert the gate passes, then advance one step. */
function advance(s: LoopState): LoopState {
  assert.ok(canAdvance(s), `[${s.act}] stuck: cannot advance from step ${s.step}`)
  const next = loopReducer(s, { type: 'NEXT' })
  assert.equal(next.step, s.step + 1, `[${s.act}] NEXT did not advance from step ${s.step}`)
  return next
}

/** Drive one act to its final stage using only free moves and the free rung. */
function completeFreeOnly(act: ActId): LoopState {
  const A = getAct(act)
  const cfg = A.resource

  // the free starter rung that gates Choose-tools must exist and cost nothing
  const free = A.rungs.find((r) => rungStatus(cfg, r.id, [], NO_HIRES).selectable)
  assert.ok(free, `[${act}] a free, selectable starter rung must exist`)

  let s = freshAct(act, 'darkfield', true)
  assert.equal(s.step, 0)

  // 0 · Ask
  s = advance(loopReducer(s, { type: 'PICK_Q', id: 'testable' }))

  // 1 · Hypothesize (any real hypothesis satisfies the gate)
  s = advance(loopReducer(s, { type: 'PICK_HYP', id: A.hypotheses[0].id }))

  // 2 · Choose tools — FREE rung only, grant untouched
  s = loopReducer(s, { type: 'TOGGLE_RUNG', id: free!.id })
  assert.deepEqual(s.rungs, [free!.id], `[${act}] the free rung must be selectable with $0 spent`)
  assert.equal(remaining(cfg, s.rungs, s.hired), cfg.startingBudget, `[${act}] the free rung must cost nothing`)
  s = advance(s)

  // 3 · Design — control + replicates + honesty label (all free)
  s = apply(s, { type: 'TOGGLE_CONTROL' }, { type: 'SET_REP', value: 3 })
  s = act === 'develop' ? loopReducer(s, { type: 'SET_DIST', dist: '2d' }) : loopReducer(s, { type: 'TOGGLE_MODEL_LABEL' })
  s = advance(s)

  // 4 · Run / Measure — per-act reading (all free)
  if (act === 'differentiate') {
    s = loopReducer(s, { type: 'SAMPLE_BENCH' })
  } else if (act === 'derail') {
    // Act III forces measuring BOTH margin groups
    s = apply(s, { type: 'SET_GROUP', group: 'treat' }, { type: 'SEGMENT_DONE' }, { type: 'MEASURE' })
    s = apply(s, { type: 'SET_GROUP', group: 'ctrl' }, { type: 'SEGMENT_DONE' }, { type: 'MEASURE' })
  } else {
    s = apply(s, { type: 'SEGMENT_DONE' }, { type: 'MEASURE' })
  }
  s = advance(s)

  // 5 · Analyze
  s = advance(s)

  // 6 · Conclude — a valid claim must exist at the free-tool ceiling
  const ceil = ceiling(s.rungs, act)
  const validClaim = A.claims.find((c) => c.req <= ceil)
  assert.ok(validClaim, `[${act}] a claim must be valid at the free-tool ceiling (${ceil}), or Conclude soft-locks`)
  s = loopReducer(s, { type: 'PICK_CLAIM', id: validClaim!.id })
  assert.equal(s.claimResult, 'valid', `[${act}] the honest bottom claim should validate`)
  s = advance(s)

  // 7 · Iterate (the loop is complete)
  assert.equal(s.step, 7, `[${act}] should reach the final stage`)
  return s
}

for (const act of ACTS) {
  test(`Act "${act}" is completable free-only (no budget soft-lock)`, () => {
    completeFreeOnly(act)
  })
}

test('all three acts complete in sequence via START_ACT transitions', () => {
  let s = completeFreeOnly('develop')
  s = loopReducer(s, { type: 'START_ACT', act: 'differentiate' })
  assert.equal(s.act, 'differentiate')
  assert.equal(s.step, 0)
  s = completeFreeOnly('differentiate')
  s = loopReducer(s, { type: 'START_ACT', act: 'derail' })
  assert.equal(s.act, 'derail')
  assert.equal(s.step, 0)
  completeFreeOnly('derail')
})
