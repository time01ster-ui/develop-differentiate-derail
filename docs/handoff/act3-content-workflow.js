export const meta = {
  name: 'act3-derail-content',
  description: 'Author and adversarially review all Act III (Derail / cancer) content: 2 Library chapters, the 8-stage loop copy, the disorder-at-the-margin Measurement Ladder, and the 8 reflections, grounded in the verified science guardrails and the clearly-labeled sibling-carcinoma framing',
  phases: [
    { title: 'Draft', detail: 'chapters, stage copy, reflections in parallel' },
    { title: 'Review', detail: 'adversarial cancer-biology + pedagogy/9th-grade clarity' },
    { title: 'Revise', detail: 'apply fixes, output final structured content' },
  ],
}

const CONTEXT = `You are authoring content for ACT III "Derail" of the high-school PLTW Biomedical web app "Develop, Differentiate, Derail". Acts I and II shipped: Act I "Develop" taught that cranial neural crest cells read a graded FN1 road to POSITION the frontal bone (honest ceiling = spacing, not force). Act II "Differentiate" taught that the SAME mechanical chain (integrin -> focal adhesion -> actomyosin tension -> YAP/TAZ nuclear localization -> a gene/fate decision) TUNES fate: substrate stiffness + cell shape bias a crest cell toward bone (RUNX2) over the cartilage default (Sox9), via the Wnt/beta-catenin master switch, with YAP/TAZ targets CTGF and CYR61. Students are mixed-ability 9th-12th graders. Hard rules: NO em dashes anywhere; scientific accuracy is non-negotiable; reading level accessible; the app stays encouraging ("wrong answers are safe").

ACT III TOPIC: how cancer HIJACKS the same force chain. The unifying throughline across all three acts: integrin -> focal adhesion -> actomyosin tension -> YAP/TAZ nuclear localization -> a gene/fate decision. Develop BUILDS it; Differentiate TUNES it; Derail HIJACKS it. The refrain "order in development, disorder in disease" is the literal mechanism: the same toolkit that builds the face in order is reused, out of context, to drive disorder in a tumor.

CRITICAL FRAMING DECISION (honor exactly): This is a CLEARLY-LABELED SIBLING CARCINOMA, NOT "Baby Mateo's cells became cancer." Use a SEPARATE breast-carcinoma invasive-margin model (the strongest, best-evidenced LOX / matrix-stiffening / durotaxis story), introduced with a one-line CONTENT NOTE at the start of the act. Frame it as AWE at a shared mechanism, not as a threat to Mateo. Mateo's developmental story and this cancer story are siblings that reuse the same forces, nothing more. A developmental + cancer biologist (Dr. Atit) reviews this framing under the project's data boundary before any student use.

THE HIJACK MECHANISM (the science to teach, accurately): A carcinoma cell stiffens its OWN extracellular matrix. The enzyme LOX (lysyl oxidase) crosslinks collagen fibers, making the matrix denser and stiffer. That self-made stiffness over-drives the very same chain Act II tuned: more focal adhesions, more actomyosin tension, more nuclear YAP/TAZ, but now with no off-switch and in the WRONG place. Cells then perform DUROTAXIS: they migrate UP the stiffness gradient they themselves created, toward and through the basement membrane (a thin dense sheet that normally walls tissue off), into the surrounding stroma. This local invasion at the tumor margin is what students model.

THE SIGNATURE MECHANIC (for context; you write the copy around it): Run/Measure REUSES the Act I Voronoi spatial engine on a TUMOR-MARGIN field. Organized normal tissue (cells evenly spaced, basement membrane intact) sits next to a disorganized invasive front (cells scattered, the membrane breached). The student measures DISORDER (nuclear spacing irregularity) at the margin with the same Cellpose/Voronoi/nearest-neighbor tools, and watches a durotaxis animation of cells climbing the LOX-stiffened gradient and breaching the basement membrane. The same measuring tools that scored ORDER in Act I now score DISORDER here. One toolkit, opposite readings.

SCIENCE GUARDRAILS (verified by a developmental + cancer biologist; you MUST honor these):
1. Cancer REUSES developmental tools OUT OF CONTEXT. It does NOT "reverse development", does NOT turn cancer cells back into embryos, and is NOT "cells becoming babies again". Say reuse/hijack, never reversal.
2. Nuclear YAP/TAZ on stiff matrix was the CORRECT, healthy bone instruction in Act II. The SAME state is pathological in Act III only because it is in the WRONG place and time, with no off-switch. Stiffness is not inherently "evil"; context decides. Make this parallel explicit and awe-inducing, not fear-mongering.
3. EMT (epithelial-to-mesenchymal transition) ENABLES invasion but does NOT EQUAL metastasis. The margin image shows LOCAL invasion (cells crossing the basement membrane into nearby stroma), NOT distant spread to other organs. Whether EMT is strictly required for metastasis is still debated; do not state it as settled. Never conflate "invasion at the margin" with "metastasis".
4. The model is a MODEL, and a SIBLING sample, not Mateo's tissue and not a specific real patient. Preserve the Measurement-Ladder honesty: the blocked over-claim students reach for is "stiffness CAUSES metastasis in the patient"; the honest gap is model/sibling-not-patient + local-invasion-is-not-metastasis + no in-vivo causal force tool. The honest ceiling refrain becomes something like "a stiffer, more disordered margin in this model is not the same as proof that stiffness drives spread in a patient."
5. Genes/markers to use correctly: LOX (lysyl oxidase) crosslinks collagen to stiffen the matrix; YAP/TAZ (targets CTGF/CCN2, CYR61/CCN1) are the same mechanotransducers from Act II; durotaxis = migration up a stiffness gradient; the basement membrane is the sheet that is breached in local invasion; MMPs (matrix metalloproteinases) cut the membrane. Do not invent specific patient data. The LOX/stiffness/durotaxis invasive-margin story (Weaver, Levental and colleagues) is the MODEL BASIS, framed as a model.

THE 8-STAGE MAP for Act III (write copy that fits this):
0 Ask: pick the testable question (broad/testable/vague), e.g. testable = "At a tumor's invasive margin in this model, are the cells more spatially disordered than in the matched organized normal tissue next to it?"
1 Hypothesize: 3 ideas each with a falsifiable prediction (a LOX-stiffening -> durotaxis -> disordered invasive front idea; a "the margin looks the same as normal tissue" null; a "disorder is just random imaging noise, not real" alternative).
2 Choose tools: the disorder-at-the-margin Measurement Ladder. Rungs: (1) FREE spatial disorder (Voronoi nearest-neighbor irregularity at the margin) licenses "the margin is more disordered than the matched normal tissue in this model"; (2) ECM/crosslink readout (collagen alignment + a LOX-crosslink density proxy in the image) licenses "the invasive matrix is denser/more crosslinked in this model"; (3) PAID live durotaxis tracking (hire the operator/interpreter) licenses "in the model, cells migrate up the stiffness gradient toward the breach"; (4) LOCKED direct in-vivo stiffness/force of the real margin (AFM/Brillouin, dead tissue, operator+interpreter, not in this lab); (5) LOCKED causal proof that stiffness ALONE drives spread (metastasis) in a living patient.
3 Design: make it fair: a CONTROL (matched organized NORMAL tissue next to the margin), >=3 replicate sample regions, and an honest LABEL that this is a MODEL sibling-carcinoma margin, not Mateo and not a specific patient.
4 Run/Measure: the Voronoi tumor-margin bench described above (normal vs invasive front; durotaxis + basement-membrane breach animation).
5 Analyze: one striking field is an anecdote; agreement across replicate sample regions (per-region, not per-cell) is what counts (reuse the honest-sample-size/pseudoreplication idea from Act I).
6 Conclude: valid claim within ceiling ("in this model the invasive margin is more disordered/denser than matched normal tissue"); blocked over-claim ("stiffness causes this patient's cancer to spread") with the gap named (model/sibling not patient; local invasion is not metastasis; no in-vivo causal tool).
7 Iterate: close the trilogy. The same chain that built the face in order (Develop) and told each cell what to become (Differentiate) is hijacked here to drive disorder (Derail). Order in development, disorder in disease, one toolkit. End on awe and on what a real lab would need to go further, honestly.

Also write three short story beats: an OPEN beat that includes the one-line content note and the sibling-carcinoma framing; a MID beat reinforcing model/sibling honesty; a PAYOFF beat that lands the trilogy throughline (order in development, disorder in disease) with awe, not fear.`

const CHAPTER_SCHEMA = {
  type: 'object', additionalProperties: false,
  properties: {
    chapters: { type: 'array', items: {
      type: 'object', additionalProperties: false,
      properties: {
        id: { type: 'string', description: "kebab id: use 'lox-stiffness' and 'invasive-margin'" },
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
      cost: { type: 'integer' }, needsOperator: { type: 'boolean' }, needsInterpreter: { type: 'boolean' }, equipInLab: { type: 'boolean' }, tissue: { type: 'string', enum: ['any', 'dead'] }, why: { type: 'string' },
    }, required: ['id', 'lvl', 'name', 'tools', 'purpose', 'cost', 'needsOperator', 'needsInterpreter', 'equipInLab', 'tissue', 'why'] } },
    stageBriefs: { type: 'array', items: { type: 'string' }, description: '8 one-line PI (Dr. Reyes) briefs, one per stage 0-7' },
    passLines: { type: 'array', items: { type: 'string' }, description: '8 encouraging footer lines shown when a stage gate passes' },
    pinnedQuote: { type: 'string', description: "Act III's honest-ceiling refrain" },
    mateoOpen: { type: 'string', description: 'opening beat WITH the one-line content note + sibling-carcinoma framing' },
    mateoMid: { type: 'string' },
    mateoPayoff: { type: 'string', description: 'the trilogy throughline payoff, awe not fear' },
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
    draftPrompt: `${CONTEXT}\n\nWRITE the TWO new Act III Library chapters, full and accurate, at the depth and quality of a strong high-school study module (4 sections each, ~3 substantial paragraphs per section, tap-to-define term lists, a what-we-know vs still-unknown pair, and "questions this lets you ask"). Chapter A id "lox-stiffness" titled about how a tumor stiffens its own matrix (LOX crosslinking collagen, the self-made stiffness gradient, durotaxis up that gradient, the same YAP/TAZ chain over-driven with no off-switch; the explicit healthy-in-development vs pathological-here parallel). Chapter B id "invasive-margin" titled about the invasive margin and local invasion (the basement membrane as a wall, MMPs cutting it, EMT enabling but not equaling metastasis, local invasion vs distant spread, why the same Voronoi disorder tools now read disorder instead of order). Honor every science guardrail, especially reuse-not-reversal, EMT-enables-not-equals-metastasis, and the sibling-carcinoma framing. No em dashes.`,
  },
  stageContent: {
    draftSchema: STAGE_SCHEMA,
    draftPrompt: `${CONTEXT}\n\nWRITE the Act III stage content as structured data exactly matching the schema: 3 question options (broad/testable/vague with tag + note), 3 hypotheses with falsifiable predictions, claims with the minimum ladder rung each needs (include a valid model-level claim at req 1-2, a reproducibility/durotaxis claim at req 3, AND a blocked over-claim at req 4 of the form "stiffness causes this patient's cancer to spread/metastasize" that the locked rung makes unreachable), the 5 disorder-at-the-margin ladder rungs (with plain purpose, dollar cost, staffing needs, equipInLab, tissue, and a tap-to-reveal "why" matching the ladder spec above; rungs 4 and 5 LOCKED), 8 one-line Dr. Reyes PI briefs (one per stage), 8 encouraging pass lines, the Act III pinned-quote refrain, three story beats (open WITH the one-line content note + sibling framing / mid / payoff that lands the trilogy throughline), and 6 claim-ceiling notes (for reached rung 0 through 5). Honor every science guardrail, especially that this is a model sibling-carcinoma margin and the in-vivo causal force rung stays locked, and that local invasion is not metastasis. No em dashes.`,
  },
  reflections: {
    draftSchema: REFLECT_SCHEMA,
    draftPrompt: `${CONTEXT}\n\nWRITE exactly 8 per-stage reflections (stages 0-7), each with: a task (what the student writes in their own words at that stage), a one-line hint, a worked exemplar answer, 2-4 "what makes it good" components (label + why), and a one-line takeaway. These mirror the Act I and II reflection loops but are about cancer hijacking the same force chain, the order-to-disorder reuse, the model/sibling-not-patient and local-invasion-is-not-metastasis honesty, and matching claims to evidence. Keep them at an accessible reading level. Honor every science guardrail. No em dashes.`,
  },
}

async function doStream(key) {
  const s = STREAMS[key]
  const draft = await agent(s.draftPrompt, { label: `draft:${key}`, phase: 'Draft', schema: s.draftSchema, agentType: 'general-purpose', effort: 'high' })
  if (!draft) return null
  const critique = await agent(
    `${CONTEXT}\n\nYou are TWO reviewers in one pass on this drafted Act III "${key}" content: (1) a developmental + cancer cell-biologist checking every claim against the science guardrails above (flag any "reversal of development" language, any conflation of local invasion with metastasis, any claim that EMT strictly equals or is required for metastasis stated as settled, any treatment of the model as a real patient, any wrong gene/marker, any fear-mongering instead of awe, any over-claim that stiffness alone causes spread), and (2) a 9th-grade-clarity + reading-level reviewer (flag jargon without explanation, confusing instructions, anything a mixed-ability student could not follow). Also scan for em dashes. Here is the draft:\n${JSON.stringify(draft)}`,
    { label: `review:${key}`, phase: 'Review', schema: REVIEW_SCHEMA, agentType: 'general-purpose', effort: 'high' },
  )
  const final = await agent(
    `${CONTEXT}\n\nProduce the FINAL Act III "${key}" content by applying this review to the draft. Fix every science error and clarity issue, remove any em dashes, and keep the exact same schema/shape as the draft. Draft:\n${JSON.stringify(draft)}\n\nReview to apply:\n${JSON.stringify(critique)}`,
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
