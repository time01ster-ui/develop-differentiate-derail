# Handoff

## State (2026-06-27, session 3)
Develop·Differentiate·Derail at `~/Desktop/Interactive Integration of Lab Content/develop-differentiate-derail` (Vite+React+TS; `npm run dev`). **ALL THREE ACTS now BUILT + verified on one shared multi-act engine.** Act I "Develop" (Voronoi spacing) unchanged + regression-tested; Act II "Differentiate" (the mechanotransduction bench: stiffness+shape -> YAP/TAZ -> RUNX2 bone vs Sox9 cartilage + CTGF/CYR61, in-vivo rung LOCKED); Act III "Derail" (cancer reuses the chain: LOX-stiffening -> durotaxis -> a disordered invasive margin, measured by REUSING the Act I Voronoi engine; sibling-carcinoma framing + content note). tsc clean, build green (~176 KB gzip), 23 tests pass, 0 em dashes, all 16 new stage views render server-side clean, adversarial code-review found no blockers. Full detail in repo `HANDOFF.md` (read it first).

## Next (remaining)
1. Live in-browser click-through of all 3 acts (NOT done this session: a second chat held dev port 5173 so the preview tool could not attach; logic is covered by the flow tests). Run `npm run dev`, walk onboarding -> library -> 8 stages -> bench sliders (Act II) + segment/measure (Acts I/III) -> the act transitions.
2. Act III illustrations DONE: 3 generated via Nano Banana Pro, accuracy-checked, optimized to WebP, wired (ch-loxstiffness, ch-invasivemargin -> CHAPTER_ILLUSTRATIONS; stage-III-margin -> STAGE_ILLUSTRATIONS3 step 4). Prompts at docs/handoff/act3-illustration-prompts.json. All 3 acts now fully illustrated.
3. Dr. Atit data-boundary review (the gate, now incl. the Act III cancer framing) before any student use.
4. Minor polish: Library study-mode header still says "About 8 short reads" (Act-I-specific).

## Red-team (session 3): PASSED
Whole-app 9th-grade red-team (problem-and-solution skill, L1 walkthrough -> L2 fix -> L3 judge). 0 BLOCKING, 4 MAJOR, 12 MINOR; all fixed; all 3 acts judged PASS (0 new major). Browser walkthrough also caught + fixed a Header "Act I" hardcode (now act-aware). Net new: act-aware ladder footer + Header label; ~28 glossary entries; Library chips only tappable when defined; Act III Run now gates on measuring BOTH groups (measuredGroups in loop.ts). 24 tests pass.

## The 6 Rs reflection scaffold (session 3, DONE)
Manuel's signature Cornell Notes "6 Rs" (a process for learning, a CYCLE: Record, Reduce, Review, Reflect, Recite, Revise) is recorded to memory + 3 vaults + brand (reference_6rs_cornell_notes; Open Brain c4e44fe6; Notion 38ca4294). The shared ReflectionPanel is now that cycle across all 3 acts: RECORD -> REDUCE -> RECITE -> REVIEW -> REFLECT -> REVISE. REVISE is required = evidence of self-correction; earns the new Self-Corrector badge (+20 RP); end-of-act recap = "YOUR 6 Rs RECORD". New fields in lib/reflections.ts (KEY ddd_reflect_v2). Verified live, 24 tests, build green.
PAUSED: 3/6 Act III cancer NotebookLM notebooks created (Hijack 475c4ff4, Genetic Drivers 40045656, Pancreatic a1e25f6c); 3 more (Immunotherapy, Metastasis/Frontier, Lexicon) + Library EXTENSIONS3 wiring remain. Sources at ~/Desktop/Atit Lab/Act III Study Notebooks/.

## Decisions in force (unchanged)
Gamification = VISIBLE but bound to RIGOR (never gates science). Design-stage = label-as-fairness. Cross-act = reset each act. Act III = clearly-labeled sibling carcinoma, NOT Mateo's cells. NotebookLM sharing is Manuel's (agent never toggles sharing).

## Pending (Manuel)
NotebookLM sharing DONE (Manuel confirmed the 5 Act II notebooks are shared). No open Manuel actions except the Dr. Atit review.

## Context
- Throughline (all 3 acts): integrin -> focal adhesion -> actomyosin tension -> YAP/TAZ nuclear -> gene/fate. Develop builds it, Differentiate tunes it, Derail hijacks it. Refrain: "order in development, disorder in disease".
- Architecture: `act` discriminator on `LoopState`; `src/content/registry.ts` (`getAct(state.act)`); per-act packs `act1.ts`/`act2.ts`/`act3.ts`; `resources.ts` parameterized by `ResourceConfig`; bench math `src/lib/bench.ts`; per-act stage views under `components/stages/act2|act3/`; ToolsStage is shared/registry-driven.
- Guardrails: nuclear-YAP-on-stiff is the CORRECT bone signal (context decides); not deterministic; Act II bench is a MODEL not a measurement; cancer REUSES (not reverses) development; EMT enables but does not equal metastasis; local invasion != metastasis.
- Standing rules: NO em dashes in rendered copy; ships ZERO unpublished Atit Lab data; measure.ts is verbatim, do not touch.
- Reproducibility lesson: the content Workflow RETURNS text but does NOT write it; capture the tool result to `docs/handoff/actN-content-output.json` (that step lost Act II's first run).
- Records: OpenBrain `wiki/projects/2026-06-26-develop-differentiate-derail.md` (session-3 block) + auto-memory `project_develop_act1_app_2026-06-26.md` (v7) + Open Brain thought dc2d6ce4. Reproducibility + captured content in `docs/handoff/`.
