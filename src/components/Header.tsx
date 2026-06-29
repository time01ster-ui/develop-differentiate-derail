import type { ReactNode } from 'react'
import { THEME_ACCENT, THEME_ORDER } from '../content/act1'
import type { Theme } from '../content/types'
import { TIER_LABEL, TIER_HELP, type Tier } from '../lib/capability'
import { useTier } from './TierContext'
import { Seal } from './Seal'

const TIERS: Tier[] = ['A', 'B', 'C']

interface Props {
  theme: Theme
  onTheme: (t: Theme) => void
  onOpenCredits: () => void
  /** Opens the Baby Mateo intro video overlay (reachable from any state). */
  onOpenIntro?: () => void
  onOpenLibrary?: () => void
  /** Optional gamification HUD (rank + research points), shown once started. */
  hud?: ReactNode
  /** Optional grant-budget chip (remaining funds), shown once started. */
  budget?: ReactNode
  /** Which act is loaded, e.g. "Act II, Differentiate". */
  actLabel?: string
}

const mono = "'IBM Plex Mono'"

export default function Header({ theme, onTheme, onOpenCredits, onOpenIntro, onOpenLibrary, hud, budget, actLabel = 'Act I, Develop' }: Props) {
  const { tier, setTier, autoDetected, reducedMotion, setReducedMotion } = useTier()

  return (
    <header
      style={{
        position: 'relative',
        zIndex: 3,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 14,
        flexWrap: 'wrap',
        padding: '12px clamp(108px, 16vw, 136px) 12px 18px',
        borderBottom: '1px solid var(--line)',
        background: 'color-mix(in srgb, var(--bg2) 70%, transparent)',
        backdropFilter: 'blur(8px)',
      }}
    >
      {/* brand */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, minWidth: 0 }}>
        <Seal kind="pathway" size={30} />
        <div style={{ position: 'relative', width: 34, height: 34, flex: 'none' }} aria-hidden>
          <span style={{ position: 'absolute', left: 2, top: 4, width: 13, height: 13, borderRadius: '50%', background: 'var(--c-blue)', animation: 'drift 7s ease-in-out infinite' }} />
          <span style={{ position: 'absolute', left: 14, top: 1, width: 9, height: 9, borderRadius: '50%', background: 'var(--c-green)', animation: 'drift 9s ease-in-out infinite' }} />
          <span style={{ position: 'absolute', left: 11, top: 13, width: 18, height: 18, borderRadius: '50%', background: 'var(--accent)', boxShadow: '0 0 16px var(--accent)', animation: 'drift 8s ease-in-out infinite' }} />
          <span style={{ position: 'absolute', left: 3, top: 18, width: 7, height: 7, borderRadius: '50%', background: 'var(--c-pink)' }} />
        </div>
        <div style={{ minWidth: 0 }}>
          <div style={{ fontFamily: "'Space Grotesk'", fontWeight: 700, letterSpacing: '.14em', fontSize: 13 }}>
            DEVELOP · DIFFERENTIATE · DERAIL
          </div>
          <div style={{ fontFamily: mono, fontSize: 11, color: 'var(--muted)', letterSpacing: '.04em' }}>
            {actLabel} &nbsp;·&nbsp; the Baby Mateo case &nbsp;·&nbsp; in-browser discovery
          </div>
        </div>
      </div>

      {/* controls */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
        {hud}
        {budget}
        {/* Quality / device-tier switch (TOOLING.md §3.2, always visible, default down) */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
          <span style={{ fontFamily: mono, fontSize: 10, color: 'var(--muted)', letterSpacing: '.1em' }}>QUALITY</span>
          <div role="group" aria-label="Quality tier" style={{ display: 'flex', border: '1px solid var(--line)', borderRadius: 7, overflow: 'hidden' }}>
            {TIERS.map((t) => {
              const active = tier === t
              return (
                <button
                  key={t}
                  onClick={() => setTier(t)}
                  aria-pressed={active}
                  title={t === autoDetected ? `${TIER_HELP[t]} (auto-detected for your device)` : TIER_HELP[t]}
                  style={{
                    minHeight: 30,
                    padding: '5px 9px',
                    border: 'none',
                    cursor: 'pointer',
                    fontFamily: mono,
                    fontSize: 10,
                    letterSpacing: '.06em',
                    color: active ? '#04060c' : 'var(--muted)',
                    background: active ? 'var(--c-green)' : 'transparent',
                  }}
                >
                  {TIER_LABEL[t]}
                  {t === autoDetected ? ' •' : ''}
                </button>
              )
            })}
          </div>
        </div>

        {/* motion toggle (a11y) */}
        <button
          onClick={() => setReducedMotion(!reducedMotion)}
          aria-pressed={reducedMotion}
          title="Reduce motion"
          style={{
            minHeight: 30,
            padding: '5px 10px',
            borderRadius: 7,
            border: '1px solid var(--line)',
            background: reducedMotion ? 'color-mix(in srgb, var(--accent) 14%, transparent)' : 'transparent',
            color: reducedMotion ? 'var(--text)' : 'var(--muted)',
            cursor: 'pointer',
            fontFamily: mono,
            fontSize: 10,
            letterSpacing: '.06em',
          }}
        >
          {reducedMotion ? '✓ CALM' : 'MOTION'}
        </button>

        {/* theme swatches (≥44px hit area via padding) */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          <span style={{ fontFamily: mono, fontSize: 10, color: 'var(--muted)', letterSpacing: '.1em', marginRight: 4 }}>LOOK</span>
          {THEME_ORDER.map((t) => {
            const active = theme === t
            return (
              <button
                key={t}
                onClick={() => onTheme(t)}
                aria-pressed={active}
                title={t}
                style={{
                  display: 'grid',
                  placeItems: 'center',
                  width: 30,
                  height: 30,
                  padding: 0,
                  border: 'none',
                  background: 'transparent',
                  cursor: 'pointer',
                }}
              >
                <span
                  style={{
                    width: 18,
                    height: 18,
                    borderRadius: '50%',
                    background: THEME_ACCENT[t],
                    border: `2px solid ${active ? 'var(--text)' : 'transparent'}`,
                  }}
                />
              </button>
            )
          })}
        </div>

        {onOpenLibrary && (
          <button
            onClick={onOpenLibrary}
            title="Open the study module"
            style={{
              minHeight: 30,
              padding: '5px 11px',
              borderRadius: 7,
              border: '1px solid color-mix(in srgb, var(--accent) 45%, var(--line))',
              background: 'color-mix(in srgb, var(--accent) 10%, transparent)',
              color: 'var(--text)',
              cursor: 'pointer',
              fontFamily: mono,
              fontSize: 10,
              letterSpacing: '.06em',
            }}
          >
            📚 LIBRARY
          </button>
        )}
        {onOpenIntro && (
          <button
            onClick={onOpenIntro}
            title="Watch the Baby Mateo intro video"
            style={{
              minHeight: 30,
              padding: '5px 11px',
              borderRadius: 7,
              border: '1px solid var(--line)',
              background: 'transparent',
              color: 'var(--muted)',
              cursor: 'pointer',
              fontFamily: mono,
              fontSize: 10,
              letterSpacing: '.06em',
            }}
          >
            ▶ INTRO
          </button>
        )}
        <button
          onClick={onOpenCredits}
          style={{
            minHeight: 30,
            padding: '5px 11px',
            borderRadius: 7,
            border: '1px solid var(--line)',
            background: 'transparent',
            color: 'var(--muted)',
            cursor: 'pointer',
            fontFamily: mono,
            fontSize: 10,
            letterSpacing: '.06em',
          }}
        >
          CREDITS
        </button>
      </div>
    </header>
  )
}
