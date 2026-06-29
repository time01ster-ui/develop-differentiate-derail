// Lab-report builder: turn a finished run's client state into a structured,
// hand-in record. PURE and deterministic (no Date, no DOM): the view layer
// (components/LabReport.tsx) stamps the student name + export date at print
// time, so nothing here is stored anywhere. This is what keeps the export
// FERPA-safe: it reads only the reducer state, the content pack, the local
// reflections, and the earned badges, and writes nothing back.
//
// It closes the one real gap from the 2026-06-29 audit (item #13): a writable,
// exportable CER + Limitation artifact the student can actually hand in.

import { getAct } from '../content/registry'
import { STAGE_LABELS } from '../content/act1'
import { spent } from '../content/resources'
import { bench, benchAgreement } from './bench'
import { embryoMeans, fmtP, mean, perEmbryoWelch, pooledCellCount, type ExperimentData } from './measure'
import { badgeById, rankOf, xpOf } from './progress'
import type { Reflections } from './reflections'
import { ceiling, type LoopState } from '../state/loop'

export interface ReportRow {
  k: string
  v: string
}

/** Claim · Evidence · Reasoning · Limitation, the audit's item #13. */
export interface ReportCER {
  claim: string
  supported: boolean
  evidence: string
  reasoning: string
  limitation: string
}

export interface ReportSixRs {
  stage: string
  revised: string
  next: string
}

export interface LabReport {
  actLabel: string // "Act I · Develop"
  caseLine: string // the one-line case framing for this act
  question: string
  hypothesis: string
  prediction: string
  tools: string[] // selected rung names, ladder order
  ceilingName: string
  budgetSpent: number
  budgetTotal: number
  hires: string[]
  design: ReportRow[]
  measurements: ReportRow[]
  analyze: string
  cer: ReportCER
  sixRs: ReportSixRs[]
  badges: { label: string; points: number }[]
  rank: string
  xp: number
}

/** Per-act framing + the two comparison-group labels (what "treat" / "ctrl" mean). */
const ACT_FRAMING: Record<string, { caseLine: string; treat: string; ctrl: string }> = {
  develop: { caseLine: 'Baby Mateo case · neural-crest spacing in the developing frontal bone', treat: 'FN1-rich tissue', ctrl: 'FN1-blocked (control)' },
  differentiate: { caseLine: 'Baby Mateo case · what tips a crest cell toward bone or cartilage (mechanotransduction bench, a model)', treat: 'model setting', ctrl: 'baseline' },
  derail: { caseLine: 'Sibling-carcinoma invasive margin (a clearly-labeled model, not a patient)', treat: 'Invasive margin', ctrl: 'Matched normal tissue' },
}

const ROMAN: Record<number, string> = { 1: 'I', 2: 'II', 3: 'III' }

/** The honest-design label, worded per act (Act I labels distance; II/III label the model). */
function honestyLabel(s: LoopState): string {
  if (s.act === 'develop') return s.distance === '2d' ? '2D-projected (labeled honestly)' : s.distance === '3d' ? '3D (labeled honestly)' : 'not labeled'
  return s.modelLabeled ? 'Model-labeled (not a patient)' : 'not labeled'
}

/** Measurements + the pseudoreplication / agreement read, both drawn per act. */
function measureSections(s: LoopState, data: ExperimentData | undefined, treat: string, ctrl: string): { measurements: ReportRow[]; analyze: string; evidence: string } {
  // Act II: the mechanotransduction bench (a model the student sets by hand).
  if (s.act === 'differentiate') {
    const r = bench(s.stiffness, s.shape)
    const agree = benchAgreement(s.stiffness, s.shape, s.replicates)
    const measurements: ReportRow[] = [
      { k: 'Bench setting', v: `stiffness ${Math.round(s.stiffness * 100)}% · spread ${Math.round(s.shape * 100)}%` },
      { k: 'Nuclear YAP/TAZ', v: `${Math.round(r.nuclear * 100)}%` },
      { k: 'Model lean', v: `${r.fate} (${Math.round(r.confidence * 100)}% decisive)` },
      { k: 'Targets', v: `CTGF ${Math.round(r.ctgf * 100)}% · CYR61 ${Math.round(r.cyr61 * 100)}%` },
    ]
    const analyze = `Across ${s.replicates} model runs, ${Math.round(agree * 100)}% agreed with the ${r.fate} lean. Agreement across runs, not one dramatic reading, is what makes a model lean trustworthy. This is a model you set, not a stiffness measured in Mateo.`
    const evidence = `Model bench: nuclear YAP/TAZ ${Math.round(r.nuclear * 100)}% at stiffness ${Math.round(s.stiffness * 100)}% / spread ${Math.round(s.shape * 100)}%, leaning ${r.fate} (${Math.round(r.confidence * 100)}% decisive), with ${Math.round(agree * 100)}% agreement across ${s.replicates} runs.`
    return { measurements, analyze, evidence }
  }

  // Acts I + III: the real Voronoi nearest-neighbor spacing engine on two groups.
  if (!data) {
    return { measurements: [{ k: 'Measurements', v: 'not recorded' }], analyze: '', evidence: 'spatial spacing comparison (no data captured)' }
  }
  const emb = perEmbryoWelch(data)
  const treatMean = mean(embryoMeans(data.treat))
  const ctrlMean = mean(embryoMeans(data.ctrl))
  const embSig = emb.p < 0.05
  const cells = pooledCellCount(data)
  const measurements: ReportRow[] = [
    { k: `${treat} · mean spacing (rel.)`, v: treatMean.toFixed(4) },
    { k: `${ctrl} · mean spacing (rel.)`, v: ctrlMean.toFixed(4) },
    { k: 'Replicates (real n)', v: `${data.reps}` },
    { k: 'Honest per-replicate test', v: `p ${fmtP(emb.p)}${embSig ? ' · significant' : ' · not significant'}` },
  ]
  // The pseudoreplication point is about INFLATED n, not a visible p gap: with a
  // clean separation both tests can read "p < 0.001", so we frame it around the
  // sample size (3 real replicates vs treating all `cells` cells as independent),
  // mirroring the app's own analyzeLesson. Saying "trust the smaller p" would be
  // confusing when both display the same value.
  const analyze = `Only the ${data.reps} replicates count as the real sample (n=${data.reps}), and the honest per-replicate test already finds a clear difference (p ${fmtP(emb.p)}). Pooling treats all ${cells} cells across those replicates as if each were its own experiment, inflating the sample far past ${data.reps}. That inflation is what makes a pooled result look more certain than the evidence supports, which is pseudoreplication, so the per-replicate test is the one to trust. Spacing here is a relative nearest-neighbor index in normalized image units; a larger number means cells sit farther apart.`
  const evidence = `Nearest-neighbor spacing (relative, normalized units; larger = farther apart), ${treat} vs ${ctrl}, measured per replicate (n=${data.reps}). Honest test p ${fmtP(emb.p)}; mean ${treatMean.toFixed(4)} vs ${ctrlMean.toFixed(4)}.`
  return { measurements, analyze, evidence }
}

/**
 * Build the full lab report from the finished run. `data` is the Act I/III
 * experiment (the same object the Iterate stage already holds); it is unused by
 * Act II and may be omitted there.
 */
export function buildReport(state: LoopState, reflections: Reflections, badgeIds: string[], data?: ExperimentData): LabReport {
  const A = getAct(state.act)
  const frame = ACT_FRAMING[state.act] ?? ACT_FRAMING.develop
  const cfg = A.resource
  const ceil = ceiling(state.rungs, state.act)
  const ceilingName = A.rungNames[ceil] ?? 'No tools selected'

  const q = A.questions.find((x) => x.id === state.qChoice)
  const hyp = A.hypotheses.find((x) => x.id === state.hypChoice)
  const claim = A.claims.find((x) => x.id === state.claim)

  const tools = A.rungs
    .filter((r) => state.rungs.includes(r.id))
    .sort((a, b) => a.lvl - b.lvl)
    .map((r) => r.name)

  const hires: string[] = []
  if (state.hired.operator) hires.push('trained operator')
  if (state.hired.interpreter) hires.push('data interpreter')

  const repWord = state.act === 'differentiate' ? 'model runs' : state.act === 'derail' ? 'sample regions' : 'embryos'
  const design: ReportRow[] = [
    { k: 'Control group', v: state.control ? 'on' : 'off' },
    { k: 'Replicates', v: `${state.replicates} ${repWord}` },
    { k: 'Honesty label', v: honestyLabel(state) },
  ]

  const { measurements, analyze, evidence } = measureSections(state, data, frame.treat, frame.ctrl)

  // A claim is supported iff it sits at or below the evidence ceiling. This is
  // the reducer's own rule (claimResult = ok ? 'valid' : 'blocked', ok = req <=
  // ceiling), recomputed from the PERSISTED claim id + rungs rather than the
  // transient claimResult, so an exported report stays correct even if the page
  // was reloaded on the Iterate stage (claimResult is not carried in the URL).
  const supported = !!claim && claim.req <= ceil
  const cer: ReportCER = {
    claim: claim ? claim.text : 'No claim logged.',
    supported,
    evidence,
    reasoning: supported
      ? `The evidence reaches the ${ceilingName} rung, and this claim sits at or below that rung. A stronger claim would need a tool this lab does not have, so the run stops here.`
      : `This claim sits above the ${ceilingName} rung the evidence reached, so it is not supported. The honest move is to claim only what the evidence backs, or to go back and run a more direct tool.`,
    limitation: `${A.pinnedQuote} ${A.ceilingAside}`,
  }

  const sixRs: ReportSixRs[] = STAGE_LABELS.map((stage, i) => ({
    stage,
    revised: (reflections[i]?.revision ?? '').trim(),
    next: (reflections[i]?.todos ?? '').trim(),
  })).filter((r) => r.revised || r.next)

  const badges = badgeIds
    .map(badgeById)
    .filter((b): b is NonNullable<typeof b> => !!b)
    .map((b) => ({ label: b.label, points: b.points }))
  const xp = xpOf(badgeIds)

  return {
    actLabel: `Act ${ROMAN[A.index] ?? 'I'} · ${A.shortTitle}`,
    caseLine: frame.caseLine,
    question: q ? q.text : 'No question selected.',
    hypothesis: hyp ? hyp.text : 'No hypothesis selected.',
    prediction: hyp ? hyp.prediction : '',
    tools: tools.length ? tools : ['No tools selected'],
    ceilingName,
    budgetSpent: spent(cfg, state.rungs, state.hired),
    budgetTotal: cfg.startingBudget,
    hires,
    design,
    measurements,
    analyze,
    cer,
    sixRs,
    badges,
    rank: rankOf(xp).name,
    xp,
  }
}

// --- portable .html export ---------------------------------------------------
// A self-contained document a student can keep or email offline. Kept here (not
// in the component) so it stays pure and testable. All interpolated text is
// escaped: the only untrusted input is the student name, but escaping the whole
// document is the safe default.

function esc(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')
}

function rowsHtml(rows: ReportRow[]): string {
  return rows.map((r) => `<div class="row"><span class="k">${esc(r.k)}</span><span class="v">${esc(r.v)}</span></div>`).join('')
}

/** Build a standalone HTML document string for the report. */
export function reportToHtml(r: LabReport, name: string, date: string): string {
  const sixRs = r.sixRs
    .map(
      (x) =>
        `<div class="rev"><div class="rev-stage">${esc(x.stage)}</div>${x.revised ? `<div><span class="tag g">REVISED</span>${esc(x.revised)}</div>` : ''}${x.next ? `<div class="muted"><span class="tag gold">NEXT</span>${esc(x.next)}</div>` : ''}</div>`,
    )
    .join('')
  const badges = r.badges.map((b) => `<span class="badge">${esc(b.label)} · ${b.points}</span>`).join('')
  return `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<title>Lab Report - ${esc(r.actLabel)} - ${esc(name || 'student')}</title>
<style>
  :root{--ink:#19251c;--muted:#5c6b60;--rule:#e2e8e2;--green:#1f9d57;--gold:#caa01e;--blocked:#c0392b}
  *{box-sizing:border-box}
  body{margin:0;background:#eef2ee;color:var(--ink);font-family:'IBM Plex Sans',system-ui,Segoe UI,Roboto,sans-serif;line-height:1.55}
  .paper{max-width:820px;margin:28px auto;background:#fff;border-radius:12px;box-shadow:0 14px 40px rgba(0,0,0,.18);padding:40px 44px 48px}
  .mast{display:flex;justify-content:space-between;align-items:flex-start;gap:16px;border-bottom:2px solid var(--green);padding-bottom:16px}
  h1{font-family:'Space Grotesk',system-ui,sans-serif;font-size:25px;margin:6px 0 2px}
  .eyebrow{font-family:'IBM Plex Mono',ui-monospace,monospace;font-size:10px;letter-spacing:.16em;color:var(--muted)}
  .case{font-size:12.5px;color:var(--muted)}
  .rank{text-align:right;font-size:12px}
  .rank .n{font-family:'Space Grotesk',sans-serif;font-weight:700;font-size:15px;color:var(--green)}
  .who{display:flex;justify-content:space-between;gap:16px;margin-top:14px;flex-wrap:wrap;font-size:13px}
  .who b{border-bottom:${name ? 'none' : '1px solid var(--muted)'};min-width:180px;display:inline-block}
  section{margin-top:22px}
  .kick{font-family:'IBM Plex Mono',ui-monospace,monospace;font-size:10px;letter-spacing:.16em;text-transform:uppercase;color:var(--green);margin-bottom:8px}
  p{margin:0;font-size:14px}
  .row{display:flex;justify-content:space-between;gap:16px;padding:6px 0;border-bottom:1px solid var(--rule)}
  .k{font-size:12.5px;color:var(--muted)} .v{font-size:12.5px;font-weight:600;text-align:right}
  .cer{margin-top:24px;border:1.5px solid var(--green);border-radius:12px;padding:18px 20px;background:rgba(31,157,87,.05)}
  .pill{font-family:'IBM Plex Mono',monospace;font-size:10px;font-weight:700;letter-spacing:.08em;padding:3px 8px;border-radius:5px;color:#fff;display:inline-block;margin-bottom:10px}
  .cer-row{margin-bottom:9px;font-size:13.5px}
  .tag{font-family:'IBM Plex Mono',monospace;font-size:9.5px;font-weight:700;letter-spacing:.12em;margin-right:8px}
  .g{color:var(--green)} .gold{color:var(--gold)}
  .muted{color:var(--muted)}
  .rev{margin-bottom:10px} .rev-stage{font-family:'Space Grotesk',sans-serif;font-weight:700;font-size:13px;margin-bottom:2px}
  .badge{display:inline-block;font-size:11.5px;padding:4px 10px;border-radius:20px;border:1px solid var(--green);background:rgba(31,157,87,.07);margin:0 8px 8px 0}
  .foot{margin-top:26px;padding-top:12px;border-top:1px solid var(--rule);font-size:10.5px;color:var(--muted);font-family:'IBM Plex Mono',monospace;letter-spacing:.04em}
  @media print{body{background:#fff}.paper{box-shadow:none;margin:0;max-width:none;border-radius:0}}
</style></head><body><div class="paper">
  <div class="mast">
    <div><div class="eyebrow">JOHN HAY BIOMEDICAL · DISCOVERY LAB REPORT</div><h1>${esc(r.actLabel)}</h1><div class="case">${esc(r.caseLine)}</div></div>
    <div class="rank"><div class="eyebrow">RANK</div><div class="n">${esc(r.rank)}</div><div class="muted">${r.xp} research points</div></div>
  </div>
  <div class="who"><div>Student: <b>${esc(name || ' ')}</b></div><div class="muted">Date: ${esc(date)}</div></div>
  <section><div class="kick">01 · Question (Ask)</div><p>${esc(r.question)}</p></section>
  <section><div class="kick">02 · Hypothesis &amp; prediction</div><p>${esc(r.hypothesis)}</p>${r.prediction ? `<p class="muted" style="margin-top:4px;font-size:13px"><span class="tag g">PREDICTION</span>${esc(r.prediction)}</p>` : ''}</section>
  <section><div class="kick">03 · Tools &amp; budget</div>${rowsHtml([{ k: 'Tools selected', v: r.tools.join(' · ') }, { k: 'Evidence ceiling', v: r.ceilingName }, { k: 'Team hired', v: r.hires.length ? r.hires.join(' · ') : 'none' }, { k: 'Grant spent', v: `$${r.budgetSpent.toLocaleString()} of $${r.budgetTotal.toLocaleString()}` }])}</section>
  <section><div class="kick">04 · Design</div>${rowsHtml(r.design)}</section>
  <section><div class="kick">05 · Measurements (Run)</div>${rowsHtml(r.measurements)}</section>
  <section><div class="kick">06 · Analysis</div><p style="font-size:13.5px">${esc(r.analyze)}</p></section>
  <div class="cer">
    <div class="kick">07 · Conclusion · Claim · Evidence · Reasoning · Limitation</div>
    <span class="pill" style="background:${r.cer.supported ? 'var(--green)' : 'var(--blocked)'}">${r.cer.supported ? 'SUPPORTED' : 'NOT SUPPORTED'}</span>
    <div class="cer-row"><span class="tag g">CLAIM</span>${esc(r.cer.claim)}</div>
    <div class="cer-row"><span class="tag g">EVIDENCE</span>${esc(r.cer.evidence)}</div>
    <div class="cer-row"><span class="tag g">REASONING</span>${esc(r.cer.reasoning)}</div>
    <div class="cer-row"><span class="tag gold">LIMITATION</span>${esc(r.cer.limitation)}</div>
  </div>
  ${r.sixRs.length ? `<section><div class="kick">08 · What I corrected (the 6 Rs · ${r.sixRs.filter((x) => x.revised).length} ${r.sixRs.filter((x) => x.revised).length === 1 ? 'step' : 'steps'} revised)</div>${sixRs}</section>` : ''}
  ${r.badges.length ? `<section><div class="kick">Badges earned</div>${badges}</section>` : ''}
  <div class="foot">Generated locally from this run. No data left the browser. Develop · Differentiate · Derail · mendozabiomed.org</div>
</div></body></html>`
}
