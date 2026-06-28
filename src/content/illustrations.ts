// Professionally illustrated, scientifically reviewed figures (generated with
// Nano Banana Pro, then accuracy-checked label-by-label against the chapter text
// and the cleft-vs-frontal-bone framing). These are original illustrations, not
// Atit-lab data, and are self-hosted as WebP under /public/illustrations.
// They sit ALONGSIDE the theme-aware animated SVG schematics, not in place of them.

export interface Illustration {
  src: string
  alt: string
  caption: string
}

/** Keyed by LibraryChapter id. */
export const CHAPTER_ILLUSTRATIONS: Record<string, Illustration> = {
  'yap-taz': {
    src: '/illustrations/ch-yaptaz.webp',
    alt: 'A model cell on two substrates: on soft matrix it is round and YAP and TAZ sit in the cytoplasm; on firm matrix it spreads, focal adhesions grow, and YAP and TAZ move into the nucleus to switch on CTGF and CYR61.',
    caption: 'YAP and TAZ read the cell’s mechanics: firm matrix and a spread shape push them into the nucleus, where they turn on CTGF and CYR61. The readout is context-dependent, not a single stiffness number.',
  },
  'fate-switch': {
    src: '/illustrations/ch-fateswitch.webp',
    alt: 'A cranial neural crest cell at a fork: a Wnt and beta-catenin signal plus nuclear YAP and TAZ steer it toward the bone program (RUNX2 then Osterix), while low signal leaves it in the cartilage default (Sox9).',
    caption: 'Bone or cartilage: the Wnt and beta-catenin master switch, tuned by mechanics through YAP and TAZ, turns on RUNX2 for bone; with the switch off the cell stays in the Sox9 cartilage default.',
  },
  'lox-stiffness': {
    src: '/illustrations/ch-loxstiffness.webp',
    alt: 'A tumor edge where loose, soft collagen fibers on one side are crosslinked by the enzyme LOX into thick, dense, aligned cables on the other, building a stiffness gradient, with cells crawling up the gradient by durotaxis.',
    caption: 'A tumor stiffens its own matrix: the enzyme LOX crosslinks collagen into dense, aligned cables, building a stiffness gradient the cells then climb by durotaxis.',
  },
  'invasive-margin': {
    src: '/illustrations/ch-invasivemargin.webp',
    alt: 'A tissue margin: orderly epithelial cells on a continuous basement membrane on the left, and on the right a single breach in the membrane where carcinoma cells cross locally into the stroma below.',
    caption: 'The invasive margin: carcinoma cells breach the basement membrane and cross locally into the stroma. This is local invasion at the margin, not spread to distant organs.',
  },
  origins: {
    src: '/illustrations/ch-origins.webp',
    alt: 'A single cell at a fate decision: a Wnt signal from the overlying skin builds beta-catenin inside the cell, lighting up the bone and dermis fates, while the cartilage fate stays dim as the default.',
    caption: 'The Wnt and beta-catenin master switch. When it is on, the cell builds bone and dermis. When it is off, it falls back to cartilage, the default.',
  },
  neuralcrest: {
    src: '/illustrations/ch-neuralcrest.webp',
    alt: 'A cross-section of the developing skull vault with four layers: skin, mesenchyme, the forming frontal bone, and the brain. Neural crest cells migrate through the mesenchyme along a fibronectin road that runs from low to high.',
    caption: 'Neural crest cells migrate through the mesenchyme between skin and brain, over the forming frontal bone, following fibronectin from low to high.',
  },
  matrix: {
    src: '/illustrations/ch-matrix.webp',
    alt: 'The extracellular matrix: a thin dense basement membrane sheet next to a looser interstitial mesh of thick collagen fibers and thinner fibronectin fibrils, with a single cell gripping the mesh.',
    caption: 'The matrix is a built material: a dense basement membrane sheet beside the looser interstitial mesh of collagen and fibronectin that cells crawl through.',
  },
  fibronectin: {
    src: '/illustrations/ch-fibronectin.webp',
    alt: 'A migrating cell gripping fibronectin through integrin receptors and pulling it into long fibrils, with the fibronectin road graded from sparse and faint to dense and bright.',
    caption: 'A cell grips fibronectin through integrins and pulls it into fibrils, laying a road graded from low to high in the direction it travels.',
  },
  integrin: {
    src: '/illustrations/ch-integrin.webp',
    alt: 'A cutaway of a cell showing matrix fibers gripped by an integrin that clusters into a focal adhesion, linking to actin filaments pulled by myosin, with a YAP molecule moving toward the nucleus.',
    caption: 'The chain from matrix to nucleus: integrins cluster into a focal adhesion linked to the actin and myosin engine, with YAP carrying the signal inward.',
  },
  remodeling: {
    src: '/illustrations/ch-remodeling.webp',
    alt: 'A matrix being edited from both sides: crosslinking enzymes tie collagen fibers together into a tight stiff mesh, while scissor-like MMP enzymes cut fibers to open up the mesh.',
    caption: 'Cells edit the matrix both ways: crosslinkers tie fibers tight and stiff, while MMPs cut them to open paths.',
  },
  mechanics: {
    src: '/illustrations/ch-mechanics.webp',
    alt: 'A group of cells moving together through a porous matrix, one cell squeezing through a narrow pore, with lines of tension linking the cells as they advance in one direction.',
    caption: 'Pore size and confinement steer a moving group of cells, and the tension they share keeps the whole crowd heading one way.',
  },
  measuring: {
    src: '/illustrations/ch-measuring.webp',
    alt: 'A four-step pipeline that turns a tissue image into numbers: a field of nuclei, then each nucleus segmented, then Voronoi territories drawn, then nearest-neighbor spacing measured.',
    caption: 'Turning an image into numbers: find the nuclei, segment them, build Voronoi territories, then measure nearest-neighbor spacing.',
  },
}

/** Keyed by stage step index (0 Ask through 7 Iterate). */
export const STAGE_ILLUSTRATIONS: Record<number, Illustration> = {
  0: {
    src: '/illustrations/stage-1-ask.webp',
    alt: 'A broad, vague question cloud funneling down into a single sharp, testable point.',
    caption: 'Narrow a broad question into one you can actually measure.',
  },
  1: {
    src: '/illustrations/stage-2-hypothesize.webp',
    alt: 'A single hypothesis branching into two predicted outcomes: cells in an ordered pattern and cells scattered at random.',
    caption: 'State an idea sharp enough to predict two different outcomes.',
  },
  2: {
    src: '/illustrations/stage-3-tools.webp',
    alt: 'A vertical measurement ladder: the lower rungs for spacing, ECM, and migration are lit and available, while the top force rungs are locked.',
    caption: 'The Measurement Ladder: the lower rungs are free, and the force rungs stay locked.',
  },
  3: {
    src: '/illustrations/stage-4-design.webp',
    alt: 'Two matched sets of tissue-sample dishes side by side, one control and one mutant, ready to compare.',
    caption: 'Compare matched control and mutant samples, with enough replicates to trust the result.',
  },
  4: {
    src: '/illustrations/stage-5-run.webp',
    alt: 'A microscope imaging a tissue section, with the resulting image showing detected cell nuclei.',
    caption: 'Image the tissue and detect the cell nuclei.',
  },
  5: {
    src: '/illustrations/stage-6-analyze.webp',
    alt: 'A field of cell nuclei with Voronoi territory polygons and nearest-neighbor spacing lines drawn between them.',
    caption: 'Map Voronoi territories and measure nearest-neighbor spacing.',
  },
  6: {
    src: '/illustrations/stage-7-conclude.webp',
    alt: 'A claim card held up by a stack of evidence, with a ceiling line marking the limit of what may be claimed.',
    caption: 'Make only the claim your evidence can hold up.',
  },
  7: {
    src: '/illustrations/stage-8-iterate.webp',
    alt: 'A forward loop arrow leaving a finished result and curving back to a new, sharper question.',
    caption: 'Refine the question and run the loop again.',
  },
}
