# HANDOFF: Develop · Differentiate · Derail

Self-contained handoff so a fresh session (or developer) can pick this up cold after a context reset.
Last updated 2026-06-27 (session 3). All THREE acts are now built and verified; this covers the whole series.

## TL;DR

An interactive, case-based scientific-discovery web app for high-school PLTW Biomedical
students, anchored to the **Baby Mateo** cleft-lip-and-palate case. It is a complete
**three-act series**: **Develop** (shipped), **Differentiate** (built), **Derail / cancer**
(built), all running on one shared engine, connected by one mechanical chain.

- **Location:** `~/Desktop/Interactive Integration of Lab Content/develop-differentiate-derail`
- **Run:** `npm install` then `npm run dev` (http://localhost:5173). `npm run build` for prod. `npm test` for the stats + bench + per-act flow tests. `npx tsc -b` to typecheck.
- **Status:** All 3 acts built AND red-teamed. Typecheck clean, build green (~178 KB gzip main, Mol* lazy), **0 em dashes** in rendered copy, **24 tests pass**, all new stage views render clean server-side. A whole-app **9th-grade red-team (problem-and-solution skill, L1 walkthrough -> L2 fix -> L3 judge) PASSED all three acts** (0 BLOCKING, 4 MAJOR + 12 MINOR all fixed; judges found 0 new major). Key screens were verified in a live browser this session (Act I tools, Act III "MEASURE BOTH" run stage, Act II hypothesize + bench), no console errors. The **3 Act III illustrations are now generated + wired** (the two chapters + the margin Run-stage banner), so all three acts are fully illustrated. NOT yet done: a full end-to-end manual click-through of every stage.
- **The data-boundary gate is still open:** Dr. Atit reviews the app (including the Act III cancer framing) before ANY student use.

## Where things stand (read this first)

- **Act I "Develop": SHIPPED + ENHANCED.** Full 8-stage discovery loop with genuine in-browser measurement, the resource-gated Measurement Ladder, the Library, reflections, the visible rigor-bound gamification layer, the five-force rail, illustrations, and animations. Refactored this session to run on the shared multi-act engine with NO behavior change (its components and data are unchanged; only its content imports now flow through the registry).
- **Act II "Differentiate": BUILT.** The captured text (`docs/handoff/act2-content-output.json`) is integrated into `src/content/act2.ts`; the 8 stage views are live, including the **mechanotransduction bench** (two sliders -> deterministic YAP/TAZ model -> RUNX2-bone vs Sox9-cartilage readout + CTGF/CYR61 bars, in-vivo force rung LOCKED, reduced-motion safe). The 3 illustrations + 5 NotebookLM notebooks are wired and the notebooks are SHARED (Manuel confirmed). Act I -> Act II transition is live (Iterate "Begin Act II").
- **Act III "Derail" (cancer): BUILT.** Authored via the same grounded workflow (`docs/handoff/act3-content-output.json`, all 3 streams SHIP, 0 em dashes), integrated into `src/content/act3.ts`. The Run/Measure stage REUSES the Act I Voronoi engine on a tumor-margin field (Normal tissue vs Invasive front) paired with a durotaxis / basement-membrane-breach schematic. Clearly-labeled sibling carcinoma + opening content note; the over-claim ("stiffness causes the patient's cancer to spread") is gated by the locked in-vivo rung. Act II -> Act III transition is live. The **3 Act III illustrations** (the `lox-stiffness` and `invasive-margin` chapters + the margin Run-stage banner) are generated via Nano Banana Pro, accuracy-checked, optimized to WebP, and wired, so Act III is fully illustrated.

## The student flow (current, Act I)

`Onboarding (Day One, the Mateo case)` -> `The Library (8-chapter study module + Extensions shelf)` ->
`Ask -> Hypothesize -> Choose tools -> Design -> Run/Measure -> Analyze -> Conclude -> Iterate`

A per-step **reflection panel** sits below every stage, structured as Manuel's signature **6 Rs** Cornell Notes cycle: RECORD (what I did) -> REDUCE (the cue question) -> RECITE (my answer, no peeking) -> REVIEW (a model answer) -> REFLECT (compare + connect) -> REVISE (rewrite, fixing what I got wrong). The **REVISE step is required** and is the captured **evidence of self-correction** (it completes the cycle, earns the Self-Corrector badge, and is surfaced in the end-of-act "YOUR 6 Rs RECORD" recap). The panel is shared + act-aware, so all three acts use it. See `reference_6rs_cornell_notes` in memory + the brand. A header **gamification HUD** (rank + research points + badges) and a collapsible **"forces in play" rail** sit above the loop. The Library is reachable any time via a header button and per-stage "related reading" cues, with "read before you choose" banners on load-bearing stages. After a valid claim, Conclude shows a non-skippable "how a working scientist read this" consolidation.

## Decisions in force (Manuel's calls this session; do not silently reverse)

1. **Gamification = VISIBLE game elements, bound to RIGOR.** Manuel chose visible elements (XP/research points, ranks, badges) over the intrinsic-only option. Rewards are earned ONLY for genuine science (testable question, fair design, real measurement, spotting pseudoreplication, matching a claim to evidence, finishing reading, closing the loop), are informational, and NEVER gate the science. This keeps the documented overjustification risk in check.
2. **Design-stage = label-as-fairness only.** Control and measurement-distance do not change the dataset; the app states plainly they make the experiment fair. Do NOT rewire `buildExperiment` to make them consequential.
3. **Cross-act = reset each act.** Each act is self-contained with its own budget/notebook (no carry-forward). The visible gamification record (XP/badges) persists across acts via localStorage; the loop budget resets.
4. **Act III cancer framing = clearly-labeled SIBLING carcinoma.** NOT "Mateo's cells became cancer." Use a separate breast-model invasive margin (strongest LOX/stiffness/durotaxis evidence), open the act with a one-line content note, frame as awe-at-shared-mechanism, and have Dr. Atit review the cancer framing under the data-boundary gate.
5. **Rules-first sequencing.** Fix Act I rule clarity before Acts II/III so the shared engine is inherited clean.
6. **Study notebooks via NotebookLM, sharing is Manuel's.** Notebooks are created in NotebookLM (via Chrome automation); the agent never toggles sharing permissions (standing guardrail). Manuel flips each to "anyone with the link."

## The connective throughline (the spine of all three acts)

One mechanical chain, literature-backed and dev/cancer-biologist verified:

**integrin -> focal adhesion -> actomyosin tension -> YAP/TAZ nuclear localization -> a gene/fate decision**

- **Develop** builds it (cranial neural crest cells read the graded FN1 road to position the frontal bone; honest ceiling = spacing).
- **Differentiate** tunes it (substrate stiffness + cell shape -> YAP/TAZ -> RUNX2 bone vs Sox9 cartilage default; the Wnt/beta-catenin master switch; dermis via Twist1/Twist2/Dermo1; YAP/TAZ targets CTGF/CCN2 and CYR61/CCN1).
- **Derail** hijacks it (a tumor stiffens its own ECM via LOX crosslinking -> over-drives the same chain with no off-switch -> invasion; durotaxis up the self-made gradient).

A persistent **five-force rail** (spatial organization, adhesion/integrins, actomyosin contractility, ECM/fibronectin, mechanotransduction/YAP-TAZ) is carried identically across acts. The refrain "order in development, disorder in disease" is the literal mechanism.

### Science guardrails (hold these when building II/III)
- Nuclear YAP on stiff matrix is the CORRECT, healthy bone signal. Stiffness is not "bad"; CONTEXT decides. The same state is pathological only in Act III (wrong place/time).
- Not a deterministic one-way arrow. YAP/TAZ is shape-, dimensionality- (2D vs 3D), and confinement-dependent; a single kPa does not map to a single fate.
- The Act II bench is an explicit MODEL, not a measurement of Mateo's tissue. The in-vivo force rung stays LOCKED. The "spatial organization is not the same thing as tension" honesty becomes "a model is not the patient."
- Cancer REUSES developmental tools out of context; it does not "reverse development" or turn cells into embryos.
- EMT ENABLES but does not EQUAL metastasis (a margin image shows local invasion, not distant spread; whether EMT is strictly required is still debated).

## Architecture / file map

```
src/
  App.tsx                   routing + footer logic, now act-aware: renderStage() dispatches to the per-act view set; library/related-reading/banner/reflection read getAct(state.act)
  state/loop.ts             the SHARED 8-stage reducer + gates. Has an `act` discriminator + Act II bench fields (stiffness/shape/benchSampled/modelLabeled). canAdvance branches by act for Design(3) + Run(4). START_ACT transitions acts; reads ladder/claims/economy from getAct(s.act)
  content/
    registry.ts             NEW. the multi-act content registry: ActContent interface + ACTS{develop,differentiate,derail} + getAct(). The seam the engine/chrome read instead of importing one act
    types.ts                shared types. ActId added; HypChoice/ClaimId broadened to string (per-act ids)
    act1.ts                 Act I content (unchanged)
    act2.ts                 NEW. Act II "Differentiate" pack (generated from the captured JSON): rungs/claims/reflect/chapters/briefs/beats + ACT2: ActContent
    act3.ts                 NEW. Act III "Derail" pack (generated from the captured JSON; rung gating overridden so free rungs are reachable + in-vivo rungs locked) + ACT3
    story.ts                Act I onboarding/briefs/beats (unchanged)
    resources.ts            resource model, now PARAMETERIZED by ResourceConfig (reqMap/budget/hireCost). ACT1_RESOURCE exported; rungStatus/remaining/canHire take cfg
    glossary.ts             tap-to-define terms (+ Act II terms YAP/TAZ/RUNX2/Sox9/... and Act III terms LOX/durotaxis/basement membrane/EMT/metastasis/...)
    reflect.ts              Act I reflections + the StageReflection type (act2/act3 supply their own)
    library.ts              Library chapters + EXTENSIONS + EXTENSIONS_DIFFERENTIATE + EXTENSION_GROUPS
    illustrations.ts        CHAPTER_ILLUSTRATIONS (now incl yap-taz, fate-switch) + STAGE_ILLUSTRATIONS
    forces.ts               the five-force registry
  lib/
    measure.ts              ported Voronoi/stats math. VERBATIM, tested, reused by Acts I AND III. DO NOT TOUCH
    bench.ts                NEW + tested. the Act II mechanotransduction model: bench(stiffness,shape) -> nuclear YAP/TAZ + fate + CTGF/CYR61; benchReplicates/benchAgreement
    capability.ts           device-tier detection
    urlState.ts             URL-state persistence (now encodes act + bench fields; hyp/claim ids are free strings)
    reflections.ts, progress.ts   localStorage stores (reflection text; gamification)
  components/
    Header/Stepper/Footer/Onboarding/Library/CreditsPanel/ForcesRail/ProgressHud (shared; Stepper labels are act-agnostic)
    Define, StageChrome (PiBrief/StageBanner take optional act prop -> read registry), ReflectionPanel (act prop), MeasureCanvas, MolStarViewer, ErrorBoundary, TierContext
    art/SciArt.tsx, art/Avatars.tsx
    stages/*.tsx            Act I's 8 views + ui.tsx. ToolsStage is now SHARED/registry-driven (all acts). ConcludeStage/IterateStage take state.act for ceiling()
    stages/act2/            NEW: AskStage2, HypothesizeStage2, DesignStage2, BenchStage, AnalyzeStage2, ConcludeStage2, IterateStage2, render.tsx (renderAct2Stage)
    stages/act3/            NEW: AskStage3, HypothesizeStage3, DesignStage3, MarginRunStage (Voronoi reuse), DurotaxisArt, AnalyzeStage3, ConcludeStage3, IterateStage3, render.tsx (renderAct3Stage)
  styles/                   tokens.css, base.css (keyframes), fonts.css
public/
  illustrations/            16 Act I + 3 Act II + 3 Act III WebP (ch-loxstiffness, ch-invasivemargin, stage-III-margin). Bench/durotaxis also use inline SVG
  structures/, molstar/     self-hosted AlphaFold CIFs + prebuilt Mol* viewer
docs/handoff/               REPRODUCIBILITY: act2-content-workflow.js + act2-content-output.json (captured Act II text); act3-content-workflow.js + act3-content-output.json (captured Act III text); act2-illustration-prompts.json; nano-banana-gen.py
test/                       measure.test.ts (stats) + bench.test.ts + act2-flow.test.ts + act3-flow.test.ts (gates, ladder, transitions). 23 tests
```

## Hard constraints (do not break)

1. **Data boundary.** Ships ZERO unpublished Atit Lab data. Original illustrations + open sources only. Dr. Atit reviews before any student use (now including the Act III cancer framing). Gate not cleared.
2. **Science framing.** Cleft = a FUSION failure; the frontal-bone/spacing work is the FOUNDATIONAL MODEL for cases LIKE Mateo's. Never claim the frontal-bone work IS the cleft mechanism. Plus the throughline guardrails above.
3. **No em dashes** in rendered copy. Grep the em-dash character in `src/content` + `src/components` + `src/App.tsx` must return 0. (lib/*.ts comments may contain them; that is fine.)
4. **TOOLING.md floor:** 4 GB Chromebook + phone, touch-first (>=44px), self-host everything, persist progress in URL/localStorage, default tier DOWN, honor reduced motion. Animations use default `animation-fill-mode` so reduced-motion freezes them to a clean static state.
5. **Faithful math.** `src/lib/measure.ts` is verbatim; do not "improve" it (tests depend on the seeds).

## Done this session (session 3) and what remains

**DONE + verified (tsc clean, build green, 23 tests pass, 0 em dashes, all new stages render server-side):**
1. **Multi-act engine refactor.** `act` discriminator on `LoopState`; `content/registry.ts` registry; reducer/chrome read `getAct(state.act)`; `resources.ts` parameterized by `ResourceConfig`. Act I unchanged (regression-tested).
2. **Act II "Differentiate"** integrated (`act2.ts` from the captured JSON) + the mechanotransduction bench + Analyze/Design/Conclude/Iterate views + Act I->II transition.
3. **Act III "Derail"** authored (`act3-content-workflow.js` -> `act3-content-output.json`, all SHIP) + integrated (`act3.ts`) + the Voronoi-margin Run stage + durotaxis schematic + Act II->III transition + the trilogy-close Iterate.

**REMAINING:**
1. **Full end-to-end manual click-through.** Key screens were verified in a live browser this session (Act I Choose-tools ladder, Act III "MEASURE BOTH" margin run stage, Act II Hypothesize + the bench illustration), header is act-aware, no console errors. A complete stage-by-stage human pass (every reflection, every transition, the actual bench-slider drag and segment/measure clicks) is still worth doing: `npm run dev`, then walk each act onboarding -> library -> 8 stages.
2. **Act III illustrations: DONE.** The 3 illustrations are generated (Nano Banana Pro), accuracy-checked, optimized to WebP, and wired: `ch-loxstiffness.webp` + `ch-invasivemargin.webp` (CHAPTER_ILLUSTRATIONS keys `lox-stiffness` / `invasive-margin` in `illustrations.ts`) and `stage-III-margin.webp` (STAGE_ILLUSTRATIONS3 step 4 in `act3.ts`). Prompts saved at `docs/handoff/act3-illustration-prompts.json`. The bench (Act II) and durotaxis field (Act III) also have inline SVG.
3. **Dr. Atit review (the data-boundary gate).** Still open. He reviews the whole app including the Act III cancer framing before any student use.
4. **Minor polish.** The Library study-mode header still says "About 8 short reads" (Act-I-specific; Acts II/III have 2 chapters). Two duplicate Act I Extensions URLs (Mechanochemical Bridge = Mechanisms of cellular ECM; Lexicon = Can You Explain?) are still placeholders pending distinct links from Manuel.

## In-flight / pending items

- **NotebookLM sharing: DONE.** Manuel confirmed all 5 Act II notebooks are shared ("anyone with the link"); the posted Extensions links work for students. (Act III has no NotebookLM notebooks yet.)
- **Act III illustrations** are the main missing asset (see Remaining #2).

## Pipelines (recipes)

- **Illustrations (Nano Banana Pro).** `gemini-3-pro-image` via the venv `~/Documents/05_Building-AI/Graphic_Improvement_Project/.venv/bin/python`, key `GEMINI_API_KEY` from `~/.config/lloyd-gemini-email/lloyd.env`. Harness: `docs/handoff/nano-banana-gen.py` (reads a JSON job list). Optimize to WebP with Pillow (1200px wide, q85, method 6) into `public/illustrations/`. ACCURACY LOOP: Read every render back and check labels/anatomy against the source; cellular/molecular subjects render accurately first try, whole-organism subjects need iteration. See the `nano-banana-diagrams` skill.
- **NotebookLM via Claude-in-Chrome.** Create-tile -> "Copied text" -> type the source -> Insert -> click the title to rename. Reliability: run `navigate` to the homepage as its OWN step (navigate + immediate tile-click in one batch mis-times), or click the in-app logo to go home (SPA-internal, stays warm). Never toggle sharing.
- **Per-act content authoring (the Workflow pattern).** Each act's text was authored by a self-contained background Workflow: 3 streams (chapters / stage copy / reflections), each draft -> adversarial dev+cancer-biologist review -> revise, output validated against a JSON Schema. Scripts: `docs/handoff/act2-content-workflow.js`, `act3-content-workflow.js`. Re-run with `Workflow({ scriptPath: "..." })`. The workflow RETURNS the content but does not write it; capture the tool result to `docs/handoff/actN-content-output.json` (that step was the gap that lost Act II's first run). Then generate the typed pack with a small Python transcriber (see how `act2.ts`/`act3.ts` were produced: read the JSON, map rungs to Rung+RungReq+rungWhy, emit numeric-keyed Records). For Act III the rung `tissue:'dead'` flags from the model were overridden by level so the free rungs stay reachable and only the in-vivo rungs lock.

## Three-door records (where this is logged)

- **Vault:** `~/Documents/05_Building-AI/OpenBrain/wiki/projects/2026-06-26-develop-differentiate-derail.md` (v6 block has full status/decisions/reasoning) + `log.md` 2026-06-27 session-2 receipt.
- **Open Brain DB:** thoughts `1a6624cf` (decisions), `16655110` (status), `c9e6cbdd` (throughline + guardrails), `272d0538` (NotebookLM method); plus v5 `d2c275ca`/`6c2a04d9` and the original build thoughts.
- **Auto-memory:** `~/.claude/projects/-Users-manuelmendoza/memory/project_develop_act1_app_2026-06-26.md` (v6 block) + MEMORY.md pointer.
- **Notion Teaching Journal child page:** https://app.notion.com/p/38ba429490db81a6a10cf51514d1a15f

## Related assets

- Design source: `../design_handoff_develop_act1/` (prototype + report + TOOLING.md)
- CL/P research library (grounding): `~/Desktop/Atit Lab/Research Domains/` + `RESEARCH_ARTICLE_INDEX.md`
- Lab conversation (raw): `OpenBrain/raw/documents/2026-06-26-atit-lab-conversation.md`
- Reproducibility for the in-flight Act II work: `docs/handoff/`

## One-paragraph orientation for a brand-new session

You are continuing "Develop · Differentiate · Derail," a PLTW Biomedical discovery app (Vite+React+TS) that teaches scientific discipline through the Baby Mateo craniofacial case. As of session 3 ALL THREE acts are built on one shared engine and verified (tsc/build/23 tests/0 em dashes/SSR render of every stage): Act I "Develop" (positioning, Voronoi spacing), Act II "Differentiate" (the mechanotransduction bench: stiffness + shape -> YAP/TAZ -> bone vs cartilage), and Act III "Derail" (cancer hijacks the same chain: LOX-stiffening -> durotaxis -> a disordered invasive margin, measured by reusing the Act I Voronoi engine). They share one mechanical chain (integrin -> focal adhesion -> actomyosin -> YAP/TAZ -> fate) and the refrain "order in development, disorder in disease." Read this HANDOFF, then `README.md` and `NOTICES.md`. Respect the hard constraints (data boundary, science framing, throughline guardrails, no em dashes, faithful `measure.ts`) and the six decisions above. The work left is in "Remaining": a live browser click-through (the dev port was held by another session this run), Act III illustrations, and Dr. Atit's data-boundary review. Run `npm run dev` to walk all three acts; record durable progress in the three doors.

## Session 3 cont. (2026-06-27) — Act III notebook library + full Studio + portal seal
- **6 Act III "Derail" NotebookLM notebooks live** (Toolkit Hijack, Genetic Drivers, Pancreatic Fortress, Immune Arsenal, Frontier of Metastasis, Derail Lexicon). Each has its source + the full Studio study suite (Study Guide, Mind Map, Flashcards, Quiz, Data Table). 3 also have Slide Decks; the other 3 are blocked by NotebookLM's daily Slides cap (finish after ~24h reset). IDs are in Open Brain + auto-memory.
- **Wired into the Library**: `EXTENSIONS_DERAIL` + "Act III · Derail" group in `src/content/library.ts`; round pathway seal added to the "Go deeper" Extensions shelf (`Library.tsx`). Verified in-browser (all 3 act groups render); tsc clean, build ~180.5KB gzip, 0 console errors.
- **Portal (`agentic-os-portal`)**: new `src/components/brand/pathway-seal.tsx`; small round pathway seal on the `/learn` day-lesson header breadcrumb + course-`[slug]` hero. tsc clean + `next build` green (1674 pages).
- **PENDING MANUEL**: (1) the 6 notebooks are still PRIVATE — flip each to anyone-with-the-link. (2) generate the 3 missing Slide Decks after the daily-quota reset. (3) all code is uncommitted/unpushed (portal push = live student deploy).
