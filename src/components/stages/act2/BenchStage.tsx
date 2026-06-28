import type { Dispatch } from 'react'
import { bench } from '../../../lib/bench'
import type { Action, LoopState } from '../../../state/loop'
import Define from '../../Define'
import { PiBrief } from '../../StageChrome'
import { useTier } from '../../TierContext'
import { Kicker } from '../ui'

const mono = "'IBM Plex Mono'"

/** The live mechanotransduction cell. Reads the two sliders, shows YAP/TAZ
 *  shuttling between cytoplasm and nucleus, focal adhesions growing on firmer /
 *  more spread settings, and the substrate firmness underneath. */
function BenchCell({ stiffness, shape, animate }: { stiffness: number; shape: number; animate: boolean }) {
  const r = bench(stiffness, shape)
  const cx = 150
  const rx = 50 + 42 * shape // round -> spread (wider)
  const ry = 56 - 26 * shape // round -> spread (flatter)
  const bottom = 196 // cell rests on the substrate line
  const cy = bottom - ry
  const nucR = 20
  const N = 10
  const nuclearCount = Math.round(r.nuclear * N)
  const trans = animate ? 'cx .35s ease, cy .35s ease, rx .35s ease, ry .35s ease, opacity .35s ease' : 'none'

  // YAP/TAZ dots: each has a cytoplasm anchor (ring) and a nucleus anchor.
  const dots = Array.from({ length: N }, (_, i) => {
    const ang = (i / N) * Math.PI * 2
    const inNucleus = i < nuclearCount
    const x = inNucleus ? cx + Math.cos(ang) * nucR * 0.55 : cx + Math.cos(ang) * (rx * 0.66)
    const y = inNucleus ? cy + Math.sin(ang) * nucR * 0.55 : cy + Math.sin(ang) * (ry * 0.66)
    return { x, y, inNucleus }
  })

  // focal adhesions along the cell base, growing with tension (stiffness * shape)
  const tension = stiffness * (0.4 + 0.6 * shape)
  const fa = Array.from({ length: 7 }, (_, i) => {
    const fx = cx - rx * 0.8 + (i / 6) * rx * 1.6
    const h = 2 + 9 * tension
    return { fx, h }
  })

  // substrate fibers: tighter + warmer when firm
  const fibers = Array.from({ length: 9 }, (_, i) => 18 + i * 35)
  const firmCol = `color-mix(in srgb, var(--c-amber) ${Math.round(stiffness * 70)}%, var(--c-blue))`

  return (
    <svg viewBox="0 0 300 230" width="100%" role="img" aria-label={`Model cell on ${stiffness > 0.5 ? 'firm' : 'soft'} substrate, ${shape > 0.5 ? 'spread' : 'round'}; YAP and TAZ ${r.nuclear > 0.5 ? 'mostly in the nucleus' : 'mostly in the cytoplasm'}`} style={{ display: 'block', background: 'var(--bg2)', borderRadius: 12 }}>
      {/* substrate */}
      <rect x="0" y="200" width="300" height="30" fill="color-mix(in srgb, var(--panel2) 80%, transparent)" />
      {fibers.map((fx, i) => (
        <line key={i} x1={fx} y1={202} x2={fx + 18 - stiffness * 14} y2={226} stroke={firmCol} strokeWidth={1 + stiffness * 1.5} opacity={0.5 + stiffness * 0.4} style={{ transition: animate ? 'stroke-width .35s, opacity .35s' : 'none' }} />
      ))}
      <text x="8" y="216" fontFamily={mono} fontSize="8.5" fill="var(--muted)">{stiffness > 0.5 ? 'FIRM' : 'SOFT'} SUBSTRATE</text>

      {/* focal adhesions */}
      {fa.map((f, i) => (
        <rect key={i} x={f.fx - 2} y={200 - f.h} width="4" height={f.h} rx="1.5" fill="var(--c-green)" opacity={0.25 + tension * 0.7} style={{ transition: animate ? 'height .35s, opacity .35s, y .35s' : 'none' }} />
      ))}

      {/* cell body */}
      <ellipse cx={cx} cy={cy} rx={rx} ry={ry} fill="color-mix(in srgb, var(--accent) 9%, var(--panel))" stroke="color-mix(in srgb, var(--accent) 45%, var(--line))" strokeWidth="1.5" style={{ transition: trans }} />
      {/* nucleus */}
      <circle cx={cx} cy={cy} r={nucR} fill="color-mix(in srgb, var(--c-pink) 14%, var(--panel2))" stroke="color-mix(in srgb, var(--c-pink) 50%, transparent)" strokeWidth="1.2" style={{ transition: trans }} />
      <text x={cx} y={cy + 3} textAnchor="middle" fontFamily={mono} fontSize="7.5" fill="var(--muted)">nucleus</text>

      {/* YAP/TAZ dots */}
      {dots.map((d, i) => (
        <circle key={i} cx={d.x} cy={d.y} r="4.2" fill={d.inNucleus ? 'var(--c-pink)' : 'var(--accent)'} style={{ filter: `drop-shadow(0 0 4px ${d.inNucleus ? 'var(--c-pink)' : 'var(--accent)'})`, transition: trans }} />
      ))}
    </svg>
  )
}

function Bar({ label, value, color }: { label: string; value: number; color: string }) {
  return (
    <div style={{ marginBottom: 9 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: mono, fontSize: 10.5, color: 'var(--muted)', marginBottom: 3 }}>
        <span>{label}</span>
        <span style={{ color }}>{Math.round(value * 100)}%</span>
      </div>
      <div style={{ height: 7, borderRadius: 7, background: 'var(--bg2)', overflow: 'hidden' }}>
        <div style={{ height: '100%', width: `${value * 100}%`, background: color, boxShadow: `0 0 8px ${color}`, transition: 'width .35s ease' }} />
      </div>
    </div>
  )
}

function Slider({ label, lo, hi, value, onChange, ariaText }: { label: string; lo: string; hi: string; value: number; onChange: (v: number) => void; ariaText: string }) {
  const pct = `${value * 100}%`
  return (
    <div style={{ marginBottom: 16 }}>
      <div style={{ fontFamily: "'Space Grotesk'", fontWeight: 600, fontSize: 14.5, marginBottom: 6 }}>{label}</div>
      <input
        type="range"
        min={0}
        max={100}
        step={1}
        value={Math.round(value * 100)}
        onChange={(e) => onChange(parseInt(e.target.value, 10) / 100)}
        aria-label={label}
        aria-valuetext={ariaText}
        style={{ width: '100%', background: `linear-gradient(90deg, var(--accent) ${pct}, var(--bg2) ${pct})` }}
      />
      <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: mono, fontSize: 10.5, color: 'var(--muted)', marginTop: 2 }}>
        <span>{lo}</span>
        <span>{hi}</span>
      </div>
    </div>
  )
}

export default function BenchStage({ state, dispatch }: { state: LoopState; dispatch: Dispatch<Action> }) {
  const { reducedMotion } = useTier()
  const r = bench(state.stiffness, state.shape)
  const boneLean = r.fate === 'bone'
  const fateColor = boneLean ? 'var(--c-blue)' : 'var(--c-amber)'

  return (
    <div className="stage-enter">
      <Kicker>
        05 · RUN / MEASURE, <span style={{ color: 'var(--c-green)' }}>the mechanotransduction bench</span>
      </Kicker>
      <PiBrief step={4} act="differentiate" />
      <div style={{ fontSize: 12.5, color: 'var(--muted)', lineHeight: 1.5, marginBottom: 14 }}>
        Drag the two sliders and watch the cell. <b style={{ color: 'var(--accent)' }}>Substrate stiffness</b> and{' '}
        <b style={{ color: 'var(--accent)' }}>cell shape</b> together move <Define t="YAP">YAP</Define> and{' '}
        <Define t="TAZ">TAZ</Define> between the cytoplasm and the nucleus. This is a rule-based{' '}
        <Define t="model">model</Define> (the same settings always give the same result) that you discover by
        manipulating it, not a measurement of Mateo.
      </div>

      <div className="col-run">
        <div>
          <BenchCell stiffness={state.stiffness} shape={state.shape} animate={!reducedMotion} />
          <div style={{ marginTop: 16, border: '1px solid var(--line)', borderRadius: 12, background: 'var(--panel)', padding: '16px 18px' }}>
            <Slider
              label="Substrate stiffness"
              lo="soft (fat / brain-like)"
              hi="firm (pre-bone)"
              value={state.stiffness}
              onChange={(v) => dispatch({ type: 'SET_STIFFNESS', value: v })}
              ariaText={`${Math.round(state.stiffness * 100)} percent firm`}
            />
            <Slider
              label="Cell shape / spread"
              lo="round, confined"
              hi="flat, spread"
              value={state.shape}
              onChange={(v) => dispatch({ type: 'SET_SHAPE', value: v })}
              ariaText={`${Math.round(state.shape * 100)} percent spread`}
            />
            <div style={{ fontFamily: mono, fontSize: 11, color: 'var(--muted)', lineHeight: 1.5, marginTop: 4 }}>
              Try a firm substrate with a <b>round</b> cell. Stiffness alone does not flip the switch, the cell
              still has to spread and pull. That is the context-dependence, not a single stiffness number.
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <aside style={{ border: `1.5px solid ${fateColor}`, borderRadius: 14, background: 'var(--panel)', padding: 20 }}>
            <div style={{ fontFamily: mono, fontSize: 10, letterSpacing: '.14em', color: 'var(--muted)', marginBottom: 10 }}>FATE READOUT, THIS SETTING</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14 }}>
              <div style={{ flex: 'none', width: 44, height: 44, borderRadius: 10, display: 'grid', placeItems: 'center', background: `color-mix(in srgb, ${fateColor} 16%, transparent)`, border: `1.5px solid ${fateColor}`, fontSize: 22 }}>
                {boneLean ? '🦴' : '🟦'}
              </div>
              <div>
                <div style={{ fontFamily: "'Space Grotesk'", fontWeight: 700, fontSize: 18, color: fateColor }}>
                  {boneLean ? 'RUNX2 · bone program' : 'Sox9 · cartilage default'}
                </div>
                <div style={{ fontFamily: mono, fontSize: 11, color: 'var(--muted)' }}>{Math.round(r.confidence * 100)}% decisive</div>
              </div>
            </div>
            <div style={{ fontFamily: mono, fontSize: 10.5, color: 'var(--muted)', marginBottom: 4 }}>
              NUCLEAR YAP / TAZ: <span style={{ color: 'var(--c-pink)' }}>{Math.round(r.nuclear * 100)}%</span>
            </div>
            <div style={{ height: 7, borderRadius: 7, background: 'var(--bg2)', overflow: 'hidden', marginBottom: 14 }}>
              <div style={{ height: '100%', width: `${r.nuclear * 100}%`, background: 'var(--c-pink)', boxShadow: '0 0 8px var(--c-pink)', transition: 'width .35s ease' }} />
            </div>
            <div style={{ fontFamily: mono, fontSize: 10, letterSpacing: '.1em', color: 'var(--muted)', marginBottom: 8 }}>YAP / TAZ TARGET GENES</div>
            <Bar label="CTGF (CCN2)" value={r.ctgf} color="var(--c-green)" />
            <Bar label="CYR61 (CCN1)" value={r.cyr61} color="var(--c-green)" />
          </aside>

          <button
            onClick={() => dispatch({ type: 'SAMPLE_BENCH' })}
            aria-pressed={state.benchSampled}
            style={{
              minHeight: 48,
              padding: '12px 18px',
              borderRadius: 11,
              border: `1.5px solid ${state.benchSampled ? 'var(--c-green)' : 'var(--accent)'}`,
              background: state.benchSampled ? 'color-mix(in srgb, var(--c-green) 14%, transparent)' : 'color-mix(in srgb, var(--accent) 14%, transparent)',
              color: 'var(--text)',
              cursor: 'pointer',
              fontFamily: "'Space Grotesk'",
              fontWeight: 600,
              fontSize: 15,
            }}
          >
            {state.benchSampled ? '✓ Reading taken, on to Analyze' : 'Take a reading at this setting'}
          </button>
          <div style={{ fontFamily: mono, fontSize: 11, color: 'var(--muted)', lineHeight: 1.5 }}>
            A reading just logs the current setting. Next, Analyze checks whether the lean holds up across
            repeated model runs.
          </div>
        </div>
      </div>
    </div>
  )
}
