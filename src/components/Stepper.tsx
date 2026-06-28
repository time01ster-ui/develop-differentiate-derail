import { STAGE_LABELS } from '../content/act1'

interface Props {
  step: number
  onJump: (i: number) => void
}

/** The 8-stage loop stepper. Completed (✓/green) and current cells are
 *  clickable; future cells are dim and inert. Horizontal scroll on narrow. */
export default function Stepper({ step, onJump }: Props) {
  return (
    <nav
      aria-label="Discovery loop progress"
      style={{
        position: 'relative',
        zIndex: 3,
        display: 'flex',
        alignItems: 'stretch',
        gap: 0,
        padding: '11px 18px',
        borderBottom: '1px solid var(--line)',
        background: 'color-mix(in srgb, var(--bg2) 45%, transparent)',
        overflowX: 'auto',
      }}
    >
      {STAGE_LABELS.map((label, i) => {
        const active = i === step
        const done = i < step
        const reachable = i <= step
        return (
          <button
            key={label}
            onClick={() => onJump(i)}
            disabled={!reachable}
            aria-current={active ? 'step' : undefined}
            style={{
              flex: 1,
              minWidth: 96,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              gap: 3,
              padding: '6px 12px 6px 0',
              background: 'none',
              border: 'none',
              borderLeft: `2px solid ${active ? 'var(--accent)' : done ? 'var(--c-green)' : 'var(--line)'}`,
              cursor: reachable ? 'pointer' : 'default',
              opacity: reachable ? 1 : 0.45,
              transition: 'opacity .2s',
            }}
          >
            <span
              style={{
                fontFamily: "'IBM Plex Mono'",
                fontSize: 9.5,
                letterSpacing: '.1em',
                color: active ? 'var(--accent)' : done ? 'var(--c-green)' : 'var(--muted)',
                paddingLeft: 11,
              }}
            >
              {('0' + (i + 1)).slice(-2)}
              {done ? '  ✓' : ''}
            </span>
            <span
              style={{
                fontFamily: "'Space Grotesk'",
                fontWeight: active ? 700 : 500,
                fontSize: 12.5,
                color: active || done ? 'var(--text)' : 'var(--muted)',
                paddingLeft: 11,
                whiteSpace: 'nowrap',
              }}
            >
              {label}
            </span>
          </button>
        )
      })}
    </nav>
  )
}
