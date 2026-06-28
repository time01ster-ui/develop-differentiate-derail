// Copies the prebuilt, self-contained Mol* viewer bundle into /public/molstar so it
// can be lazy-injected at runtime on Standard/Full tiers WITHOUT bundling Mol* through
// Vite. Self-hosting (not iframing molstar.org) is required by TOOLING.md §6.1 for
// school-network resilience. Runs on postinstall; safe to fail (the app degrades to a
// static fallback if Mol* is unavailable).
import { copyFileSync, mkdirSync, existsSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = resolve(__dirname, '..')
const out = resolve(root, 'public/molstar')
mkdirSync(out, { recursive: true })

const candidates = [
  ['node_modules/molstar/build/viewer/molstar.js', 'molstar.js'],
  ['node_modules/molstar/build/viewer/molstar.css', 'molstar.css'],
]

let copied = 0
for (const [from, to] of candidates) {
  const src = resolve(root, from)
  if (existsSync(src)) {
    copyFileSync(src, resolve(out, to))
    copied++
  } else {
    console.warn(`[copy-molstar] not found: ${from} (Mol* viewer will use static fallback)`)
  }
}
console.log(`[copy-molstar] copied ${copied}/2 Mol* viewer files to public/molstar`)
