import assert from 'node:assert/strict'
import { test } from 'node:test'
import { canAdvance, ceiling, initialState, loopReducer, type LoopState } from '../src/state/loop.ts'
import { rungStatus } from '../src/content/resources.ts'
import { getAct } from '../src/content/registry.ts'

const A3: LoopState = { ...initialState, act: 'derail', started: true, libraryDone: true }
const NO = { operator: false, interpreter: false }
const cfg = getAct('derail').resource

test('START_ACT enters Act III fresh', () => {
  const s = loopReducer({ ...initialState, act: 'differentiate', step: 7 }, { type: 'START_ACT', act: 'derail' })
  assert.equal(s.act, 'derail')
  assert.equal(s.libraryDone, false)
  assert.equal(s.step, 0)
})

test('Act III Design gate needs control + 3 regions + model label', () => {
  assert.equal(canAdvance({ ...A3, step: 3, control: true, replicates: 3, modelLabeled: true }), true)
  assert.equal(canAdvance({ ...A3, step: 3, control: true, replicates: 3, modelLabeled: false }), false)
  assert.equal(canAdvance({ ...A3, step: 3, control: true, replicates: 2, modelLabeled: true }), false)
})

test('Act III Run gate requires measuring BOTH margin groups (forces the contrast)', () => {
  assert.equal(canAdvance({ ...A3, step: 4, measuredGroups: ['treat', 'ctrl'] }), true)
  assert.equal(canAdvance({ ...A3, step: 4, measuredGroups: ['treat'] }), false)
  assert.equal(canAdvance({ ...A3, step: 4, measuredGroups: [] }), false)
  // measuring only one side (even with everMeasured set) is not enough in Act III
  assert.equal(canAdvance({ ...A3, step: 4, everMeasured: true, measuredGroups: ['ctrl'] }), false)
})

test('MEASURE records the measured group (Act III contrast tracking)', () => {
  let s: LoopState = { ...A3, step: 4, vGroup: 'treat', runStage: 'segmented' }
  s = loopReducer(s, { type: 'MEASURE' })
  assert.deepEqual(s.measuredGroups, ['treat'])
  s = loopReducer({ ...s, vGroup: 'ctrl', runStage: 'segmented' }, { type: 'MEASURE' })
  assert.deepEqual(s.measuredGroups, ['treat', 'ctrl'])
  assert.equal(canAdvance(s), true)
})

test('Act III ladder: free rungs reachable, in-vivo rungs hard-locked', () => {
  assert.equal(rungStatus(cfg, 'r1', [], NO).selectable, true, 'r1 free + available')
  assert.equal(rungStatus(cfg, 'r1', [], NO).hardLocked, false)
  assert.equal(rungStatus(cfg, 'r2', [], NO).hardLocked, false, 'r2 available')
  assert.equal(rungStatus(cfg, 'r3', [], NO).selectable, false, 'r3 needs hires')
  assert.equal(rungStatus(cfg, 'r3', [], { operator: true, interpreter: true }).selectable, true, 'r3 reachable once staffed')
  assert.equal(rungStatus(cfg, 'r4', [], NO).hardLocked, true, 'r4 in-vivo force locked')
  assert.equal(rungStatus(cfg, 'r5', [], NO).hardLocked, true, 'r5 living-patient causal locked')
})

test('Act III claim ceiling: model claim valid, patient/metastasis over-claim blocked', () => {
  let s: LoopState = { ...A3, rungs: ['r1', 'r2'] }
  assert.equal(ceiling(s.rungs, s.act), 2)
  s = loopReducer(s, { type: 'PICK_CLAIM', id: 'c2' })
  assert.equal(s.claimResult, 'valid')
  s = loopReducer(s, { type: 'PICK_CLAIM', id: 'c4' })
  assert.equal(s.claimResult, 'blocked')
})
