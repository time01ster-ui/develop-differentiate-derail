import { useState, type Dispatch } from 'react'
import { getAct } from '../../content/registry'
import { canHire, remaining, rungStatus } from '../../content/resources'
import { ceiling, type Action, type LoopState } from '../../state/loop'
import { EquipmentIcon } from '../art/Avatars'
import Define from '../Define'
import { PiBrief, NotebookNote } from '../StageChrome'
import { ACT1_TOOLS_NOTE } from '../../content/story'
import { Kicker } from './ui'

const mono = "'IBM Plex Mono'"

export default function ToolsStage({ state, dispatch }: { state: LoopState; dispatch: Dispatch<Action> }) {
  const [openWhy, setOpenWhy] = useState<Record<string, boolean>>({})
  const A = getAct(state.act)
  const cfg = A.resource
  const ceil = ceiling(state.rungs, state.act)
  const ceilName = A.rungNames[ceil]
  const ceilColor = `var(${A.rungColors[ceil]})`
  const left = remaining(cfg, state.rungs, state.hired)
  const spentPct = ((cfg.startingBudget - left) / cfg.startingBudget) * 100

  return (
    <div className="stage-enter">
      <Kicker>03 · CHOOSE TOOLS, THE MEASUREMENT LADDER</Kicker>
      <PiBrief step={2} />
      {state.act === 'develop' && <NotebookNote {...ACT1_TOOLS_NOTE} />}
      <div className="col-tools">
        <div>
          <h1 style={{ fontFamily: "'Space Grotesk'", fontWeight: 700, fontSize: 25, lineHeight: 1.15, marginBottom: 8 }}>
            You may claim only as high as your most direct evidence.
          </h1>
          <p style={{ color: 'var(--muted)', lineHeight: 1.6, marginBottom: 16 }}>
            Each rung measures something more direct than the one below it. But every tool costs{' '}
            <b style={{ color: 'var(--text)' }}>money</b>, <b style={{ color: 'var(--text)' }}>people</b>, or{' '}
            <b style={{ color: 'var(--text)' }}>equipment you may not have</b>. Pick what you can actually run.
          </p>
          <div style={{ fontSize: 12.5, color: 'var(--c-green)', background: 'color-mix(in srgb, var(--c-green) 8%, transparent)', border: '1px solid color-mix(in srgb, var(--c-green) 30%, var(--line))', borderRadius: 9, padding: '8px 12px', marginBottom: 16 }}>
            New here? <b>Start with the free bottom rung ({A.rungs[0].name}).</b> Add a higher tool only if you can afford it and staff it.
          </div>

          {/* ---- resource bar: budget + team ---- */}
          <div style={{ border: '1px solid var(--line)', borderRadius: 12, background: 'var(--panel2)', padding: '12px 14px', marginBottom: 16 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 8 }}>
              <span style={{ fontFamily: mono, fontSize: 10, letterSpacing: '.12em', color: 'var(--muted)' }}>PILOT GRANT</span>
              <span style={{ fontFamily: mono, fontSize: 16, color: left > 0 ? 'var(--c-green)' : 'var(--c-amber)', fontWeight: 500 }}>
                ${left.toLocaleString()} <span style={{ fontSize: 11, color: 'var(--muted)' }}>left of ${cfg.startingBudget.toLocaleString()}</span>
              </span>
            </div>
            <div style={{ height: 6, borderRadius: 6, background: 'var(--bg2)', overflow: 'hidden', marginBottom: 10 }}>
              <div style={{ height: '100%', width: `${spentPct}%`, background: 'var(--c-amber)', transition: 'width .3s' }} />
            </div>
            <div style={{ fontSize: 11.5, color: 'var(--muted)', lineHeight: 1.45, marginBottom: 12 }}>
              A one-time <b style={{ color: 'var(--text)' }}>${cfg.startingBudget.toLocaleString()} pilot award</b> the lab won. It does not refill. Spend it on tools and the people to run them, and remember: the two top rungs are <b style={{ color: 'var(--text)' }}>not for sale at any price</b>.
            </div>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {(['operator', 'interpreter'] as const).map((role) => {
                const hired = state.hired[role]
                const affordable = canHire(cfg, role, state.rungs, state.hired)
                const name = role === 'operator' ? 'Suneeti · operator' : 'Qiannan · interpreter'
                return (
                  <button
                    key={role}
                    onClick={() => dispatch({ type: 'HIRE', role })}
                    disabled={!hired && !affordable}
                    aria-pressed={hired}
                    style={{
                      flex: 1,
                      minWidth: 150,
                      minHeight: 40,
                      textAlign: 'left',
                      padding: '8px 11px',
                      borderRadius: 9,
                      border: `1.5px solid ${hired ? 'var(--c-green)' : 'var(--line)'}`,
                      background: hired ? 'color-mix(in srgb, var(--c-green) 12%, transparent)' : 'transparent',
                      color: !hired && !affordable ? 'var(--muted)' : 'var(--text)',
                      cursor: !hired && !affordable ? 'not-allowed' : 'pointer',
                    }}
                  >
                    <div style={{ fontSize: 12.5, fontWeight: 600 }}>{hired ? '✓ ' : ''}{name}</div>
                    <div style={{ fontFamily: mono, fontSize: 10.5, color: hired ? 'var(--c-green)' : 'var(--muted)' }}>
                      {hired ? 'hired' : `hire · $${cfg.hireCost[role].toLocaleString()}`}
                    </div>
                  </button>
                )
              })}
            </div>
          </div>

          <a
            href="/Atit_Lab_Grant_and_Budget.pdf"
            target="_blank"
            rel="noreferrer"
            style={{ display: 'inline-flex', alignItems: 'center', gap: 7, marginBottom: 18, padding: '8px 13px', borderRadius: 9, border: '1px solid color-mix(in srgb, var(--accent) 40%, var(--line))', background: 'color-mix(in srgb, var(--accent) 8%, transparent)', color: 'var(--text)', textDecoration: 'none', fontFamily: mono, fontSize: 11.5, minHeight: 38 }}
          >
            📄 Read the lab's approved grant proposal & budget sheet →
          </a>

          {/* ---- the ladder ---- */}
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '4px 12px', fontFamily: mono, fontSize: 10, color: 'var(--muted)', marginBottom: 9 }}>
            <span style={{ letterSpacing: '.1em' }}>KEY</span>
            <span style={{ color: 'var(--c-green)' }}>FREE</span>
            <span>COSTS $X</span>
            <span>NEED TO HIRE</span>
            <span style={{ color: 'var(--c-pink)' }}>🔒 LOCKED</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column-reverse', gap: 9 }}>
            {A.rungs.map((r) => {
              const col = `var(${r.cv})`
              const st = rungStatus(cfg, r.id, state.rungs, state.hired)
              const whyOpen = !!openWhy[r.id]
              const clickable = st.selected || st.selectable
              const blocker = !st.affordable
                ? `NEED $${st.req.cost.toLocaleString()}`
                : st.req.needsOperator && !state.hired.operator
                ? 'HIRE SUNEETI'
                : st.req.needsInterpreter && !state.hired.interpreter
                ? 'HIRE QIANNAN'
                : 'NEEDS MORE'
              const statusChip = st.selected ? 'SELECTED' : st.hardLocked ? 'LOCKED' : st.selectable ? (st.req.cost > 0 ? `$${st.req.cost.toLocaleString()}` : 'FREE') : blocker
              return (
                <div key={r.id}>
                  <div
                    style={{
                      borderRadius: 11,
                      border: `1.5px solid ${st.selected ? col : 'var(--line)'}`,
                      background: st.selected ? `color-mix(in srgb, ${col} 12%, var(--panel))` : 'var(--panel)',
                      opacity: st.hardLocked ? 0.85 : 1,
                      padding: '12px 14px',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: 13 }}>
                      <button
                        onClick={() => dispatch({ type: 'TOGGLE_RUNG', id: r.id })}
                        disabled={!clickable}
                        aria-pressed={st.selected}
                        aria-label={`${r.name}, ${st.selected ? 'selected' : st.hardLocked ? 'locked' : st.selectable ? 'available' : blocker.toLowerCase()}`}
                        style={{ flex: 1, display: 'flex', alignItems: 'center', gap: 13, background: 'transparent', border: 'none', cursor: clickable ? 'pointer' : 'not-allowed', textAlign: 'left', minHeight: 40, padding: 0, color: 'var(--text)' }}
                      >
                        <span style={{ flex: 'none', width: 26, fontFamily: mono, fontSize: 17, fontWeight: 500, color: col, textAlign: 'center' }}>{r.lvl}</span>
                        <span style={{ flex: 'none', color: col, display: 'grid', placeItems: 'center' }}><EquipmentIcon id={r.id} size={24} color={col} /></span>
                        <span style={{ flex: 1, minWidth: 0 }}>
                          <span style={{ display: 'block', fontFamily: "'Space Grotesk'", fontWeight: 600, fontSize: 14.5, color: 'var(--text)' }}>
                            {r.name} <span style={{ fontWeight: 400, fontSize: 12.5, color: 'var(--muted)' }}>· {st.req.purpose}</span>
                          </span>
                          <span style={{ display: 'block', fontFamily: mono, fontSize: 10.5, color: 'var(--muted)', marginTop: 1 }}>{r.tools}</span>
                        </span>
                        <span style={{ flex: 'none', fontFamily: mono, fontSize: 9.5, letterSpacing: '.06em', color: st.selected ? col : st.hardLocked ? 'var(--c-pink)' : 'var(--muted)', border: `1px solid ${st.selected ? col : st.hardLocked ? 'color-mix(in srgb, var(--c-pink) 40%, transparent)' : 'var(--line)'}`, padding: '3px 7px', borderRadius: 5, whiteSpace: 'nowrap' }}>{statusChip}</span>
                        <span style={{ flex: 'none', fontSize: 17, color: st.selected ? col : 'var(--muted)', width: 16, textAlign: 'center' }}>{st.selected ? '✓' : st.hardLocked ? '🔒' : ''}</span>
                      </button>
                      <button onClick={() => setOpenWhy((o) => ({ ...o, [r.id]: !o[r.id] }))} aria-expanded={whyOpen} aria-label={`Why ${r.name}?`} style={{ flex: 'none', width: 28, height: 28, borderRadius: 7, border: '1px solid var(--line)', background: whyOpen ? 'color-mix(in srgb, var(--accent) 14%, transparent)' : 'transparent', color: whyOpen ? 'var(--text)' : 'var(--muted)', cursor: 'pointer', fontFamily: mono, fontSize: 13 }}>?</button>
                    </div>

                    {/* requirement checklist, makes the lock self-evident */}
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '3px 14px', marginTop: 9, paddingLeft: 39 }}>
                      {st.reqs.map((req, i) => (
                        <span key={i} style={{ fontFamily: mono, fontSize: 10.5, color: req.na ? 'var(--muted)' : req.met ? 'var(--c-green)' : 'var(--c-pink)' }}>
                          {req.na ? '·' : req.met ? '✓' : '✗'} {req.label}
                        </span>
                      ))}
                    </div>
                  </div>
                  {whyOpen && (
                    <div style={{ margin: '6px 0 2px', padding: '10px 14px', borderLeft: `2px solid ${col}`, background: 'color-mix(in srgb, var(--panel) 80%, transparent)', borderRadius: '0 8px 8px 0', fontSize: 12.5, lineHeight: 1.55, color: 'var(--muted)' }}>
                      {A.rungWhy[r.id]}
                    </div>
                  )}
                </div>
              )
            })}
          </div>
          <div style={{ fontFamily: mono, fontSize: 11, color: 'var(--muted)', marginTop: 14 }}>
            ↑ more direct · stronger claims &nbsp;|&nbsp; ↓ {A.ladderFooter} &nbsp;·&nbsp; the red ✗ lines are the real reason a tool is locked
          </div>
        </div>

        <aside style={{ position: 'sticky', top: 0, border: '1px solid var(--line)', borderRadius: 14, background: 'var(--panel)', padding: 20 }}>
          <div style={{ fontFamily: mono, fontSize: 10, letterSpacing: '.14em', color: 'var(--muted)', marginBottom: 6 }}>YOUR CLAIM CEILING</div>
          <div style={{ fontSize: 12, color: 'var(--muted)', lineHeight: 1.5, marginBottom: 12 }}>
            Your <Define t="claim ceiling">claim ceiling</Define> is the strongest thing your tools let you honestly say.
          </div>
          <div style={{ fontFamily: "'Space Grotesk'", fontWeight: 700, fontSize: 21, color: ceilColor, lineHeight: 1.15, marginBottom: 6 }}>{ceilName}</div>
          <div style={{ height: 7, borderRadius: 7, background: 'var(--bg2)', overflow: 'hidden', margin: '14px 0 16px' }}>
            <div style={{ height: '100%', borderRadius: 7, width: `${(ceil / 5) * 100}%`, background: ceilColor, boxShadow: `0 0 12px ${ceilColor}`, transition: 'width .3s' }} />
          </div>
          <p style={{ fontSize: 13, lineHeight: 1.55, color: 'var(--muted)' }}>{A.ceilNote(ceil)}</p>
          <div style={{ marginTop: 16, paddingTop: 14, borderTop: '1px solid var(--line)', fontSize: 12.5, lineHeight: 1.5, color: 'var(--muted)' }}>
            <b style={{ color: 'var(--c-pink)', fontStyle: 'italic' }}>“{A.pinnedQuote}”</b> {A.ceilingAside}
          </div>
        </aside>
      </div>
    </div>
  )
}
