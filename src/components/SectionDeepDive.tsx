import { useState } from 'react'
import { createPortal } from 'react-dom'
import { SECTION_GUIDES, RESOURCE_KIND_LABEL, type SectionGuide } from '../content/sectionGuides'
import StatsHelpButton from './StatsExplainer'

const mono = "'IBM Plex Mono'"
const head = "'Space Grotesk'"

// Paper-matched palette (the report is on a white surface).
const C = { bg: '#ffffff', ink: '#16261a', green: '#1f9d57', muted: '#5c6b60', rule: '#d6e0d6', panel: '#f1f6f1' }

/** The small "How to write this" link shown next to a section in the online report.
 *  Print-hidden. Opens a deep dive with a step-by-step how-to and vetted tutorials. */
export function DeepDiveLink({ sectionKey }: { sectionKey: string }) {
  const guide = SECTION_GUIDES[sectionKey]
  const [open, setOpen] = useState(false)
  if (!guide) return null
  return (
    <>
      <button
        className="ddd-report-noprint"
        onClick={() => setOpen(true)}
        style={{ marginLeft: 10, padding: '2px 9px', borderRadius: 20, border: `1px solid ${C.green}`, background: 'rgba(31,157,87,.08)', color: C.green, cursor: 'pointer', fontFamily: mono, fontSize: 9.5, letterSpacing: '.06em', verticalAlign: 'middle' }}
      >
        ⓘ How to write this →
      </button>
      {open && <DeepDiveModal guide={guide} onClose={() => setOpen(false)} />}
    </>
  )
}

function DeepDiveModal({ guide, onClose }: { guide: SectionGuide; onClose: () => void }) {
  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-label={guide.title}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose()
      }}
      style={{ position: 'fixed', inset: 0, zIndex: 11000, overflow: 'auto', background: 'rgba(3,6,12,.78)', backdropFilter: 'blur(4px)', padding: '28px 16px 56px', display: 'flex', justifyContent: 'center', alignItems: 'flex-start' }}
    >
      <div onClick={(e) => e.stopPropagation()} style={{ width: 'min(640px, 100%)', background: C.bg, color: C.ink, borderRadius: 14, boxShadow: '0 24px 70px rgba(0,0,0,.5)', padding: '22px 26px 26px', fontFamily: "'IBM Plex Sans', system-ui, sans-serif", lineHeight: 1.55 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 14, borderBottom: `2px solid ${C.green}`, paddingBottom: 12, marginBottom: 14 }}>
          <div>
            <div style={{ fontFamily: mono, fontSize: 10, letterSpacing: '.14em', color: C.green }}>DEEP DIVE · STEP BY STEP</div>
            <h2 style={{ fontFamily: head, fontWeight: 700, fontSize: 20, margin: '4px 0 0' }}>{guide.title}</h2>
          </div>
          <button onClick={onClose} aria-label="Close" style={{ flex: 'none', minHeight: 32, padding: '6px 12px', borderRadius: 8, border: `1px solid ${C.rule}`, background: C.panel, color: C.ink, cursor: 'pointer', fontFamily: mono, fontSize: 11 }}>✕ Close</button>
        </div>

        <ol style={{ margin: '0 0 6px', paddingLeft: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10 }}>
          {guide.steps.map((s, i) => (
            <li key={i} style={{ display: 'flex', gap: 11, alignItems: 'flex-start' }}>
              <span style={{ flex: 'none', width: 22, height: 22, borderRadius: '50%', background: 'rgba(31,157,87,.14)', color: C.green, display: 'grid', placeItems: 'center', fontFamily: mono, fontSize: 11, fontWeight: 700 }}>{i + 1}</span>
              <span style={{ fontSize: 14, color: C.ink }}>{s}</span>
            </li>
          ))}
        </ol>

        {guide.stats && (
          <div style={{ marginTop: 16, border: `1px solid ${C.rule}`, borderRadius: 10, background: C.panel, padding: '12px 14px' }}>
            <div style={{ fontFamily: mono, fontSize: 10, letterSpacing: '.12em', color: C.green, marginBottom: 8 }}>WALK THROUGH THE STATISTICS</div>
            <StatsHelpButton context="spacing" compact />
          </div>
        )}

        {guide.resources.length > 0 && (
          <div style={{ marginTop: 18 }}>
            <div style={{ fontFamily: mono, fontSize: 10, letterSpacing: '.12em', color: C.muted, marginBottom: 8 }}>LEARN MORE (OPENS IN A NEW TAB)</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {guide.resources.map((r) => (
                <a key={r.url} href={r.url} target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '9px 12px', borderRadius: 9, border: `1px solid ${C.rule}`, background: '#fafdfa', color: C.ink, textDecoration: 'none' }}>
                  <span style={{ flex: 'none', fontFamily: mono, fontSize: 8.5, letterSpacing: '.06em', color: C.green, border: `1px solid ${C.green}`, borderRadius: 5, padding: '2px 6px' }}>{RESOURCE_KIND_LABEL[r.kind]}</span>
                  <span style={{ fontSize: 13, fontWeight: 600 }}>{r.label}</span>
                  <span style={{ marginLeft: 'auto', color: C.muted, fontSize: 13 }}>↗</span>
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>,
    document.body,
  )
}
