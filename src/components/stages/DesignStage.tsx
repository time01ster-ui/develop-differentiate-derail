import type { Dispatch, KeyboardEvent } from 'react'
import type { Action, LoopState } from '../../state/loop'
import Define from '../Define'
import { PiBrief, NotebookNote } from '../StageChrome'
import { ACT1_DESIGN_NOTE } from '../../content/story'
import { CONTROLS } from '../../content/act1'
import { Kicker, StageH1 } from './ui'

export default function DesignStage({ state, dispatch }: { state: LoopState; dispatch: Dispatch<Action> }) {
  const repOK = state.replicates >= 3
  const repColor = repOK ? 'var(--c-green)' : 'var(--c-amber)'
  const repTrackPct = `${((state.replicates - 1) / 5) * 100}%`

  // The two distance options below are role="button" divs, not <button>, because
  // each holds a <Define> term that renders its own button (a button may not nest
  // in a button). Keep keyboard activation a real button would have.
  const onCardKey = (e: KeyboardEvent<HTMLElement>) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      e.currentTarget.click()
    }
  }

  return (
    <div className="stage-enter" style={{ maxWidth: 920 }}>
      <Kicker>04 · DESIGN THE EXPERIMENT</Kicker>
      <PiBrief step={3} />
      <NotebookNote {...ACT1_DESIGN_NOTE} />
      <StageH1>Make it honest before you run it.</StageH1>
      <p style={{ color: 'var(--muted)', lineHeight: 1.6, marginBottom: 12 }}>
        Three decisions separate a real experiment from a pretty picture. These choices make your
        experiment fair and honest; they do not change the numbers in this particular dataset.
      </p>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px 16px', marginBottom: 22, fontFamily: "'IBM Plex Mono'", fontSize: 11.5 }}>
        {[
          { ok: state.control, label: 'Control chosen' },
          { ok: state.replicates >= 3, label: `3+ embryos (now ${state.replicates})` },
          { ok: !!state.distance, label: 'Distance labeled' },
        ].map((c) => (
          <span key={c.label} style={{ color: c.ok ? 'var(--c-green)' : 'var(--muted)' }}>
            {c.ok ? '✓' : '○'} {c.label}
          </span>
        ))}
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        {/* Control group: the student chooses the right one (positive, negative, distractors) */}
        <div style={{ border: `1.5px solid ${state.control ? 'var(--c-green)' : 'var(--line)'}`, borderRadius: 13, background: 'var(--panel)', padding: '18px 20px' }}>
          <div style={{ fontFamily: "'Space Grotesk'", fontWeight: 600, fontSize: 16, marginBottom: 4 }}>Choose your control</div>
          <div style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.5, marginBottom: 14 }}>
            A <Define t="control group">control</Define> is the comparison that isolates the one thing you are testing, here the FN1 road. Pick the comparison that changes <b>only</b> that. A <b>positive control</b> (a sample you already know is ordered) is a strong addition that checks your method. Tap an option to see why it is or is not a control. One of these is the control your claim will rest on.
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {CONTROLS.map((c) => {
              const sel = state.controlChoices.includes(c.id)
              const okColor = c.good ? 'var(--c-green)' : 'var(--c-amber)'
              return (
                <div
                  key={c.id}
                  role="button"
                  tabIndex={0}
                  onClick={() => dispatch({ type: 'TOGGLE_CONTROL_CHOICE', id: c.id })}
                  onKeyDown={onCardKey}
                  aria-pressed={sel}
                  style={{ border: `1.5px solid ${sel ? okColor : 'var(--line)'}`, borderRadius: 10, background: sel ? `color-mix(in srgb, ${okColor} 10%, var(--panel2))` : 'var(--panel2)', padding: '12px 14px', cursor: 'pointer' }}
                >
                  <div style={{ fontSize: 13.5, color: 'var(--text)', fontWeight: 500, lineHeight: 1.45 }}>
                    {sel ? (c.good ? '✓ ' : '○ ') : ''}
                    {c.label}
                  </div>
                  {sel && (
                    <div style={{ fontFamily: "'IBM Plex Mono'", fontSize: 12, lineHeight: 1.55, marginTop: 8, color: c.good ? 'var(--c-green)' : 'var(--c-amber)' }}>
                      {c.good ? '✓ ' : '✗ not a control · '}
                      {c.why}
                    </div>
                  )}
                </div>
              )
            })}
          </div>
          <div style={{ fontFamily: "'IBM Plex Mono'", fontSize: 11.5, marginTop: 12, color: state.control ? 'var(--c-green)' : 'var(--c-amber)' }}>
            {state.control
              ? '✓ You chose the control that isolates FN1. (The positive control is a strong extra check.)'
              : '⚠ Pick the comparison that changes only the FN1 road and keeps everything else the same.'}
          </div>
        </div>

        {/* Biological replicates */}
        <div style={{ border: `1.5px solid ${repColor}`, borderRadius: 13, background: 'var(--panel)', padding: '18px 20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 }}>
            <div style={{ fontFamily: "'Space Grotesk'", fontWeight: 600, fontSize: 16 }}>Biological replicates</div>
            <div style={{ fontFamily: "'IBM Plex Mono'", fontSize: 20, color: repColor, fontWeight: 500 }}>
              {state.replicates} <span style={{ fontSize: 12, color: 'var(--muted)' }}>embryos</span>
            </div>
          </div>
          <div style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.5, marginBottom: 14 }}>
            <b>Drag to at least 3</b>, so one weird embryo can't fool you. Each embryo is a separate
            animal (a <Define t="biological replicate">biological replicate</Define>), not just another
            cell from the same one.
          </div>
          <input
            type="range"
            min={1}
            max={6}
            step={1}
            value={state.replicates}
            onChange={(e) => dispatch({ type: 'SET_REP', value: parseInt(e.target.value, 10) })}
            aria-label="Number of biological replicates"
            aria-valuetext={`${state.replicates} embryos`}
            style={{
              width: '100%',
              background: `linear-gradient(90deg, ${repColor} ${repTrackPct}, var(--bg2) ${repTrackPct})`,
            }}
          />
          <div style={{ fontFamily: "'IBM Plex Mono'", fontSize: 11.5, marginTop: 10, color: repColor }}>
            {repOK
              ? '✓ Enough to estimate biological variation.'
              : '⚠ Under 3, you can’t separate signal from embryo-to-embryo noise.'}
          </div>
        </div>

        {/* Distance label */}
        <div style={{ border: `1.5px solid ${state.distance ? 'var(--c-green)' : 'var(--line)'}`, borderRadius: 13, background: 'var(--panel)', padding: '18px 20px' }}>
          <div style={{ fontFamily: "'Space Grotesk'", fontWeight: 600, fontSize: 16, marginBottom: 3 }}>Label the distance you’ll measure</div>
          <div style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.5, marginBottom: 14 }}>
            You measure spacing on a flat photo. In a real embryo the cells sit in <b>3D</b> tissue, but your photo is a
            flat <b>2D shadow</b> of it, so a flat image can only give a 2D-projected distance. Be honest about what that
            number really is. Careful: <b>"True 3D" sounds more correct, but it's the trap</b> here. (You will see exactly
            why at the Run step.)
          </div>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <div
              role="button"
              tabIndex={0}
              onClick={() => dispatch({ type: 'SET_DIST', dist: '2d' })}
              onKeyDown={onCardKey}
              aria-pressed={state.distance === '2d'}
              style={{
                flex: 1,
                minWidth: 200,
                padding: 13,
                borderRadius: 10,
                border: `1.5px solid ${state.distance === '2d' ? 'var(--c-green)' : 'var(--line)'}`,
                background: state.distance === '2d' ? 'color-mix(in srgb, var(--c-green) 12%, var(--panel2))' : 'var(--panel2)',
                cursor: 'pointer',
                textAlign: 'left',
              }}
            >
              <div style={{ fontWeight: 600, fontSize: 14, color: 'var(--text)' }}>{state.distance === '2d' ? '✓ ' : ''}<Define t="2d-projected">2D-projected</Define> distance</div>
              <div style={{ fontSize: 12, color: 'var(--muted)', marginTop: 3 }}>Honest: it's a shadow of the real 3D spacing.</div>
            </div>
            <div
              role="button"
              tabIndex={0}
              onClick={() => dispatch({ type: 'SET_DIST', dist: '3d' })}
              onKeyDown={onCardKey}
              aria-pressed={state.distance === '3d'}
              style={{
                flex: 1,
                minWidth: 200,
                padding: 13,
                borderRadius: 10,
                border: `1.5px solid ${state.distance === '3d' ? 'var(--c-amber)' : 'var(--line)'}`,
                background: state.distance === '3d' ? 'color-mix(in srgb, var(--c-amber) 12%, var(--panel2))' : 'var(--panel2)',
                cursor: 'pointer',
                textAlign: 'left',
              }}
            >
              <div style={{ fontWeight: 600, fontSize: 14, color: 'var(--text)' }}>True 3D distance</div>
              <div style={{ fontSize: 12, color: 'var(--muted)', marginTop: 3 }}>Overclaim: a flat photo has no <Define t="z-axis">z-axis</Define> (depth).</div>
            </div>
          </div>
          {state.distance === '3d' && (
            <div style={{ fontFamily: "'IBM Plex Mono'", fontSize: 11.5, marginTop: 12, color: 'var(--c-amber)' }}>
              ⚠ A flat image can’t give true 3D distance, you’d be claiming a measurement you didn’t make.
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
