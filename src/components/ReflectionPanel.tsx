import { useState, type CSSProperties } from 'react'
import { getAct } from '../content/registry'
import type { ActId } from '../content/types'
import type { Reflection } from '../lib/reflections'

const mono = "'IBM Plex Mono'"

const taStyle: CSSProperties = {
  width: '100%',
  minHeight: 84,
  resize: 'vertical',
  background: 'var(--bg2)',
  border: '1px solid var(--line)',
  borderRadius: 10,
  padding: '10px 12px',
  color: 'var(--text)',
  fontFamily: "'IBM Plex Sans'",
  fontSize: 14,
  lineHeight: 1.5,
}

const labelStyle: CSSProperties = {
  fontFamily: mono,
  fontSize: 10,
  letterSpacing: '.12em',
  color: 'var(--muted)',
  marginBottom: 6,
  display: 'block',
}

/** The 6 Rs (Manuel's signature Cornell Notes learning cycle), in the order the
 *  reflection walks them. RECORD -> REDUCE -> RECITE -> REVIEW -> REFLECT -> REVISE. */
const RS = ['RECORD', 'REDUCE', 'RECITE', 'REVIEW', 'REFLECT', 'REVISE'] as const

/** A compact rail of the 6 Rs showing where the student is in the cycle. Done
 *  steps are green, the current focus is accent, the rest are muted. */
function SixRsRail({ done }: { done: boolean[] }) {
  const active = done.findIndex((d) => !d) // first not-done = current focus
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5, marginTop: 8 }}>
      {RS.map((r, i) => {
        const isDone = done[i]
        const isActive = i === active
        return (
          <span
            key={r}
            style={{
              fontFamily: mono,
              fontSize: 9.5,
              letterSpacing: '.08em',
              padding: '2px 7px',
              borderRadius: 5,
              border: `1px solid ${isDone ? 'var(--c-green)' : isActive ? 'var(--accent)' : 'var(--line)'}`,
              color: isDone ? 'var(--c-green)' : isActive ? 'var(--accent)' : 'var(--muted)',
              background: isActive ? 'color-mix(in srgb, var(--accent) 10%, transparent)' : 'transparent',
            }}
          >
            {isDone ? '✓ ' : `${i + 1} `}
            {r}
          </span>
        )
      })}
    </div>
  )
}

function StepLabel({ n, r, color = 'var(--accent)' }: { n: number; r: string; color?: string }) {
  return (
    <div style={{ fontFamily: mono, fontSize: 10, letterSpacing: '.14em', color, marginBottom: 6, marginTop: 2 }}>
      {n} · {r}
    </div>
  )
}

/** One NotebookLM-style index card for a hypothesis. The FRONT names the idea, and
 *  the student says aloud the result they expect and why; the BACK reveals the
 *  result the hypothesis actually predicts, so they can self-check their recall. */
function FlipCard({ letter, front, back }: { letter: string; front: string; back: string }) {
  const [flipped, setFlipped] = useState(false)
  return (
    <div
      style={{
        border: `1px solid ${flipped ? 'var(--c-green)' : 'var(--line)'}`,
        borderRadius: 12,
        background: flipped ? 'color-mix(in srgb, var(--c-green) 8%, var(--panel))' : 'var(--bg2)',
        padding: 13,
        display: 'flex',
        flexDirection: 'column',
        minHeight: 172,
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
        <span style={{ fontFamily: mono, fontSize: 9.5, letterSpacing: '.12em', color: flipped ? 'var(--c-green)' : 'var(--accent)' }}>
          {flipped ? '✓ EXPECTED RESULT' : `HYPOTHESIS ${letter}`}
        </span>
        <button
          onClick={() => setFlipped((f) => !f)}
          aria-label={flipped ? 'flip card back to the hypothesis' : 'flip card to the expected result'}
          style={{ background: 'none', border: '1px solid var(--line)', borderRadius: 6, color: 'var(--muted)', cursor: 'pointer', fontFamily: mono, fontSize: 9.5, padding: '2px 7px', minHeight: 26 }}
        >
          {flipped ? '↺ idea' : 'flip ↻'}
        </button>
      </div>
      <p style={{ fontSize: 12.5, lineHeight: 1.5, color: 'var(--text)', flex: 1, margin: 0 }}>{flipped ? back : front}</p>
      <div style={{ fontFamily: mono, fontSize: 9.5, color: 'var(--muted)', marginTop: 9, lineHeight: 1.4 }}>
        {flipped ? 'Did your reasoning land here?' : 'Say the result you expect, and why. Then flip.'}
      </div>
    </div>
  )
}

/** The three rival hypotheses as flip cards: the RECITE self-test for the
 *  Hypothesize step. The student predicts each result from memory, then flips to
 *  check it against the result the hypothesis really makes. */
function HypothesisCards({ act }: { act: ActId }) {
  const hyps = getAct(act).hypotheses
  if (!hyps || hyps.length === 0) return null
  return (
    <div style={{ display: 'grid', gap: 10, gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))', marginBottom: 14 }}>
      {hyps.map((h, i) => (
        <FlipCard key={h.id} letter={String.fromCharCode(65 + i)} front={h.text} back={h.prediction} />
      ))}
    </div>
  )
}

/**
 * The per-step learning loop, structured as the 6 Rs (Cornell Notes "process for
 * learning"). The student RECORDs what they did, sees the REDUCEd cue, RECITEs an
 * answer from understanding, then after submitting REVIEWs a model answer,
 * REFLECTs on the gap and the connection, and REVISEs their answer, fixing what
 * they got wrong. The REVISE step is the captured evidence of self-correction and
 * is what marks the cycle complete. Reflection text is held by the parent (App)
 * and mirrored to localStorage. This does not gate the Next button; it is for
 * learning.
 */
export default function ReflectionPanel({
  step,
  reflection,
  onChange,
  act = 'develop',
}: {
  step: number
  reflection: Reflection
  onChange: (patch: Partial<Reflection>) => void
  act?: ActId
}) {
  const content = getAct(act).reflect[step]
  const [copied, setCopied] = useState(false)
  if (!content) return null
  const canSubmit = reflection.answer.trim().length > 0

  const recordDone = reflection.record.trim().length > 0
  const reduceDone = recordDone || reflection.answer.trim().length > 0
  const reciteDone = reflection.submitted
  const reviewDone = reflection.submitted
  const reflectDone = reflection.comparison.trim().length > 0
  const reviseDone = reflection.revised
  const railDone = [recordDone, reduceDone, reciteDone, reviewDone, reflectDone, reviseDone]
  const cycleComplete = reviseDone

  const copyTodos = () => {
    try {
      navigator.clipboard?.writeText(reflection.todos || '')
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    } catch {
      /* ignore */
    }
  }

  return (
    <section
      style={{
        marginTop: 28,
        border: `1px solid color-mix(in srgb, ${cycleComplete ? 'var(--c-green)' : 'var(--accent)'} 30%, var(--line))`,
        borderRadius: 16,
        background: 'color-mix(in srgb, var(--accent) 5%, var(--panel))',
        overflow: 'hidden',
      }}
    >
      <div style={{ padding: '12px 18px', borderBottom: '1px solid var(--line)', background: 'color-mix(in srgb, var(--accent) 7%, transparent)' }}>
        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 10, flexWrap: 'wrap' }}>
          <div style={{ fontFamily: mono, fontSize: 10.5, letterSpacing: '.14em', color: cycleComplete ? 'var(--c-green)' : 'var(--accent)' }}>
            {cycleComplete ? '✓ THE 6 Rs · CYCLE COMPLETE' : '✎ LEARN FROM THIS STEP · THE 6 Rs'}
          </div>
          <details style={{ fontFamily: mono, fontSize: 10.5 }}>
            <summary style={{ cursor: 'pointer', color: 'var(--muted)' }}>what are the 6 Rs?</summary>
            <div style={{ marginTop: 6, color: 'var(--muted)', fontSize: 11, lineHeight: 1.6, maxWidth: 360 }}>
              A process for learning, drawn as a cycle: <b style={{ color: 'var(--text)' }}>Record</b> what you did,{' '}
              <b style={{ color: 'var(--text)' }}>Reduce</b> it to the key question, <b style={{ color: 'var(--text)' }}>Recite</b> an
              answer from your own head, <b style={{ color: 'var(--text)' }}>Review</b> it against a model,{' '}
              <b style={{ color: 'var(--text)' }}>Reflect</b> on the gap, then <b style={{ color: 'var(--text)' }}>Revise</b> to fix it.
            </div>
          </details>
        </div>
        <div style={{ fontSize: 11, color: 'var(--muted)', marginTop: 4, lineHeight: 1.4 }}>
          This is for your learning. It does not unlock Next; the button at the bottom of the page does.
        </div>
        <SixRsRail done={railDone} />
      </div>

      <div style={{ padding: 18 }}>
        {/* 1 RECORD */}
        <StepLabel n={1} r="RECORD" />
        <div style={{ fontSize: 12.5, color: 'var(--muted)', marginBottom: 8 }}>In one line, what did you do or see at this step?</div>
        <input
          value={reflection.record}
          onChange={(e) => onChange({ record: e.target.value })}
          placeholder="e.g. I picked the testable question and measured nuclear spacing..."
          aria-label="Record what you did at this step"
          style={{ ...taStyle, minHeight: 0, height: 42 }}
        />

        {/* 2 REDUCE (the cue) + 3 RECITE (your answer) */}
        <div style={{ marginTop: 18 }}>
          <StepLabel n={2} r="REDUCE · THE QUESTION TO ANSWER" />
          <div style={{ fontFamily: "'Space Grotesk'", fontWeight: 600, fontSize: 15.5, marginBottom: 4 }}>{content.task}</div>
          <div style={{ fontSize: 12.5, color: 'var(--muted)', marginBottom: 10 }}>{content.hint}</div>
        </div>

        {step === 1 && <HypothesisCards act={act} />}

        <StepLabel n={3} r={step === 1 ? 'RECITE · EACH RESULT, IN YOUR OWN WORDS' : 'RECITE · YOUR ANSWER, NO PEEKING'} />
        <textarea
          value={reflection.answer}
          onChange={(e) => onChange({ answer: e.target.value })}
          placeholder={step === 1 ? 'For each hypothesis: the result you expect, and why. Try the cards from memory first, then flip to check.' : 'Write it in your own words, from your own understanding...'}
          aria-label="Your answer"
          readOnly={reflection.submitted}
          style={{ ...taStyle, opacity: reflection.submitted ? 0.85 : 1 }}
        />

        {!reflection.submitted ? (
          <button
            onClick={() => canSubmit && onChange({ submitted: true })}
            disabled={!canSubmit}
            style={{
              marginTop: 10,
              minHeight: 42,
              padding: '10px 18px',
              borderRadius: 10,
              border: 'none',
              background: canSubmit ? 'var(--accent)' : 'var(--bg2)',
              color: canSubmit ? '#04060c' : 'var(--muted)',
              cursor: canSubmit ? 'pointer' : 'not-allowed',
              fontFamily: "'Space Grotesk'",
              fontWeight: 600,
              fontSize: 14,
            }}
          >
            Submit and review a model answer →
          </button>
        ) : (
          <>
            <button
              onClick={() => onChange({ submitted: false })}
              style={{ marginTop: 8, background: 'none', border: 'none', color: 'var(--accent)', cursor: 'pointer', fontFamily: mono, fontSize: 11.5, padding: 0 }}
            >
              ✎ edit my recited answer
            </button>

            {/* 4 REVIEW: the model answer + its components */}
            <div style={{ marginTop: 16 }}>
              <StepLabel n={4} r="REVIEW · A MODEL ANSWER" color="var(--c-green)" />
              <div style={{ border: '1px solid var(--c-green)', borderRadius: 12, background: 'color-mix(in srgb, var(--c-green) 7%, var(--panel))', padding: 16 }}>
                <p style={{ fontSize: 14.5, lineHeight: 1.55, color: 'var(--text)', marginBottom: 14, fontStyle: 'italic' }}>“{content.exemplarAnswer}”</p>
                <div style={{ fontFamily: mono, fontSize: 10, letterSpacing: '.12em', color: 'var(--muted)', marginBottom: 8 }}>WHAT MAKES IT GOOD</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {content.components.map((c, i) => (
                    <div key={i} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                      <span style={{ flex: 'none', fontFamily: mono, fontSize: 11, color: 'var(--c-green)', border: '1px solid color-mix(in srgb, var(--c-green) 45%, transparent)', borderRadius: 5, padding: '2px 7px', marginTop: 1, whiteSpace: 'nowrap' }}>✓ {c.label}</span>
                      <span style={{ fontSize: 12.5, color: 'var(--muted)', lineHeight: 1.5 }}>{c.why}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* takeaway */}
            <div style={{ marginTop: 14, borderLeft: '3px solid var(--accent)', padding: '8px 0 8px 14px' }}>
              <span style={{ fontFamily: mono, fontSize: 10, letterSpacing: '.12em', color: 'var(--accent)' }}>TAKEAWAY</span>
              <p style={{ fontSize: 14, lineHeight: 1.55, color: 'var(--text)', fontWeight: 500, marginTop: 3 }}>{content.takeaway}</p>
            </div>

            {/* 5 REFLECT: compare + connect */}
            <div style={{ marginTop: 16 }}>
              <StepLabel n={5} r="REFLECT · COMPARE AND CONNECT" />
              <label style={labelStyle}>WHAT DID YOURS DO WELL, WHAT WAS MISSING, AND HOW DOES IT CONNECT?</label>
              <textarea
                value={reflection.comparison}
                onChange={(e) => onChange({ comparison: e.target.value })}
                placeholder="Line up your answer next to the model. Be honest about the gaps, and say how this links to the force chain."
                aria-label="Reflect: compare your answer to the model and connect it"
                style={taStyle}
              />
            </div>

            {/* 6 REVISE: the self-correction step */}
            <div style={{ marginTop: 16, border: `1px solid ${reviseDone ? 'var(--c-green)' : 'color-mix(in srgb, var(--accent) 45%, var(--line))'}`, borderRadius: 12, background: reviseDone ? 'color-mix(in srgb, var(--c-green) 6%, var(--panel))' : 'color-mix(in srgb, var(--accent) 7%, var(--panel))', padding: 16 }}>
              <StepLabel n={6} r="REVISE · FIX IT (SELF-CORRECTION)" color={reviseDone ? 'var(--c-green)' : 'var(--accent)'} />
              <div style={{ fontSize: 12.5, color: 'var(--muted)', marginBottom: 10, lineHeight: 1.5 }}>
                Rewrite your answer so it is right now. What did you change, and why? This is the part that turns a wrong first try into learning.
              </div>
              <textarea
                value={reflection.revision}
                onChange={(e) => onChange({ revision: e.target.value, revised: e.target.value.trim().length > 0 })}
                placeholder="My revised answer: ... I changed ... because ..."
                aria-label="Revise: rewrite your answer, fixing what you got wrong"
                style={taStyle}
              />
              {reviseDone && (
                <div style={{ fontFamily: mono, fontSize: 11, color: 'var(--c-green)', marginTop: 8 }}>✓ Self-correction logged. The 6 Rs cycle for this step is complete.</div>
              )}
            </div>

            {/* carry-forward (reapply next cycle) */}
            <div style={{ marginTop: 16 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <label style={labelStyle}>CARRY FORWARD: ONE THING TO DO BETTER NEXT STEP (one per line)</label>
                <button
                  onClick={copyTodos}
                  style={{ background: 'none', border: '1px solid var(--line)', borderRadius: 6, color: 'var(--muted)', cursor: 'pointer', fontFamily: mono, fontSize: 10, padding: '3px 8px' }}
                >
                  {copied ? '✓ copied' : 'copy'}
                </button>
              </div>
              <textarea
                value={reflection.todos}
                onChange={(e) => onChange({ todos: e.target.value })}
                placeholder={'e.g.\n- Name the comparison group up front\n- Say what I did NOT measure'}
                aria-label="Carry forward: what to do better next step"
                style={{ ...taStyle, fontFamily: mono, fontSize: 13 }}
              />
            </div>
          </>
        )}
      </div>
    </section>
  )
}
