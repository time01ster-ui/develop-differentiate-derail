// Per-section "deep dive" guides for the lab report. Each report section has a
// step-by-step how-to (grounded in the scientific-writing research: IMRaD, the
// abstract's five questions, NSTA Claim-Evidence-Reasoning, and grade-9 stats and
// logic) plus links out to vetted tutorials (writing OWLs, stats, analysis, logic).
// The online report shows a "How to write this" link per section that opens these.
//
// Every external URL below was fetched and verified (HTTP 200, on-topic) on
// 2026-06-30. Prefer Purdue OWL / university writing centers, Khan Academy, and
// reputable .org sources, all free and beginner-friendly.

export type ResourceKind = 'OWL' | 'writing' | 'stats' | 'analysis' | 'logic'

export interface SectionResource {
  label: string
  url: string
  kind: ResourceKind
}

export interface SectionGuide {
  title: string
  steps: string[]
  resources: SectionResource[]
  stats?: boolean // when true, the deep dive also offers the in-sim statistics helper
}

export const RESOURCE_KIND_LABEL: Record<ResourceKind, string> = {
  OWL: 'Writing lab',
  writing: 'Writing guide',
  stats: 'Statistics',
  analysis: 'Data analysis',
  logic: 'Reasoning',
}

const R = {
  gmuAbstract: { label: 'GMU Writing Center: Scientific (IMRaD) Abstracts', url: 'https://writingcenter.gmu.edu/writing-resources/imrad/abstracts-in-scientific-research-papers-imrad', kind: 'writing' as const },
  owlAbstract: { label: 'Purdue OWL: Writing Scientific Abstracts', url: 'https://owl.purdue.edu/owl/research_and_citation/using_research/writing_scientific_abstracts_presentation.html', kind: 'OWL' as const },
  owlLabReport: { label: 'Purdue OWL: Lab Reports, section by section', url: 'https://owl.purdue.edu/owl/resources/writing_tutors/tutoring_lab_reports.html', kind: 'OWL' as const },
  owlDiscussion: { label: 'Purdue OWL: Results & Discussion (interpret, do not restate)', url: 'https://owl.purdue.edu/owl/subject_specific_writing/writing_in_the_social_sciences/writing_in_psychology_experimental_report_writing/experimental_reports_2.html', kind: 'OWL' as const },
  harfordHyp: { label: 'Harford CC: Writing a testable hypothesis (If/Then)', url: 'https://harford.libguides.com/c.php?g=321391&p=2150493', kind: 'writing' as const },
  khanControls: { label: 'Khan Academy: Controlled experiments', url: 'https://www.khanacademy.org/science/high-school-biology/hs-biology-foundations/hs-biology-and-the-scientific-method/a/experiments-and-observations', kind: 'analysis' as const },
  khanDesignVideo: { label: 'Khan Academy: Introduction to experimental design (video)', url: 'https://www.khanacademy.org/science/high-school-biology/hs-biology-foundations/hs-biology-and-the-scientific-method/v/introduction-to-experimental-design', kind: 'analysis' as const },
  visionGraphs: { label: 'Visionlearning: Using graphs and visual data in science', url: 'https://www.visionlearning.com/en/library/Process-of-Science/49/Using-Graphs-and-Visual-Data-in-Science/156', kind: 'analysis' as const },
  khanPValue: { label: 'Khan Academy: Using p-values to make conclusions', url: 'https://www.khanacademy.org/math/ap-statistics/xfb5d8e68:inference-categorical-proportions/idea-significance-tests/a/p-value-conclusions', kind: 'stats' as const },
  khanSignificance: { label: 'Khan Academy: Significance tests (full unit)', url: 'https://www.khanacademy.org/math/statistics-probability/significance-tests-one-sample', kind: 'stats' as const },
  khanSD: { label: 'Khan Academy: Standard deviation review', url: 'https://www.khanacademy.org/math/statistics-probability/summarizing-quantitative-data/variance-standard-deviation-population/a/population-and-sample-standard-deviation-review', kind: 'stats' as const },
  edutopiaCER: { label: 'Edutopia: Claim + Evidence + Reasoning = Explanation', url: 'https://www.edutopia.org/blog/science-inquiry-claim-evidence-reasoning-eric-brunsell', kind: 'logic' as const },
  khanCorrLesson: { label: 'Khan Academy: Correlation and causation', url: 'https://www.khanacademy.org/test-prep/praxis-math/praxis-math-lessons/gtp--praxis-math--lessons--statistics-and-probability/a/gtp--praxis-math--article--correlation-and-causation--lesson', kind: 'logic' as const },
  khanCorrVideo: { label: 'Wireless Philosophy: Correlation and causation (video)', url: 'https://www.khanacademy.org/partner-content/wi-phi/wiphi-critical-thinking/wiphi-fundamentals/v/critical-thinking-fundamentals-correlation-and-causation', kind: 'logic' as const },
  uscLimits: { label: 'USC Libraries: Limitations of the study', url: 'https://libguides.usc.edu/writingguide/limitations', kind: 'writing' as const },
}

export const SECTION_GUIDES: Record<string, SectionGuide> = {
  abstract: {
    title: 'How to write the Abstract',
    steps: [
      'Write it LAST, after every other section is finished. The abstract is a summary of the whole report, so you cannot summarize what you have not written yet.',
      'Answer five questions, one or two sentences each: what you asked, why it matters, how you tested it, what you found, and what it means.',
      'Pull the facts straight from your own report: your question, your design, your numbers, your claim, your limit. Your run already gives you the raw material.',
      'Keep it to one paragraph, about 150 to 300 words. Cut every word the reader does not need.',
      'Read it out loud. If a sentence makes you stop to untangle it, rewrite it shorter and put the most important word at the end.',
    ],
    resources: [R.gmuAbstract, R.owlAbstract, R.owlLabReport],
  },
  question: {
    title: 'How to write a testable Question',
    steps: [
      'A good question is TESTABLE: you can change one thing, measure another, and get a number back.',
      'Name your variables: what you change (independent), what you measure (dependent), and what you keep the same (controlled).',
      'Ask "how does X affect Y?", not a yes/no or an opinion question.',
      'Check that your tools can actually answer it. If you cannot measure it, narrow the question until you can.',
    ],
    resources: [R.harfordHyp, R.khanControls],
  },
  hypothesis: {
    title: 'How to write a Hypothesis and prediction',
    steps: [
      'A hypothesis is a testable PREDICTION with a reason, not a guess: "If [change], then [result], because [mechanism]."',
      'It must be falsifiable: there has to be a possible result that would prove it wrong.',
      'Base the "because" on what you read, not on what you hope will happen.',
      'State the prediction with a direction or a number (more, less, higher) so you can check it against your data.',
    ],
    resources: [R.harfordHyp],
  },
  design: {
    title: 'How to design a fair test',
    steps: [
      'Use a CONTROL: a group identical to your test group except for the one thing you are testing. The control is what "normal" looks like.',
      'Change ONE variable and hold the rest constant. Otherwise you cannot tell what caused the result.',
      'REPLICATE: run several independent trials. One trial can be luck; agreement across trials is what earns trust.',
      'Decide how you will measure BEFORE you run, and make the call blind so your expectations cannot steer the result.',
    ],
    resources: [R.khanControls, R.khanDesignVideo],
  },
  measurements: {
    title: 'How to report your Measurements',
    steps: [
      'Record what you measured, in what units, and how many independent replicates you have (your real n).',
      'Your n is the number of replicates, not the number of cells inside them.',
      'Report the actual numbers (the means and the test result), not just "it went up".',
    ],
    resources: [R.visionGraphs],
  },
  analysis: {
    title: 'How to analyze your data',
    steps: [
      'Find your real sample size: count independent replicates, not pooled cells. Treating every cell as its own experiment is pseudoreplication, and it makes a result look more certain than it is.',
      'Compare the groups with the honest per-replicate test and report the p-value.',
      'A small p-value (for example p < 0.05) means the difference is unlikely to be chance. It does NOT prove your idea is right or that the effect is large.',
      'Check the spread (standard deviation or error bars). If the spreads overlap a lot, the difference may not be real.',
      'Stay within what you measured. Do not let the conclusion reach past what the test supports.',
    ],
    resources: [R.khanPValue, R.khanSignificance, R.khanSD, R.visionGraphs],
    stats: true,
  },
  claim: {
    title: 'How to write a Claim',
    steps: [
      'A claim is ONE sentence that directly answers your question.',
      'Claim only what your most direct tool actually measured, no more.',
      'If your evidence does not reach the claim, make a smaller claim, or go back and get a stronger tool.',
    ],
    resources: [R.edutopiaCER],
  },
  evidence: {
    title: 'How to choose your Evidence',
    steps: [
      'Evidence is the DATA that bears on your claim: the right measurement, and enough of it.',
      'Good evidence is APPROPRIATE (relevant to the claim) and SUFFICIENT (enough replicates to trust).',
      'Leave out data that does not bear on the claim. Do not pad with numbers that are not about the question.',
    ],
    resources: [R.edutopiaCER, R.visionGraphs],
  },
  reasoning: {
    title: 'How to write your Reasoning',
    steps: [
      'Reasoning explains WHY your evidence supports your claim, using the science.',
      'Restating the data is NOT reasoning. Connect the evidence to the claim with a principle: "X shows Y, which supports the claim because [the science]."',
      'If you cannot explain the link with a scientific principle, your claim may be reaching too far. Pull it back.',
      'Watch for correlation vs causation: two things moving together is not proof that one causes the other.',
    ],
    resources: [R.edutopiaCER, R.owlDiscussion, R.khanCorrLesson],
  },
  limitation: {
    title: 'How to write a Limitation',
    steps: [
      'Name one honest thing your evidence does NOT let you claim, and why.',
      'Separate what you measured from what you wish you could say (for example, spacing is not the same thing as force).',
      'A limitation is not a failure. Naming it is what makes the rest of your report trustworthy.',
      'End with what you would measure next to go further.',
    ],
    resources: [R.uscLimits, R.khanCorrVideo],
  },
}
