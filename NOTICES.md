# NOTICES — Develop · Differentiate · Derail (Act I)

This app is built on free, open research infrastructure. It ships **no unpublished
Atit Lab images or data**. Student-facing nuclei fields are faithful procedural
simulations; all molecular / embryo / cell assets come from the open sources below.

## Software

| Library | Role | License |
| --- | --- | --- |
| React + Vite + TypeScript | App framework / build | MIT |
| d3-delaunay | Voronoi / Delaunay / nearest-neighbor geometry (in-browser) | ISC |
| Mol* (molstar) | Molecular viewer, **self-hosted** (`/public/molstar`) — not iframed | MIT |
| Tailwind CSS | Layout / responsive utilities | MIT |
| @fontsource (Space Grotesk, IBM Plex Sans, IBM Plex Mono) | Self-hosted fonts | OFL 1.1 |

## Scientific assets & data

- **AlphaFold Protein Structure Database** — predicted structures loaded into Mol*,
  self-hosted in `/public/structures`:
  - FN1 (fibronectin 1) — **P11276** (mouse)
  - WNT5A — **P22725** (mouse)
  - ITGB1 (integrin β1) — **P09055** (mouse)
  Labeled in-app as *illustrative predicted structures*, not experimental coordinates.
  License: CC-BY 4.0.
- **eMouseAtlas (EMAP)**, emouseatlas.org — 3D mouse embryo by Theiler stage
  (planned cold open / staging). CC-BY 3.0 — attribute, self-host, do not hot-link.
- **Allen Cell Explorer**, allencell.org — real-data 3D cells & Simularium
  trajectories (planned media). Attribute the Allen Institute.
- **Cellpose** — nuclei segmentation (this slice uses procedural fields; real
  centroids in a later phase). BSD-3.
- **JoVE** — peer-reviewed technique video (institutional, Phase 3).

## Scientific grounding

The biology modeled here — FN1 graded low→high in the direction of neural-crest
growth, nuclear spacing as a spatial-organization readout, and the principle that
**spatial organization is not the same thing as tension** — reflects the Atit Lab
research context (Cellpose / Voronoi / tissue-mechanics in craniofacial development).
The locked top rungs (FRET / AFM / Brillouin / magnetic actuation) are locked
because a direct force measurement needs the instrument, a trained operator, an
interpreter, and tissue the method works on at all — none of which exist in a
browser or a classroom. That constraint is the heart of the Measurement Ladder.

## Honest limits

The development→cancer bridge across the three acts is **methodological** (the same
image + geometry tools, re-pointed), not a claim that an embryo and a tumor are
biologically identical.
