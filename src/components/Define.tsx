import { useEffect, useId, useRef, useState, type ReactNode } from 'react'
import { lookup } from '../content/glossary'

/**
 * Tap-to-define inline gloss (touch-first, no hover dependence). Wrap any hard
 * term: <Define t="claim ceiling">claim ceiling</Define>. Renders the child text
 * with a dotted underline + a small "i"; tapping it pops a plain-language
 * definition. If the term is not in the glossary it renders plain text (so a typo
 * never crashes, it just shows the words).
 */
export default function Define({ t, children }: { t: string; children?: ReactNode }) {
  const entry = lookup(t)
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLSpanElement | null>(null)
  const id = useId()
  const label = children ?? entry?.term ?? t

  useEffect(() => {
    if (!open) return
    const onDoc = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    document.addEventListener('mousedown', onDoc)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onDoc)
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  if (!entry) return <>{label}</>

  return (
    <span ref={ref} style={{ position: 'relative', display: 'inline' }}>
      <button
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-describedby={open ? id : undefined}
        style={{
          display: 'inline',
          background: 'none',
          border: 'none',
          padding: 0,
          margin: 0,
          font: 'inherit',
          color: 'inherit',
          cursor: 'help',
          borderBottom: '1.5px dotted color-mix(in srgb, var(--accent) 70%, transparent)',
          lineHeight: 'inherit',
        }}
      >
        {label}
        <sup style={{ fontSize: '0.7em', color: 'var(--accent)', marginLeft: 1, fontWeight: 700 }}>i</sup>
      </button>
      {open && (
        <span
          id={id}
          role="tooltip"
          style={{
            position: 'absolute',
            zIndex: 30,
            left: 0,
            top: 'calc(100% + 6px)',
            width: 'min(280px, 70vw)',
            background: 'var(--panel2)',
            border: '1px solid color-mix(in srgb, var(--accent) 45%, var(--line))',
            borderRadius: 10,
            padding: '10px 12px',
            boxShadow: '0 8px 30px rgba(0,0,0,0.45)',
            textAlign: 'left',
            cursor: 'auto',
          }}
        >
          <span style={{ display: 'block', fontFamily: "'IBM Plex Mono'", fontSize: 11, letterSpacing: '.06em', color: 'var(--accent)', marginBottom: 4 }}>
            {entry.term.toUpperCase()}
          </span>
          <span style={{ display: 'block', fontSize: 13, lineHeight: 1.5, color: 'var(--text)', fontWeight: 400 }}>
            {entry.def}
          </span>
        </span>
      )}
    </span>
  )
}
