import type { Dispatch } from 'react'
import { QUESTIONS } from '../../content/act1'
import type { Action, LoopState } from '../../state/loop'
import Define from '../Define'
import { PiBrief, MateoNote } from '../StageChrome'
import { SpacingContrast } from '../art/SciArt'
import { Kicker, StageH1 } from './ui'

export default function AskStage({ state, dispatch }: { state: LoopState; dispatch: Dispatch<Action> }) {
  return (
    <div className="stage-enter">
      <Kicker>01 · ASK</Kicker>
      <PiBrief step={0} />
      <div className="col-ask">
        <div>
          <StageH1 size={28}>From a patient to a question you can actually test.</StageH1>
          <div style={{ marginBottom: 16 }}>
            <MateoNote>
              Baby Mateo was born with a <Define t="cleft">cleft</Define> of the lip and{' '}
              <Define t="palate">palate</Define>: before birth, the parts that grow in to form his upper lip
              and the roof of his mouth did not fully join together (fuse).
            </MateoNote>
          </div>
          <p style={{ color: 'var(--muted)', lineHeight: 1.6, marginBottom: 12 }}>
            To understand cases like Mateo’s, we study the <b style={{ color: 'var(--text)' }}>foundational science</b> first. The same
            family of cells, the <Define t="neural crest cells">cranial neural crest cells</Define>, builds the
            whole face and skull. Rather than watching a lip and palate fuse in the browser, we’ll study one
            clear, measurable example of these same cells at work: how they organize to build the{' '}
            <Define t="frontal bone">frontal bone</Define> (the forehead). Mateo’s cleft is a different problem
            (the parts not fusing), but it is the same cells, and learning how they build is how we reach a
            question we can actually test.
          </p>
          <p style={{ color: 'var(--muted)', lineHeight: 1.6, marginBottom: 12 }}>
            The big question, <i>"what keeps these cells in order as they build the skull?"</i>, is too broad to
            measure. A good question names exactly what you would measure and compare. Make it more exact.
          </p>
          <div style={{ border: '1px solid var(--line)', borderRadius: 12, background: 'var(--panel2)', padding: 12 }}>
            <SpacingContrast height={130} />
            <div style={{ fontSize: 12, color: 'var(--muted)', lineHeight: 1.5, marginTop: 6, textAlign: 'center' }}>
              The cells could sit in a pattern (left) or scatter at random (right). That difference is something you can actually measure.
            </div>
          </div>
        </div>

        <div className="ask-options" style={{ display: 'flex', flexDirection: 'column', gap: 12, paddingTop: 8 }}>
          {QUESTIONS.map((q) => {
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
                {/* the verdict tag + note appear AFTER you pick, so you reason first, not answer-hunt */}
                {sel && (
                  <div style={{ marginTop: 8 }}>
                    <span style={{ fontFamily: "'IBM Plex Mono'", fontSize: 10, letterSpacing: '.1em', color: good ? 'var(--c-green)' : 'var(--c-amber)' }}>
                      {good ? '✓ ' : '✗ '}{q.tag}
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
