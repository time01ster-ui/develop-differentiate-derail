// The John Hay Biomedical Pathway seals (brand marks). Used subtly but
// recognizably throughout: the round pathway seal is the primary mark; the JH
// monogram is a tiny corner mark; each act also carries its closest PLTW course
// seal (Act III "Derail" -> Medical Interventions, whose Unit 3 is cancer).

import type { CSSProperties } from 'react'
import type { ActId } from '../content/types'
import { asset } from '../lib/asset'

const SRC = {
  pathway: '/brand/pathway-seal.webp',
  pathwayWide: '/brand/pathway-seal-wide.webp',
  jh: '/brand/jh-monogram.webp',
  hbs: '/brand/hbs-seal.webp',
  bi: '/brand/bi-seal.webp',
  mi: '/brand/mi-seal.webp',
} as const

export type SealKind = keyof typeof SRC

const TITLE: Record<SealKind, string> = {
  pathway: 'John Hay Biomedical Pathway',
  pathwayWide: 'John Hay Biomedical Pathway',
  jh: 'John Hay',
  hbs: 'PLTW Human Body Systems',
  bi: 'PLTW Biomedical Innovations',
  mi: 'PLTW Medical Interventions',
}

/** Each act's closest PLTW course seal. Act III maps to Medical Interventions
 *  (MI Unit 3 is "How to Conquer Cancer"); the others are the nearest fit. */
export const ACT_COURSE_SEAL: Record<ActId, SealKind> = {
  develop: 'hbs',
  differentiate: 'bi',
  derail: 'mi',
}

/** A brand seal image. `size` is the width in px (height auto); the wide seal is
 *  not square, so pass a larger width for it. `opacity` lets it sit as a faint
 *  watermark. Decorative by default (empty alt) so it does not clutter a11y. */
export function Seal({
  kind = 'pathway',
  size = 32,
  opacity = 1,
  decorative = true,
  style,
}: {
  kind?: SealKind
  size?: number
  opacity?: number
  decorative?: boolean
  style?: CSSProperties
}) {
  return (
    <img
      src={asset(SRC[kind])}
      alt={decorative ? '' : TITLE[kind]}
      title={TITLE[kind]}
      aria-hidden={decorative || undefined}
      loading="lazy"
      decoding="async"
      style={{ width: size, height: 'auto', opacity, display: 'block', flex: 'none', ...style }}
    />
  )
}
