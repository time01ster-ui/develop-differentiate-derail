import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import type { LibraryChapter } from '../content/library'

// Cornell-format guided notes for one chapter, mirroring the lesson (not a
// re-teach): a cue column of the chapter's questions + key terms on the left,
// fillable note space per section on the right, and a summary at the bottom.
// Entries persist locally (per chapter) so a student can come back, and a
// download produces a print-ready Cornell sheet with room to write.

const mono = "'IBM Plex Mono'"
const head = "'Space Grotesk'"

interface NotesData {
  sections: string[]
  vocab: string
  summary: string
}

function keyFor(id: string) {
  return `ddd_guided_${id}`
}

// In-session copy of every chapter's notes. Completion must NOT depend on
// localStorage actually persisting: some managed devices, private windows, or
// storage-blocking settings silently drop it, which would leave a student who
// filled everything stuck at 0/2 forever. We always keep the notes here for the
// life of the page (so submit works), and still write localStorage as a bonus for
// surviving reloads when it is available.
const memStore: Record<string, NotesData> = {}
export function rememberNotes(id: string, data: NotesData) {
  memStore[id] = data
}

export function loadNotes(ch: LibraryChapter): NotesData {
  const empty: NotesData = { sections: ch.sections.map(() => ''), vocab: '', summary: '' }
  const mem = memStore[ch.id]
  if (mem) {
    return {
      sections: ch.sections.map((_, i) => mem.sections[i] ?? ''),
      vocab: mem.vocab ?? '',
      summary: mem.summary ?? '',
    }
  }
  if (typeof window === 'undefined') return empty
  try {
    const raw = window.localStorage.getItem(keyFor(ch.id))
    if (!raw) return empty
    const d = JSON.parse(raw) as Partial<NotesData>
    return {
      sections: ch.sections.map((_, i) => d.sections?.[i] ?? ''),
      vocab: d.vocab ?? '',
      summary: d.summary ?? '',
    }
  } catch {
    return empty
  }
}

/** Whether the student has written enough to count the notes as completed. */
export function notesComplete(ch: LibraryChapter): boolean {
  const d = loadNotes(ch)
  const filledSections = d.sections.filter((s) => s.trim().length >= 15).length
  return filledSections >= Math.min(2, ch.sections.length) && d.summary.trim().length >= 15
}

const ta: React.CSSProperties = {
  width: '100%',
  minHeight: 70,
  resize: 'vertical',
  background: 'var(--panel)',
  border: '1px solid var(--line)',
  borderRadius: 8,
  padding: '8px 10px',
  color: 'var(--text)',
  fontSize: 13.5,
  lineHeight: 1.5,
  fontFamily: 'inherit',
  outline: 'none',
}

function cueList(ch: LibraryChapter): string[] {
  const cues = [...ch.keyQuestions]
  for (const s of ch.sections) cues.push(s.heading)
  return cues
}

export default function GuidedNotes({ ch, onClose }: { ch: LibraryChapter; onClose: () => void }) {
  const [data, setData] = useState<NotesData>(() => loadNotes(ch))
  useEffect(() => {
    setData(loadNotes(ch))
  }, [ch.id])
  useEffect(() => {
    rememberNotes(ch.id, data) // always works, even when localStorage is blocked
    try {
      window.localStorage.setItem(keyFor(ch.id), JSON.stringify(data))
    } catch {
      /* storage may be blocked on managed devices; the in-session copy still counts */
    }
  }, [ch.id, data])

  const setSection = (i: number, v: string) => setData((d) => ({ ...d, sections: d.sections.map((s, j) => (j === i ? v : s)) }))
  const terms = Array.from(new Set(ch.sections.flatMap((s) => s.terms)))

  const download = () => {
    try {
      const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      const line = '<div style="border-bottom:1px solid #c9d2c9;height:26px"></div>'
      const blanks = (n: number) => Array.from({ length: n }, () => line).join('')
      const cues = cueList(ch).map((c) => `<li>${esc(c)}</li>`).join('')
      const sections = ch.sections
        .map((s, i) => `<tr><td class="cue">${esc(s.heading)}</td><td class="note">${data.sections[i] ? `<div class="filled">${esc(data.sections[i])}</div>` : ''}${blanks(data.sections[i] ? 2 : 4)}</td></tr>`)
        .join('')
      const html = `<!doctype html><html><head><meta charset="utf-8"><title>Guided Notes - ${esc(ch.title)}</title><style>
        body{font-family:'IBM Plex Sans',system-ui,sans-serif;color:#16261a;max-width:820px;margin:24px auto;padding:0 20px;line-height:1.5}
        h1{font-family:'Space Grotesk',sans-serif;font-size:22px;margin:0 0 2px}
        .eyebrow{font-family:'IBM Plex Mono',monospace;font-size:10px;letter-spacing:.14em;color:#1f9d57;text-transform:uppercase}
        .id{display:flex;gap:24px;margin:10px 0 16px;font-size:13px}
        .id span{border-bottom:1px solid #16261a;min-width:160px;display:inline-block}
        table{width:100%;border-collapse:collapse} td{vertical-align:top;border:1px solid #c9d2c9;padding:8px 10px}
        .cue{width:32%;font-weight:600;font-size:13px;background:#f1f6f1} .note{width:68%}
        .filled{font-size:13px;margin-bottom:6px;white-space:pre-wrap}
        .summary td{height:90px} ul{margin:6px 0 14px;padding-left:18px;font-size:12.5px;color:#3a4a3e}
        @media print{body{margin:0}}
      </style></head><body>
        <div class="eyebrow">John Hay Biomedical &middot; Guided Notes (Cornell)</div>
        <h1>${esc(ch.title)}</h1>
        <div class="id">Name: <span></span> Period: <span></span> Student ID: <span></span></div>
        <div class="eyebrow">Cues &amp; questions</div><ul>${cues}</ul>
        <table><tr><td class="cue" style="background:#e6efe6">Cue / heading</td><td class="note" style="background:#e6efe6;font-weight:600">My notes</td></tr>${sections}
        <tr class="summary"><td class="cue">Vocabulary in my own words<br><span style="font-weight:400;font-size:11px">${esc(terms.join(', '))}</span></td><td class="note">${data.vocab ? `<div class="filled">${esc(data.vocab)}</div>` : ''}${blanks(3)}</td></tr>
        <tr class="summary"><td class="cue">Summary (the big idea in 2-3 sentences)</td><td class="note">${data.summary ? `<div class="filled">${esc(data.summary)}</div>` : ''}${blanks(3)}</td></tr>
        </table></body></html>`
      const blob = new Blob([html], { type: 'text/html;charset=utf-8' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `guided-notes-${ch.id}.html`
      document.body.appendChild(a)
      a.click()
      a.remove()
      setTimeout(() => URL.revokeObjectURL(url), 1500)
    } catch {
      /* downloads may be blocked on managed devices */
    }
  }

  return createPortal(
    <div role="dialog" aria-modal="true" aria-label={`Guided notes for ${ch.title}`} onClick={onClose} style={{ position: 'fixed', inset: 0, zIndex: 60, overflow: 'auto', background: 'color-mix(in srgb, #04060c 82%, transparent)', backdropFilter: 'blur(5px)', padding: '20px 14px 60px' }}>
      <div onClick={(e) => e.stopPropagation()} style={{ maxWidth: 900, margin: '0 auto', background: 'var(--bg2)', border: '1px solid var(--line)', borderRadius: 16, boxShadow: '0 20px 60px rgba(0,0,0,.5)', overflow: 'hidden' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 10, padding: '14px 18px', borderBottom: '1px solid var(--line)', background: 'color-mix(in srgb, var(--accent) 6%, var(--bg2))' }}>
          <div>
            <div style={{ fontFamily: mono, fontSize: 10.5, letterSpacing: '.14em', color: 'var(--accent)' }}>📝 GUIDED NOTES · CORNELL</div>
            <div style={{ fontFamily: head, fontWeight: 700, fontSize: 18, marginTop: 2 }}>{ch.title}</div>
          </div>
          <div style={{ display: 'flex', gap: 8, flex: 'none' }}>
            <button onClick={download} style={{ minHeight: 34, padding: '6px 12px', borderRadius: 8, border: '1px solid var(--c-green)', background: 'color-mix(in srgb, var(--c-green) 12%, transparent)', color: 'var(--text)', cursor: 'pointer', fontFamily: mono, fontSize: 11 }}>⬇ Download</button>
            <button onClick={onClose} aria-label="Close guided notes" style={{ minHeight: 34, padding: '6px 12px', borderRadius: 8, border: '1px solid var(--line)', background: 'transparent', color: 'var(--muted)', cursor: 'pointer', fontFamily: mono, fontSize: 11 }}>✕</button>
          </div>
        </div>

        <div style={{ padding: '16px 18px 22px' }}>
          <p style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.5, marginBottom: 14 }}>
            Cornell notes: the cues and questions are on the left, your notes go on the right, and you write the big idea in the summary. Your writing saves on this device. Submit your completed notes to earn the reading points.
          </p>

          {/* cue + notes rows (one per section) */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {ch.sections.map((s, i) => (
              <div key={i} style={{ display: 'grid', gridTemplateColumns: '32% 1fr', gap: 12, alignItems: 'start' }}>
                <div style={{ fontFamily: head, fontWeight: 600, fontSize: 13, color: 'var(--text)', paddingTop: 6 }}>{s.heading}</div>
                <textarea value={data.sections[i]} onChange={(e) => setSection(i, e.target.value)} placeholder="Your notes for this part..." style={ta} />
              </div>
            ))}

            {/* vocabulary */}
            <div style={{ display: 'grid', gridTemplateColumns: '32% 1fr', gap: 12, alignItems: 'start', borderTop: '1px solid var(--line)', paddingTop: 12 }}>
              <div style={{ paddingTop: 6 }}>
                <div style={{ fontFamily: head, fontWeight: 600, fontSize: 13, color: 'var(--text)' }}>Vocabulary in my own words</div>
                <div style={{ fontFamily: mono, fontSize: 10.5, color: 'var(--muted)', marginTop: 4, lineHeight: 1.5 }}>{terms.join(' · ')}</div>
              </div>
              <textarea value={data.vocab} onChange={(e) => setData((d) => ({ ...d, vocab: e.target.value }))} placeholder="Define the key terms in your own words (tap any term in the reading or open the Glossary for help)." style={{ ...ta, minHeight: 90 }} />
            </div>

            {/* summary */}
            <div style={{ display: 'grid', gridTemplateColumns: '32% 1fr', gap: 12, alignItems: 'start', borderTop: '2px solid color-mix(in srgb, var(--accent) 40%, var(--line))', paddingTop: 12 }}>
              <div style={{ fontFamily: head, fontWeight: 700, fontSize: 13, color: 'var(--accent)', paddingTop: 6 }}>Summary · the big idea</div>
              <textarea value={data.summary} onChange={(e) => setData((d) => ({ ...d, summary: e.target.value }))} placeholder="In 2-3 sentences, what is the one big idea of this chapter?" style={{ ...ta, minHeight: 80 }} />
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.body,
  )
}
