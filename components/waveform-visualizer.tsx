"use client"

import { useEffect, useRef } from "react"

export function WaveformVisualizer() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let animationId: number
    let time = 0

    const resize = () => {
      canvas.width = canvas.offsetWidth * 2
      canvas.height = canvas.offsetHeight * 2
      ctx.scale(2, 2)
    }
    resize()
    window.addEventListener("resize", resize)

    const draw = () => {
      const w = canvas.offsetWidth
      const h = canvas.offsetHeight
      ctx.clearRect(0, 0, w, h)

      // Draw 3 waveforms
      const waves = [
        { color: "rgba(74, 222, 128, 0.6)", amp: 30, freq: 0.02, speed: 0.03 },
        { color: "rgba(74, 222, 128, 0.3)", amp: 20, freq: 0.03, speed: 0.02 },
        { color: "rgba(234, 179, 8, 0.2)", amp: 15, freq: 0.015, speed: 0.04 },
      ]

      for (const wave of waves) {
        ctx.beginPath()
        ctx.strokeStyle = wave.color
        ctx.lineWidth = 1

        for (let x = 0; x < w; x++) {
          const y =
            h / 2 +
            Math.sin(x * wave.freq + time * wave.speed) * wave.amp +
            Math.sin(x * wave.freq * 2.5 + time * wave.speed * 1.5) * (wave.amp * 0.3)
          if (x === 0) ctx.moveTo(x, y)
          else ctx.lineTo(x, y)
        }
        ctx.stroke()
      }

      // Vertical scan line
      const scanX = (time * 2) % w
      ctx.beginPath()
      ctx.strokeStyle = "rgba(74, 222, 128, 0.15)"
      ctx.lineWidth = 1
      ctx.moveTo(scanX, 0)
      ctx.lineTo(scanX, h)
      ctx.stroke()

      time++
      animationId = requestAnimationFrame(draw)
    }

    draw()

    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener("resize", resize)
    }
  }, [])

  return (
    <section className="py-16 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-2 h-2 rounded-full bg-primary" />
          <h2 className="font-mono text-xs tracking-[0.3em] text-primary uppercase">
            Signal Waveform
          </h2>
        </div>

        <div className="border border-border p-4 relative overflow-hidden">
          <canvas
            ref={canvasRef}
            className="w-full h-40 md:h-56"
            aria-label="Animated waveform visualization showing electromagnetic signals"
          />
          {/* Grid overlay */}
          <div className="absolute inset-4 pointer-events-none" aria-hidden="true">
            <div className="w-full h-full"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(74,222,128,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(74,222,128,0.05) 1px, transparent 1px)",
                backgroundSize: "40px 40px",
              }}
            />
          </div>
          <div className="absolute bottom-6 right-6 font-mono text-[10px] text-muted-foreground">
            47 BANDS // LIVE
          </div>
        </div>
      </div>
    </section>
  )
}
