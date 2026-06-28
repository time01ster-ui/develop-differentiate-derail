import type { Dispatch } from 'react'
import { MATEO3, QUESTIONS3 } from '../../../content/act3'
import type { Action, LoopState } from '../../../state/loop'
import Define from '../../Define'
import { MateoNote, PiBrief } from '../../StageChrome'
import { Kicker, StageH1 } from '../ui'

export default function AskStage3({ state, dispatch }: { state: LoopState; dispatch: Dispatch<Action> }) {
  return (
    <div className="stage-enter">
      <Kicker>01 · ASK</Kicker>
      <PiBrief step={0} act="derail" />
      <div className="col-ask">
        <div>
          <StageH1 size={28}>The same toolkit, turned on a tumor.</StageH1>
          <div style={{ marginBottom: 16 }}>
            <MateoNote>{MATEO3.open}</MateoNote>
          </div>
          <p style={{ color: 'var(--muted)', lineHeight: 1.6, marginBottom: 12 }}>
            In Act I the same cells built the face in order. In Act II mechanics told each cell what to become.
            Now a sibling carcinoma reuses that exact force chain, out of context, to drive{' '}
            <b style={{ color: 'var(--c-pink)' }}>disorder</b>. The tumor stiffens its own matrix with{' '}
            <Define t="LOX">LOX</Define>, and cells climb that self-made stiffness by{' '}
            <Define t="durotaxis">durotaxis</Define>, breaching the <Define t="basement membrane">wall</Define>{' '}
            around the tissue. Turn that into a question you can measure with the Act I tools.
          </p>
          <div style={{ border: '1px solid var(--line)', borderRadius: 12, background: 'var(--panel2)', padding: 14 }}>
            <div style={{ fontSize: 12.5, color: 'var(--muted)', lineHeight: 1.6 }}>
              The big idea, <i>"stiffness causes cancer to spread,"</i> is far too sweeping, and it leaps from a
              model straight to a patient. A good question names exactly what you will compare in the image you
              actually have.
            </div>
          </div>
        </div>

        <div className="ask-options" style={{ display: 'flex', flexDirection: 'column', gap: 12, paddingTop: 8 }}>
          {QUESTIONS3.map((q) => {
            const sel = state.qChoice === q.id
            const good = q.id === 'testable'
            return (
              <button
                key={q.id}
                onClick={() => dispatch({ type: 'PICK_Q', id: q.id })}
                aria-pressed={sel}
                style={{
                  textAlign: 'left',
                  padding: '16px 18px',
                  borderRadius: 12,
                  border: `1.5px solid ${sel ? (good ? 'var(--c-green)' : 'var(--c-amber)') : 'var(--line)'}`,
                  background: sel ? (good ? 'color-mix(in srgb, var(--c-green) 12%, var(--panel))' : 'color-mix(in srgb, var(--c-amber) 10%, var(--panel))') : 'var(--panel)',
                  cursor: 'pointer',
                  transition: 'border-color .15s',
                }}
              >
                <div style={{ fontSize: 15, lineHeight: 1.45, color: 'var(--text)', fontWeight: 500 }}>{q.text}</div>
                {sel && (
                  <div style={{ marginTop: 8 }}>
                    <span style={{ fontFamily: "'IBM Plex Mono'", fontSize: 10, letterSpacing: '.1em', color: good ? 'var(--c-green)' : 'var(--c-amber)' }}>
                      {good ? '✓ ' : '✗ '}
                      {q.tag}
                    </span>
                    <div style={{ fontSize: 12.5, color: 'var(--muted)', marginTop: 5, lineHeight: 1.4 }}>{q.note}</div>
                  </div>
                )}
              </button>
            )
          })}
          <div style={{ fontSize: 11.5, color: 'var(--muted)', fontFamily: "'IBM Plex Mono'", textAlign: 'center', marginTop: 2 }}>
            Pick one to see how a scientist would judge it.
          </div>
        </div>
      </div>
    </div>
  )
}
