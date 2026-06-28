import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// Per TOOLING.md §6.4: keep the dependency surface small, pin versions, ship what
// the 4 GB Chromebook floor needs. Mol* is NOT bundled here — its prebuilt viewer
// is copied to /public/molstar and lazy-injected only on Standard/Full tiers.
export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: './', // relative base so the build can be self-hosted under any path
  build: {
    target: 'es2020',
    chunkSizeWarningLimit: 900,
  },
})
