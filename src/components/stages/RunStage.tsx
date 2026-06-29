import { useEffect, useRef, type Dispatch } from 'react'
import { mean, nnDistances, variance, type ExperimentData } from '../../lib/measure'
import type { Action, LoopState } from '../../state/loop'
import MeasureCanvas from '../MeasureCanvas'
import MolStarViewer from '../MolStarViewer'
import ErrorBoundary from '../ErrorBoundary'
import Define from '../Define'
import { PiBrief, NotebookNote } from '../StageChrome'
import { ACT1_RUN_NOTE } from '../../content/story'
import { useTier } from '../TierContext'
import { Kicker } from './ui'

const mono = "'IBM Plex Mono'"

export default function RunStage({
  state,
  dispatch,
  data,
}: {
  state: LoopState
  dispatch: Dispatch<Action>
  data: ExperimentData
}) {
  const { reducedMotion } = useTier()
  const segTimer = useRef<number | undefined>(undefined)

  useEffect(() => () => { if (segTimer.current) window.clearTimeout(segTimer.current) }, [])

  const idx = Math.min(state.vEmbryo, state.replicates - 1)
  const curPts = data[state.vGroup][idx]
  const curNN = nnDistances(curPts)
  const cellCount = curPts.length
  const seg = state.runStage !== 'idle'
  const meas = state.runStage === 'measured'

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
      ? 'RAW MICROGRAPH, not yet segmented'
      : state.runStage === 'segmented'
        ? `SEGMENTED, ${cellCount} nuclei centroids`
        : 'MEASURED, Voronoi + nearest-neighbor'

  const liveStats = [
    { label: 'Nuclei segmented', value: seg ? String(cellCount) : ', ', color: seg ? 'var(--c-green)' : 'var(--muted)' },
    { label: 'Voronoi cells', value: meas ? String(cellCount) : ', ', color: meas ? 'var(--c-blue)' : 'var(--muted)' },
    { label: 'Mean NN distance', value: meas ? (mean(curNN) * 1000).toFixed(1) + ' µm' : ', ', color: meas ? 'var(--accent)' : 'var(--muted)' },
    { label: 'NN spread (SD)', value: meas ? (Math.sqrt(variance(curNN)) * 1000).toFixed(1) + ' µm' : ', ', color: meas ? 'var(--text)' : 'var(--muted)' },
  ]

  return (
    <div className="stage-enter">
      <Kicker>
        05 · RUN / MEASURE, <span style={{ color: 'var(--c-green)' }}>genuine, in-browser</span>
      </Kicker>
      <PiBrief step={4} />
      <NotebookNote {...ACT1_RUN_NOTE} />
      <div style={{ fontSize: 12.5, color: 'var(--muted)', lineHeight: 1.5, marginBottom: 14 }}>
        <b style={{ color: 'var(--c-green)' }}>Step 1</b> (<Define t="segment">Segment</Define>) finds each
        cell and marks its center. <b style={{ color: 'var(--c-blue)' }}>Step 2</b> draws each cell's{' '}
        <Define t="voronoi">Voronoi</Define> territory and measures the{' '}
        <Define t="nearest-neighbor">nearest-neighbor</Define> distance in{' '}
        <Define t="µm">µm</Define>. This is real geometry, computed live. Expect the FN1-rich tissue to be
        more evenly spread, and the FN1-blocked control more crowded.{' '}
        <b style={{ color: 'var(--text)' }}>FN1-blocked is the control:</b> the FN1 road was removed on purpose,
        so it shows what happens without it.
      </div>
      <div className="col-run">
        <div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 14, marginBottom: 12, flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', gap: 8 }}>
              <button
                onClick={() => dispatch({ type: 'SET_GROUP', group: 'treat' })}
                aria-pressed={state.vGroup === 'treat'}
                style={{
                  minHeight: 40,
                  padding: '8px 15px',
                  borderRadius: 8,
                  border: `1.5px solid ${state.vGroup === 'treat' ? 'var(--c-blue)' : 'var(--line)'}`,
                  background: state.vGroup === 'treat' ? 'color-mix(in srgb, var(--c-blue) 16%, transparent)' : 'var(--panel)',
                  color: 'var(--text)',
                  cursor: 'pointer',
                  fontSize: 13,
                  fontWeight: 500,
                  fontFamily: "'IBM Plex Sans'",
                }}
              >
                FN1-rich
              </button>
              <button
                onClick={() => dispatch({ type: 'SET_GROUP', group: 'ctrl' })}
                aria-pressed={state.vGroup === 'ctrl'}
                style={{
                  minHeight: 40,
                  padding: '8px 15px',
                  borderRadius: 8,
                  border: `1.5px solid ${state.vGroup === 'ctrl' ? 'var(--c-amber)' : 'var(--line)'}`,
                  background: state.vGroup === 'ctrl' ? 'color-mix(in srgb, var(--c-amber) 16%, transparent)' : 'var(--panel)',
                  color: 'var(--text)',
                  cursor: 'pointer',
                  fontSize: 13,
                  fontWeight: 500,
                  fontFamily: "'IBM Plex Sans'",
                }}
              >
                FN1-blocked (control)
              </button>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ fontFamily: mono, fontSize: 11, color: 'var(--muted)' }}>EMBRYO</span>
              {Array.from({ length: state.replicates }, (_, i) => {
                const active = i === idx
                return (
                  <button
                    key={i}
                    onClick={() => dispatch({ type: 'SET_EMBRYO', index: i })}
                    aria-pressed={active}
                    aria-label={`Embryo ${i + 1}`}
                    style={{
                      width: 32,
                      height: 32,
                      borderRadius: 7,
                      border: `1.5px solid ${active ? 'var(--accent)' : 'var(--line)'}`,
                      background: active ? 'color-mix(in srgb, var(--accent) 18%, transparent)' : 'transparent',
                      color: active ? 'var(--text)' : 'var(--muted)',
                      cursor: 'pointer',
                      fontFamily: mono,
                      fontSize: 12,
                    }}
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
            {state.scanning && !reducedMotion && (
              <div style={{ position: 'absolute', left: 0, right: 0, top: 0, height: 3, background: 'linear-gradient(90deg, transparent, var(--c-green), transparent)', animation: 'scanline 1.1s linear infinite' }} />
            )}
          </div>

          <div style={{ display: 'flex', gap: 11, marginTop: 14, flexWrap: 'wrap' }}>
            <button
              onClick={doSegment}
              disabled={state.runStage !== 'idle'}
              style={{
                minHeight: 44,
                padding: '11px 18px',
                borderRadius: 9,
                border: '1.5px solid var(--c-green)',
                background: state.runStage === 'idle' ? 'color-mix(in srgb, var(--c-green) 16%, transparent)' : 'transparent',
                color: state.runStage === 'idle' ? 'var(--c-green)' : 'var(--muted)',
                cursor: state.runStage === 'idle' ? 'pointer' : 'default',
                fontWeight: 600,
                fontSize: 14,
                fontFamily: "'Space Grotesk'",
              }}
            >
              {state.runStage === 'idle' ? '1 · Segment nuclei' : '✓ Segmented'}
            </button>
            <button
              onClick={() => dispatch({ type: 'MEASURE' })}
              disabled={state.runStage !== 'segmented'}
              style={{
                minHeight: 44,
                padding: '11px 18px',
                borderRadius: 9,
                border: `1.5px solid ${seg && !meas ? 'var(--c-blue)' : 'var(--line)'}`,
                background: seg && !meas ? 'color-mix(in srgb, var(--c-blue) 16%, transparent)' : 'transparent',
                color: seg && !meas ? 'var(--c-blue)' : 'var(--muted)',
                cursor: seg && !meas ? 'pointer' : 'default',
                fontWeight: 600,
                fontSize: 14,
                fontFamily: "'Space Grotesk'",
              }}
            >
              {meas ? '✓ Measured' : '2 · Compute Voronoi + NN'}
            </button>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
          <aside style={{ border: '1px solid var(--line)', borderRadius: 14, background: 'var(--panel)', padding: 20 }}>
            <div style={{ fontFamily: mono, fontSize: 10, letterSpacing: '.14em', color: 'var(--muted)', marginBottom: 14 }}>
              LIVE READOUT, THIS EMBRYO
            </div>
            {liveStats.map((m) => (
              <div key={m.label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', padding: '9px 0', borderBottom: '1px solid var(--line)' }}>
                <span style={{ fontSize: 12.5, color: 'var(--muted)' }}>{m.label}</span>
                <span style={{ fontFamily: mono, fontSize: 15, color: m.color, fontWeight: 500 }}>{m.value}</span>
              </div>
            ))}
            <p style={{ fontSize: 12, lineHeight: 1.55, color: 'var(--muted)', marginTop: 16 }}>
              Each cell's center becomes a <b style={{ color: 'var(--text)' }}>Voronoi</b> territory, and we
              measure the nearest-neighbor distance. The geometry is computed here, not animated.
            </p>
          </aside>
          <ErrorBoundary
            fallback={
              <aside style={{ border: '1px solid var(--line)', borderRadius: 14, background: 'var(--panel)', padding: 16, fontFamily: "'IBM Plex Mono'", fontSize: 11.5, color: 'var(--muted)', lineHeight: 1.5 }}>
                Molecular viewer unavailable here, the discovery loop continues without it.
              </aside>
            }
          >
            <MolStarViewer />
          </ErrorBoundary>
        </div>
      </div>
    </div>
  )
}
