import type { Dispatch } from 'react'
import type { Action, LoopState } from '../../../state/loop'
import Define from '../../Define'
import { PiBrief } from '../../StageChrome'
import { Kicker, StageH1 } from '../ui'

export default function DesignStage3({ state, dispatch }: { state: LoopState; dispatch: Dispatch<Action> }) {
  const repOK = state.replicates >= 3
  const repColor = repOK ? 'var(--c-green)' : 'var(--c-amber)'
  const repTrackPct = `${((state.replicates - 1) / 5) * 100}%`

  return (
    <div className="stage-enter" style={{ maxWidth: 920 }}>
      <Kicker>04 · DESIGN THE COMPARISON</Kicker>
      <PiBrief step={3} act="derail" />
      <StageH1>Make it fair, and label it honestly.</StageH1>
      <p style={{ color: 'var(--muted)', lineHeight: 1.6, marginBottom: 12 }}>
        To trust that the invasive front is more disordered, you need a baseline to compare it against, enough
        sample regions to trust a pattern, and an honest label for what this sample really is.
      </p>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px 16px', marginBottom: 22, fontFamily: "'IBM Plex Mono'", fontSize: 11.5 }}>
        {[
          { ok: state.control, label: 'Normal-tissue control on' },
          { ok: repOK, label: `3+ sample regions (now ${state.replicates})` },
          { ok: state.modelLabeled, label: 'Labeled as a model' },
        ].map((c) => (
          <span key={c.label} style={{ color: c.ok ? 'var(--c-green)' : 'var(--muted)' }}>
            {c.ok ? '✓' : '○'} {c.label}
          </span>
        ))}
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        {/* matched normal-tissue control */}
        <div style={{ border: `1.5px solid ${state.control ? 'var(--c-green)' : 'var(--line)'}`, borderRadius: 13, background: 'var(--panel)', padding: '18px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 20, flexWrap: 'wrap' }}>
          <div style={{ minWidth: 220, flex: 1 }}>
            <div style={{ fontFamily: "'Space Grotesk'", fontWeight: 600, fontSize: 16, marginBottom: 3 }}>Add a matched normal-tissue control</div>
            <div style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.5 }}>
              The <Define t="control group">control</Define> is the organized normal tissue right next to the
              margin. Without it, a disordered image supports nothing. <b>Turn this on.</b>
            </div>
          </div>
          <div style={{ flex: 'none', display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{ fontFamily: "'IBM Plex Mono'", fontSize: 12, letterSpacing: '.12em', fontWeight: 600, color: state.control ? 'var(--c-green)' : 'var(--muted)', width: 30, textAlign: 'right' }}>{state.control ? 'ON' : 'OFF'}</span>
            <button onClick={() => dispatch({ type: 'TOGGLE_CONTROL' })} role="switch" aria-checked={state.control} aria-label="Normal-tissue control on or off" style={{ width: 60, height: 32, borderRadius: 32, border: 'none', cursor: 'pointer', background: state.control ? 'var(--c-green)' : 'var(--bg2)', position: 'relative', transition: 'background .2s' }}>
              <span style={{ position: 'absolute', top: 3, left: state.control ? 31 : 3, width: 26, height: 26, borderRadius: '50%', background: '#fff', transition: 'left .2s' }} />
            </button>
          </div>
        </div>

        {/* sample regions */}
        <div style={{ border: `1.5px solid ${repColor}`, borderRadius: 13, background: 'var(--panel)', padding: '18px 20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 }}>
            <div style={{ fontFamily: "'Space Grotesk'", fontWeight: 600, fontSize: 16 }}>Sample regions</div>
            <div style={{ fontFamily: "'IBM Plex Mono'", fontSize: 20, color: repColor, fontWeight: 500 }}>
              {state.replicates} <span style={{ fontSize: 12, color: 'var(--muted)' }}>regions</span>
            </div>
          </div>
          <div style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.5, marginBottom: 14 }}>
            <b>Drag to at least 3.</b> One striking field is an anecdote. A real pattern shows up across several
            independent <Define t="replicate">sample regions</Define> of the margin.
          </div>
          <input type="range" min={1} max={6} step={1} value={state.replicates} onChange={(e) => dispatch({ type: 'SET_REP', value: parseInt(e.target.value, 10) })} aria-label="Number of sample regions" aria-valuetext={`${state.replicates} regions`} style={{ width: '100%', background: `linear-gradient(90deg, ${repColor} ${repTrackPct}, var(--bg2) ${repTrackPct})` }} />
          <div style={{ fontFamily: "'IBM Plex Mono'", fontSize: 11.5, marginTop: 10, color: repColor }}>
            {repOK ? '✓ Enough regions to separate a real signal from one odd field.' : '⚠ Under 3, one field can fool you.'}
          </div>
        </div>

        {/* model honesty label */}
        <div style={{ border: `1.5px solid ${state.modelLabeled ? 'var(--c-green)' : 'color-mix(in srgb, var(--c-pink) 45%, var(--line))'}`, borderRadius: 13, background: state.modelLabeled ? 'color-mix(in srgb, var(--c-green) 6%, var(--panel))' : 'color-mix(in srgb, var(--c-pink) 6%, var(--panel))', padding: '18px 20px' }}>
          <div style={{ fontFamily: "'Space Grotesk'", fontWeight: 600, fontSize: 16, marginBottom: 3 }}>Label what this sample really is</div>
          <div style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.5, marginBottom: 14 }}>
            This is the honesty step. It is a <b style={{ color: 'var(--text)' }}>model of a sibling
            carcinoma</b> margin, not Mateo and not a specific patient. And a disordered margin is{' '}
            <Define t="local invasion">local invasion</Define>, which is not the same as{' '}
            <Define t="metastasis">spread to other organs</Define>.
          </div>
          <button onClick={() => dispatch({ type: 'TOGGLE_MODEL_LABEL' })} aria-pressed={state.modelLabeled} style={{ minHeight: 44, padding: '12px 16px', borderRadius: 10, border: `1.5px solid ${state.modelLabeled ? 'var(--c-green)' : 'var(--line)'}`, background: state.modelLabeled ? 'color-mix(in srgb, var(--c-green) 12%, var(--panel2))' : 'var(--panel2)', color: 'var(--text)', cursor: 'pointer', textAlign: 'left', width: '100%', fontSize: 13.5, lineHeight: 1.45 }}>
            {state.modelLabeled ? '✓ ' : '○ '}
            I will report this as a model sibling-carcinoma margin showing local invasion, not as a patient and not as metastasis.
          </button>
        </div>
      </div>
    </div>
  )
}
