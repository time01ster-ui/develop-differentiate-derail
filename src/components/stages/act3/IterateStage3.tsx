import type { Dispatch } from 'react'
import { CLAIMS3, MATEO3, RUNG_NAMES3 } from '../../../content/act3'
import { fmtP, perEmbryoWelch, type ExperimentData } from '../../../lib/measure'
import { ceiling, type Action, type LoopState } from '../../../state/loop'
import { MateoNote, PiBrief } from '../../StageChrome'

const mono = "'IBM Plex Mono'"

export default function IterateStage3({ state, dispatch, data }: { state: LoopState; dispatch: Dispatch<Action>; data: ExperimentData }) {
  const ceil = ceiling(state.rungs, state.act)
  const emb = perEmbryoWelch(data)
  const embSig = emb.p < 0.05
  const validClaim = CLAIMS3.find((c) => c.id === state.claim)
  const iterTitle =
    state.claimResult === 'valid'
      ? 'You followed one force chain across three acts, and stopped at the model. That is the whole skill.'
      : 'The loop sent you back, exactly as it should.'

  const runSummary = [
    { k: 'Question', v: 'Is the invasive margin more disordered?' },
    { k: 'Tools / ceiling', v: RUNG_NAMES3[ceil] },
    { k: 'Design', v: `${state.replicates} regions · ${state.control ? '+ control' : 'no control'} · ${state.modelLabeled ? 'model-labeled' : 'unlabeled'}` },
    { k: 'Per-region result', v: `p ${fmtP(emb.p)}${embSig ? ' · significant' : ' · not significant'}` },
    { k: 'Claim logged', v: validClaim ? `"${validClaim.text.slice(0, 38)}..."` : 'none' },
  ]

  return (
    <div className="stage-enter" style={{ maxWidth: 960 }}>
      <div style={{ fontFamily: mono, fontSize: 11, letterSpacing: '.18em', color: 'var(--accent)', marginBottom: 14 }}>08 · ITERATE, the trilogy closes</div>
      <PiBrief step={7} act="derail" />
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
        <MateoNote>{MATEO3.payoff}</MateoNote>
      </div>
      <div style={{ border: '1px solid color-mix(in srgb, var(--accent) 30%, var(--line))', borderRadius: 14, background: 'color-mix(in srgb, var(--accent) 5%, var(--panel))', padding: '16px 18px', marginBottom: 20 }}>
        <div style={{ fontFamily: mono, fontSize: 10, letterSpacing: '.14em', color: 'var(--accent)', marginBottom: 6 }}>THE THROUGHLINE, WHOLE</div>
        <p style={{ fontSize: 14, lineHeight: 1.6, color: 'var(--text)' }}>
          Integrin, focal adhesion, actomyosin tension, nuclear YAP and TAZ, a gene decision. <b>Develop</b> built
          that chain in order. <b>Differentiate</b> tuned it to choose a fate. <b>Derail</b> watched a tumor
          hijack it. Order in development, disorder in disease, one toolkit. Not a poem, a mechanism.
        </p>
      </div>
      <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
        <button onClick={() => dispatch({ type: 'CLIMB_LADDER' })} style={{ flex: 1, minWidth: 240, textAlign: 'left', padding: '18px 20px', borderRadius: 13, border: '1.5px solid var(--accent)', background: 'color-mix(in srgb, var(--accent) 10%, transparent)', cursor: 'pointer' }}>
          <div style={{ fontFamily: "'Space Grotesk'", fontWeight: 600, fontSize: 16, color: 'var(--text)', marginBottom: 4 }}>↑ Climb the ladder</div>
          <div style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.5 }}>Go back to tools and add the paid durotaxis tracking. The in-vivo causal rung stays locked, which is exactly why the model is as far as you can honestly go.</div>
        </button>
        <button onClick={() => dispatch({ type: 'START_ACT', act: 'develop' })} style={{ flex: 1, minWidth: 240, textAlign: 'left', padding: '18px 20px', borderRadius: 13, border: '1.5px solid var(--c-green)', background: 'color-mix(in srgb, var(--c-green) 9%, transparent)', cursor: 'pointer' }}>
          <div style={{ fontFamily: "'Space Grotesk'", fontWeight: 600, fontSize: 16, color: 'var(--text)', marginBottom: 4 }}>↺ Back to Act I</div>
          <div style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.5 }}>Run the loop again from the start, with everything you now know about the one force chain that runs through all three acts.</div>
        </button>
      </div>
    </div>
  )
}
