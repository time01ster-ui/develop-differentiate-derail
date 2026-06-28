import { useEffect, useRef } from 'react'
import { Delaunay } from 'd3-delaunay'
import type { ExperimentData } from '../lib/measure'
import type { RunStage, Theme, VGroup } from '../content/types'

interface Props {
  data: ExperimentData
  group: VGroup
  embryo: number
  runStage: RunStage
  theme: Theme // dep only, forces a redraw on theme change so colors re-read
}

/**
 * The genuine measurement view. Centroids → (Delaunay) Voronoi tessellation +
 * nearest-neighbor links, drawn to a 2D canvas. This IS the Tier-A floor: it runs
 * on any device. The geometry is computed here, not animated. Ported from the
 * prototype's draw() with identical states (idle / segmented / measured).
 */
export default function MeasureCanvas({ data, group, embryo, runStage, theme }: Props) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const wrapRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const wrap = wrapRef.current
    if (!canvas || !wrap) return

    const cssv = (n: string) =>
      getComputedStyle(wrap).getPropertyValue(n).trim() || '#888'

    const draw = () => {
      const W = Math.max(280, wrap.clientWidth)
      const H = Math.round(Math.min(430, Math.max(300, W * 0.6)))
      const dpr = Math.min(2, window.devicePixelRatio || 1)
      if (canvas.width !== Math.round(W * dpr) || canvas.height !== Math.round(H * dpr)) {
        canvas.width = Math.round(W * dpr)
        canvas.height = Math.round(H * dpr)
      }
      canvas.style.height = H + 'px'
      const ctx = canvas.getContext('2d')
      if (!ctx) return
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

      const idx = Math.min(embryo, data.reps - 1)
      const pts = data[group][idx]
      const pad = 22,
        bw = W - pad * 2,
        bh = H - pad * 2
      const accent = group === 'treat' ? cssv('--c-blue') : cssv('--muted')
      const accent2 = group === 'treat' ? cssv('--c-green') : cssv('--c-amber')

      ctx.clearRect(0, 0, W, H)
      ctx.fillStyle = '#02030a'
      ctx.fillRect(0, 0, W, H)

      // faint grid
      ctx.strokeStyle = 'rgba(255,255,255,0.04)'
      ctx.lineWidth = 1
      for (let i = 1; i < 8; i++) {
        const x = pad + (bw * i) / 8
        ctx.beginPath()
        ctx.moveTo(x, pad)
        ctx.lineTo(x, pad + bh)
        ctx.stroke()
        const y = pad + (bh * i) / 8
        ctx.beginPath()
        ctx.moveTo(pad, y)
        ctx.lineTo(pad + bw, y)
        ctx.stroke()
      }

      const P = pts.map((p) => ({ x: pad + p.x * bw, y: pad + p.y * bh }))

      if (runStage === 'idle') {
        // fuzzy, unsegmented blobs (raw micrograph)
        for (const p of P) {
          const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, 9)
          g.addColorStop(0, 'rgba(150,170,200,0.5)')
          g.addColorStop(1, 'rgba(150,170,200,0)')
          ctx.fillStyle = g
          ctx.beginPath()
          ctx.arc(p.x, p.y, 9, 0, 7)
          ctx.fill()
        }
        return
      }

      if (runStage === 'measured') {
        try {
          const del = Delaunay.from(
            P.map((p) => [p.x, p.y] as [number, number]),
          )
          const vor = del.voronoi([pad, pad, pad + bw, pad + bh])
          ctx.strokeStyle = 'rgba(120,150,190,0.35)'
          ctx.lineWidth = 1
          ctx.beginPath()
          vor.render(ctx)
          ctx.stroke()
          ctx.strokeStyle = accent2
          ctx.lineWidth = 0.6
        } catch {
          /* Voronoi degenerate for tiny n, skip cells, dots still draw */
        }
        // nearest-neighbor links
        ctx.strokeStyle = 'rgba(255,255,255,0.10)'
        ctx.lineWidth = 1
        for (let i = 0; i < P.length; i++) {
          let m = Infinity,
            mj = -1
          for (let j = 0; j < P.length; j++) {
            if (i === j) continue
            const dx = P[i].x - P[j].x,
              dy = P[i].y - P[j].y
            const d = dx * dx + dy * dy
            if (d < m) {
              m = d
              mj = j
            }
          }
          if (mj >= 0) {
            ctx.beginPath()
            ctx.moveTo(P[i].x, P[i].y)
            ctx.lineTo(P[mj].x, P[mj].y)
            ctx.stroke()
          }
        }
      }

      // nuclei centroids (glowing)
      for (const p of P) {
        ctx.shadowColor = accent
        ctx.shadowBlur = 10
        ctx.fillStyle = accent
        ctx.beginPath()
        ctx.arc(p.x, p.y, 3.4, 0, 7)
        ctx.fill()
      }
      ctx.shadowBlur = 0
      if (runStage === 'measured') {
        ctx.fillStyle = 'rgba(255,255,255,0.85)'
        for (const p of P) {
          ctx.beginPath()
          ctx.arc(p.x, p.y, 1.1, 0, 7)
          ctx.fill()
        }
      }
    }

    draw()
    const ro = new ResizeObserver(() => draw())
    ro.observe(wrap)
    return () => ro.disconnect()
  }, [data, group, embryo, runStage, theme])

  return (
    <div
      ref={wrapRef}
      style={{
        position: 'relative',
        border: '1px solid var(--line)',
        borderRadius: 14,
        overflow: 'hidden',
        background: '#020307',
      }}
    >
      <canvas
        ref={canvasRef}
        role="img"
        aria-label={
          runStage === 'idle'
            ? 'Raw micrograph, nuclei not yet segmented'
            : runStage === 'segmented'
              ? 'Segmented nuclei centroids'
              : 'Voronoi tessellation with nearest-neighbor links over segmented nuclei'
        }
        style={{ display: 'block', width: '100%', height: 300 }}
      />
    </div>
  )
}
