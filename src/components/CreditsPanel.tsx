import { useEffect } from 'react'
import { Seal } from './Seal'

const mono = "'IBM Plex Mono'"

interface Source {
  name: string
  detail: string
  license: string
}

const SOURCES: Source[] = [
  { name: 'Mol* (molstar.org)', detail: 'Open-source molecular viewer, self-hosted (not iframed).', license: 'MIT' },
  { name: 'AlphaFold Protein Structure Database', detail: 'Predicted structures: FN1 P11276 · WNT5A P22725 · ITGB1 P09055 (mouse). Illustrative predicted coordinates, not experimental.', license: 'CC-BY 4.0' },
  { name: 'eMouseAtlas (EMAP), emouseatlas.org', detail: '3D mouse embryo by Theiler stage (planned cold open / staging).', license: 'CC-BY 3.0' },
  { name: 'Allen Cell Explorer, allencell.org', detail: 'Real-data 3D cells & Simularium trajectories (planned media).', license: 'Allen Institute terms (attribute)' },
  { name: 'd3-delaunay', detail: 'Voronoi / Delaunay / nearest-neighbor geometry, computed in-browser.', license: 'ISC' },
  { name: 'Cellpose', detail: 'Nuclei segmentation (this slice uses faithful procedural fields; real centroids in a later phase).', license: 'BSD-3' },
  { name: 'JoVE', detail: 'Peer-reviewed technique video (institutional, Phase 3).', license: 'Institutional' },
  { name: 'Type: Space Grotesk · IBM Plex Sans · IBM Plex Mono', detail: 'Self-hosted via @fontsource.', license: 'OFL 1.1' },
]

export default function CreditsPanel({ onClose }: { onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Credits and notices"
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 20,
        background: 'color-mix(in srgb, #000 62%, transparent)',
        backdropFilter: 'blur(4px)',
        display: 'grid',
        placeItems: 'center',
        padding: 18,
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: 'min(680px, 100%)',
          maxHeight: '86vh',
          overflowY: 'auto',
          background: 'var(--panel)',
          border: '1px solid var(--line)',
          borderRadius: 16,
          padding: 26,
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 12, marginBottom: 12 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <Seal kind="pathway" size={48} />
            <div>
              <div style={{ fontFamily: "'Space Grotesk'", fontWeight: 700, fontSize: 20 }}>Credits & Notices</div>
              <div style={{ fontFamily: mono, fontSize: 11, color: 'var(--muted)', marginTop: 4 }}>
                Develop · Differentiate · Derail · John Hay Biomedical Pathway
              </div>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Close"
            style={{ minHeight: 36, minWidth: 36, borderRadius: 8, border: '1px solid var(--line)', background: 'transparent', color: 'var(--text)', cursor: 'pointer', fontSize: 16 }}
          >
            ✕
          </button>
        </div>

        <div
          style={{
            border: '1px solid color-mix(in srgb, var(--c-green) 40%, transparent)',
            background: 'color-mix(in srgb, var(--c-green) 8%, var(--panel))',
            borderRadius: 12,
            padding: '12px 14px',
            marginBottom: 18,
          }}
        >
          <div style={{ fontFamily: mono, fontSize: 10.5, letterSpacing: '.1em', color: 'var(--c-green)', marginBottom: 6 }}>DATA BOUNDARY</div>
          <p style={{ fontSize: 13, lineHeight: 1.55, color: 'var(--text)' }}>
            This build ships <b>no unpublished Atit Lab images or data</b>. Nuclei fields are faithful
            procedural simulations; all molecular, embryo, and cell assets come from the open sources
            below. The science (FN1 gradient, nuclear spacing, “spacing ≠ tension”) is modeled, not
            copied from proprietary results.
          </p>
        </div>

        {SOURCES.map((s) => (
          <div key={s.name} style={{ padding: '11px 0', borderBottom: '1px solid var(--line)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, alignItems: 'baseline' }}>
              <span style={{ fontFamily: "'Space Grotesk'", fontWeight: 600, fontSize: 14 }}>{s.name}</span>
              <span style={{ fontFamily: mono, fontSize: 10.5, color: 'var(--muted)', whiteSpace: 'nowrap' }}>{s.license}</span>
            </div>
            <div style={{ fontSize: 12.5, color: 'var(--muted)', lineHeight: 1.5, marginTop: 4 }}>{s.detail}</div>
          </div>
        ))}

        <p style={{ fontSize: 12, color: 'var(--muted)', lineHeight: 1.55, marginTop: 16 }}>
          The development→cancer bridge across the three acts is methodological (the same image +
          geometry tools), not a claim that an embryo and a tumor are biologically identical.
        </p>
      </div>
    </div>
  )
}
