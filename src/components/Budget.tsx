// The grant ledger: a clear, always-reachable view of the $ economy that gates
// the Measurement Ladder. It reads the SAME resources.ts functions the engine
// uses, so spent / remaining / unlock requirements can never drift from the
// actual gating. Act-aware (reads getAct(state.act).resource). This is the
// SPENDABLE currency; Research Points (progress.ts) are recognition only and
// are deliberately kept out of here.

import { getAct } from '../content/registry'
import { remaining, rungStatus, spent } from '../content/resources'
import type { LoopState } from '../state/loop'

const mono = "'IBM Plex Mono'"

/** Compact "$Nk" for chips and tight rows. Costs are whole thousands. */
function k(n: number): string {
  return `$${Math.round(n / 1000)}k`
}

/** Header chip: remaining grant at a glance, opens the full ledger. */
export function BudgetChip({ state, onOpen }: { state: LoopState; onOpen: () => void }) {
  const cfg = getAct(state.act).resource
  const left = remaining(cfg, state.rungs, state.hired)
  const tight = left < cfg.hireCost.interpreter
  const tone = tight ? 'var(--c-amber)' : 'var(--c-green)'
  return (
    <button
      onClick={onOpen}
      title="Your grant: what you have spent and how much is left to unlock tools. (Not the same as Research Points.)"
      style={{ display: 'flex', alignItems: 'center', gap: 7, minHeight: 30, padding: '4px 10px', borderRadius: 8, border: `1px solid color-mix(in srgb, ${tone} 40%, var(--line))`, background: `color-mix(in srgb, ${tone} 8%, transparent)`, cursor: 'pointer', color: 'var(--text)' }}
    >
      <span style={{ fontSize: 12, flex: 'none' }}>💰</span>
      <span style={{ display: 'grid', lineHeight: 1.05, textAlign: 'left' }}>
        <span style={{ fontFamily: "'Space Grotesk'", fontWeight: 700, fontSize: 11 }}>{k(left)}</span>
        <span style={{ fontFamily: mono, fontSize: 9, color: 'var(--muted)', letterSpacing: '.06em' }}>grant left</span>
      </span>
    </button>
  )
}

/** The full grant ledger overlay: totals, what was spent, and the cost + unlock
 *  requirement of every option. */
export function BudgetPanel({ state, onClose }: { state: LoopState; onClose: () => void }) {
  const A = getAct(state.act)
  const cfg = A.resource
  const used = spent(cfg, state.rungs, state.hired)
  const left = cfg.startingBudget - used
  const pct = Math.min(100, (used / cfg.startingBudget) * 100)

  const purchasedRungs = A.rungs.filter((r) => state.rungs.includes(r.id) && cfg.reqMap[r.id].cost > 0)
  const hires = [
    { role: 'operator' as const, label: 'Trained operator', cost: cfg.hireCost.operator, on: state.hired.operator },
    { role: 'interpreter' as const, label: 'Data interpreter', cost: cfg.hireCost.interpreter, on: state.hired.interpreter },
  ]

  const row = { display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, border: '1px solid var(--line)', borderRadius: 9, background: 'var(--panel2)', padding: '8px 12px', fontSize: 13.5 } as const

  return (
    <div onClick={onClose} style={{ position: 'fixed', inset: 0, zIndex: 35, background: 'color-mix(in srgb, #000 62%, transparent)', backdropFilter: 'blur(4px)', display: 'grid', placeItems: 'center', padding: 16 }}>
      <div onClick={(e) => e.stopPropagation()} style={{ width: 'min(640px, 100%)', maxHeight: '86vh', overflow: 'auto', border: '1px solid var(--line)', borderRadius: 16, background: 'var(--panel)' }}>
        {/* header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, padding: '16px 20px', borderBottom: '1px solid var(--line)', background: 'color-mix(in srgb, var(--c-green) 6%, var(--bg2))' }}>
          <div>
            <div style={{ fontFamily: mono, fontSize: 10.5, letterSpacing: '.14em', color: 'var(--c-green)' }}>💰 YOUR GRANT LEDGER</div>
            <div style={{ fontFamily: "'Space Grotesk'", fontWeight: 700, fontSize: 18, marginTop: 3 }}>
              ${left.toLocaleString()} left <span style={{ fontFamily: mono, fontSize: 12, color: 'var(--muted)' }}>· of ${cfg.startingBudget.toLocaleString()} pilot grant</span>
            </div>
          </div>
          <button onClick={onClose} aria-label="Close" style={{ minHeight: 36, minWidth: 36, borderRadius: 8, border: '1px solid var(--line)', background: 'transparent', color: 'var(--text)', cursor: 'pointer', fontSize: 16 }}>✕</button>
        </div>

        <div style={{ padding: '14px 18px' }}>
          {/* spent bar */}
          <div style={{ border: '1px solid var(--line)', borderRadius: 12, background: 'var(--panel2)', padding: '12px 14px', marginBottom: 13 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: mono, fontSize: 11, marginBottom: 8 }}>
              <span style={{ color: 'var(--muted)' }}>SPENT ${used.toLocaleString()}</span>
              <span style={{ color: left > 0 ? 'var(--c-green)' : 'var(--c-amber)' }}>${left.toLocaleString()} left</span>
            </div>
            <div style={{ height: 8, borderRadius: 6, background: 'var(--bg2)', overflow: 'hidden' }}>
              <div style={{ height: '100%', width: `${pct}%`, background: 'var(--c-amber)', transition: 'width .4s' }} />
            </div>
          </div>

          <p style={{ fontSize: 12.5, color: 'var(--muted)', lineHeight: 1.55, marginBottom: 16 }}>
            A one-time pilot award. It does not refill. Spend it on tools and the people to run them, and remember the two top rungs are not for sale at any price. (Research Points are separate: they mark good science and never spend here.)
          </p>

          {/* what you have spent */}
          <div style={{ fontFamily: mono, fontSize: 10, letterSpacing: '.14em', color: 'var(--muted)', marginBottom: 9 }}>WHAT YOU HAVE SPENT</div>
          {used > 0 ? (
            <div style={{ display: 'grid', gap: 6, marginBottom: 18 }}>
              {purchasedRungs.map((r) => (
                <div key={r.id} style={row}>
                  <span>{r.name}</span>
                  <span style={{ fontFamily: mono, color: 'var(--c-amber)' }}>-${cfg.reqMap[r.id].cost.toLocaleString()}</span>
                </div>
              ))}
              {hires.filter((h) => h.on).map((h) => (
                <div key={h.role} style={row}>
                  <span>{h.label} (hired)</span>
                  <span style={{ fontFamily: mono, color: 'var(--c-amber)' }}>-${h.cost.toLocaleString()}</span>
                </div>
              ))}
            </div>
          ) : (
            <div style={{ fontSize: 12.5, color: 'var(--muted)', marginBottom: 18 }}>Nothing spent yet. The free bottom rung costs you nothing.</div>
          )}

          {/* unlock table */}
          <div style={{ fontFamily: mono, fontSize: 10, letterSpacing: '.14em', color: 'var(--muted)', marginBottom: 9 }}>WHAT EACH OPTION COSTS, AND WHAT UNLOCKS IT</div>
          <div style={{ display: 'grid', gap: 8 }}>
            {A.rungs.map((r) => {
              const st = rungStatus(cfg, r.id, state.rungs, state.hired)
              const req = cfg.reqMap[r.id]
              const cost = req.cost

              let badge: { text: string; color: string }
              if (st.selected) badge = { text: '✓ Purchased', color: 'var(--c-green)' }
              else if (st.hardLocked) badge = { text: '🔒 Locked', color: 'var(--c-red)' }
              else if (st.selectable) badge = { text: 'Available now', color: 'var(--c-green)' }
              else badge = { text: 'Not yet', color: 'var(--c-amber)' }

              let note = ''
              if (st.hardLocked) {
                note = 'Locked in this lab: ' + st.reqs.filter((q) => !q.na && !q.met).map((q) => q.label).join('; ')
              } else if (!st.selected && !st.selectable) {
                const needs: string[] = []
                if (req.needsOperator && !state.hired.operator) needs.push(`hire a trained operator (${k(cfg.hireCost.operator)})`)
                if (req.needsInterpreter && !state.hired.interpreter) needs.push(`hire a data interpreter (${k(cfg.hireCost.interpreter)})`)
                const avail = remaining(cfg, state.rungs.filter((x) => x !== r.id), state.hired)
                const short = cost - avail
                if (short > 0) needs.push(`find $${short.toLocaleString()} more in the grant`)
                note = 'To unlock: ' + needs.join(' · ')
              }

              return (
                <div key={r.id} style={{ border: `1px solid ${st.selected ? 'color-mix(in srgb, var(--c-green) 40%, var(--line))' : 'var(--line)'}`, borderRadius: 11, background: 'var(--panel2)', padding: '11px 13px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <span style={{ width: 10, height: 10, borderRadius: '50%', background: `var(${r.cv})`, flex: 'none' }} />
                    <span style={{ flex: 1, minWidth: 0 }}>
                      <span style={{ display: 'block', fontFamily: "'Space Grotesk'", fontWeight: 600, fontSize: 14 }}>{r.name}</span>
                      <span style={{ fontSize: 12, color: 'var(--muted)' }}>{req.purpose}</span>
                    </span>
                    <span style={{ flex: 'none', textAlign: 'right' }}>
                      <span style={{ display: 'block', fontFamily: mono, fontSize: 12.5, color: 'var(--text)' }}>{cost === 0 ? 'Free' : `$${cost.toLocaleString()}`}</span>
                      <span style={{ fontFamily: mono, fontSize: 10.5, color: badge.color }}>{badge.text}</span>
                    </span>
                  </div>
                  {note && <div style={{ marginTop: 7, fontSize: 11.5, color: 'var(--muted)', lineHeight: 1.5 }}>{note}</div>}
                </div>
              )
            })}

            {/* the people you can hire */}
            {hires.map((h) => {
              const short = h.cost - left
              const status = h.on
                ? { text: '✓ Hired', color: 'var(--c-green)' }
                : left >= h.cost
                  ? { text: 'Can hire now', color: 'var(--c-green)' }
                  : { text: `needs $${short.toLocaleString()} more`, color: 'var(--c-amber)' }
              return (
                <div key={h.role} style={{ border: `1px solid ${h.on ? 'color-mix(in srgb, var(--c-green) 40%, var(--line))' : 'var(--line)'}`, borderRadius: 11, background: 'var(--panel2)', padding: '11px 13px', display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span style={{ fontSize: 15, flex: 'none' }}>{h.on ? '🧑‍🔬' : '👤'}</span>
                  <span style={{ flex: 1, minWidth: 0, fontFamily: "'Space Grotesk'", fontWeight: 600, fontSize: 14 }}>{h.label}</span>
                  <span style={{ flex: 'none', textAlign: 'right' }}>
                    <span style={{ display: 'block', fontFamily: mono, fontSize: 12.5 }}>${h.cost.toLocaleString()}</span>
                    <span style={{ fontFamily: mono, fontSize: 10.5, color: status.color }}>{status.text}</span>
                  </span>
                </div>
              )
            })}
          </div>

          <p style={{ fontSize: 11.5, color: 'var(--muted)', lineHeight: 1.5, marginTop: 14 }}>
            You set your tools in <b style={{ color: 'var(--text)' }}>Choose tools</b> (step 3). This ledger just keeps the running tally.
          </p>
        </div>
      </div>
    </div>
  )
}
