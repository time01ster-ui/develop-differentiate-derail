import type { Dispatch } from 'react'
import { CLAIMS3, RUNG_COLORS3, RUNG_NAMES3 } from '../../../content/act3'
import { ceiling, type Action, type LoopState } from '../../../state/loop'
import Define from '../../Define'
import { PiBrief } from '../../StageChrome'
import { Kicker } from '../ui'

const mono = "'IBM Plex Mono'"

export default function ConcludeStage3({ state, dispatch }: { state: LoopState; dispatch: Dispatch<Action> }) {
  const ceil = ceiling(state.rungs, state.act)
  const ceilName = RUNG_NAMES3[ceil]
  const ceilColor = `var(${RUNG_COLORS3[ceil]})`

  return (
    <div className="stage-enter" style={{ maxWidth: 920 }}>
      <Kicker>07 · CONCLUDE, the ladder gates your claim</Kicker>
      <PiBrief step={6} act="derail" />
      <h1 style={{ fontFamily: "'Space Grotesk'", fontWeight: 700, fontSize: 27, lineHeight: 1.15, marginBottom: 8 }}>
        What are you actually allowed to say?
      </h1>
      <p style={{ color: 'var(--muted)', lineHeight: 1.6, marginBottom: 12 }}>
        Your evidence reaches the <b style={{ color: ceilColor }}>{ceilName}</b> rung. This is a model sibling
        margin, so a claim about a patient, or about spread to other organs, sits above any rung you can reach.
      </p>
      <div style={{ border: '1px solid color-mix(in srgb, var(--c-pink) 30%, var(--line))', borderRadius: 12, background: 'color-mix(in srgb, var(--c-pink) 6%, var(--panel))', padding: '11px 14px', marginBottom: 18 }}>
        <p style={{ fontSize: 13, lineHeight: 1.55, color: 'var(--text)' }}>
          Remember two limits: you measured <b>disorder in a model</b>, not force in a real tumor, and a
          disordered margin is <Define t="local invasion">local invasion</Define>, which is not the same as{' '}
          <Define t="metastasis">spread to distant organs</Define>. Describe the model margin, not a patient.
        </p>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 13, marginTop: 20 }}>
        {CLAIMS3.map((c) => {
          const sel = state.claim === c.id
          const ok = c.req <= ceil
          const reqColor = ok ? 'var(--c-green)' : 'var(--c-pink)'
          let verdict = ''
          let vColor = ''
          if (sel) {
            if (state.claimResult === 'valid') {
              verdict = '✓ Supported, your evidence reaches this rung. Conclusion logged.'
              vColor = 'var(--c-green)'
            } else {
              verdict =
                c.req >= 4
                  ? '✗ Blocked, that is a claim about a real patient or about metastasis. This is a model sibling margin showing local invasion, and the in-vivo causal rung is locked, so you cannot make it.'
                  : '✗ Blocked, this needs the rung-' + c.req + ' tool, which you did not run.'
              vColor = 'var(--c-pink)'
            }
          }
          return (
            <button
              key={c.id}
              onClick={() => dispatch({ type: 'PICK_CLAIM', id: c.id })}
              aria-pressed={sel}
              style={{ textAlign: 'left', padding: '17px 19px', borderRadius: 12, border: `1.5px solid ${sel ? (ok ? 'var(--c-green)' : 'var(--c-pink)') : 'var(--line)'}`, background: sel ? (ok ? 'color-mix(in srgb, var(--c-green) 10%, var(--panel))' : 'color-mix(in srgb, var(--c-pink) 9%, var(--panel))') : 'var(--panel)', cursor: 'pointer', display: 'flex', gap: 15, alignItems: 'flex-start' }}
            >
              <span style={{ flex: 'none', fontFamily: mono, fontSize: 11, color: reqColor, border: `1px solid ${reqColor}`, padding: '3px 7px', borderRadius: 5, marginTop: 2, whiteSpace: 'nowrap' }}>rung {c.req}</span>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 15.5, lineHeight: 1.45, color: 'var(--text)', fontWeight: 500 }}>{c.text}</div>
                {sel && <div style={{ fontFamily: mono, fontSize: 12, marginTop: 9, color: vColor, lineHeight: 1.45 }}>{verdict}</div>}
              </div>
            </button>
          )
        })}
      </div>
      {state.claimResult === 'blocked' && (
        <div style={{ marginTop: 16, border: '1px solid color-mix(in srgb, var(--c-pink) 40%, var(--line))', borderRadius: 10, background: 'color-mix(in srgb, var(--c-pink) 8%, var(--panel))', padding: '11px 14px', fontSize: 13.5, lineHeight: 1.5, color: 'var(--text)' }}>
          That claim is above your evidence. Pick the strongest claim <b>at or below the {ceilName} rung</b>, or go back and add a more direct tool.
        </div>
      )}
      {state.claimResult === 'valid' && (
        <div style={{ marginTop: 18, border: '1px solid color-mix(in srgb, var(--c-green) 35%, var(--line))', borderRadius: 12, background: 'color-mix(in srgb, var(--c-green) 6%, var(--panel))', padding: '14px 16px' }}>
          <div style={{ fontFamily: mono, fontSize: 10, letterSpacing: '.12em', color: 'var(--c-green)', marginBottom: 7 }}>HOW A WORKING SCIENTIST READ THIS</div>
          <p style={{ fontSize: 13.5, lineHeight: 1.6, color: 'var(--text)', marginBottom: 8 }}>
            They would say exactly what the model showed: in this sibling-carcinoma model, the invasive margin is
            more disordered than the matched normal tissue. Then they would <b>stop there</b>, because a model is
            not a patient, and local invasion at a margin is not proof of spread to other organs.
          </p>
          <p style={{ fontSize: 12.5, lineHeight: 1.55, color: 'var(--muted)' }}>
            What you got right: you read the same force chain across all three acts and refused the leap from a
            model to a patient. That restraint is the whole job.
          </p>
        </div>
      )}
    </div>
  )
}
