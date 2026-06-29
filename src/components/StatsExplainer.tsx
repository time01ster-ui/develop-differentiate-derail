import { useState } from 'react'
import { createPortal } from 'react-dom'

// A reusable "what makes a result statistically significant?" helper. It appears
// everywhere the sim runs or reports a statistical test (the Analyze + Iterate
// stages of every act, and the lab-report overlay). It teaches the general ideas
// (distribution curves, standard deviation, the p-value, the 0.05 threshold, and
// how the test is computed) with a worked example, then says how that applies in
// THIS experiment. Grade-9 voice, honest about limits, no em dashes.

const mono = "'IBM Plex Mono'"
const head = "'Space Grotesk'"

/** Where the button sits, so "in this experiment" speaks to the right test. */
export type StatsContext = 'spacing' | 'bench'

// ---- bell-curve geometry (a real Gaussian, sampled to an SVG path) ----
function gauss(x: number, mu: number, sd: number): number {
  const z = (x - mu) / sd
  return Math.exp(-0.5 * z * z)
}
function curvePath(w: number, h: number, pad: number, mu: number, sd: number, xmin: number, xmax: number): string {
  const N = 64
  const px = (x: number) => pad + ((x - xmin) / (xmax - xmin)) * (w - 2 * pad)
  const py = (y: number) => h - pad - y * (h - 2 * pad)
  let d = ''
  for (let i = 0; i <= N; i++) {
    const x = xmin + ((xmax - xmin) * i) / N
    d += `${i ? 'L' : 'M'}${px(x).toFixed(1)} ${py(gauss(x, mu, sd)).toFixed(1)} `
  }
  return d.trim()
}

/** One bell with the mean line and a shaded plus/minus one standard deviation band. */
function OneBell() {
  const w = 300
  const h = 132
  const pad = 14
  const xmin = -3.6
  const xmax = 3.6
  const px = (x: number) => pad + ((x - xmin) / (xmax - xmin)) * (w - 2 * pad)
  const baseY = h - pad
  return (
    <svg viewBox={`0 0 ${w} ${h}`} width="100%" style={{ display: 'block' }} role="img" aria-label="A bell curve with the mean in the center and one standard deviation shaded">
      <rect x={px(-1)} y={pad} width={px(1) - px(-1)} height={baseY - pad} fill="color-mix(in srgb, var(--accent) 14%, transparent)" />
      <line x1={pad} y1={baseY} x2={w - pad} y2={baseY} stroke="var(--line)" strokeWidth="1" />
      <path d={curvePath(w, h, pad, 0, 1, xmin, xmax)} fill="none" stroke="var(--accent)" strokeWidth="2" />
      <line x1={px(0)} y1={pad} x2={px(0)} y2={baseY} stroke="var(--text)" strokeWidth="1" strokeDasharray="3 3" opacity="0.6" />
      <text x={px(0)} y={baseY + 11} textAnchor="middle" fontFamily={mono} fontSize="9" fill="var(--muted)">mean</text>
      <text x={px(-1)} y={baseY + 11} textAnchor="middle" fontFamily={mono} fontSize="9" fill="var(--accent)">-1 SD</text>
      <text x={px(1)} y={baseY + 11} textAnchor="middle" fontFamily={mono} fontSize="9" fill="var(--accent)">+1 SD</text>
    </svg>
  )
}

/** Two groups: overlapping (could be luck) vs separated (likely a real difference). */
function TwoGroups({ separated }: { separated: boolean }) {
  const w = 300
  const h = 120
  const pad = 12
  const xmin = -4.2
  const xmax = 4.2
  const d = separated ? 1.7 : 0.55
  const sd = separated ? 0.85 : 1.05
  const baseY = h - pad
  return (
    <svg viewBox={`0 0 ${w} ${h}`} width="100%" style={{ display: 'block' }} role="img" aria-label={separated ? 'Two well-separated bell curves' : 'Two overlapping bell curves'}>
      <line x1={pad} y1={baseY} x2={w - pad} y2={baseY} stroke="var(--line)" strokeWidth="1" />
      <path d={curvePath(w, h, pad, -d, sd, xmin, xmax)} fill="none" stroke="var(--c-blue)" strokeWidth="2" />
      <path d={curvePath(w, h, pad, d, sd, xmin, xmax)} fill="none" stroke="var(--c-green)" strokeWidth="2" />
    </svg>
  )
}

function H({ children }: { children: React.ReactNode }) {
  return <div style={{ fontFamily: head, fontWeight: 700, fontSize: 16, color: 'var(--text)', margin: '18px 0 6px' }}>{children}</div>
}
function P({ children }: { children: React.ReactNode }) {
  return <p style={{ fontSize: 14, lineHeight: 1.62, color: 'var(--text)', marginBottom: 8 }}>{children}</p>
}

function ThisExperiment({ context }: { context: StatsContext }) {
  if (context === 'bench') {
    return (
      <P>
        Act II is a <b>model</b> you set by hand, so there is no single p-value. Instead you run the same setting
        several times and check how often the runs agree. Close agreement across runs shows the lean is stable, not one
        lucky run. (Agreement shows the result <i>repeats</i>, not that it is correct: a model can repeat the same wrong
        answer every time.) Runs that straddle the line mean the model is genuinely undecided, which is honest
        information too.
      </P>
    )
  }
  return (
    <>
      <P>
        Here, a <b>replicate</b> is one whole sample you measured: one embryo in Develop, or one sample region in
        Derail, not one cell inside it. Each replicate gives one mean spacing, and the test (a Welch t-test) runs on
        those per-replicate values. So your sample size <b>n</b> (how many samples you have) is the number of
        replicates, not the number of cells.
      </P>
      <P>
        Watch the trap: if you counted every single cell as its own data point, n would jump into the hundreds and the
        p-value would look tiny, even from just a few replicates. The computer would trust a result you have not really
        earned. Scientists call that mistake <b>pseudoreplication</b>, and it is exactly why the honest n is per-replicate.
      </P>
    </>
  )
}

export function StatsExplainerModal({ context, onClose }: { context: StatsContext; onClose: () => void }) {
  // Portaled to <body> so a transformed ancestor (the .stage-enter animation
  // creates a fixed-positioning containing block) cannot trap this overlay.
  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-label="What makes a result statistically significant"
      onClick={onClose}
      style={{ position: 'fixed', inset: 0, zIndex: 60, display: 'grid', placeItems: 'center', padding: 'clamp(12px, 3vw, 40px)', background: 'color-mix(in srgb, #04060c 80%, transparent)', backdropFilter: 'blur(6px)' }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{ width: 'min(680px, 100%)', maxHeight: '88vh', overflowY: 'auto', background: 'var(--bg2)', border: '1px solid var(--line)', borderRadius: 16, padding: 'clamp(16px, 2.4vw, 26px)', boxShadow: '0 20px 60px rgba(0,0,0,.5)' }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
          <div style={{ fontFamily: mono, fontSize: 10, letterSpacing: '.14em', color: 'var(--accent)' }}>📊 STATISTICAL SIGNIFICANCE</div>
          <button onClick={onClose} aria-label="Close" style={{ minHeight: 30, padding: '5px 11px', borderRadius: 7, border: '1px solid var(--line)', background: 'transparent', color: 'var(--muted)', cursor: 'pointer', fontFamily: mono, fontSize: 10, letterSpacing: '.06em' }}>✕ CLOSE</button>
        </div>

        <h1 style={{ fontFamily: head, fontWeight: 700, fontSize: 23, lineHeight: 1.15, marginBottom: 8 }}>Is the difference real, or could it be luck?</h1>
        <P>
          That is the one question statistical significance answers. You measured a difference between two groups. A
          result is called <b>statistically significant</b> when plain luck is an unlikely explanation for a gap that big.
        </P>

        <H>1 &middot; Data spreads out: the bell curve</H>
        <P>
          Measure the same thing many times and the values cluster around a middle (the <b>mean</b>) and thin out toward
          the edges (how scattered they are is the <b>spread</b>). Drawn, that shape is a <b>bell curve</b> (also called a
          normal distribution): most measurements land near the middle, a few land far out.
        </P>
        <div style={{ border: '1px solid var(--line)', borderRadius: 10, background: 'var(--panel)', padding: '10px 12px', marginBottom: 8 }}>
          <OneBell />
        </div>

        <H>2 &middot; Standard deviation: how wide the bell is</H>
        <P>
          The <b>standard deviation</b> (SD) is one number for the spread. A small SD means the values hug the mean (a
          tall, narrow bell). A large SD means they scatter (a short, wide bell). The shaded band above is one SD on
          each side of the mean, where about two-thirds of ordinary values fall.
        </P>

        <H>3 &middot; Comparing two groups</H>
        <P>
          Put each group&rsquo;s bell side by side. If the means are far apart compared to the spread, the bells barely
          overlap and a real difference is likely. If the bells sit on top of each other, the gap could easily be luck.
        </P>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 8 }}>
          <div style={{ border: '1px solid var(--line)', borderRadius: 10, background: 'var(--panel)', padding: '8px 10px' }}>
            <TwoGroups separated={false} />
            <div style={{ fontFamily: mono, fontSize: 10, color: 'var(--c-amber)', textAlign: 'center', marginTop: 2 }}>overlap &middot; could be luck</div>
          </div>
          <div style={{ border: '1px solid var(--line)', borderRadius: 10, background: 'var(--panel)', padding: '8px 10px' }}>
            <TwoGroups separated={true} />
            <div style={{ fontFamily: mono, fontSize: 10, color: 'var(--c-green)', textAlign: 'center', marginTop: 2 }}>separated &middot; likely real</div>
          </div>
        </div>

        <H>4 &middot; The p-value</H>
        <P>
          The <b>p-value</b> puts a number on that luck. Pretend there is really <i>no</i> difference between the
          groups. The p-value is how often chance alone would still produce a gap at least this big. A small p-value
          means chance almost never does this, so you have evidence of a real effect. Scientists usually call a result
          significant when <b>p is below 0.05</b>: with no real difference, a gap this big would turn up less than 1 time
          in 20. (Careful: that is the chance luck makes the gap, not the chance your result is wrong, and it does not
          mean you are 95% sure.) 0.05 is a shared convention, not a magic line.
        </P>

        <H>5 &middot; How it is calculated, in general</H>
        <P>
          The idea first. Two classes take the same quiz. Class A averages 82, Class B averages 78, a 4-point gap. If
          scores barely vary, 4 points is a lot, so chance is an unlikely explanation (a real difference). If scores
          swing wildly, from 50s to 100s, a 4-point gap is nothing (probably luck). Same gap, opposite answer, because
          with the gap held fixed the <b>spread</b> is what decides.
        </P>
        <P>
          Scientists fold that into one number (the sim computes it for you, you do not have to):
        </P>
        <div style={{ fontFamily: mono, fontSize: 13, color: 'var(--accent)', background: 'var(--panel)', border: '1px solid var(--line)', borderRadius: 8, padding: '10px 12px', marginBottom: 8, lineHeight: 1.5 }}>
          t = (difference between the two means) / (how much the averages would jump around just from luck)
        </div>
        <P>
          <b>t</b> is a difference score: a bigger gap, a tighter spread, or a larger sample all make t bigger, and a
          bigger t means a smaller p-value.
        </P>

        <H>6 &middot; In this experiment</H>
        <ThisExperiment context={context} />

        <div style={{ borderLeft: '2px solid var(--c-green)', padding: '6px 0 6px 14px', marginTop: 14, background: 'color-mix(in srgb, var(--c-green) 5%, transparent)' }}>
          <div style={{ fontFamily: mono, fontSize: 10, letterSpacing: '.12em', color: 'var(--c-green)', marginBottom: 4 }}>THE HONEST PART</div>
          <P>
            A significant result is strong <b>evidence</b>, not proof. A non-significant result does not prove there is no
            difference; it means your evidence is not strong enough yet. And a tiny p-value never rescues a badly designed
            experiment.
          </P>
        </div>
      </div>
    </div>,
    document.body,
  )
}

/** The button. Drop it anywhere a statistical test is shown or asked for. */
export default function StatsHelpButton({ context = 'spacing', compact = false }: { context?: StatsContext; compact?: boolean }) {
  const [open, setOpen] = useState(false)
  return (
    <>
      <button
        onClick={() => setOpen(true)}
        title="What makes a result statistically significant?"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 7,
          padding: compact ? '5px 10px' : '8px 13px',
          borderRadius: 9,
          border: '1px solid color-mix(in srgb, var(--accent) 45%, var(--line))',
          background: 'color-mix(in srgb, var(--accent) 9%, var(--panel))',
          color: 'var(--text)',
          cursor: 'pointer',
          fontFamily: mono,
          fontSize: compact ? 11 : 12,
        }}
      >
        📊 <span>What makes a result statistically significant?</span>
      </button>
      {open && <StatsExplainerModal context={context} onClose={() => setOpen(false)} />}
    </>
  )
}
