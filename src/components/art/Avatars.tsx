/**
 * Small theme-aware SVG avatars and glyphs for the story + resource model.
 * Characters give the lab a cast; equipment icons make the ladder rungs concrete.
 */

import { asset } from '../../lib/asset'

type Role = 'pi' | 'operator' | 'interpreter'

const ROLE_COLOR: Record<Role, string> = {
  pi: 'var(--accent)',
  operator: 'var(--c-green)',
  interpreter: 'var(--c-amber)',
}

/** Photoreal placeholder portraits (fictional people, not the real members). */
const ROLE_FACE: Record<Role, string> = {
  pi: '/avatars/pi.webp',
  operator: '/avatars/operator.webp',
  interpreter: '/avatars/interpreter.webp',
}

/** Circular character avatar: a portrait photo with a role-colored ring. */
export function CharacterAvatar({ role, size = 44 }: { role: Role; size?: number }) {
  const color = ROLE_COLOR[role]
  return (
    <img
      src={asset(ROLE_FACE[role])}
      width={size}
      height={size}
      alt={`${role} avatar`}
      style={{
        flex: 'none',
        width: size,
        height: size,
        borderRadius: '50%',
        objectFit: 'cover',
        border: `1.6px solid ${color}`,
        background: 'var(--panel2)',
      }}
    />
  )
}

/** Per-rung equipment glyph. id matches the RUNGS ids in act1.ts. */
export function EquipmentIcon({ id, size = 26, color }: { id: string; size?: number; color?: string }) {
  const c = color ?? 'currentColor'
  const common = { width: size, height: size, viewBox: '0 0 24 24', fill: 'none', stroke: c, strokeWidth: 1.7, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const, role: 'img' as const, style: { flex: 'none' } }
  switch (id) {
    case 'spatial': // microscope / segmentation
      return (
        <svg {...common} aria-label="microscope">
          <circle cx="9" cy="6" r="2.5" /><path d="M9 8.5 L9 14 M6 20 h11 M7 17 l4-3 M14 11 a5 5 0 0 1-5 6" />
        </svg>
      )
    case 'ecm': // fibers / stain
      return (
        <svg {...common} aria-label="fibers">
          <path d="M4 7 q8 4 16 0 M4 12 q8 4 16 0 M4 17 q8 4 16 0" />
        </svg>
      )
    case 'migration': // film / live imaging over time
      return (
        <svg {...common} aria-label="live imaging">
          <rect x="3" y="6" width="18" height="12" rx="2" /><path d="M7 6v12 M17 6v12 M3 10h4 M17 10h4 M3 14h4 M17 14h4" />
        </svg>
      )
    case 'molforce': // FRET: two linked molecules with a spark
      return (
        <svg {...common} aria-label="FRET sensor">
          <circle cx="7" cy="12" r="3" /><circle cx="17" cy="12" r="3" /><path d="M10 12 h4 M12 8 l1 2-2 1 1 2" />
        </svg>
      )
    case 'tissue': // AFM cantilever pressing a surface
      return (
        <svg {...common} aria-label="AFM">
          <path d="M3 7 l12 4 M15 11 l2 3 v3 M4 19 h16 M16 17 l1 2" /><path d="M15 11 l1.5-1.5" />
        </svg>
      )
    default:
      return null
  }
}

/** A gentle infant-face motif so Baby Mateo is a visible presence, not just text. */
export function MateoMotif({ size = 40 }: { size?: number }) {
  return (
    <svg viewBox="0 0 48 48" width={size} height={size} role="img" aria-label="Baby Mateo" style={{ flex: 'none' }}>
      <circle cx="24" cy="25" r="16" fill="color-mix(in srgb, var(--c-pink) 16%, var(--panel2))" stroke="var(--c-pink)" strokeWidth="1.5" />
      {/* single curl */}
      <path d="M19 11 q5-4 10 0" fill="none" stroke="var(--c-pink)" strokeWidth="2" strokeLinecap="round" />
      {/* eyes */}
      <circle cx="19" cy="24" r="1.7" fill="var(--c-pink)" />
      <circle cx="29" cy="24" r="1.7" fill="var(--c-pink)" />
      {/* small upper-lip cleft hint (gentle, schematic) */}
      <path d="M24 30 l0 -3 M21 33 q3 2 6 0" fill="none" stroke="var(--c-pink)" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}
