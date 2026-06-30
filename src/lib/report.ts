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
import { CLAIM_CER, CONTROLS, STAGE_LABELS } from '../content/act1'
import { spent } from '../content/resources'
import { bench, benchAgreement } from './bench'
import { buildExperiment, embryoMeans, fmtP, mean, perEmbryoWelch, pooledCellCount, type ExperimentData } from './measure'
import { badgeById, rankOf, xpOf } from './progress'
import { emptyReflection, type Reflections } from './reflections'
import { ceiling, freshAct, loopReducer, type Action, type LoopState } from '../state/loop'

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

/** One of the five questions an abstract answers, with the raw material from the
 *  student's run. In the student report these are PROMPTS to compose from, not
 *  finished sentences. */
export interface AbstractPart {
  label: string
  prompt: string
  ingredient: string
}

// Frames for the parts the student must compose themselves, so the report scaffolds
// the writing instead of handing over finished prose. Used only in the student
// report (scaffold mode); the exemplar still shows the complete model.
export const SCAFFOLD = {
  abstractIntro:
    'Write your abstract LAST, after the rest of the report. It is one paragraph (about 150 to 300 words) that answers five questions. Your run gives you the raw material for each; put it into your own sentences on the lines provided.',
  reasoning: 'Explain WHY your evidence supports your claim, using the science. Try: "My evidence shows ___, which supports my claim because ___."',
  limitation: 'Name one thing your evidence does NOT let you claim, and why. Try: "This shows ___, not ___, because ___."',
}

export interface LabReport {
  actLabel: string // "Act I · Develop"
  caseLine: string // the one-line case framing for this act
  abstract: string // a model abstract drafted from the run (written last; answers the 5 questions)
  abstractParts: AbstractPart[] // the five questions + the student's raw ingredients, to compose from
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
  // Act III groups: treat = the ordered/regular field = matched normal tissue;
  // ctrl = the disordered field = the invasive margin (matches AnalyzeStage3).
  derail: { caseLine: 'Sibling-carcinoma invasive margin (a clearly-labeled model, not a patient)', treat: 'Matched normal tissue', ctrl: 'Invasive margin' },
}

const ROMAN: Record<number, string> = { 1: 'I', 2: 'II', 3: 'III' }

/** The honest-design label, worded per act (Act I labels distance; II/III label the model). */
function honestyLabel(s: LoopState): string {
  if (s.act === 'develop') return s.distance === '2d' ? '2D-projected (labeled honestly)' : s.distance === '3d' ? '3D (labeled honestly)' : 'not labeled'
  return s.modelLabeled ? 'Model-labeled (not a patient)' : 'not labeled'
}

/** Measurements + the pseudoreplication / agreement read, both drawn per act. */
function measureSections(s: LoopState, data: ExperimentData | undefined, treat: string, ctrl: string): { measurements: ReportRow[]; analyze: string; evidence: string; finding: string } {
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
    const finding = `the model leaned ${r.fate} (${Math.round(r.confidence * 100)}% decisive), and ${Math.round(agree * 100)}% of the ${s.replicates} runs agreed`
    return { measurements, analyze, evidence, finding }
  }

  // Acts I + III: the real Voronoi nearest-neighbor spacing engine on two groups.
  if (!data) {
    return { measurements: [{ k: 'Measurements', v: 'not recorded' }], analyze: '', evidence: 'spatial spacing comparison (no data captured)', finding: 'no measurement was captured' }
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
  const finding = `the ${treat} was ${treatMean > ctrlMean ? 'more spread out' : 'more crowded'} than the ${ctrl} (mean relative spacing ${treatMean.toFixed(4)} versus ${ctrlMean.toFixed(4)}; honest per-replicate test p ${fmtP(emb.p)}, n=${data.reps})`
  return { measurements, analyze, evidence, finding }
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

  // Act I: the control is chosen from candidates, so report which control(s) and
  // their role (the discussion becomes part of the scientific argument).
  const chosenGoodControls = state.act === 'develop' ? CONTROLS.filter((c) => c.good && state.controlChoices.includes(c.id)) : []
  const controlSummary =
    state.act === 'develop'
      ? chosenGoodControls.length
        ? chosenGoodControls.map((c) => (c.kind === 'negative' ? 'FN1-blocked tissue (negative control)' : 'a known-ordered sample (positive control)')).join(' + ')
        : 'none chosen'
      : state.control
        ? 'on'
        : 'off'
  const design: ReportRow[] = [
    { k: 'Control', v: controlSummary },
    { k: 'Replicates', v: `${state.replicates} ${repWord}` },
    { k: 'Honesty label', v: honestyLabel(state) },
  ]

  const { measurements, analyze, evidence, finding } = measureSections(state, data, frame.treat, frame.ctrl)

  // A claim is supported iff it sits at or below the evidence ceiling. This is
  // the reducer's own rule (claimResult = ok ? 'valid' : 'blocked', ok = req <=
  // ceiling), recomputed from the PERSISTED claim id + rungs rather than the
  // transient claimResult, so an exported report stays correct even if the page
  // was reloaded on the Iterate stage (claimResult is not carried in the URL).
  const supported = !!claim && claim.req <= ceil
  // Fold the control into the evidence (the control is part of the argument), and
  // prefer the deeper per-claim reasoning (why it is or is not supported) for Act I.
  const cerEvidence = state.act === 'develop' && chosenGoodControls.length ? `${evidence} Control: ${controlSummary}.` : evidence
  const deepReason = state.act === 'develop' && claim && CLAIM_CER[claim.id] ? (supported ? CLAIM_CER[claim.id].supported : CLAIM_CER[claim.id].notSupported) : ''
  const cer: ReportCER = {
    claim: claim ? claim.text : 'No claim logged.',
    supported,
    evidence: cerEvidence,
    reasoning:
      deepReason ||
      (supported
        ? `The evidence reaches the ${ceilingName} rung, and this claim sits at or below that rung. A stronger claim would need a tool this lab does not have, so the run stops here.`
        : `This claim sits above the ${ceilingName} rung the evidence reached, so it is not supported. The honest move is to claim only what the evidence backs, or to go back and run a more direct tool.`),
    limitation: `${A.pinnedQuote} ${A.ceilingAside}`,
  }

  // A model abstract drafted from the run as connected prose (the student refines
  // it). Scientists write the abstract LAST because it summarizes the whole report;
  // it answers what / why / how / found / means, names the control once, and ties
  // the conclusion to its evidence.
  const claimClean = (claim ? claim.text : 'no claim was logged').replace(/\.$/, '')
  const claimLc = claimClean.charAt(0).toLowerCase() + claimClean.slice(1)
  const motivation =
    state.act === 'develop'
      ? 'Where these cells settle helps build the frontal bone, so whether they arrange themselves on purpose is worth testing.'
      : state.act === 'derail'
        ? 'How ordered the cells are at a tumor margin is a clue to how the tissue invades, so it is worth measuring.'
        : 'What tips a cell toward bone or cartilage is a clue to how the skeleton forms, so it is worth modeling.'
  const methodSentence =
    state.act === 'differentiate'
      ? `To test this, we set a mechanotransduction bench and read the bone-versus-cartilage lean across ${state.replicates} model runs, comparing against a soft, round-cell baseline.`
      : `To test this, we measured the nearest-neighbor spacing of cell nuclei in ${frame.treat}, comparing it against ${frame.ctrl}${state.act === 'develop' && state.controlChoices.includes('pos') ? ' and a known-ordered positive control' : ''}, across ${state.replicates} ${repWord}.`
  const limitBridge =
    state.act === 'develop'
      ? 'We measured spacing, not force, so this shows the cells are organized, not that anything is pulling them: spatial organization is not the same thing as tension.'
      : `One limit: ${A.pinnedQuote}`
  const abstract = `${q ? q.text : 'We set out to test a question.'} ${motivation} ${methodSentence} We found that ${finding}. We conclude that ${claimLc}, because the difference from the control is ${supported ? 'unlikely to be due to chance' : 'not yet strong enough to claim'}. ${limitBridge}`

  // The same five pieces, but as PROMPTS with the run's raw material (not finished
  // sentences). The student report shows these so the student composes the abstract;
  // the exemplar still shows the prose above as the model.
  const cap = (s: string) => (s ? s.charAt(0).toUpperCase() + s.slice(1) : s)
  const abstractParts: AbstractPart[] = [
    { label: 'What you asked', prompt: 'State your question in one sentence.', ingredient: q ? q.text : '(the question you chose)' },
    { label: 'Why it matters', prompt: 'One sentence: why is this question worth answering?', ingredient: 'Think: who does this help, or what does it explain? (the case is your clue)' },
    { label: 'How you tested it', prompt: 'One sentence: your method and design.', ingredient: cap(methodSentence.replace(/^To test this, we /, 'we ')) },
    { label: 'What you found', prompt: 'One sentence: your result, with the numbers.', ingredient: cap(finding) },
    { label: 'What it means', prompt: 'One or two sentences: your conclusion, plus one honest limit.', ingredient: `${claimClean}. Limit: ${A.pinnedQuote}` },
  ]

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
    abstract,
    abstractParts,
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

// --- shared example (the exemplar shown at the start + the portal PDF) --------
// One completed Act I run, driven through the real reducer, so the exemplar a
// student reviews up front is exactly the artifact they will export at the end.

/** The student name + date shown on the example (clearly an example, not real). */
export const EXAMPLE_NAME = 'Jordan Rivera (sample student)'
export const EXAMPLE_DATE = 'Example run, Act I'

export function buildExampleReport(): LabReport {
  const A = getAct('develop')
  const free = A.rungs.find((r) => r.lvl === 1)!
  const acts: Action[] = [
    { type: 'PICK_Q', id: 'testable' },
    { type: 'NEXT' },
    { type: 'PICK_HYP', id: A.hypotheses[0].id },
    { type: 'NEXT' },
    { type: 'TOGGLE_RUNG', id: free.id },
    { type: 'NEXT' },
    { type: 'TOGGLE_CONTROL_CHOICE', id: 'neg' },
    { type: 'TOGGLE_CONTROL_CHOICE', id: 'pos' },
    { type: 'SET_REP', value: 3 },
    { type: 'SET_DIST', dist: '2d' },
    { type: 'NEXT' },
    { type: 'SEGMENT_DONE' },
    { type: 'MEASURE' },
    { type: 'NEXT' }, // Analyze
    { type: 'NEXT' }, // Conclude
    { type: 'PICK_CLAIM', id: A.claims[0].id },
    { type: 'NEXT' }, // Iterate
  ]
  const s = acts.reduce(loopReducer, freshAct('develop', 'darkfield', true))
  const reflections: Reflections = {
    0: { ...emptyReflection(), submitted: true, revised: true, revision: 'I started with "why do babies get clefts," but that is a why I cannot measure. I changed it to whether the crest cells space themselves non-randomly, which I can actually count.', todos: 'Write the testable version of my question first, before I get attached to the big one.' },
    6: { ...emptyReflection(), submitted: true, revised: true, revision: 'My first instinct was to say FN1 pulls the cells into place. I changed it to "the cells are non-randomly spaced," because I measured spacing, not force.', todos: 'Match the claim to the tool I actually used, and name out loud the thing I did not measure.' },
  }
  const badges = ['studied_library', 'testable_question', 'prediction', 'tooled_up', 'fair_design', 'verified_measure', 'honest_ceiling', 'self_corrector', 'loop_closed']
  return buildReport(s, reflections, badges, buildExperiment(s.replicates))
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
export function reportToHtml(r: LabReport, name: string, date: string, scaffold = false): string {
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
  .apart{margin-bottom:11px} .apart .al{font-weight:700;font-size:13px} .apart .ap{font-size:12.5px;color:#3a4a3e;margin:1px 0 2px} .apart .ai{font-size:11.5px;color:#5c6b60;font-style:italic}
  .wbox{margin-top:6px;border:1px dashed #b3c0b3;border-radius:6px;min-height:46px;background:linear-gradient(transparent 22px,#e2eae2 22px,#e2eae2 23px,transparent 23px),linear-gradient(transparent 45px,#e2eae2 45px,#e2eae2 46px,transparent 46px)}
  .scnote{font-size:11px;color:#5c6b60;margin-bottom:10px}
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
  <section><div class="kick">Abstract</div>${
    scaffold
      ? `<p class="scnote">${esc(SCAFFOLD.abstractIntro)}</p>` +
        r.abstractParts
          .map((p, i) => `<div class="apart"><div class="al">${i + 1}. ${esc(p.label)}</div><div class="ap">${esc(p.prompt)}</div><div class="ai">From your run: ${esc(p.ingredient)}</div><div class="wbox"></div></div>`)
          .join('')
      : `<p class="scnote">Write this LAST: an abstract is a short summary of the whole report (about 150 to 300 words) that answers what you did, why, how, what you found, and what it means. The draft below is built from your run; refine it in your own words.</p><p>${esc(r.abstract)}</p>`
  }</section>
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
    ${
      scaffold
        ? `<div class="cer-row"><span class="tag g">REASONING</span><span class="muted" style="font-size:12.5px">${esc(SCAFFOLD.reasoning)}</span><div class="wbox"></div></div>
    <div class="cer-row"><span class="tag gold">LIMITATION</span><span class="muted" style="font-size:12.5px">${esc(SCAFFOLD.limitation)}</span><div class="wbox"></div></div>`
        : `<div class="cer-row"><span class="tag g">REASONING</span>${esc(r.cer.reasoning)}</div>
    <div class="cer-row"><span class="tag gold">LIMITATION</span>${esc(r.cer.limitation)}</div>`
    }
  </div>
  ${r.sixRs.length ? `<section><div class="kick">08 · What I corrected (the 6 Rs · ${r.sixRs.filter((x) => x.revised).length} ${r.sixRs.filter((x) => x.revised).length === 1 ? 'step' : 'steps'} revised)</div>${sixRs}</section>` : ''}
  ${r.badges.length ? `<section><div class="kick">Badges earned</div>${badges}</section>` : ''}
  <div class="foot">Generated locally from this run. No data left the browser. Develop · Differentiate · Derail · mendozabiomed.org</div>
</div></body></html>`
}
