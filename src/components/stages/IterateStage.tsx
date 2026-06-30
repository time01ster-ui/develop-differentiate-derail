import type { Dispatch } from 'react'
import { CLAIMS, RUNG_NAMES } from '../../content/act1'
import { MATEO_PAYOFF, ACT1_ITERATE_NOTE } from '../../content/story'
import { fmtP, perEmbryoWelch, type ExperimentData } from '../../lib/measure'
import { ceiling, type Action, type LoopState } from '../../state/loop'
import { MateoNote, PiBrief, NotebookNote, RepeatabilityNote } from '../StageChrome'
import StatsHelpButton from '../StatsExplainer'
import { ACT_COURSE_SEAL, Seal } from '../Seal'

const mono = "'IBM Plex Mono'"

export default function IterateStage({
  state,
  dispatch,
  data,
}: {
  state: LoopState
  dispatch: Dispatch<Action>
  data: ExperimentData
}) {
  const ceil = ceiling(state.rungs, state.act)
  const emb = perEmbryoWelch(data)
  const embSig = emb.p < 0.05
  const validClaim = CLAIMS.find((c) => c.id === state.claim)
  const iterTitle =
    state.claimResult === 'valid'
      ? 'You concluded only what the evidence allows. That’s the whole skill.'
      : 'The loop sent you back, exactly as it should.'

  const runSummary = [
    { k: 'Question', v: 'Non-random nuclear spacing?' },
    { k: 'Tools / ceiling', v: RUNG_NAMES[ceil] },
    { k: 'Design', v: `${state.replicates} embryos · ${state.control ? '+ control' : 'no control'} · ${state.distance === '2d' ? '2D-projected' : '3D'}` },
    { k: 'Per-embryo result', v: `p ${fmtP(emb.p)}${embSig ? ' · significant' : ' · not significant'}` },
    { k: 'Claim logged', v: validClaim ? `“${validClaim.text.slice(0, 38)}…”` : 'none' },
  ]

  return (
    <div className="stage-enter" style={{ maxWidth: 960 }}>
      <div style={{ fontFamily: mono, fontSize: 11, letterSpacing: '.18em', color: 'var(--accent)', marginBottom: 14 }}>
        08 · TRIAL (ITERATE), the loop closes
      </div>
      <PiBrief step={7} />
      <NotebookNote {...ACT1_ITERATE_NOTE} />
      <h1 style={{ fontFamily: "'Space Grotesk'", fontWeight: 700, fontSize: 30, lineHeight: 1.13, marginBottom: 18 }}>{iterTitle}</h1>
      <div className="col-2" style={{ marginBottom: 24 }}>
        <div style={{ border: '1px solid var(--line)', borderRadius: 14, background: 'var(--panel)', padding: 22 }}>
          <div style={{ fontFamily: mono, fontSize: 10, letterSpacing: '.14em', color: 'var(--muted)', marginBottom: 14 }}>YOUR RUN, LOGGED</div>
          {runSummary.map((r) => (
            <div key={r.k} style={{ display: 'flex', justifyContent: 'space-between', gap: 14, padding: '8px 0', borderBottom: '1px solid var(--line)' }}>
              <span style={{ fontSize: 13, color: 'var(--muted)' }}>{r.k}</span>
              <span style={{ fontSize: 13, color: 'var(--text)', fontWeight: 500, textAlign: 'right' }}>{r.v}</span>
            </div>
          ))}
        </div>
        <MateoNote>{MATEO_PAYOFF}</MateoNote>
      </div>
      <RepeatabilityNote />
      <div style={{ marginBottom: 20 }}>
        <StatsHelpButton context="spacing" />
      </div>
      <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
        <button
          onClick={() => dispatch({ type: 'CLIMB_LADDER' })}
          style={{ flex: 1, minWidth: 260, textAlign: 'left', padding: '18px 20px', borderRadius: 13, border: '1.5px solid var(--accent)', background: 'color-mix(in srgb, var(--accent) 10%, transparent)', cursor: 'pointer' }}
        >
          <div style={{ fontFamily: "'Space Grotesk'", fontWeight: 600, fontSize: 16, color: 'var(--text)', marginBottom: 4 }}>↑ Climb the ladder</div>
          <div style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.5 }}>Go back to tools and spend your grant differently. In a real lab you'd add a FRET or AFM machine for a tension claim; those stay locked here, which is exactly why spacing is as far as you can honestly go.</div>
        </button>
        <button
          onClick={() => dispatch({ type: 'START_ACT', act: 'differentiate' })}
          style={{ flex: 1, minWidth: 260, textAlign: 'left', padding: '18px 20px', borderRadius: 13, border: '1.5px solid var(--c-green)', background: 'color-mix(in srgb, var(--c-green) 9%, transparent)', cursor: 'pointer' }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 9, marginBottom: 4 }}>
            <Seal kind={ACT_COURSE_SEAL.differentiate} size={26} />
            <div style={{ fontFamily: "'Space Grotesk'", fontWeight: 600, fontSize: 16, color: 'var(--text)' }}>→ Begin Act II · Differentiate</div>
          </div>
          <div style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.5 }}>You found WHERE the cells sit. Act II asks what makes each one become bone or cartilage, by tuning the same force chain on a mechanotransduction bench.</div>
        </button>
      </div>
    </div>
  )
}
