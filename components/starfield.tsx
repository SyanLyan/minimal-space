"use client"

import { useEffect, useRef } from "react"

export function Starfield() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let animationId: number
    const stars: { x: number; y: number; z: number; prevZ: number }[] = []
    const STAR_COUNT = 400
    const SPEED = 0.5

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener("resize", resize)

    for (let i = 0; i < STAR_COUNT; i++) {
      stars.push({
        x: Math.random() * canvas.width - canvas.width / 2,
        y: Math.random() * canvas.height - canvas.height / 2,
        z: Math.random() * canvas.width,
        prevZ: 0,
      })
    }

    const animate = () => {
      ctx.fillStyle = "rgba(10, 13, 20, 0.15)"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      const cx = canvas.width / 2
      const cy = canvas.height / 2

      for (const star of stars) {
        star.prevZ = star.z
        star.z -= SPEED

        if (star.z <= 0) {
          star.x = Math.random() * canvas.width - cx
          star.y = Math.random() * canvas.height - cy
          star.z = canvas.width
          star.prevZ = star.z
        }

        const sx = (star.x / star.z) * cx + cx
        const sy = (star.y / star.z) * cy + cy
        const r = (1 - star.z / canvas.width) * 2

        const brightness = 1 - star.z / canvas.width
        const green = Math.floor(180 + brightness * 75)
        ctx.fillStyle = `rgba(${Math.floor(100 + brightness * 100)}, ${green}, ${Math.floor(100 + brightness * 80)}, ${brightness})`
        ctx.beginPath()
        ctx.arc(sx, sy, r, 0, Math.PI * 2)
        ctx.fill()
      }

      animationId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener("resize", resize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 -z-10"
      aria-hidden="true"
    />
  )
}
