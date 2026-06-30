import Define from './Define'

// A big-idea STOP shown at the measurement step: what are you measuring, how do
// you know, in what units, and in what direction. The 2D-vs-3D honesty is
// grounded in Saraswathibhatla, Indana & Chaudhuri (2023, Nat Rev Mol Cell
// Biol): cells in the body live in a 3D matrix, so a flat micrograph is only a
// 2D projection (a shadow) of the real arrangement, and you may only honestly
// claim the 2D-projected distance. Original diagram (not copied from the paper).

const mono = "'IBM Plex Mono'"
const head = "'Space Grotesk'"

/** A 3D pair of nuclei and the shorter, flattened distance a flat photo records. */
function ProjectionDiagram() {
  return (
    <svg viewBox="0 0 320 170" width="100%" style={{ display: 'block', maxWidth: 360 }} role="img" aria-label="Two cells sit apart in 3D tissue; a flat photo records only their shorter projected distance on the surface">
      {/* the flat photo plane (a parallelogram seen in perspective) */}
      <polygon points="40,150 250,150 290,120 80,120" fill="color-mix(in srgb, var(--accent) 10%, transparent)" stroke="var(--line)" />
      <text x="60" y="165" fontFamily={mono} fontSize="9" fill="var(--muted)">the flat photo (2D)</text>
      {/* two nuclei sitting at different depths/heights in the 3D tissue */}
      <circle cx="120" cy="60" r="9" fill="var(--c-blue)" />
      <circle cx="225" cy="95" r="9" fill="var(--c-blue)" />
      {/* the true 3D distance between them */}
      <line x1="120" y1="60" x2="225" y2="95" stroke="var(--c-green)" strokeWidth="2.5" />
      <text x="150" y="62" fontFamily={mono} fontSize="9.5" fill="var(--c-green)">real 3D spacing</text>
      {/* drop each nucleus straight down to its spot on the flat photo */}
      <line x1="120" y1="60" x2="132" y2="133" stroke="var(--muted)" strokeWidth="1" strokeDasharray="3 3" />
      <line x1="225" y1="95" x2="233" y2="133" stroke="var(--muted)" strokeWidth="1" strokeDasharray="3 3" />
      <circle cx="132" cy="133" r="5" fill="var(--c-amber)" />
      <circle cx="233" cy="133" r="5" fill="var(--c-amber)" />
      {/* the shorter distance the flat photo actually records */}
      <line x1="132" y1="133" x2="233" y2="133" stroke="var(--c-amber)" strokeWidth="2.5" />
      <text x="138" y="128" fontFamily={mono} fontSize="9.5" fill="var(--c-amber)">what the photo shows (shorter)</text>
    </svg>
  )
}

function W({ label, color, children }: { label: string; color: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: 9 }}>
      <span style={{ fontFamily: mono, fontSize: 10, fontWeight: 700, letterSpacing: '.1em', color, marginRight: 8 }}>{label}</span>
      <span style={{ fontSize: 13.5, lineHeight: 1.55, color: 'var(--text)' }}>{children}</span>
    </div>
  )
}

export default function MeasureStop() {
  return (
    <section style={{ border: '1.5px solid color-mix(in srgb, var(--c-amber) 55%, var(--line))', borderRadius: 14, background: 'color-mix(in srgb, var(--c-amber) 7%, var(--panel))', padding: '16px 18px', marginBottom: 18 }}>
      <div style={{ fontFamily: mono, fontSize: 11, letterSpacing: '.14em', color: 'var(--c-amber)', marginBottom: 4 }}>✋ STOP · WHAT ARE YOU MEASURING, AND HOW DO YOU KNOW?</div>
      <p style={{ fontSize: 13.5, lineHeight: 1.55, color: 'var(--muted)', marginBottom: 12 }}>
        Before you trust a number, answer four things. Doing this every time is the real skill of measurement.
      </p>

      <W label="WHAT" color="var(--c-blue)">
        the <b>spacing between cell centers</b>: the distance from each <Define t="nucleus">nucleus</Define> to its nearest neighbor. Not how many cells, not how big they are. The distance between them.
      </W>
      <W label="HOW" color="var(--c-green)">
        stain the nuclei so each cell&rsquo;s center glows, photograph the slice under a microscope, let <Define t="cellpose">Cellpose</Define> outline every nucleus and record its center point, then a <Define t="voronoi diagram">Voronoi</Define> nearest-neighbor step turns those centers into a spacing number.
      </W>
      <W label="UNITS" color="var(--accent)">
        <Define t="microns">microns</Define> (µm), millionths of a meter. The crowded blocked tissue sits roughly 5 to 10 µm apart; the FN1-rich tissue is more spread out. A number with no unit means nothing.
      </W>
      <W label="DIRECTION" color="var(--c-pink)">
        the FN1 road runs low to high in one direction, from the brow up toward the top of the head, and the cells travel that way. The spacing number itself has <b>no direction</b>: it is a distance (a magnitude). Keep the two straight.
      </W>

      <div style={{ borderTop: '1px solid var(--line)', marginTop: 12, paddingTop: 12, display: 'grid', gridTemplateColumns: 'minmax(0,1fr) minmax(0,360px)', gap: 14, alignItems: 'center' }}>
        <div>
          <div style={{ fontFamily: head, fontWeight: 700, fontSize: 14.5, color: 'var(--text)', marginBottom: 5 }}>Why you measure in 2D, and must say so</div>
          <p style={{ fontSize: 13, lineHeight: 1.6, color: 'var(--text)', marginBottom: 8 }}>
            In a real embryo the cells sit inside a <b>3-dimensional</b> tissue. Cells in the body almost always live in a 3D matrix, not on a flat surface, and that 3D setting changes how they behave and arrange. But your microscope image is <b>flat</b>: it is a <b>2D projection</b>, a shadow of that 3D arrangement. Two cells far apart in depth can look close on the photo. So the honest number is the <b>2D-projected distance</b>. Claiming the true 3D spacing from a flat image reports something you never actually saw, which is why the fair label is 2D-projected.
          </p>
        </div>
        <div style={{ border: '1px solid var(--line)', borderRadius: 10, background: 'var(--bg2)', padding: 10 }}>
          <ProjectionDiagram />
        </div>
      </div>

      <p style={{ fontFamily: mono, fontSize: 10, color: 'var(--muted)', lineHeight: 1.5, marginTop: 12 }}>
        3D context after Saraswathibhatla A, Indana D, Chaudhuri O. Cell-extracellular matrix mechanotransduction in 3D. Nat Rev Mol Cell Biol. 2023;24(7):495-516. Diagram original.
      </p>
    </section>
  )
}
