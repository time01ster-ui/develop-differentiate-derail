import { useEffect, useRef, useState } from 'react'
import { tierAllowsLiveMol } from '../lib/capability'
import { useTier } from './TierContext'

/**
 * Self-hosted Mol* molecular viewer (TOOLING.md §4/§5). The prebuilt viewer
 * bundle is copied to /public/molstar on install and lazy-injected here ONLY on
 * Standard/Full tiers, never iframed from molstar.org (school filters), never
 * bundled into the main chunk (it is ~5 MB). On Lite (or if injection fails) we
 * show a static, accurate fallback. Structures load from self-hosted AlphaFold
 * CIFs in /public/structures, no runtime external fetch.
 *
 * IMPORTANT: Mol* mutates the DOM of its mount node directly. That node must be
 * a React *leaf* (no React-managed children) or React's reconciler will crash
 * trying to update children Mol* moved. The status overlay is therefore a
 * SIBLING of the mount node, not a child. This component is also wrapped in an
 * ErrorBoundary by its parent as a second line of defense.
 *
 * Accessions are illustrative PREDICTED structures (AlphaFold), not experimental
 * coordinates, labeled as such per the report.
 */

interface StructInfo {
  acc: string
  gene: string
  name: string
  residues: number
  heavy?: boolean
}

const STRUCTURES: StructInfo[] = [
  { acc: 'P11276', gene: 'FN1', name: 'Fibronectin 1', residues: 2477, heavy: true },
  { acc: 'P22725', gene: 'WNT5A', name: 'Wnt-5a', residues: 380 },
  { acc: 'P09055', gene: 'ITGB1', name: 'Integrin β1', residues: 798 },
]

type MolstarViewer = {
  loadStructureFromUrl: (url: string, format: string, isBinary: boolean) => Promise<void>
  dispose?: () => void
}
type MolstarGlobal = {
  Viewer: { create: (el: HTMLElement, opts: Record<string, unknown>) => Promise<MolstarViewer> }
}
declare global {
  interface Window {
    molstar?: MolstarGlobal
  }
}

const BASE = import.meta.env.BASE_URL || '/'
let molstarLoad: Promise<MolstarGlobal> | null = null

function loadMolstar(): Promise<MolstarGlobal> {
  if (molstarLoad) return molstarLoad
  molstarLoad = new Promise<MolstarGlobal>((resolve, reject) => {
    if (window.molstar) return resolve(window.molstar)
    const css = document.createElement('link')
    css.rel = 'stylesheet'
    css.href = BASE + 'molstar/molstar.css'
    document.head.appendChild(css)
    const s = document.createElement('script')
    s.src = BASE + 'molstar/molstar.js'
    s.async = true
    s.onload = () => (window.molstar ? resolve(window.molstar) : reject(new Error('molstar missing')))
    s.onerror = () => reject(new Error('molstar blocked/unavailable'))
    document.head.appendChild(s)
  })
  return molstarLoad
}

const mono = "'IBM Plex Mono'"

export default function MolStarViewer() {
  const { tier } = useTier()
  const live = tierAllowsLiveMol(tier)
  const hostRef = useRef<HTMLDivElement | null>(null)
  const [sel, setSel] = useState<StructInfo>(STRUCTURES[0])
  const [status, setStatus] = useState<'idle' | 'loading' | 'ready' | 'error'>('idle')

  useEffect(() => {
    if (!live) return
    const host = hostRef.current
    if (!host) return
    let disposed = false
    let viewer: MolstarViewer | null = null
    setStatus('loading')
    loadMolstar()
      .then(async (molstar) => {
        if (disposed) return
        const v = await molstar.Viewer.create(host, {
          layoutIsExpanded: false,
          layoutShowControls: false,
          layoutShowSequence: false,
          layoutShowLog: false,
          layoutShowLeftPanel: false,
          viewportShowExpand: true,
          viewportShowSelectionMode: false,
          pdbProvider: 'rcsb',
        })
        if (disposed) {
          v.dispose?.()
          return
        }
        viewer = v
        await v.loadStructureFromUrl(`${BASE}structures/${sel.acc}.cif`, 'mmcif', false)
        if (!disposed) setStatus('ready')
      })
      .catch(() => {
        if (!disposed) setStatus('error')
      })
    return () => {
      disposed = true
      try {
        viewer?.dispose?.()
      } catch {
        /* ignore */
      }
      // Mol* leaves DOM behind; clear the leaf so the next structure mounts clean.
      if (host) host.innerHTML = ''
    }
  }, [live, sel])

  return (
    <aside style={{ border: '1px solid var(--line)', borderRadius: 14, background: 'var(--panel)', padding: 16 }}>
      <div style={{ fontFamily: mono, fontSize: 10, letterSpacing: '.14em', color: 'var(--muted)', marginBottom: 6 }}>
        MOLECULAR VIEWER, Mol* · AlphaFold (predicted)
      </div>
      <div style={{ fontSize: 11.5, color: 'var(--muted)', lineHeight: 1.45, marginBottom: 12 }}>
        Just for reference: this is the 3D shape of FN1, the "road" protein from the story. Spin it if you
        like; you don't have to do anything with it.
      </div>
      <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 12 }}>
        {STRUCTURES.map((s) => {
          const active = s.acc === sel.acc
          return (
            <button
              key={s.acc}
              onClick={() => {
                if (s.acc !== sel.acc) setSel(s)
              }}
              aria-pressed={active}
              style={{
                minHeight: 30,
                padding: '6px 10px',
                borderRadius: 7,
                border: `1.5px solid ${active ? 'var(--accent)' : 'var(--line)'}`,
                background: active ? 'color-mix(in srgb, var(--accent) 14%, transparent)' : 'transparent',
                color: 'var(--text)',
                cursor: 'pointer',
                fontFamily: mono,
                fontSize: 11,
              }}
              title={`${s.name}, ${s.acc} (mouse), ${s.residues} aa`}
            >
              {s.gene}
            </button>
          )
        })}
      </div>

      {live ? (
        <div key="mol-live" style={{ position: 'relative', width: '100%', height: 260, borderRadius: 10, overflow: 'hidden', border: '1px solid var(--line)', background: '#04060c' }}>
          {/* Mol* mount target, a React LEAF (no children ever). */}
          <div ref={hostRef} style={{ position: 'absolute', inset: 0 }} />
          {/* status overlay, a SIBLING of the mount node, React-managed */}
          {status !== 'ready' && (
            <div
              style={{
                position: 'absolute',
                inset: 0,
                display: 'grid',
                placeItems: 'center',
                fontFamily: mono,
                fontSize: 11,
                color: status === 'error' ? 'var(--c-amber)' : 'var(--muted)',
                textAlign: 'center',
                padding: 12,
                pointerEvents: 'none',
                background: status === 'error' ? 'var(--bg2)' : 'transparent',
              }}
            >
              {status === 'error'
                ? 'Mol* unavailable on this network, structure view skipped (the loop still runs).'
                : `Loading ${sel.gene}…${sel.heavy ? ' (large protein, give it a moment)' : ''}`}
            </div>
          )}
        </div>
      ) : (
        <div key="mol-fallback" style={{ height: 200, borderRadius: 10, border: '1px dashed var(--line)', background: 'var(--bg2)', display: 'grid', placeItems: 'center', textAlign: 'center', padding: 16 }}>
          <div>
            <div style={{ fontFamily: "'Space Grotesk'", fontWeight: 600, color: 'var(--text)' }}>
              {sel.gene} · {sel.name}
            </div>
            <div style={{ fontFamily: mono, fontSize: 11, color: 'var(--muted)', marginTop: 6 }}>
              {sel.acc} (mouse) · {sel.residues} aa · AlphaFold predicted
            </div>
            <div style={{ fontSize: 11.5, color: 'var(--muted)', marginTop: 10, lineHeight: 1.5 }}>
              Live 3D is a Standard/Full-tier feature. On Lite it is replaced by this card (a
              pre-rendered rotation ships in Phase 3). Switch the Quality control up to load Mol*.
            </div>
          </div>
        </div>
      )}
      <p style={{ fontSize: 11, color: 'var(--muted)', marginTop: 10, lineHeight: 1.5 }}>
        {sel.gene} {sel.acc} · illustrative predicted structure (AlphaFold), not experimental
        coordinates.
      </p>
    </aside>
  )
}
