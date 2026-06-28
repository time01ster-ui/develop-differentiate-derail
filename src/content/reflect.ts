// Per-stage reflection content: the task the student writes in their own words,
// a worked EXEMPLAR (a model answer broken into the components of a good answer,
// each with WHY it matters), and the stage's takeaway (the learning moment).
// The exemplar is revealed only AFTER the student submits their own answer, so
// they generate first and compare second. Grade-9 language, no answer-leaks
// (the model answer is the point of the reflection, shown post-submit).

export interface ExemplarComponent {
  label: string
  why: string
}

export interface StageReflection {
  /** What the student writes, in their own words. */
  task: string
  /** A short nudge under the task. */
  hint: string
  /** The model answer, shown after they submit. */
  exemplarAnswer: string
  /** The parts that make it a good answer, each with why it matters. */
  components: ExemplarComponent[]
  /** The learning moment / key takeaway for this step. */
  takeaway: string
}

export const REFLECT: Record<number, StageReflection> = {
  0: {
    task: 'In your own words, write the one testable question you would ask about Baby Mateo’s case.',
    hint: 'Name exactly what you would measure, and what you would compare it to.',
    exemplarAnswer:
      'Do neural crest cells space themselves non-randomly in FN1-rich tissue compared to an FN1-blocked control?',
    components: [
      { label: 'Names a measurable thing', why: 'Spacing can be measured with geometry. “Why” and “important” cannot be measured.' },
      { label: 'Names a comparison', why: 'FN1-rich versus an FN1-blocked control lets you tell whether FN1 is what matters.' },
      { label: 'Could go either way', why: 'The cells might turn out to be spaced randomly. A good question can fail.' },
      { label: 'Answerable with your tools', why: 'You can answer it in the browser with segmentation and Voronoi, no special hardware.' },
    ],
    takeaway: 'A testable question names exactly what you will measure and what you will compare, could go either way, and can be answered with the tools you actually have.',
  },
  1: {
    task: 'Put each of the three hypotheses into your own words. Do not copy the cards, explain what each one actually claims, the way you would to a friend.',
    hint: 'Then use the cards: for each idea, say the result you would expect to see if it were true, and why, before you flip to check.',
    exemplarAnswer:
      'In my own words: (A) a graded FN1 “road” guides the cells into ordered spacing; (B) spacing is pure chance; (C) spacing is set later by the skull’s shape, not by FN1. What I expect: if A is right, FN1-rich tissue shows larger, more regular spacing than the FN1-blocked control, because a guiding road would organize the cells. If B is right, the two groups look the same, because chance ignores FN1. If C is right, spacing is identical no matter the FN1, because the real cause comes later.',
    components: [
      { label: 'Each idea in your own words', why: 'Re-saying a claim in plain words is how you find out whether you actually understand it, instead of copying the card.' },
      { label: 'A clear expected result for each', why: 'A hypothesis is only useful if it predicts something you could actually see. Name that result for every rival.' },
      { label: 'A reason the result follows', why: 'The “because” is the mechanism. It links the idea to the result, and it is what the experiment really tests.' },
    ],
    takeaway: 'When you can put each rival idea in your own words and say the result it predicts and why, you are ready to let the data choose between them.',
  },
  2: {
    task: 'List the tools you will run, write the highest claim they let you make, and explain why you cannot go higher.',
    hint: 'Tie the strongest thing you can say to your most direct tool.',
    exemplarAnswer:
      'I will run Spatial layout (Cellpose plus Voronoi), which is free and runs in the browser. The highest claim I can make is that the cells are non-randomly spaced. I cannot claim tension. The direct force tool (FRET tension sensors) is not in this lab, and even if it were, I would need both a trained operator and a data interpreter, and I have hired neither.',
    components: [
      { label: 'Names the tools', why: 'You should know exactly what you ran.' },
      { label: 'Names the claim ceiling', why: 'Your most direct tool sets the strongest thing you can honestly say.' },
      { label: 'Names which resource is missing', why: 'A rung is blocked by a specific gate: the instrument, or a hire you do not have. Name the one that stops you.' },
    ],
    takeaway: 'Your claim ceiling is set by your most direct tool, not by what you hope to find.',
  },
  3: {
    task: 'Describe your experiment design, and explain why it is fair.',
    hint: 'Cover the control, the number of embryos, and the distance label.',
    exemplarAnswer:
      'FN1-rich tissue versus an FN1-blocked control, at least 3 embryos per group, with the distance labeled as 2D-projected. It is fair because it has a control to compare against, enough animals to tell a real signal from random differences between embryos, and an honest label for what the distance really is: a 2D-projected distance from a flat photo, not a true 3D one.',
    components: [
      { label: 'Has a control', why: 'Without a comparison group, a pretty picture supports nothing.' },
      { label: 'Has enough replicates', why: 'Three or more embryos let you separate a real signal from one embryo that happened to be unusual.' },
      { label: 'Labels the measurement honestly', why: 'A flat photo gives a 2D distance, not a true 3D one. Say so.' },
    ],
    takeaway: 'Make it fair before you run it: a control, enough replicates, and honest labels.',
  },
  4: {
    task: 'Report what you measured, and how you measured it.',
    hint: 'Name the method and give the numbers with units.',
    exemplarAnswer:
      'I segmented the nuclei to find each cell’s center, then built Voronoi territories and measured the nearest-neighbor distance for each embryo (a mean nearest-neighbor distance of roughly 80 to 100 µm). The geometry was computed, not guessed.',
    components: [
      { label: 'Names the method', why: 'Center, then Voronoi, then nearest-neighbor: anyone could repeat it.' },
      { label: 'Reports the numbers', why: 'A measurement is a number with a unit (µm), not an impression.' },
      { label: 'Keeps it per-embryo', why: 'You will need one value per embryo for an honest test later.' },
    ],
    takeaway: 'Measure the geometry, and report the method and the numbers, not a feeling.',
  },
  5: {
    task: 'Explain which test is honest here, and why.',
    hint: 'Think about what counts as one real data point.',
    exemplarAnswer:
      'The pooled per-cell test gives a tiny p-value, but that is pseudoreplication: it counts hundreds of cells as if each were its own experiment. The honest test is per-embryo, where n is the number of embryos. I trust the per-embryo result.',
    components: [
      { label: 'Spots the pseudoreplication', why: 'Counting cells as samples fakes a huge n and makes the result look stronger than it really is.' },
      { label: 'Names the real n', why: 'The real sample size is the number of embryos, not cells.' },
      { label: 'Says which to trust', why: 'Decide ahead of time which test is honest (the one whose n is real), so you are not just keeping the smaller p-value.' },
    ],
    takeaway: 'Count by animal, not by cell. Your real n is the number of embryos.',
  },
  6: {
    task: 'Write the strongest claim your evidence supports, and explain why not more.',
    hint: 'Match the claim to your most direct tool, and name what you did NOT show.',
    exemplarAnswer:
      'Nuclei are non-randomly spaced in FN1-rich tissue compared to the control. I cannot claim that FN1 makes tension, because I measured where the cells sit, not the force between them, and I never reached the force rung on the ladder.',
    components: [
      { label: 'Claims within the ceiling', why: 'The claim matches the most direct tool you actually ran.' },
      { label: 'Names what was NOT shown', why: 'Spacing is not force. Being clear about that is the whole skill.' },
      { label: 'Ties the limit to the ladder', why: 'You did not reach the tension rung, so you cannot make a tension claim.' },
    ],
    takeaway: 'Say only what your most direct evidence supports. Spatial spacing is not tension.',
  },
  7: {
    task: 'Write what you would do differently next time.',
    hint: 'Make it a concrete plan aimed at a specific, stronger claim.',
    exemplarAnswer:
      'Next time I would add a migration tool. That would let me support a movement claim. I would also run a few more embryos to be more sure, and keep my distance label honest. I would still stop short of any tension claim, unless I could bring in a direct force tool like FRET tension sensors, plus the operator and interpreter to run and read it.',
    components: [
      { label: 'Names a concrete next step', why: 'A real plan, not just “do better”.' },
      { label: 'Ties it to evidence', why: 'Each change aims to support a specific, stronger claim honestly.' },
      { label: 'Stays honest about limits', why: 'Some claims stay out of reach, and that is okay to say.' },
    ],
    takeaway: 'Science repeats: come back with a sharper question and tools matched to the claim you want.',
  },
}
