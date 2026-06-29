// Plain-language glossary. Every definition is one sentence at a grade-9 reading
// level with NO hard words nested inside (the #1 red-team finding: terms used
// before they are defined). Keys are lowercase; <Define> matches case-insensitively.

export interface GlossEntry {
  term: string
  def: string
}

export const GLOSSARY: Record<string, GlossEntry> = {
  // ---- Shared developmental + mechanics terms (used across acts) ----
  ectoderm: { term: 'ectoderm', def: 'The outer layer of the early embryo; it makes skin and nervous tissue, and the neural crest comes from its edge.' },
  mesoderm: { term: 'mesoderm', def: 'The middle layer of the early embryo; it makes muscle, bone, blood, and the heart.' },
  endoderm: { term: 'endoderm', def: 'The inner layer of the early embryo; it makes the lining of the gut and lungs.' },
  gastrulation: { term: 'gastrulation', def: 'The early step where the ball of cells folds and sorts into three layers (ectoderm, mesoderm, endoderm).' },
  'neural tube': { term: 'neural tube', def: 'The early tube of cells that becomes the brain and spinal cord; the neural crest pinches off from its top edge.' },
  mesenchyme: { term: 'mesenchyme', def: 'Loose, unsettled cells in a watery matrix that can crawl and later become bone, cartilage, or connective tissue.' },
  multipotent: { term: 'multipotent', def: 'Able to become several different cell types, but not every type.' },
  tripotent: { term: 'tripotent', def: 'A narrower case of multipotent: able to become one of three types (here bone, dermis, or cartilage).' },
  haptotaxis: { term: 'haptotaxis', def: 'When a cell crawls by following a trail of stickiness in the matrix, moving toward where it grips best.' },
  integrin: { term: 'integrin', def: "A receptor that reaches through the cell's surface and grips the matrix outside, bolting the inside of the cell to the outside." },
  'focal adhesion': { term: 'focal adhesion', def: "A cluster of integrins that forms a strong anchor linking the matrix outside to the cell's skeleton inside." },
  actomyosin: { term: 'actomyosin', def: "The cell's muscle-like team of actin filaments and myosin motors that pull and create tension." },
  contractility: { term: 'contractility', def: 'A cell’s ability to pull on itself and its surroundings using its actin and myosin.' },
  'phospho-mlc': { term: 'phospho-MLC', def: 'A tagged (phosphorylated) form of myosin light chain; it is the on-switch that lets the cell pull, so finding it marks where the cell is actively contracting.' },
  mechanotransduction: { term: 'mechanotransduction', def: 'Turning a physical force, like stiffness or pulling, into a chemical signal the cell’s genes can read.' },
  mechanosensor: { term: 'mechanosensor', def: 'A part that senses physical force and passes the message along, like a tiny force gauge.' },
  tead: { term: 'TEAD', def: 'A DNA-gripping partner that YAP and TAZ team up with in the nucleus to switch target genes on.' },
  'beta-catenin': { term: 'beta-catenin', def: 'The inside-the-cell messenger that carries the Wnt signal to the nucleus to switch on the bone program.' },
  wnt: { term: 'Wnt', def: 'A signal one group of cells releases to change nearby cells; here it flips the switch toward bone.' },
  osterix: { term: 'Osterix', def: 'A bone gene that RUNX2 switches on next, carrying the bone-building program further.' },
  'extracellular matrix': { term: 'extracellular matrix', def: 'The web of proteins outside cells that they live on, grip, and pull against.' },
  collagen: { term: 'collagen', def: 'The most common rope-like protein in the matrix; how tightly it is tied sets how stiff a tissue feels.' },
  'in-vivo': { term: 'in-vivo', def: 'Inside a living body, as opposed to in a dish or a model.' },
  deterministic: { term: 'deterministic', def: 'Following a fixed rule, so the same inputs always give the same result.' },
  ctgf: { term: 'CTGF', def: 'A gene that YAP and TAZ switch on when they are active in the nucleus; used as a sign the switch is on.' },
  cyr61: { term: 'CYR61', def: 'Another gene YAP and TAZ switch on when active; like CTGF, it marks that the switch is on.' },
  osteoblast: { term: 'osteoblast', def: 'A bone-building cell.' },
  'intramembranous ossification': { term: 'intramembranous ossification', def: 'Building bone directly from mesenchyme cells, without a cartilage model first; this is how the flat skull bones form.' },
  delamination: { term: 'delamination', def: 'When a cell loosens from a sheet of connected cells and leaves to crawl on its own.' },
  differentiation: { term: 'differentiation', def: 'When a cell becomes specialized by turning certain genes on and others off, so it takes on one job such as bone, dermis, or cartilage.' },
  // ---- Act III "Derail" terms ----
  lox: {
    term: 'LOX',
    def: 'An enzyme (lysyl oxidase) that ties collagen fibers together, making the matrix denser and stiffer.',
  },
  durotaxis: {
    term: 'durotaxis',
    def: 'When cells crawl toward stiffer surroundings, following a stiffness trail like a path uphill.',
  },
  'basement membrane': {
    term: 'basement membrane',
    def: 'A thin, dense sheet that normally walls off a tissue; cancer cells break through it during local invasion.',
  },
  mmp: {
    term: 'MMP',
    def: 'Enzymes that work like scissors, cutting the matrix and the basement membrane to open a path.',
  },
  emt: {
    term: 'EMT',
    def: 'A change where a settled, connected cell becomes looser and more mobile; it helps a cell invade but is not the same as spreading to other organs.',
  },
  metastasis: {
    term: 'metastasis',
    def: 'When cancer cells spread from where they started to distant parts of the body, which is different from local invasion at the margin.',
  },
  'local invasion': {
    term: 'local invasion',
    def: 'When cells cross the basement membrane into the nearby tissue; this is not the same as spreading to distant organs.',
  },
  stroma: {
    term: 'stroma',
    def: 'The supportive tissue and matrix around cells, where an invading cell pushes in.',
  },
  // ---- Act II "Differentiate" terms ----
  yap: {
    term: 'YAP',
    def: 'A protein that carries a physical signal, like how stiff the surroundings are, to the genes; when it moves into the nucleus it helps switch certain genes on.',
  },
  taz: {
    term: 'TAZ',
    def: 'A partner protein to YAP that does the same job; the two are usually named together as YAP and TAZ.',
  },
  runx2: {
    term: 'RUNX2',
    def: 'A master gene switch that tells a cell to start becoming bone.',
  },
  sox9: {
    term: 'Sox9',
    def: 'A master gene switch for cartilage; it is the setting a cell falls back to by default.',
  },
  bone: {
    term: 'bone',
    def: 'The hard tissue that makes up the skeleton, including the front of the skull.',
  },
  cartilage: {
    term: 'cartilage',
    def: 'The smooth, bendy tissue like the tip of your nose or your ears; it is the default a crest cell starts from before bone is chosen.',
  },
  'substrate stiffness': {
    term: 'substrate stiffness',
    def: 'How hard or soft the surface under a cell is, from soft like fat up to firm like forming bone.',
  },
  model: {
    term: 'model',
    def: 'A simplified stand-in you can change and study, used instead of the real living tissue.',
  },
  'nuclear localization': {
    term: 'nuclear localization',
    def: 'Whether a protein is sitting inside the nucleus, where the genes are, or outside it in the cytoplasm.',
  },
  replicate: {
    term: 'replicate',
    def: 'A separate, independent repeat of the same test, so one odd result cannot fool you.',
  },
  'neural crest cells': {
    term: 'neural crest cells',
    def: 'Special cells that travel through the early embryo and build parts of the face and skull.',
  },
  'frontal bone': {
    term: 'frontal bone',
    def: 'The bone of the forehead, at the front of the skull.',
  },
  cleft: {
    term: 'cleft',
    def: 'A split or gap left when two parts of the face grow toward each other but do not fully join (fuse) before birth.',
  },
  palate: {
    term: 'palate',
    def: 'The roof of the mouth.',
  },
  mechanism: {
    term: 'mechanism',
    def: 'The step-by-step way something actually works.',
  },
  claim: {
    term: 'claim',
    def: 'The one sentence supported by your evidence.',
  },
  pi: {
    term: 'PI',
    def: 'The principal investigator: the scientist who runs the lab (your boss).',
  },
  'z-axis': {
    term: 'z-axis',
    def: 'The depth direction (toward you and away). A flat photo has no z-axis.',
  },
  fn1: {
    term: 'FN1',
    def: 'A protein (fibronectin) that cells crawl along like a road as they move.',
  },
  fibronectin: {
    term: 'fibronectin (FN1)',
    def: 'A protein that cells crawl along like a road as they move.',
  },
  graded: {
    term: 'graded',
    def: 'Low on one side and high on the other, like a ramp.',
  },
  ecm: {
    term: 'ECM',
    def: 'The "extracellular matrix": the scaffold of material outside cells that they sit on and crawl through.',
  },
  nucleus: {
    term: 'nucleus',
    def: 'The control center at the middle of a cell. Here we use it as a dot to mark where each cell is.',
  },
  nuclei: {
    term: 'nuclei',
    def: 'More than one nucleus (the center of a cell), used here as dots marking where cells are.',
  },
  'nuclear spacing': {
    term: 'nuclear spacing',
    def: 'How far apart the cell centers (the dots) sit from each other.',
  },
  'non-randomly spaced': {
    term: 'non-randomly spaced',
    def: 'Sitting in a pattern with even gaps, instead of scattered or clumped by chance.',
  },
  hypothesis: {
    term: 'hypothesis',
    def: 'Your best guess for HOW something works, written so an experiment could prove it wrong.',
  },
  falsifiable: {
    term: 'falsifiable',
    def: 'Able to be proven wrong by a real measurement. Good science questions are falsifiable.',
  },
  control: {
    term: 'control group',
    def: 'A second group you set up to compare against, so you can tell if your change actually did anything.',
  },
  'control group': {
    term: 'control group',
    def: 'A second group you set up to compare against, so you can tell if your change actually did anything.',
  },
  'biological replicate': {
    term: 'biological replicate',
    def: 'A separate animal (here, a different embryo), not just another cell from the same one.',
  },
  micrograph: {
    term: 'micrograph',
    def: 'A photo taken through a microscope.',
  },
  cellpose: {
    term: 'Cellpose',
    def: 'A computer tool that finds each cell in a microscope photo and marks its center.',
  },
  segment: {
    term: 'segment',
    def: 'To have the computer find each cell and mark its center.',
  },
  segmentation: {
    term: 'segmentation',
    def: 'Having the computer find each cell in an image and mark its center.',
  },
  centroid: {
    term: 'centroid',
    def: 'The exact center point of a cell.',
  },
  voronoi: {
    term: 'Voronoi',
    def: 'A way of drawing a "territory" around each cell, so you can see how packed or spread out they are.',
  },
  'nearest-neighbor': {
    term: 'nearest-neighbor distance',
    def: 'How far each cell is from the closest other cell.',
  },
  µm: {
    term: 'µm (micron)',
    def: 'A tiny unit of length. One micron is a millionth of a meter, about the size of a small cell part.',
  },
  '2d-projected': {
    term: '2D-projected distance',
    def: 'A distance measured on a flat photo, which is only a shadow of the real 3D distance.',
  },
  'claim ceiling': {
    term: 'claim ceiling',
    def: 'The strongest thing your tools let you honestly say. You cannot claim more than your best evidence supports.',
  },
  'p-value': {
    term: 'p-value',
    def: 'How likely your result is just luck. A smaller p-value means luck is a less likely explanation.',
  },
  pseudoreplication: {
    term: 'pseudoreplication',
    def: 'Counting many cells from a few animals as if each cell were its own experiment. It fakes a big sample size.',
  },
  afm: {
    term: 'AFM',
    def: 'A machine that presses a tiny tip on tissue to measure how stiff it is. It usually needs dead tissue.',
  },
  fret: {
    term: 'FRET',
    def: 'A method using special glowing tags to sense the pulling force between molecules.',
  },
  brillouin: {
    term: 'Brillouin',
    def: 'A light-based method for measuring how stiff a tissue is.',
  },
  'magnetic actuation': {
    term: 'magnetic actuation',
    def: 'Using tiny magnetic beads and magnets to push on tissue and measure how it pushes back.',
  },
  tension: {
    term: 'tension',
    def: 'The pulling force between cells or molecules. You cannot see it by looking at where cells sit.',
  },
  'mol*': {
    term: 'Mol*',
    def: 'A free tool for viewing the 3D shape of a protein.',
  },
  alphafold: {
    term: 'AlphaFold',
    def: 'An AI that predicts the 3D shape of a protein. The shapes are good guesses, not photos.',
  },
}

/** Look up a term (case-insensitive). Returns null if not defined. */
export function lookup(term: string): GlossEntry | null {
  return GLOSSARY[term.toLowerCase().trim()] ?? null
}
