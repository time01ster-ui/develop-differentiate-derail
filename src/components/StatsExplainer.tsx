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
        Put simply: <b>more cells does not mean more embryos, and only embryos are real repeats.</b>
      </P>
    </>
  )
}

// Practice: check-your-understanding items grounded in the sim's own statistics.
// Each is answerable from the explainer above, the answer is not leaked in the
// stem, and the reasoning was recomputed. Tiered Intro -> Core -> Challenge.
const PRACTICE: { tier: string; q: string; a: string }[] = [
  {
    tier: 'Intro',
    q: 'Two classes both average 80 on a quiz. Class A’s scores all land between 78 and 82. Class B’s scores run from 50 to 100. Which class has the larger standard deviation?',
    a: 'Class B. Standard deviation measures spread, and Class B’s scores are far more scattered, even though the two averages are identical.',
  },
  {
    tier: 'Intro',
    q: 'A test comes back with p = 0.30. Is that strong evidence of a real difference? Why or why not?',
    a: 'No. p = 0.30 means that even with no real difference, a gap this big would still turn up about 3 times in 10 just by luck. Luck is an easy explanation here, so the result is not significant.',
  },
  {
    tier: 'Core',
    q: 'You put two groups’ bell curves side by side and they sit almost exactly on top of each other. What does that tell you about whether the difference is real?',
    a: 'The gap could easily be luck. Bells that overlap heavily mean the two averages are close compared to the spread, so you cannot claim a real difference (the p-value would be large).',
  },
  {
    tier: 'Core',
    q: 'You measured 3 embryos, each with about 100 cells. For the honest test, what is n, and why is it not 300?',
    a: 'n = 3, the number of embryos. The roughly 100 cells inside one embryo are not independent experiments, so counting all 300 would be pseudoreplication and would fake a much smaller p-value than your evidence really supports.',
  },
  {
    tier: 'Core',
    q: 'Pooling every cell gives p < 0.001, but the honest per-embryo test gives p = 0.20. Which do you trust, and what is it telling you?',
    a: 'Trust the per-embryo test (p = 0.20). With only 3 real replicates, the difference is not strong enough to claim yet. The tiny pooled p is inflated by pseudoreplication and overstates the evidence.',
  },
  {
    tier: 'Core',
    q: 'Your honest per-replicate test gives p = 0.002 with tight, consistent data. What can you now say, and what can you still NOT say?',
    a: 'You can say the difference is statistically significant: a gap this big would almost never happen by luck, so you have real evidence of a difference. You still cannot say the difference is large or important (significant means real, not big), and you cannot claim anything your tools did not measure.',
  },
  {
    tier: 'Challenge',
    q: 'Your honest test gives p = 0.08, which is not below 0.05. Does that prove the two groups are the same? What is the honest thing to say?',
    a: 'No. A non-significant result does not prove there is no difference; it means your evidence is not strong enough yet. The honest move is to not claim a difference with this evidence, and maybe add more replicates.',
  },
  {
    tier: 'Challenge',
    q: 'Two experiments find the same 4-unit gap between their group averages. Experiment A’s data is tightly clustered; Experiment B’s data is widely scattered. Which has the larger t, and which is more likely to be significant?',
    a: 'Experiment A. With the gap held fixed, tighter data makes the bottom of the t formula smaller, so t is larger and the p-value smaller. A is more likely to be significant.',
  },
  {
    tier: 'Core',
    q: 'A poll says Candidate A leads 52% to 48% with a margin of error of plus or minus 3 points. Is A definitely ahead?',
    a: 'No. The margin of error (±3) is almost as big as the 4-point lead, so the true gap could be tiny or even reversed. The lead is within the noise, so you cannot call it a real lead yet.',
  },
  {
    tier: 'Intro',
    q: 'An ad says "9 out of 10 dentists recommend it." What is the single most important question to ask before believing it?',
    a: 'How many dentists were asked? "9 out of 10" could mean they asked only 10. A tiny sample makes the number meaningless; sample size is what gives it weight.',
  },
]

function PracticeItem({ tier, q, a }: { tier: string; q: string; a: string }) {
  const [show, setShow] = useState(false)
  const tierColor = tier === 'Intro' ? 'var(--c-green)' : tier === 'Core' ? 'var(--accent)' : 'var(--c-amber)'
  return (
    <div style={{ border: '1px solid var(--line)', borderRadius: 10, background: 'var(--panel)', padding: '11px 13px' }}>
      <div style={{ display: 'flex', gap: 9, alignItems: 'baseline' }}>
        <span style={{ flex: 'none', fontFamily: mono, fontSize: 9, letterSpacing: '.08em', color: tierColor, border: `1px solid ${tierColor}`, borderRadius: 5, padding: '2px 6px' }}>{tier.toUpperCase()}</span>
        <span style={{ fontSize: 13.5, lineHeight: 1.55, color: 'var(--text)' }}>{q}</span>
      </div>
      {show ? (
        <div style={{ marginTop: 9, borderLeft: '2px solid var(--c-green)', padding: '4px 0 4px 12px', fontSize: 13, lineHeight: 1.55, color: 'var(--text)' }}>
          <span style={{ fontFamily: mono, fontSize: 9.5, letterSpacing: '.1em', color: 'var(--c-green)' }}>ANSWER&nbsp;&nbsp;</span>
          {a}
        </div>
      ) : (
        <button onClick={() => setShow(true)} style={{ marginTop: 9, padding: '5px 11px', borderRadius: 7, border: '1px dashed color-mix(in srgb, var(--accent) 55%, var(--line))', background: 'color-mix(in srgb, var(--accent) 8%, transparent)', color: 'var(--text)', cursor: 'pointer', fontFamily: mono, fontSize: 11 }}>
          Show answer ▸
        </button>
      )}
    </div>
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
          each side of the mean, where about two-thirds of ordinary values fall. (That two-thirds is just a built-in
          fact about the bell shape; you do not have to derive it, and you do not compute SD by hand here.)
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
        <P>
          <b>In one line: a small p means the gap would be surprising if it were only luck, so it is probably real.</b>
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
          The bottom number is small when your data is steady and large when it is noisy. (If you reran the experiment,
          the average would not land in the exact same spot every time; the bottom measures that wobble.) Turn the
          machine once on the quiz: the top is 82 minus 78 = 4. With steady scores the wobble might be about 1, so
          t = 4 / 1 = 4, comfortably big (small p). With wild scores the wobble might be about 5, so t = 4 / 5 = 0.8, too
          small to trust (large p). You do not compute this by hand here; the sim does. Just know <b>t</b> is a
          difference score: a bigger gap, a tighter spread, or a larger sample all make t bigger, and a bigger t means a
          smaller p-value.
        </P>

        <H>6 &middot; In this experiment</H>
        <ThisExperiment context={context} />

        <H>7 &middot; Where you will see this (in any class, and in the news)</H>
        <P>The same four ideas, spread, comparison, sample size, and the p-value, let you read claims almost anywhere. A few places they show up:</P>
        <ul style={{ margin: '0 0 8px', paddingLeft: 18, display: 'flex', flexDirection: 'column', gap: 6 }}>
          <li style={{ fontSize: 13, lineHeight: 1.55, color: 'var(--text)' }}><b>Elections and polls:</b> "Candidate A leads 52 to 48, margin of error plus or minus 3 points." The margin of error is the spread; this close, the lead could be luck. And the poll sampled about a thousand people, not one.</li>
          <li style={{ fontSize: 13, lineHeight: 1.55, color: 'var(--text)' }}><b>Medicine:</b> "the vaccine significantly cut infections (p &lt; 0.001)" means the drop is probably real, not luck. It does not mean it worked for every single person. Ask the sample size and whether there was a placebo control (a fake treatment to compare against).</li>
          <li style={{ fontSize: 13, lineHeight: 1.55, color: 'var(--text)' }}><b>Sports:</b> hitting .400 over 10 games (a small sample, maybe a hot streak) is weaker evidence than .300 over a full season (a large sample).</li>
          <li style={{ fontSize: 13, lineHeight: 1.55, color: 'var(--text)' }}><b>A/B tests and reviews:</b> when a website shows two versions to see which people prefer, "version B got more clicks" only counts if enough people saw it and the gap beats chance.</li>
          <li style={{ fontSize: 13, lineHeight: 1.55, color: 'var(--text)' }}><b>Other science classes:</b> error bars on a graph show uncertainty, sometimes the spread of the data and sometimes how precise the average is, so check the caption for which. If two bars overlap a lot, the difference may not be real, the same idea as overlapping bell curves.</li>
          <li style={{ fontSize: 13, lineHeight: 1.55, color: 'var(--text)' }}><b>Everyday ads:</b> "9 out of 10 dentists" means little until you ask how many dentists were asked.</li>
        </ul>
        <div style={{ border: '1px solid color-mix(in srgb, var(--accent) 35%, var(--line))', borderRadius: 10, background: 'color-mix(in srgb, var(--accent) 6%, var(--panel))', padding: '11px 13px', marginBottom: 6 }}>
          <div style={{ fontFamily: mono, fontSize: 10, letterSpacing: '.12em', color: 'var(--accent)', marginBottom: 6 }}>HOW TO READ ANY STATISTICS CLAIM</div>
          <p style={{ fontSize: 13, lineHeight: 1.6, color: 'var(--text)' }}>
            When you meet a number or a "significant" claim, ask: (1) what exactly is measured, and in what units? (2) compared against what (a control)? (3) how big is the sample (how many independent trials)? (4) how spread out is the data (error bars or margin of error)? (5) is the difference likely real, or could it be luck (the p-value)? (6) does the conclusion only claim what was actually measured, or does it reach further?
          </p>
        </div>

        <div style={{ borderLeft: '2px solid var(--c-green)', padding: '6px 0 6px 14px', marginTop: 14, background: 'color-mix(in srgb, var(--c-green) 5%, transparent)' }}>
          <div style={{ fontFamily: mono, fontSize: 10, letterSpacing: '.12em', color: 'var(--c-green)', marginBottom: 4 }}>THE HONEST PART</div>
          <P>
            A significant result is strong <b>evidence</b>, not proof. A non-significant result does not prove there is no
            difference; it means your evidence is not strong enough yet. And a tiny p-value never rescues a badly designed
            experiment.
          </P>
        </div>

        <H>Practice &middot; check your understanding</H>
        <P>Answer each in your head, then reveal. Every answer follows from the ideas above.</P>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 4 }}>
          {PRACTICE.map((p) => (
            <PracticeItem key={p.q} tier={p.tier} q={p.q} a={p.a} />
          ))}
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
