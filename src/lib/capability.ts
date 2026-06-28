// Runtime capability detection → a default fidelity tier (TOOLING.md §3.2).
// Rule: DEFAULT DOWN when uncertain. The visible Quality switch is the real
// mitigation for misreporting Chromebooks, so this only needs to be a sane start.

export type Tier = 'A' | 'B' | 'C'

export const TIER_LABEL: Record<Tier, string> = {
  A: 'LITE',
  B: 'STANDARD',
  C: 'FULL',
}

export const TIER_FULLNAME: Record<Tier, string> = {
  A: 'Tier A — Lite',
  B: 'Tier B — Standard',
  C: 'Tier C — Full',
}

/** Plain-language "what is this mode for," shown as the Quality tooltip so the
 *  switch is self-explaining (the reviewer's guess "one is for a Chromebook" was right). */
export const TIER_HELP: Record<Tier, string> = {
  A: 'Lite: minimal animation, no live 3D. Fastest, best for Chromebooks or older devices.',
  B: 'Standard: balanced visuals with live 3D. A good default for most laptops.',
  C: 'Full: all animations and the richest 3D. Best on a fast laptop or desktop.',
}

/** Live Mol* / heavier 3D is only allowed on Standard and Full. */
export function tierAllowsLiveMol(t: Tier): boolean {
  return t === 'B' || t === 'C'
}

function getWebGLRenderer(): string {
  try {
    const canvas = document.createElement('canvas')
    const gl = (canvas.getContext('webgl') ||
      canvas.getContext('experimental-webgl')) as WebGLRenderingContext | null
    if (!gl) return 'no-webgl'
    const dbg = gl.getExtension('WEBGL_debug_renderer_info')
    if (dbg) return String(gl.getParameter(dbg.UNMASKED_RENDERER_WEBGL) || '')
    return String(gl.getParameter(gl.RENDERER) || '')
  } catch {
    return ''
  }
}

export function prefersReducedMotion(): boolean {
  return typeof matchMedia !== 'undefined' && matchMedia('(prefers-reduced-motion: reduce)').matches
}

export function detectTier(): Tier {
  if (typeof navigator === 'undefined' || typeof matchMedia === 'undefined') return 'A'

  const coarse = matchMedia('(pointer: coarse)').matches
  const cores = navigator.hardwareConcurrency || 2
  const mem = (navigator as Navigator & { deviceMemory?: number }).deviceMemory
  const renderer = getWebGLRenderer().toLowerCase()

  // Hard floors: software rasterizer or no WebGL → Lite.
  if (!renderer || renderer === 'no-webgl' || /swiftshader|llvmpipe|software|basic render/.test(renderer)) {
    return 'A'
  }

  // Phones (coarse pointer + small physical screen) → Lite floor.
  const minDim = Math.min(screen.width || 9999, screen.height || 9999)
  if (coarse && minDim < 600) return 'A'

  let score = 0
  if (mem !== undefined) score += mem >= 8 ? 2 : mem >= 4 ? 1 : 0
  else score += cores >= 8 ? 1 : 0 // unknown memory (Safari/FF) → conservative
  score += cores >= 8 ? 2 : cores >= 4 ? 1 : 0

  const strongGpu = /apple|m1|m2|m3|m4|nvidia|geforce|radeon|rtx|adreno 6|adreno 7|mali-g7/.test(renderer)
  if (strongGpu) score += 2
  const weakGpu = /(hd|uhd) graphics (5|6)|mali-4|mali-t|powervr/.test(renderer)
  if (weakGpu) score -= 1

  if (score >= 4) return 'C'
  if (score >= 2) return 'B'
  return 'A' // default down
}
