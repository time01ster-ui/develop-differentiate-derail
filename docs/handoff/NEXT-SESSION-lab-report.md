# FINAL HANDOFF (active next step): exportable student lab report

> This is the live resume doc for the DDD biomedical research simulation as of 2026-06-29.
> It supersedes the root `HANDOFF.md` for the next piece of work. Read it top to bottom,
> confirm the feature target with Manuel in one line, then build.

---

## 0. Your task

Build an **exportable student lab report**: a downloadable/printable record of a student's run
that they can hand in. Local-only, no backend, no network POST (this is what keeps it FERPA-safe).
It also closes the one real gap from the audit below (a student-writable CER + Limitation artifact).

Before writing code, confirm with Manuel in one line that the lab report is still the target.
Alternatives he may pick instead: pre/post content questions, or a teacher dashboard (backend +
student data = a privacy gate, largest scope).

## 1. Why this is the task (audit evaluation, closed, do not reopen)

On 2026-06-29 a ChatGPT "three-agent" 14-item audit (+ a "most important" score-layer rec) was
re-evaluated against the real source at HEAD `7c09842`. It was the second text-only audit that day
to misread the sim: a text fetch sees only URL-hash state keys (`st sh e c darkfield treat ctrl`)
and the cosmetic `LOOK` theme, not the rendered UI. Verdict, proven with verbatim quotes +
`docs/LEARNING_GOALS_AND_EVIDENCE.md`:

| Result | Items |
|---|---|
| Already built (no change) | 11 of 14: opening framing, learning target, cell-communication model, differentiation, cancer-as-derailed-regulation, microenvironment, feedback after actions, replicate, vocabulary load, misconception guardrails; plus the "most important rec" (score-explanation layer) = the Achievements panel |
| Partly present (THIS task) | #13 writable/exportable CER: taught as a Conclude-gate mechanic, but no handable artifact |
| Rejected, with argument | #3 relabel to "treatment" = regression (app deliberately labels groups "FN1-rich" vs "FN1-blocked (control)", never "treatment"); #11 "darkfield is a viewing mode" = misread of a cosmetic color theme, and the view-vs-experiment disclaimer is already verbatim in onboarding |

Net: zero code corrections were needed. Do not re-litigate the audit. If a NEW external eval
arrives, judge it against `docs/LEARNING_GOALS_AND_EVIDENCE.md` or a live click-through, never a
URL inference.

## 2. The lab-report spec (so you do not re-derive it)

- **Trigger:** a "Download my lab report" button on the terminal Iterate stage (optionally also Conclude).
- **Contents (all drawn from existing client state):**
  - Optional student-name field entered at export time (not stored anywhere).
  - Act name + date.
  - Chosen question (Ask); hypothesis + prediction (Hypothesize); tools chosen + budget spent (ToolsStage / `resources.ts`).
  - Design: control on, replicate count, honest distance label.
  - Measurements: per-group readouts (FN1-rich vs FN1-blocked).
  - Analyze: the pseudoreplication-vs-honest-n result.
  - **CER + Limitation:** the selected claim (Conclude), the evidence it rests on, the reasoning, and the limitation (the locked ceiling, "spacing is not tension"). This is the audit's item #13.
  - The 6 Rs revisions (what the student corrected), from the reflections store.
  - Badges earned + rank.
- **Output mechanism:** prefer a dedicated print layout + `window.print()` (offline, no deps, FERPA-safe), or an HTML/text blob download. Do NOT add a heavy PDF library.
- **Where the data lives:** reducer state in `src/state/loop.ts` (`LoopState`, `Action`, `ceiling()`); per-act content in `src/content/registry.ts` + `act1/act2/act3.ts`; reflections in `src/lib/reflections.ts`; badges/ranks in `src/lib/progress.ts`; persistence in `src/lib/urlState.ts` (URL hash + localStorage).

## 3. Repos and deploy topology (read before editing)

- **Sim SOURCE (edit here):** this repo, `~/Desktop/Interactive Integration of Lab Content/develop-differentiate-derail` (git, branch `main`, HEAD `7c09842`). Public backup: `time01ster-ui/develop-differentiate-derail`.
- **Portal (serves a BUILT snapshot, do NOT edit the sim there):** `~/Documents/05_Building-AI/Code-Projects/agentic-os-portal`; built sim at `public/biomed-sim/`; card on `src/app/learn/page.tsx`; `/biomed-sim` in `src/proxy.ts` PUBLIC_PREFIXES. Vercel production tracks the portal's `main`.
- **Deploy procedure (verified):**
  1. Sim repo: `npm run build` (must be green).
  2. `rsync -a --delete dist/ ~/Documents/05_Building-AI/Code-Projects/agentic-os-portal/public/biomed-sim/`
  3. Commit the sim repo (source change) AND the portal repo (built snapshot). In the portal, commit ONLY `public/biomed-sim/` plus any card/proxy edit. The portal has unrelated uncommitted work that must be left untouched and unpushed.
  4. Push both. Vercel build is ~4.5 to 7 minutes.
  5. Smoke-test live: poll `https://mendozabiomed.org/biomed-sim/` for the NEW hashed JS bundle name (the CDN serves the old file until the deploy lands; a 200 is not proof).
  - Gotcha: if a `.git` op hits Google-Drive numbered duplicates, clear them first: `find .git -regex '.* [0-9]+' -delete`.
- **Repo state note (2026-06-29):** `docs/LEARNING_GOALS_AND_EVIDENCE.md` and this handoff file are currently untracked (intentionally not committed). Commit them with your feature work if appropriate.

## 4. Project rules that bite

- **No em dashes** in rendered copy. Scan before shipping: `grep -rn "—" src/` must be empty.
- **Any new public asset must route through `src/lib/asset.ts`** (`asset('/path')`). Hardcoded `/intro/...` paths 404 at the `/biomed-sim/` subpath. This has burned us before.
- Render the report with the sim's own CSS tokens (`var(--accent)`, etc.) and its themes (darkfield/spectral/amber). The `#6d28d9`-on-white rule is for the portal's `/learn` pages, NOT this standalone sim.
- No new external origins (school-network safe). Reduced-motion handled globally.
- Data boundary is CLEARED. The sim names real Atit Lab members' first names (Suneeti = operator, Qiannan = interpreter, Dr. Reyes = fictional PI) with AI-generated placeholder portraits. Do not add real student or patient data.

## 5. Definition of done

1. `npm run build` green, `npm test` green (keep the `completability` regression test passing), em-dash scan clean.
2. Run the feature through the `problem-and-solution` skill's lesson red-team loop (a 9th-grader walkthrough of the export, then a separate judge to PASS) before deploy.
3. Verify in-browser: build, serve, click through to the report, confirm the CER + Limitation + 6 Rs render and the download/print works.
4. Deploy per section 3; smoke-test the live hashed bundle.
5. Record the round in the three doors (Obsidian synthesis note in `OpenBrain/wiki/synthesis/`, the auto-memory file `project_develop_act1_app_2026-06-26.md`, and Open Brain `capture_thought`), and offer Manuel a short Google Doc write-up.

## 6. Related artifacts

- `docs/LEARNING_GOALS_AND_EVIDENCE.md` — the 18-goal source-verified crosswalk (Google Doc: https://docs.google.com/document/d/1Wxo6Qtwyi5DrdgwaAQmRfE5XvpEFIZ_bN3VABo1-698/edit). Read first.
- Synthesis note `OpenBrain/wiki/synthesis/2026-06-29-ddd-sim-chatgpt-14item-reeval.md` — the audit re-evaluation record.
- Brand context if you touch student-facing copy: `~/Documents/Brand/brand-context/`; John Hay Biomedical green `#2fd27a` + gold `#f5c542`; no em dashes; voice is plain, grade-9, honest about limits.
