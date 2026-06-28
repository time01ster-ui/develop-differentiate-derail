import { useState } from 'react'
import { analyzeLesson } from '../../content/act1'
import { MATEO_MID, ACT1_ANALYZE_NOTE } from '../../content/story'
import {
  embryoMeans,
  fmtP,
  perEmbryoWelch,
  pooledCellCount,
  pooledWelch,
  type ExperimentData,
} from '../../lib/measure'
import type { LoopState } from '../../state/loop'
import Define from '../Define'
import { PiBrief, MateoNote, NotebookNote } from '../StageChrome'
import { Pseudoreplication } from '../art/SciArt'
import { Kicker } from './ui'

const mono = "'IBM Plex Mono'"

export default function AnalyzeStage({ state, data, onSeeHonestN }: { state: LoopState; data: ExperimentData; onSeeHonestN?: () => void }) {
  const [revealed, setRevealed] = useState(false)
  const pooled = pooledWelch(data)
  const pooledN = pooledCellCount(data)
  const emb = perEmbryoWelch(data)
  const treatMeans = embryoMeans(data.treat)
  const ctrlMeans = embryoMeans(data.ctrl)
  const allMeans = treatMeans.concat(ctrlMeans)
  const lo = Math.min(...allMeans)
  const hi = Math.max(...allMeans)
  const span = hi - lo || 1
  const embSig = emb.p < 0.05

  const dot = (m: number, top: string, color: string, key: string) => (
    <div
      key={key}
      style={{
        position: 'absolute',
        width: 13,
        height: 13,
        borderRadius: '50%',
        background: color,
        boxShadow: `0 0 9px ${color}`,
        transform: 'translate(-50%,-50%)',
        left: `${10 + ((m - lo) / span) * 78}%`,
        top,
      }}
    />
  )

  return (
    <div className="stage-enter">
      <Kicker>06 · ANALYZE, the same data, two honesties</Kicker>
      <PiBrief step={5} />
      <NotebookNote {...ACT1_ANALYZE_NOTE} />
      <h1 style={{ fontFamily: "'Space Grotesk'", fontWeight: 700, fontSize: 26, lineHeight: 1.15, marginBottom: 8 }}>
        Did spacing really differ, or did you just count cells twice?
      </h1>
      <p style={{ color: 'var(--muted)', fontSize: 13.5, lineHeight: 1.6, marginBottom: 14 }}>
        No buttons are needed to continue here. Your job is to see why the two tests below disagree, then
        decide which sample size is the honest one.
      </p>

      {/* plain-language primer ABOVE the cards, this screen carries the whole thesis */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 14, marginBottom: 16 }}>
        <div style={{ border: '1px solid var(--line)', borderRadius: 12, background: 'var(--panel2)', padding: '12px 14px' }}>
          <div style={{ fontSize: 13.5, lineHeight: 1.6, color: 'var(--text)' }}>
            Two quick words first. A <Define t="p-value">p-value</Define> is how likely your result is just luck
            (smaller means luck is less likely). <Define t="pseudoreplication">Pseudoreplication</Define> is
            counting many cells from a few embryos as if each cell were its own experiment, which fakes a big sample size.
          </div>
        </div>
        <div style={{ border: '1px solid var(--line)', borderRadius: 12, background: 'var(--panel2)', padding: 12 }}>
          <Pseudoreplication height={180} />
        </div>
      </div>

      <div className="col-2">
        {/* POOLED */}
        <div style={{ border: '1.5px solid var(--c-amber)', borderRadius: 14, background: 'var(--panel)', padding: 20, position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: 0, right: 0, background: 'var(--c-amber)', color: '#04060c', fontFamily: mono, fontSize: 9.5, letterSpacing: '.1em', padding: '4px 10px', borderBottomLeftRadius: 8, fontWeight: 600 }}>
            ⚠ PSEUDOREPLICATION
          </div>
          <div style={{ fontFamily: "'Space Grotesk'", fontWeight: 600, fontSize: 17, marginBottom: 4 }}>Pooled, every cell counts</div>
          <div style={{ fontSize: 12.5, color: 'var(--muted)', lineHeight: 1.5, marginBottom: 18 }}>
            Treats all {pooledN} nuclei as independent samples. Looks powerful. It’s a lie about your
            sample size.
          </div>
          <div style={{ display: 'flex', gap: 22, alignItems: 'flex-end', marginBottom: 16 }}>
            <div>
              <div style={{ fontFamily: mono, fontSize: 30, color: 'var(--c-amber)', fontWeight: 500, lineHeight: 1 }}>{fmtP(pooled.p)}</div>
              <div style={{ fontSize: 11, color: 'var(--muted)', fontFamily: mono, marginTop: 3 }}>p-value</div>
            </div>
            <div>
              <div style={{ fontFamily: mono, fontSize: 18, color: 'var(--text)' }}>n = {pooledN}</div>
              <div style={{ fontSize: 11, color: 'var(--muted)', fontFamily: mono, marginTop: 3 }}>“samples” (cells)</div>
            </div>
          </div>
          <div style={{ fontFamily: mono, fontSize: 12, color: 'var(--c-amber)', padding: '9px 12px', borderRadius: 8, background: 'color-mix(in srgb, var(--c-amber) 12%, transparent)' }}>
            Reads as “highly significant”, but n is cells, not experiments.
          </div>
        </div>

        {/* PER-EMBRYO */}
        <div style={{ border: '1.5px solid var(--c-green)', borderRadius: 14, background: 'var(--panel)', padding: 20, position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: 0, right: 0, background: 'var(--c-green)', color: '#04060c', fontFamily: mono, fontSize: 9.5, letterSpacing: '.1em', padding: '4px 10px', borderBottomLeftRadius: 8, fontWeight: 600 }}>
            ✓ HONEST
          </div>
          <div style={{ fontFamily: "'Space Grotesk'", fontWeight: 600, fontSize: 17, marginBottom: 4 }}>Per-embryo, the real n</div>
          <div style={{ fontSize: 12.5, color: 'var(--muted)', lineHeight: 1.5, marginBottom: 14 }}>
            One mean spacing per embryo. {state.replicates} embryos per group. This is the test a
            reviewer trusts.
          </div>
          <div style={{ position: 'relative', height: 96, borderRadius: 9, background: 'var(--bg2)', marginBottom: 14, border: '1px solid var(--line)' }}>
            <div style={{ position: 'absolute', left: 10, top: 8, fontFamily: mono, fontSize: 10, color: 'var(--c-blue)' }}>FN1-rich</div>
            <div style={{ position: 'absolute', left: 10, bottom: 8, fontFamily: mono, fontSize: 10, color: 'var(--muted)' }}>control</div>
            {treatMeans.map((m, i) => dot(m, '34%', 'var(--c-blue)', 't' + i))}
            {ctrlMeans.map((m, i) => dot(m, '70%', 'var(--c-amber)', 'c' + i))}
          </div>
          <div style={{ display: 'flex', gap: 22, alignItems: 'flex-end' }}>
            <div>
              <div style={{ fontFamily: mono, fontSize: 30, color: embSig ? 'var(--c-green)' : 'var(--c-amber)', fontWeight: 500, lineHeight: 1 }}>{fmtP(emb.p)}</div>
              <div style={{ fontSize: 11, color: 'var(--muted)', fontFamily: mono, marginTop: 3 }}>p-value</div>
            </div>
            <div>
              <div style={{ fontFamily: mono, fontSize: 18, color: 'var(--text)' }}>n = {state.replicates} + {state.replicates}</div>
              <div style={{ fontSize: 11, color: 'var(--muted)', fontFamily: mono, marginTop: 3 }}>embryos</div>
            </div>
          </div>
        </div>
      </div>
      <div style={{ marginTop: 18 }}>
        {!revealed ? (
          <button
            onClick={() => { setRevealed(true); onSeeHonestN?.() }}
            style={{ width: '100%', minHeight: 46, borderRadius: 11, border: '1px dashed color-mix(in srgb, var(--accent) 55%, var(--line))', background: 'color-mix(in srgb, var(--accent) 8%, var(--panel))', color: 'var(--text)', cursor: 'pointer', fontFamily: "'Space Grotesk'", fontWeight: 600, fontSize: 14.5 }}
          >
            Which n is the honest one? Tap to check your thinking →
          </button>
        ) : (
          <div className="stage-enter" style={{ borderLeft: '2px solid var(--accent)', padding: '8px 0 8px 16px' }}>
            <div style={{ fontFamily: mono, fontSize: 10, letterSpacing: '.12em', color: 'var(--accent)', marginBottom: 4 }}>THE HONEST n IS PER-EMBRYO</div>
            <p style={{ lineHeight: 1.6, color: 'var(--text)', fontSize: 15 }}>{analyzeLesson(embSig, state.replicates)}</p>
          </div>
        )}
      </div>
      <div style={{ marginTop: 16 }}>
        <MateoNote>{MATEO_MID}</MateoNote>
      </div>
    </div>
  )
}
