interface Props {
  step: number
  canNext: boolean
  footerHint: string
  nextLabel: string
  onBack: () => void
  onNext: () => void
}

/** Persistent footer: Back · contextual hint · gated Next. */
export default function Footer({ step, canNext, footerHint, nextLabel, onBack, onNext }: Props) {
  const backDisabled = step === 0
  return (
    <footer
      style={{
        position: 'relative',
        zIndex: 3,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 14,
        padding: '11px 18px',
        borderTop: '1px solid var(--line)',
        background: 'color-mix(in srgb, var(--bg2) 70%, transparent)',
        backdropFilter: 'blur(8px)',
      }}
    >
      <button
        onClick={onBack}
        disabled={backDisabled}
        style={{
          minHeight: 44,
          padding: '10px 18px',
          borderRadius: 9,
          border: '1px solid var(--line)',
          background: 'transparent',
          color: backDisabled ? 'var(--muted)' : 'var(--text)',
          cursor: backDisabled ? 'default' : 'pointer',
          fontSize: 13.5,
          fontWeight: 500,
          fontFamily: "'IBM Plex Sans'",
        }}
      >
        ← Back
      </button>
      <div
        aria-live="polite"
        style={{
          fontFamily: "'IBM Plex Mono'",
          fontSize: 12.5,
          color: 'color-mix(in srgb, var(--text) 78%, var(--muted))',
          letterSpacing: '.01em',
          lineHeight: 1.45,
          textAlign: 'center',
          flex: 1,
        }}
      >
        {footerHint}
      </div>
      <button
        onClick={onNext}
        disabled={!canNext}
        aria-disabled={!canNext}
        style={{
          minHeight: 44,
          padding: '11px 24px',
          borderRadius: 9,
          border: 'none',
          background: canNext ? 'var(--accent)' : 'var(--bg2)',
          color: canNext ? '#04060c' : 'var(--muted)',
          cursor: canNext ? 'pointer' : 'not-allowed',
          fontSize: 14,
          fontWeight: 600,
          fontFamily: "'Space Grotesk'",
          boxShadow: canNext ? '0 0 20px color-mix(in srgb, var(--accent) 45%, transparent)' : 'none',
        }}
      >
        {nextLabel}
      </button>
    </footer>
  )
}
