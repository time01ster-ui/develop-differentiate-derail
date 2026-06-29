import { useState } from 'react'
import { FORCES } from '../content/forces'

const mono = "'IBM Plex Mono'"

/** A tiny schematic icon per force. currentColor so it inherits the accent.
 *  Exported so the SAME five symbols can recur inline through the cases, not just
 *  in the rail. */
export function ForceIcon({ id, size = 18 }: { id: string; size?: number }) {
  const common = { width: size, height: size, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.7, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const, 'aria-hidden': true }
  switch (id) {
    case 'spatial': // evenly spaced points
      return (
        <svg {...common}><circle cx="6" cy="6" r="1.4" /><circle cx="12" cy="6" r="1.4" /><circle cx="18" cy="6" r="1.4" /><circle cx="6" cy="12" r="1.4" /><circle cx="12" cy="12" r="1.4" /><circle cx="18" cy="12" r="1.4" /><circle cx="9" cy="18" r="1.4" /><circle cx="15" cy="18" r="1.4" /></svg>
      )
    case 'adhesion': // a bolt linking outside to inside
      return (
        <svg {...common}><path d="M3 12h6" /><circle cx="12" cy="12" r="3" /><path d="M15 12h6 M12 9V3 M12 21v-6" /></svg>
      )
    case 'contractility': // a spring / actomyosin
      return (
        <svg {...common}><path d="M3 12h3 l2-5 2 10 2-10 2 10 2-5 h3" /></svg>
      )
    case 'ecm': // woven fibers
      return (
        <svg {...common}><path d="M4 8q8 5 16 0 M4 14q8 5 16 0 M8 4q5 8 0 16 M16 4q5 8 0 16" /></svg>
      )
    case 'mechano': // nucleus with an arrow in
      return (
        <svg {...common}><circle cx="14" cy="13" r="6" /><path d="M3 7l6 3 M9 10l-1-3 M9 10l-3 1" /><circle cx="14" cy="13" r="1.6" fill="currentColor" stroke="none" /></svg>
      )
    default:
      return null
  }
}

/**
 * The persistent "forces in play" rail: the same five forces carried, unchanged,
 * across all three acts (the connective spine). Each symbol is its OWN button:
 * tap spatial and you see spatial, tap adhesion and you see adhesion, like the big
 * menu, instead of one toggle that flips the whole legend on and off. A "see all 5"
 * affordance still opens the full legend at once.
 */
export default function ForcesRail() {
  // view holds a single force id, the string 'all', or null (nothing shown).
  const [view, setView] = useState<string | null>(null)
  const current = view && view !== 'all' ? FORCES.find((f) => f.id === view) : null
  return (
    <div style={{ position: 'relative', zIndex: 2, borderBottom: '1px solid var(--line)', background: 'color-mix(in srgb, var(--bg2) 50%, transparent)' }}>
      <div style={{ maxWidth: 1180, margin: '0 auto', padding: '6px 22px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, minHeight: 30, flexWrap: 'wrap' }}>
          <span style={{ fontFamily: mono, fontSize: 9.5, letterSpacing: '.14em', color: 'var(--muted)', flex: 'none' }}>THREADS IN PLAY</span>
          <span style={{ display: 'flex', gap: 5, alignItems: 'center' }}>
            {FORCES.map((f) => {
              const active = view === f.id
              return (
                <button
                  key={f.id}
                  onClick={() => setView((v) => (v === f.id ? null : f.id))}
                  aria-pressed={active}
                  aria-label={f.name}
                  title={f.name}
                  style={{
                    display: 'grid',
                    placeItems: 'center',
                    width: 30,
                    height: 30,
                    borderRadius: 7,
                    border: `1px solid ${active ? 'var(--accent)' : 'transparent'}`,
                    background: active ? 'color-mix(in srgb, var(--accent) 15%, transparent)' : 'transparent',
                    color: active ? 'var(--accent)' : 'var(--muted)',
                    cursor: 'pointer',
                    padding: 0,
                  }}
                >
                  <ForceIcon id={f.id} />
                </button>
              )
            })}
          </span>
          <button
            onClick={() => setView((v) => (v === 'all' ? null : 'all'))}
            style={{ fontFamily: mono, fontSize: 9.5, color: view === 'all' ? 'var(--accent)' : 'var(--muted)', background: 'none', border: 'none', cursor: 'pointer', marginLeft: 'auto', flex: 'none', padding: 0 }}
          >
            {view === 'all' ? 'hide all' : 'tap a symbol, or see all 5'}
          </button>
        </div>

        {current && (
          <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start', padding: '8px 0 12px' }}>
            <span style={{ flex: 'none', color: 'var(--accent)', marginTop: 1 }}><ForceIcon id={current.id} size={22} /></span>
            <span style={{ minWidth: 0 }}>
              <span style={{ display: 'block', fontFamily: "'Space Grotesk'", fontWeight: 600, fontSize: 14, color: 'var(--text)' }}>{current.name}</span>
              <span style={{ fontSize: 12.5, color: 'var(--muted)', lineHeight: 1.45 }}>{current.gloss}</span>
            </span>
          </div>
        )}

        {view === 'all' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 10, padding: '10px 0 12px' }}>
            {FORCES.map((f) => (
              <div key={f.id} style={{ display: 'flex', gap: 9, alignItems: 'flex-start' }}>
                <span style={{ flex: 'none', color: 'var(--accent)', marginTop: 1 }}><ForceIcon id={f.id} size={20} /></span>
                <span style={{ minWidth: 0 }}>
                  <span style={{ display: 'block', fontFamily: "'Space Grotesk'", fontWeight: 600, fontSize: 12.5, color: 'var(--text)' }}>{f.name}</span>
                  <span style={{ fontSize: 11.5, color: 'var(--muted)', lineHeight: 1.4 }}>{f.gloss}</span>
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
