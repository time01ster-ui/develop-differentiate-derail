import assert from 'node:assert/strict'
import { test } from 'node:test'
import { bench, benchReplicates, benchAgreement } from '../src/lib/bench.ts'

test('soft + round cell sits in the cartilage default with low nuclear YAP/TAZ', () => {
  const r = bench(0, 0)
  assert.equal(r.fate, 'cartilage')
  assert.ok(r.nuclear < 0.2, `nuclear ${r.nuclear} should be low`)
})

test('firm + spread cell leans bone with high nuclear YAP/TAZ', () => {
  const r = bench(1, 1)
  assert.equal(r.fate, 'bone')
  assert.ok(r.nuclear > 0.8, `nuclear ${r.nuclear} should be high`)
})

test('nuclear YAP/TAZ is monotonic in stiffness when shape is held', () => {
  const lo = bench(0.2, 0.7).nuclear
  const hi = bench(0.9, 0.7).nuclear
  assert.ok(hi > lo, `raising stiffness should raise nuclear (${lo} -> ${hi})`)
})

test('nuclear YAP/TAZ is monotonic in cell spread when stiffness is held', () => {
  const lo = bench(0.7, 0.2).nuclear
  const hi = bench(0.7, 0.9).nuclear
  assert.ok(hi > lo, `raising spread should raise nuclear (${lo} -> ${hi})`)
})

test('context-dependence: a round cell on firm matrix does NOT flip to bone (shape gates stiffness)', () => {
  const firmRound = bench(1, 0)
  assert.equal(firmRound.fate, 'cartilage', 'stiffness alone must not decide fate')
  assert.ok(firmRound.nuclear < 0.5)
})

test('CTGF and CYR61 (YAP/TAZ targets) track the nuclear fraction', () => {
  const lo = bench(0.1, 0.1)
  const hi = bench(0.9, 0.9)
  assert.ok(hi.ctgf > lo.ctgf && hi.cyr61 > lo.cyr61)
})

test('replicate runs are deterministic and cluster for a decisive setting', () => {
  const a = benchReplicates(0.95, 0.95, 5)
  const b = benchReplicates(0.95, 0.95, 5)
  assert.deepEqual(a, b, 'same inputs must give the same runs')
  assert.equal(benchAgreement(0.95, 0.95, 5), 1, 'a decisive setting should agree across all runs')
})
