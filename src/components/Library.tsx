import { useMemo, useState } from 'react'
import type { LibraryChapter } from '../content/library'
import { EXTENSION_GROUPS } from '../content/library'
import { CHAPTER_ILLUSTRATIONS } from '../content/illustrations'
import { lookup } from '../content/glossary'
import Define from './Define'
import { Seal } from './Seal'
import { CollectiveMigration, EmbryoFace, Pseudoreplication, SpacingContrast } from './art/SciArt'

const mono = "'IBM Plex Mono'"

function Figure({ kind }: { kind: NonNullable<LibraryChapter['figure']> }) {
  if (kind === 'embryo') return <EmbryoFace height={200} />
  if (kind === 'spacing') return <SpacingContrast height={140} />
  if (kind === 'migration') return <CollectiveMigration height={180} />
  return <Pseudoreplication height={170} />
}

/**
 * "The Library" study module. `mode='study'` is the gated first visit (with a
 * Begin button that starts the investigation); `mode='reference'` is the overlay
 * a student can open any time during the game to look something up.
 */
export default function Library({
  chapters,
  mode,
  onBegin,
  onClose,
  initialChapter,
}: {
  chapters: LibraryChapter[]
  mode: 'study' | 'reference'
  onBegin?: () => void
  onClose?: () => void
  initialChapter?: string
}) {
  const startIdx = useMemo(() => {
    const i = chapters.findIndex((c) => c.id === initialChapter)
    return i >= 0 ? i : 0
  }, [chapters, initialChapter])
  const [idx, setIdx] = useState(startIdx)
  const [viewed, setViewed] = useState<Set<number>>(new Set([startIdx]))
  const [ext, setExt] = useState(false)
  const ch = chapters[idx]

  const go = (n: number) => {
    const next = Math.max(0, Math.min(chapters.length - 1, n))
    setExt(false)
    setIdx(next)
    setViewed((v) => new Set(v).add(next))
    document.getElementById('lib-content')?.scrollTo({ top: 0 })
  }

  const overlay = mode === 'reference'

  return (
    <div
      style={
        overlay
          ? { position: 'fixed', inset: 0, zIndex: 25, background: 'color-mix(in srgb, #000 62%, transparent)', backdropFilter: 'blur(4px)', display: 'grid', placeItems: 'center', padding: 16 }
          : { position: 'relative', zIndex: 2, flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column' }
      }
      onClick={overlay ? onClose : undefined}
    >
      <div
        onClick={overlay ? (e) => e.stopPropagation() : undefined}
        style={{
          display: 'flex',
          flexDirection: 'column',
          background: 'var(--panel)',
          border: '1px solid var(--line)',
          borderRadius: overlay ? 16 : 0,
          width: overlay ? 'min(1080px, 100%)' : '100%',
          height: overlay ? '88vh' : '100%',
          overflow: 'hidden',
        }}
      >
        {/* header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, padding: '14px 20px', borderBottom: '1px solid var(--line)', background: 'color-mix(in srgb, var(--accent) 6%, var(--bg2))' }}>
          <div>
            <div style={{ fontFamily: mono, fontSize: 11, letterSpacing: '.16em', color: 'var(--accent)' }}>📚 THE LIBRARY · STUDY MODULE</div>
            <div style={{ fontFamily: mono, fontSize: 10.5, color: 'var(--muted)', marginTop: 2 }}>
              The science you need to ask a smart question. Read it now, and come back any time.
            </div>
            {mode === 'study' && (
              <div style={{ fontFamily: mono, fontSize: 10.5, color: 'var(--muted)', marginTop: 3 }}>
                About {chapters.length} short chapters. Skim or skip is fine, and you can reopen the Library any time.
              </div>
            )}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, flex: 'none' }}>
            <Seal kind="pathway" size={32} />
            {overlay && (
              <button onClick={onClose} aria-label="Close the Library" style={{ minHeight: 36, minWidth: 36, borderRadius: 8, border: '1px solid var(--line)', background: 'transparent', color: 'var(--text)', cursor: 'pointer', fontSize: 16 }}>✕</button>
            )}
          </div>
        </div>

        <div style={{ display: 'flex', flex: 1, minHeight: 0 }}>
          {/* TOC */}
          <nav style={{ width: 240, flex: 'none', borderRight: '1px solid var(--line)', overflowY: 'auto', padding: 10, background: 'var(--bg2)' }}>
            {chapters.map((c, i) => {
              const active = i === idx
              return (
                <button
                  key={c.id}
                  onClick={() => go(i)}
                  style={{ display: 'block', width: '100%', textAlign: 'left', padding: '9px 11px', marginBottom: 4, borderRadius: 9, border: 'none', cursor: 'pointer', background: active ? 'color-mix(in srgb, var(--accent) 14%, transparent)' : 'transparent', color: 'var(--text)' }}
                >
                  <span style={{ fontFamily: mono, fontSize: 10, color: active ? 'var(--accent)' : 'var(--muted)' }}>
                    {('0' + (i + 1)).slice(-2)} {viewed.has(i) ? '·  read' : ''}
                  </span>
                  <span style={{ display: 'block', fontFamily: "'Space Grotesk'", fontWeight: active ? 600 : 500, fontSize: 13, marginTop: 1 }}>{c.title}</span>
                </button>
              )
            })}
            <div style={{ height: 1, background: 'var(--line)', margin: '8px 6px' }} />
            <button
              onClick={() => setExt(true)}
              style={{ display: 'block', width: '100%', textAlign: 'left', padding: '9px 11px', marginBottom: 4, borderRadius: 9, border: 'none', cursor: 'pointer', background: ext ? 'color-mix(in srgb, var(--accent) 14%, transparent)' : 'transparent', color: 'var(--text)' }}
            >
              <span style={{ fontFamily: mono, fontSize: 10, color: ext ? 'var(--accent)' : 'var(--muted)' }}>EXTENSIONS</span>
              <span style={{ display: 'block', fontFamily: "'Space Grotesk'", fontWeight: ext ? 600 : 500, fontSize: 13, marginTop: 1 }}>Go deeper · NotebookLM</span>
            </button>
          </nav>

          {/* content */}
          <div id="lib-content" style={{ flex: 1, overflowY: 'auto', padding: '22px 26px' }}>
            <div style={{ maxWidth: 760 }}>
              {ext ? (
                <div>
                  <div style={{ fontFamily: mono, fontSize: 10.5, letterSpacing: '.1em', color: 'var(--accent)', marginBottom: 6 }}>EXTENSIONS · OPTIONAL DEEPER READING</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 11, marginBottom: 10 }}>
                    <Seal kind="pathway" size={30} />
                    <h1 style={{ fontFamily: "'Space Grotesk'", fontWeight: 700, fontSize: 26, lineHeight: 1.15 }}>Go deeper</h1>
                  </div>
                  <p style={{ fontSize: 15, lineHeight: 1.6, color: 'var(--muted)', marginBottom: 18 }}>
                    Optional NotebookLM notebooks that expand on the chapters above. Each opens in a new tab. These are extra study material, not required to begin the investigation.
                  </p>
                  {EXTENSION_GROUPS.map((g) => (
                    <div key={g.label} style={{ marginBottom: 18 }}>
                      <div style={{ fontFamily: mono, fontSize: 10.5, letterSpacing: '.12em', color: 'var(--accent)', margin: '4px 0 10px' }}>{g.label}</div>
                      <div style={{ display: 'grid', gap: 10 }}>
                        {g.items.map((x, i) => (
                          <a
                            key={i}
                            href={x.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{ display: 'flex', alignItems: 'center', gap: 12, textDecoration: 'none', border: '1px solid var(--line)', borderRadius: 12, background: 'var(--panel2)', padding: '13px 16px', color: 'var(--text)', minHeight: 44 }}
                          >
                            <span style={{ fontFamily: mono, fontSize: 12, color: 'var(--accent)', flex: 'none', width: 22 }}>{('0' + (i + 1)).slice(-2)}</span>
                            <span style={{ flex: 1 }}>
                              <span style={{ display: 'block', fontFamily: "'Space Grotesk'", fontWeight: 600, fontSize: 15 }}>{x.title}</span>
                              <span style={{ fontFamily: mono, fontSize: 11, color: 'var(--muted)' }}>notebooklm.google.com</span>
                            </span>
                            <span aria-hidden style={{ flex: 'none', color: 'var(--muted)', fontSize: 16 }}>↗</span>
                          </a>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
              <>
              <div style={{ fontFamily: mono, fontSize: 10.5, letterSpacing: '.1em', color: 'var(--muted)', marginBottom: 6 }}>
                CHAPTER {idx + 1} OF {chapters.length} · {ch.readMinutes} MIN READ
              </div>
              <h1 style={{ fontFamily: "'Space Grotesk'", fontWeight: 700, fontSize: 26, lineHeight: 1.15, marginBottom: 10 }}>{ch.title}</h1>
              <p style={{ fontSize: 15, lineHeight: 1.6, color: 'var(--muted)', marginBottom: 18 }}>{ch.summary}</p>

              {CHAPTER_ILLUSTRATIONS[ch.id] && (
                <figure style={{ margin: '0 0 20px', border: '1px solid var(--line)', borderRadius: 12, background: 'var(--panel2)', overflow: 'hidden' }}>
                  <img src={CHAPTER_ILLUSTRATIONS[ch.id].src} alt={CHAPTER_ILLUSTRATIONS[ch.id].alt} loading="lazy" decoding="async" style={{ display: 'block', width: '100%', height: 'auto' }} />
                  <figcaption style={{ fontFamily: mono, fontSize: 11, color: 'var(--muted)', lineHeight: 1.5, padding: '8px 12px', borderTop: '1px solid var(--line)' }}>{CHAPTER_ILLUSTRATIONS[ch.id].caption}</figcaption>
                </figure>
              )}

              {ch.figure && (
                <div style={{ border: '1px solid var(--line)', borderRadius: 12, background: 'var(--panel2)', padding: 12, marginBottom: 20 }}>
                  <Figure kind={ch.figure} />
                </div>
              )}

              {ch.sections.map((s, si) => (
                <section key={si} style={{ marginBottom: 22 }}>
                  <h2 style={{ fontFamily: "'Space Grotesk'", fontWeight: 600, fontSize: 17, marginBottom: 8 }}>{s.heading}</h2>
                  {s.paragraphs.map((p, pi) => (
                    <p key={pi} style={{ fontSize: 14.5, lineHeight: 1.65, color: 'var(--text)', marginBottom: 10 }}>{p}</p>
                  ))}
                  {s.terms.length > 0 && (
                    <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 6, marginTop: 4 }}>
                      {/* Only terms with a glossary entry get the tappable chip look; the
                          rest render as plain labels so a chip never promises a definition it lacks. */}
                      {s.terms.map((t) =>
                        lookup(t) ? (
                          <span key={t} style={{ fontFamily: mono, fontSize: 11, color: 'var(--muted)', border: '1px solid var(--line)', borderRadius: 5, padding: '2px 8px' }}>
                            <Define t={t}>{t}</Define>
                          </span>
                        ) : (
                          <span key={t} style={{ fontFamily: mono, fontSize: 11, color: 'color-mix(in srgb, var(--muted) 72%, transparent)', padding: '2px 4px' }}>{t}</span>
                        ),
                      )}
                    </div>
                  )}
                </section>
              ))}

              {/* known vs unknown */}
              {(ch.known.length > 0 || ch.unknown.length > 0) && (
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 20 }}>
                  <div style={{ border: '1px solid var(--c-green)', borderRadius: 12, background: 'color-mix(in srgb, var(--c-green) 7%, var(--panel))', padding: 14 }}>
                    <div style={{ fontFamily: mono, fontSize: 10, letterSpacing: '.1em', color: 'var(--c-green)', marginBottom: 8 }}>WHAT WE KNOW</div>
                    {ch.known.map((k, i) => <div key={i} style={{ fontSize: 13, lineHeight: 1.5, color: 'var(--text)', marginBottom: 6 }}>✓ {k}</div>)}
                  </div>
                  <div style={{ border: '1px solid var(--c-amber)', borderRadius: 12, background: 'color-mix(in srgb, var(--c-amber) 7%, var(--panel))', padding: 14 }}>
                    <div style={{ fontFamily: mono, fontSize: 10, letterSpacing: '.1em', color: 'var(--c-amber)', marginBottom: 8 }}>STILL UNKNOWN</div>
                    {ch.unknown.map((u, i) => <div key={i} style={{ fontSize: 13, lineHeight: 1.5, color: 'var(--text)', marginBottom: 6 }}>? {u}</div>)}
                  </div>
                </div>
              )}

              {ch.keyQuestions.length > 0 && (
                <div style={{ borderLeft: '3px solid var(--accent)', padding: '8px 0 8px 16px', marginBottom: 10 }}>
                  <div style={{ fontFamily: mono, fontSize: 10, letterSpacing: '.1em', color: 'var(--accent)', marginBottom: 6 }}>QUESTIONS THIS LETS YOU ASK</div>
                  {ch.keyQuestions.map((q, i) => <div key={i} style={{ fontSize: 14, lineHeight: 1.55, color: 'var(--text)', marginBottom: 5 }}>→ {q}</div>)}
                </div>
              )}
              </>
              )}
            </div>
          </div>
        </div>

        {/* footer nav */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, padding: '12px 20px', borderTop: '1px solid var(--line)', background: 'var(--bg2)' }}>
          <button onClick={() => (ext ? setExt(false) : go(idx - 1))} disabled={!ext && idx === 0} style={{ minHeight: 40, padding: '9px 16px', borderRadius: 9, border: '1px solid var(--line)', background: 'transparent', color: !ext && idx === 0 ? 'var(--muted)' : 'var(--text)', cursor: !ext && idx === 0 ? 'default' : 'pointer', fontSize: 13 }}>{ext ? '← Back to the chapters' : '← Previous'}</button>
          <div style={{ fontFamily: mono, fontSize: 11, color: 'var(--muted)' }}>{ext ? 'Extensions · optional deeper reading' : `${viewed.size} / ${chapters.length} chapters opened`}</div>
          {!ext && idx < chapters.length - 1 ? (
            <button onClick={() => go(idx + 1)} style={{ minHeight: 40, padding: '9px 16px', borderRadius: 9, border: '1px solid var(--accent)', background: 'color-mix(in srgb, var(--accent) 12%, transparent)', color: 'var(--text)', cursor: 'pointer', fontSize: 13 }}>Next →</button>
          ) : mode === 'study' ? (
            <button onClick={onBegin} style={{ minHeight: 44, padding: '11px 22px', borderRadius: 10, border: 'none', background: 'var(--accent)', color: '#04060c', cursor: 'pointer', fontFamily: "'Space Grotesk'", fontWeight: 700, fontSize: 14, boxShadow: '0 0 20px color-mix(in srgb, var(--accent) 45%, transparent)' }}>Begin the investigation →</button>
          ) : (
            <button onClick={onClose} style={{ minHeight: 40, padding: '9px 16px', borderRadius: 9, border: '1px solid var(--line)', background: 'transparent', color: 'var(--text)', cursor: 'pointer', fontSize: 13 }}>Close</button>
          )}
        </div>

        {/* in study mode, also let them begin from the top once they've seen a few */}
        {mode === 'study' && idx < chapters.length - 1 && (
          <button onClick={onBegin} style={{ position: 'absolute', top: 14, right: 20, minHeight: 32, padding: '6px 12px', borderRadius: 8, border: '1px solid var(--accent)', background: 'color-mix(in srgb, var(--accent) 10%, transparent)', color: 'var(--text)', cursor: 'pointer', fontFamily: mono, fontSize: 11 }}>Skip to the investigation →</button>
        )}
      </div>
    </div>
  )
}
