/**
 * Accurate, theme-aware SVG science diagrams. These are honest SCHEMATICS (not
 * AI-generated or photoreal) per TOOLING.md's accuracy split: the experience can
 * use web art, but the literal biology must not be fabricated. Colors come from
 * the theme CSS variables, so they recolor across all three themes for free.
 * Drift animations use the shared `drift` keyframe, which base.css disables under
 * reduced motion.
 */

const mono = "'IBM Plex Mono'"

/**
 * The hero: a lateral schematic of an embryo head showing cranial neural crest
 * cells migrating from the brow up over the forming frontal bone, along a graded
 * FN1 "road" (low → high). This makes Stage 0/1's previously text-only, unreadable
 * backstory visible. `motion` lets a couple of cells drift gently.
 */
export function EmbryoFace({ height = 240 }: { height?: number }) {
  // cells along the road; more regularly spaced near the apex (the lesson)
  const cells = [
    [108, 196], [128, 188], [120, 172], [146, 176], [138, 160],
    [164, 162], [158, 146], [184, 150], [178, 134], [206, 138],
    [200, 122], [228, 126], [250, 116], [274, 110], [298, 106],
  ]
  return (
    <svg viewBox="0 0 440 280" width="100%" height={height} role="img"
      aria-label="Schematic of an embryo head: neural crest cells migrate from the brow up over the forming frontal bone, following a graded FN1 road that runs from low to high.">
      <title>Neural crest cells follow the FN1 road to build the frontal bone</title>
      <defs>
        <linearGradient id="fn1road" x1="0" y1="1" x2="1" y2="0">
          <stop offset="0" stopColor="var(--muted)" stopOpacity="0.35" />
          <stop offset="0.5" stopColor="var(--c-green)" stopOpacity="0.6" />
          <stop offset="1" stopColor="var(--accent)" stopOpacity="0.95" />
        </linearGradient>
        <radialGradient id="cellglow">
          <stop offset="0" stopColor="var(--c-blue)" />
          <stop offset="1" stopColor="var(--c-blue)" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* head profile (facing left), schematic */}
      <path
        d="M70 150 C70 95 120 58 190 58 C275 58 330 100 330 165 C330 205 300 232 250 240 C232 243 214 240 206 232 C196 250 168 256 150 246 C150 232 152 224 150 218 C112 214 84 192 76 168 C73 162 70 158 70 150 Z"
        fill="var(--panel2)" stroke="var(--line)" strokeWidth="1.5" />
      {/* frontal-bone region highlight (the forehead) */}
      <path d="M120 86 C170 64 250 70 300 112 C262 92 196 88 150 110 C138 100 128 92 120 86 Z"
        fill="color-mix(in srgb, var(--accent) 14%, transparent)" stroke="none" />

      {/* the FN1 road: brow (low) sweeping up to apex (high) */}
      <path d="M104 206 C132 176 150 150 200 134 C250 118 285 108 312 100"
        fill="none" stroke="url(#fn1road)" strokeWidth="13" strokeLinecap="round" opacity="0.9" />

      {/* tracer pulses that travel the road brow -> apex, showing flow direction.
          Hidden when motion is off (base opacity 0). */}
      {[0, 1, 2].map((t) => (
        <circle key={`tr${t}`} r="3" fill="var(--accent)"
          style={{ offsetPath: "path('M104 206 C132 176 150 150 200 134 C250 118 285 108 312 100')", animation: `trace 5s linear ${-t * 1.6}s infinite`, opacity: 0 }} />
      ))}

      {/* migrating neural crest cells: the whole population crawls gently up the
          road toward the apex (staggered), reading as directed migration. */}
      {cells.map(([x, y], i) => (
        <g key={i} style={{ animation: `crawl ${6 + (i % 4)}s ease-in-out ${-i * 0.5}s infinite` }}>
          <circle cx={x} cy={y} r="9" fill="url(#cellglow)" opacity="0.7" />
          <circle cx={x} cy={y} r="3.4" fill="var(--c-blue)" />
        </g>
      ))}

      {/* labels with leader lines */}
      <g fontFamily={mono} fontSize="10.5" fill="var(--muted)">
        <line x1="300" y1="92" x2="338" y2="74" stroke="var(--line)" />
        <text x="342" y="70">frontal bone</text>
        <text x="342" y="83">(forehead)</text>

        <line x1="150" y1="180" x2="120" y2="252" stroke="var(--line)" />
        <text x="60" y="266" fill="var(--c-blue)">neural crest cells</text>

        <text x="96" y="222" fill="var(--muted)">FN1 low</text>
        <text x="300" y="120" fill="var(--accent)">FN1 high</text>
      </g>
    </svg>
  )
}

/** Two panels: regular (ordered) spacing vs random/crowded. Teaches what
 *  "non-randomly spaced" means before any jargon. */
export function SpacingContrast({ height = 150 }: { height?: number }) {
  const ordered: [number, number][] = []
  for (let r = 0; r < 4; r++) for (let c = 0; c < 5; c++) ordered.push([24 + c * 28 + (r % 2) * 14, 30 + r * 28])
  // pseudo-random but deterministic
  const rnd: [number, number][] = []
  let s = 7
  for (let i = 0; i < 26; i++) {
    s = (s * 48271) % 2147483647
    const x = 20 + (s % 150)
    s = (s * 48271) % 2147483647
    const y = 22 + (s % 116)
    rnd.push([x, y])
  }
  const Panel = ({ pts, color, label, x }: { pts: [number, number][]; color: string; label: string; x: number }) => (
    <g transform={`translate(${x},0)`}>
      <rect x="4" y="8" width="184" height="150" rx="10" fill="#02030a" stroke="var(--line)" />
      {pts.map(([px, py], i) => (
        <g key={i}>
          <circle cx={px} cy={py + 6} r="6" fill={color} opacity="0.18" />
          <circle cx={px} cy={py + 6} r="2.6" fill={color} />
        </g>
      ))}
      <text x="14" y="150" fontFamily={mono} fontSize="11" fill={color}>{label}</text>
    </g>
  )
  return (
    <svg viewBox="0 0 400 170" width="100%" height={height} role="img"
      aria-label="Left: cells in an even, regular pattern. Right: cells scattered and clumped at random.">
      <title>Ordered spacing versus random spacing</title>
      <Panel pts={ordered} color="var(--c-blue)" label="regular · ordered" x={0} />
      <Panel pts={rnd} color="var(--c-amber)" label="random · crowded" x={206} />
    </svg>
  )
}

/** The thesis visual: a few embryos, each holding many cells. Pooling counts all
 *  the dots (huge n, looks strong); the honest count is one number per embryo. */
export function Pseudoreplication({ height = 180 }: { height?: number }) {
  const embryos = [70, 200, 330]
  const dotsFor = (cx: number, seed: number) => {
    const out: [number, number][] = []
    let s = seed
    for (let i = 0; i < 14; i++) {
      s = (s * 48271) % 2147483647
      const a = (s % 360) * (Math.PI / 180)
      s = (s * 48271) % 2147483647
      const rr = 8 + (s % 34)
      out.push([cx + Math.cos(a) * rr, 70 + Math.sin(a) * rr])
    }
    return out
  }
  return (
    <svg viewBox="0 0 400 180" width="100%" height={height} role="img"
      aria-label="Three embryos, each a circle holding many cell dots. Counting every dot gives a huge, dishonest sample size; counting one average per embryo gives the honest sample size of three.">
      <title>Cells versus embryos: the pseudoreplication trap</title>
      {embryos.map((cx, e) => (
        <g key={e}>
          <circle cx={cx} cy={70} r="46" fill="color-mix(in srgb, var(--c-green) 8%, var(--panel))" stroke="var(--c-green)" strokeOpacity="0.5" />
          {dotsFor(cx, 13 + e * 101).map(([x, y], i) => (
            <circle key={i} cx={x} cy={y} r="2.6" fill="var(--c-blue)" opacity="0.85" />
          ))}
          <text x={cx} y={132} textAnchor="middle" fontFamily={mono} fontSize="10.5" fill="var(--c-green)">embryo {e + 1}</text>
          <text x={cx} y={146} textAnchor="middle" fontFamily={mono} fontSize="9.5" fill="var(--muted)">= 1 honest data point</text>
        </g>
      ))}
      <text x="200" y="166" textAnchor="middle" fontFamily={mono} fontSize="10.5" fill="var(--c-amber)">
        all the dots = a fake "big sample" · one mean per circle = the real n
      </text>
    </svg>
  )
}

/** An animated stream of neural crest cells migrating together along a graded
 *  FN1 road (low to high). The crowd advances as a group (collective migration)
 *  and the leading cells carry crawling filopodia. Under reduced motion it
 *  freezes to a clear, labeled static stream. Theme-aware via CSS variables. */
export function CollectiveMigration({ height = 180 }: { height?: number }) {
  const cells = Array.from({ length: 9 }, (_, i) => ({
    x: 44 + i * 41,
    y: 80 + (i % 2 === 0 ? -7 : 7) + (i % 3) * 2,
    lead: i >= 7,
    dur: 6 + (i % 4),
    delay: -i * 0.7,
  }))
  return (
    <svg viewBox="0 0 440 168" width="100%" height={height} role="img"
      aria-label="A stream of neural crest cells migrating together from left to right along a fibronectin road that runs from low on the left to high on the right; the leading cells at the front carry crawling projections.">
      <title>Collective migration of neural crest cells along the FN1 road</title>
      <defs>
        <linearGradient id="cmRoad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="var(--muted)" stopOpacity="0.3" />
          <stop offset="0.55" stopColor="var(--c-green)" stopOpacity="0.55" />
          <stop offset="1" stopColor="var(--accent)" stopOpacity="0.9" />
        </linearGradient>
        <radialGradient id="cmGlow">
          <stop offset="0" stopColor="var(--c-blue)" />
          <stop offset="1" stopColor="var(--c-blue)" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* the graded FN1 road */}
      <rect x="20" y="70" width="400" height="22" rx="11" fill="url(#cmRoad)" opacity="0.7" />

      {/* direction of travel */}
      <g stroke="var(--accent)" strokeWidth="2" fill="none" opacity="0.75">
        <line x1="30" y1="122" x2="402" y2="122" />
        <path d="M394 116 L406 122 L394 128" />
      </g>

      {/* tracer pulses moving along the road, hidden when motion is off */}
      {[0, 1, 2].map((t) => (
        <circle key={`cmtr${t}`} cy="81" r="3" fill="var(--accent)"
          style={{ offsetPath: "path('M28 81 L412 81')", animation: `trace 4s linear ${-t * 1.3}s infinite`, opacity: 0 }} />
      ))}

      {/* the migrating crowd */}
      {cells.map((c, i) => (
        <g key={i} transform={`translate(${c.x},${c.y})`}>
          <g style={{ animation: `convey ${c.dur}s linear ${c.delay}s infinite`, ['--run' as any]: '44px' }}>
            <circle r="11" fill="url(#cmGlow)" opacity="0.7" />
            <circle r="4" fill="var(--c-blue)" />
            {c.lead && (
              <g stroke="var(--accent)" strokeWidth="1.4" strokeLinecap="round"
                style={{ animation: `filo 2.2s ease-in-out infinite` }}>
                <line x1="4" y1="-3" x2="13" y2="-7" />
                <line x1="5" y1="0" x2="15" y2="0" />
                <line x1="4" y1="3" x2="13" y2="7" />
              </g>
            )}
          </g>
        </g>
      ))}

      {/* labels */}
      <g fontFamily={mono} fontSize="10.5">
        <text x="22" y="42" fill="var(--muted)">FN1 low</text>
        <text x="356" y="42" fill="var(--accent)">FN1 high</text>
        <text x="138" y="150" fill="var(--c-blue)">neural crest cells migrating →</text>
      </g>
    </svg>
  )
}
