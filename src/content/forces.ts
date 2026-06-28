// The five fundamental forces that run through all three acts. This is the
// connective spine: the SAME forces build the face (Develop), specialize each
// cell (Differentiate), and are hijacked by a tumor (Derail). The persistent
// rail shows these identically in every act so the trilogy reads as one story.

export interface Force {
  id: string
  name: string
  gloss: string
}

export const FORCES: Force[] = [
  { id: 'spatial', name: 'Spatial organization', gloss: 'Where cells sit and how evenly they are spaced.' },
  { id: 'adhesion', name: 'Adhesion', gloss: 'Integrins grip the matrix and bolt it to the cell.' },
  { id: 'contractility', name: 'Contractility', gloss: 'Actin and myosin pull. The cell’s engine.' },
  { id: 'ecm', name: 'The matrix road', gloss: 'Fibronectin the cell reads, follows, and rebuilds.' },
  { id: 'mechano', name: 'Mechanotransduction', gloss: 'Force becomes gene activity through YAP and TAZ.' },
]
