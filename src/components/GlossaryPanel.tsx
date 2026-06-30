import { useMemo, useState } from 'react'
import { createPortal } from 'react-dom'
import { GLOSSARY } from '../content/glossary'

// A floating, searchable glossary the student can open any time, including while
// reading a chapter. Lists every defined term (the same definitions the inline
// tap-to-define "i" uses), so no vocabulary word is a dead end.

const mono = "'IBM Plex Mono'"
const head = "'Space Grotesk'"

// The portal hosts a labeled illustration per term at /glossary/<slug>.webp (same
// domain as the embedded sim). Slug matches the portal's: lowercase, non-alphanumeric
// runs become "-". Terms without an illustration fall back to text via onError.
// A few core lab terms the portal illustrates under a different name are aliased so
// they still get a picture inline.
const IMG_ALIAS: Record<string, string> = {
  'extracellular matrix': 'ecm',
  replicates: 'replicate',
  'sample size (n)': 'sample-size',
  blind: 'blinding',
}
const imgSlug = (term: string) => IMG_ALIAS[term.toLowerCase()] ?? term.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '')

export default function GlossaryPanel({ onClose }: { onClose: () => void }) {
  const [q, setQ] = useState('')
  // distinct by display term, alphabetized (the glossary has key aliases that
  // share a definition, so collapse to one card per display term).
  const all = useMemo(() => {
    const seen = new Set<string>()
    const out: { term: string; def: string }[] = []
    for (const e of Object.values(GLOSSARY)) {
      const k = e.term.toLowerCase()
      if (seen.has(k)) continue
      seen.add(k)
      out.push({ term: e.term, def: e.def })
    }
    return out.sort((a, b) => a.term.toLowerCase().localeCompare(b.term.toLowerCase()))
  }, [])
  const needle = q.trim().toLowerCase()
  const shown = needle ? all.filter((e) => e.term.toLowerCase().includes(needle) || e.def.toLowerCase().includes(needle)) : all

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Glossary"
      onClick={onClose}
      style={{ position: 'fixed', inset: 0, zIndex: 60, display: 'grid', placeItems: 'center', padding: 'clamp(12px, 3vw, 40px)', background: 'color-mix(in srgb, #04060c 80%, transparent)', backdropFilter: 'blur(6px)' }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{ width: 'min(640px, 100%)', maxHeight: '88vh', display: 'flex', flexDirection: 'column', background: 'var(--bg2)', border: '1px solid var(--line)', borderRadius: 16, boxShadow: '0 20px 60px rgba(0,0,0,.5)', overflow: 'hidden' }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 10, padding: '14px 18px 10px' }}>
          <div style={{ fontFamily: mono, fontSize: 11, letterSpacing: '.14em', color: 'var(--accent)' }}>📖 GLOSSARY</div>
          <button onClick={onClose} aria-label="Close glossary" style={{ minHeight: 30, padding: '5px 11px', borderRadius: 7, border: '1px solid var(--line)', background: 'transparent', color: 'var(--muted)', cursor: 'pointer', fontFamily: mono, fontSize: 10, letterSpacing: '.06em' }}>✕ CLOSE</button>
        </div>
        <div style={{ padding: '0 18px 12px' }}>
          <input
            autoFocus
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder={`Search ${all.length} terms...`}
            style={{ width: '100%', background: 'var(--panel)', border: '1px solid var(--line)', borderRadius: 10, padding: '10px 12px', color: 'var(--text)', fontSize: 14, outline: 'none' }}
          />
          <a
            href="/learn/glossary"
            target="_blank"
            rel="noopener noreferrer"
            style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 8, padding: '8px 12px', borderRadius: 9, border: '1px solid color-mix(in srgb, var(--accent) 45%, var(--line))', background: 'color-mix(in srgb, var(--accent) 10%, transparent)', color: 'var(--text)', textDecoration: 'none', fontSize: 12.5 }}
          >
            <span aria-hidden style={{ fontSize: 15 }}>🖼</span>
            <span>Open the full illustrated glossary, every term with a labeled picture <span style={{ color: 'var(--accent)' }}>→</span></span>
          </a>
        </div>
        <div style={{ overflowY: 'auto', padding: '0 18px 18px', display: 'flex', flexDirection: 'column', gap: 8 }}>
          {shown.length === 0 ? (
            <div style={{ fontSize: 13, color: 'var(--muted)', padding: '8px 2px' }}>No term matches "{q}".</div>
          ) : (
            shown.map((e) => (
              <div key={e.term} style={{ display: 'flex', gap: 12, border: '1px solid var(--line)', borderRadius: 10, background: 'var(--panel)', padding: '10px 12px' }}>
                <img
                  src={`/glossary/${imgSlug(e.term)}.webp`}
                  alt=""
                  aria-hidden
                  loading="lazy"
                  decoding="async"
                  onError={(ev) => {
                    ev.currentTarget.style.display = 'none'
                  }}
                  style={{ flex: 'none', width: 92, height: 70, objectFit: 'contain', borderRadius: 8, border: '1px solid var(--line)', background: '#0a130e' }}
                />
                <div style={{ minWidth: 0, flex: 1 }}>
                  <div style={{ fontFamily: head, fontWeight: 600, fontSize: 14, color: 'var(--text)', marginBottom: 2 }}>{e.term}</div>
                  <div style={{ fontSize: 13, lineHeight: 1.5, color: 'var(--muted)' }}>{e.def}</div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>,
    document.body,
  )
}
