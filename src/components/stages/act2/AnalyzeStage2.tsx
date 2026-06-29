import { useState } from 'react'
import { MATEO2 } from '../../../content/act2'
import { bench, benchAgreement, benchReplicates } from '../../../lib/bench'
import type { LoopState } from '../../../state/loop'
import Define from '../../Define'
import { MateoNote, PiBrief } from '../../StageChrome'
import StatsHelpButton from '../../StatsExplainer'
import { Kicker } from '../ui'

const mono = "'IBM Plex Mono'"

export default function AnalyzeStage2({ state, onSeeHonestN }: { state: LoopState; onSeeHonestN?: () => void }) {
  const [revealed, setRevealed] = useState(false)
  const central = bench(state.stiffness, state.shape)
  const reps = benchReplicates(state.stiffness, state.shape, state.replicates)
  const agreement = benchAgreement(state.stiffness, state.shape, state.replicates)
  const decisive = central.confidence > 0.35

  return (
    <div className="stage-enter">
      <Kicker>06 · ANALYZE, one drag is not a result</Kicker>
      <PiBrief step={5} act="differentiate" />
      <h1 style={{ fontFamily: "'Space Grotesk'", fontWeight: 700, fontSize: 26, lineHeight: 1.15, marginBottom: 8 }}>
        Did the lean hold up across runs, or did one drag fool you?
      </h1>
      <p style={{ color: 'var(--muted)', fontSize: 13.5, lineHeight: 1.6, marginBottom: 14 }}>
        No buttons are needed to continue. Look at how your {state.replicates} model runs landed, then decide
        whether the bone-versus-cartilage lean is something you can trust.
      </p>

      <div style={{ border: '1px solid var(--line)', borderRadius: 12, background: 'var(--panel2)', padding: '12px 14px', marginBottom: 16 }}>
        <div style={{ fontSize: 13.5, lineHeight: 1.6, color: 'var(--text)' }}>
          Two ideas first. The <Define t="nuclear localization">nuclear YAP/TAZ fraction</Define> is how far
          your setting pushed the switch (past the middle line means a bone lean). One run is an anecdote;{' '}
          <b>agreement across independent runs</b> is what lets you call a pattern real.
        </div>
      </div>

      <div style={{ marginBottom: 16 }}>
        <StatsHelpButton context="bench" />
      </div>

      {/* the run plot: each replicate's nuclear fraction on a 0..1 axis */}
      <div style={{ border: '1px solid var(--line)', borderRadius: 14, background: 'var(--panel)', padding: 20, marginBottom: 16 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
          <span style={{ fontFamily: mono, fontSize: 10, letterSpacing: '.12em', color: 'var(--muted)' }}>YOUR {state.replicates} MODEL RUNS</span>
          <span style={{ fontFamily: mono, fontSize: 11, color: agreement === 1 ? 'var(--c-green)' : 'var(--c-amber)' }}>
            {Math.round(agreement * 100)}% agree
          </span>
        </div>
        <div style={{ position: 'relative', height: 70, borderRadius: 9, background: 'var(--bg2)', border: '1px solid var(--line)', overflow: 'hidden' }}>
          {/* cartilage / bone halves */}
          <div style={{ position: 'absolute', inset: 0, left: '50%', background: 'color-mix(in srgb, var(--c-blue) 9%, transparent)' }} />
          <div style={{ position: 'absolute', top: 6, left: 10, fontFamily: mono, fontSize: 9.5, color: 'var(--c-amber)' }}>Sox9 · cartilage</div>
          <div style={{ position: 'absolute', top: 6, right: 10, fontFamily: mono, fontSize: 9.5, color: 'var(--c-blue)' }}>RUNX2 · bone</div>
          {/* the 0.5 fate line */}
          <div style={{ position: 'absolute', top: 0, bottom: 0, left: '50%', width: 2, background: 'color-mix(in srgb, var(--text) 35%, transparent)' }} />
          {reps.map((n, i) => {
            const fateBone = n > 0.5
            const color = fateBone ? 'var(--c-blue)' : 'var(--c-amber)'
            return (
              <div
                key={i}
                title={`run ${i + 1}: ${(n * 100).toFixed(0)}% nuclear`}
                style={{ position: 'absolute', width: 14, height: 14, borderRadius: '50%', background: color, boxShadow: `0 0 8px ${color}`, transform: 'translate(-50%,-50%)', left: `${6 + n * 88}%`, top: `${38 + (i % 3) * 9}%` }}
              />
            )
          })}
        </div>
        <div style={{ fontFamily: mono, fontSize: 11, color: 'var(--muted)', marginTop: 10 }}>
          Each dot is one model run at your current stiffness and shape. Tight cluster on one side = a lean you
          can trust. Dots straddling the line = the model is undecided here.
        </div>
      </div>

      <div style={{ marginTop: 4 }}>
        {!revealed ? (
          <button
            onClick={() => {
              setRevealed(true)
              onSeeHonestN?.()
            }}
            style={{ width: '100%', minHeight: 46, borderRadius: 11, border: '1px dashed color-mix(in srgb, var(--accent) 55%, var(--line))', background: 'color-mix(in srgb, var(--accent) 8%, var(--panel))', color: 'var(--text)', cursor: 'pointer', fontFamily: "'Space Grotesk'", fontWeight: 600, fontSize: 14.5 }}
          >
            What counts as a result here? Tap to check your thinking →
          </button>
        ) : (
          <div className="stage-enter" style={{ borderLeft: '2px solid var(--accent)', padding: '8px 0 8px 16px' }}>
            <div style={{ fontFamily: mono, fontSize: 10, letterSpacing: '.12em', color: 'var(--accent)', marginBottom: 4 }}>AGREEMENT, NOT ONE DRAG</div>
            <p style={{ lineHeight: 1.6, color: 'var(--text)', fontSize: 15 }}>
              {decisive
                ? `Your runs agree (${Math.round(agreement * 100)}%), so the lean toward ${central.fate} is reproducible in the model, not a one-run fluke. That is what you are allowed to report: a model tendency, checked across runs.`
                : 'Your runs straddle the line, so the model is genuinely undecided at this setting. That is honest information too: it means stiffness and shape together did not push the switch far enough to call. Move the sliders to a more decisive setting, or report the uncertainty.'}
            </p>
          </div>
        )}
      </div>

      <div style={{ marginTop: 16 }}>
        <MateoNote>{MATEO2.mid}</MateoNote>
      </div>
    </div>
  )
}
