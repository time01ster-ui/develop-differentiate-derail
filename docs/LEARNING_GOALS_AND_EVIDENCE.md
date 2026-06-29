# Develop · Differentiate · Derail
## Learning Goals, Objectives, and Direct Evidence of Instruction

A research simulation for the John Hay Biomedical Pathway (PLTW), anchored to the Baby Mateo craniofacial case. This document states what the simulation is built to teach, the student-facing objective for each goal, and the specific in-product evidence that teaches the goal and checks whether the student met it. Every quoted string is taken verbatim from the simulation source.

---

## 1. What the simulation is

The student plays a new lab technician working a real research problem from the Atit Lab at Case Western Reserve University: how cranial neural crest cells build the frontal bone in an orderly, measurable pattern, studied alongside (not as) baby Mateo's cleft lip and palate.

The experience runs as three acts that share one eight-stage discovery loop:

- **Develop** (Act I): build the face in order. Map the fibronectin (FN1) road and the spacing of cell nuclei.
- **Differentiate** (Act II): tune each cell's fate. Stiffness, shape, and signaling steer a cell toward bone or cartilage.
- **Derail** (Act III): the same toolkit, hijacked. A tumor stiffens its own road and invades.

The eight stages, shown on screen exactly as: **Ask · Hypothesize · Choose tools · Design · Run / Measure · Analyze · Conclude · Iterate.**

Two design commitments make this a research-literacy instrument, not a clicking game:

1. A student **may only advance by doing the science correctly** (each stage has a gate, described below).
2. A student **may only claim what the evidence supports**. The pinned rule of the whole product is: *"Spatial organization is not the same thing as tension."*

Two separate reward systems reinforce this without ever gating the science:
- **Research Points (RP)** and ranks: recognition for rigor moves only. As the in-product panel states, *"Research Points are recognition for doing science well... They are not money and never unlock tools... There is no penalty for trying, and nothing here gates the science."*
- **A one-time $50,000 grant**: the spendable currency for tools and staff. *"A one-time pilot award. It does not refill... the two top rungs are not for sale at any price."*

---

## 2. How to read the goals below

Each goal lists three things:

- **Objective:** the student-facing "I can..." statement.
- **Taught by:** the place in the simulation that teaches it, with a short verbatim quote.
- **Checked by:** the concrete mechanism that verifies the student met it (a stage gate, a blocked over-claim, a reflection prompt, or an earned badge).

Goals are grouped into two strands, research practice and biological content, each in three tiers from foundational to advanced.

---

## 3. Strand A: Research-practice goals

### Tier 1 (foundational)

**A1. Ask a testable question.**
- Objective: I can tell a question we can actually measure from one that is too broad or too vague.
- Taught by: the Ask stage offers three tagged questions (`TOO BROAD`, `TESTABLE`, `TOO VAGUE`) and the Library "measuring" chapter. After a pick, the student sees a verdict tag (`✓ TESTABLE` / `✗ TOO BROAD`) and a note.
- Checked by: the stage will not advance unless the student selects the testable question (`qChoice === 'testable'`). Passing fires the PI line *"✓ Dr. Reyes: Good, that one we can actually measure."* and the `testable_question` badge.

**A2. Compare against a control.**
- Objective: I can explain why a result means nothing without a baseline to compare it to.
- Taught by: the Design stage control toggle, *"A control is a second group you compare against. Here it's FN1-blocked tissue. Without it, a pretty picture supports nothing. Turn this on."* The Act I narrative reinforces it: the scientist *"imagined the one question every honest reader would ask: compared to what?"*
- Checked by: the Design stage cannot advance without a control group turned on. The two groups are labeled on screen as **FN1-rich** and **FN1-blocked (control)**, never with the ambiguous word "treatment."

**A3. Evidence is the observed difference, not the click.**
- Objective: I can point to what changed on screen as my evidence, not the fact that I pressed a button.
- Taught by: the Run / Measure stage shows live numeric readouts for each group, and the Conclude stage only accepts a claim that names an observed comparison, for example *"Nuclei are non-randomly spaced in FN1-rich tissue compared to control."*
- Checked by: the Conclude gate (`claimResult === 'valid'`) rejects any claim not licensed by the measurement taken.

### Tier 2 (intermediate)

**A4. Isolate variables and replicate.**
- Objective: I can design a fair test: one change, a control, and enough replicates.
- Taught by: the Design stage explains the replicate unit directly, *"Each embryo is a separate animal (a biological replicate), not just another cell from the same one,"* and warns *"⚠ Under 3, you can't separate signal from embryo-to-embryo noise."*
- Checked by: the Design gate requires a control AND at least three replicates AND an honest distance label before the experiment can run. Meeting it earns the `fair_design` badge.

**A5. Replication separates a real pattern from noise (the honest N).**
- Objective: I can explain why counting many cells from a few animals fakes a big sample, and why the embryo is the honest unit.
- Taught by: the Analyze stage runs two statistical tests side by side, one pooled-per-cell test flagged **`⚠ PSEUDOREPLICATION`** and one per-embryo test flagged **`✓ HONEST`**, then reveals *"THE HONEST n IS PER-EMBRYO."* The glossary defines pseudoreplication as *"Counting many cells from a few animals as if each cell were its own experiment. It fakes a big sample size."*
- Checked by: the `pseudoreplication_spotter` badge fires when the student opens the comparison, and the Analyze narrative makes the point explicit: *"Cells inside one animal are not independent witnesses."*

**A6. A claim needs reasoning, stated with restraint.**
- Objective: I can write a claim that the evidence supports and stop there.
- Taught by: the Conclude stage blocks an over-claim with an explanation, for example *"✗ Blocked, spatial spacing alone is not tension. You measured where nuclei sit, not the force between them."*
- Checked by: the Conclude gate accepts only an evidence-bounded claim; passing fires *"✓ Dr. Reyes: That's a claim I'll sign my name to."*

### Tier 3 (advanced)

**A7. Separate observation from inference.**
- Objective: I can write what I saw before I write what I think it means.
- Taught by: a reflection prompt instructs the student to *"write what you SEE happen... without yet saying what it means,"* with the rationale that recording the observation *"keeps the run as data."*
- Checked by: the six-Rs reflection cycle (Record, Reduce, Recite, Review, Reflect, Revise) and the model answer revealed after the student submits.

**A8. Evaluate the model's limits.**
- Objective: I can name what this model cannot show and why.
- Taught by: the top two rungs of the Measurement Ladder are permanently locked with a real-world reason, *"Locked. A direct stiffness/tension number (AFM · Brillouin · magnetic actuation) needs the instrument, a person trained to run it, AND a person who can interpret it, plus tissue it works on at all... That is exactly why spacing stays your ceiling."* In Acts II and III the student must check *"I will report this as a model of stiffness, shape, and fate, not as Mateo's measured tissue."*
- Checked by: the locked rungs cap what claims the Conclude stage will accept, and the model-honesty checkbox is required to proceed. The `honest_ceiling` badge rewards working within the limit.

**A9. Research is iterative: propose the next test.**
- Objective: I can use this result to decide what to test next.
- Taught by: the Iterate stage is the terminal stage of every act, framing the result as the start of the next question, and the trilogy reuses the same loop across three escalating cases.
- Checked by: the loop closes with *"Loop complete,"* and the same Measurement Ladder and tools carry forward into the next act.

---

## 4. Strand B: Biological-content goals

### Tier 1 (foundational)

**B1. Cells act on signals they receive.**
- Objective: I can describe a cell behavior as a response to a signal, not as something the cell just knows.
- Taught by: the YAP/TAZ chapter, *"Mechanotransduction is the conversion of a physical force into a biochemical message, and YAP and TAZ are two central messengers,"* and the persistent five-thread rail tying signal, adhesion, contractility, the matrix road, and mechanotransduction together across all three acts.
- Checked by: the Run stage in Act II tracks the YAP/TAZ response, and a reflection claim-ladder requires the student to state the signal-to-response link.

**B2. Differentiation is a regulated change in cell identity.**
- Objective: I can explain that a cell becomes specialized by changing which genes are active, not by getting bigger or older.
- Taught by: the fate-switch chapter, *"Cartilage is the default... Bone has to be chosen, switched on by an outside instruction,"* read out as *"Sox9 up means cartilage, RUNX2 and then Osterix up means bone."*
- Checked by: Act II claims require the student to read the bone-versus-cartilage bias from the markers, with its own reflection prompt.

**B3. Cancer is a breakdown of regulation, not just fast growth.**
- Objective: I can explain cancer as normal tools used out of context, not only as cells dividing quickly.
- Taught by: the Derail chapters, *"a tumor does not invent a brand-new machine. It picks up tools that were built for orderly development and runs them out of context."* The mechanism taught is LOX-driven stiffening, durotaxis, basement-membrane breach, and EMT, not proliferation rate.
- Checked by: Act III claims, plus a blocked over-claim and a reflection prompt on "reuse, not reversal."

### Tier 2 (intermediate)

**B4. The microenvironment shapes cell behavior.**
- Objective: I can explain that a cell's surroundings, not only its DNA, help decide what it does.
- Taught by: four Act I Library chapters on the extracellular matrix and fibronectin road, plus Act III's account of a tumor remodeling its own surrounding tissue.
- Checked by: the ECM-architecture rung of the Measurement Ladder in Acts I and III requires the student to read the matrix, not just the cells.

**B5. Cell fate depends on signal strength, timing, and context.**
- Objective: I can explain that the same signal can mean different things depending on dose, duration, and surroundings.
- Taught by: the YAP/TAZ chapter, *"YAP and TAZ do not respond to stiffness alone. They respond to how spread out the cell is, how large its adhesions are, how confined it is, and even where it is in its growth cycle,"* with 2D versus 3D taught explicitly.
- Checked by: the Act II bench sliders (Substrate stiffness, Cell shape / spread) let the student see context change the outcome, and a claim gate licenses only context-aware statements.

**B6. Development and cancer share the same machinery.**
- Objective: I can explain that cancer often hijacks the very pathways that build and maintain normal tissue.
- Taught by: the Derail chapters reuse the exact Act I and II chain, *"more integrin clustering, more focal adhesions, more actomyosin tension, more nuclear YAP/TAZ, and the same targets."* The same Cellpose and Voronoi tools that scored order in Act I now score disorder.
- Checked by: the carry-over of tools and the five-thread rail across acts, with Act III claims that connect the shared mechanism.

### Tier 3 (advanced)

**B7. Order in development, disorder in disease, same parts.**
- Objective: I can explain that normal differentiation and cancer are both changes in cell state, one controlled and one dysregulated.
- Taught by: the payoff line, *"the same parts, used in context, build order, and the same parts, used out of context with no off-switch, produce disorder."*
- Checked by: the Act III conclusion ties the trilogy together and blocks any claim that the model proves a patient-level cause.

**B8. Cancer breaks multicellular cooperation.**
- Objective: I can explain cancer as cells escaping the rules that let tissues work together, including invasion across a boundary.
- Taught by: the invasive-margin chapter on basement-membrane breach and EMT, with the bright line that *local invasion is not the same as metastasis*.
- Checked by: the patient-level spread claim is permanently locked at the top rung, and a reflection prompt requires naming the gaps before that claim could be made.

**B9. Strong explanations connect every level.**
- Objective: I can connect a signal to a pathway to gene expression to cell behavior to a tissue outcome.
- Taught by: the layered Library and the claim ladders that ask the student to move from what was measured to what it means, within the licensed ceiling.
- Checked by: the Conclude gate plus the six-Rs Revise step, which asks the student to tie the limit back to the Measurement Ladder.

---

## 5. The honesty guardrails (what the simulation refuses to teach)

A defining feature is what the product will not let a student claim:

- The pinned Act I rule: *"Spatial organization is not the same thing as tension."*
- The pinned Act III rule: *"A stiffer, more disordered margin in this model is not the same as proof that stiffness drives spread in a patient."*
- The opening contract: *"you may only claim what is supported by the evidence."*
- Mateo's case is held separate throughout: *"Mateo's cleft is a different problem (parts not fusing), but it is the same family of cells."*
- Two foundational research maxims appear in every act: *"A correlation is not a cause"* and *"A guess you cannot kill is not a hypothesis. It is a wish."*

These are not decorative. The locked rungs cap the claim ceiling, the Conclude stage blocks over-claims with an explanation, and Acts II and III require a model-honesty checkbox before a run.

---

## 6. How the built-in checks map to a four-level rubric

The simulation already enforces a performance ladder through its gates and blocks:

- **Beginning:** describes what was clicked. The student cannot pass the Ask gate without choosing a testable question, so pure clicking does not advance.
- **Developing:** identifies control and treatment and one observed difference. This is the minimum to clear the Design and Run gates (control on, replicates set, both groups measured).
- **Proficient:** uses observed evidence to support a licensed claim. This is exactly the Conclude gate (`claimResult === 'valid'`).
- **Advanced:** works across replicates and time, separates observation from inference, respects the model ceiling, and proposes the next test. This is the pseudoreplication comparison, the six-Rs reflection, the locked-rung restraint, and the Iterate stage.

---

## 7. Provenance and accuracy

The science is grounded in the Atit Lab's own framing (the FN1 gradient, nuclear spacing as a measurable signature, the locked force rungs) and in published work cited as model basis, not as patient fact (Engler matched-niche stiffness, Weaver and Levental LOX crosslinking, the Hanahan and Weinberg hallmarks logic). The product is explicit where the field is unsettled, for example flagging that whether EMT is strictly required for metastasis is still argued. No claim of "proof" of a mechanism appears anywhere; the patient-level causal claim is permanently locked with an ethics-and-instrument rationale.

---

*Prepared from a full read of the simulation source (the eight-stage loop, all three acts, the Library, the glossary, the reflection cycle, and the scoring and gating logic). It documents the design as built, and is the reference against which future content red-team passes should be checked.*
