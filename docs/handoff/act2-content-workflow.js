export const meta = {
  name: 'act2-differentiate-content',
  description: 'Author and adversarially review all Act II (Differentiate) content: 2 Library chapters, the 8-stage loop copy, the fate-readout Measurement Ladder, and the 8 reflections, grounded in the verified science guardrails',
  phases: [
    { title: 'Draft', detail: 'chapters, stage copy, reflections in parallel' },
    { title: 'Review', detail: 'adversarial science + pedagogy/9th-grade clarity' },
    { title: 'Revise', detail: 'apply fixes, output final structured content' },
  ],
}

const CONTEXT = `You are authoring content for ACT II "Differentiate" of the high-school PLTW Biomedical web app "Develop, Differentiate, Derail" (the Baby Mateo cleft-lip-and-palate case). Act I "Develop" shipped: an 8-stage discovery loop (Ask, Hypothesize, Choose tools, Design, Run/Measure, Analyze, Conclude, Iterate) with a resource-gated "Measurement Ladder" (you may only CLAIM as high as your most direct evidence; the top force rungs are LOCKED because the lab lacks the instrument + trained operator + interpreter). Students are mixed-ability 9th-12th graders. Hard rules: NO em dashes anywhere; scientific accuracy is non-negotiable; reading level accessible; the app must feel encouraging ("wrong answers are safe").

ACT II TOPIC: how a cell DIFFERENTIATES (becomes specialized). Case: same Baby Mateo, next question. In Act I students measured WHERE cranial neural crest cells sat as they built the frontal bone. Act II asks the question underneath: once those cells arrive, why do some become BONE and others stay CARTILAGE? The Library already taught that cartilage is the DEFAULT and that an active Wnt signal (through beta-catenin) is the master switch that turns on RUNX2 then Osterix for bone (and Twist1/Twist2 also called Dermo1 for dermis). A cleft, or a missing piece of skull bone, can be read as a cell-fate decision that tipped the wrong way. Students manipulate that decision in a MODEL and watch YAP/TAZ carry the mechanical signal to the genes.

THE SIGNATURE MECHANIC (for context; you are writing the copy around it): the Run/Measure stage is a MECHANOTRANSDUCTION BENCH with two sliders, SUBSTRATE STIFFNESS (soft to firm, shown as a labeled qualitative model range, soft fat/brain-like up to firm pre-bone) and CELL SHAPE/SPREAD (round-and-confined to flat-and-spread). As the student drags, an animated cell shows YAP/TAZ moving between cytoplasm and nucleus, focal adhesions growing on stiffer substrate, and a fate readout resolving to a RUNX2-bone icon or a Sox9-cartilage icon with CTGF and CYR61 (canonical YAP/TAZ targets) shown as activity bars. The mapping is a deterministic MODEL, discovered by manipulation.

THE UNIFYING FORCE CHAIN (the throughline across all three acts): integrin -> focal adhesion -> actomyosin tension -> YAP/TAZ nuclear localization -> a gene/fate decision. Act I built this chain; Act II tunes it (stiffness + shape -> YAP/TAZ -> bone vs cartilage); Act III will hijack it (cancer).

SCIENCE GUARDRAILS (verified by a developmental + cancer biologist; you MUST honor these):
1. Nuclear YAP/TAZ on stiff matrix is the CORRECT, HEALTHY instruction to build bone here. Stiffness is NOT "bad"; CONTEXT decides. (The same state becomes pathological only in Act III, in the wrong place.)
2. Do NOT teach a clean one-way deterministic arrow. YAP/TAZ is shape-, dimensionality- (2D vs 3D), confinement-, adhesion-area-, and cell-cycle-dependent. A single stiffness number does NOT map to a single fate.
3. The slider bench is an explicit MODEL, NOT a measurement of Mateo's real tissue. The real in-vivo force/stiffness number stays LOCKED for the same reason as Act I (no instrument, no operator, no interpreter; and the bench is a model, not the embryo). Preserve the Measurement-Ladder honesty: the blocked over-claim students reach for is "stiffness CAUSES Mateo's fate"; the honest gap is model-not-patient + context-dependent + no in-vivo force tool. This parallels Act I's "spatial organization is not the same thing as tension."
4. Genes/markers to use correctly: Wnt/beta-catenin master switch; RUNX2 then Osterix (bone); Twist1/Twist2/Dermo1 (dermis); Sox9 (cartilage, the default); YAP/TAZ canonical targets CTGF (CCN2) and CYR61 (CCN1); ectoderm-source Wnt sets fate by position. The matched-niche-stiffness differentiation idea (mesenchymal stem cells differentiating by substrate stiffness, Engler and colleagues) is a MODEL BASIS, framed as a model, not as a measurement of Mateo.

THE 8-STAGE MAP for Act II (write copy that fits this):
0 Ask: pick the testable question (broad/testable/vague), e.g. testable = "Does increasing substrate stiffness shift YAP/TAZ into the nucleus and bias crest cells toward the bone (RUNX2) program over the cartilage (Sox9) default?"
1 Hypothesize: 3 ideas each with a falsifiable prediction (a stiffness->nuclear-YAP->bone idea; a "fate is random" null; a "only shape matters, stiffness irrelevant" alternative).
2 Choose tools: the FATE-READOUT Measurement Ladder. Rungs: (1) FREE YAP/TAZ localization (nuclear vs cytoplasmic fraction in the model) licenses "YAP/TAZ shifts with stiffness and shape"; (2) FREE fate-marker readout (RUNX2 vs Sox9, CTGF/CYR61 bars) licenses "in this model, stiffer/more-spread biases toward the bone program"; (3) PAID reporter validation (hire the interpreter) licenses "the shift is reproducible across model runs"; (4) LOCKED direct in-vivo stiffness of Mateo's frontal-bone tissue (AFM/Brillouin, dead tissue, operator+interpreter, not in this lab); (5) LOCKED causal proof that stiffness ALONE sets fate in the living embryo.
3 Design: make the model run fair: a CONTROL (soft-substrate/round-cell baseline), >=3 replicate model runs, and an honest LABEL that this is a MODEL of the relationship, not a measurement of Mateo's tissue.
4 Run/Measure: the bench (described above).
5 Analyze: one dramatic slider run is an anecdote; agreement across replicate runs is what counts (reuse the honest-sample-size idea).
6 Conclude: valid claim within ceiling ("in this model, stiffer/more-spread biases crest cells toward the bone program"); blocked over-claim ("stiffness causes Mateo's fate") with the gap named.
7 Iterate: bridge to Act III ("you showed the same force chain that positioned the cells also tells them what to become; next, what happens when a cell runs this chain with no off-switch, in the wrong place?").`

const CHAPTER_SCHEMA = {
  type: 'object', additionalProperties: false,
  properties: {
    chapters: { type: 'array', items: {
      type: 'object', additionalProperties: false,
      properties: {
        id: { type: 'string', description: "kebab id, e.g. 'yap-taz' or 'fate-switch'" },
        title: { type: 'string' },
        summary: { type: 'string' },
        readMinutes: { type: 'integer' },
        sections: { type: 'array', items: {
          type: 'object', additionalProperties: false,
          properties: { heading: { type: 'string' }, paragraphs: { type: 'array', items: { type: 'string' } }, terms: { type: 'array', items: { type: 'string' } } },
          required: ['heading', 'paragraphs', 'terms'],
        } },
        known: { type: 'array', items: { type: 'string' } },
        unknown: { type: 'array', items: { type: 'string' } },
        keyQuestions: { type: 'array', items: { type: 'string' } },
      },
      required: ['id', 'title', 'summary', 'readMinutes', 'sections', 'known', 'unknown', 'keyQuestions'],
    } },
  }, required: ['chapters'],
}

const STAGE_SCHEMA = {
  type: 'object', additionalProperties: false,
  properties: {
    questions: { type: 'array', items: { type: 'object', additionalProperties: false, properties: { id: { type: 'string', enum: ['broad', 'testable', 'vague'] }, tag: { type: 'string' }, text: { type: 'string' }, note: { type: 'string' } }, required: ['id', 'tag', 'text', 'note'] } },
    hypotheses: { type: 'array', items: { type: 'object', additionalProperties: false, properties: { id: { type: 'string' }, text: { type: 'string' }, prediction: { type: 'string' } }, required: ['id', 'text', 'prediction'] } },
    claims: { type: 'array', items: { type: 'object', additionalProperties: false, properties: { id: { type: 'string' }, req: { type: 'integer', description: 'min ladder rung level 1-5' }, text: { type: 'string' } }, required: ['id', 'req', 'text'] } },
    rungs: { type: 'array', items: { type: 'object', additionalProperties: false, properties: {
      id: { type: 'string' }, lvl: { type: 'integer' }, name: { type: 'string' }, tools: { type: 'string' }, purpose: { type: 'string' },
      cost: { type: 'integer' }, needsOperator: { type: 'boolean' }, needsInterpreter: { type: 'boolean' }, equipInLab: { type: 'boolean' }, equipName: { type: 'string' }, tissue: { type: 'string', enum: ['any', 'dead'] }, why: { type: 'string', description: 'tap-to-reveal reason this rung is what it is' },
    }, required: ['id', 'lvl', 'name', 'tools', 'purpose', 'cost', 'needsOperator', 'needsInterpreter', 'equipInLab', 'tissue', 'why'] } },
    stageBriefs: { type: 'array', items: { type: 'string' }, description: '8 one-line PI (Dr. Reyes) briefs, one per stage 0-7, each tied to Mateo' },
    passLines: { type: 'array', items: { type: 'string' }, description: '8 encouraging footer lines shown when a stage gate passes' },
    pinnedQuote: { type: 'string', description: "Act II's honest-ceiling refrain, parallel to 'spatial organization is not the same thing as tension'" },
    mateoOpen: { type: 'string' }, mateoMid: { type: 'string' }, mateoPayoff: { type: 'string' },
    ceilNotes: { type: 'array', items: { type: 'string' }, description: 'claim-ceiling notes keyed to reached rung 0-5 (6 entries)' },
  },
  required: ['questions', 'hypotheses', 'claims', 'rungs', 'stageBriefs', 'passLines', 'pinnedQuote', 'mateoOpen', 'mateoMid', 'mateoPayoff', 'ceilNotes'],
}

const REFLECT_SCHEMA = {
  type: 'object', additionalProperties: false,
  properties: {
    reflections: { type: 'array', description: 'exactly 8, one per stage 0-7', items: {
      type: 'object', additionalProperties: false,
      properties: {
        task: { type: 'string' }, hint: { type: 'string' }, exemplarAnswer: { type: 'string' },
        components: { type: 'array', items: { type: 'object', additionalProperties: false, properties: { label: { type: 'string' }, why: { type: 'string' } }, required: ['label', 'why'] } },
        takeaway: { type: 'string' },
      },
      required: ['task', 'hint', 'exemplarAnswer', 'components', 'takeaway'],
    } },
  }, required: ['reflections'],
}

const REVIEW_SCHEMA = {
  type: 'object', additionalProperties: false,
  properties: {
    verdict: { type: 'string', enum: ['SHIP', 'FIX_FIRST'] },
    scienceErrors: { type: 'array', items: { type: 'object', additionalProperties: false, properties: { where: { type: 'string' }, problem: { type: 'string' }, fix: { type: 'string' } }, required: ['where', 'problem', 'fix'] } },
    clarityIssues: { type: 'array', items: { type: 'object', additionalProperties: false, properties: { where: { type: 'string' }, problem: { type: 'string' }, fix: { type: 'string' } }, required: ['where', 'problem', 'fix'] } },
    emDashFound: { type: 'boolean' },
    notes: { type: 'string' },
  }, required: ['verdict', 'scienceErrors', 'clarityIssues', 'emDashFound', 'notes'],
}

const STREAMS = {
  chapters: {
    draftSchema: CHAPTER_SCHEMA,
    draftPrompt: `${CONTEXT}\n\nWRITE the TWO new Act II Library chapters, full and accurate, at the depth and quality of a strong high-school study module (4 sections each, ~3 substantial paragraphs per section, tap-to-define term lists, a what-we-know vs still-unknown pair, and "questions this lets you ask"). Chapter A id "yap-taz" titled about YAP/TAZ and the mechanical vote (how substrate stiffness, cell spread, and 2D-vs-3D context move YAP/TAZ to the nucleus and switch on CTGF/CYR61; the honest caveat that the readout is context-dependent and the bench is a model). Chapter B id "fate-switch" titled about how a crest cell chooses bone over cartilage (Wnt/beta-catenin master switch tied to mechanics; RUNX2/Osterix bone vs Sox9 cartilage default; matched-niche-stiffness differentiation as a model basis; cartilage as the default). Honor every science guardrail. No em dashes.`,
  },
  stageContent: {
    draftSchema: STAGE_SCHEMA,
    draftPrompt: `${CONTEXT}\n\nWRITE the Act II stage content as structured data exactly matching the schema: 3 question options (broad/testable/vague with tag + the "why this is/ isn't testable" note), 3 hypotheses with falsifiable predictions, 3 claims with the minimum ladder rung each needs (req 1-5), the 5 fate-readout ladder rungs (with plain purpose, dollar cost, staffing needs, equipInLab, tissue, and a tap-to-reveal "why" matching the ladder spec above), 8 one-line Dr. Reyes PI briefs (one per stage, tied to Mateo), 8 encouraging pass lines, the Act II pinned-quote refrain, three Baby Mateo beats (open/mid/payoff), and 6 claim-ceiling notes (for reached rung 0 through 5). Honor every science guardrail, especially that the bench is a model and the force rung stays locked. No em dashes.`,
  },
  reflections: {
    draftSchema: REFLECT_SCHEMA,
    draftPrompt: `${CONTEXT}\n\nWRITE exactly 8 per-stage reflections (stages 0-7), each with: a task (what the student writes in their own words at that stage), a one-line hint, a worked exemplar answer, 2-4 "what makes it good" components (label + why), and a one-line takeaway. These mirror Act I's reflection loop but are about differentiation, the force-to-YAP-to-fate chain, the model-not-measurement honesty, and matching claims to evidence. Keep them at an accessible reading level. Honor every science guardrail. No em dashes.`,
  },
}

async function doStream(key) {
  const s = STREAMS[key]
  const draft = await agent(s.draftPrompt, { label: `draft:${key}`, phase: 'Draft', schema: s.draftSchema, agentType: 'general-purpose', effort: 'high' })
  if (!draft) return null
  const critique = await agent(
    `${CONTEXT}\n\nYou are TWO reviewers in one pass on this drafted Act II "${key}" content: (1) a developmental + cancer cell-biologist checking every claim against the science guardrails above (flag any deterministic over-claim, any "stiffness causes fate", any treatment of the bench as a real measurement, any wrong gene/marker, any context-dependence dropped), and (2) a 9th-grade-clarity + reading-level reviewer (flag jargon without explanation, confusing instructions, anything a mixed-ability student could not follow). Also scan for em dashes. Here is the draft:\n${JSON.stringify(draft)}`,
    { label: `review:${key}`, phase: 'Review', schema: REVIEW_SCHEMA, agentType: 'general-purpose', effort: 'high' },
  )
  const final = await agent(
    `${CONTEXT}\n\nProduce the FINAL Act II "${key}" content by applying this review to the draft. Fix every science error and clarity issue, remove any em dashes, and keep the exact same schema/shape as the draft. Draft:\n${JSON.stringify(draft)}\n\nReview to apply:\n${JSON.stringify(critique)}`,
    { label: `revise:${key}`, phase: 'Revise', schema: s.draftSchema, agentType: 'general-purpose', effort: 'high' },
  )
  return { key, draftVerdict: critique && critique.verdict, final: final || draft }
}

const results = await parallel([
  () => doStream('chapters'),
  () => doStream('stageContent'),
  () => doStream('reflections'),
])

const out = {}
for (const r of results.filter(Boolean)) out[r.key] = r.final
return { ...out, verdicts: results.filter(Boolean).map((r) => ({ stream: r.key, verdict: r.draftVerdict })) }
