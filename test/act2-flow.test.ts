import assert from 'node:assert/strict'
import { test } from 'node:test'
import { canAdvance, ceiling, initialState, loopReducer, type LoopState } from '../src/state/loop.ts'

const A2: LoopState = { ...initialState, act: 'differentiate', started: true, libraryDone: true }

test('START_ACT enters Act II fresh (own budget, library re-gated)', () => {
  const s = loopReducer({ ...initialState, step: 7, rungs: ['spatial'] }, { type: 'START_ACT', act: 'differentiate' })
  assert.equal(s.act, 'differentiate')
  assert.equal(s.started, true)
  assert.equal(s.libraryDone, false)
  assert.equal(s.step, 0)
  assert.deepEqual(s.rungs, [])
})

test('Act II Design gate needs control + 3 runs + model label', () => {
  assert.equal(canAdvance({ ...A2, step: 3, control: true, replicates: 3, modelLabeled: true }), true)
  assert.equal(canAdvance({ ...A2, step: 3, control: true, replicates: 3, modelLabeled: false }), false)
  assert.equal(canAdvance({ ...A2, step: 3, control: true, replicates: 2, modelLabeled: true }), false)
  assert.equal(canAdvance({ ...A2, step: 3, control: false, replicates: 3, modelLabeled: true }), false)
})

test('Act II Run gate needs a bench reading', () => {
  assert.equal(canAdvance({ ...A2, step: 4, benchSampled: true }), true)
  assert.equal(canAdvance({ ...A2, step: 4, benchSampled: false }), false)
})

test('Act II claim ceiling: model claim valid, real-tissue over-claim blocked', () => {
  let s: LoopState = { ...A2, rungs: ['r1', 'r2'] } // ceiling 2
  assert.equal(ceiling(s.rungs, s.act), 2)
  s = loopReducer(s, { type: 'PICK_CLAIM', id: 'c2' }) // req 2
  assert.equal(s.claimResult, 'valid')
  s = loopReducer(s, { type: 'PICK_CLAIM', id: 'c4' }) // req 4 (locked in-vivo rung)
  assert.equal(s.claimResult, 'blocked')
  s = loopReducer(s, { type: 'PICK_CLAIM', id: 'c3' }) // req 3 (needs paid reporter)
  assert.equal(s.claimResult, 'blocked')
})

test('Act II bench slider + sample actions', () => {
  let s: LoopState = { ...A2 }
  s = loopReducer(s, { type: 'SET_STIFFNESS', value: 0.9 })
  s = loopReducer(s, { type: 'SET_SHAPE', value: 0.8 })
  s = loopReducer(s, { type: 'SAMPLE_BENCH' })
  assert.equal(s.stiffness, 0.9)
  assert.equal(s.shape, 0.8)
  assert.equal(s.benchSampled, true)
})

test('Act I gates and ceiling are unchanged by the refactor (regression)', () => {
  const s: LoopState = { ...initialState } // act develop
  assert.equal(canAdvance({ ...s, step: 3, control: true, replicates: 3, distance: '2d' }), true)
  assert.equal(canAdvance({ ...s, step: 3, control: true, replicates: 3, distance: null }), false)
  assert.equal(canAdvance({ ...s, step: 4, everMeasured: true }), true)
  assert.equal(ceiling(['spatial', 'ecm'], 'develop'), 2)
  assert.equal(ceiling(['migration'], 'develop'), 3)
})
