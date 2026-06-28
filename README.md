# Develop · Differentiate · Derail — Act I "Develop"

An interactive, case-based scientific-discovery web app for high-school PLTW
Biomedical students, anchored to the **Baby Mateo** cleft-lip-and-palate case.
This is the **Act I "Develop" vertical slice** (Phase 0 + Phase 1 of the build
plan): one playable run of the eight-stage discovery loop, with **genuine
in-browser measurement** and **real statistics**.

Built to the handoff spec (`../design_handoff_develop_act1/`) and `TOOLING.md`.

## What it does

A single-screen state machine over 8 stages:

`Ask → Hypothesize → Choose tools → Design → Run/Measure → Analyze → Conclude → Iterate`

- **Measurement Ladder** (signature mechanic): you may claim only as high as your
  most direct evidence. Spatial spacing is the bottom rung; a tension claim needs
  hardware (FRET/AFM) you don't have in a browser — so the locked rungs stay
  locked, and the Conclude step **blocks** the tension over-claim. Tap `?` on any
  rung for the grounded reason.
- **Genuine measurement** (Run): Cellpose-style nuclei field → centroids →
  **d3-delaunay Voronoi** + nearest-neighbor distance, drawn to a 2D canvas. The
  geometry is computed, not animated.
- **Real statistics** (Analyze): the **pseudoreplication** lesson — pooled
  per-cell vs honest per-embryo Welch's t-test, with p-values from the regularized
  incomplete-beta function. Pooled n = cells; honest n = embryos.

## Stack

Vite + React 18 + TypeScript · d3-delaunay · self-hosted **Mol\*** (AlphaFold
FN1/WNT5A/ITGB1) · Tailwind v4 + a design-token CSS layer (3 themes) · self-hosted
fonts (@fontsource). No backend: progress persists in **URL state** (never
localStorage alone) so it resumes on shared/managed devices and shares via link.

## Device tiers (TOOLING.md §3)

One codebase, three runtime fidelity tiers chosen by capability detection
(defaults **down**) with a visible **Quality** switch:

| Tier | 3D / Mol\* | Notes |
| --- | --- | --- |
| **A — Lite** | none; Mol\* → static card | the whole loop is fully playable; phones / 4 GB Chromebooks |
| **B — Standard** | live Mol\*, one structure | default for most school hardware |
| **C — Full** | live Mol\*, full | Apple-silicon Macs |

The 2D measurement canvas is the Tier-A floor and runs everywhere. Reduced motion
is honored (OS setting + in-app toggle). Mol\* is lazy-injected from
`/public/molstar` (never bundled, never iframed) and degrades to a static card if
the network blocks it — the loop always runs.

## Develop

```bash
npm install        # also copies the Mol* viewer bundle into public/molstar
npm run dev        # http://localhost:5173
npm run build      # tsc -b && vite build  →  dist/
npm test           # stats sanity (pooled p << per-embryo p, etc.)
npm run typecheck
```

## Layout

```
src/
  lib/measure.ts        ported math (RNG, geometry, Welch t-test, incomplete beta) — VERBATIM, tested
  lib/capability.ts     runtime tier detection (defaults down)
  lib/urlState.ts       URL-state persistence (+ localStorage mirror, never alone)
  content/act1.ts       all student-facing copy / rungs / claims / hints (single source of truth)
  content/types.ts      shared types
  state/loop.ts         the reusable 8-stage reducer + gates (Acts II/III reuse this)
  components/            Header, Stepper, Footer, MeasureCanvas, MolStarViewer, ErrorBoundary, CreditsPanel
  components/stages/     the 8 stage views
public/
  structures/           self-hosted AlphaFold CIFs (P11276 / P22725 / P09055)
  molstar/              self-hosted Mol* viewer bundle (copied on install)
```

## Deliberate scope (this slice)

- Nuclei fields are **faithful procedural simulations** (seeded RNG), not real
  micrographs — the `{x, y}` interface is kept so Cellpose centroids drop in later
  unchanged (Phase 2+).
- eMouseAtlas cold open, Blender-rendered clips, JoVE, Supabase teacher layer, and
  Acts II/III are later phases. The 8-stage loop is architected to be reused.

See `NOTICES.md` for sources, licenses, and the data-boundary statement.
