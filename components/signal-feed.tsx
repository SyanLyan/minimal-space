"use client"

import { useEffect, useState, useRef } from "react"

interface Signal {
  id: number
  timestamp: string
  source: string
  freq: string
  strength: number
  status: "ACTIVE" | "FADING" | "LOST"
}

function generateSignal(id: number): Signal {
  const sources = [
    "NGC-4486", "PSR-B1919", "SGR-A*", "VY-CMa",
    "CYG-X1", "M87-JET", "PLR-7742", "QSO-3C273",
  ]
  const statuses: Signal["status"][] = ["ACTIVE", "ACTIVE", "ACTIVE", "FADING", "LOST"]
  const now = new Date()
  return {
    id,
    timestamp: now.toISOString().slice(11, 19),
    source: sources[Math.floor(Math.random() * sources.length)],
    freq: `${(Math.random() * 1400 + 100).toFixed(1)} MHz`,
    strength: Math.floor(Math.random() * 100),
    status: statuses[Math.floor(Math.random() * statuses.length)],
  }
}

export function SignalFeed() {
  const [signals, setSignals] = useState<Signal[]>([])
  const idRef = useRef(0)

  useEffect(() => {
    // Initialize
    for (let i = 0; i < 6; i++) {
      idRef.current++
      setSignals((prev) => [generateSignal(idRef.current), ...prev].slice(0, 8))
    }

    const interval = setInterval(() => {
      idRef.current++
      setSignals((prev) => [generateSignal(idRef.current), ...prev].slice(0, 8))
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  const statusColor = (s: Signal["status"]) => {
    if (s === "ACTIVE") return "text-primary"
    if (s === "FADING") return "text-accent"
    return "text-destructive"
  }

  return (
    <section id="transmissions" className="py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
          <h2 className="font-mono text-xs tracking-[0.3em] text-primary uppercase">
            Live Signal Feed
          </h2>
        </div>

        <div className="border border-border overflow-hidden">
          {/* Table header */}
          <div className="grid grid-cols-5 gap-4 px-4 py-3 bg-secondary/50 border-b border-border">
            {["TIME", "SOURCE", "FREQ", "STR", "STATUS"].map((h) => (
              <span key={h} className="font-mono text-[10px] tracking-wider text-muted-foreground uppercase">
                {h}
              </span>
            ))}
          </div>

          {/* Rows */}
          {signals.map((signal) => (
            <div
              key={signal.id}
              className="grid grid-cols-5 gap-4 px-4 py-2.5 border-b border-border/50 hover:bg-secondary/30 transition-colors"
            >
              <span className="font-mono text-xs text-muted-foreground">
                {signal.timestamp}
              </span>
              <span className="font-mono text-xs text-foreground">
                {signal.source}
              </span>
              <span className="font-mono text-xs text-muted-foreground">
                {signal.freq}
              </span>
              <div className="flex items-center gap-2">
                <div className="w-16 h-1 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary transition-all duration-500"
                    style={{ width: `${signal.strength}%` }}
                  />
                </div>
                <span className="font-mono text-[10px] text-muted-foreground">
                  {signal.strength}%
                </span>
              </div>
              <span className={`font-mono text-xs ${statusColor(signal.status)}`}>
                {signal.status}
              </span>
            </div>
          ))}
        </div>

        <p className="font-mono text-[10px] text-muted-foreground mt-3 text-right">
          Auto-refreshing every 3s // {signals.length} signals tracked
        </p>
      </div>
    </section>
  )
}
