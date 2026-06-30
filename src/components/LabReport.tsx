// The exportable student lab report: a downloadable / printable record of one
// finished run that a student can hand in. Local-only, no backend, no network
// POST, which is what keeps it FERPA-safe. Two offline export paths are offered
// because school-managed devices lock down different things: "Print / Save as
// PDF" (window.print on a dedicated print layout) and a portable self-contained
// ".html" download. The optional student name is entered at export time and is
// never stored.
//
// The document renders as a light "paper" (ink on white, John Hay green + gold
// accents) so it reads and prints as a hand-in artifact, on screen and on paper.
// This is the sim's own brand, not the portal's /learn purple-on-white rule.

import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import type { ExperimentData } from '../lib/measure'
import { buildReport, reportToHtml, SCAFFOLD, type LabReport } from '../lib/report'
import type { Reflections } from '../lib/reflections'
import type { LoopState } from '../state/loop'
import StatsHelpButton from './StatsExplainer'
import { DeepDiveLink } from './SectionDeepDive'

const mono = "'IBM Plex Mono', ui-monospace, monospace"
const head = "'Space Grotesk', system-ui, sans-serif"

// Light-paper palette (legible in print + on managed-device screens).
const PAPER = {
  bg: '#ffffff',
  ink: '#19251c',
  muted: '#5c6b60',
  rule: '#e2e8e2',
  green: '#1f9d57', // John Hay green, darkened for legibility on white
  gold: '#caa01e', // John Hay gold, darkened for legibility on white
  ok: '#1f9d57',
  blocked: '#c0392b',
}

function todayLabel(): string {
  try {
    return new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
  } catch {
    return ''
  }
}

function Kicker({ children }: { children: React.ReactNode }) {
  return <div style={{ fontFamily: mono, fontSize: 10, letterSpacing: '.16em', textTransform: 'uppercase', color: PAPER.green, marginBottom: 8 }}>{children}</div>
}

function Rows({ rows }: { rows: { k: string; v: string }[] }) {
  return (
    <div>
      {rows.map((r) => (
        <div key={r.k} style={{ display: 'flex', justifyContent: 'space-between', gap: 16, padding: '6px 0', borderBottom: `1px solid ${PAPER.rule}` }}>
          <span style={{ fontSize: 12.5, color: PAPER.muted }}>{r.k}</span>
          <span style={{ fontSize: 12.5, color: PAPER.ink, fontWeight: 600, textAlign: 'right' }}>{r.v}</span>
        </div>
      ))}
    </div>
  )
}

function Section({ title, guideKey, children }: { title: string; guideKey?: string; children: React.ReactNode }) {
  return (
    <section style={{ marginTop: 22 }}>
      <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', rowGap: 4 }}>
        <Kicker>{title}</Kicker>
        {guideKey && <DeepDiveLink sectionKey={guideKey} />}
      </div>
      {children}
    </section>
  )
}

/** The printable document. `name` + `date` are export-time additions; nothing here is persisted. */
export function LabReportPaper({ report, name, date, scaffold = false, answers, onAnswer }: { report: LabReport; name: string; date: string; scaffold?: boolean; answers?: Record<string, string>; onAnswer?: (id: string, v: string) => void }) {
  const r = report
  return (
    <div
      className="ddd-report-paper"
      style={{
        maxWidth: 820,
        margin: '0 auto',
        background: PAPER.bg,
        color: PAPER.ink,
        borderRadius: 14,
        boxShadow: '0 24px 70px rgba(0,0,0,.45)',
        padding: '40px 44px 48px',
        fontFamily: "'IBM Plex Sans', system-ui, sans-serif",
        lineHeight: 1.55,
      }}
    >
      {/* masthead */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 16, borderBottom: `2px solid ${PAPER.green}`, paddingBottom: 16 }}>
        <div>
          <div style={{ fontFamily: mono, fontSize: 10, letterSpacing: '.16em', color: PAPER.muted }}>JOHN HAY BIOMEDICAL · DISCOVERY LAB REPORT</div>
          <h1 style={{ fontFamily: head, fontSize: 25, fontWeight: 700, margin: '6px 0 2px' }}>{r.actLabel}</h1>
          <div style={{ fontSize: 12.5, color: PAPER.muted }}>{r.caseLine}</div>
        </div>
        <div style={{ textAlign: 'right', flex: 'none', fontSize: 12 }}>
          <div style={{ color: PAPER.muted, fontFamily: mono, fontSize: 10, letterSpacing: '.1em' }}>RANK</div>
          <div style={{ fontFamily: head, fontWeight: 700, fontSize: 15, color: PAPER.green }}>{r.rank}</div>
          <div style={{ color: PAPER.muted, marginTop: 2 }}>{r.xp} research points</div>
        </div>
      </div>

      {/* student + date */}
      <div style={{ display: 'flex', justifyContent: 'space-between', gap: 16, marginTop: 14, flexWrap: 'wrap' }}>
        <div style={{ fontSize: 13 }}>
          <span style={{ color: PAPER.muted }}>Student: </span>
          <span style={{ fontWeight: 700, borderBottom: name ? 'none' : `1px solid ${PAPER.muted}`, paddingBottom: 1, minWidth: 180, display: 'inline-block' }}>{name || ' '}</span>
        </div>
        <div style={{ fontSize: 13, color: PAPER.muted }}>Date: {date}</div>
      </div>

      <Section title="Abstract" guideKey={scaffold ? 'abstract' : undefined}>
        {scaffold ? (
          <>
            <p style={{ fontSize: 11.5, color: PAPER.muted, marginBottom: 10, lineHeight: 1.5 }}>{SCAFFOLD.abstractIntro}</p>
            {r.abstractParts.map((p, i) => (
              <div key={i} style={{ marginBottom: 12 }}>
                <div style={{ fontWeight: 700, fontSize: 13 }}>{i + 1}. {p.label}</div>
                <div style={{ fontSize: 12.5, color: '#3a4a3e', margin: '1px 0 2px' }}>{p.prompt}</div>
                <div style={{ fontSize: 11.5, color: PAPER.muted, fontStyle: 'italic' }}>From your run: {p.ingredient}</div>
                <WriteBox value={answers?.[`abstract-${i}`] ?? ''} onChange={(v) => onAnswer?.(`abstract-${i}`, v)} />
              </div>
            ))}
          </>
        ) : (
          <>
            <p style={{ fontSize: 11.5, color: PAPER.muted, marginBottom: 6, lineHeight: 1.5 }}>
              Write this last. An abstract is a short summary of the whole report (about 150 to 300 words) that answers
              what you did, why, how, what you found, and what it means. The draft below is built from your run; refine it
              in your own words.
            </p>
            <p style={{ fontSize: 13.5, color: PAPER.ink, lineHeight: 1.55 }}>{r.abstract}</p>
          </>
        )}
      </Section>

      <Section title="01 · Question (Ask)" guideKey={scaffold ? 'question' : undefined}>
        <p style={{ fontSize: 14, color: PAPER.ink }}>{r.question}</p>
      </Section>

      <Section title="02 · Hypothesis & prediction (Hypothesize)" guideKey={scaffold ? 'hypothesis' : undefined}>
        <p style={{ fontSize: 14 }}>{r.hypothesis}</p>
        {r.prediction && (
          <p style={{ fontSize: 13, color: PAPER.muted, marginTop: 4 }}>
            <span style={{ fontFamily: mono, fontSize: 10, letterSpacing: '.12em', color: PAPER.green }}>PREDICTION&nbsp;&nbsp;</span>
            {r.prediction}
          </p>
        )}
      </Section>

      <Section title="03 · Tools & budget (Choose tools)">
        <Rows
          rows={[
            { k: 'Tools selected', v: r.tools.join(' · ') },
            { k: 'Evidence ceiling', v: r.ceilingName },
            { k: 'Team hired', v: r.hires.length ? r.hires.join(' · ') : 'none' },
            { k: 'Grant spent', v: `$${r.budgetSpent.toLocaleString()} of $${r.budgetTotal.toLocaleString()}` },
          ]}
        />
      </Section>

      <Section title="04 · Design" guideKey={scaffold ? 'design' : undefined}>
        <Rows rows={r.design} />
      </Section>

      <Section title="05 · Measurements (Run)" guideKey={scaffold ? 'measurements' : undefined}>
        <Rows rows={r.measurements} />
      </Section>

      <Section title="06 · Analysis (Analyze)" guideKey={scaffold ? 'analysis' : undefined}>
        <p style={{ fontSize: 13.5 }}>{r.analyze}</p>
      </Section>

      {/* CER + Limitation, the headline artifact */}
      <section style={{ marginTop: 24, border: `1.5px solid ${PAPER.green}`, borderRadius: 12, padding: '18px 20px', background: 'rgba(31,157,87,.05)' }}>
        <Kicker>07 · Conclusion · Claim · Evidence · Reasoning · Limitation</Kicker>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
          <span style={{ fontFamily: mono, fontSize: 10, fontWeight: 700, letterSpacing: '.08em', padding: '3px 8px', borderRadius: 5, color: '#fff', background: r.cer.supported ? PAPER.ok : PAPER.blocked }}>
            {r.cer.supported ? 'SUPPORTED' : 'NOT SUPPORTED'}
          </span>
        </div>
        <CerRow label="CLAIM" body={r.cer.claim} guideKey={scaffold ? 'claim' : undefined} />
        <CerRow label="EVIDENCE" body={r.cer.evidence} guideKey={scaffold ? 'evidence' : undefined} />
        {scaffold ? (
          <>
            <CerPrompt label="REASONING" prompt={SCAFFOLD.reasoning} guideKey="reasoning" value={answers?.['reasoning'] ?? ''} onChange={(v) => onAnswer?.('reasoning', v)} />
            <CerPrompt label="LIMITATION" prompt={SCAFFOLD.limitation} accent={PAPER.gold} guideKey="limitation" value={answers?.['limitation'] ?? ''} onChange={(v) => onAnswer?.('limitation', v)} />
          </>
        ) : (
          <>
            <CerRow label="REASONING" body={r.cer.reasoning} />
            <CerRow label="LIMITATION" body={r.cer.limitation} accent={PAPER.gold} />
          </>
        )}
      </section>

      {r.sixRs.length > 0 && (
        <Section title={`08 · What I corrected (the 6 Rs · ${r.sixRs.filter((x) => x.revised).length} ${r.sixRs.filter((x) => x.revised).length === 1 ? 'step' : 'steps'} revised)`}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {r.sixRs.map((row) => (
              <div key={row.stage}>
                <div style={{ fontFamily: head, fontWeight: 700, fontSize: 13, marginBottom: 2 }}>{row.stage}</div>
                {row.revised && (
                  <div style={{ fontSize: 12.5, whiteSpace: 'pre-wrap' }}>
                    <span style={{ fontFamily: mono, fontSize: 9.5, letterSpacing: '.1em', color: PAPER.green }}>REVISED&nbsp;&nbsp;</span>
                    {row.revised}
                  </div>
                )}
                {row.next && (
                  <div style={{ fontSize: 12, color: PAPER.muted, whiteSpace: 'pre-wrap' }}>
                    <span style={{ fontFamily: mono, fontSize: 9.5, letterSpacing: '.1em', color: PAPER.gold }}>NEXT&nbsp;&nbsp;</span>
                    {row.next}
                  </div>
                )}
              </div>
            ))}
          </div>
        </Section>
      )}

      {r.badges.length > 0 && (
        <Section title="Badges earned">
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {r.badges.map((b) => (
              <span key={b.label} style={{ fontSize: 11.5, padding: '4px 10px', borderRadius: 20, border: `1px solid ${PAPER.green}`, color: PAPER.ink, background: 'rgba(31,157,87,.07)' }}>
                {b.label} · {b.points}
              </span>
            ))}
          </div>
        </Section>
      )}

      <div style={{ marginTop: 26, paddingTop: 12, borderTop: `1px solid ${PAPER.rule}`, fontSize: 10.5, color: PAPER.muted, fontFamily: mono, letterSpacing: '.04em' }}>
        Generated locally from this run. No data left the browser. Develop · Differentiate · Derail · mendozabiomed.org
      </div>
    </div>
  )
}

function CerRow({ label, body, accent = PAPER.green, guideKey }: { label: string; body: string; accent?: string; guideKey?: string }) {
  return (
    <div style={{ marginBottom: 9 }}>
      <span style={{ fontFamily: mono, fontSize: 9.5, fontWeight: 700, letterSpacing: '.12em', color: accent }}>{label}&nbsp;&nbsp;</span>
      <span style={{ fontSize: 13.5, color: PAPER.ink }}>{body}</span>
      {guideKey && <DeepDiveLink sectionKey={guideKey} />}
    </div>
  )
}

/** A typeable, auto-growing writing area. Students can type their answer here
 *  (saved as they go); the blank/printed form gives the same box to write by hand. */
function WriteBox({ value = '', onChange }: { value?: string; onChange?: (v: string) => void }) {
  const ref = useRef<HTMLTextAreaElement>(null)
  useEffect(() => {
    const el = ref.current
    if (el) {
      el.style.height = 'auto'
      el.style.height = `${Math.max(54, el.scrollHeight)}px`
    }
  }, [value])
  return (
    <textarea
      ref={ref}
      value={value}
      onChange={(e) => onChange?.(e.target.value)}
      placeholder="Type your answer here, or print the blank form to write by hand."
      style={{
        marginTop: 6,
        width: '100%',
        boxSizing: 'border-box',
        border: '1px dashed #b3c0b3',
        borderRadius: 6,
        minHeight: 54,
        padding: '7px 9px',
        fontFamily: 'inherit',
        fontSize: 12.5,
        color: PAPER.ink,
        lineHeight: 1.6,
        background: '#fff',
        resize: 'vertical',
        overflow: 'hidden',
      }}
    />
  )
}

/** A CER row the student must compose: the label, a prompt with a sentence frame, and space to write. */
function CerPrompt({ label, prompt, accent = PAPER.green, guideKey, value, onChange }: { label: string; prompt: string; accent?: string; guideKey?: string; value?: string; onChange?: (v: string) => void }) {
  return (
    <div style={{ marginBottom: 9 }}>
      <span style={{ fontFamily: mono, fontSize: 9.5, fontWeight: 700, letterSpacing: '.12em', color: accent }}>{label}&nbsp;&nbsp;</span>
      <span style={{ fontSize: 12.5, color: PAPER.muted }}>{prompt}</span>
      {guideKey && <DeepDiveLink sectionKey={guideKey} />}
      <WriteBox value={value} onChange={onChange} />
    </div>
  )
}

function download(filename: string, html: string) {
  try {
    const blob = new Blob([html], { type: 'text/html;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = filename
    document.body.appendChild(a)
    a.click()
    a.remove()
    setTimeout(() => URL.revokeObjectURL(url), 1500)
  } catch {
    /* downloads may be blocked on managed devices; Print is the fallback path */
  }
}

function slug(s: string): string {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || 'student'
}

// Typed answers persist per act so a student's composing survives reloads. Local
// only; never transmitted (the hand-in is a download, like the guided notes).
const answersKey = (act: string) => `ddd_report_answers_${act}`
function loadAnswers(act: string): Record<string, string> {
  try {
    return JSON.parse(localStorage.getItem(answersKey(act)) || '{}')
  } catch {
    return {}
  }
}
function saveAnswers(act: string, a: Record<string, string>) {
  try {
    localStorage.setItem(answersKey(act), JSON.stringify(a))
  } catch {
    /* ignore */
  }
}

/** The button students see on the Iterate stage, plus its export overlay. */
export default function LabReportButton({ state, reflections, badges, data, onOpenChange }: { state: LoopState; reflections: Reflections; badges: string[]; data?: ExperimentData; onOpenChange?: (open: boolean) => void }) {
  const [open, setOpenRaw] = useState(false)
  const setOpen = (v: boolean) => {
    setOpenRaw(v)
    onOpenChange?.(v)
  }
  const [name, setName] = useState('')
  const [answers, setAnswers] = useState<Record<string, string>>(() => loadAnswers(state.act))
  const onAnswer = (id: string, v: string) =>
    setAnswers((prev) => {
      const next = { ...prev, [id]: v }
      saveAnswers(state.act, next)
      return next
    })
  const report = buildReport(state, reflections, badges, data)
  const date = todayLabel()

  const onPrint = () => {
    const prev = document.title
    document.title = `Lab Report - ${report.actLabel} - ${name || 'student'}`
    window.print()
    setTimeout(() => {
      document.title = prev
    }, 500)
  }

  // Filled with whatever the student typed; the blank version omits the answers.
  const onDownload = () => {
    download(`lab-report-${slug(report.actLabel)}-${slug(name)}.html`, reportToHtml(report, name, date, true, answers))
  }
  const onDownloadBlank = () => {
    download(`lab-report-BLANK-${slug(report.actLabel)}.html`, reportToHtml(report, name, date, true))
  }

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        style={{
          marginTop: 20,
          width: '100%',
          padding: '15px 18px',
          borderRadius: 13,
          border: '1.5px solid var(--c-green)',
          background: 'color-mix(in srgb, var(--c-green) 10%, transparent)',
          color: 'var(--text)',
          cursor: 'pointer',
          textAlign: 'left',
          display: 'flex',
          alignItems: 'center',
          gap: 12,
        }}
      >
        <span style={{ fontSize: 22 }} aria-hidden>
          📄
        </span>
        <span>
          <span style={{ display: 'block', fontFamily: head, fontWeight: 600, fontSize: 15.5 }}>Download my lab report</span>
          <span style={{ display: 'block', fontSize: 12.5, color: 'var(--muted)', marginTop: 2 }}>A hand-in record of this run: your question, evidence, conclusion with its limitation, and what you corrected.</span>
        </span>
      </button>

      {open &&
        createPortal(
          <div
            className="ddd-report-overlay"
            role="dialog"
            aria-modal="true"
            aria-label="Lab report preview"
            style={{ position: 'fixed', inset: 0, zIndex: 9999, overflow: 'auto', background: 'rgba(3,6,12,.72)', padding: '24px 16px 64px' }}
            onClick={(e) => {
              if (e.target === e.currentTarget) setOpen(false)
            }}
          >
            {/* toolbar (never printed) */}
            <div className="ddd-report-noprint" style={{ maxWidth: 820, margin: '0 auto 14px', display: 'flex', flexWrap: 'wrap', gap: 10, alignItems: 'center' }}>
              <label style={{ flex: 1, minWidth: 200, display: 'flex', alignItems: 'center', gap: 8, background: 'var(--panel)', border: '1px solid var(--line)', borderRadius: 10, padding: '8px 12px' }}>
                <span style={{ fontFamily: mono, fontSize: 10, letterSpacing: '.1em', color: 'var(--muted)', flex: 'none' }}>YOUR NAME</span>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="(optional, not saved)"
                  style={{ flex: 1, background: 'transparent', border: 'none', outline: 'none', color: 'var(--text)', fontSize: 14 }}
                />
              </label>
              <StatsHelpButton context={state.act === 'differentiate' ? 'bench' : 'spacing'} compact />
              <button onClick={onDownload} style={btn('var(--accent)')}>
                ⬇ Download my report
              </button>
              <button onClick={onPrint} style={btn('var(--c-green)')}>
                🖨 Print
              </button>
              <button onClick={onDownloadBlank} style={btn('var(--line)')}>
                ⬇ Blank form
              </button>
              <button onClick={() => setOpen(false)} style={btn('var(--line)', true)}>
                Close
              </button>
            </div>
            <div className="ddd-report-noprint" style={{ maxWidth: 820, margin: '0 auto 14px', fontSize: 12.5, color: 'var(--muted)', lineHeight: 1.5 }}>
              Type your answers right in the boxes below (they save as you go), then <b style={{ color: 'var(--text)' }}>Download my report</b> or <b style={{ color: 'var(--text)' }}>Print</b>. Prefer to write by hand? Use <b style={{ color: 'var(--text)' }}>Blank form</b>. Every section also has a <b style={{ color: 'var(--text)' }}>How to write this</b> link with a step-by-step guide and tutorials.
            </div>

            <LabReportPaper report={report} name={name} date={date} scaffold answers={answers} onAnswer={onAnswer} />
          </div>,
          document.body,
        )}
    </>
  )
}

function btn(color: string, muted = false): React.CSSProperties {
  return {
    flex: 'none',
    padding: '9px 14px',
    borderRadius: 10,
    border: `1.5px solid ${color}`,
    background: muted ? 'var(--panel)' : `color-mix(in srgb, ${color} 16%, transparent)`,
    color: 'var(--text)',
    cursor: 'pointer',
    fontFamily: mono,
    fontSize: 12,
  }
}
