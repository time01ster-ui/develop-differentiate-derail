import type { Dispatch } from 'react'
import { CLAIMS2, MATEO2, RUNG_NAMES2 } from '../../../content/act2'
import { ACTS } from '../../../content/registry'
import { bench } from '../../../lib/bench'
import { ceiling, type Action, type LoopState } from '../../../state/loop'
import { MateoNote, PiBrief, RepeatabilityNote } from '../../StageChrome'
import StatsHelpButton from '../../StatsExplainer'
import { ACT_COURSE_SEAL, Seal } from '../../Seal'

const mono = "'IBM Plex Mono'"

export default function IterateStage2({ state, dispatch }: { state: LoopState; dispatch: Dispatch<Action> }) {
  const ceil = ceiling(state.rungs, state.act)
  const read = bench(state.stiffness, state.shape)
  const validClaim = CLAIMS2.find((c) => c.id === state.claim)
  const act3Ready = !!ACTS.derail
  const iterTitle =
    state.claimResult === 'valid'
      ? 'You read the model honestly and stopped at the model. That is the whole skill.'
      : 'The loop sent you back, exactly as it should.'

  const runSummary = [
    { k: 'Question', v: 'What makes a crest cell pick bone?' },
    { k: 'Tools / ceiling', v: RUNG_NAMES2[ceil] },
    { k: 'Design', v: `${state.replicates} runs · ${state.control ? '+ baseline' : 'no baseline'} · ${state.modelLabeled ? 'model-labeled' : 'unlabeled'}` },
    { k: 'Bench setting', v: `stiffness ${Math.round(state.stiffness * 100)}% · spread ${Math.round(state.shape * 100)}%` },
    { k: 'Model lean', v: `${read.fate} (${Math.round(read.confidence * 100)}% decisive)` },
    { k: 'Claim logged', v: validClaim ? `"${validClaim.text.slice(0, 38)}..."` : 'none' },
  ]

  return (
    <div className="stage-enter" style={{ maxWidth: 960 }}>
      <div style={{ fontFamily: mono, fontSize: 11, letterSpacing: '.18em', color: 'var(--accent)', marginBottom: 14 }}>08 · TRIAL (ITERATE), the loop closes</div>
      <PiBrief step={7} act="differentiate" />
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
        <MateoNote>{MATEO2.payoff}</MateoNote>
      </div>
      <RepeatabilityNote />
      <div style={{ marginBottom: 20 }}>
        <StatsHelpButton context="bench" />
      </div>
      <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
        <button
          onClick={() => dispatch({ type: 'CLIMB_LADDER' })}
          style={{ flex: 1, minWidth: 240, textAlign: 'left', padding: '18px 20px', borderRadius: 13, border: '1.5px solid var(--accent)', background: 'color-mix(in srgb, var(--accent) 10%, transparent)', cursor: 'pointer' }}
        >
          <div style={{ fontFamily: "'Space Grotesk'", fontWeight: 600, fontSize: 16, color: 'var(--text)', marginBottom: 4 }}>↑ Climb the ladder</div>
          <div style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.5 }}>Go back to tools, hire the interpreter, and validate the shift across runs. The in-vivo force rung stays locked, which is exactly why the model is as far as you can honestly go.</div>
        </button>
        {act3Ready ? (
          <button
            onClick={() => dispatch({ type: 'START_ACT', act: 'derail' })}
            style={{ flex: 1, minWidth: 240, textAlign: 'left', padding: '18px 20px', borderRadius: 13, border: '1.5px solid var(--c-pink)', background: 'color-mix(in srgb, var(--c-pink) 10%, transparent)', cursor: 'pointer' }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 9, marginBottom: 4 }}>
              <Seal kind={ACT_COURSE_SEAL.derail} size={26} />
              <div style={{ fontFamily: "'Space Grotesk'", fontWeight: 600, fontSize: 16, color: 'var(--text)' }}>→ Begin Act III · Derail</div>
            </div>
            <div style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.5 }}>You showed the same force chain that positioned the cells also tells them what to become. Next: what happens when a cell runs this chain with no off-switch, in the wrong place?</div>
          </button>
        ) : (
          <button
            onClick={() => dispatch({ type: 'RESTART' })}
            style={{ flex: 1, minWidth: 240, textAlign: 'left', padding: '18px 20px', borderRadius: 13, border: '1.5px solid var(--c-green)', background: 'color-mix(in srgb, var(--c-green) 9%, transparent)', cursor: 'pointer' }}
          >
            <div style={{ fontFamily: "'Space Grotesk'", fontWeight: 600, fontSize: 16, color: 'var(--text)', marginBottom: 4 }}>↻ Replay Act II</div>
            <div style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.5 }}>Start fresh and try a different path on the bench. (Act III, Derail, where a tumor hijacks this same force chain, is coming next.)</div>
          </button>
        )}
      </div>
    </div>
  )
}
