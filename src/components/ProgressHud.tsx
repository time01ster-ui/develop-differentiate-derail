import { BADGES, RANKS, rankOf, xpOf, type Badge, type GameState } from '../lib/progress'

const mono = "'IBM Plex Mono'"

/** Compact rank + research-points + badge-count chip for the header controls. */
export function ProgressHud({ game, onOpen }: { game: GameState; onOpen: () => void }) {
  const xp = xpOf(game.badges)
  const r = rankOf(xp)
  const span = r.nextMin !== null ? r.nextMin - r.prevMin : 1
  const pct = r.nextMin !== null ? Math.min(100, ((xp - r.prevMin) / span) * 100) : 100
  return (
    <button
      onClick={onOpen}
      title="Research record: rank and badges for doing science well. Not money, your tools come from the grant (see Budget)."
      style={{ display: 'flex', alignItems: 'center', gap: 9, minHeight: 30, padding: '4px 10px', borderRadius: 8, border: '1px solid color-mix(in srgb, var(--c-green) 40%, var(--line))', background: 'color-mix(in srgb, var(--c-green) 8%, transparent)', cursor: 'pointer', color: 'var(--text)' }}
    >
      <span style={{ display: 'grid', lineHeight: 1.05, textAlign: 'left' }}>
        <span style={{ fontFamily: "'Space Grotesk'", fontWeight: 700, fontSize: 11 }}>{r.name}</span>
        <span style={{ fontFamily: mono, fontSize: 9, color: 'var(--muted)', letterSpacing: '.06em' }}>{xp} RP {r.nextName ? `· ${r.nextMin! - xp} to ${r.nextName}` : '· max rank'}</span>
      </span>
      <span style={{ width: 46, height: 5, borderRadius: 5, background: 'var(--bg2)', overflow: 'hidden', flex: 'none' }}>
        <span style={{ display: 'block', height: '100%', width: `${pct}%`, background: 'var(--c-green)', transition: 'width .4s' }} />
      </span>
      <span style={{ fontFamily: mono, fontSize: 10, color: 'var(--c-amber)', flex: 'none' }}>🏅 {game.badges.length}/{BADGES.length}</span>
    </button>
  )
}

/** A small transient toast when a badge is earned (rigor acknowledged, quietly). */
export function XpToast({ badge }: { badge: Badge | null }) {
  if (!badge) return null
  return (
    <div
      role="status"
      style={{ position: 'fixed', right: 18, bottom: 86, zIndex: 40, display: 'flex', alignItems: 'center', gap: 11, border: '1px solid var(--c-green)', borderRadius: 12, background: 'color-mix(in srgb, var(--c-green) 16%, var(--panel))', padding: '11px 15px', boxShadow: '0 6px 28px color-mix(in srgb, #000 45%, transparent)', maxWidth: 320 }}
      className="stage-enter"
    >
      <span style={{ fontSize: 20, flex: 'none' }}>🏅</span>
      <span style={{ minWidth: 0 }}>
        <span style={{ display: 'block', fontFamily: "'Space Grotesk'", fontWeight: 700, fontSize: 13.5 }}>{badge.label} <span style={{ color: 'var(--c-green)', fontFamily: mono, fontSize: 12 }}>+{badge.points} RP</span></span>
        <span style={{ fontSize: 11.5, color: 'var(--muted)', lineHeight: 1.4 }}>{badge.hint}</span>
      </span>
    </div>
  )
}

/** The achievements overlay: every rigor badge, earned or still to earn. */
export function AchievementsPanel({ game, onClose }: { game: GameState; onClose: () => void }) {
  const xp = xpOf(game.badges)
  const r = rankOf(xp)
  const earned = new Set(game.badges)
  return (
    <div onClick={onClose} style={{ position: 'fixed', inset: 0, zIndex: 35, background: 'color-mix(in srgb, #000 62%, transparent)', backdropFilter: 'blur(4px)', display: 'grid', placeItems: 'center', padding: 16 }}>
      <div onClick={(e) => e.stopPropagation()} style={{ width: 'min(620px, 100%)', maxHeight: '86vh', overflow: 'auto', border: '1px solid var(--line)', borderRadius: 16, background: 'var(--panel)' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, padding: '16px 20px', borderBottom: '1px solid var(--line)', background: 'color-mix(in srgb, var(--c-green) 6%, var(--bg2))' }}>
          <div>
            <div style={{ fontFamily: mono, fontSize: 10.5, letterSpacing: '.14em', color: 'var(--c-green)' }}>🏅 YOUR RESEARCH RECORD</div>
            <div style={{ fontFamily: "'Space Grotesk'", fontWeight: 700, fontSize: 18, marginTop: 3 }}>
              {r.name} <span style={{ fontFamily: mono, fontSize: 12, color: 'var(--muted)' }}>· {xp} research points · {game.badges.length}/{BADGES.length} earned</span>
            </div>
          </div>
          <button onClick={onClose} aria-label="Close" style={{ minHeight: 36, minWidth: 36, borderRadius: 8, border: '1px solid var(--line)', background: 'transparent', color: 'var(--text)', cursor: 'pointer', fontSize: 16 }}>✕</button>
        </div>
        <div style={{ padding: '14px 18px' }}>
          <p style={{ fontSize: 12.5, color: 'var(--muted)', lineHeight: 1.55, marginBottom: 13 }}>
            Research Points are recognition for doing science well: a testable question, a fair design, an honest claim. They raise your rank and earn badges. They are <b style={{ color: 'var(--text)' }}>not money</b> and never unlock tools; your tools are paid from your grant (see <b style={{ color: 'var(--text)' }}>💰 Budget</b>). There is no penalty for trying, and nothing here gates the science.
          </p>

          <div style={{ border: '1px solid var(--line)', borderRadius: 11, background: 'var(--panel2)', padding: '11px 13px', marginBottom: 16 }}>
            <div style={{ fontFamily: mono, fontSize: 10, letterSpacing: '.14em', color: 'var(--muted)', marginBottom: 8 }}>RANKS · BY TOTAL RESEARCH POINTS</div>
            <div style={{ display: 'grid', gap: 6 }}>
              {RANKS.map((rk) => {
                const reached = xp >= rk.min
                const current = rk.name === r.name
                return (
                  <div key={rk.name} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 10, fontSize: 13 }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: 8, minWidth: 0 }}>
                      <span style={{ flex: 'none', width: 8, height: 8, borderRadius: '50%', background: reached ? 'var(--c-green)' : 'var(--line)' }} />
                      <span style={{ color: reached ? 'var(--text)' : 'var(--muted)', fontWeight: current ? 700 : 400 }}>{rk.name}{current ? ' · you are here' : ''}</span>
                    </span>
                    <span style={{ flex: 'none', fontFamily: mono, fontSize: 11, color: reached ? 'var(--c-green)' : 'var(--muted)' }}>{rk.min} RP</span>
                  </div>
                )
              })}
            </div>
          </div>

          <div style={{ fontFamily: mono, fontSize: 10, letterSpacing: '.14em', color: 'var(--muted)', marginBottom: 9 }}>BADGES · HOW TO EARN EACH</div>
          <div style={{ display: 'grid', gap: 9 }}>
            {BADGES.map((b) => {
              const has = earned.has(b.id)
              return (
                <div key={b.id} style={{ display: 'flex', alignItems: 'center', gap: 12, border: `1px solid ${has ? 'color-mix(in srgb, var(--c-green) 45%, var(--line))' : 'var(--line)'}`, borderRadius: 11, background: has ? 'color-mix(in srgb, var(--c-green) 8%, var(--panel))' : 'var(--panel2)', padding: '11px 13px', opacity: has ? 1 : 0.7 }}>
                  <span style={{ fontSize: 18, flex: 'none', filter: has ? 'none' : 'grayscale(1)' }}>{has ? '🏅' : '🔒'}</span>
                  <span style={{ flex: 1, minWidth: 0 }}>
                    <span style={{ display: 'block', fontFamily: "'Space Grotesk'", fontWeight: 600, fontSize: 14, color: 'var(--text)' }}>{b.label}</span>
                    <span style={{ fontSize: 12, color: 'var(--muted)', lineHeight: 1.4 }}>{b.hint}</span>
                  </span>
                  <span style={{ flex: 'none', fontFamily: mono, fontSize: 11, color: has ? 'var(--c-green)' : 'var(--muted)' }}>+{b.points}</span>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
