"use client"

import { useEffect, useState } from "react"

export function HeroSection() {
  const [displayed, setDisplayed] = useState("")
  const fullText = "DEEP SPACE OBSERVATORY"

  useEffect(() => {
    let i = 0
    const interval = setInterval(() => {
      if (i <= fullText.length) {
        setDisplayed(fullText.slice(0, i))
        i++
      } else {
        clearInterval(interval)
      }
    }, 80)
    return () => clearInterval(interval)
  }, [])

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-6 pt-20">
      {/* Orbital ring decoration */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none" aria-hidden="true">
        <div className="w-[500px] h-[500px] md:w-[700px] md:h-[700px] rounded-full border border-border/30 opacity-20" />
        <div className="absolute w-[350px] h-[350px] md:w-[500px] md:h-[500px] rounded-full border border-primary/10 rotate-45" />
        <div className="absolute w-[200px] h-[200px] md:w-[300px] md:h-[300px] rounded-full border border-accent/10 -rotate-12" />
      </div>

      <div className="relative z-10 text-center max-w-4xl mx-auto">
        {/* Station designation */}
        <p className="font-mono text-xs tracking-[0.4em] text-muted-foreground mb-6 uppercase">
          Station ID: VST-7742 // Sector 9
        </p>

        {/* Main title with typewriter */}
        <h1 className="font-mono text-3xl md:text-5xl lg:text-7xl font-bold tracking-tight text-foreground mb-2">
          <span className="text-primary">{">"}</span>
          {displayed}
          <span className="inline-block w-[3px] h-[0.8em] bg-primary ml-1 animate-pulse" />
        </h1>

        <div className="h-px w-32 mx-auto bg-gradient-to-r from-transparent via-primary/50 to-transparent my-8" />

        <p className="font-sans text-sm md:text-base text-muted-foreground max-w-xl mx-auto leading-relaxed mb-10">
          Monitoring electromagnetic signals from the edge of known space.
          Active scanning across 47 frequency bands. All systems nominal.
        </p>

        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="#transmissions"
            className="font-mono text-xs tracking-wider border border-primary text-primary px-8 py-3 hover:bg-primary hover:text-primary-foreground transition-all pulse-glow"
          >
            BEGIN SCAN
          </a>
          <a
            href="#telemetry"
            className="font-mono text-xs tracking-wider border border-border text-muted-foreground px-8 py-3 hover:border-muted-foreground hover:text-foreground transition-all"
          >
            VIEW TELEMETRY
          </a>
        </div>

        {/* Scroll indicator */}
        <div className="mt-20 flex flex-col items-center gap-2 float-animation">
          <div className="w-px h-8 bg-gradient-to-b from-primary/50 to-transparent" />
          <span className="font-mono text-[10px] text-muted-foreground tracking-widest">
            SCROLL
          </span>
        </div>
      </div>
    </section>
  )
}
