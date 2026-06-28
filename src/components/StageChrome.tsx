import { useState, type ReactNode } from 'react'
import { getAct } from '../content/registry'
import type { ActId } from '../content/types'
import Define from './Define'
import { CharacterAvatar, MateoMotif } from './art/Avatars'

const mono = "'IBM Plex Mono'"

/** Words-first step header: the step's position and its one concrete GOAL, shown
 *  at the very top of every stage (above the illustration banner) so a student
 *  always lands on "what am I doing and why," never on a picture with no context. */
export function StepGoal({ step, act = 'develop' }: { step: number; act?: ActId }) {
  const a = getAct(act)
  const label = a.stageLabels[step]
  const total = a.stageLabels.length
  const goal = a.stageGoal?.[step]
  if (!label && !goal) return null
  return (
    <div style={{ border: '1px solid var(--line)', borderLeft: '3px solid var(--accent)', borderRadius: 12, background: 'var(--panel2)', padding: '12px 16px', marginBottom: 16 }}>
      <div style={{ fontFamily: mono, fontSize: 10.5, letterSpacing: '.14em', color: 'var(--accent)', marginBottom: goal ? 5 : 0 }}>
        STEP {step + 1} OF {total}{label ? ` · ${String(label).toUpperCase()}` : ''}
      </div>
      {goal && (
        <div style={{ fontSize: 14.5, lineHeight: 1.5, color: 'var(--text)' }}>
          <span style={{ fontWeight: 600 }}>Goal: </span>
          {goal}
        </div>
      )}
    </div>
  )
}

/** A standalone collapsible notebook panel (same look as ActStory) for a continued
 *  notebook entry on a later stage. Content is passed in, not read from the registry. */
export function NotebookNote({ kicker, title, paragraphs, defaultOpen = true }: { kicker: string; title: string; paragraphs: string[]; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen)
  return (
    <div style={{ border: '1px solid color-mix(in srgb, var(--c-pink) 38%, var(--line))', borderRadius: 14, background: 'color-mix(in srgb, var(--c-pink) 5%, var(--panel))', padding: '16px 20px', marginBottom: 18 }}>
      <button
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        style={{ width: '100%', display: 'flex', alignItems: 'flex-start', gap: 11, background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--text)', padding: 0, textAlign: 'left' }}
      >
        <span style={{ fontFamily: mono, fontSize: 12, color: 'var(--c-pink)', marginTop: 3 }}>{open ? '▾' : '▸'}</span>
        <span style={{ minWidth: 0, flex: 1 }}>
          <span style={{ display: 'block', fontFamily: mono, fontSize: 10, letterSpacing: '.14em', color: 'var(--c-pink)' }}>{kicker}</span>
          <span style={{ display: 'block', fontFamily: "'Space Grotesk'", fontWeight: 700, fontSize: 21, lineHeight: 1.2, marginTop: 3 }}>{title}</span>
        </span>
        <span style={{ fontFamily: mono, fontSize: 10.5, color: 'var(--muted)', flex: 'none', marginTop: 3 }}>{open ? 'hide' : 'read'}</span>
      </button>
      {open && (
        <div style={{ marginTop: 14, display: 'flex', flexDirection: 'column', gap: 12 }}>
          {paragraphs.map((p, i) => (
            <p key={i} style={{ fontSize: 15, lineHeight: 1.7, color: i === 0 || i === paragraphs.length - 1 ? 'var(--text)' : 'var(--muted)' }}>{p}</p>
          ))}
        </div>
      )}
    </div>
  )
}

/** The dramatic act-opening story, shown before step 1: it sets up the act through
 *  what a scientist observed (the YAP/TAZ and Sox9 clues) and leaves the mechanism
 *  for the student to deduce. Collapsible, open by default. Pink, like the case spine. */
export function ActStory({ act = 'develop', onOpenLibrary }: { act?: ActId; onOpenLibrary?: (chapter?: string) => void }) {
  const story = getAct(act).story
  const [open, setOpen] = useState(true)
  if (!story) return null
  return (
    <div style={{ border: '1px solid color-mix(in srgb, var(--c-pink) 38%, var(--line))', borderRadius: 14, background: 'color-mix(in srgb, var(--c-pink) 5%, var(--panel))', padding: '16px 20px', marginBottom: 18 }}>
      <button
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        style={{ width: '100%', display: 'flex', alignItems: 'flex-start', gap: 11, background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--text)', padding: 0, textAlign: 'left' }}
      >
        <span style={{ fontFamily: mono, fontSize: 12, color: 'var(--c-pink)', marginTop: 3 }}>{open ? '▾' : '▸'}</span>
        <span style={{ minWidth: 0, flex: 1 }}>
          <span style={{ display: 'block', fontFamily: mono, fontSize: 10, letterSpacing: '.14em', color: 'var(--c-pink)' }}>{story.kicker}</span>
          <span style={{ display: 'block', fontFamily: "'Space Grotesk'", fontWeight: 700, fontSize: 21, lineHeight: 1.2, marginTop: 3 }}>{story.title}</span>
        </span>
        <span style={{ fontFamily: mono, fontSize: 10.5, color: 'var(--muted)', flex: 'none', marginTop: 3 }}>{open ? 'hide' : 'read'}</span>
      </button>
      {open && (
        <div style={{ marginTop: 14, display: 'flex', flexDirection: 'column', gap: 12 }}>
          {story.paragraphs.map((p, i) => (
            <p key={i} style={{ fontSize: 15, lineHeight: 1.7, color: i === 0 || i === story.paragraphs.length - 1 ? 'var(--text)' : 'var(--muted)' }}>{p}</p>
          ))}
          {story.clues && story.clues.length > 0 && (
            <div style={{ border: '1px solid color-mix(in srgb, var(--c-pink) 28%, var(--line))', borderRadius: 10, background: 'color-mix(in srgb, var(--c-pink) 4%, transparent)', padding: '12px 14px' }}>
              <div style={{ fontFamily: mono, fontSize: 10, letterSpacing: '.14em', color: 'var(--c-pink)', marginBottom: 9 }}>HOW TO CRACK THIS CASE</div>
              <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: 8 }}>
                {story.clues.map((c, i) => (
                  <li key={i} style={{ display: 'flex', gap: 9, alignItems: 'flex-start', fontSize: 13, lineHeight: 1.5, color: 'var(--text)' }}>
                    <span style={{ flex: 'none', color: 'var(--c-pink)', fontFamily: mono, fontSize: 12, marginTop: 1 }}>›</span>
                    <span>{c}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
          {onOpenLibrary && (
            <div>
              <button
                onClick={() => onOpenLibrary?.(story.libraryRef)}
                style={{ display: 'inline-flex', alignItems: 'center', gap: 7, padding: '8px 14px', borderRadius: 9, border: '1px solid color-mix(in srgb, var(--c-pink) 45%, var(--line))', background: 'color-mix(in srgb, var(--c-pink) 10%, transparent)', color: 'var(--text)', cursor: 'pointer', fontFamily: mono, fontSize: 11.5, minHeight: 38 }}
              >
                {story.notebookLabel ?? '📓 Open the notebooks for clues →'}
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

/** Collapsible "how the measurement actually works" panel: the real lab pipeline
 *  in plain numbered steps, so the Run/Measure stage is not a black box. Reviewer's
 *  note: the process (slice, stain, image, Cellpose, count, Voronoi) was never shown. */
export function ProcessExplainer({ act = 'develop' }: { act?: ActId }) {
  const steps = getAct(act).processSteps
  const [open, setOpen] = useState(false)
  if (!steps || steps.length === 0) return null
  return (
    <div style={{ border: '1px solid color-mix(in srgb, var(--accent) 30%, var(--line))', borderRadius: 12, background: 'var(--panel2)', marginBottom: 16, overflow: 'hidden' }}>
      <button
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 9, background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--text)', padding: '12px 16px', textAlign: 'left', minHeight: 44 }}
      >
        <span style={{ fontFamily: mono, fontSize: 11, color: 'var(--accent)' }}>{open ? '▾' : '▸'}</span>
        <span style={{ fontFamily: "'Space Grotesk'", fontWeight: 600, fontSize: 14 }}>How this measurement actually works</span>
        <span style={{ marginLeft: 'auto', fontFamily: mono, fontSize: 10.5, color: 'var(--muted)' }}>{open ? 'hide' : 'read this first'}</span>
      </button>
      {open && (
        <ol style={{ listStyle: 'none', margin: 0, padding: '2px 16px 16px', display: 'flex', flexDirection: 'column', gap: 11 }}>
          {steps.map((s, i) => (
            <li key={i} style={{ display: 'flex', gap: 11, alignItems: 'flex-start' }}>
              <span style={{ flex: 'none', width: 22, height: 22, borderRadius: '50%', background: 'color-mix(in srgb, var(--accent) 16%, var(--panel))', color: 'var(--accent)', display: 'grid', placeItems: 'center', fontFamily: mono, fontSize: 11 }}>{i + 1}</span>
              <span style={{ minWidth: 0 }}>
                <span style={{ display: 'block', fontWeight: 600, fontSize: 13, color: 'var(--text)' }}>{s.label}</span>
                <span style={{ fontSize: 12.5, color: 'var(--muted)', lineHeight: 1.5 }}>{s.text}</span>
              </span>
            </li>
          ))}
        </ol>
      )}
    </div>
  )
}

/** A professionally illustrated banner at the top of each stage, tied to the
 *  scientific-method step. Sits above the PI brief; lazy-loaded. */
export function StageBanner({ step, act = 'develop' }: { step: number; act?: ActId }) {
  const ill = getAct(act).stageIllustrations[step]
  if (!ill) return null
  return (
    <figure style={{ margin: '0 auto 18px', maxWidth: 560, border: '1px solid var(--line)', borderRadius: 12, background: 'var(--panel2)', overflow: 'hidden' }}>
      <img src={ill.src} alt={ill.alt} loading="lazy" decoding="async" style={{ display: 'block', width: '100%', height: 'auto' }} />
      <figcaption style={{ fontFamily: mono, fontSize: 11, color: 'var(--muted)', lineHeight: 1.5, padding: '8px 12px', borderTop: '1px solid var(--line)', textAlign: 'center' }}>{ill.caption}</figcaption>
    </figure>
  )
}

/** The PI's one-line brief at the top of a stage: the task in plain words, tied
 *  to Mateo. Gives every stage a voice and a reason. */
export function PiBrief({ step, act = 'develop' }: { step: number; act?: ActId }) {
  const text = getAct(act).stageBrief[step]
  if (!text) return null
  return (
    <div style={{ display: 'flex', gap: 11, alignItems: 'flex-start', border: '1px solid var(--line)', borderRadius: 12, background: 'color-mix(in srgb, var(--accent) 5%, var(--panel))', padding: '11px 14px', marginBottom: 20 }}>
      <CharacterAvatar role="pi" size={34} />
      <div style={{ minWidth: 0 }}>
        <div style={{ fontFamily: mono, fontSize: 10, letterSpacing: '.1em', color: 'var(--accent)', marginBottom: 2 }}>DR. REYES · YOUR <Define t="pi">PI</Define></div>
        <div style={{ fontSize: 13.5, lineHeight: 1.5, color: 'var(--text)' }}>{text}</div>
      </div>
    </div>
  )
}

/** A Baby Mateo callout (pink), so the case stays the spine, not just bookends. */
export function MateoNote({ children }: { children: ReactNode }) {
  return (
    <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start', border: '1px solid color-mix(in srgb, var(--c-pink) 35%, transparent)', borderRadius: 12, background: 'color-mix(in srgb, var(--c-pink) 7%, var(--panel))', padding: '12px 14px' }}>
      <MateoMotif size={36} />
      <div style={{ minWidth: 0 }}>
        <div style={{ fontFamily: mono, fontSize: 10, letterSpacing: '.1em', color: 'var(--c-pink)', marginBottom: 3 }}>BABY MATEO</div>
        <p style={{ fontSize: 13.5, lineHeight: 1.55, color: 'var(--text)' }}>{children}</p>
      </div>
    </div>
  )
}
