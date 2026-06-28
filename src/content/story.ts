// Story + scaffolding copy. The mentor PI is FICTIONAL on purpose ("Dr. Reyes,"
// not the real PI) so the app never puts words in the real PI's mouth before review.
// The operator and interpreter use the FIRST NAMES of real Atit Lab members
// (Manuel's call); their blurbs are generic role descriptions, and the whole cast
// is part of what Dr. Atit reviews under the data-boundary gate. The roles (PI,
// instrument operator, data interpreter) mirror the real lab's reasoning about why a
// direct tension measurement is out of reach, which is what powers the resource model.

import type { ActStoryContent } from './types'

export type Role = 'pi' | 'operator' | 'interpreter'

export interface Character {
  role: Role
  name: string
  title: string
  blurb: string
}

export const CHARACTERS: Character[] = [
  { role: 'pi', name: 'Dr. Reyes', title: 'Your PI (lab boss)', blurb: 'Sets the case, and calls you out if you claim more than your evidence supports.' },
  { role: 'operator', name: 'Suneeti', title: 'Instrument operator', blurb: 'Can run the big machines, if you can afford to hire them and the lab has the equipment.' },
  { role: 'interpreter', name: 'Qiannan', title: 'Data interpreter', blurb: 'Turns a machine’s raw signal into a result you’re allowed to trust.' },
]

export const ONBOARDING = {
  kicker: 'DAY ONE · THE BABY MATEO CASE',
  title: 'You’re the new lab tech.',
  role: 'You just joined a research lab. A baby named Mateo was born with a cleft of his lip and palate: before birth, the parts that form his upper lip and the roof of his mouth did not fully grow together.',
  foundation: 'To understand cases like Mateo’s, this lab studies the foundational science: how the cells that build the face and skull (cranial neural crest cells) move and organize. You will learn it on one clear, measurable example, how those cells build the frontal bone (the forehead). Mateo’s cleft is a different problem (parts not fusing), but it is the same family of cells.',
  goal: 'Your job: turn this into one fair experiment, and earn the right to make a claim (the one sentence supported by the evidence). The rule of this lab: you may only claim what is supported by the evidence.',
  mechanics: 'There are 8 steps. At each one you make a call, and the button at the bottom unlocks once you do.',
  safety: 'Wrong answers are safe. Try things, see what happens, change your mind.',
  loop: 'This is what science really is: a cycle, ask, test, conclude, then ask a sharper question.',
}

/** A short PI brief shown at the top of each stage: the task in plain words, tied
 *  to Mateo. Keeps the case as the spine instead of a cold open. */
export const STAGE_BRIEF: Record<number, string> = {
  0: 'To understand cases like Mateo’s, we study the foundational science: how these cells build the frontal bone. Turn that into one question we can actually measure.',
  1: 'Now pick the idea you want to test. We suspect a protein “road” (FN1) guides the cells, choose the guess this experiment will challenge.',
  2: 'Pick the tools you’ll run. Each one costs money, people, or both, and you can only claim as high as your most direct tool reaches.',
  3: 'Make it fair before you run it. A real result needs a comparison group and enough animals.',
  4: 'Time to measure. Find each cell, then let the computer map how the cells are spaced.',
  5: 'This is where scientists make an honest mistake. Count by animal (embryo), not by cell.',
  6: 'Say only what your evidence holds up. Mateo’s family deserves the honest answer, not the flashiest one.',
  7: 'That’s the loop. Real science circles back with a sharper question and better tools.',
}

/** The single concrete GOAL of each stage, in plain words. Rendered words-first
 *  at the very top of every stage so a student lands on "what am I doing and why"
 *  before any illustration, instead of in the middle of a picture. */
export const STAGE_GOAL: Record<number, string> = {
  0: 'Turn the big question into one thing you can actually measure and compare.',
  1: 'Name the idea this experiment will test, and the result that would prove it wrong.',
  2: 'Choose the tools you can run, and see how your tools set the ceiling on what you may claim.',
  3: 'Make the experiment fair before you run it: a control to compare against, and enough embryos.',
  4: 'Measure the real thing: find each cell, then map how the cells are spaced.',
  5: 'Read the result honestly, counting by embryo (animal), not by cell.',
  6: 'Say only the one claim your evidence actually supports.',
  7: 'Close the loop, and open a sharper question for the next pass.',
}

/** The actual lab pipeline behind the Run/Measure step, shown so a student knows
 *  WHAT is being measured and HOW, instead of trusting a black box. */
export const PROCESS_STEPS: { label: string; text: string }[] = [
  { label: 'Slice and stain', text: 'A mouse embryo at the frontal-bone stage is thinly sliced, and the cell nuclei are stained so they glow.' },
  { label: 'Image', text: 'Each slice is photographed under a microscope, giving a flat picture full of bright nuclei.' },
  { label: 'Segment with Cellpose', text: 'Cellpose, a trained model, draws an outline around every nucleus and records its position.' },
  { label: 'Map the spacing', text: 'From those positions the computer measures how far each cell sits from its neighbors.' },
  { label: 'Voronoi spacing', text: 'A Voronoi diagram turns the positions into spacing numbers, so "how evenly are they spaced" becomes something you can compare.' },
]

/** Friendly, PI-voiced footer messages when a stage's gate passes. */
export const PASS_LINE: Record<number, string> = {
  0: '✓ Dr. Reyes: Good, that one we can actually measure.',
  1: '✓ Hypothesis set. Now let’s see how to measure it.',
  2: '✓ Tools chosen. This is your claim ceiling.',
  3: '✓ Controlled, replicated, honest. Run it.',
  4: '✓ Measured. Same data, two ways, let’s be honest about it.',
  5: '✓ You see the trap now. Draw your conclusion.',
  6: '✓ Dr. Reyes: That’s a claim I’ll sign my name to.',
}

export const WRONG_SAFE = 'Trying a different answer is safe.'

export const MATEO_MID =
  'For Mateo, the stakes are real: an honest “we’re not sure yet” protects his family more than a confident wrong answer. Count by embryo.'

export const MATEO_PAYOFF =
  'These same cranial neural crest cells build both the frontal bone you just measured and the lip and palate that did not fuse in Mateo. Learning how they organize is the foundation for understanding cases like his, even though the cleft itself is a fusion problem, not a spacing one. And the very same measuring tools, pointed at a tumor later, score disorder instead of order. One toolkit: order in development, disorder in disease.'

/** The dramatic act-opening story for Act I (shown before step 1). It sets up the
 *  spatial-organization measurement through what a scientist observed, the FN1 road
 *  and the oddly regular spacing, and keeps Mateo's cleft cleanly separate from the
 *  frontal-bone formation we actually measure. No em dashes. */
export const ACT1_STORY: ActStoryContent = {
  kicker: 'BEFORE YOU BEGIN · A STORY FROM THE NOTEBOOKS',
  title: 'The cells that would not scatter',
  paragraphs: [
    'It is past midnight, and a scientist is staring at a thin slice of a developing skull, the bright dots of stained cell nuclei scattered across her screen. Except they are not scattered. The longer she looks, the more she sees it: the cells that will build the frontal bone, the broad plate of the forehead, sit at strange, regular distances from one another, as if someone had laid them out on a grid.',
    'She knows these cells. They are cranial neural crest cells, a restless population that streams in from the edge of the early nervous system and builds most of the face and skull. And she knows the case that brought her here. A baby named Mateo was born with a cleft of the lip and palate, where the parts of the face that should grow together and fuse did not. That is a different event from the one on her screen. A cleft is a failure to fuse; building the frontal bone is a matter of cells organizing across a sheet. She is not studying his cleft tonight. She is studying the same family of cells doing a cleaner, more measurable job, so the foundation underneath cases like his can be understood one honest step at a time.',
    'So why the regular spacing? She has a suspicion. Running through the tissue is a protein she has stained in a second color, fibronectin, or FN1, woven into a kind of road. Where the FN1 road is rich and continuous, the cells look ordered, evenly spread. Where she has blocked the FN1, the same cells seem to land more haphazardly, clumped here and sparse there.',
    'A correlation is not a cause. She writes it in the margin and underlines it twice. The spacing LOOKS more regular on the FN1 road. But "looks more regular" is a feeling, and a feeling cannot be compared, argued over, or proven wrong. To say anything real she would have to turn the pattern into a number: find every cell, measure how far each one sits from its neighbors, and put the FN1-rich tissue up against a blocked control.',
    'She never finished turning the picture into a number. Her notebooks are still here, the stained slices, the suspicion about the road, the last column where the measurement should go left blank. That blank is yours. The clues are in the notebooks. The number is not. Your work in this act is to take "it looks organized" and make it something you can measure and defend.',
  ],
  clues: [
    'Work in a team. Have each person describe what they see in the spacing, then argue whether it is really more ordered or only looks that way to you.',
    'Draw the pathway on paper: the FN1 road, the cells that follow it, the spacing you can measure. Drawing it is how you find the gaps in your own understanding.',
    'Read the chapter, then open the notebook and keep going. The deeper you read, the more the LM notebooks break the science down, they have explainers built in.',
    'Clue: a feeling like "looks organized" cannot be compared between two groups. A number, like the distance between neighboring cells, can.',
  ],
  libraryRef: 'fibronectin',
  notebookLabel: '📓 Open the fibronectin road notebook for clues →',
}

/** A short continued notebook entry shown at the top of the Hypothesize stage
 *  (Act I only). Carries the same midnight-notebook voice from ACT1_STORY across
 *  the gap into forming a FALSIFIABLE hypothesis (the skill this stage grades),
 *  and primes the three guesses (road / chance / bone shape) evenly without
 *  revealing which wins. Tighter than the act opener. No em dashes. */
export const ACT1_HYP_NOTE = {
  kicker: 'THE NOTEBOOK, CONTINUED · BEFORE YOU HYPOTHESIZE',
  title: 'A guess you can kill',
  paragraphs: [
    'The next page of her notebook is not measurements. It is guesses. She has stopped pretending she already knows, and started writing down every honest way the spacing could happen, even the ones she does not believe. Beside each one she draws an arrow and forces herself to finish the sentence: if this were true, then the experiment would show... She will not let a guess onto the page until she can say what result would prove it wrong. A guess you cannot kill is not a hypothesis. It is a wish.',
    'Three guesses survive that test. Maybe the FN1 road really does steer the cells, and blocking it should scatter them into a messier, more uneven spacing. Maybe the order is a story she is telling herself, and the cells land purely by chance, so the road would make no difference at all. Or maybe the spacing is set later, by the shape of the bone itself, and the cells would sit the same whether she touched the road or not. Each guess predicts a different picture. That is what makes them useful: the experiment can disagree with them.',
    'She circled none of them. She wanted whoever came next to feel the choice, not inherit her hunch. So pick the one guess this experiment will challenge, and say plainly what result would prove it wrong. Choosing the guess you are most ready to be wrong about is not weakness. In this lab, it is the whole job.',
  ],
}

/** Continued notebook entries for the remaining Act I steps (3 through 8). Same
 *  midnight-notebook voice as ACT1_STORY / ACT1_HYP_NOTE, each bridging into its
 *  step's task and developing the cast (the predecessor scientist whose notebooks
 *  these are, plus Dr. Reyes, Suneeti, Qiannan). No em dashes, no over-claims:
 *  Mateo's frontal-bone spacing stays separate from his cleft, spacing is not force,
 *  and the honest by-embryo count is the moral spine. */
export const ACT1_TOOLS_NOTE = {
  kicker: 'THE NOTEBOOK, CONTINUED · BEFORE YOU CHOOSE TOOLS',
  title: 'The tools she could not buy',
  paragraphs: [
    'She tapes a price list into the notebook. Across from each tool she writes what it would let her honestly claim, and beside that, what it costs. The cheap, humble tools come first: find every cell, measure the spacing. The tools that would settle the argument for good, the ones that read force directly inside living tissue, sit at the bottom of the page, circled twice, with a price beside them she will never reach. Half of a scientific life, she writes, is learning to want the answer the affordable tool can honestly give.',
    'And a machine is only as good as the hands on it. To run the scope she would need Suneeti, who can coax a clean image out of a bad morning and will not pretend a blurry one is fine. To trust the readout she would need Qiannan, who refuses to call a smudge a result no matter how badly everyone wants her to. Neither of them works for free. Every rung up the ladder costs money, or people, or a machine the lab simply does not own, and the grant in her drawer is a one-time pilot award that does not refill.',
    'So she stopped reaching for the tool that would make her famous and chose the one she could actually staff and pay for. Pin your claim to your most direct tool, she writes, never to your best wish. Now choose yours. Buy only what you can run, leave the locked rungs locked, and remember that a ceiling you can defend is worth more than a ceiling you can only dream about.',
  ],
}

export const ACT1_DESIGN_NOTE = {
  kicker: 'THE NOTEBOOK, CONTINUED · BEFORE YOU DESIGN',
  title: 'The control she almost skipped',
  paragraphs: [
    'There is a confession in the margin here, written smaller than the rest. The first time, she grew only the FN1-rich tissue, saw the lovely even spacing, and very nearly wrote it up. Then she imagined the one question every honest reader would ask: compared to what? A beautiful picture with nothing beside it is not evidence. It is a mood. So she made herself grow the dull, unglamorous twin, the FN1-blocked tissue, the group whose entire job is to disagree with her.',
    'One embryo can lie, she writes, and underlines it. One embryo can be unlucky, or unusual, or simply having a strange day, and a single animal will never tell you which. So she counts at least three, more when she can, so a real signal can be told apart from one odd creature. And she labels the spacing for exactly what it is: a distance measured on a flat photo, a shadow of the true three-dimensional one. A number that hides its own limits, she writes, is a small and respectable kind of lie.',
    'Fairness is boring, she admits, and boring is the whole point. The drama belongs in the question, never in the method. Before you run a single thing, give your experiment a control to argue against, enough animals to trust, and a label that tells the truth about what you measured. Make it fair now, while it is still cheap to fix.',
  ],
}

export const ACT1_RUN_NOTE = {
  kicker: 'THE NOTEBOOK, CONTINUED · BEFORE YOU MEASURE',
  title: 'The night the picture became a number',
  paragraphs: [
    'This is the part she waited years to reach, and it takes one quiet night. The slices are stained, the nuclei glowing across the screen like a spilled bag of stars. Suneeti is at the scope past midnight too, because the cleanest images come when the building is empty and the floor has stopped trembling under everyone’s footsteps. She does not hurry. A clean image tonight, Suneeti says, saves a month of arguing later.',
    'Then the computer does the thing a tired eye cannot do honestly. It finds every single nucleus, one at a time, and writes down exactly where each one sits. From those positions it measures how far each cell lies from its nearest neighbors and folds the whole field into a mosaic of tiles, until the vague feeling of order becomes a column of numbers you can finally compare. Looks organized is a feeling. A nearest-neighbor distance is a fact, and a fact can be argued with.',
    'She remembers the strange relief of that night: the argument she could never win by staring was suddenly just arithmetic. So run it yourself. Find every cell first, then measure the spacing, and watch the picture you have been quarreling about turn into something that can finally answer back.',
  ],
}

export const ACT1_ANALYZE_NOTE = {
  kicker: 'THE NOTEBOOK, CONTINUED · BEFORE YOU ANALYZE',
  title: 'The honest mistake',
  paragraphs: [
    'This is where she almost ruined all of it, and the page is heavy with crossing-out. The numbers came back gorgeous. Pool every cell from every embryo into one pile, hundreds of them, run the test, and the p-value falls through the floor, a result so significant it looks like a trophy. She wanted to believe it. Everyone wants to believe it. That is exactly what makes it dangerous.',
    'Qiannan was the one who stopped her, and would not move. Each embryo is the experiment, she said, not each cell. Cells inside one animal are not independent witnesses, they share the same mother, the same morning, the same luck, so counting six hundred cells as six hundred experiments is counting one animal over and over and calling it a crowd. The honest number is small and humble: how many embryos, not how many cells. The trophy, Qiannan told her, was a mirror.',
    'It is the hardest lesson in the whole notebook, she writes, because the wrong way feels like winning. Read your result both ways, the flattering pooled way and the honest by-embryo way, and when the two disagree, trust the one that counts animals. A smaller true number is worth more than a giant false one. Mateo’s family deserves the true one.',
  ],
}

export const ACT1_CONCLUDE_NOTE = {
  kicker: 'THE NOTEBOOK, CONTINUED · BEFORE YOU CONCLUDE',
  title: 'The sentence she would sign',
  paragraphs: [
    'Dr. Reyes taught her the rule that runs this entire lab, and she copies it down in his exact words: you may claim only as high as your most direct tool reached. She measured spacing. Spacing is not force. So she was allowed to say the cells are more evenly spaced on the FN1 road than off it, and she was not allowed to say the road pulls them, however much the picture begged her to. A road is not a hand. Watching cells line up along it is not the same as feeling it tug.',
    'He is gentle, she writes, right up until you reach past your evidence, and then he is not. He would read a draft, find the single sentence that claimed more than the data could hold, and underline it without saying a word. The cruelty would be in publishing it, he told her once. A confident wrong answer travels farther than an honest unsure one, and it does more harm on the way. Say less, he meant, and mean every word of it.',
    'So she wrote the smallest true sentence she could stand behind, and she stopped there. Now write yours. Name the one claim your measurement actually earned, say out loud the thing you did not show, and refuse the bigger, prettier sentence even when it is sitting right there. For a family still waiting on the science, an honest ceiling is a kindness, not a limit.',
  ],
}

export const ACT1_ITERATE_NOTE = {
  kicker: 'THE NOTEBOOK, CONTINUED · BEFORE YOU CLOSE THE LOOP',
  title: 'The column is not blank anymore',
  paragraphs: [
    'The last column in her notebook, the one she left empty, is not empty now. You filled it. The picture she could only call beautiful has a number under it, a control beside it, and an honest claim written above it. She never got to finish, and you did, and that is how this work has always moved: one person carries it as far as their tools and their nerve allow, then hands the open question to whoever comes next.',
    'A finished experiment is not an ending, she writes, it is a sharper question. You know the spacing differs now. You still do not know whether the road truly pulls the cells or only paves the way they were already going, and you could not afford the tool that would say for certain. That locked rung is the next person’s climb. And the very same way of measuring order, turned one day toward a tumor instead of a forehead, will score disorder instead. One toolkit, two stories: order in development, disorder in disease.',
    'So close this loop and open the sharper one. Ask again, with a better tool and a steadier hand. She signs off the way scientists do when they trust the next person more than their own ending: the notebook stays open, the next column waits, and the question is yours now. Go.',
  ],
}
