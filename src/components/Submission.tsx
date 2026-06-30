import { useState } from 'react'
import { createPortal } from 'react-dom'
import type { LibraryChapter } from '../content/library'
import { loadNotes, notesComplete } from './GuidedNotes'

// Submission page for a chapter's completed guided notes. Collects student name,
// ID, and period, awards the reading points on submit, and downloads a named
// hand-in copy. There is NO network call: identifiable student work never touches
// a public endpoint. The student then uploads the hand-in to the district class
// drop folder (CMSD OneDrive), so the work stays inside district storage and the
// teacher pulls it from there for grading.

const mono = "'IBM Plex Mono'"
const head = "'Space Grotesk'"

// The class drop folder the student uploads their hand-in to: the CMSD OneDrive
// "Biomed Submissions / Inbox" folder. This link ships in the public bundle, so the
// share MUST be scoped to "People in CMSD with the link can upload" (district login
// required), never "Anyone with the link". Left blank, the page just tells students
// to turn it in the way the teacher asks.
const DROP_FOLDER_URL = 'https://clemetroschools-my.sharepoint.com/:f:/g/personal/manuel_mendoza_clevelandmetroschools_org/IgAf1ESs65YtTrYcgZv8FgjJAZbFclhpQefNvNu4Mu3Ox8E?e=PJQCAD'

const field: React.CSSProperties = {
  background: 'var(--panel)',
  border: '1px solid var(--line)',
  borderRadius: 9,
  padding: '9px 11px',
  color: 'var(--text)',
  fontSize: 14,
  outline: 'none',
  width: '100%',
}

function downloadHandIn(ch: LibraryChapter, id: string, period: string, name: string) {
  try {
    const n = loadNotes(ch)
    const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    const rows = ch.sections.map((s, i) => `<tr><td class="cue">${esc(s.heading)}</td><td>${esc(n.sections[i] || '')}</td></tr>`).join('')
    const html = `<!doctype html><html><head><meta charset="utf-8"><title>Guided Notes Submission - ${esc(ch.title)}</title><style>
      body{font-family:'IBM Plex Sans',system-ui,sans-serif;color:#16261a;max-width:820px;margin:24px auto;padding:0 20px;line-height:1.5}
      h1{font-family:'Space Grotesk',sans-serif;font-size:21px;margin:0 0 2px}
      .eyebrow{font-family:'IBM Plex Mono',monospace;font-size:10px;letter-spacing:.14em;color:#1f9d57;text-transform:uppercase}
      .id{margin:10px 0 16px;font-size:13px} .id b{font-weight:700}
      table{width:100%;border-collapse:collapse} td{vertical-align:top;border:1px solid #c9d2c9;padding:8px 10px;font-size:13px}
      .cue{width:32%;font-weight:600;background:#f1f6f1}
    </style></head><body>
      <div class="eyebrow">John Hay Biomedical &middot; Guided Notes Submission</div>
      <h1>${esc(ch.title)}</h1>
      <div class="id">Name: <b>${esc(name)}</b> &middot; Period: <b>${esc(period)}</b> &middot; Student ID: <b>${esc(id)}</b></div>
      <table><tr><td class="cue" style="background:#e6efe6">Cue / heading</td><td style="background:#e6efe6;font-weight:600">Notes</td></tr>${rows}
      <tr><td class="cue">Vocabulary in my own words</td><td>${esc(n.vocab)}</td></tr>
      <tr><td class="cue">Summary</td><td>${esc(n.summary)}</td></tr></table>
    </body></html>`
    const blob = new Blob([html], { type: 'text/html;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `submission-${ch.id}-${(id || name || 'student').toLowerCase().replace(/[^a-z0-9]+/g, '-')}.html`
    document.body.appendChild(a)
    a.click()
    a.remove()
    setTimeout(() => URL.revokeObjectURL(url), 1500)
  } catch {
    /* download may be blocked on managed devices */
  }
}

export default function Submission({ ch, onSubmitReading, onClose }: { ch: LibraryChapter; onSubmitReading: () => void; onClose: () => void }) {
  const [id, setId] = useState('')
  const [period, setPeriod] = useState('')
  const [name, setName] = useState('')
  const [status, setStatus] = useState<'idle' | 'sending' | 'done'>('idle')
  const complete = notesComplete(ch)
  const ready = complete && id.trim() && period.trim() && name.trim()

  const submit = () => {
    if (!ready) return
    // No network call: the hand-in downloads locally, then the student uploads it
    // to the district class drop folder. Identifiable work stays inside CMSD storage.
    downloadHandIn(ch, id.trim(), period.trim(), name.trim())
    onSubmitReading()
    setStatus('done')
  }

  return createPortal(
    <div role="dialog" aria-modal="true" aria-label={`Submit guided notes for ${ch.title}`} onClick={onClose} style={{ position: 'fixed', inset: 0, zIndex: 60, display: 'grid', placeItems: 'center', padding: 'clamp(12px,3vw,40px)', background: 'color-mix(in srgb, #04060c 82%, transparent)', backdropFilter: 'blur(6px)' }}>
      <div onClick={(e) => e.stopPropagation()} style={{ width: 'min(520px,100%)', maxHeight: '88vh', overflowY: 'auto', background: 'var(--bg2)', border: '1px solid var(--line)', borderRadius: 16, boxShadow: '0 20px 60px rgba(0,0,0,.5)', padding: 'clamp(16px,2.4vw,24px)' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 }}>
          <div style={{ fontFamily: mono, fontSize: 10.5, letterSpacing: '.14em', color: 'var(--accent)' }}>📤 SUBMIT GUIDED NOTES</div>
          <button onClick={onClose} aria-label="Close" style={{ minHeight: 30, padding: '5px 11px', borderRadius: 7, border: '1px solid var(--line)', background: 'transparent', color: 'var(--muted)', cursor: 'pointer', fontFamily: mono, fontSize: 10 }}>✕ CLOSE</button>
        </div>
        <h1 style={{ fontFamily: head, fontWeight: 700, fontSize: 19, lineHeight: 1.2, marginBottom: 4 }}>{ch.title}</h1>

        {status === 'done' ? (
          <div style={{ marginTop: 14, border: '1px solid var(--c-green)', borderRadius: 12, background: 'color-mix(in srgb, var(--c-green) 8%, var(--panel))', padding: '16px 18px' }}>
            <div style={{ fontFamily: head, fontWeight: 700, fontSize: 16, color: 'var(--c-green)', marginBottom: 6 }}>✓ Submitted</div>
            <p style={{ fontSize: 13.5, lineHeight: 1.55, color: 'var(--text)', marginBottom: 10 }}>Your reading points are awarded, and a copy of your guided notes just downloaded as a hand-in.</p>
            <ol style={{ margin: '0 0 4px', paddingLeft: 18, display: 'flex', flexDirection: 'column', gap: 6 }}>
              <li style={{ fontSize: 13, lineHeight: 1.5, color: 'var(--text)' }}>Your hand-in file downloaded (check your Downloads).</li>
              <li style={{ fontSize: 13, lineHeight: 1.5, color: 'var(--text)' }}>{DROP_FOLDER_URL ? 'Upload that file to the class drop folder below.' : 'Turn it in the way your teacher asks.'}</li>
            </ol>
            {DROP_FOLDER_URL && (
              <a href={DROP_FOLDER_URL} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, marginTop: 10, minHeight: 42, padding: '10px 16px', borderRadius: 10, border: '1px solid var(--c-green)', background: 'color-mix(in srgb, var(--c-green) 12%, transparent)', color: 'var(--text)', textDecoration: 'none', fontFamily: head, fontWeight: 700, fontSize: 14 }}>📤 Open the class drop folder →</a>
            )}
            <div><button onClick={onClose} style={{ marginTop: 12, minHeight: 40, padding: '9px 16px', borderRadius: 9, border: '1px solid var(--line)', background: 'transparent', color: 'var(--text)', cursor: 'pointer', fontSize: 13 }}>Done</button></div>
          </div>
        ) : (
          <>
            <p style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.55, margin: '4px 0 14px' }}>
              Submit your completed Cornell guided notes for this chapter to earn the reading points.
            </p>
            {!complete && (
              <div style={{ border: '1px solid color-mix(in srgb, var(--c-amber) 50%, var(--line))', borderRadius: 10, background: 'color-mix(in srgb, var(--c-amber) 9%, var(--panel))', padding: '10px 12px', fontSize: 13, lineHeight: 1.5, color: 'var(--text)', marginBottom: 14 }}>
                Finish your guided notes first: fill in notes for at least two parts and write the summary. Open <b>Guided Notes</b> from the menu.
              </div>
            )}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <label style={{ fontFamily: mono, fontSize: 10.5, letterSpacing: '.1em', color: 'var(--muted)' }}>STUDENT NAME
                <input value={name} onChange={(e) => setName(e.target.value)} placeholder="First and last name" style={{ ...field, marginTop: 4 }} />
              </label>
              <div style={{ display: 'flex', gap: 10 }}>
                <label style={{ flex: 1, fontFamily: mono, fontSize: 10.5, letterSpacing: '.1em', color: 'var(--muted)' }}>STUDENT ID
                  <input value={id} onChange={(e) => setId(e.target.value)} inputMode="numeric" placeholder="ID number" style={{ ...field, marginTop: 4 }} />
                </label>
                <label style={{ flex: 1, fontFamily: mono, fontSize: 10.5, letterSpacing: '.1em', color: 'var(--muted)' }}>PERIOD
                  <input value={period} onChange={(e) => setPeriod(e.target.value)} placeholder="Class period" style={{ ...field, marginTop: 4 }} />
                </label>
              </div>
            </div>
            <button
              onClick={submit}
              disabled={!ready || status === 'sending'}
              style={{ marginTop: 16, width: '100%', minHeight: 46, borderRadius: 11, border: 'none', background: ready ? 'var(--accent)' : 'var(--panel)', color: ready ? '#04060c' : 'var(--muted)', cursor: ready ? 'pointer' : 'not-allowed', fontFamily: head, fontWeight: 700, fontSize: 15 }}
            >
              {status === 'sending' ? 'Submitting...' : ready ? 'Submit and earn reading points →' : complete ? 'Enter your name, ID, and period' : 'Finish your guided notes first'}
            </button>
            <p style={{ fontSize: 11, color: 'var(--muted)', lineHeight: 1.5, marginTop: 10 }}>
              Nothing is sent over the internet. Your hand-in downloads to your device, and you upload it to the district class folder, where it stays private to your class.
            </p>
          </>
        )}
      </div>
    </div>,
    document.body,
  )
}
