import { useState } from 'react'
import { createPortal } from 'react-dom'
import { buildExampleReport, EXAMPLE_DATE, EXAMPLE_NAME } from '../lib/report'
import { LabReportPaper } from './LabReport'

// The exemplar shown at the very beginning so a student sees the finish line:
// the lab report they will save or print at the end. It is the SAME document the
// export produces (built from one completed Act I run), shown read-only here.
// Onboarding requires opening this once before the "begin" button unlocks.

const mono = "'IBM Plex Mono'"
const head = "'Space Grotesk'"

export default function LabReportExemplar({ onReviewed }: { onReviewed?: () => void }) {
  const [open, setOpen] = useState(false)
  const report = buildExampleReport()

  const openIt = () => {
    setOpen(true)
    onReviewed?.()
  }

  return (
    <>
      <div style={{ border: '1px solid color-mix(in srgb, var(--c-green) 45%, var(--line))', borderRadius: 12, background: 'color-mix(in srgb, var(--c-green) 7%, var(--panel2))', padding: '13px 15px', marginBottom: 18 }}>
        <div style={{ fontFamily: mono, fontSize: 10, letterSpacing: '.12em', color: 'var(--c-green)', marginBottom: 6 }}>SEE THE FINISH LINE FIRST</div>
        <div style={{ fontSize: 13.5, lineHeight: 1.55, color: 'var(--text)', marginBottom: 11 }}>
          At the end of a run you can save or print a <b>lab report</b>: a record of your question, your evidence, your
          conclusion with its limit, and what you corrected. Review the example now so you know what you are building toward.
        </div>
        <button
          onClick={openIt}
          style={{ display: 'inline-flex', alignItems: 'center', gap: 8, minHeight: 40, padding: '8px 14px', borderRadius: 10, border: '1.5px solid var(--c-green)', background: 'color-mix(in srgb, var(--c-green) 12%, transparent)', color: 'var(--text)', cursor: 'pointer', fontFamily: head, fontWeight: 600, fontSize: 14 }}
        >
          📄 Review the example lab report
        </button>
      </div>

      {open && createPortal(
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Example lab report"
          onClick={() => setOpen(false)}
          style={{ position: 'fixed', inset: 0, zIndex: 60, overflow: 'auto', background: 'color-mix(in srgb, #04060c 82%, transparent)', backdropFilter: 'blur(5px)', padding: '20px 14px 60px' }}
        >
          <div style={{ maxWidth: 820, margin: '0 auto 12px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 10 }} onClick={(e) => e.stopPropagation()}>
            <div style={{ fontFamily: mono, fontSize: 11, letterSpacing: '.12em', color: 'var(--c-green)' }}>📄 EXAMPLE LAB REPORT &middot; THIS IS WHAT YOU WILL HAND IN</div>
            <button onClick={() => setOpen(false)} aria-label="Close" style={{ flex: 'none', minHeight: 34, padding: '6px 13px', borderRadius: 9, border: '1.5px solid var(--c-green)', background: 'color-mix(in srgb, var(--c-green) 14%, transparent)', color: 'var(--text)', cursor: 'pointer', fontFamily: mono, fontSize: 11 }}>Got it, close ✕</button>
          </div>
          <div onClick={(e) => e.stopPropagation()}>
            <LabReportPaper report={report} name={EXAMPLE_NAME} date={EXAMPLE_DATE} />
          </div>
        </div>,
        document.body,
      )}
    </>
  )
}
