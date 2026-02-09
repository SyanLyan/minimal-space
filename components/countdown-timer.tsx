"use client"

import { useEffect, useState } from "react"

export function CountdownTimer() {
  const [remaining, setRemaining] = useState({
    days: 187,
    hours: 14,
    minutes: 32,
    seconds: 8,
  })

  useEffect(() => {
    const interval = setInterval(() => {
      setRemaining((prev) => {
        let { days, hours, minutes, seconds } = prev
        seconds--
        if (seconds < 0) {
          seconds = 59
          minutes--
        }
        if (minutes < 0) {
          minutes = 59
          hours--
        }
        if (hours < 0) {
          hours = 23
          days--
        }
        if (days < 0) {
          return { days: 0, hours: 0, minutes: 0, seconds: 0 }
        }
        return { days, hours, minutes, seconds }
      })
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  const pad = (n: number) => n.toString().padStart(2, "0")

  const units = [
    { label: "DAYS", value: pad(remaining.days) },
    { label: "HRS", value: pad(remaining.hours) },
    { label: "MIN", value: pad(remaining.minutes) },
    { label: "SEC", value: pad(remaining.seconds) },
  ]

  return (
    <section className="py-20 px-6">
      <div className="max-w-5xl mx-auto text-center">
        <p className="font-mono text-[10px] tracking-[0.4em] text-muted-foreground mb-3 uppercase">
          Time to Observation Point
        </p>
        <div className="flex items-center justify-center gap-3 md:gap-6">
          {units.map((u, i) => (
            <div key={u.label} className="flex items-center gap-3 md:gap-6">
              <div className="flex flex-col items-center">
                <span className="font-mono text-3xl md:text-5xl lg:text-6xl text-foreground tabular-nums">
                  {u.value}
                </span>
                <span className="font-mono text-[10px] text-muted-foreground mt-1 tracking-wider">
                  {u.label}
                </span>
              </div>
              {i < units.length - 1 && (
                <span className="font-mono text-2xl md:text-4xl text-primary/40 -mt-4">
                  :
                </span>
              )}
            </div>
          ))}
        </div>
        <div className="mt-8 h-px w-64 mx-auto bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
      </div>
    </section>
  )
}
