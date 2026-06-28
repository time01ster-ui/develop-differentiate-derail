import { useEffect, useRef, type Dispatch } from 'react'
import { mean, nnDistances, variance, type ExperimentData } from '../../../lib/measure'
import type { Action, LoopState } from '../../../state/loop'
import MeasureCanvas from '../../MeasureCanvas'
import Define from '../../Define'
import { PiBrief } from '../../StageChrome'
import { useTier } from '../../TierContext'
import { Kicker } from '../ui'
import { DurotaxisField } from './DurotaxisArt'

const mono = "'IBM Plex Mono'"

/** Act III Run/Measure: the SAME Voronoi spatial engine as Act I, pointed at a
 *  tumor margin. Organized normal tissue sits next to a disordered invasive
 *  front; the student measures the disorder with the same tools that scored
 *  ORDER in Act I. One toolkit, opposite reading. */
export default function MarginRunStage({ state, dispatch, data }: { state: LoopState; dispatch: Dispatch<Action>; data: ExperimentData }) {
  const { reducedMotion } = useTier()
  const segTimer = useRef<number | undefined>(undefined)
  useEffect(() => () => { if (segTimer.current) window.clearTimeout(segTimer.current) }, [])

  const idx = Math.min(state.vEmbryo, state.replicates - 1)
  // treat = organized NORMAL tissue; ctrl = disordered INVASIVE front
  const curPts = data[state.vGroup][idx]
  const curNN = nnDistances(curPts)
  const cellCount = curPts.length
  const seg = state.runStage !== 'idle'
  const meas = state.runStage === 'measured'
  const isInvasive = state.vGroup === 'ctrl'
  const otherGroup = state.vGroup === 'treat' ? 'ctrl' : 'treat'
  const otherLabel = otherGroup === 'treat' ? 'Normal tissue' : 'Invasive front'
  const otherSpread = Math.sqrt(variance(nnDistances(data[otherGroup][idx]))) * 1000
  const didTreat = state.measuredGroups.includes('treat')
  const didCtrl = state.measuredGroups.includes('ctrl')

  function doSegment() {
    if (state.runStage !== 'idle') return
    if (reducedMotion) {
      dispatch({ type: 'SEGMENT_DONE' })
      return
    }
    dispatch({ type: 'START_SCAN' })
    segTimer.current = window.setTimeout(() => dispatch({ type: 'SEGMENT_DONE' }), 1100)
  }

  const canvasLabel =
    state.runStage === 'idle'
      ? 'RAW MARGIN FIELD, not yet segmented'
      : state.runStage === 'segmented'
        ? `SEGMENTED, ${cellCount} nuclei centroids`
        : 'MEASURED, Voronoi + nearest-neighbor'

  const liveStats = [
    { label: 'Nuclei segmented', value: seg ? String(cellCount) : ' ', color: seg ? 'var(--c-green)' : 'var(--muted)' },
    { label: 'Voronoi cells', value: meas ? String(cellCount) : ' ', color: meas ? 'var(--c-blue)' : 'var(--muted)' },
    { label: 'Mean NN distance', value: meas ? (mean(curNN) * 1000).toFixed(1) + ' µm' : ' ', color: meas ? 'var(--accent)' : 'var(--muted)' },
    { label: 'NN spread (disorder)', value: meas ? (Math.sqrt(variance(curNN)) * 1000).toFixed(1) + ' µm' : ' ', color: meas ? 'var(--text)' : 'var(--muted)' },
  ]

  return (
    <div className="stage-enter">
      <Kicker>
        05 · RUN / MEASURE, <span style={{ color: 'var(--c-green)' }}>the same tools, the opposite reading</span>
      </Kicker>
      <PiBrief step={4} act="derail" />
      <div style={{ fontSize: 12.5, color: 'var(--muted)', lineHeight: 1.5, marginBottom: 14 }}>
        These are the Act I tools, <Define t="segment">Segment</Define> then <Define t="voronoi">Voronoi</Define> +{' '}
        <Define t="nearest-neighbor">nearest-neighbor</Define>, pointed at a tumor margin. In Act I they scored
        order. Here they score <b style={{ color: 'var(--c-pink)' }}>disorder</b>. Compare the organized normal
        tissue with the disordered invasive front. It is a model of a sibling carcinoma, not Mateo.
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap', marginBottom: 14, border: '1px solid color-mix(in srgb, var(--accent) 45%, var(--line))', borderRadius: 10, background: 'color-mix(in srgb, var(--accent) 8%, var(--panel))', padding: '9px 13px' }}>
        <span style={{ fontFamily: mono, fontSize: 10, letterSpacing: '.1em', color: 'var(--accent)', flex: 'none' }}>MEASURE BOTH</span>
        <span style={{ fontSize: 13, color: 'var(--text)', lineHeight: 1.45, flex: 1, minWidth: 200 }}>
          Measure the normal tissue AND the invasive front, then compare their NN spread. You need both sides to see the contrast.
        </span>
        <span style={{ fontFamily: mono, fontSize: 11, color: didTreat ? 'var(--c-green)' : 'var(--muted)', flex: 'none' }}>{didTreat ? '✓' : '○'} normal</span>
        <span style={{ fontFamily: mono, fontSize: 11, color: didCtrl ? 'var(--c-green)' : 'var(--muted)', flex: 'none' }}>{didCtrl ? '✓' : '○'} invasive</span>
      </div>
      <div className="col-run">
        <div>
          <div style={{ display: 'flex', gap: 8, marginBottom: 12, flexWrap: 'wrap' }}>
            <button
              onClick={() => dispatch({ type: 'SET_GROUP', group: 'treat' })}
              aria-pressed={state.vGroup === 'treat'}
              style={{ minHeight: 40, padding: '8px 15px', borderRadius: 8, border: `1.5px solid ${state.vGroup === 'treat' ? 'var(--c-blue)' : 'var(--line)'}`, background: state.vGroup === 'treat' ? 'color-mix(in srgb, var(--c-blue) 16%, transparent)' : 'var(--panel)', color: 'var(--text)', cursor: 'pointer', fontSize: 13, fontWeight: 500 }}
            >
              Normal tissue
            </button>
            <button
              onClick={() => dispatch({ type: 'SET_GROUP', group: 'ctrl' })}
              aria-pressed={state.vGroup === 'ctrl'}
              style={{ minHeight: 40, padding: '8px 15px', borderRadius: 8, border: `1.5px solid ${state.vGroup === 'ctrl' ? 'var(--c-pink)' : 'var(--line)'}`, background: state.vGroup === 'ctrl' ? 'color-mix(in srgb, var(--c-pink) 16%, transparent)' : 'var(--panel)', color: 'var(--text)', cursor: 'pointer', fontSize: 13, fontWeight: 500 }}
            >
              Invasive front
            </button>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginLeft: 'auto' }}>
              <span style={{ fontFamily: mono, fontSize: 11, color: 'var(--muted)' }}>REGION</span>
              {Array.from({ length: state.replicates }, (_, i) => {
                const active = i === idx
                return (
                  <button
                    key={i}
                    onClick={() => dispatch({ type: 'SET_EMBRYO', index: i })}
                    aria-pressed={active}
                    aria-label={`Region ${i + 1}`}
                    style={{ width: 32, height: 32, borderRadius: 7, border: `1.5px solid ${active ? 'var(--accent)' : 'var(--line)'}`, background: active ? 'color-mix(in srgb, var(--accent) 18%, transparent)' : 'transparent', color: active ? 'var(--text)' : 'var(--muted)', cursor: 'pointer', fontFamily: mono, fontSize: 12 }}
                  >
                    {i + 1}
                  </button>
                )
              })}
            </div>
          </div>

          <div style={{ position: 'relative' }}>
            <MeasureCanvas data={data} group={state.vGroup} embryo={idx} runStage={state.runStage} theme={state.theme} />
            <div style={{ position: 'absolute', top: 10, left: 12, fontFamily: mono, fontSize: 10.5, letterSpacing: '.08em', color: 'var(--muted)', background: 'color-mix(in srgb, var(--bg) 60%, transparent)', padding: '3px 7px', borderRadius: 5 }}>
              {canvasLabel}
            </div>
            <div style={{ position: 'absolute', top: 10, right: 12, fontFamily: mono, fontSize: 10, color: isInvasive ? 'var(--c-pink)' : 'var(--c-blue)', background: 'color-mix(in srgb, var(--bg) 60%, transparent)', padding: '3px 7px', borderRadius: 5 }}>
              {isInvasive ? 'INVASIVE FRONT' : 'NORMAL TISSUE'}
            </div>
            {state.scanning && !reducedMotion && (
              <div style={{ position: 'absolute', left: 0, right: 0, top: 0, height: 3, background: 'linear-gradient(90deg, transparent, var(--c-green), transparent)', animation: 'scanline 1.1s linear infinite' }} />
            )}
          </div>

          <div style={{ display: 'flex', gap: 11, marginTop: 14, flexWrap: 'wrap' }}>
            <button onClick={doSegment} disabled={state.runStage !== 'idle'} style={{ minHeight: 44, padding: '11px 18px', borderRadius: 9, border: '1.5px solid var(--c-green)', background: state.runStage === 'idle' ? 'color-mix(in srgb, var(--c-green) 16%, transparent)' : 'transparent', color: state.runStage === 'idle' ? 'var(--c-green)' : 'var(--muted)', cursor: state.runStage === 'idle' ? 'pointer' : 'default', fontWeight: 600, fontSize: 14, fontFamily: "'Space Grotesk'" }}>
              {state.runStage === 'idle' ? '1 · Segment nuclei' : '✓ Segmented'}
            </button>
            <button onClick={() => dispatch({ type: 'MEASURE' })} disabled={state.runStage !== 'segmented'} style={{ minHeight: 44, padding: '11px 18px', borderRadius: 9, border: `1.5px solid ${seg && !meas ? 'var(--c-blue)' : 'var(--line)'}`, background: seg && !meas ? 'color-mix(in srgb, var(--c-blue) 16%, transparent)' : 'transparent', color: seg && !meas ? 'var(--c-blue)' : 'var(--muted)', cursor: seg && !meas ? 'pointer' : 'default', fontWeight: 600, fontSize: 14, fontFamily: "'Space Grotesk'" }}>
              {meas ? '✓ Measured' : '2 · Compute Voronoi + NN'}
            </button>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
          <aside style={{ border: '1px solid var(--line)', borderRadius: 14, background: 'var(--panel)', padding: 20 }}>
            <div style={{ fontFamily: mono, fontSize: 10, letterSpacing: '.14em', color: 'var(--muted)', marginBottom: 14 }}>LIVE READOUT, THIS REGION</div>
            {liveStats.map((m) => (
              <div key={m.label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', padding: '9px 0', borderBottom: '1px solid var(--line)' }}>
                <span style={{ fontSize: 12.5, color: 'var(--muted)' }}>{m.label}</span>
                <span style={{ fontFamily: mono, fontSize: 15, color: m.color, fontWeight: 500 }}>{m.value}</span>
              </div>
            ))}
            {(didTreat || didCtrl) && (
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', padding: '9px 0', borderBottom: '1px solid var(--line)' }}>
                <span style={{ fontSize: 12.5, color: 'var(--muted)' }}>{otherLabel} spread (ref)</span>
                <span style={{ fontFamily: mono, fontSize: 13, color: 'var(--muted)' }}>{otherSpread.toFixed(1)} µm</span>
              </div>
            )}
            <p style={{ fontSize: 12, lineHeight: 1.55, color: 'var(--muted)', marginTop: 16 }}>
              A larger <b style={{ color: 'var(--text)' }}>NN spread</b> means more irregular spacing, the
              fingerprint of a disordered invasive front. The geometry is computed here, not animated.
            </p>
          </aside>
          <aside style={{ border: '1px solid var(--line)', borderRadius: 14, background: 'var(--panel)', padding: 16 }}>
            <div style={{ fontFamily: mono, fontSize: 10, letterSpacing: '.14em', color: 'var(--muted)', marginBottom: 10 }}>WHY THE FRONT IS DISORDERED</div>
            <DurotaxisField reducedMotion={reducedMotion} />
            <p style={{ fontSize: 12, lineHeight: 1.55, color: 'var(--muted)', marginTop: 10 }}>
              The tumor stiffened its own matrix with <Define t="LOX">LOX</Define>, then cells climbed that
              self-made gradient (<Define t="durotaxis">durotaxis</Define>) and breached the{' '}
              <Define t="basement membrane">basement membrane</Define>. That is local invasion, not spread to
              other organs.
            </p>
          </aside>
        </div>
      </div>
    </div>
  )
}
