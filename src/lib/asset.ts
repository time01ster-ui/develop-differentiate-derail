// Resolve a public-folder asset path against Vite's base URL, so the same build
// works at the dev root AND when the dist is self-hosted under a subpath (the
// portal serves this build at /biomed-sim/). Mirrors the MolStarViewer BASE
// pattern: with vite base './', BASE_URL is relative, so the assets resolve
// against wherever index.html actually sits.
const BASE = import.meta.env.BASE_URL || '/'

/** Prefix a public asset path (leading slash optional) with the app's base. */
export function asset(path: string): string {
  return BASE + path.replace(/^\//, '')
}
