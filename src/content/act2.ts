// Act II "Differentiate" content pack. Authored + adversarially reviewed by the
// grounded multi-agent content workflow (docs/handoff/act2-content-workflow.js),
// captured to docs/handoff/act2-content-output.json, then generated into this
// typed module. Every science guardrail (model-not-measurement honesty, the
// locked in-vivo force rung, the correct gene set, context-dependence) is baked
// into the copy. No em dashes in rendered strings.
//
// DATA BOUNDARY: ships zero unpublished Atit-lab data; Dr. Atit reviews before
// any student use, per the project gate.

import type { ActStoryContent, ClaimOpt, HypothesisOpt, QuestionOpt, Rung } from './types'
import type { ResourceConfig, RungReq } from './resources'
import type { StageReflection } from './reflect'
import type { Illustration } from './illustrations'
import type { LibraryChapter, LibraryExtension } from './library'
import { EXTENSIONS_DIFFERENTIATE } from './library'
import type { ActContent } from './registry'

export const RUNGS2: Rung[] = [
  { id: "r1", lvl: 1, name: "YAP and TAZ localization readout (free)", tools: "The bench's built-in nuclear-versus-cytoplasmic YAP and TAZ tracker", cv: "--c-blue", avail: true },
  { id: "r2", lvl: 2, name: "Fate-marker readout (free)", tools: "RUNX2-versus-Sox9 fate icon plus CTGF and CYR61 activity bars", cv: "--c-green", avail: true },
  { id: "r3", lvl: 3, name: "Reporter validation across runs (paid: hire the interpreter)", tools: "A fluorescent reporter (an engineered cell that lights up when the bone or cartilage program switches on) run across independent replicate model runs, read by a trained interpreter", cv: "--c-amber", avail: true },
  { id: "r4", lvl: 4, name: "Direct in-vivo stiffness of Mateo's frontal-bone tissue (LOCKED)", tools: "AFM or Brillouin microscopy on the actual tissue", cv: "--c-pink", avail: false },
  { id: "r5", lvl: 5, name: "Causal proof that stiffness alone sets fate in the living embryo (LOCKED)", tools: "Controlled stiffness perturbation in a living developing embryo with every other factor held fixed", cv: "--c-red", avail: false },
]

export const RUNG_REQ2: Record<string, RungReq> = {
  "r1": { purpose: "Watch where YAP and TAZ go as you move the two sliders. This is the first thing the chain predicts should change.", cost: 0, needsOperator: false, needsInterpreter: false, equipInLab: true, tissue: "any" },
  "r2": { purpose: "See which program the model cell leans toward, and check that the YAP and TAZ targets CTGF and CYR61 move with it.", cost: 0, needsOperator: false, needsInterpreter: false, equipInLab: true, tissue: "any" },
  "r3": { purpose: "Confirm the shift is real and repeatable in the model, not a one-run fluke, by checking it holds across replicates with someone qualified reading it.", cost: 1200, needsOperator: true, needsInterpreter: true, equipInLab: true, tissue: "any" },
  "r4": { purpose: "Measure the real stiffness the crest cells felt in Mateo, instead of a slider you set yourself.", cost: 0, needsOperator: true, needsInterpreter: true, equipInLab: false, equipName: "AFM / Brillouin", tissue: "dead" },
  "r5": { purpose: "Prove that stiffness by itself, and not shape, dimensionality, Wnt position, or timing, decides bone versus cartilage in the real animal.", cost: 0, needsOperator: true, needsInterpreter: true, equipInLab: false, equipName: "a living-embryo perturbation rig", tissue: "any" },
}

export const RUNG_WHY2: Record<string, string> = {
  "r1": "This rung is free and built in because reading where a labeled protein sits in a model cell is the most direct, lowest-stakes thing the bench can show. It only licenses a claim about the model's YAP and TAZ behavior, nothing about Mateo yet.",
  "r2": "Reading the model's own fate markers is still free and built in, but it is one honest step further than localization: now you are watching the gene-program readout, not just the protein's address. It licenses a claim about bias in this model, not about cause in Mateo.",
  "r3": "Reproducibility costs money and needs a trained interpreter because a reporter (an engineered cell that lights up when a program turns on) has to be validated and read correctly, and replicates take real runs. It lifts your claim from one shift to a repeatable shift in the model, but it still cannot speak for Mateo's living tissue.",
  "r4": "This stays locked for the same reason as Act I: the lab has no AFM or Brillouin rig, no trained operator, and no interpreter, the measurement needs fixed dead tissue, and most of all the bench is a model, not Mateo's embryo. A slider you set yourself is never a measurement of the real number.",
  "r5": "Locked because YAP and TAZ also answer to the cell's shape, whether it sits on a flat surface or inside a 3D gel (2D versus 3D), how squeezed-in it is (confinement), how much of the surface it grips (adhesion area), and where it is in its growth cycle (cell cycle). So isolating stiffness as the sole cause in a living embryo is beyond any single lab. Even if you owned the tools, one stiffness number does not map to one fate. This is the over-claim the whole ladder protects against.",
}

export const RUNG_NAMES2: Record<number, string> = { 0: 'No tools selected', 1: "YAP and TAZ localization readout (free)", 2: "Fate-marker readout (free)", 3: "Reporter validation across runs (paid: hire the interpreter)", 4: "Direct in-vivo stiffness of Mateo's frontal-bone tissue (LOCKED)", 5: "Causal proof that stiffness alone sets fate in the living embryo (LOCKED)", }

export const RUNG_COLORS2: Record<number, string> = { 0: '--muted', 1: "--c-blue", 2: "--c-green", 3: "--c-amber", 4: "--c-pink", 5: "--c-red", }

export const ACT2_RESOURCE: ResourceConfig = {
  reqMap: RUNG_REQ2,
  startingBudget: 50000,
  hireCost: { operator: 12000, interpreter: 8000 },
}

export const QUESTIONS2: QuestionOpt[] = [
  {
    "id": "broad",
    "tag": "Too big to test",
    "text": "Why does a cleft happen in some babies and not others?",
    "note": "This is a real and important question, but it is far too broad to test in one model run. It mixes genes, environment, timing, and dozens of cell types. There is no single slider you could move to answer it. Good questions for the bench have to name one thing you will change and one thing you will watch."
  },
  {
    "id": "testable",
    "tag": "Just right",
    "text": "In this bench model, does making the substrate stiffer and the cell more spread shift YAP and TAZ into the nucleus and bias crest cells toward the bone program (RUNX2) instead of the cartilage default (Sox9)?",
    "note": "This names what you change (stiffness and cell shape), what you watch (where YAP and TAZ sit, plus RUNX2 versus Sox9), and it can be proven wrong. If you stiffen the model and nothing shifts, the idea fails. That is exactly what a testable question should let you do."
  },
  {
    "id": "vague",
    "tag": "Too fuzzy",
    "text": "Does the environment affect what a cell turns into?",
    "note": "Everyone would say yes, and that is the problem. Affect it how? Which part of the environment? Measured with what? A question you cannot imagine being wrong about will not teach you anything. Sharpen it until it points at one input and one readout."
  }
]

export const HYPOTHESES2: HypothesisOpt[] = [
  {
    "id": "stiff",
    "text": "Stiffness-to-fate idea: a firmer substrate and a more spread cell shape pull YAP and TAZ into the nucleus, which turns up the bone program (RUNX2) over the cartilage default (Sox9).",
    "prediction": "as I drag stiffness and spread upward across replicate runs, the nuclear YAP and TAZ fraction rises, CTGF and CYR61 bars climb, and the readout flips from Sox9 toward RUNX2. If stiffening does nothing to YAP and TAZ or to the markers, this idea is wrong."
  },
  {
    "id": "null",
    "text": "Random-fate null: cell fate in the model is essentially a coin flip and does not track the sliders at all.",
    "prediction": "across replicate runs the bone-versus-cartilage readout scatters with no relationship to stiffness or shape. If the same slider settings keep landing on the same fate, the null is wrong."
  },
  {
    "id": "shape",
    "text": "Shape-only alternative: cell spreading is what matters, and substrate stiffness is irrelevant once shape is fixed.",
    "prediction": "if I hold the cell round and confined while cranking stiffness to maximum, YAP and TAZ stay cytoplasmic and the fate stays Sox9. If stiffening a round, confined cell still shifts the readout, the shape-only idea is wrong."
  }
]

export const CLAIMS2: ClaimOpt[] = [
  {
    "id": "c1",
    "req": 1,
    "text": "In this bench model, YAP and TAZ change where they sit (nucleus versus cytoplasm) as I change stiffness and cell shape."
  },
  {
    "id": "c2",
    "req": 2,
    "text": "In this bench model, a stiffer and more spread setting biases crest cells toward the bone program (RUNX2) over the cartilage default (Sox9), with CTGF and CYR61 rising alongside."
  },
  {
    "id": "c3",
    "req": 3,
    "text": "This stiffness-and-shape shift is reproducible: it shows up again across independent replicate runs of the model, not just in one dramatic drag."
  },
  {
    "id": "c4",
    "req": 4,
    "text": "In Mateo's actual frontal-bone tissue, stiffness by itself caused his cells to choose bone over cartilage."
  }
]

const CEIL_NOTES2: string[] = [
  "Reached rung 0: You have not read anything off the bench yet, so there is no claim to make. Run the model first, then we will see what it earns you.",
  "Reached rung 1: You can say YAP and TAZ shift between nucleus and cytoplasm as you change stiffness and shape in this model. You cannot yet say which fate that points to.",
  "Reached rung 2: You can say that in this model, stiffer and more spread biases crest cells toward the bone program over the Sox9 default, with CTGF and CYR61 rising. Still just this model, and still just one run's worth.",
  "Reached rung 3: You can now say the shift is reproducible across independent runs of the model. That is your ceiling. It is a strong, honest claim, and it still stops at the edge of the bench.",
  "Reached rung 4: This rung is locked. Even imagining you measured Mateo's real tissue stiffness, you could not, because the lab has no instrument, no operator, no interpreter, and a slider is not a measurement. The claim stiffness causes Mateo's fate stays out of reach.",
  "Reached rung 5: This rung is locked and would stay locked even in a top lab. One stiffness number does not set one fate; the cell's shape, whether it sits on a flat surface or inside a 3D gel, how squeezed-in it is, how much of the surface it grips, Wnt position, and timing all weigh in. Proving stiffness alone decides fate in a living embryo is not something this case can claim."
]

export function ceilNote2(ceil: number): string {
  return CEIL_NOTES2[Math.max(0, Math.min(CEIL_NOTES2.length - 1, ceil))]
}

export const PINNED_QUOTE2 = "A slider you set in a model is not the same thing as a stiffness you measured in Mateo."

export const CEILING_ASIDE2 =
  'Even with more grant money, you cannot turn this bench into a measurement of Mateo. The bench is a model you set by hand, the in-the-body force tool is not in this lab, and the living embryo cannot be probed without it. So the model-level claim stays your ceiling.'

export const MATEO2 = {
  open: "Back in Act I you measured where these cranial neural crest cells sat as they built the frontal bone, the broad plate of the forehead. But sitting in the right place is only half the story. Once those cells arrive, each one still faces a decision: become bone, or stay cartilage. That decision is what Act II is about, and we study it where it is cleanest to measure, in frontal-bone formation. Keep Mateo's own diagnosis separate in your mind: his cleft of the lip and palate is a different event, parts of the face that should fuse failing to fuse, not a frontal-bone fate decision. What links the two is only the family of cells and the kind of machinery they use. Learn the bone-or-cartilage switch here, in the clean case, and you build the foundation for the harder ones.",
  mid: "Cartilage is the default. Left alone, a crest cell drifts toward Sox9 and stays soft. To build bone, something has to actively flip the switch: a Wnt signal from the overlying ectoderm reaches in through beta-catenin (the inside-the-cell messenger that carries the Wnt signal) and turns on RUNX2, then Osterix (the next bone gene RUNX2 switches on). On the bench you are watching one arm of how that decision gets felt, the mechanical arm: stiffness and cell shape squeeze the actomyosin tension (the cell's internal pulling force) that drives YAP and TAZ into the nucleus, where they help push the bone program. Drag the sliders and watch the same force chain from Act I do a new job, not placing the cell, but instructing it.",
  payoff: "Here is what you can honestly say, and it is a lot. In this model, stiffer and more spread surroundings pull YAP and TAZ into the nucleus and tip crest cells toward bone over the cartilage default, and that shift repeats across runs. Here is what you cannot say: that stiffness, by itself, settled the bone-or-cartilage decision in Mateo's own tissue. You moved a slider, you did not measure his tissue, and fate in a real embryo also answers to shape, to Wnt position, to timing. Holding both of those at once, the strong claim and the honest gap, is exactly what a scientist does. And notice: nuclear YAP and TAZ on a stiff matrix was the right, healthy instruction here. Keep that in mind, because in Act III you will meet the same instruction running in the wrong place, with no off-switch.",
}

export const STAGE_BRIEF2: Record<number, string> = {
  0: "Stage 0, Ask: We already know where Mateo's crest cells sat. Now pick the one testable question about why some became bone and some stayed cartilage.",
  1: "Stage 1, Hypothesize: Write down what you think stiffness and shape do to fate, and exactly what result would prove you wrong. A wrong guess here is doing the job right.",
  2: "Stage 2, Choose tools: Climb only as high as your readout earns. The bench reads a model, so the rung for Mateo's real tissue stays locked, same as Act I.",
  3: "Stage 3, Design: Set a soft, round-cell control, plan at least three replicate runs, and label the bench honestly as a model of the relationship, not a scan of Mateo.",
  4: "Stage 4, Run and Measure: Drag stiffness and shape, watch YAP and TAZ move and the focal adhesions grow, and let the RUNX2-versus-Sox9 readout resolve.",
  5: "Stage 5, Analyze: One dramatic drag is a story, not a result. Look for the shift holding up across your replicate runs before you trust it.",
  6: "Stage 6, Conclude: Claim what the model earns, that stiffer and more spread biases toward bone here, and name the gap that keeps stiffness causes Mateo's fate off-limits.",
  7: "Stage 7, Iterate: You just showed the force chain that placed Mateo's cells also tells them what to become. Next, what happens when that chain runs with no off-switch, in the wrong place?",
}

/** Short, distinct GOAL per step (the words-first header), separate from the longer brief. */
export const STAGE_GOAL2: Record<number, string> = {
  0: 'Turn "why did some crest cells become bone and some cartilage" into one thing you can measure.',
  1: 'Name what you think stiffness and shape do to fate, and the result that would prove it wrong.',
  2: 'Pick the readouts you can run, and see how far up the ladder they let you claim.',
  3: 'Make the bench fair: a soft round-cell control, enough runs, and an honest "this is a model" label.',
  4: 'Take real readings: where YAP and TAZ sit, and which fate markers (RUNX2 vs Sox9) switch on.',
  5: 'Read the result by replicate run, not by one dramatic drag.',
  6: 'Claim only what the model earns, and name the gap that keeps "stiffness sets Mateo\'s fate" off-limits.',
  7: 'Close the loop, and carry the force chain into the next question.',
}

/** The bench pipeline behind the Run/Measure step, in plain words. */
export const PROCESS_STEPS2: { label: string; text: string }[] = [
  { label: 'Set the bench', text: 'This is a model on a screen, not Mateo\'s tissue. You set how stiff the surface is and how spread the cell is.' },
  { label: 'Watch the cell', text: 'As you change stiffness and shape, focal adhesions grow and YAP and TAZ move between the cytoplasm and the nucleus.' },
  { label: 'Read the fate', text: 'Fate markers (RUNX2 for bone, Sox9 for cartilage) and target genes (CTGF, CYR61) report which program the cell leans toward.' },
  { label: 'Repeat the run', text: 'You run it several times, because one dramatic drag is a story, not a result.' },
]

export const PASS_LINE2: Record<number, string> = {
  0: "Nice. You changed one thing, watched one thing, and let the result talk.",
  1: "That is real scientific honesty: you claimed exactly what your evidence covered, no more.",
  2: "A wrong guess that you could check is worth more than a right guess you could not. Well done.",
  3: "You kept the model and the patient separate. That is the hard part, and you got it.",
  4: "Replicates over drama. You waited for the pattern to repeat before you believed it.",
  5: "You let the locked rung stay locked. Knowing what you cannot claim is a skill most people never learn.",
  6: "Clean run. The force chain held from stiffness all the way to the fate readout.",
  7: "You earned that claim fair and square. On to the next question.",
}

export const REFLECT2: Record<number, StageReflection> = {
  0: {
    "task": "In your own words, write the ONE question Act II will test. You have three options to react to: a broad one, a vague one, and a testable one. Write the testable question and say in one sentence why it beats the other two.",
    "hint": "A testable question names what you change, what you watch, and which two outcomes you compare.",
    "exemplarAnswer": "My question is: \"In our bench model, does increasing substrate stiffness AND cell spreading shift YAP/TAZ into the nucleus and bias crest cells toward the bone (RUNX2) program over the cartilage (Sox9) default?\" It beats the broad one because it names exactly what I change (stiffness and how spread-out the cell is) and what I watch (YAP/TAZ location plus RUNX2 vs Sox9), and it beats the vague one because \"does stiffness matter\" never says matter for WHAT or how I would see an answer.",
    "components": [
      {
        "label": "Names the variables AND the readout",
        "why": "\"Stiffness and cell spreading\" are the things changed and \"YAP/TAZ location plus RUNX2 vs Sox9\" is the thing watched, so the question can actually be checked."
      },
      {
        "label": "Compares two real outcomes",
        "why": "Bone program versus the cartilage default gives a head-to-head you can win or lose, instead of a yes/no with nothing to compare."
      },
      {
        "label": "Says \"in our bench model\"",
        "why": "It keeps the question honest about what we are testing, a model of the relationship, not Mateo's actual tissue."
      }
    ],
    "takeaway": "A good question already tells you what a yes and a no would look like."
  },
  1: {
    "task": "Put each of the three hypotheses into your own words. Do not copy the cards, explain what each one actually claims, the way you would to a friend.",
    "hint": "Then use the cards: for each idea, say the result you would expect to see if it were true, and why, before you flip to check.",
    "exemplarAnswer": "In my own words: (A) stiffness idea, a firmer and more spread cell drives YAP and TAZ into the nucleus and turns up the bone program (RUNX2) over the cartilage default (Sox9); (B) random null, fate is a coin flip that ignores the sliders; (C) shape-only, spreading is all that matters and stiffness does nothing once shape is fixed. What I expect: if A is right, raising stiffness and spread lifts nuclear YAP and TAZ, climbs the CTGF and CYR61 bars, and flips the readout from Sox9 toward RUNX2, because the force is carried all the way to the genes. If B is right, the readout scatters with no link to the sliders. If C is right, a round and confined cell stays Sox9 even at maximum stiffness.",
    "components": [
      {
        "label": "Each idea in your own words",
        "why": "Re-saying a claim in plain words is how you find out whether you actually understand it, instead of copying the card."
      },
      {
        "label": "A clear expected result for each",
        "why": "A hypothesis is only useful if it predicts something you could actually watch on the bench. Name that result for every rival."
      },
      {
        "label": "A reason the result follows",
        "why": "The 'because' is the mechanism. It links the idea to the result, and the YAP and TAZ chain is exactly what the bench tests."
      }
    ],
    "takeaway": "When you can put each rival idea in your own words and say the result it predicts and why, you are ready to let the data choose between them."
  },
  2: {
    "task": "Open the Fate-Readout Measurement Ladder. For each rung you can reach, write the claim it would license. Then name the rung where you must STOP and say why the top rungs are locked.",
    "hint": "You may only climb as high as your most direct evidence; the bench is a model, not Mateo.",
    "exemplarAnswer": "Rung 1 (free, YAP/TAZ location): licenses \"YAP/TAZ shifts between cytoplasm and nucleus as I change stiffness and shape.\" Rung 2 (free, fate markers RUNX2 vs Sox9 with CTGF and CYR61 bars): licenses \"in this model, stiffer and more-spread biases cells toward the bone program.\" Rung 3 (paid, reporter validation, hire the interpreter): licenses \"the readout is a validated reporter of real YAP/TAZ-driven target activity (CTGF and CYR61), not just a model dial.\" Rung 4 (LOCKED, real in-vivo stiffness of Mateo's frontal-bone tissue) and Rung 5 (LOCKED, proof that stiffness ALONE sets fate in the living embryo) stay locked because this lab has no AFM or Brillouin instrument (the special tools that measure how stiff real tissue is), no trained operator, no interpreter, and because a bench model is not the embryo. I stop at Rung 3.",
    "components": [
      {
        "label": "Each claim is sized to its rung",
        "why": "The wording climbs from \"shifts\" to \"biases in this model\" to \"is a validated reporter,\" never jumping to \"causes Mateo's fate,\" which keeps each claim matched to its evidence."
      },
      {
        "label": "Names why the top is locked",
        "why": "No instrument, no operator, no interpreter, plus model-not-embryo, are the honest reasons, the same kind of gap as Act I's force rung."
      },
      {
        "label": "Picks a clear stopping rung",
        "why": "Choosing Rung 3 out loud is the discipline of not over-claiming before the data is even collected."
      }
    ],
    "takeaway": "Pick your highest claim from the evidence you can actually reach, not from the answer you are hoping for."
  },
  3: {
    "task": "Design a fair model run. Write your control, how many replicate runs you will do, and the exact LABEL you will put on your results so no one mistakes the model for Mateo.",
    "hint": "A control is the baseline you compare against; the label protects the reader from over-reading.",
    "exemplarAnswer": "Control: a soft-substrate, round-and-confined cell as the baseline, the condition where I expect cartilage-default Sox9 and mostly cytoplasmic YAP/TAZ. Replicates: at least 3 runs per stiffness setting so one dramatic run cannot fool me. Label: \"This bench is a MODEL of the stiffness-to-YAP/TAZ-to-fate relationship, based on stem-cell stiffness studies. It is NOT a measurement of Baby Mateo's tissue.\" That label sits on every result I report.",
    "components": [
      {
        "label": "Has a real baseline",
        "why": "The soft, round control is the \"nothing pushed\" case, so any shift on firmer, more-spread settings has something honest to be compared against."
      },
      {
        "label": "Three or more replicates",
        "why": "Repeats are what separate a real pattern from a lucky single run, the same honest-sample-size habit from Act I."
      },
      {
        "label": "Model-not-Mateo label",
        "why": "Writing it on every result is what stops the whole class from quietly sliding from \"in this model\" to \"in Mateo,\" which is the exact over-claim the ladder blocks."
      }
    ],
    "takeaway": "A fair test names its baseline, repeats itself, and labels what it is and is not."
  },
  4: {
    "task": "Run the bench. Drag SUBSTRATE STIFFNESS and CELL SHAPE/SPREAD and write down what you SEE happen to YAP/TAZ, the focal adhesions, and the fate readout, without yet saying what it means.",
    "hint": "Record observations only here. Change one slider at a time: 1) Freeze CELL SHAPE. Move only STIFFNESS and watch. 2) Now freeze STIFFNESS. Move only SHAPE and watch.",
    "exemplarAnswer": "On soft and round: YAP/TAZ mostly in the cytoplasm, focal adhesions small, readout sits on Sox9-cartilage with low CTGF and CYR61 bars. As I raise stiffness with shape held flat-and-spread: YAP/TAZ moves into the nucleus, focal adhesions grow, the readout swings toward RUNX2-bone and the CTGF and CYR61 bars rise. When I instead hold stiffness firm but force the cell round-and-confined: nuclear YAP/TAZ drops back and the readout slides back toward Sox9. I notice a firm substrate does not lock in bone if the shape is wrong, so it is not one number deciding everything.",
    "components": [
      {
        "label": "Observation, not conclusion",
        "why": "Recording \"YAP/TAZ moves to the nucleus\" instead of \"stiffness causes bone\" keeps the run as data, so the meaning can be judged later."
      },
      {
        "label": "Changes one thing at a time",
        "why": "Freezing shape first, then freezing stiffness, is what lets the student separate the two effects instead of tangling them."
      },
      {
        "label": "Catches the shape override",
        "why": "Seeing firm-but-round slide back to Sox9 records first-hand that fate is shape- and confinement-dependent, not a single stiffness number, exactly as the science requires."
      }
    ],
    "takeaway": "Write down what you saw before you decide what it means; one variable at a time keeps the picture clean."
  },
  5: {
    "task": "Look across your replicate runs. Write what your runs AGREE on and where they disagree, and decide whether one dramatic single run should change your mind.",
    "hint": "Agreement across repeats is the evidence; one striking run by itself is an anecdote.",
    "exemplarAnswer": "Across my 3 firm-and-spread runs, all 3 shifted YAP/TAZ to the nucleus and lifted RUNX2 over Sox9, with CTGF and CYR61 bars up. My soft-and-round controls all stayed on Sox9. One run swung especially hard toward bone, but I am not leaning on that single run; it is the agreement across all three that I trust. Where runs disagreed slightly was the exact size of the CTGF bar, so I treat the direction of the shift as solid and the precise amount as fuzzy.",
    "components": [
      {
        "label": "Reports the agreement",
        "why": "\"All 3 shifted the same way\" is the real signal, and naming it is what earns the claim later."
      },
      {
        "label": "Refuses the anecdote",
        "why": "Explicitly not leaning on the one dramatic run is the honest-sample-size habit that keeps a lucky result from becoming the headline."
      },
      {
        "label": "Separates direction from exact amount",
        "why": "Trusting the direction but not the precise bar height matches what a qualitative model can honestly support."
      }
    ],
    "takeaway": "Trust what your repeats agree on, not the single run that looked the most exciting."
  },
  6: {
    "task": "Write your conclusion. State the claim your evidence DOES support, then write the over-claim you are NOT allowed to make and name the gap that blocks it.",
    "hint": "Your claim must fit under the ladder ceiling you chose; name the missing evidence for the blocked claim.",
    "exemplarAnswer": "Supported claim: \"In this bench model, stiffer and more-spread conditions shift YAP/TAZ into the nucleus and bias crest cells toward the bone (RUNX2) program over the Sox9 cartilage default, and this repeated across runs.\" Blocked over-claim: \"Stiffness causes Baby Mateo's fate.\" The gap: this is a model of the relationship, not a measurement of Mateo's tissue; fate also depends on shape, confinement, and whether the cell is on a flat dish (2D) or surrounded by tissue (3D), which can change the answer, so one stiffness number does not set one fate; and we have no in-vivo force tool, operator, or interpreter to test the living embryo. Important: nuclear YAP/TAZ on a stiff matrix here is the CORRECT, healthy instruction to build bone in this spot, not a problem.",
    "components": [
      {
        "label": "Claim fits the ceiling",
        "why": "\"In this model, biases... and repeated across runs\" lands exactly at Rung 3 and never reaches \"causes Mateo,\" so the claim matches the evidence."
      },
      {
        "label": "Names all three gaps",
        "why": "Model-not-patient, context-dependence (shape, confinement, flat-dish 2D vs surrounded-by-tissue 3D), and no in-vivo tool are the honest reasons the over-claim is blocked, parallel to Act I's \"organization is not tension.\""
      },
      {
        "label": "Says the healthy state is healthy",
        "why": "Stating that nuclear YAP/TAZ on stiff matrix is the correct bone-building instruction here keeps stiffness from being mislabeled \"bad\" before Act III's wrong-place twist."
      }
    ],
    "takeaway": "Claim exactly what your evidence reaches, then name out loud the gap that stops you from claiming more."
  },
  7: {
    "task": "Write the bridge to Act III. In a sentence or two, say what this act showed about the force chain and pose the next question Act III will chase.",
    "hint": "Reuse the same chain (integrin to focal adhesion to tension to YAP/TAZ to fate) and turn it toward what goes wrong.",
    "exemplarAnswer": "Act I showed this force chain, integrin to focal adhesion to actomyosin tension to nuclear YAP/TAZ, positions the cells; Act II showed the same chain also tells those cells what to BECOME, tuning bone versus cartilage by stiffness and shape, where reading it correctly is healthy. Next question for Act III: what happens when a cell runs this exact chain with no off-switch, in the wrong place, so the same instruction that built Mateo's bone starts driving a tumor?",
    "components": [
      {
        "label": "Names the shared chain",
        "why": "Repeating integrin to FA to tension to YAP/TAZ to fate makes clear all three acts study one mechanism, not three unrelated topics."
      },
      {
        "label": "Frames Act III as hijack",
        "why": "\"Same chain, no off-switch, wrong place\" sets up cancer as a misused-but-familiar process, which is accurate and less scary than a brand-new villain."
      },
      {
        "label": "Keeps the healthy framing intact",
        "why": "Stating that reading the chain correctly is healthy here protects the guardrail that stiffness and nuclear YAP/TAZ are only pathological in the wrong context."
      }
    ],
    "takeaway": "The same force chain that builds you can harm you when it runs in the wrong place with no off-switch."
  },
}

export const CHAPTERS2: LibraryChapter[] = [
  {
    "id": "yap-taz",
    "title": "YAP and TAZ: how a cell feels its way to a decision",
    "summary": "A cell does not just read chemical signals. It also feels the physical world around it: how stiff the ground is, how much room it has, whether it is flattened and spread out or balled up and confined. Two partner proteins, YAP and TAZ, are the cell's way of turning that physical feeling into a genetic instruction. When the matrix is firm and a cell pulls hard and spreads out, YAP and TAZ move into the nucleus and switch on target genes like CTGF and CYR61. This chapter explains that machinery, why the readout depends on shape and dimension and not on stiffness alone, and why the bench you are about to use is an honest model of the relationship and not a measurement of Baby Mateo's real tissue.",
    "readMinutes": 10,
    "sections": [
      {
        "heading": "The force chain you already built, now carrying a message",
        "paragraphs": [
          "In Act I you traced a chain of parts that lets a cell grip the world and pull on it. A protein called integrin reaches through the cell's outer membrane and clamps onto the meshwork outside the cell, the extracellular matrix. Where integrins cluster, the cell builds a focal adhesion, a kind of molecular rivet that anchors the inside of the cell to the outside world. Running inward from that rivet is the cell's muscle-like skeleton, bundles of actin pulled tight by motor proteins called myosin. Together actin and myosin generate actomyosin tension, the steady inward pull a cell uses to test how firm its surroundings are. You measured where cells sat. This chapter is about the message that travels along that same chain.",
          "Here is the key idea for all of Act II. The very same chain that helped position the cells also tells them what to become. Integrin to focal adhesion to actomyosin tension is not only a way to crawl and hold on. It is also a way to sense. A cell that pulls against a firm surface feels resistance, the way your hand feels the difference between pressing on a tabletop and pressing on a pillow. That felt resistance gets converted into a signal that reaches all the way to the genes. The general name for turning a physical force into a biochemical message is mechanotransduction, and YAP and TAZ are two of its most important messengers.",
          "Think of YAP and TAZ as a vote that the cell's mechanics get to cast. They do not act alone, and they do not override everything else. But when the physical conditions line up a certain way, they carry that information into the nucleus and tip a decision. In the next sections you will see exactly what moves them, what they switch on when they arrive, and why a single stiffness number is not enough to predict the outcome. Hold on to the chain itself: integrin, focal adhesion, actomyosin tension, then YAP and TAZ, then a gene. It is the spine of this entire act."
        ],
        "terms": [
          "integrin",
          "extracellular matrix",
          "focal adhesion",
          "actin",
          "myosin",
          "actomyosin tension",
          "mechanotransduction",
          "YAP",
          "TAZ"
        ]
      },
      {
        "heading": "In or out of the nucleus: the shuttle that does the work",
        "paragraphs": [
          "YAP and TAZ are partner proteins that do the same job, which is why scientists usually name them together as YAP/TAZ. YAP and TAZ cannot grab onto DNA by themselves. They work as helpers (scientists call them transcriptional co-activators): once inside the nucleus they team up with DNA-gripping partner proteins called TEAD, and together they switch target genes on. The whole trick of YAP/TAZ is location. When they sit out in the cytoplasm, the watery space outside the nucleus, they are parked and quiet. When they move into the nucleus, where the DNA lives, they get to work. So the cell's decision is really a question of address: are YAP and TAZ inside the nucleus or outside it?",
          "What pushes them in? Tension. When a cell is on a firm matrix and builds large focal adhesions and pulls hard with its actomyosin skeleton, that mechanical state shifts YAP and TAZ toward the nucleus. When a cell sits on a soft, pillowy matrix, cannot build strong adhesions, and stays slack and rounded, YAP and TAZ drift back out to the cytoplasm and go quiet. On the bench you are about to use, you will literally watch this: as you raise the substrate stiffness or let the cell flatten and spread, an animated YAP/TAZ signal slides from the cytoplasm into the nucleus, and as you soften the matrix or let the cell ball up, it slides back out.",
          "Once YAP and TAZ reach the nucleus and pair with TEAD, they turn on a signature set of target genes. Two of the most reliable are CTGF, also written CCN2, and CYR61, also written CCN1. These are the genes the field treats as the fingerprint of active nuclear YAP/TAZ, which is why the bench shows them as activity bars: when the bars rise, you are seeing the molecular evidence that YAP and TAZ are in the nucleus and switched on, not just guessing from the cell's shape. Encouragingly, you do not have to memorize a long list. If you remember nucleus equals on, cytoplasm equals off, and CTGF and CYR61 as the readout, you understand the core of the mechanism."
        ],
        "terms": [
          "transcriptional co-activator",
          "TEAD",
          "cytoplasm",
          "nucleus",
          "nuclear localization",
          "CTGF (CCN2)",
          "CYR61 (CCN1)",
          "target gene"
        ]
      },
      {
        "heading": "Stiffness, shape, and 2D versus 3D: why one number is not the answer",
        "paragraphs": [
          "It is tempting to write a tidy rule: stiff matrix means nuclear YAP/TAZ, soft matrix means cytoplasmic. That rule is a useful starting point, and it is roughly what classic mechanotransduction experiments showed for cells spread on flat surfaces, where stiffer substrates drove YAP/TAZ into the nucleus. But it is not the whole truth, and getting this nuance right is what separates a careful scientist from a hasty one. YAP and TAZ do not respond to stiffness alone. They respond to how spread out the cell is, how large its adhesions are, how confined it is, and even where it is in its growth cycle. Stiffness is one input among several, not a master dial.",
          "Cell shape is a powerful example. A cell forced to stay small and round can keep YAP and TAZ in the cytoplasm even on a firm surface, while the same cell allowed to flatten and spread can drive them into the nucleus. That is why the bench gives you two sliders, substrate stiffness and cell shape or spread, instead of one. They are separate levers, and they can agree or disagree. Dimensionality matters too. A cell grown on top of a flat dish, called a 2D culture, often behaves very differently from the same cell surrounded on all sides inside a soft three-dimensional gel, called a 3D culture, because being wrapped in matrix changes how it can pull and spread. A number that predicts fate in 2D can fail in 3D.",
          "So the honest summary is this: nuclear YAP/TAZ is context-dependent. The reading you get depends on several things at once: how stiff the matrix is, how spread out the cell is, how boxed-in (confined) it is, how much of it is gripping the surface, whether it is in 2D or 3D, and even where it is in its growth cycle. This is not a flaw in the science, it is the science. And it carries a direct warning for the bench: a single stiffness setting does not map cleanly to a single fate. When you run the bench and watch the fate readout swing, you are seeing a tendency under a particular combination of conditions, not a law that says this stiffness always produces this cell. Wrong first guesses here are completely safe, because the whole point is to discover the relationship by manipulating it, not to recite a rule you were handed."
        ],
        "terms": [
          "substrate stiffness",
          "cell spread",
          "confinement",
          "adhesion area",
          "2D culture",
          "3D culture",
          "dimensionality",
          "context-dependent",
          "cell cycle"
        ]
      },
      {
        "heading": "The bench is a model, not a window into Mateo",
        "paragraphs": [
          "The mechanotransduction bench you are about to use is deliberately built as a model. You set a substrate stiffness on a labeled qualitative scale, from soft like fat or brain tissue up to firm like the matrix just before it becomes bone, and you set a cell shape from round and confined to flat and spread. The bench then resolves YAP/TAZ localization, the CTGF and CYR61 bars, and a bone or cartilage fate readout in a consistent, rule-based way. Because it follows fixed rules, you can run it many times, change one slider, and learn what depends on what. That is exactly what a good model is for. It lets you ask clean cause-and-effect questions that the real embryo would never let you ask one variable at a time.",
          "But a model of a relationship is not a measurement of a patient. The bench is not reading Baby Mateo's actual frontal-bone tissue, and it cannot. The real, in-the-body stiffness or force around Mateo's crest cells stays locked on your Measurement Ladder for the same honest reasons you met in Act I. The lab has no instrument that measures living tissue stiffness here, no trained operator to run such an instrument, and no interpreter to turn its numbers into a fate claim. The tools that could measure stiffness directly, like atomic force microscopy or Brillouin microscopy, generally need prepared or non-living samples, a skilled operator, and an expert reader, none of which this lab has. So the top force rungs stay locked, on purpose.",
          "This is the same kind of honesty gap you learned to respect in Act I, just one level deeper. In Act I the trap was to say that spatial organization, where cells sit, is the same thing as the tension they feel. Here the trap is to say that the bench's stiffness slider causes Baby Mateo's fate. It does not, for two stacked reasons: the bench is a model and not Mateo's tissue, and even in the model the outcome is context-dependent rather than set by stiffness alone. The claim you can honestly make is bounded and still genuinely useful: in this model, stiffer and more spread conditions tend to push YAP and TAZ into the nucleus and bias crest cells toward the bone program. Naming the gap out loud is not a weakness in your answer. It is the strongest part of it."
        ],
        "terms": [
          "model",
          "qualitative scale",
          "Measurement Ladder",
          "atomic force microscopy",
          "Brillouin microscopy",
          "operator",
          "interpreter",
          "over-claim",
          "in-vivo"
        ]
      }
    ],
    "known": [
      "A cell physically grips its surroundings through integrins, builds focal adhesions where integrins cluster, and pulls inward using actomyosin tension; this same chain that positions cells also carries a sensing signal.",
      "Mechanotransduction is the conversion of a physical force into a biochemical message, and YAP and TAZ are two central messengers of it.",
      "YAP and TAZ are transcriptional co-activators that are inactive in the cytoplasm and active only when they move into the nucleus and partner with TEAD proteins.",
      "Firm matrix, large focal adhesions, strong pulling, and a flattened, spread cell shape shift YAP/TAZ toward the nucleus; soft matrix and a rounded, slack, confined cell shift them back to the cytoplasm.",
      "Nuclear YAP/TAZ switches on a signature set of target genes, most reliably CTGF (CCN2) and CYR61 (CCN1), which serve as the molecular readout that YAP/TAZ are active.",
      "YAP/TAZ localization is context-dependent: it responds to substrate stiffness, cell shape and spread, confinement, adhesion area, 2D versus 3D dimensionality, and the cell cycle, so a single stiffness value does not map to a single outcome.",
      "The mechanotransduction bench is an explicit, rule-based model of the stiffness-shape-YAP/TAZ-fate relationship, useful precisely because it can be run repeatedly with one variable changed at a time.",
      "The real in-the-body stiffness and force around Baby Mateo's crest cells stay locked on the Measurement Ladder because the lab has no instrument, no trained operator, and no interpreter for a direct living-tissue measurement, and because the bench is a model rather than Mateo's tissue."
    ],
    "unknown": [
      "The precise quantitative rules by which a real cell integrates stiffness, shape, confinement, adhesion area, and dimensionality into a single YAP/TAZ output are still being worked out and differ between cell types and conditions.",
      "Exactly how mechanical tension is transmitted from focal adhesions to the nucleus to change YAP/TAZ location (including how forces on the nuclear envelope and nuclear pores contribute) is an active area of research and not fully settled.",
      "Whether nuclear YAP/TAZ in living craniofacial tissue tracks the same way it does on flat 2D culture surfaces is not established, because 3D, in-the-body conditions are much harder to measure.",
      "The actual stiffness or force experienced by Baby Mateo's frontal-bone crest cells is unmeasured in this lab and remains a locked rung; the bench cannot supply it.",
      "How strongly the YAP/TAZ mechanical vote competes with or cooperates with chemical signals like Wnt in any specific cell at any specific moment is not precisely quantified."
    ],
    "keyQuestions": [
      "If I raise only the substrate stiffness slider and leave cell shape round and confined, will YAP and TAZ still move into the nucleus, or does shape have to change too?",
      "If the CTGF and CYR61 bars rise on the bench, what exactly have I shown, and what have I still not shown about Baby Mateo's real tissue?",
      "Because YAP/TAZ behaves differently in 2D culture than in a 3D gel, which of the bench's results should I trust as a tendency and which should I treat with extra caution when thinking about a real embryo?",
      "What additional tool or rung would I need to unlock before I could honestly say that a measured stiffness, not just a modeled one, moved YAP/TAZ in Mateo's tissue?",
      "Stiff matrix here drives the healthy instruction to build bone, so what would have to be different about the place or timing for that same nuclear-YAP/TAZ state to become a problem instead of the right answer?"
    ]
  },
  {
    "id": "fate-switch",
    "title": "Bone or cartilage: how a crest cell casts its vote",
    "summary": "A cranial neural crest cell that arrives in the forehead region still has a decision to make: become bone, or stay cartilage. Cartilage is the default, the path the cell takes if nothing steers it. Two systems work together to steer it. A chemical master switch, Wnt acting through beta-catenin, turns on the bone program (RUNX2 then Osterix) and holds the cartilage program (Sox9) off. And a mechanical input, carried by YAP/TAZ, biases the same decision based on how firm and spread the cell's surroundings are. This chapter shows how chemistry and mechanics meet at one switch, why a healthy stiff-matrix push toward bone is the right instruction in this place, and how the matched-niche-stiffness idea is a model basis, not a measurement of Mateo.",
    "readMinutes": 10,
    "sections": [
      {
        "heading": "Cartilage is the default, and bone has to be chosen",
        "paragraphs": [
          "When cranial neural crest cells finish their journey and settle into the forehead region that will build the frontal bone, they are not a blank slate, but they have not fully decided yet. In the area the lab studies, this group of cranial neural crest cells is tripotent: cells from this population can still go down one of three paths (scientists call this tripotent), and give rise to bone, the deep layer of skin called dermis, or cartilage. The single most important fact about this decision is that cartilage is the default. If nothing actively instructs these cells, they drift toward becoming cartilage. Making bone is not the easy, automatic path. Bone has to be chosen, switched on by an outside instruction.",
          "This reframes a birth difference in a clear and humane way. A piece of skull bone that is missing or too small can be read as a fate decision that tipped the wrong way: cells that should have been steered to bone fell back to the default and made cartilage, or simply failed to commit to bone, in a place that needed bone. (Mateo's own cleft is a different kind of event, a fusion that did not happen, covered in the Develop library. The shared thread is the family of cells, not the same failure.) Nothing is broken in a moral sense and no one is at fault. A switch that should have flipped did not flip, or flipped weakly, at a critical moment. Seeing it this way turns a scary diagnosis into a question a scientist can actually investigate: what instruction was supposed to push these cells to bone, and was it strong enough?",
          "The marker genes give you a way to read the decision from the molecules. Sox9 is the gene that runs the cartilage program, so Sox9 marks the default path. RUNX2 is the master gene that starts the bone program, and once RUNX2 is on it switches on Osterix, which carries the bone program further toward making the matrix that hardens into bone. So in the simplest terms: Sox9 up means cartilage, RUNX2 and then Osterix up means bone. The bench shows these as a Sox9 cartilage icon versus a RUNX2 bone icon, so you can watch which way a cell's vote is leaning."
        ],
        "terms": [
          "tripotent",
          "default fate",
          "cartilage",
          "dermis",
          "bone",
          "Sox9",
          "RUNX2",
          "Osterix",
          "cell fate decision"
        ]
      },
      {
        "heading": "The chemical master switch: Wnt and beta-catenin",
        "paragraphs": [
          "The instruction that overrides the cartilage default is a signal called Wnt. Wnt is a protein that one group of cells releases to change the behavior of nearby cells. Inside the receiving cell, the Wnt message is carried by a protein called beta-catenin. When Wnt signaling is on, beta-catenin builds up and moves into the nucleus, where it helps switch on the bone program (RUNX2, then Osterix) and the dermis program (run by Twist1 and Twist2, the second of which is also called Dermo1), while keeping the cartilage program (Sox9) switched off. When Wnt is off, beta-catenin is kept low, the bone and dermis programs stay quiet, and the cell slides back toward its cartilage default. Because flipping this one signal flips the whole decision, the lab calls Wnt and beta-catenin the master switch.",
          "There is an address system built into where the Wnt signal comes from. Part of the Wnt that steers these cells is released by the ectoderm, the skin layer lying on top of the mesenchyme. Cells nearest that ectodermal source see the strongest Wnt signal, which turns on the bone and dermis programs; cells that receive little or no signal fall back toward the cartilage default. So a cell's position relative to that source helps decide what it becomes. Exactly how position fine-tunes the choice between bone and dermis, once a cell has left the cartilage default behind, is part of what researchers are still mapping. Even so, the big lesson is the same one that runs through the whole Library, now at the level of a single cell's identity: where a cell sits, and what it can hear from its neighbors, helps decide what it becomes.",
          "This master switch is genuine chemistry, and on its own it can explain a great deal. But it is not the only voice in the room. A cell deciding between bone and cartilage is also feeling its physical surroundings at the same moment it is reading Wnt. To understand the full decision, you have to put the chemical switch and the mechanical input side by side, which is exactly what the next section does."
        ],
        "terms": [
          "Wnt",
          "beta-catenin",
          "master switch",
          "Twist1",
          "Twist2 (Dermo1)",
          "ectoderm",
          "mesenchyme",
          "positional signal"
        ]
      },
      {
        "heading": "Where mechanics meets the switch",
        "paragraphs": [
          "Now bring back YAP and TAZ from the previous chapter. The bone-or-cartilage decision is not made by chemistry alone. The cell's mechanical state, how firm its matrix is and how spread out it is, also pushes the vote, and it does so through the same force chain you have been following all act: integrin, focal adhesion, actomyosin tension, then YAP/TAZ into the nucleus. When the matrix is firm and the cell pulls hard and spreads, nuclear YAP/TAZ tends to favor the bone-building program, alongside the Wnt master switch. When the matrix is soft and the cell stays rounded, that mechanical push toward bone eases off, and the cartilage default has more room to win.",
          "The idea that a cell's matrix stiffness can bias which tissue it becomes is grounded in a real and famous set of experiments. Working with mesenchymal stem cells grown on gels of different firmness, the Engler group and colleagues found that cells on soft, brain-like gels leaned toward soft-tissue fates, cells on intermediate, muscle-like gels leaned toward muscle, and cells on firm, bone-like gels leaned toward bone, as if each cell tried to match the tissue its surroundings felt like. This matched-niche-stiffness idea is the model basis for the bench. But notice the careful wording: it is a model basis, framed as a model. It tells you a believable rule for the bench to follow. It is not a measurement of Baby Mateo's tissue, and it does not prove what set Mateo's fate.",
          "Here is the most important idea in this chapter: building bone here, on a stiff matrix, is the cell doing exactly the right thing. Nuclear YAP/TAZ on a stiff matrix, pushing crest cells toward bone in this forehead location, is the correct, healthy instruction. Stiffness is not the villain. The cells are supposed to build bone here, and a firm matrix that drives them to do it is the body working as intended.",
          "Context is what decides whether a signal is right or wrong, not the signal by itself. This matters because Act III will show the very same nuclear-YAP/TAZ state turning harmful, not because the state changed, but because it appears in the wrong place at the wrong time. Same chain, same messengers, different context, opposite meaning. Keeping that straight is what lets you avoid the lazy and incorrect story that stiffness is simply bad."
        ],
        "terms": [
          "YAP/TAZ",
          "matrix stiffness",
          "mesenchymal stem cell",
          "matched-niche stiffness",
          "model basis",
          "context",
          "healthy instruction",
          "force chain"
        ]
      },
      {
        "heading": "What you can honestly claim, and where the ladder stays locked",
        "paragraphs": [
          "When you run the bench, one dramatic slider sweep is only an anecdote. Drag the stiffness up once, watch the fate readout swing to bone, and you have a single result that could be a fluke of that one run. Science does not trust a single swing. What earns trust is agreement across replicate runs: set up a control, the soft-substrate and round-cell baseline, then run the same condition several times and see whether the bias toward bone shows up again and again. This is the same honest-sample-size idea you used in Act I, where one cell's spacing meant little and a repeated pattern across many cells meant something. A bias you can reproduce is a finding. A bias you saw once is a story.",
          "So what claim does all this license? Within the ceiling of your tools, you can honestly say: in this model, stiffer and more spread conditions move YAP/TAZ into the nucleus and bias crest cells toward the bone program over the cartilage default. That is a real, defensible conclusion, and it is genuinely worth making. What you cannot say is that stiffness causes Baby Mateo's fate. That over-claim is blocked for three reasons you can now name precisely. First, the bench is a model of the relationship and not a measurement of Mateo's tissue. Second, the outcome is context-dependent, so stiffness alone does not set fate even in the model. Third, the lab has no tool, operator, or interpreter to measure the real in-the-body force, so the direct in-vivo rungs stay locked, exactly as in Act I.",
          "This is the parallel that ties Act II back to Act I. There, the gap was that spatial organization is not the same thing as tension. Here, the gap is that a modeled stiffness is not the same thing as a proven cause in a living embryo. In both cases the move that makes you a real scientist is identical: state the bounded claim your evidence supports, then name the gap out loud instead of papering over it. And then look forward. You have now shown that the same force chain that positioned the cells in Act I also tells them what to become in Act II. The question that opens Act III follows naturally and a little ominously: what happens when a cell runs this same chain with no off-switch, in the wrong place?"
        ],
        "terms": [
          "control",
          "replicate",
          "sample size",
          "valid claim",
          "over-claim",
          "ceiling",
          "in-vivo",
          "locked rung"
        ]
      }
    ],
    "known": [
      "A cranial neural crest population in the forehead region is tripotent: cells from this group can become bone, dermis, or cartilage, and cartilage is the default they fall to if nothing actively steers them.",
      "Sox9 marks the cartilage program; RUNX2 is the master gene that starts the bone program and then switches on Osterix to carry bone-building further.",
      "Wnt acting through beta-catenin is the master switch that turns on the bone (RUNX2, Osterix) and dermis (Twist1, Twist2/Dermo1) programs while repressing the cartilage program (Sox9).",
      "Part of the steering Wnt signal comes from the overlying ectoderm, so a cell's position relative to that source helps set its fate; cells nearest the source see the strongest signal that turns on the bone and dermis programs, and cells that receive little or no signal fall back toward the cartilage default.",
      "Mechanics also biases the decision: through the integrin to focal adhesion to actomyosin tension to nuclear YAP/TAZ chain, a firmer matrix and a more spread cell push toward the bone program.",
      "Nuclear YAP/TAZ on a stiff matrix, driving bone here, is the correct and healthy instruction; stiffness is not inherently harmful, and context decides whether a signal is right.",
      "The matched-niche-stiffness finding (Engler and colleagues, where mesenchymal stem cells on bone-like gels leaned toward bone) is the model basis for the bench, framed as a model and not as a measurement of Mateo.",
      "A reproducible bias across replicate model runs (compared to a soft-substrate, round-cell control) is what counts as evidence, not a single dramatic slider sweep.",
      "A piece of skull bone that is missing or too small can be read as a fate decision that tipped toward the cartilage default, or failed to commit to bone in a place that needed bone. Mateo's cleft is a separate fusion event in the same family of cells, not this same fate miscall."
    ],
    "unknown": [
      "Exactly how the chemical Wnt/beta-catenin switch and the mechanical YAP/TAZ input combine in any single living crest cell, and which one dominates under given conditions, is not fully resolved.",
      "Exactly how a cell, once it commits to bone or dermis, keeps the cartilage program (Sox9) durably switched off is still being worked out.",
      "Whether the matched-niche-stiffness behavior seen for mesenchymal stem cells on culture gels actually governs fate in living craniofacial tissue is not established; it is a model basis, not a measured fact about Mateo.",
      "The real in-the-body stiffness or force around Baby Mateo's frontal-bone crest cells is unmeasured and stays a locked rung, so no direct causal claim about stiffness setting his fate is currently possible.",
      "Why two embryos with the same genetic risk can differ, one forming a cleft and one not, is not fully explained; environmental and epigenetic second hits are suspected but not proven for any single case."
    ],
    "keyQuestions": [
      "If cartilage is the default, what is the minimum instruction (chemical Wnt, mechanical stiffness, or both together) needed to flip a forehead crest cell to bone, and which can I actually test on the bench?",
      "If I blocked the Wnt signal coming from the overlying ectoderm, would these cells build cartilage instead of bone, and how would that show up in the Sox9 versus RUNX2 readout?",
      "The bench shows stiffer and more spread conditions biasing toward bone in the model: what control and how many replicate runs would I need before I trust that bias as a real finding rather than one lucky sweep?",
      "Nuclear YAP/TAZ pushing toward bone is healthy here, so what exactly about Act III's setting (place, timing, or an absent off-switch) turns that same instruction into a problem?",
      "What tool or rung would have to be unlocked before I could move from the honest claim, in this model stiffness biases fate, to the blocked claim, stiffness caused Mateo's fate?"
    ]
  }
]

export const STAGE_ILLUSTRATIONS2: Record<number, Illustration> = {
  4: {
    src: '/illustrations/stage-II-bench.webp',
    alt: 'A mechanotransduction bench: two sliders for substrate stiffness and cell shape feed a model cell whose YAP and TAZ shift between cytoplasm and nucleus, resolving to a bone or cartilage fate readout.',
    caption: 'The mechanotransduction bench: set stiffness and cell shape, watch YAP and TAZ move, and read the bone-versus-cartilage tendency. It is a model, not a measurement of Mateo.',
  },
}

export const LIBRARY_FOR_STAGE2: Record<number, string> = {
  0: 'fate-switch', 1: 'yap-taz', 2: 'fate-switch', 3: 'yap-taz',
  4: 'yap-taz', 5: 'yap-taz', 6: 'fate-switch', 7: 'fate-switch',
}
export const READ_BEFORE_CHOOSING2 = new Set<number>([1, 4])
export const EXTENSIONS2: LibraryExtension[] = EXTENSIONS_DIFFERENTIATE

/** The dramatic act-opening story (shown before step 1). It teaches YAP, TAZ, and
 *  Sox9 through what a scientist OBSERVED, the correlations and clues, and leaves the
 *  causal mechanism for the student to deduce and test across the act. No em dashes. */
export const ACT2_STORY: ActStoryContent = {
  kicker: 'BEFORE YOU BEGIN · A STORY FROM THE NOTEBOOKS',
  title: 'The notebooks on the bench',
  paragraphs: [
    'It is late, and the only light in the lab is the cold blue glow of the microscope. A scientist slides another coverslip under the lens, and the screen fills with cells, their nuclei stained until they shine like scattered stars. She is chasing a pattern she cannot yet explain.',
    "Months earlier she had started growing one kind of cell, cranial neural crest cells, the same restless family that built Mateo's frontal bone, on surfaces she made by hand. Some she left soft as jelly. Some she set firm as a healed scar. Same cells. Same nutrients. Same morning. The only thing she changed was what the cells were standing on.",
    'And the cells did not behave the same.',
    'On the soft, yielding gels they stayed small and round, huddled and shy. Weeks later they had become cartilage, and beside them in her notebook one gene is circled again and again, pressed harder each time: Sox9. On the firm gels the very same cells threw themselves flat and wide, gripping, spreading against the world. Those cells turned to bone.',
    'She had tagged two proteins to glow, YAP and TAZ, and she could not stop watching where they went. On the soft dishes they drifted loose in the body of the cell, idle. On the firm dishes they were somewhere else entirely, pulled deep inside the nucleus and pressed against the DNA, as though something had reached out and summoned them in.',
    'A correlation is not a cause. She wrote it in the margin and underlined it twice. Stiffness. Shape. Where two proteins sat. Which gene lit up. Which tissue the cell became. Five things that always moved together, like dancers holding hands. But moving together is not the same as one of them calling the steps. Maybe the stiffness was in command. Maybe the shape. Maybe YAP and TAZ were only passengers, and Sox9 the real driver, or its rival.',
    'She never ran the experiment that would have told her which. Her notebooks are still here on the bench, every observation in a careful hand, the last line left blank.',
    'That blank is yours. Everything you need is already in what she saw: soft and round and Sox9 and cartilage on one side; firm and spread and two proteins in the nucleus and bone on the other. The clues are in the notebooks. The rule that ties them together is not. Your work in this act is to design the experiment she did not, and earn the right to say which of these is really in command.',
  ],
  clues: [
    'Work in a team. Say each idea out loud, and make someone defend the one they think is wrong. That is how you find what each idea really predicts.',
    'Draw the pathway on paper: stiffness and shape, then YAP and TAZ moving, then which gene switches on, then which tissue the cell becomes. The arrows are the whole act.',
    'Read the chapter, then open the notebook and keep going. The deeper you read, the more the LM notebooks break the science down, they have explainers built in.',
    'Clue: watch WHERE YAP and TAZ sit, in the nucleus or out in the body of the cell, not just whether they are present.',
  ],
  libraryRef: 'yap-taz',
  notebookLabel: '📓 Open the YAP, TAZ and Sox9 notebook for clues →',
}

export const ACT2: ActContent = {
  id: 'differentiate',
  index: 2,
  shortTitle: 'Differentiate',
  rungs: RUNGS2,
  rungNames: RUNG_NAMES2,
  rungColors: RUNG_COLORS2,
  rungWhy: RUNG_WHY2,
  ceilNote: ceilNote2,
  pinnedQuote: PINNED_QUOTE2,
  ceilingAside: CEILING_ASIDE2,
  ladderFooter: 'model readouts only',
  questions: QUESTIONS2,
  hypotheses: HYPOTHESES2,
  claims: CLAIMS2,
  resource: ACT2_RESOURCE,
  stageLabels: ['Ask', 'Hypothesize', 'Choose tools', 'Design', 'Run / Measure', 'Analyze', 'Conclude', 'Iterate'],
  stageBrief: STAGE_BRIEF2,
  stageGoal: STAGE_GOAL2,
  processSteps: PROCESS_STEPS2,
  story: ACT2_STORY,
  passLine: PASS_LINE2,
  stageIllustrations: STAGE_ILLUSTRATIONS2,
  reflect: REFLECT2,
  chapters: CHAPTERS2,
  libraryForStage: LIBRARY_FOR_STAGE2,
  readBeforeChoosing: READ_BEFORE_CHOOSING2,
  extensions: EXTENSIONS2,
}
