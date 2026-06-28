import type { Dispatch } from 'react'
import type { Action, LoopState } from '../../../state/loop'
import Define from '../../Define'
import { PiBrief } from '../../StageChrome'
import { Kicker, StageH1 } from '../ui'

export default function DesignStage2({ state, dispatch }: { state: LoopState; dispatch: Dispatch<Action> }) {
  const repOK = state.replicates >= 3
  const repColor = repOK ? 'var(--c-green)' : 'var(--c-amber)'
  const repTrackPct = `${((state.replicates - 1) / 5) * 100}%`

  return (
    <div className="stage-enter" style={{ maxWidth: 920 }}>
      <Kicker>04 · DESIGN THE MODEL RUN</Kicker>
      <PiBrief step={3} act="differentiate" />
      <StageH1>Make the model run fair, and label it honestly.</StageH1>
      <p style={{ color: 'var(--muted)', lineHeight: 1.6, marginBottom: 12 }}>
        The bench is a model, so the same rules apply as a real experiment. You need a baseline to compare
        against, enough runs to trust a pattern, and an honest label for what the bench actually is.
      </p>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px 16px', marginBottom: 22, fontFamily: "'IBM Plex Mono'", fontSize: 11.5 }}>
        {[
          { ok: state.control, label: 'Baseline on' },
          { ok: repOK, label: `3+ model runs (now ${state.replicates})` },
          { ok: state.modelLabeled, label: 'Labeled as a model' },
        ].map((c) => (
          <span key={c.label} style={{ color: c.ok ? 'var(--c-green)' : 'var(--muted)' }}>
            {c.ok ? '✓' : '○'} {c.label}
          </span>
        ))}
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        {/* Baseline / control */}
        <div
          style={{
            border: `1.5px solid ${state.control ? 'var(--c-green)' : 'var(--line)'}`,
            borderRadius: 13,
            background: 'var(--panel)',
            padding: '18px 20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 20,
            flexWrap: 'wrap',
          }}
        >
          <div style={{ minWidth: 220, flex: 1 }}>
            <div style={{ fontFamily: "'Space Grotesk'", fontWeight: 600, fontSize: 16, marginBottom: 3 }}>Add a baseline</div>
            <div style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.5 }}>
              A <Define t="control group">baseline</Define> is the soft-and-round starting point you compare every
              run against. Without it, a bone reading means nothing. <b>Turn this on.</b>
            </div>
          </div>
          <div style={{ flex: 'none', display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{ fontFamily: "'IBM Plex Mono'", fontSize: 12, letterSpacing: '.12em', fontWeight: 600, color: state.control ? 'var(--c-green)' : 'var(--muted)', width: 30, textAlign: 'right' }}>{state.control ? 'ON' : 'OFF'}</span>
            <button
              onClick={() => dispatch({ type: 'TOGGLE_CONTROL' })}
              role="switch"
              aria-checked={state.control}
              aria-label="Baseline group on or off"
              style={{ width: 60, height: 32, borderRadius: 32, border: 'none', cursor: 'pointer', background: state.control ? 'var(--c-green)' : 'var(--bg2)', position: 'relative', transition: 'background .2s' }}
            >
              <span style={{ position: 'absolute', top: 3, left: state.control ? 31 : 3, width: 26, height: 26, borderRadius: '50%', background: '#fff', transition: 'left .2s' }} />
            </button>
          </div>
        </div>

        {/* Replicate model runs */}
        <div style={{ border: `1.5px solid ${repColor}`, borderRadius: 13, background: 'var(--panel)', padding: '18px 20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 }}>
            <div style={{ fontFamily: "'Space Grotesk'", fontWeight: 600, fontSize: 16 }}>Replicate model runs</div>
            <div style={{ fontFamily: "'IBM Plex Mono'", fontSize: 20, color: repColor, fontWeight: 500 }}>
              {state.replicates} <span style={{ fontSize: 12, color: 'var(--muted)' }}>runs</span>
            </div>
          </div>
          <div style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.5, marginBottom: 14 }}>
            <b>Drag to at least 3.</b> One dramatic slider drag is an anecdote. A pattern you can trust shows up
            again across <Define t="replicate">independent runs</Define> of the model.
          </div>
          <input
            type="range"
            min={1}
            max={6}
            step={1}
            value={state.replicates}
            onChange={(e) => dispatch({ type: 'SET_REP', value: parseInt(e.target.value, 10) })}
            aria-label="Number of replicate model runs"
            aria-valuetext={`${state.replicates} runs`}
            style={{ width: '100%', background: `linear-gradient(90deg, ${repColor} ${repTrackPct}, var(--bg2) ${repTrackPct})` }}
          />
          <div style={{ fontFamily: "'IBM Plex Mono'", fontSize: 11.5, marginTop: 10, color: repColor }}>
            {repOK ? '✓ Enough runs to see whether the lean is reproducible.' : '⚠ Under 3, one run can fool you.'}
          </div>
        </div>

        {/* Model honesty label */}
        <div style={{ border: `1.5px solid ${state.modelLabeled ? 'var(--c-green)' : 'color-mix(in srgb, var(--c-pink) 45%, var(--line))'}`, borderRadius: 13, background: state.modelLabeled ? 'color-mix(in srgb, var(--c-green) 6%, var(--panel))' : 'color-mix(in srgb, var(--c-pink) 6%, var(--panel))', padding: '18px 20px' }}>
          <div style={{ fontFamily: "'Space Grotesk'", fontWeight: 600, fontSize: 16, marginBottom: 3 }}>Label what the bench really is</div>
          <div style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.5, marginBottom: 14 }}>
            This is the Act II honesty step. The bench is a <b style={{ color: 'var(--text)' }}>model of the
            relationship</b>, not a measurement of Mateo's actual tissue. Saying so out loud is what keeps your
            later claim honest.
          </div>
          <button
            onClick={() => dispatch({ type: 'TOGGLE_MODEL_LABEL' })}
            aria-pressed={state.modelLabeled}
            style={{
              minHeight: 44,
              padding: '12px 16px',
              borderRadius: 10,
              border: `1.5px solid ${state.modelLabeled ? 'var(--c-green)' : 'var(--line)'}`,
              background: state.modelLabeled ? 'color-mix(in srgb, var(--c-green) 12%, var(--panel2))' : 'var(--panel2)',
              color: 'var(--text)',
              cursor: 'pointer',
              textAlign: 'left',
              width: '100%',
              fontSize: 13.5,
              lineHeight: 1.45,
            }}
          >
            {state.modelLabeled ? '✓ ' : '○ '}
            I will report this as a model of stiffness, shape, and fate, not as Mateo's measured tissue.
          </button>
        </div>
      </div>
    </div>
  )
}
