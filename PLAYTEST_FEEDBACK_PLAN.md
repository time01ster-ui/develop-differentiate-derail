# Develop · Differentiate · Derail — Playtest Feedback & Improvement Plan

From the first full walk-through of the live build. "Good beginning." The notes below are synthesized
from the reviewer's commentary; off-topic chatter excluded.

## The one core problem (everything traces back to this)
The game asks students to make **expert decisions** (pick the testable question, choose tools, set up a
control, read the fate) **before it teaches or contextualizes those decisions on screen.** Without the
teacher's live lesson or a deep Library read, a student is **guessing**. Fix the scaffolding and ~70% of
the notes resolve.

## What's working — keep it
- The **neural-crest thread** running through all three acts ("crest everywhere, well done").
- The **forces symbol system** (loved as a concept; just needs a key).
- The **measurement-ladder economy**: claim-ceiling + "every tool costs money."
- The **6 Rs** loop and "carry one thing forward."
- The **FN1 / AlphaFold protein diagrams** ("beautiful, well done").
- **Act II's Baby Mateo callbacks** — clear and contextualized; this is the model for the rest.
- Color theming option.

---

## Priority 1 — A reusable "step shell" (THE big fix)
Every step screen gets the same shell:
1. **Loads at the TOP; explanation first, illustration second.** Right now views jump to the middle and
   the graphic appears before the words. The text should lead and the graphic should illustrate it.
   (Reviewer repeated this ~8 times — e.g. the measurement-ladder rule should sit above its graphic.)
2. A short **"What you're doing & why" card** (2–3 sentences, 9th–10th-grade language) + the step's goal.
3. A **pointer to the exact Library section** for depth, plus an optional **"Teacher mini-lesson"** tag —
   so a choice is informed, never a guess. (Closing note: "if we don't scaffold this, it's random guessing.")
4. **Inline definitions** (hover/tap glossary) for every term on first use; full detail stays in the Library.
   Add definitions for the undefined vocab (e.g. "forces in play," mechanotransduction, substrate stiffness).
5. Clarify the **6 Rs reflection prompts** ("what did you do well / what was missing / how does it connect")
   — they read as unclear right now.

## Priority 2 — Explain the actual process (it is never shown)
Add a short **"How this works"** page or small animation (reachable by a button) that shows the pipeline ONCE:
embryo → slice → stain nuclei → image → **Cellpose** segments the nuclei → count → **Voronoi** spacing.
The student currently never learns what they are measuring or how the numbers are produced. Outline-level is
enough on screen; depth lives in the Library.

## Priority 3 — Experiment-design clarity
- **Control group:** make it an explicit **ON / OFF labeled toggle**, not a grayed button (reviewer couldn't
  tell it was a toggle). State what the control is and that you compare **experimental (FN1-blocked) vs control.**
- **Biological replicates:** explain WHY ≥3 embryos in plain terms ("random differences between embryos; under
  three you can't separate signal from embryo-to-embryo noise"). Recommend 3–4, or 2 experimental + 2 control.

## Priority 4 — The top symbols, Quality modes, and wayfinding
- **Force symbols legend:** name the 5 (spatialization, adhesion, matrix road, contractility, mechanotransduction)
  and add one line: "the same 5 forces recur across all 3 acts." Clarify the alternating menus
  (forces ↔ the case ↔ the question) so it's clear why there appear to be several.
- **Quality (Lite / Standard / Full):** add a tooltip explaining what each is for (e.g. low-power device vs full visuals).
- **Wayfinding:** clearer "where am I / what's next." Consider a per-act color shift so location is obvious.
- Fix **Credits** clickability/confusion.

## Priority 5 — Act II "stiffness → fate" bench, made legible
Explain the visuals: what the **spheres/colors** represent (blue→pink = a gene switching on in the nucleus),
what **substrate stiffness** and **cell-shape spread** are doing, and the **YAP/TAZ → bone-vs-cartilage**
readout (what "nuclear YAP 67% → bone program" means). **Set up the problem before** asking for a hypothesis.

## Priority 6 — Language & framing
- **"Prove" → "support / evidence for."** Add a one-liner: science builds a preponderance of evidence and
  disproves; it doesn't prove.
- **Baby Mateo discipline:** keep him only where the connection is explicit (Act II style). **Strip the forced
  "Baby Mateo" labels** off generic method/conclusion content (e.g. an Act I conclusion that is really about the
  measurement, not him; the Act III carcinoma sibling sample). Frame the case as the **lens** for learning the
  tools and measurements, then applying them to cleft lip/palate and to cancer.
- **Add mystery:** open each investigation with a "what if…" hook; it's "all very dry right now."

---

## Suggested sequencing
- **Phase A (biggest payoff):** the step shell (P1) + explain-the-process page (P2) + glossary/definitions.
  These touch every screen and resolve most of the feedback.
- **Phase B:** experiment-design clarity (P3) + symbols/quality/wayfinding (P4).
- **Phase C:** Act II legibility (P5) + language & Mateo framing (P6) + mystery hooks.

Build the step shell on **Act I first as the template**, get sign-off, then roll it across Acts II and III.
