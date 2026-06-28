import type { Dispatch } from 'react'
import { CLAIMS, RUNG_COLORS, RUNG_NAMES } from '../../content/act1'
import { ceiling, type Action, type LoopState } from '../../state/loop'
import Define from '../Define'
import { PiBrief, NotebookNote } from '../StageChrome'
import { ACT1_CONCLUDE_NOTE } from '../../content/story'
import { Kicker } from './ui'

const mono = "'IBM Plex Mono'"

export default function ConcludeStage({ state, dispatch }: { state: LoopState; dispatch: Dispatch<Action> }) {
  const ceil = ceiling(state.rungs, state.act)
  const ceilName = RUNG_NAMES[ceil]
  const ceilColor = `var(${RUNG_COLORS[ceil]})`

  return (
    <div className="stage-enter" style={{ maxWidth: 920 }}>
      <Kicker>07 · CONCLUDE, the ladder gates your claim</Kicker>
      <PiBrief step={6} />
      <NotebookNote {...ACT1_CONCLUDE_NOTE} />
      <h1 style={{ fontFamily: "'Space Grotesk'", fontWeight: 700, fontSize: 27, lineHeight: 1.15, marginBottom: 8 }}>
        What are you actually allowed to say?
      </h1>
      <p style={{ color: 'var(--muted)', lineHeight: 1.6, marginBottom: 12 }}>
        Your evidence reaches the <b style={{ color: ceilColor }}>{ceilName}</b> rung. A claim above
        that line isn't supported, no matter how clean the data looks.
      </p>
      {/* the lesson, shown BEFORE the click (not only after a wrong one) */}
      <div style={{ border: '1px solid color-mix(in srgb, var(--c-pink) 30%, var(--line))', borderRadius: 12, background: 'color-mix(in srgb, var(--c-pink) 6%, var(--panel))', padding: '11px 14px', marginBottom: 18 }}>
        <p style={{ fontSize: 13, lineHeight: 1.55, color: 'var(--text)' }}>
          Remember: your tools measured <b>where</b> the cells sit (their spacing), not the{' '}
          <b><Define t="tension">force</Define></b> between them. A force claim needs a tool you couldn't reach in this lab.
        </p>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 13, marginTop: 20 }}>
        {CLAIMS.map((c) => {
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
                c.id === 'tension'
                  ? '✗ Blocked, spatial spacing alone is not tension. You measured where nuclei sit, not the force between them.'
                  : '✗ Blocked, this needs the rung-' + c.req + ' instrument, which you didn’t run.'
              vColor = 'var(--c-pink)'
            }
          }
          return (
            <button
              key={c.id}
              onClick={() => dispatch({ type: 'PICK_CLAIM', id: c.id })}
              aria-pressed={sel}
              style={{
                textAlign: 'left',
                padding: '17px 19px',
                borderRadius: 12,
                border: `1.5px solid ${sel ? (ok ? 'var(--c-green)' : 'var(--c-pink)') : 'var(--line)'}`,
                background: sel
                  ? ok
                    ? 'color-mix(in srgb, var(--c-green) 10%, var(--panel))'
                    : 'color-mix(in srgb, var(--c-pink) 9%, var(--panel))'
                  : 'var(--panel)',
                cursor: 'pointer',
                display: 'flex',
                gap: 15,
                alignItems: 'flex-start',
              }}
            >
              <span style={{ flex: 'none', fontFamily: mono, fontSize: 11, color: reqColor, border: `1px solid ${reqColor}`, padding: '3px 7px', borderRadius: 5, marginTop: 2, whiteSpace: 'nowrap' }}>
                rung {c.req}
              </span>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 15.5, lineHeight: 1.45, color: 'var(--text)', fontWeight: 500 }}>{c.text}</div>
                {sel && (
                  <div style={{ fontFamily: mono, fontSize: 12, marginTop: 9, color: vColor, lineHeight: 1.45 }}>{verdict}</div>
                )}
              </div>
            </button>
          )
        })}
      </div>
      {state.claimResult === 'blocked' && (
        <div style={{ marginTop: 16, border: '1px solid color-mix(in srgb, var(--c-pink) 40%, var(--line))', borderRadius: 10, background: 'color-mix(in srgb, var(--c-pink) 8%, var(--panel))', padding: '11px 14px', fontSize: 13.5, lineHeight: 1.5, color: 'var(--text)' }}>
          That claim is above your evidence. Pick the strongest claim <b>at or below the {ceilName} rung</b> to continue, or go back and choose a more direct tool.
        </div>
      )}
      {state.claimResult === 'valid' && (
        <div style={{ marginTop: 18, border: '1px solid color-mix(in srgb, var(--c-green) 35%, var(--line))', borderRadius: 12, background: 'color-mix(in srgb, var(--c-green) 6%, var(--panel))', padding: '14px 16px' }}>
          <div style={{ fontFamily: mono, fontSize: 10, letterSpacing: '.12em', color: 'var(--c-green)', marginBottom: 7 }}>HOW A WORKING SCIENTIST READ THIS</div>
          <p style={{ fontSize: 13.5, lineHeight: 1.6, color: 'var(--text)', marginBottom: 8 }}>
            They would say exactly what you did: the nuclei are non-randomly spaced in FN1-rich tissue compared with the control. Then they would <b>stop there</b>, because spacing is organization, not force. Calling it tension would need a tool this lab does not have.
          </p>
          <p style={{ fontSize: 12.5, lineHeight: 1.55, color: 'var(--muted)' }}>
            What you got right: you matched your claim to your most direct evidence and refused the over-claim. That restraint is the whole job.
          </p>
        </div>
      )}
    </div>
  )
}
