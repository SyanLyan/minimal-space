"use client"

import { useEffect, useState } from "react"

interface Metric {
  label: string
  value: string
  unit: string
  trend: "up" | "down" | "stable"
  bar: number
}

function TelemetryCard({ metric }: { metric: Metric }) {
  const trendIcon = metric.trend === "up" ? "\u2191" : metric.trend === "down" ? "\u2193" : "\u2192"
  const trendColor =
    metric.trend === "up"
      ? "text-primary"
      : metric.trend === "down"
        ? "text-destructive"
        : "text-muted-foreground"

  return (
    <div className="border border-border p-5 hover:border-primary/30 transition-colors group">
      <div className="flex items-start justify-between mb-4">
        <span className="font-mono text-[10px] tracking-wider text-muted-foreground uppercase">
          {metric.label}
        </span>
        <span className={`font-mono text-xs ${trendColor}`}>{trendIcon}</span>
      </div>

      <div className="flex items-baseline gap-1.5 mb-4">
        <span className="font-mono text-2xl md:text-3xl text-foreground group-hover:text-primary transition-colors">
          {metric.value}
        </span>
        <span className="font-mono text-xs text-muted-foreground">{metric.unit}</span>
      </div>

      <div className="w-full h-1 bg-muted rounded-full overflow-hidden">
        <div
          className="h-full bg-primary/60 group-hover:bg-primary transition-all duration-700"
          style={{ width: `${metric.bar}%` }}
        />
      </div>
    </div>
  )
}

export function TelemetryDashboard() {
  const [metrics, setMetrics] = useState<Metric[]>([
    { label: "Core Temperature", value: "2,847", unit: "K", trend: "stable", bar: 72 },
    { label: "Signal Range", value: "14.7", unit: "LY", trend: "up", bar: 88 },
    { label: "Power Output", value: "94.2", unit: "%", trend: "stable", bar: 94 },
    { label: "Data Throughput", value: "1.21", unit: "TB/s", trend: "up", bar: 61 },
    { label: "Shield Integrity", value: "87.6", unit: "%", trend: "down", bar: 87 },
    { label: "Crew Status", value: "42", unit: "ACTIVE", trend: "stable", bar: 100 },
  ])

  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics((prev) =>
        prev.map((m) => ({
          ...m,
          bar: Math.max(10, Math.min(100, m.bar + (Math.random() * 6 - 3))),
        }))
      )
    }, 2000)
    return () => clearInterval(interval)
  }, [])

  return (
    <section id="telemetry" className="py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-2 h-2 rounded-full bg-accent" />
          <h2 className="font-mono text-xs tracking-[0.3em] text-accent uppercase">
            Telemetry Dashboard
          </h2>
        </div>
        <p className="font-sans text-sm text-muted-foreground mb-8 ml-5">
          Real-time system diagnostics and environmental metrics
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {metrics.map((metric) => (
            <TelemetryCard key={metric.label} metric={metric} />
          ))}
        </div>
      </div>
    </section>
  )
}
