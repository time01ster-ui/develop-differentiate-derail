import { createContext, useContext, useState, type ReactNode } from 'react'
import { detectTier, prefersReducedMotion, type Tier } from '../lib/capability'

interface TierCtxValue {
  tier: Tier
  setTier: (t: Tier) => void
  autoDetected: Tier
  reducedMotion: boolean
  setReducedMotion: (b: boolean) => void
}

const TierCtx = createContext<TierCtxValue | null>(null)

export function TierProvider({ children }: { children: ReactNode }) {
  const [autoDetected] = useState<Tier>(detectTier)
  const [tier, setTier] = useState<Tier>(autoDetected)
  // Reduced motion starts from the OS preference but is user-overridable in-app.
  const [reducedMotion, setReducedMotion] = useState<boolean>(prefersReducedMotion)
  return (
    <TierCtx.Provider value={{ tier, setTier, autoDetected, reducedMotion, setReducedMotion }}>
      {children}
    </TierCtx.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export function useTier(): TierCtxValue {
  const c = useContext(TierCtx)
  if (!c) throw new Error('useTier must be used within TierProvider')
  return c
}
