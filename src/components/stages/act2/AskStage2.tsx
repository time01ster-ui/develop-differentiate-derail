import type { Dispatch } from 'react'
import { MATEO2, QUESTIONS2 } from '../../../content/act2'
import type { Action, LoopState } from '../../../state/loop'
import Define from '../../Define'
import { MateoNote, PiBrief } from '../../StageChrome'
import { Kicker, StageH1 } from '../ui'

export default function AskStage2({ state, dispatch }: { state: LoopState; dispatch: Dispatch<Action> }) {
  return (
    <div className="stage-enter">
      <Kicker>01 · ASK</Kicker>
      <PiBrief step={0} act="differentiate" />
      <div className="col-ask">
        <div>
          <StageH1 size={28}>The question underneath: what makes a cell choose?</StageH1>
          <div style={{ marginBottom: 16 }}>
            <MateoNote>{MATEO2.open}</MateoNote>
          </div>
          <p style={{ color: 'var(--muted)', lineHeight: 1.6, marginBottom: 12 }}>
            In Act I you measured <b style={{ color: 'var(--text)' }}>where</b> the cells sat. Act II asks the
            harder question: once a cell arrives, why does it become{' '}
            <Define t="bone">bone</Define> while its neighbor stays{' '}
            <Define t="cartilage">cartilage</Define>? The Library taught that cartilage is the default and that
            mechanics, carried by <Define t="YAP">YAP</Define> and <Define t="TAZ">TAZ</Define>, can flip the
            switch. Turn that into a question you can actually test on the bench.
          </p>
          <div style={{ border: '1px solid var(--line)', borderRadius: 12, background: 'var(--panel2)', padding: 14 }}>
            <div style={{ fontSize: 12.5, color: 'var(--muted)', lineHeight: 1.6 }}>
              The big idea, <i>"stiffness decides what a cell becomes,"</i> is too sweeping to measure as written.
              A good question names exactly what you will change and what you will read out.
            </div>
          </div>
        </div>

        <div className="ask-options" style={{ display: 'flex', flexDirection: 'column', gap: 12, paddingTop: 8 }}>
          {QUESTIONS2.map((q) => {
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
                  background: sel
                    ? good
                      ? 'color-mix(in srgb, var(--c-green) 12%, var(--panel))'
                      : 'color-mix(in srgb, var(--c-amber) 10%, var(--panel))'
                    : 'var(--panel)',
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
