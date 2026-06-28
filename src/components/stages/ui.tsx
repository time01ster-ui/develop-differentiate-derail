// Small shared bits so every stage reads consistently (kicker + H1).
const mono = "'IBM Plex Mono'"

export function Kicker({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        fontFamily: mono,
        fontSize: 11,
        letterSpacing: '.18em',
        color: 'var(--accent)',
        marginBottom: 14,
      }}
    >
      {children}
    </div>
  )
}

export function StageH1({ children, size = 28 }: { children: React.ReactNode; size?: number }) {
  return (
    <h1
      style={{
        fontFamily: "'Space Grotesk'",
        fontWeight: 700,
        fontSize: size,
        lineHeight: 1.15,
        marginBottom: 12,
      }}
    >
      {children}
    </h1>
  )
}
