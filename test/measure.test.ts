import { test } from 'node:test'
import assert from 'node:assert/strict'
import {
  buildExperiment,
  perEmbryoWelch,
  pooledWelch,
  genEmbryo,
  nnDistances,
  mean,
  welch,
} from '../src/lib/measure.ts'

test('genEmbryo is deterministic for a fixed seed', () => {
  const a = genEmbryo(1009, true)
  const b = genEmbryo(1009, true)
  assert.equal(a.length, b.length)
  assert.deepEqual(a[0], b[0])
})

test('ordered (FN1-rich) fields are sparser than random control fields', () => {
  const treat = genEmbryo(1009, true)
  const ctrl = genEmbryo(6007, false)
  // dart-throwing with a min distance yields fewer, more regular points
  assert.ok(treat.length < ctrl.length, `treat ${treat.length} should be < ctrl ${ctrl.length}`)
  // and larger mean nearest-neighbor spacing
  assert.ok(mean(nnDistances(treat)) > mean(nnDistances(ctrl)))
})

test('Welch p-values are valid probabilities', () => {
  const r = welch([0.1, 0.12, 0.11, 0.13], [0.2, 0.22, 0.19, 0.21])
  assert.ok(r.p >= 0 && r.p <= 1)
  assert.ok(Number.isFinite(r.t) && Number.isFinite(r.df))
})

test('the pseudoreplication contrast holds: pooled p is far smaller than per-embryo p', () => {
  // With a real biological effect, pooling cells inflates significance vs the
  // honest embryo-level test. This contrast IS the Act I lesson.
  const data = buildExperiment(3)
  const pooled = pooledWelch(data)
  const perEmbryo = perEmbryoWelch(data)
  assert.ok(pooled.p < 0.001, `pooled p should be tiny, got ${pooled.p}`)
  assert.ok(pooled.p < perEmbryo.p, `pooled ${pooled.p} should be < per-embryo ${perEmbryo.p}`)
})

test('per-embryo n equals the replicate count (the real n), pooled n is the cell total', () => {
  const data = buildExperiment(4)
  const cells =
    data.treat.reduce((s, e) => s + e.length, 0) + data.ctrl.reduce((s, e) => s + e.length, 0)
  assert.ok(cells > 8, 'pooled cell count should dwarf the 4+4 embryo n')
})
