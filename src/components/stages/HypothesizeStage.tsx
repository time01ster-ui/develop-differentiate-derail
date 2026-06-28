import type { Dispatch } from 'react'
import { HYPOTHESES } from '../../content/act1'
import { ACT1_HYP_NOTE } from '../../content/story'
import type { Action, LoopState } from '../../state/loop'
import Define from '../Define'
import { PiBrief, NotebookNote } from '../StageChrome'
import { Kicker, StageH1 } from './ui'

export default function HypothesizeStage({ state, dispatch }: { state: LoopState; dispatch: Dispatch<Action> }) {
  return (
    <div className="stage-enter" style={{ maxWidth: 880 }}>
      <Kicker>02 · HYPOTHESIZE</Kicker>
      <PiBrief step={1} />
      <NotebookNote {...ACT1_HYP_NOTE} />
      <StageH1>Pick the idea you want to test.</StageH1>
      <p style={{ color: 'var(--muted)', lineHeight: 1.6, marginBottom: 10 }}>
        A <Define t="hypothesis">hypothesis</Define> is your best guess for HOW something works (its{' '}
        <Define t="mechanism">mechanism</Define>), written so an experiment could prove it wrong. Pick the
        guess you want to test.
      </p>
      <div style={{ fontFamily: "'IBM Plex Mono'", fontSize: 12, color: 'var(--muted)', marginBottom: 22 }}>
        New words you'll meet: <Define t="fn1">FN1</Define> · <Define t="graded">graded</Define> ·{' '}
        <Define t="nuclear spacing">nuclear spacing</Define> · <Define t="control">control</Define>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 13 }}>
        {HYPOTHESES.map((h) => {
          const sel = state.hypChoice === h.id
          return (
            <button
              key={h.id}
              onClick={() => dispatch({ type: 'PICK_HYP', id: h.id })}
              aria-pressed={sel}
              style={{
                textAlign: 'left',
                padding: '18px 20px',
                borderRadius: 12,
                border: `1.5px solid ${sel ? 'var(--accent)' : 'var(--line)'}`,
                background: sel ? 'color-mix(in srgb, var(--accent) 9%, var(--panel))' : 'var(--panel)',
                cursor: 'pointer',
                display: 'flex',
                gap: 16,
                alignItems: 'flex-start',
              }}
            >
              <span
                style={{
                  flex: 'none',
                  width: 22,
                  height: 22,
                  borderRadius: '50%',
                  border: `2px solid ${sel ? 'var(--accent)' : 'var(--line)'}`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginTop: 1,
                }}
              >
                <span style={{ width: 9, height: 9, borderRadius: '50%', background: sel ? 'var(--accent)' : 'transparent' }} />
              </span>
              <div>
                <div style={{ fontSize: 16, lineHeight: 1.45, color: 'var(--text)', fontWeight: 500 }}>{h.text}</div>
                {sel && (
                  <div style={{ fontFamily: "'IBM Plex Mono'", fontSize: 11, color: 'var(--accent)', marginTop: 8, letterSpacing: '.04em' }}>
                    → Prediction: {h.prediction}
                  </div>
                )}
              </div>
            </button>
          )
        })}
      </div>
    </div>
  )
}
