// The Act III signature schematic: a tumor stiffens its own matrix (LOX
// crosslinks tighten collagen toward the top), building a stiffness gradient.
// Cells perform durotaxis, climbing that self-made gradient, and breach the
// basement membrane into the stroma (local invasion). Reduced-motion safe: the
// climb cue is a static arrow set; only a faint pulse on the breaching cell
// animates, and that is gated off when reduced motion is requested.

const mono = "'IBM Plex Mono'"

export function DurotaxisField({ reducedMotion }: { reducedMotion: boolean }) {
  // collagen fibers: denser + more crosslinked toward the top (stiffer)
  const fibers = Array.from({ length: 11 }, (_, i) => i)
  // climbing tumor cells along the gradient
  const climbers = [
    { x: 70, y: 168 },
    { x: 120, y: 150 },
    { x: 150, y: 128 },
    { x: 196, y: 150 },
    { x: 232, y: 170 },
  ]
  return (
    <svg viewBox="0 0 300 210" width="100%" role="img" aria-label="A tumor-stiffened matrix gradient: cells climb the stiffness gradient by durotaxis and breach the basement membrane into the stroma." style={{ display: 'block', background: 'var(--bg2)', borderRadius: 12 }}>
      <defs>
        <linearGradient id="stiffgrad" x1="0" y1="1" x2="0" y2="0">
          <stop offset="0%" stopColor="color-mix(in srgb, var(--c-blue) 18%, transparent)" />
          <stop offset="100%" stopColor="color-mix(in srgb, var(--c-pink) 26%, transparent)" />
        </linearGradient>
      </defs>
      {/* the self-made stiffness gradient (soft at bottom, LOX-stiffened at top) */}
      <rect x="0" y="0" width="300" height="210" fill="url(#stiffgrad)" />

      {/* collagen fibers, tighter + crosslinked toward the top */}
      {fibers.map((i) => {
        const y = 18 + i * 17
        const t = 1 - i / (fibers.length - 1) // 1 at top
        return (
          <g key={i}>
            <line x1="6" y1={y} x2="294" y2={y + (t - 0.5) * 6} stroke="color-mix(in srgb, var(--c-pink) 45%, transparent)" strokeWidth={0.6 + t * 1.6} opacity={0.25 + t * 0.5} />
            {/* LOX crosslink nodes near the stiffer top */}
            {t > 0.45 && <circle cx={60 + (i * 53) % 200} cy={y} r={1.6} fill="var(--c-pink)" opacity={0.7} />}
          </g>
        )
      })}

      {/* gradient label */}
      <text x="8" y="16" fontFamily={mono} fontSize="8.5" fill="var(--c-pink)">STIFFER (LOX-crosslinked)</text>
      <text x="8" y="202" fontFamily={mono} fontSize="8.5" fill="var(--c-blue)">SOFTER (normal stroma)</text>

      {/* basement membrane: the wall, breached at one point */}
      <path d="M0 108 H132 M150 108 H300" stroke="var(--c-green)" strokeWidth="3" strokeDasharray="2 4" opacity="0.85" />
      <text x="206" y="103" fontFamily={mono} fontSize="8" fill="var(--c-green)">basement membrane</text>
      {/* the breach gap is between x=132 and x=150 */}
      <text x="120" y="100" fontFamily={mono} fontSize="8" fill="var(--c-amber)">breach</text>

      {/* organized normal cells, below the membrane */}
      {[40, 70, 100, 200, 230, 260].map((x, i) => (
        <circle key={i} cx={x} cy={140 + (i % 2) * 10} r="6.5" fill="color-mix(in srgb, var(--c-blue) 22%, var(--panel))" stroke="color-mix(in srgb, var(--c-blue) 55%, transparent)" strokeWidth="1" />
      ))}

      {/* climbing tumor cells (durotaxis), disordered, with upward cue arrows */}
      {climbers.map((c, i) => (
        <g key={i}>
          <circle cx={c.x} cy={c.y} r="6.5" fill="color-mix(in srgb, var(--c-pink) 26%, var(--panel))" stroke="var(--c-pink)" strokeWidth="1.3" />
          <line x1={c.x} y1={c.y - 9} x2={c.x} y2={c.y - 17} stroke="var(--c-pink)" strokeWidth="1.4" opacity="0.7" />
          <path d={`M${c.x - 3} ${c.y - 14} L${c.x} ${c.y - 18} L${c.x + 3} ${c.y - 14}`} fill="none" stroke="var(--c-pink)" strokeWidth="1.4" opacity="0.7" />
        </g>
      ))}

      {/* the cell crossing the breach */}
      <circle cx="141" cy="100" r="7" fill="color-mix(in srgb, var(--c-amber) 30%, var(--panel))" stroke="var(--c-amber)" strokeWidth="1.6" style={reducedMotion ? undefined : { animation: 'pulseDot 1.8s ease-in-out infinite' }} />
    </svg>
  )
}
