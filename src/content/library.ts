// "The Library" study module shown right after the Baby Mateo case intro and
// referenceable any time during the game. Content authored by a grounded
// multi-agent panel (the craniofacial research library + the Atit-lab
// conversation), reviewed for science + coverage + reading level. An optional
// `figure` reuses one of the app's SVG illustrations.

export interface LibrarySection {
  heading: string
  paragraphs: string[]
  terms: string[]
}

export interface LibraryChapter {
  id: string
  title: string
  summary: string
  readMinutes: number
  sections: LibrarySection[]
  known: string[]
  unknown: string[]
  keyQuestions: string[]
  figure?: 'embryo' | 'spacing' | 'pseudo' | 'migration'
}

export const LIBRARY_FOR_STAGE: Record<number, string> = {
  0: 'origins', 1: 'fibronectin', 2: 'measuring', 3: 'measuring',
  4: 'measuring', 5: 'measuring', 6: 'mechanics', 7: 'remodeling',
}

/** Stages where the student should read the related chapter for understanding
 *  BEFORE making their choice (the load-bearing decisions). */
export const READ_BEFORE_CHOOSING = new Set<number>([0, 1, 2, 3, 6])

export const LIBRARY: LibraryChapter[] = [
  {
    "id": "origins",
    "title": "From one cell to a face",
    "summary": "A single fertilized egg divides, folds, and rearranges itself into a layered embryo, and out of one of those layers a special migratory cell population, the cranial neural crest, breaks away to build most of the face and skull. This chapter walks that journey so you can see where the face actually comes from, and where it can go wrong.",
    "readMinutes": 9,
    "sections": [
      {
        "heading": "One cell becomes a hollow ball",
        "paragraphs": [
          "Every human body starts as a single cell: a zygote, made when a sperm fertilizes an egg. That one cell carries a full genome but almost no structure. The whole story of development is how a featureless cell turns into something with a top and bottom, a front and back, and hundreds of cell types arranged in exactly the right places. Nothing is added from outside. The information to build a face is already inside, waiting to be read out in the right order.",
          "The first job is to make more cells, fast, without growing larger. These early divisions are called cleavage. The zygote splits into 2 cells, then 4, then 8, and so on, packing the same original volume with more and more smaller cells. Because the cells are just subdividing rather than growing, the early embryo stays about the same size while its cell count climbs.",
          "After several rounds of cleavage the cells arrange into a hollow sphere with a fluid-filled cavity inside. In general developmental biology this stage is called a blastula; in mammals like us and the lab's mice, the equivalent structure is the blastocyst, which already separates the cells that will become the embryo proper from the cells that will help form the placenta. This is the first real act of spatial organization: cells are no longer an undifferentiated clump, they have started to sort into inside and outside, and into groups with different futures.",
          "Notice the pattern here, because it repeats at every scale in this game. Position comes first. Long before any cell can pull on its neighbors or feel how stiff its surroundings are, the embryo is already deciding where cells sit. Knowing where a cell is located is not the same as knowing what force it feels, a distinction the lab takes very seriously later on."
        ],
        "terms": [
          "zygote",
          "genome",
          "cleavage",
          "blastula",
          "blastocyst",
          "cell fate"
        ]
      },
      {
        "heading": "Gastrulation: the embryo folds into three layers",
        "paragraphs": [
          "The next step, gastrulation, is one of the most important events in your entire life. The biologist Lewis Wolpert famously said it is not birth, marriage, or death, but gastrulation that is truly the most important time of your life. During gastrulation the cells of the early embryo move and fold so that the single sheet reorganizes into three stacked layers, called the three germ layers. Every tissue you will ever have traces back to one of these three.",
          "The three germ layers are ectoderm (the outer layer), mesoderm (the middle layer), and endoderm (the inner layer). As a rough map: ectoderm makes the skin and the entire nervous system, mesoderm makes muscle, bone, blood, and connective tissue, and endoderm makes the lining of the gut and lungs. This is a simplification, and the face will turn out to be a famous exception that mixes contributions, but it is an honest starting frame.",
          "Gastrulation matters for the face because it sets up the ectoderm, and a special border region within it, from which the face-building cells will later emerge. It also establishes the body axes, meaning the embryo now genuinely has a head end and a tail end, a back and a belly. Once you have axes and layers, you have an address system. Cells can now be told not just to divide, but to divide here and become this.",
          "A useful way to read gastrulation is as the moment the embryo trades being a simple ball for being a structured, layered thing with directions. The layers are not yet organs. They are raw material sorted into the right bins, ready for the more detailed instructions that follow."
        ],
        "terms": [
          "gastrulation",
          "germ layers",
          "ectoderm",
          "mesoderm",
          "endoderm",
          "body axes"
        ]
      },
      {
        "heading": "Neurulation and the neural plate border",
        "paragraphs": [
          "After gastrulation comes neurulation, the building of the early nervous system out of the ectoderm. A strip of ectoderm running down the back of the embryo thickens into the neural plate. The edges of that plate, the neural folds, rise up like two walls, lean toward each other, and zip together at the midline to form the neural tube. That tube is the foundation of the brain and spinal cord. When this zipping fails, you get neural tube defects, which is why folate is recommended in early pregnancy.",
          "The most important real estate for this chapter is not the tube itself but its edge. The region where the rising neural folds meet the rest of the surface ectoderm is called the neural plate border. It is a true border zone, neither fully neural tube nor fully skin, and it is the birthplace of a remarkable cell population: the neural crest.",
          "As the neural tube closes, neural crest cells sit along the top, or dorsal, seam of the tube. They then do something dramatic. They loosen their attachments to their neighbors through a process called an epithelial-to-mesenchymal transition, which converts a settled, sheet-like cell into a loose, crawling, migratory one. Then they delaminate, meaning they break away from the neural folds and push through the basement membrane that lined them, and set off on long journeys to distant parts of the embryo.",
          "This is the hinge of the whole story. A face does not bud directly out of the head. Instead, a migratory cell population is born at a fold's edge and travels to where the face will be built. In the lab's actual work, the cells they image are crawling toward the apex of the head, putting out tentacle-like projections, which is exactly the migratory behavior that begins right here at the neural plate border."
        ],
        "terms": [
          "neurulation",
          "neural plate",
          "neural folds",
          "neural tube",
          "neural plate border",
          "neural crest",
          "epithelial-to-mesenchymal transition",
          "delamination"
        ]
      },
      {
        "heading": "Cranial neural crest: the cells that build the face",
        "paragraphs": [
          "Neural crest cells form all along the body axis, but the ones born at the head end are special, and they are the stars of this game. They are called cranial neural crest cells, often shortened to CNCCs. They migrate forward and fill the swellings around the early mouth, called the facial prominences, and the pharyngeal arches in the neck region. The bulk tissue of the developing face is built from these migrated crest cells, mixed with some mesoderm and capped by ectoderm.",
          "What makes cranial neural crest cells extraordinary is how many different things they can become. They are multipotent, meaning a single starting population gives rise to bone, cartilage, and connective tissue of the face, plus other cell types like the cells that build teeth, pigment cells, and parts of the nervous system. Most of the facial skeleton and the front of the skull are neural-crest-derived. This is why the textbook layer map has an asterisk: the skull and face come from ectoderm by way of the neural crest, not from mesoderm the way the rest of the skeleton does.",
          "Once these cells arrive, the face is assembled block by block. Separate swellings of crest-filled tissue grow toward one another and must fuse on schedule to form a continuous upper lip and roof of the mouth. When a block grows too little, arrives too late, or cannot stick to its partner, a fusion fails and the result is a cleft of the lip or palate. The entire arc, from the neural plate border to a closed face, is the developmental window in which a cleft can originate, roughly the fourth through twelfth weeks in humans.",
          "So the answer to the chapter's title is this: a face emerges from one cell because that cell first multiplied, then folded into layers, then raised a neural tube whose edge gave birth to a migratory crew of cells that crawled to the front of the head and built the face from the inside out. Everything the lab measures later, where the cells sit, how they space themselves, whether they are congested or moving freely, is a close look at this crew doing its job."
        ],
        "terms": [
          "cranial neural crest cells (CNCCs)",
          "facial prominences",
          "pharyngeal arches",
          "multipotent",
          "intramembranous ossification",
          "cleft lip and palate",
          "developmental window"
        ]
      },
      {
        "heading": "What the cells become: the bone-or-cartilage switch",
        "paragraphs": [
          "Getting the cells to the face is only half the job. Once cranial neural crest cells arrive and fill the prominences, each one still has to decide what to become. In the forehead region the Atit lab studies, this pool of cells is tripotent: a single cell can become bone, the deep layer of skin called dermis, or, if left alone, cartilage. Cartilage is the default. Something has to actively steer these cells toward bone and dermis instead.",
          "That something is a signal called Wnt, which acts inside the cell through a protein called beta-catenin. When Wnt and beta-catenin signaling is on, the cells switch on the bone program (run by the genes Runx2 and then Osterix) and the dermis program (run by Twist1 and Twist2, also called Dermo1), and they keep the cartilage program (run by the gene Sox9) switched off. When the Wnt signal is missing, the cells fall back to the default and make cartilage in places that should have become bone. Because flipping this one signal flips the whole decision, the lab calls it a master switch.",
          "There is an address system built in. Part of the Wnt signal comes from the skin layer (the ectoderm) lying on top of the mesenchyme. Cells closest to that source see the strongest signal and tend to become dermis, while deeper cells become bone. This is the same theme as the rest of this Library: a cell's position and the signals around it decide what it does. It also reframes a birth difference in a powerful way. A cleft, or a missing piece of skull bone, can be a cell-fate decision that tipped the wrong way, with bone-or-dermis cells defaulting to cartilage when the Wnt signal was lost. That is the exact logic the Atit lab studies, applied to the face."
        ],
        "terms": [
          "tripotent",
          "Wnt",
          "beta-catenin",
          "Sox9",
          "Runx2",
          "Osterix",
          "Twist1",
          "Dermo1",
          "cartilage",
          "dermis",
          "osteoblast",
          "master switch"
        ]
      }
    ],
    "known": [
      "A single fertilized cell (the zygote) contains the full genome and gives rise to the entire body; development reads that information out in a fixed order.",
      "Cleavage divides the zygote into many smaller cells without overall growth, producing a hollow blastula (a blastocyst in mammals).",
      "Gastrulation reorganizes the embryo into three germ layers (ectoderm, mesoderm, endoderm) and establishes the body axes; nearly every tissue traces to one of these layers.",
      "Neurulation forms the neural tube from the neural plate; failure of neural tube closure causes neural tube defects, which is why periconceptional folate is recommended.",
      "The neural crest arises at the neural plate border, the edge zone where neural folds meet surface ectoderm.",
      "Neural crest cells undergo an epithelial-to-mesenchymal transition, delaminate from the dorsal neural tube, and migrate to distant sites.",
      "Cranial neural crest cells are multipotent and build most of the facial skeleton, cartilage, and connective tissue, plus teeth, pigment, and neural cells; the front of the skull (the frontal bone) is neural-crest-derived, while the back of the skull (the parietal bone) comes from mesoderm, unlike the rest of the skeleton.",
      "Cranial neural crest fills the facial prominences and pharyngeal arches, and the face is assembled by separate tissue blocks that grow toward each other and must fuse on schedule (roughly weeks 4 to 12 in humans).",
      "A cleft lip or palate is, at its root, a fusion that did not happen because a block grew too little, arrived too late, or could not stick.",
      "In cranial mesenchyme, Wnt/beta-catenin works as a master switch: it drives the bone and dermis programs and represses the default cartilage program (the gene Sox9).",
      "Cartilage is the default fate of these cells; making bone or dermis needs an active Wnt signal, and part of that signal comes from the overlying ectoderm, so a cell's position helps set its fate."
    ],
    "unknown": [
      "Exactly which combinations of signals at the neural plate border commit a specific cell to become neural crest rather than skin or neural tube is still being mapped, and the full gene regulatory network is not settled.",
      "How a multipotent cranial neural crest cell ultimately chooses one fate (bone versus cartilage versus dermis) is an active research question; the chromatin mechanism that keeps the cartilage program switched off when bone or dermis is chosen has not been identified, and one leading candidate (the PRC2 complex) was experimentally ruled out.",
      "Whether the orderly spacing and movement of migrating cranial neural crest cells is set mainly by a chemical road, by physical crowding in a narrowing space, by mechanical tension, or by some mix is not yet resolved; the lab can describe where the cells sit but cannot yet directly measure the force they feel.",
      "Why two embryos carrying the same genetic risk can differ, one developing a cleft and one not, is not fully explained; environmental and epigenetic 'second hits' are suspected but not pinned down for any single case.",
      "The relative contributions of cell migration, programmed cell death, and cell rearrangement to dissolving the seam where facial blocks fuse are still debated and have shifted as imaging improved."
    ],
    "keyQuestions": [
      "If cranial neural crest cells are multipotent, what local signal at their destination decides whether a given cell becomes bone rather than cartilage, and could a missing signal explain a specific facial defect?",
      "The neural plate border gives rise to neural crest: what would I need to measure to tell whether a cell there is committed to becoming crest versus skin, and at what stage does that decision become irreversible?",
      "The lab can show that mutant cells are congested and spaced closer together than control cells, but spacing is not the same as force, so what additional experiment (and what tool on the Measurement Ladder) would be needed to claim that crowding actually generates mechanical tension?",
      "If you blocked the Wnt signal coming from the skin layer above the frontal-bone cells, would they build cartilage instead of bone?"
    ],
    "figure": "embryo"
  },
  {
    "id": "neuralcrest",
    "title": "The neural crest on the move",
    "summary": "The cranial neural crest is a temporary population of cells that is born at the edge of the forming brain, sheds its identity to break free, and then travels as a coordinated crowd into the face, where it becomes the raw material (the craniofacial mesenchyme) for the frontonasal prominence and the pharyngeal arches. This chapter follows those cells from birth to destination and shows how they steer together, which is the movement story that sits underneath the spacing patterns you measure in the game.",
    "readMinutes": 9,
    "sections": [
      {
        "heading": "Born at the border: induction at the neural plate edge",
        "paragraphs": [
          "Early in development the top of the embryo flattens into the neural plate, a sheet of cells that will roll up into the neural tube and become the brain and spinal cord. The neural crest is not born in the middle of that sheet. It is born along the seam where the neural plate meets the future skin (the non-neural ectoderm). That seam is called the neural plate border, and the cells there sit in a kind of crossroads, receiving signals from the neural plate on one side, the skin-fated ectoderm on the other, and the tissue underneath.",
          "Three signaling languages overlap at that border and together induce neural crest identity: WNT, BMP at intermediate levels (not too high, not too low), and FGF. A cell that reads this particular cocktail switches on a set of border genes and then a set of neural-crest specifier genes (for example Pax3, Zic1, FoxD3, Sox9, Sox10, and Snail-family genes). Turning on these genes is what makes a border cell a neural crest cell rather than a skin cell or a neuron. This is induction: one group of cells changing the fate of its neighbors through signals.",
          "One reason the neural crest fascinates biologists is that it is multipotent, meaning a single crest cell can still become many different things: bone, cartilage, connective tissue, the dentin-making cells of teeth, pigment cells, and parts of the peripheral nervous system. The cranial (head) crest in particular is the source of most of the facial skeleton. So a problem at this very first step, before any cell has moved, can ripple all the way to a face that does not form correctly.",
          "A fair question a student should sit with: induction depends on dose. BMP has to be in a middle range, not just present or absent. That is a reminder that in development the amount and timing of a signal often matters more than its mere presence, an idea you will meet again when you compare a control to a mutant in the game."
        ],
        "terms": [
          "neural plate",
          "neural plate border",
          "neural crest",
          "induction",
          "ectoderm",
          "multipotent",
          "specifier genes",
          "WNT",
          "BMP",
          "FGF",
          "cranial neural crest"
        ]
      },
      {
        "heading": "Breaking free: delamination and the epithelial-to-mesenchymal transition",
        "paragraphs": [
          "When they are born, neural crest cells are part of an epithelium: a tidy sheet of cells glued to each other and sitting on a basement membrane, all facing the same way. Cells in a sheet cannot crawl away. To migrate, the crest has to undo every part of being a sheet cell. This conversion is called the epithelial-to-mesenchymal transition, or EMT, and the physical act of pulling out of the sheet is called delamination.",
          "During EMT the cells dial down the adhesion molecules that hold the sheet together. A key one is E-cadherin (the CDH1 gene), the molecular velcro of epithelial cells. The neural-crest specifier genes you met above, especially the Snail family, act as switches that shut E-cadherin off and turn on a different, weaker, more dynamic set of cadherins. At the same time the cell loosens its grip on the basement membrane and rebuilds its internal skeleton so it can extend and retract. The result is a mesenchymal cell: unglued, individually mobile, and free to crawl.",
          "EMT is not a craniofacial-only trick. The same program reappears in wound healing and, in a hijacked form, in cancer metastasis, where tumor cells reuse EMT to escape and spread. That is why studying how the crest controls EMT is biomedically valuable far beyond the face: the crest is a clean, natural example of cells learning to move on purpose.",
          "The link to disease here is direct. The synthesis our class works from lists too few or mislocated neural crest cells as an upstream cause of cleft lip, and a methylome study found that hypermethylation silencing E-cadherin tracked with whether at-risk family members actually developed a cleft. In other words, the adhesion settings that EMT changes are not just textbook detail; mistuning them is one of the documented chains that ends in a cleft."
        ],
        "terms": [
          "epithelium",
          "basement membrane",
          "delamination",
          "epithelial-to-mesenchymal transition (EMT)",
          "E-cadherin (CDH1)",
          "cadherin",
          "Snail",
          "mesenchyme",
          "metastasis"
        ]
      },
      {
        "heading": "Moving as a crowd: collective migration, contact inhibition, and steering together",
        "paragraphs": [
          "You might expect freshly unglued cells to scatter in every direction. They do not. Cranial neural crest cells travel in organized streams, as a loosely connected group that holds a shared direction. This is collective migration: the cells stay near one another and behave as a coordinated population even though each one is crawling on its own feet. Migrating in a crowd lets the group read a direction more reliably than any single cell could alone.",
          "Two opposite-seeming rules keep the crowd both spread out and together. The first is contact inhibition of locomotion: when two crest cells bump into each other, each one stops, retracts the part that touched, and crawls off in a new direction. By itself that would scatter the cells. So a second rule pulls them back: the cells secrete a signal (a complement-pathway protein, C3a) that makes them mildly attracted to each other, called co-attraction. Push apart on contact, drift back together at a distance: the balance keeps the group as a moving cloud rather than either a clump or a scatter. Contact inhibition also has a steering effect at the edge of the group, because a cell at the front has free space ahead and crowded cells behind, so its repolarized crawling tends to point outward, away from the pack.",
          "Within a stream, cells take on roles. Leader cells at the front face open tissue, read the guidance cues most strongly, and set the heading; follower cells behind them are pulled along and help maintain the stream. These roles are not fixed job titles for life: leaders and followers can swap as conditions change, and the front cells partly create the path that the followers then use. There is also a literal mechanical version of this. Cells are physically linked, so a cell that grips the matrix and pulls can tug its neighbors, meaning one cell can help drag the cells attached to it. The crowd moves partly because some cells are towing others.",
          "Direction itself comes from cues in the environment. The crest follows attractive trails and avoids forbidden zones, using chemical gradients (for example the Sdf1/Cxcr4 attractant system) and contact cues, while planar cell polarity signaling helps each cell point its machinery the same way as its neighbors. In the slice our game studies, Dr. Atit describes a fibronectin (FN1) road in the extracellular matrix that runs low to high in the direction the cells travel, from the brow toward the apex of the head, with the cell-movement machinery graded the same way. That FN1 gradient is exactly the cue the game lets you map at the ECM rung of the Measurement Ladder."
        ],
        "terms": [
          "collective migration",
          "streams",
          "contact inhibition of locomotion",
          "co-attraction",
          "C3a",
          "leader cells",
          "follower cells",
          "chemotaxis",
          "Sdf1/Cxcr4",
          "planar cell polarity",
          "fibronectin (FN1)",
          "extracellular matrix"
        ]
      },
      {
        "heading": "Arrival: building the face, and what movement is not",
        "paragraphs": [
          "The cranial crest does not wander aimlessly; it has addresses. Cells migrate into the frontonasal prominence (the midline block that builds the forehead, bridge of the nose, and the middle of the upper lip) and into the pharyngeal arches, the paired bars in the neck region whose first two arches contribute the jaws and middle-ear structures. Once they arrive, these cells become the craniofacial mesenchyme: the bulk soft tissue of the facial swellings. That mesenchyme is the population that then grows, condenses, and turns into bone and cartilage, mostly by intramembranous ossification in the case of the flat facial and skull bones.",
          "This is why migration is a craniofacial story and not just a cell-biology curiosity. If the right number of crest cells do not arrive at the right place at the right time, the facial blocks are too small or misplaced, and when neighboring blocks (such as the medial nasal and maxillary processes) fail to meet and fuse, the lip or palate does not close. The journey and the destination are upstream of the structure.",
          "Here is the careful part, and it is the heart of the game. When you measure where cells end up, you are measuring spatial organization: positions, spacing, how evenly the cells are distributed. In Dr. Atit's mutant, the cells that did not migrate well end up congested, with nuclear spacing squeezed down to roughly five to ten microns, packed back together. That congestion is a real, measurable footprint of failed movement. But it is a footprint, not the force itself.",
          "The pinned rule for this whole project says it plainly: spatial organization is not the same thing as tension. You can see that cells are crowded, and you can even map the FN1 road they followed, but a road is not a force, and crowding is not a measurement of how hard the cells were pulling. The cells may be congested because they ran into a physically narrow tunnel, or because their own contractility (their phospho-myosin-driven crawling machinery) was reduced, or both, and a spacing number alone cannot tell you which. Knowing how to read a movement story from spacing, while staying honest about what spacing cannot prove, is exactly the discipline the Measurement Ladder is teaching you."
        ],
        "terms": [
          "frontonasal prominence",
          "pharyngeal arches",
          "medial nasal process",
          "maxillary process",
          "craniofacial mesenchyme",
          "intramembranous ossification",
          "fusion",
          "nuclear spacing",
          "contractility",
          "phospho-myosin light chain",
          "tension"
        ]
      }
    ],
    "known": [
      "The cranial neural crest is induced at the neural plate border by overlapping WNT, intermediate-level BMP, and FGF signals, which switch on neural-crest specifier genes (Pax3, Zic1, FoxD3, Sox9/10, Snail family).",
      "To migrate, crest cells undergo an epithelial-to-mesenchymal transition (EMT): they down-regulate E-cadherin (CDH1), loosen from the basement membrane, and delaminate as individually motile mesenchymal cells.",
      "Cranial neural crest cells migrate in organized streams into the frontonasal prominence and the pharyngeal arches and become the craniofacial mesenchyme, which builds most of the facial skeleton largely by intramembranous ossification.",
      "The cells are multipotent, giving rise to bone, cartilage, connective tissue, odontoblasts, pigment cells, and peripheral neurons and glia.",
      "Collective migration is coordinated by a balance of contact inhibition of locomotion (cells repel on contact) and co-attraction (C3a-mediated mutual attraction), producing a cohesive, directionally moving group with leader and follower roles.",
      "Direction is set by environmental cues including chemoattractant gradients (Sdf1/Cxcr4), planar cell polarity, and matrix cues; in the Atit-lab head slice a fibronectin (FN1) gradient runs low to high in the direction of travel.",
      "Defects in crest migration, number, survival, or fate are documented upstream causes of orofacial cleft; silencing of E-cadherin (CDH1 hypermethylation) has been linked to cleft penetrance in at-risk families.",
      "In the Atit-lab mutant, impaired migration leaves cells congested with nuclear spacing reduced to roughly five to ten microns, a measurable signature of failed movement."
    ],
    "unknown": [
      "Whether the FN1 gradient causes the directed migration and ordered spacing, merely correlates with it, or whether the real driver is the physically narrowing space (a tunnel effect) the cells squeeze through, is not yet resolved; AFM stiffness data to distinguish these is not available in this setting.",
      "Whether the reduced phospho-myosin signal in the mutant is a cause of slower migration or a consequence of having fewer, congested cells is hard to separate, especially because the punctate signal is difficult to quantify and must be normalized to cell number and area.",
      "The exact mechanism by which beta-catenin represses cartilage fate in cranial mesenchyme is unidentified; PRC2/H3K27me3 was shown by an EZH2 deletion not to be the required mechanism.",
      "Whether congested spacing reflects mechanical tension at all cannot be settled from spacing measurements, because spatial organization is not the same thing as tension and a direct force number is out of reach here.",
      "How leader-versus-follower roles are assigned in vivo, and how stable or interchangeable those roles are over the course of a real cranial migration, is still actively studied.",
      "How environmental and epigenetic 'second hits' (for example hypoxia-linked methylation changes) quantitatively shift crest migration enough to tip an at-risk individual into a cleft is not fully mapped."
    ],
    "keyQuestions": [
      "Do neural crest cells that migrate along an FN1-rich path show larger, more regular nuclear spacing than cells in an FN1-blocked or migration-impaired control, and is any difference real per embryo rather than just per pooled cell?",
      "If I see congested nuclear spacing in a mutant, what additional, non-spacing measurement (for example phospho-myosin light chain normalized to cell number, or a direct stiffness reading) would I need before I could claim the cells were under reduced mechanical tension rather than simply stuck in a narrow space?",
      "If I disrupt co-attraction or contact inhibition of locomotion, would the crest stream lose its shared direction and scatter, and how could I detect that change as a measurable shift in cell spacing or stream geometry?"
    ],
    "figure": "migration"
  },
  {
    "id": "matrix",
    "title": "The matrix the cells move through",
    "summary": "The extracellular matrix is not empty space between cells, it is a structured 3D material the cells build, grip, read, and rebuild. This chapter maps its main molecules, contrasts the thin basement membrane sheet with the looser interstitial matrix the migrating crest cells crawl through, and shows why the matrix is information, not just scaffolding.",
    "readMinutes": 9,
    "sections": [
      {
        "heading": "What the matrix is made of",
        "paragraphs": [
          "Between and around cells sits a meshwork of large molecules the cells themselves secrete. This is the extracellular matrix, or ECM. It is not a passive filler. It is a built material with a recipe, and the recipe changes from tissue to tissue and from day to day. In the developing face, the cells that will become bone, cartilage, and connective tissue (the cranial neural crest cells) spend days crawling through this material on their way to where they are needed, so the matrix is literally the terrain of the trip.",
          "Collagens are the tension-bearing cables. They are the most abundant protein in the body, and they self-assemble into long fibrils and thick fibers that give tissue its tensile strength, the way rebar gives strength to concrete. Fibronectin (the gene is FN1) is the cell's grip-and-go molecule: it is a sticky, stretchy protein that cells latch onto and that also binds collagen, so it acts as a bridge between the cell surface and the rest of the matrix. Laminin is the signature adhesion protein of one special thin layer, the basement membrane, which the next section covers.",
          "Two more components are about water and bulk rather than fibers. Proteoglycans are proteins decorated with long sugar chains (glycosaminoglycans) that carry a strong negative charge; that charge pulls in water and ions, so proteoglycans act like a packed gel that resists being squeezed. Hyaluronan (also called hyaluronic acid) is a single enormous unbranched sugar chain that holds huge amounts of water and can swell a tissue quickly. In palate development, a rapid increase in hyaluronan helps the palatal shelves swell and lift, which is one real example of the matrix doing mechanical work, not just sitting there.",
          "So the matrix has a division of labor: collagen for tensile strength, fibronectin and laminin for grip and guidance, and proteoglycans plus hyaluronan for water-filled bulk and resistance to compression. The exact mix, density, and arrangement of these molecules is what makes one patch of matrix stiff and another soft, one a clear road and another a wall."
        ],
        "terms": [
          "extracellular matrix (ECM)",
          "collagen",
          "fibronectin (FN1)",
          "laminin",
          "proteoglycan",
          "glycosaminoglycan",
          "hyaluronan"
        ]
      },
      {
        "heading": "Two kinds of matrix: the basement membrane sheet versus the interstitial mesh",
        "paragraphs": [
          "Not all matrix is the same shape. The basement membrane (BM) is a very thin, dense, sheet-like specialized matrix that sits directly under epithelial layers (sheets of tightly packed cells like skin or the lining of a tube) and wraps around muscles, nerves, and blood vessels. It is built mostly from laminin, a specific network collagen called type IV collagen, and anchoring molecules, and it works like a structured floor or boundary that separates one tissue compartment from another. Its job is partly mechanical (a barrier and an anchor) and partly informational (a surface cells read to know which side is up).",
          "The interstitial ECM is the looser, more open, three-dimensional mesh that fills the spaces between cells in connective tissue. It is dominated by fibrillar collagens, fibronectin, proteoglycans, and hyaluronan, and it has more open volume than the tight BM sheet. This is the material the migrating neural crest cells actually travel through after they leave the neural tube. Where the BM is a thin wall or floor, the interstitial matrix is the field beyond the wall.",
          "These two matrix types are central to a key developmental event: the epithelial-to-mesenchymal transition, or EMT. Cranial neural crest cells begin life inside a tidy epithelial sheet sitting on a basement membrane. To migrate, they must change their behavior, loosen their attachments to neighbors, and break through the basement membrane below them, then enter the looser interstitial matrix and crawl. Crossing from the BM compartment into the interstitial compartment is a real physical and molecular threshold, not just a change of address.",
          "A useful mental picture: the basement membrane is a thin specialized sheet a cell can rest on, stick to, or punch through, while the interstitial matrix is a roomy 3D web a cell can wander into and pull itself along. The same cell experiences both during a single journey across the face."
        ],
        "terms": [
          "basement membrane (BM)",
          "type IV collagen",
          "epithelium",
          "interstitial ECM",
          "epithelial-to-mesenchymal transition (EMT)",
          "cranial neural crest cell"
        ]
      },
      {
        "heading": "The matrix is information, not just a floor",
        "paragraphs": [
          "The most important shift in thinking is this: cells do not just sit on the matrix, they read it. Cells grip the matrix through receptors on their surface called integrins, which clamp onto matrix molecules like fibronectin and feed signals inward. Through those grips a cell can sense how much matrix is present, how stiff it is, and which direction has more of it, and then it can change its shape, its movement, and even which genes it turns on in response. The matrix is a message the cell decodes.",
          "Two matrix-reading behaviors matter for the face. In haptotaxis, cells move up a gradient of how much sticky matrix is present, following the molecule like a scent trail; a graded amount of fibronectin can act as a road that points cells in a direction. In durotaxis, cells move toward stiffer matrix, sensing mechanical resistance rather than chemical amount. In the Atit lab's own data, fibronectin runs in a gradient from low to high in the direction the crest cells are growing, from the eyebrow region up toward the apex of the head, and the cells' movement machinery is graded the same way. That gradient is a candidate cue the cells are reading as they travel.",
          "One mechanosensor that records what the matrix feels like is a protein called YAP. When a cell is on stiffer or more demanding matrix, YAP tends to move into the nucleus and switch on genes; when the matrix is soft and undemanding, YAP stays out of the nucleus. In this system YAP is found more in the nucleus exactly where fibronectin and the movement machinery are strongest, which is consistent with the cells there being mechanically engaged. This is why the matrix counts as information: its physical state is being measured by the cell and converted into gene activity.",
          "Finally, reading is a two-way street. Cells also remodel the matrix: they secrete new collagen and fibronectin, and they cut and clear old matrix using enzymes such as matrix metalloproteinases. During palate-seam closure, for example, the matrix is actively dissolved and rebuilt as the tissue rearranges. So the terrain shapes the cell, and the cell reshapes the terrain, in a continuous loop across days of development."
        ],
        "terms": [
          "integrin",
          "haptotaxis",
          "durotaxis",
          "gradient",
          "YAP",
          "mechanosensing",
          "matrix remodeling",
          "matrix metalloproteinase"
        ]
      },
      {
        "heading": "Why this matters for the measurement ladder",
        "paragraphs": [
          "The game's central caution lives right here in the matrix. You can stain fibronectin and trace where it is dense and where it is sparse, and you can map collagen fibers and see which way they line up. That gives you a real, honest picture of the matrix as a structure: a road map of where the sticky molecules are and which way they point. This is the ECM-architecture rung of the measurement ladder, and it is genuinely free and informative.",
          "But mapping the road is not the same as measuring the force on the traveler. A fibronectin gradient is a plausible cue, yet seeing the gradient does not by itself prove the cells feel a mechanical pull or that stiffness is steering them. Dr. Atit is explicit that the spacing and crowding pattern could come from the fibronectin road, or it could come from something else entirely, such as the cells being squeezed into a narrowing physical space, a tunnel, as the head shape changes around them. The matrix architecture is consistent with several stories at once.",
          "That is exactly why the chapter's lesson connects to the pinned rule of the whole game: spatial organization is not the same thing as tension. Where molecules sit, and how cells are spaced, is structure. Whether the cells are being mechanically pushed, pulled, or stiffened is force. The matrix is the bridge that makes force plausible, but a force claim still needs a direct mechanical measurement, which sits on the locked, harder-to-reach rungs of the ladder. Understanding the matrix is what lets you say precisely how far your evidence reaches, and where it stops."
        ],
        "terms": [
          "ECM architecture",
          "fiber alignment",
          "measurement ladder",
          "spatial organization versus tension",
          "fibronectin gradient"
        ]
      }
    ],
    "known": [
      "Collagens, fibronectin (FN1), laminin, proteoglycans, and hyaluronan are real, well-characterized ECM molecules with distinct jobs: collagen for tensile strength, fibronectin and laminin for adhesion and guidance, proteoglycans and hyaluronan for water-holding bulk.",
      "The basement membrane is a thin, dense, laminin-and-type-IV-collagen sheet under epithelia, structurally and chemically distinct from the looser fibrillar interstitial ECM.",
      "Cranial neural crest cells undergo an epithelial-to-mesenchymal transition, cross the basement membrane, and migrate through interstitial matrix to build most of the facial skeleton.",
      "Cells grip the matrix through integrins and can sense matrix amount (haptotaxis) and stiffness (durotaxis), converting physical cues into changes in shape, movement, and gene expression.",
      "YAP is a genuine mechanosensor whose nuclear location reports the mechanical state a cell experiences, and in this system it is enriched in nuclei where fibronectin and the movement machinery are strongest.",
      "Cells actively remodel the matrix, building new collagen and fibronectin and degrading old matrix with enzymes such as matrix metalloproteinases.",
      "A hyaluronan-driven swelling of matrix is part of how palatal shelves elevate, a concrete case of the matrix doing mechanical work in craniofacial development."
    ],
    "unknown": [
      "Whether the observed fibronectin gradient is actually the cue steering the crest cells, or whether it is incidental, is not yet settled; the spacing pattern could instead come from physical confinement as the head narrows.",
      "No direct stiffness or tension number for this tissue exists yet in the Atit data; AFM-style measurements were out of reach (the method usually needs dead tissue, special hardware, and trained operators and interpreters), so a true force value is missing.",
      "How much of the cell-spacing and crowding signal is matrix-driven (durotaxis or haptotaxis) versus driven by crowding in a shrinking space is an open question the lab is still working to separate.",
      "Whether the matrix changes cause the migration pattern or merely accompany it (cause versus correlation) cannot be decided from snapshots of structure alone."
    ],
    "keyQuestions": [
      "If fibronectin is graded low-to-high in the direction of growth, does blocking or flattening that gradient actually change how the crest cells space themselves, or does the spacing pattern persist (which would point to confinement rather than the FN1 road)?",
      "Can nuclear YAP enrichment be used as a readout to tell apart cells that are mechanically engaged with stiff matrix from cells that are simply crowded into a tight space?",
      "Since mapping fibronectin and collagen alignment only describes matrix structure, what specific direct measurement would be needed to upgrade an ECM-architecture observation into a defensible claim about mechanical tension on the cells?"
    ]
  },
  {
    "id": "fibronectin",
    "title": "Fibronectin: building the road",
    "summary": "Fibronectin (FN1) is a sticky matrix protein that cells grip through integrins and actively stretch into fibers, laying down a graded road that neural crest cells follow uphill as they build the frontal bone. The road is real and measurable in an image, but a road is not a force.",
    "readMinutes": 8,
    "sections": [
      {
        "heading": "The grip: RGD, integrins, and a protein cells can hold onto",
        "paragraphs": [
          "Fibronectin, written FN1 for the gene, is one of the main proteins of the extracellular matrix (ECM), the meshwork of material that sits outside cells and fills the spaces between them. If the cells of the embryo are travelers, the ECM is the ground they walk on, and fibronectin is one of the most important surfaces they grip. It is a large protein that comes as two arms joined at one end, so a single molecule reaches out into the tissue from its two free ends.",
          "The reason cells can hold onto fibronectin comes down to a tiny three-amino-acid sequence in the protein: Arg-Gly-Asp, almost always written by its one-letter code RGD. That short motif is the handle. Cells reach out and grab the RGD handle using surface receptors called integrins. An integrin is a protein that spans the cell membrane, with an outside end that latches onto RGD in the matrix and an inside end that connects, through a cluster of adaptor proteins, to the cell's actin cytoskeleton, its internal scaffolding of fibers.",
          "This matters because it makes the grip a two-way street. The integrin is not just glue. It is a physical link from the outside matrix all the way to the machinery inside the cell that generates pulling force. So when a cell binds fibronectin, it is not only sticking to the road, it is wiring itself up to pull on it. That single fact, integrin links matrix to the cell's force machinery, is the idea the rest of this chapter is built on."
        ],
        "terms": [
          "fibronectin",
          "FN1",
          "extracellular matrix (ECM)",
          "RGD motif",
          "integrin",
          "actin cytoskeleton"
        ]
      },
      {
        "heading": "Fibrillogenesis: cells build the road by pulling on it",
        "paragraphs": [
          "Here is the part that surprises most people. Fibronectin does not arrive as a finished set of fibers. Cells secrete it as soluble, folded-up molecules that drift in the fluid around them, and in that compact state the protein's stickiest assembly sites are tucked away and hidden. The fiber network has to be manufactured, and the cells manufacture it by pulling.",
          "The process is called fibrillogenesis, which just means making fibers. A cell grabs fibronectin through its integrins, then uses its actin-and-myosin machinery to tug. Myosin is the motor protein that walks along actin and generates tension, the same engine you will meet again when this game talks about phospho-myosin light chain, which is the activated, working form of that motor. As the cell pulls, the fibronectin molecule physically unfolds and stretches. Unfolding exposes the hidden binding sites, and exposed sites let one fibronectin grab the next, so stretched molecules link end to end and side to side into long insoluble fibrils. Stop the pulling, block the myosin motor, and fibronectin fibers do not assemble. The fiber only exists because something stretched it.",
          "The deep consequence is this: the fibronectin network is built under tension, by definition. It is not a passive surface the cells happen to find. It is a structure they themselves strung tight, like a climber hammering in the rope as they go and then pulling against it to climb higher. That is why fibronectin sits right at the border between two things this game keeps separate. The road is a structure you can see and measure, but the act of building and gripping it is a force, and those are not the same claim."
        ],
        "terms": [
          "fibrillogenesis",
          "fibril",
          "myosin",
          "tension",
          "phospho-myosin light chain"
        ]
      },
      {
        "heading": "The graded road: low-to-high fibronectin and haptotaxis",
        "paragraphs": [
          "In the developing face, fibronectin is not spread evenly. In the region the Atit lab studies, the frontal bone of the skull, the cranial neural crest cells start near the eyebrow and travel up and over toward the apex, the middle of the top of the head. Dr. Atit describes the pattern plainly: the fibronectin is graded from low to high in the direction of growth. There is less of it where the cells start and more of it ahead of them, in the direction they need to go. The movement biology, the active actin, follows the same gradient.",
          "A gradient in an attached, stuck-down cue like fibronectin sets up a specific kind of guided movement called haptotaxis. The word breaks down to touch (hapto) plus arrangement or ordering (taxis): movement directed by a gradient of adhesion. A crawling cell sends out many sticky feet, and feet that land on richer fibronectin grip harder and last longer than feet on poorer fibronectin. Tug-of-war by tug-of-war, the cell is biased to advance toward the high end. Multiply that across a whole population and you get a crowd that drifts, on average, up the road, which is exactly what produces orderly, non-random spacing instead of a random scatter.",
          "It helps to be precise about what haptotaxis is and is not. It is following a gradient of a bound, surface-attached cue, like footing that gets grippier in one direction. That is different from chemotaxis, which is following a gradient of a free-floating, dissolved chemical signal drifting through the fluid. Fibronectin is laid into the matrix, not floating, so the cells are reading the ground, not sniffing the air. In this game's first act, the graded fibronectin road is the leading hypothesis for why the nuclei end up spaced the way they do: a real, mappable cue with a direction built into it."
        ],
        "terms": [
          "gradient",
          "cranial neural crest cells",
          "haptotaxis",
          "chemotaxis",
          "non-random spacing"
        ]
      },
      {
        "heading": "A fast, living road, and the line you cannot cross with a picture",
        "paragraphs": [
          "The fibronectin road is not painted once and left. It is constantly being torn up and repaved. Cells secrete fresh fibronectin, enzymes and uptake clear away the old, and the whole network turns over on a timescale of hours, not days or weeks. That fast turnover is what lets the road keep its shape useful: the gradient can be maintained and reshaped to stay just ahead of the moving cells, the way a crew can keep extending a path as the hikers advance. It also means a stained snapshot is a freeze-frame of something that was changing the whole time, which is exactly why the lab studies several time points, embryonic day E12.5, E13.5, and onward, rather than trusting any single image to tell the whole story.",
          "Now the crucial limit, and it is the spine of this whole game. You can stain fibronectin and trace its fibers in a tissue section. You can measure that the road runs low to high in the direction of growth. You can map it beautifully. But mapping the road tells you the cue is there and which way it points. It does not, by itself, measure the force the cells feel or generate. As the pinned quote in the game puts it, spatial organization is not the same thing as tension. A picture of a graded, aligned matrix is strong evidence, but it is evidence about structure, and structure is not a force number.",
          "The lab has hints that mechanics are involved: a protein called YAP, which is a mechanosensor (it moves into the nucleus when a cell senses a stiff or tense environment), is found more in the nuclei of the cells in the high-fibronectin, fast-moving region. That is suggestive. But Dr. Atit is careful that it might be fibronectin stiffness driving it, or it might be something else entirely, such as the cells being squeezed into a physically tight space, a tunnel, as they climb over the curve of the skull, which would raise their contractility for reasons that have nothing to do with fibronectin. Telling those apart needs a direct stiffness or tension measurement, the kind of force tool that, in this game, stays locked. Fibronectin builds and marks the road. Proving the road generates the force is a different, harder claim."
        ],
        "terms": [
          "FN1 turnover",
          "time series",
          "YAP",
          "mechanosensor",
          "spatial organization is not the same thing as tension"
        ]
      }
    ],
    "known": [
      "Fibronectin (FN1) is an extracellular-matrix protein that cells bind through integrin receptors, which latch onto the protein's RGD amino-acid motif.",
      "Integrins physically connect bound fibronectin on the outside of the cell to the actin-myosin force machinery on the inside, so adhesion and force generation are linked.",
      "Fibronectin fibers are not secreted pre-formed; cells assemble them (fibrillogenesis) by pulling on soluble fibronectin with myosin-driven tension, which unfolds the molecule and exposes hidden assembly sites. The fiber network is therefore built under tension.",
      "Fibronectin serves as an adhesive substrate that migrating cells crawl along.",
      "In the developing frontal-bone region the Atit lab studies, fibronectin is graded low-to-high in the direction of neural crest growth, and the active-movement (actin) biology follows the same gradient.",
      "A gradient of a bound adhesive cue like fibronectin can guide directional cell movement by haptotaxis (following an adhesion gradient), distinct from chemotaxis (following a dissolved chemical gradient).",
      "Fibronectin turns over quickly, on a timescale of hours, so the matrix is continuously remodeled rather than laid down once.",
      "Mapping the fibronectin road shows the cue and its direction but does not by itself measure mechanical force or tension."
    ],
    "unknown": [
      "Whether the fibronectin gradient is actually generating the mechanical tension the cells experience, or whether the tension comes from something else, such as cells being physically squeezed in a narrowing space as they climb over the skull.",
      "The actual stiffness or tension values in this tissue: no direct force number (for example from AFM) has been measured in this system yet, so a stiffness story is inferred, not proven.",
      "Whether elevated nuclear YAP in the high-fibronectin region is caused by fibronectin-driven stiffness specifically, or by other mechanical inputs like spatial confinement.",
      "Exactly how much of the orderly nuclear spacing is set by the fibronectin road versus other simultaneous cues (chemical signals, crowding, cell-cycle timing).",
      "The precise quantitative relationship between local fibronectin density, integrin grip strength, and the speed or direction of an individual cell in this specific tissue."
    ],
    "keyQuestions": [
      "If fibronectin fibers only form when cells pull on them, what should happen to the fiber network, and to nuclear spacing, if I block the myosin motor (for example, lower phospho-myosin light chain) without changing how much fibronectin the cells secrete?",
      "Since fibronectin is graded low-to-high toward the apex, can I test haptotaxis by reversing or flattening that gradient and asking whether the cells lose their directional bias and end up randomly spaced?",
      "High nuclear YAP and high fibronectin overlap in the fast-moving region, but what measurement could separate fibronectin-driven stiffness from simple spatial confinement as the cause, given that an image of the road cannot distinguish them?"
    ]
  },
  {
    "id": "integrin",
    "title": "The integrin link and the cell's engine",
    "summary": "Integrins are the bolts that fasten a cell's internal actin-and-myosin engine to the extracellular matrix outside, so the same machine that contracts inside the cell can grip the matrix and pull the cell forward. This chapter builds the physical chain from matrix to nucleus, shows where phospho-myosin light chain marks the engine actually running, and explains how cells turn force into a gene-regulating signal through YAP/TAZ.",
    "readMinutes": 9,
    "sections": [
      {
        "heading": "Integrins: the bolts through the membrane",
        "paragraphs": [
          "A cell is not floating free. It sits in the extracellular matrix (ECM), the mesh of proteins like fibronectin (FN1) and collagen that fills the space between cells. To do anything with that matrix, to crawl along it or pull on it, a cell needs a physical attachment point that reaches through its own outer membrane. That attachment point is the integrin.",
          "An integrin is a transmembrane protein, meaning it spans the membrane from outside to inside. Integrins come as pairs, one alpha subunit and one beta subunit clipped together, and the pair has two business ends. The outside end grabs a specific short sequence in a matrix protein (for fibronectin, the famous grip site is a three-amino-acid stretch called RGD). The inside end does not touch the actin cytoskeleton directly. Instead it connects through a small stack of adaptor proteins, most importantly talin and vinculin, which act like a coupling that links the integrin's tail to actin filaments.",
          "When many integrins cluster in one spot and load up with these adaptors, the cluster becomes a focal adhesion: a dense, microscope-visible patch where the cell is bolted to its matrix. A focal adhesion is best pictured as a rivet plus a sensor. It is strong enough to transmit pulling force in both directions, and it is wired with proteins that change shape under load, so the cell can feel how hard it is pulling and how hard the matrix pulls back. Outside the membrane, the matrix. Inside, the actin skeleton. The integrin is the bolt that makes them one continuous mechanical system."
        ],
        "terms": [
          "integrin",
          "extracellular matrix (ECM)",
          "fibronectin (FN1)",
          "transmembrane protein",
          "RGD motif",
          "talin",
          "vinculin",
          "focal adhesion"
        ]
      },
      {
        "heading": "The actomyosin engine, and where it is running",
        "paragraphs": [
          "Inside the cell, the force itself comes from actomyosin: actin filaments plus the motor protein myosin II. Picture actin as rope and myosin II as a tiny hand that grabs the rope and pulls. Dr. Atit describes it cleanly: the actin moves only because the heads of myosin are bound to it, and a myosin head can only move the actin after the head docks onto it and takes a step. Bundle many of these motors along many actin ropes and the whole network shortens. That shortening is contraction, the same basic trick a muscle uses, here run by non-muscle myosin II inside an ordinary crawling cell.",
          "The engine has an on-switch. A myosin head can only pull after a phosphate group is added to its regulatory myosin light chain, a step carried out by myosin light chain kinase. So phosphorylated myosin light chain (phospho-MLC) is not just another protein in the picture, it is the signature of the machine actually working. As Dr. Atit puts it, you can chase every intermediate step in the pathway, or you can go straight to the very bottom and ask one question: is the light chain phosphorylated? Where it is phosphorylated is where actin is being actively remodeled and the cell is doing something physical, either moving itself or pushing out projections.",
          "This is exactly why the lab stains for phospho-MLC in tissue sections. It is a read-out of contractile effort, lit up only where cells are straining. Blood vessels, which run their own non-muscle actomyosin, glow as a built-in positive control. The eyelid glows because in that window of development it is contracting hard to close. And in the migrating neural crest cells building the frontal bone, phospho-MLC marks the cells that are hustling. There is an honest catch the lab is candid about: these migrating cells have ragged, octopus-like boundaries, not neat outlines, so the stain reliably marks the nucleus and only patchy bits of the cell edge. The signal is also punctate (scattered dots), which makes it genuinely hard to quantify."
        ],
        "terms": [
          "actomyosin",
          "actin filament",
          "myosin II",
          "non-muscle myosin II",
          "contraction",
          "myosin light chain kinase",
          "phospho-myosin light chain (phospho-MLC)",
          "positive control"
        ]
      },
      {
        "heading": "The molecular clutch: grip plus contraction equals movement",
        "paragraphs": [
          "Now put the two halves together. The actomyosin engine is always trying to pull the actin network inward, toward the cell center. The integrin-talin-actin connection is the coupling that decides whether that pull is wasted or used. Cell biologists call this the molecular clutch, by direct analogy to a car: the engine can rev all it wants, but nothing moves until the clutch engages and connects the engine to the wheels. Here the wheels are the matrix outside.",
          "When the clutch is engaged, the integrins are gripping fibronectin and the talin coupling is holding tight to actin. Myosin pulls the actin inward, and because actin is now bolted to the matrix through the focal adhesion, the cell cannot reel the rope in freely. Two things happen instead. The front of the cell pulls itself forward along the matrix, like a climber hauling on a fixed rope, and the matrix gets pulled backward, the cell tugging the world toward itself. That backward tug on the matrix is called traction force, and it is the literal footprint of a cell pulling on its surroundings. When the clutch slips, integrins let go, and the engine spins with no forward progress.",
          "This clutch is why grip and contraction are two separate ingredients, both required. A cell with a strong engine but no grip goes nowhere. A cell with great grip but a dialed-down engine also goes nowhere, which is precisely the lab's prediction for the mutant: if the cells are slower or stalled, their contractility machinery is turned down, so you should see less phospho-MLC, and that is what the lab observes. It also explains the spacing clue. In the mutant, nuclei are crowded just five to ten microns apart, congested back together, exactly what you would expect if cells stopped pulling themselves apart and spreading out. One caution the game keeps front and center: crowded or orderly spacing is evidence consistent with changed pulling, but spatial organization is not the same thing as tension. Spacing is a picture of where cells ended up, not a direct reading of the force that put them there."
        ],
        "terms": [
          "molecular clutch",
          "traction force",
          "clutch engagement",
          "mutant phenotype",
          "nuclear spacing",
          "congestion"
        ]
      },
      {
        "heading": "Mechanotransduction: turning a pull into a gene-level signal",
        "paragraphs": [
          "Force is not just a thing that moves cells. Cells read force as information and change their behavior in response. Converting a physical force or a stiffness into a biochemical or genetic signal is called mechanotransduction. The focal adhesion is the first reader: proteins like talin physically unfold when stretched, exposing new binding sites, so a harder pull literally changes which proteins can dock. The reading does not stop at the membrane.",
          "A central downstream reader is a pair of partner proteins, YAP and TAZ. When a cell is on a stiff matrix, or is under tension, or is being squeezed into a tight space, YAP/TAZ move out of the cytoplasm and into the nucleus, where they switch on genes tied to growth and survival. When the cell is relaxed, soft-bedded, or has plenty of room, YAP/TAZ stay parked in the cytoplasm and stay quiet. So the location of YAP becomes a cellular force gauge you can actually see: nuclear YAP means high mechanical signaling, cytoplasmic YAP means low. In the lab's frontal-bone data, Kishan found YAP is in the nucleus where the mechanobiology is strong, and it is heavier in the high-movement region than the low one, matching the graded fibronectin and the graded contractility along the same path.",
          "This is where honesty about evidence matters, and the game is built around it. Nuclear YAP and bright phospho-MLC are strong, real read-outs of force-driven biology, but they are consequences of force, not a measured force value. The lab is candid that the source of the stiffness is still open: it could be the fibronectin gradient, or it could be plain crowding, cells squeezing through a narrowing tunnel, with the tunnel itself raising their contractility. Telling those apart, and putting an actual number on the tension, would need a direct mechanical measurement (AFM, Brillouin, or magnetic actuation). Those tools demand the instrument, a trained operator, and someone who can interpret the result, plus tissue the method even works on, and AFM in particular usually only works on dead tissue. None of that is in reach here, which is exactly why, on the Measurement Ladder, spacing and these molecular markers are the honest ceiling and a direct force claim stays locked."
        ],
        "terms": [
          "mechanotransduction",
          "YAP/TAZ",
          "nuclear translocation",
          "matrix stiffness",
          "force gauge",
          "atomic force microscopy (AFM)",
          "Measurement Ladder"
        ]
      }
    ],
    "known": [
      "Integrins are paired (alpha plus beta) transmembrane proteins that bind matrix proteins such as fibronectin outside the cell and connect, through adaptors like talin and vinculin, to the actin cytoskeleton inside.",
      "Clustered, loaded integrins form focal adhesions, the visible rivet-and-sensor patches where a cell is bolted to its matrix.",
      "Force is generated by actomyosin: myosin II motors stepping along actin filaments, and the network contracts when many motors pull together.",
      "A myosin head can only pull after its regulatory light chain is phosphorylated (by myosin light chain kinase), so phospho-MLC marks where the contractile machine is actively running.",
      "The molecular clutch model is well established: contraction produces movement and traction force only when the integrin-actin coupling is engaged with the matrix; a slipping clutch wastes the engine.",
      "YAP/TAZ relocate into the nucleus under higher matrix stiffness, tension, or confinement and stay cytoplasmic when cells are relaxed, making YAP localization a readable indicator of mechanical signaling.",
      "In the lab's frontal-bone system, fibronectin, contractility (phospho-MLC), and nuclear YAP are all graded along the direction of neural crest growth, and the mutant shows reduced phospho-MLC plus congested, closely spaced nuclei."
    ],
    "unknown": [
      "The actual stiffness or tension value in this tissue is not measured; nuclear YAP and phospho-MLC report that force matters but do not give a number.",
      "Whether the driving stiffness comes from the fibronectin gradient itself, from physical crowding as cells squeeze through a narrowing space, or from both, is not yet resolved.",
      "How best to quantify a punctate phospho-MLC signal fairly across control and mutant is unsettled, since it requires normalizing pixel intensity to cell number and area, and the cells have amorphous, hard-to-segment boundaries.",
      "Whether the spacing and marker differences will hold up statistically is still open, because the current data is only one control and one mutant; the lab wants at least four of each before trusting the comparison.",
      "A direct force measurement (AFM, Brillouin, magnetic actuation) is out of reach for this tissue with current resources, so the causal link from matrix grip to ordered bone-building remains inferred, not directly demonstrated."
    ],
    "keyQuestions": [
      "If nuclear YAP and phospho-MLC both rise where fibronectin is high, how could you design a control that tells apart force coming from the fibronectin gradient versus force coming from cells being crowded into a tight space?",
      "Given that phospho-MLC marks active contraction and the mutant shows less of it with congested nuclei, what independent measurement would let you claim the cells actually moved less, rather than just that the marker dimmed?",
      "Talin unfolds under load to expose new binding sites; what experiment could test whether disrupting the integrin-talin coupling, and not the myosin engine itself, is enough to stall these neural crest cells and crowd their spacing?"
    ]
  },
  {
    "id": "remodeling",
    "title": "Remodeling: crosslinkers and cutters",
    "summary": "The matrix is not a finished scaffold but a living material the cells keep editing: enzymes that tie fibers together stiffen and lock the tissue, enzymes that cut links loosen it and open paths, and the running balance between tying and cutting sets how stiff and how open the tissue is at each moment of development.",
    "readMinutes": 9,
    "sections": [
      {
        "heading": "A matrix the cells keep rebuilding",
        "paragraphs": [
          "In earlier chapters you treated the extracellular matrix (ECM), the mesh of protein outside cells, as a road the cells read: fibronectin (FN1) graded low to high, fibers aligned in the direction of growth. That is true, but it leaves out something important. The matrix is not poured once and left alone. The same cells that crawl on it are constantly editing it, adding new fibers, tightening the ones already there, and cutting others away. The mesh you image on day one is not the mesh that is there on day three, even in the same spot.",
          "Two opposite jobs run at the same time. One set of enzymes makes links: they reach into the matrix and tie neighboring fibers together so the mesh holds as one connected sheet instead of loose strands. Another set breaks links: they cut the matrix, snip fibers, and open gaps. Biologists call this whole make-and-break process remodeling. Picture scaffolding around a building where one crew bolts beams together while another crew a few floors up unbolts them. The scaffold stands the whole time, but it is never the same scaffold twice.",
          "Why would a tissue spend energy tying and cutting the same material? Because the cells need different things at different moments. Early on, migrating neural crest cells need the matrix open and soft enough to push through. Later, the tissue that will become bone needs the matrix tied down and stiff enough to hold a shape and carry load. The same neighborhood has to travel from open to locked, and remodeling is how it gets there. Dr. Atit's lab captures exactly this kind of change by imaging more than one time point, because a single snapshot cannot tell you whether a fiber was just laid down or about to be cut."
        ],
        "terms": [
          "extracellular matrix (ECM)",
          "remodeling",
          "crosslink",
          "fibronectin (FN1)"
        ]
      },
      {
        "heading": "Crosslinkers: the enzymes that tie the mesh together",
        "paragraphs": [
          "A crosslink is a chemical bond an enzyme forms between two matrix fibers, or between two points on the same fiber, so they can no longer slide freely past each other. Loose collagen and elastin strands behave like a pile of uncooked spaghetti: they bend and slip. Once an enzyme stitches them together at many points, the same strands behave like a woven basket. The material gets stiffer not because more protein was added but because the protein already there is now tied into a connected network.",
          "The best-studied crosslinker is lysyl oxidase, abbreviated LOX. LOX works on collagen and elastin, the main load-bearing fibers of connective tissue and bone. It chemically alters specific spots on those fibers so that neighboring strands bond covalently, meaning with a strong, hard-to-reverse chemical bond. A second family, the transglutaminases, ties matrix and cell-surface proteins together in a different way, and one relative of theirs, Factor XIII, is the same kind of enzyme that crosslinks a blood clot so it holds. The shared idea is the same: take separate strands and lock them into one stiff, durable network.",
          "Crosslinking is how a tissue commits to a shape. A bone, a tendon, or a healed scar needs its fibers locked so the structure does not slowly creep and deform under its own weight or under muscle pull. In craniofacial development, the frontal bone that the neural crest cells are building has to go from a soft field of cells and loose matrix to a rigid plate. That stiffening is, in large part, fibers being deposited and then crosslinked. A fair caution: the precise map of which crosslinkers act where and when across the developing face is still being filled in, and this lab measures the upstream geometry and movement rather than the crosslink chemistry itself."
        ],
        "terms": [
          "lysyl oxidase (LOX)",
          "transglutaminase",
          "collagen",
          "elastin",
          "covalent bond"
        ]
      },
      {
        "heading": "Cutters: proteases that loosen the matrix and open paths",
        "paragraphs": [
          "The opposite crew is the proteases, enzymes that cut proteins. The most famous family in the matrix is the matrix metalloproteinases, abbreviated MMPs. The word metalloproteinase tells you how they work: each carries a metal ion, usually zinc, in its active site, and uses it to break the bonds holding a protein chain together. Different MMPs are specialized for different targets, with some cutting collagen, some cutting fibronectin or gelatin, and so on. When MMPs are active in a region, the matrix there is being loosened, thinned, or opened.",
          "Cutting is not damage, it is editing with a purpose. A migrating cell facing a dense mesh cannot always shove through; sometimes it has the matrix cut ahead of it to clear a path, the way you might snip threads to widen a hole rather than force your hand through. Cutting also releases signals: some growth factors are stored bound inside the matrix, and slicing the matrix frees them to act. So a protease does two things at once, it opens space and it can ring a bell.",
          "This is not abstract for palate development. When the two palatal shelves finally meet at the midline, the thin epithelial seam between them has to disappear so the two halves become one continuous roof. The signaling protein TGF-beta3 turns on in those edge cells and, among other effects, drives up matrix metalloproteinases there. The MMPs help break down the seam and its surrounding matrix. Note this picture is still being worked out: recent live imaging suggests the seam is removed mainly by the edge cells actively contracting, converging, and being squeezed out (extrusion), with MMPs, EMT, and apoptosis as partners rather than the sole cause. When that program fails, the shelves can grow, lift, and touch but still not join, which is one route to a cleft palate. Cells also keep cutting in check: they make inhibitor proteins (the TIMPs, tissue inhibitors of metalloproteinases) that switch MMPs off, so cutting stays local and timed rather than runaway."
        ],
        "terms": [
          "protease",
          "matrix metalloproteinase (MMP)",
          "TGF-beta3",
          "medial edge epithelium (MEE)",
          "TIMP"
        ]
      },
      {
        "heading": "The balance is the control knob, and it moves",
        "paragraphs": [
          "Here is the key idea to carry out of this chapter: stiffness and openness are not fixed properties of a tissue, they are the running balance between tying and cutting. If crosslinkers outpace cutters, links accumulate, the mesh connects up, and the tissue stiffens and closes. If cutters outpace crosslinkers, links are lost faster than they form, and the tissue softens and opens. The tissue sits wherever that tug-of-war currently rests, and the cells set the balance by choosing how much of each enzyme to make and where.",
          "And the balance moves on purpose as development proceeds. A region that needs to stay open for migrating cells keeps cutting high and tying low. Later, when that same region needs to harden into bone or hold a fused seam shut, the cells flip the ratio: crosslinking up, cutting down. So a single location can be soft and open at one stage and stiff and locked at a later stage, with no new tissue moving in, just the make-or-break ratio rewritten. This is why one snapshot is misleading, and why the lab images several time points to read the direction of change.",
          "Connect this back to the Measurement Ladder. Remodeling is part of what makes a tissue stiff, but stiffness is a force property, and you have seen that force sits high on the ladder, behind tools the classroom does not have. Seeing where crosslinkers and cutters are active (by staining for the enzymes or their cut products) is still a description of ECM architecture, the kind of map you can honestly make from an image. It strongly suggests where the tissue is being stiffened or loosened, but suggesting is not the same as a measured stiffness number. Keep the line sharp: spatial organization is not the same thing as tension. A map of where the matrix is being tied and cut is a map of the road being rebuilt, not a reading of the force in it."
        ],
        "terms": [
          "balance of remodeling",
          "stiffness",
          "Measurement Ladder",
          "ECM architecture"
        ]
      }
    ],
    "known": [
      "The ECM is dynamic: cells continuously add, crosslink, and cut matrix throughout development rather than building it once.",
      "Crosslinking enzymes such as lysyl oxidase (LOX) bond collagen and elastin fibers together, which stiffens connective tissue; transglutaminases are a second crosslinking family (Factor XIII, the clot-stabilizing enzyme, is a relative).",
      "Matrix metalloproteinases (MMPs) are zinc-dependent proteases that cut matrix proteins, loosening the mesh, opening migration paths, and releasing matrix-bound signals; their activity is held in check by inhibitors called TIMPs.",
      "In secondary palate fusion, TGF-beta3 turns on in the medial edge epithelium and drives MMP up-regulation that helps dissolve the midline seam; failure of this last step can leave touching shelves unfused (a cleft palate).",
      "The net stiffness and openness of a tissue reflect the running balance between link-making and link-breaking, and cells shift that balance deliberately as development proceeds (open and soft for migration, then crosslinked and stiff for bone or a sealed seam)."
    ],
    "unknown": [
      "The precise spatial and temporal map of which crosslinkers and which MMPs act where in the developing human face is still incomplete; the Atit lab measures upstream geometry and movement (spacing, FN1, phospho-myosin) rather than the crosslink chemistry directly.",
      "How much of the stiffening that mechanosensors like YAP appear to respond to comes from crosslinking of the matrix versus from physical crowding of cells in a tight space is not yet resolved (Dr. Atit notes the stiffness signal could be from fibronectin, from confinement, or from neither alone).",
      "Mapping where crosslinkers and cutters are active does not by itself yield a force or stiffness number; whether the inferred stiffening matches a real measured value would still require tissue-mechanics tools (AFM, Brillouin) that are not available for this system.",
      "It is not established for craniofacial bone exactly how the make-versus-break ratio is timed at the molecular level, that is, what tells a given region to switch from cutting-dominated (open) to crosslinking-dominated (locked) at the right moment."
    ],
    "keyQuestions": [
      "If I stain the same palate region at two time points and find MMP activity high early and crosslinker activity high later, can I claim the tissue stiffened, or only that the make-versus-break balance shifted, and what would I still need to measure to say stiffness changed?",
      "In a mutant where neural crest cells are congested and barely migrating, would I expect more cutting (to clear blocked paths) or more crosslinking (premature locking), and how could staining for MMPs versus LOX products help me tell which scenario I am looking at?",
      "TGF-beta3 loss leaves palatal shelves that touch but never fuse; if MMP-driven cutting normally dissolves the seam, what direct evidence would distinguish 'the cutters were never switched on' from 'the cutters were on but blocked by their TIMP inhibitors'?"
    ]
  },
  {
    "id": "mechanics",
    "title": "Porosity, tension, and teamwork",
    "summary": "The physical environment is not just scenery for migrating cells: pore size, stiffness, and confinement actively steer where cells go and how hard they pull, and the pulling itself becomes a signal that keeps a whole group moving in one direction. Mechanics, in other words, is information, not just force.",
    "readMinutes": 9,
    "sections": [
      {
        "heading": "The squeeze test: pore size gates who gets through",
        "paragraphs": [
          "When cranial neural crest cells migrate into the face to build the bones around the eye and forehead, they are not crawling across an open floor. They are pushing through a crowded mesh of extracellular matrix, the protein scaffolding (fibronectin, collagen, and others) that fills the space between cells. That mesh has gaps, and the gaps have sizes. A migrating cell can ooze its soft cytoplasm through a surprisingly small opening, but it carries one part that does not squish easily: the nucleus. The nucleus is the stiffest, bulkiest object in the cell, so the real question at any narrow gap is whether the nucleus can deform enough to fit.",
          "This makes pore size a gate. Above a certain opening, cells slip through with little trouble. Below it, the nucleus has to be physically squeezed into a narrower, longer shape, which is slow and which the cell can actively resist or assist. Studies of cells in engineered channels and gels show a rough threshold: when pores shrink to a few microns across, smaller than the resting nucleus, migration slows sharply or stops, because the nucleus becomes the rate-limiting part. The cell can help by using its internal motor system to pull the nucleus through, and by loosening the nuclear envelope, but there is a floor below which the gap simply wins.",
          "This connects directly to what Dr. Atit described in the lab. Early in the migration, the cells have plenty of room. As they travel up and over the brow toward the apex of the head, the space they can move between becomes physically limiting, like a narrowing tunnel. That narrowing is not a metaphor: it is a real change in the geometry of the tissue the cells must thread through, and geometry has consequences for who arrives, how fast, and in what order. A block of face that needs cells delivered on schedule is sensitive to whether the road stayed wide enough.",
          "Be honest about the limit of the evidence here. Pore-size gating and nuclear deformation are well established from cells grown in controlled artificial environments. Measuring the actual pore sizes inside a living embryonic face, in the exact region and hour that matter, is much harder and is not something you can read off a single stained image. The lab can see that the cells become congested in a tighter space; the precise pore dimensions are an inference, not a direct measurement."
        ],
        "terms": [
          "extracellular matrix (ECM)",
          "fibronectin",
          "pore size",
          "nucleus",
          "nuclear deformation",
          "rate-limiting step",
          "cranial neural crest cells"
        ]
      },
      {
        "heading": "Durotaxis: cells read stiffness and walk uphill toward firmer ground",
        "paragraphs": [
          "Cells do more than fit through gaps; they feel the ground and choose their direction by how stiff it is. A migrating cell grips its surroundings using adhesions, then tugs. On soft material the tug meets little resistance and the grip stays weak and short-lived. On stiffer material the same tug meets resistance, the grip strengthens and matures, and the cell builds more pulling machinery on that side. The net effect is that many cell types tend to crawl from softer toward stiffer regions. This biased migration up a stiffness gradient is called durotaxis, from the Latin for hardness.",
          "Why would stiffness vary across a developing face at all? One reason is the matrix itself. Fibronectin, the matrix protein the Atit lab stains for, is laid down in a gradient: low at the eyebrow, high toward the apex of the head, rising in the very direction the cells are traveling. The lab found that the movement biology runs in the same direction as that fibronectin gradient, and that the actin, the protein that builds a cell's pulling and crawling machinery, is graded the same way. A matrix that is denser or differently organized at one end can present a stiffer, grippier surface at that end, giving the cells a directional cue without anyone posting a sign.",
          "The lab has a second, independent readout that something mechanical is being sensed: YAP. YAP is a protein that acts as a mechanosensor, a molecular instrument that reports the physical state of a cell's surroundings. When a cell sits on stiff, high-tension ground and pulls hard, YAP moves into the nucleus and switches on genes; on soft, slack ground it stays out of the nucleus and stays quiet. The lab observed YAP in the nucleus and heavier in exactly the region where movement is strong. That is a fingerprint of cells experiencing and responding to mechanical cues, consistent with a stiffness story.",
          "Here is the honest caveat, and it is the same one the lab is wrestling with. A fibronectin gradient and nuclear YAP strongly suggest a stiffness gradient, but they do not measure stiffness. The cue could come from fibronectin, or it could come from something else entirely, such as the confinement described next. To actually claim a stiffness gradient you would need a direct mechanical measurement, and those tools, like atomic force microscopy, often work only on dead tissue, need expensive hardware, and need a trained operator and a separate interpreter. The lab does not have that chain of people and machines, which is precisely why a force claim stays out of reach for now."
        ],
        "terms": [
          "durotaxis",
          "stiffness gradient",
          "cell adhesion",
          "traction",
          "actin",
          "YAP",
          "mechanosensor",
          "atomic force microscopy (AFM)"
        ]
      },
      {
        "heading": "Confinement and contractility: a tight tunnel makes a cell pull harder",
        "paragraphs": [
          "Squeezing a cell does not only slow it down. Confinement can change how the cell behaves, and one of the most important changes is that a confined cell often becomes more contractile, meaning it generates more internal pulling force. The lab put this plainly: when the cells get up and over the brow into a constrained space, like a tunnel, that constraint can increase their contractility. To move through the tunnel they have to hustle with their feet, and when their feet are activated you can see the molecular signature of that pulling.",
          "That signature is phospho-myosin light chain. Here is the chain of logic, from the bottom of the pathway up. A cell crawls and contracts using actin filaments that are pulled by myosin motors. A myosin head can only move actin when it has been switched on, and the switch is a phosphate group added by a kinase. So the phosphorylated, switched-on form of the myosin light chain machinery is present only where the actomyosin engine is actively running. Stain for that phosphorylated form and you are looking at a map of where cells are actively contracting and moving, not just where cells happen to be sitting.",
          "This is why the mutant result is so telling. In the lab's mutant, the cells are slower and not migrating well, so their contractility machinery is turned down, and indeed the phospho-myosin signal is weaker and less distinctive than in the control. At the same time the nuclei are congested, packed back together with only about five to ten microns between them instead of the larger pockets seen in the control. Less pulling and tighter packing fit one story: cells that cannot contract properly cannot migrate properly, so they pile up instead of spreading out.",
          "Notice what confinement gives us conceptually. The physical environment is not a passive container that cells move through. A tunnel is an instruction: it raises the cell's contractility, which changes the molecular program the cell runs, which you can then read out as a stain. The squeeze and the pull are linked, and both are downstream of geometry the embryo built."
        ],
        "terms": [
          "confinement",
          "contractility",
          "phospho-myosin light chain",
          "myosin",
          "kinase",
          "phosphorylation",
          "actomyosin",
          "nuclear spacing",
          "congestion"
        ]
      },
      {
        "heading": "Tension as teamwork: cells pull their neighbors and move as one",
        "paragraphs": [
          "So far each cell has been treated as a soloist reading its environment. But cells in a migrating sheet or stream are physically connected to their neighbors, and those connections turn private pulling into shared information. When one cell contracts, it does not only move itself; it tugs on the cells attached to it. Those neighbors feel the tug as tension, and tension is a fast, long-reach signal. A chemical cue has to be made, released, and diffused, which takes time. A mechanical pull travels through the cell-to-cell and cell-to-matrix links almost instantly and can be felt many cell-widths away.",
          "This is how a group keeps a shared direction. Leader cells at the front generate strong pulling and put the tissue behind them under tension. Follower cells sense that tension through their junctions and align their own pulling and crawling to it, so the whole population leans the same way rather than each cell wandering off on its own. The matrix participates too: as cells pull on fibronectin and collagen they stretch and align the fibers, leaving a more organized, grippier track that the next cells follow. The team is coordinated not by a manager but by a web of forces every member can feel.",
          "This is the deepest meaning of the chapter's title and of the pinned idea from the lab portal: spatial organization is not the same thing as tension. You can measure where cells end up, their spacing and geometry, from a single image, for free. That tells you the outcome of coordination. It does not tell you the force that produced it. A neatly spaced population is consistent with a tension story, but it is also consistent with cells simply having room, or with growth pushing them apart. Tension is the proposed mechanism; spacing is the visible result. Confusing the two is the exact error the Measurement Ladder is built to prevent.",
          "That is also why the honest ceiling for this work sits low on the ladder. Describing spacing and matrix architecture is free and image-based. Claiming directional migration needs time-lapse movies across several embryonic days, which the lab does by comparing time points. Claiming the force itself, the tension between cells or the stiffness of the tissue, needs instruments, operators, and interpreters that most labs, including this one, do not have. The science here is strong precisely because it does not overclaim: it shows a fibronectin road, graded actin, nuclear YAP, and confinement-linked contractility, and then stops at the line where a real force measurement would be required."
        ],
        "terms": [
          "tension",
          "mechanical signaling",
          "collective migration",
          "leader cells",
          "follower cells",
          "cell junctions",
          "fiber alignment",
          "Measurement Ladder",
          "spatial organization versus tension"
        ]
      }
    ],
    "known": [
      "A cell can squeeze its soft cytoplasm through small openings, but the stiff nucleus is the bulkiest part, so nuclear deformation is the rate-limiting step when pores get small (a few microns or below), and pore size therefore gates migration.",
      "Many cell types perform durotaxis: they grip, tug, and bias their movement from softer toward stiffer regions, because stronger resistance stabilizes their adhesions and pulling machinery.",
      "Fibronectin is laid down as a low-to-high gradient running in the direction the cranial neural crest cells travel (eyebrow toward apex), and in the Atit lab the actin and the movement biology are graded the same way.",
      "YAP is a mechanosensor that enters the nucleus when a cell experiences stiff, high-tension surroundings; the lab sees nuclear, 'heavier' YAP exactly where movement is strong.",
      "Confinement (a constrained tunnel-like space) can raise a cell's contractility, and active contraction is read out by staining for phospho-myosin light chain, the switched-on form at the bottom of the actomyosin pulling pathway.",
      "In the lab's mutant, weaker phospho-myosin signal accompanies congested nuclei spaced only about 5 to 10 microns apart, consistent with cells that cannot contract well, cannot migrate well, and pile up.",
      "Cells in a migrating group are physically linked, so one cell's contraction tugs its neighbors; tension travels fast and far through junctions and matrix and coordinates a shared direction (leader and follower cells), while pulling on the matrix aligns fibers into a track.",
      "Spatial organization (spacing, geometry) can be measured for free from a single image, but it is the outcome of coordination, not a measurement of the force that produced it: 'spatial organization is not the same thing as tension.'"
    ],
    "unknown": [
      "The actual pore sizes inside the living embryonic face, in the exact region and developmental hour the cells migrate, have not been directly measured; congestion is observed but the pore dimensions are inferred.",
      "Whether a true stiffness gradient exists is not yet measured. Nuclear YAP and the fibronectin gradient strongly suggest one, but the directional cue could come from fibronectin, from confinement, from both, or from something else entirely.",
      "A direct force or tension number is out of reach for this lab: the tools (AFM, Brillouin, magnetic actuation) need expensive hardware, often work only on dead tissue, and require both a trained operator and a separate interpreter, a chain the lab does not have.",
      "How much of the observed cell behavior is driven by the matrix cue (fibronectin and stiffness) versus by mechanical confinement (the tunnel) has not been separated; the two explanations are currently tangled together.",
      "The mechanism is supported so far by one control and one mutant; the lab needs at least four of each, with signal normalized to cell number and area, before the contractility difference can be claimed quantitatively."
    ],
    "keyQuestions": [
      "If we could engineer matrix channels of different widths around these cells, at what pore size does nuclear deformation start to slow migration, and does that threshold match the nuclear spacing seen in the congested mutant?",
      "The lab sees a fibronectin gradient, graded actin, and nuclear YAP together. Which experiment would actually separate a stiffness cue from a confinement cue, given that both can raise contractility and both are consistent with the same staining?",
      "Spacing is the free, honest measurement and tension is the proposed mechanism. What would count as direct evidence that neighbor-to-neighbor tension (not just having room, or growth pushing cells apart) is what coordinates this population's direction?"
    ]
  },
  {
    "id": "measuring",
    "title": "From biology to a measurable question",
    "summary": "This chapter shows how the lab turns living craniofacial tissue into honest numbers: segment nuclei, take their centers, build Voronoi territories, and measure nearest-neighbor spacing as a readout of how cells are organized. It then draws the line that the whole game depends on: a spacing measurement describes organization, and organization is not the same thing as force, so a number about layout cannot by itself license a claim about tension.",
    "readMinutes": 9,
    "sections": [
      {
        "heading": "From a picture of cells to a number you can defend",
        "paragraphs": [
          "A microscope image of an embryo is beautiful, but a picture is not data. To compare a healthy embryo (the control) with a mutant, you need numbers that mean the same thing every time. The lab gets those numbers in four steps. First, segmentation: a tool such as Cellpose draws an outline around each cell nucleus, turning a gray cloud of pixels into a list of separate objects. Second, the centroid: for each nucleus you take its center point, its single (x, y) coordinate. A messy blob becomes one clean dot. Now the whole tissue is a field of dots, and dots are something math can chew on.",
          "Third, you build Voronoi territories. Imagine every nucleus claiming all the space that is closer to it than to any other nucleus. The result is a mosaic of polygons, one tile per cell, like a stained-glass map of who owns what. Tightly packed cells get small tiles; spread-out cells get big tiles. Fourth, you measure nearest-neighbor spacing: for each nucleus, how far away is its closest neighbor? Average that over the tissue and you have a single, comparable readout of how crowded or how spread the cells are.",
          "Why bother with centers and tiles instead of just eyeballing it? Because the cells the lab studies have, in Dr. Atit's words, amorphous boundaries, like little octopi with many tentacles, not neat squares like an ectoderm cell. You often cannot trust the cell outline, but you can trust the nucleus. So the nucleus center becomes the honest anchor, and spacing between centers becomes the honest measurement. This is also why counting matters: if the mutant simply has fewer cells, any signal must be normalized to cell number and area before you compare, or you will fool yourself."
        ],
        "terms": [
          "segmentation",
          "Cellpose",
          "centroid",
          "Voronoi diagram",
          "nearest-neighbor spacing",
          "control vs mutant",
          "normalization"
        ]
      },
      {
        "heading": "What the spacing number actually told the lab",
        "paragraphs": [
          "In the lab's own data, the control tissue showed small, regular pockets between nuclei, while the mutant nuclei were squeezed together, only about five to ten microns apart. The lab's phrase for the mutant was blunt: congested, back together, congestion. Spacing went down. That is a real, repeatable difference you can put a number on, and it fits a story: in the mutant, the cells are slower or not migrating, so they pile up instead of spreading out along their path.",
          "Here is the discipline the game is built to teach. A smaller spacing number is strong evidence that the cells are organized differently. It is not, by itself, evidence about why. Congestion could mean the cells failed to migrate. It could also mean they migrated fine but the space they were moving into got narrower, like a crowd bunching up where a hallway tightens. The measurement of layout is the same in both cases. The cause is not.",
          "There is a second trap hiding in the same number, and the game names it directly: pseudoreplication. If you pool every single cell from one embryo and treat each cell as an independent data point, a few hundred cells can make almost any difference look statistically overwhelming. But the cells inside one embryo are not independent of each other; they share that embryo's biology. The honest unit of replication is the embryo, not the cell. That is exactly why Dr. Atit insists on at least four controls and four mutants, not one of each. One embryo is a snapshot; four lets you ask whether the pattern is real."
        ],
        "terms": [
          "microns",
          "congestion",
          "migration",
          "pseudoreplication",
          "replicate (n)",
          "independent data point",
          "statistical significance"
        ]
      },
      {
        "heading": "The Measurement Ladder: five rungs, and the one you can afford",
        "paragraphs": [
          "The game organizes every possible experiment onto a Measurement Ladder, five rungs that climb from easy-and-descriptive to hard-and-mechanical. Rung 1 is spatial layout: Cellpose, Voronoi, nearest-neighbor. It is free and it describes where cells sit. Rung 2 is ECM architecture: stain the extracellular matrix protein fibronectin (FN1) and trace its fibers. The lab sees FN1 graded from low to high in the direction the cells are growing, from the eyebrow region up toward the apex of the head, so you can map the road the cells travel. Rung 3 is migration dynamics: live imaging across developmental days plus strain maps, which needs time-lapse, not a single snapshot, and costs imaging you may not have.",
          "Rung 4 is molecular force: FRET tension sensors that report the pull between individual molecules, which needs transgenic reporters and subcellular live microscopy. Rung 5 is tissue mechanics: a direct stiffness or tension number from instruments like AFM (atomic force microscopy), Brillouin microscopy, or magnetic actuation. Rungs 4 and 5 are locked, and not as an arbitrary game rule. Dr. Atit laid out the real decision tree: a direct force measurement needs the instrument, a human trained to run it, and a separate human who can interpret what comes out, plus tissue the method even works on. AFM is usually limited to dead tissue; most magnetic-actuation tools never became routine for living tissue. The lab, in his words, has no hardware, software, humans, or machines for it, dead or alive.",
          "The key idea is that each rung licenses only a certain kind of claim. Stand on Rung 1 and you may say cells are non-randomly spaced. You may not say FN1 generates mechanical tension, because you never measured force. The ladder is a promise you make to yourself: do not claim a rung you did not climb. The lab does have supporting clues higher up, fibronectin is graded, phospho-myosin light chain (a marker that lights up where cells are actively contracting and remodeling actin) is graded the same way, and YAP, a mechanosensing protein, moves into the nucleus more where the movement is strongest. Those are consistent with a force story. They are not a force measurement."
        ],
        "terms": [
          "Measurement Ladder",
          "fibronectin (FN1)",
          "extracellular matrix (ECM)",
          "FRET tension sensor",
          "AFM (atomic force microscopy)",
          "Brillouin microscopy",
          "phospho-myosin light chain",
          "YAP",
          "mechanosensing"
        ]
      },
      {
        "heading": "Known, unknown, and the gap where your question lives",
        "paragraphs": [
          "So draw the line clearly. The pinned rule of the whole game is: spatial organization is not the same thing as tension. Spacing is a geometry measurement. Tension is a force measurement. They can be correlated, and in this tissue they probably are, but correlation is not causation. The reduced spacing in the mutant is real. The leap from there is the part you have to earn, and mostly cannot, at the bottom of the ladder.",
          "The honest open question is causal, and Dr. Atit states both sides himself. The cells climb into a region of high fibronectin and high contractility. Does the FN1 gradient cause the stiffness and direct the migration? Maybe. Or maybe FN1 has nothing to do with it, and the cause is purely geometric: as the cells move up and over the head, the space they can move through gets physically narrower, like a tunnel, and squeezing through a tunnel raises their contractility on its own. Both stories predict the same FN1 staining and the same crowded nuclei. A spacing measurement cannot tell them apart.",
          "That gap is not a failure of the project. It is the project. A good scientist names exactly what the available measurement can and cannot decide, then designs the sharpest question that the honest tools can actually answer. The game wants you to do the same thing: pick a question you can test from where you are standing on the ladder, state what result would prove you wrong, and refuse to smuggle in a force claim you have no instrument to back. That refusal, more than any fancy machine, is what makes it science rather than magic."
        ],
        "terms": [
          "correlation vs causation",
          "geometric confinement",
          "causal question",
          "falsifiability",
          "honest ceiling",
          "claim licensing"
        ]
      }
    ],
    "known": [
      "A microscope image is not data; to compare embryos you need numbers that mean the same thing every time.",
      "Segmentation (e.g., Cellpose) outlines each nucleus, and taking each nucleus's centroid turns the tissue into a clean field of points.",
      "The cells of interest have amorphous, octopus-like boundaries, so the nucleus center is a more trustworthy anchor than the cell outline.",
      "A Voronoi diagram assigns each nucleus the territory closest to it; nearest-neighbor spacing summarizes how crowded or spread the cells are in one number.",
      "In the lab's data, mutant nuclei were congested, roughly 5 to 10 microns apart, versus more regular small pockets in the control: spacing went down in the mutant.",
      "Signal must be normalized to cell number and area, because fewer cells would change a raw intensity measurement on its own.",
      "The honest unit of replication is the embryo, not the individual cell; Dr. Atit requires at least four controls and four mutants, and a single embryo is only a snapshot.",
      "Fibronectin (FN1) is graded low to high in the direction of growth; phospho-myosin light chain (marking active contraction) is graded the same way; and YAP (a mechanosensor) is more nuclear where movement is strongest.",
      "Direct force or stiffness measurement (AFM, Brillouin, FRET, magnetic actuation) requires the instrument, a trained operator, an interpreter, and compatible (often dead) tissue, none of which the lab has, so spacing is the honest ceiling.",
      "Spatial organization is not the same thing as tension: spacing is geometry, tension is force."
    ],
    "unknown": [
      "Whether the reduced spacing in the mutant is caused by failed cell migration, or by something else that merely crowds the cells together.",
      "Whether the apparent stiffness/tension biology comes from the FN1 gradient itself, or has nothing to do with FN1.",
      "Whether the increased contractility is driven by the matrix (FN1) or simply by geometric confinement: cells being squeezed through a narrowing, tunnel-like space.",
      "Whether the FN1 gradient causes directional migration, or only correlates with it (correlation versus causation is unresolved at the bottom of the ladder).",
      "What the actual force or stiffness numbers are, since no direct tissue-mechanics measurement was made.",
      "Whether the single-embryo result holds up once four controls and four mutants are quantified (the n is currently too small to confirm)."
    ],
    "keyQuestions": [
      "If I only have a nearest-neighbor spacing number, what is the strongest claim I can honestly make, and which claim would I be smuggling in if I said FN1 'generates tension'?",
      "Given that crowded nuclei could come from failed migration OR from a narrowing, tunnel-like space, what additional measurement (and on which rung of the ladder) would let me distinguish those two causes?",
      "If pooling hundreds of cells from one embryo makes the spacing difference look overwhelming but the per-embryo n is only one control and one mutant, is the result trustworthy yet, and how many embryos would I need to defend it?"
    ],
    "figure": "spacing"
  }
]

export interface LibraryExtension {
  title: string
  url: string
}

/** "Extensions": optional deeper-dive NotebookLM notebooks. External links that
 *  open in a new tab; not part of the gated chapter progression. */
export const EXTENSIONS: LibraryExtension[] = [
  { title: 'Embryonic genesis of the Frontal Bone', url: 'https://notebooklm.google.com/notebook/31d15429-58e5-44e1-b99b-d216dd74def4' },
  { title: 'WNT Signalling', url: 'https://notebooklm.google.com/notebook/ad6306b8-1df2-4e5f-812b-8a83b0bc7299' },
  { title: 'Actin Myosin', url: 'https://notebooklm.google.com/notebook/4aab122d-a063-4946-b4dc-6b830c91232f' },
  { title: 'Architectures of the cell', url: 'https://notebooklm.google.com/notebook/4bfc6e58-d5a6-4065-b437-32dd3e702738' },
  { title: 'Mechanochemical Bridge', url: 'https://notebooklm.google.com/notebook/ce5ffdad-f24c-4f10-a198-629139d40f60' },
  { title: 'Mechanisms of cellular ECM', url: 'https://notebooklm.google.com/notebook/ce5ffdad-f24c-4f10-a198-629139d40f60' },
  { title: 'Mechanobiology', url: 'https://notebooklm.google.com/notebook/1b3befbb-e895-4afe-97c8-7bf529527267' },
  { title: 'Cellular Geometry', url: 'https://notebooklm.google.com/notebook/aa3e52a5-2f4e-4abb-80e3-b098da854894' },
  { title: 'Lexicon', url: 'https://notebooklm.google.com/notebook/4a16f255-a92a-4456-89f7-bb0d8b83b509' },
  { title: 'Can You Explain?', url: 'https://notebooklm.google.com/notebook/4a16f255-a92a-4456-89f7-bb0d8b83b509' },
]

/** Act II "Differentiate" study notebooks (created in NotebookLM). These go live
 *  for students once each notebook's share setting is set to anyone-with-the-link. */
export const EXTENSIONS_DIFFERENTIATE: LibraryExtension[] = [
  { title: 'YAP, TAZ, and Mechanotransduction', url: 'https://notebooklm.google.com/notebook/ba5490c7-08ec-4539-be9a-64985bf52579' },
  { title: 'The Bone or Cartilage Fate Switch', url: 'https://notebooklm.google.com/notebook/6d33f9f3-b88d-4890-b672-29b721c2a916' },
  { title: 'Substrate Stiffness and Cell Shape', url: 'https://notebooklm.google.com/notebook/878b6d81-81eb-4fb3-a87a-043acb60ba56' },
  { title: 'The Force Chain: Integrin to Nucleus', url: 'https://notebooklm.google.com/notebook/8f8cc0f4-0ec7-46ba-82d3-37e17a9526fc' },
  { title: 'Differentiate Lexicon', url: 'https://notebooklm.google.com/notebook/9349b6b1-6e83-4e3e-8857-b0edf4b2615e' },
]

/** Act III "Derail" study notebooks (created in NotebookLM). Each has a full
 *  Studio suite (study guide, mind map, flashcards, quiz, data table, and a
 *  slide deck where the daily quota allowed). These go live for students once
 *  each notebook's share setting is set to anyone-with-the-link. */
export const EXTENSIONS_DERAIL: LibraryExtension[] = [
  { title: 'The Toolkit Hijack: Development in Cancer', url: 'https://notebooklm.google.com/notebook/475c4ff4-f718-4abb-b636-1c4e4dfa5fb5' },
  { title: 'Genetic Drivers: Stuck Pedals and Broken Brakes', url: 'https://notebooklm.google.com/notebook/40045656-270f-4eeb-bb48-bc9f93f0683e' },
  { title: 'The Pancreatic Fortress: KRAS and the Stroma', url: 'https://notebooklm.google.com/notebook/a1e25f6c-f1c1-4135-9438-806ca30125f1' },
  { title: 'The Immune Arsenal: Cancer Immunotherapy', url: 'https://notebooklm.google.com/notebook/a111598f-4e73-4e3f-bf6d-b0ee354bfe4d' },
  { title: 'The Frontier of Metastasis and Precision Oncology', url: 'https://notebooklm.google.com/notebook/b5d93b6c-fa4e-49f7-8d3e-52ae76ea5ba6' },
  { title: 'Derail Lexicon', url: 'https://notebooklm.google.com/notebook/fc27cdfa-7817-4283-97d4-2bd4b65d6bca' },
]

/** Extensions grouped by act, for the Library shelf. */
export const EXTENSION_GROUPS: { label: string; items: LibraryExtension[] }[] = [
  { label: 'Act I · Develop', items: EXTENSIONS },
  { label: 'Act II · Differentiate', items: EXTENSIONS_DIFFERENTIATE },
  { label: 'Act III · Derail', items: EXTENSIONS_DERAIL },
]

export function chapterById(id: string): LibraryChapter | undefined {
  return LIBRARY.find((c) => c.id === id)
}
