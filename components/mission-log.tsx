"use client"

import { useState } from "react"

interface LogEntry {
  id: string
  date: string
  title: string
  content: string
  author: string
  priority: "LOW" | "NORMAL" | "HIGH"
}

const entries: LogEntry[] = [
  {
    id: "log-007",
    date: "2187.042",
    title: "Anomalous signal detected in Sector 9-Alpha",
    content:
      "Recurring signal pattern observed at 1420.405 MHz. Consistent with artificial origin but no known source in catalog. Signal exhibits 73-second periodicity. Flagged for priority analysis. Cross-referencing with historical SETI databases.",
    author: "DR. ELENA VASQUEZ",
    priority: "HIGH",
  },
  {
    id: "log-006",
    date: "2187.041",
    title: "Routine sensor array maintenance completed",
    content:
      "Replaced 12 degraded photon detectors in the primary array. Calibration tests passed within tolerance. Overall sensor efficiency improved by 2.3%. Scheduled next maintenance window for 2187.090.",
    author: "TECH. OFFICER REYES",
    priority: "NORMAL",
  },
  {
    id: "log-005",
    date: "2187.039",
    title: "Micrometeorite impact on hull section C-7",
    content:
      "Minor hull breach detected and sealed by auto-repair systems. No atmospheric loss registered. Structural integrity maintained at 97.8%. Defense grid analysis shows trajectory was unpredictable. Recommending enhanced forward scanning protocol.",
    author: "CMDR. OKAFOR",
    priority: "HIGH",
  },
  {
    id: "log-004",
    date: "2187.036",
    title: "Course adjustment delta-v burn successful",
    content:
      "Executed planned 4.2 m/s correction burn at 0342 UTC. New trajectory confirmed by star tracker. Estimated arrival at observation point: T+187 days. Fuel reserves nominal at 72.4%.",
    author: "NAV. OFFICER TANAKA",
    priority: "LOW",
  },
]

export function MissionLog() {
  const [selectedId, setSelectedId] = useState<string | null>(entries[0].id)

  const priorityColor = (p: LogEntry["priority"]) => {
    if (p === "HIGH") return "text-destructive"
    if (p === "NORMAL") return "text-primary"
    return "text-muted-foreground"
  }

  const selected = entries.find((e) => e.id === selectedId)

  return (
    <section id="log" className="py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-2 h-2 rounded-full bg-accent" />
          <h2 className="font-mono text-xs tracking-[0.3em] text-accent uppercase">
            Mission Log
          </h2>
        </div>
        <p className="font-sans text-sm text-muted-foreground mb-8 ml-5">
          Command record and operational notes
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Entry list */}
          <div className="lg:col-span-1 border border-border">
            {entries.map((entry) => (
              <button
                type="button"
                key={entry.id}
                onClick={() => setSelectedId(entry.id)}
                className={`w-full text-left px-4 py-3 border-b border-border/50 transition-colors ${
                  selectedId === entry.id
                    ? "bg-secondary/50 border-l-2 border-l-primary"
                    : "hover:bg-secondary/20"
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-mono text-[10px] text-muted-foreground">
                    {entry.date}
                  </span>
                  <span className={`font-mono text-[10px] ${priorityColor(entry.priority)}`}>
                    {entry.priority}
                  </span>
                </div>
                <p className="font-mono text-xs text-foreground leading-snug line-clamp-2">
                  {entry.title}
                </p>
              </button>
            ))}
          </div>

          {/* Entry detail */}
          <div className="lg:col-span-2 border border-border p-6">
            {selected ? (
              <>
                <div className="flex items-center justify-between mb-4">
                  <span className="font-mono text-[10px] tracking-wider text-muted-foreground">
                    {selected.id.toUpperCase()} // {selected.date}
                  </span>
                  <span className={`font-mono text-[10px] ${priorityColor(selected.priority)}`}>
                    PRIORITY: {selected.priority}
                  </span>
                </div>

                <h3 className="font-mono text-lg text-foreground mb-4 leading-snug">
                  {selected.title}
                </h3>

                <div className="h-px w-full bg-border mb-4" />

                <p className="font-sans text-sm text-muted-foreground leading-relaxed mb-6">
                  {selected.content}
                </p>

                <div className="flex items-center justify-between pt-4 border-t border-border/50">
                  <span className="font-mono text-[10px] text-muted-foreground">
                    FILED BY: {selected.author}
                  </span>
                  <span className="font-mono text-[10px] text-primary">
                    ACKNOWLEDGED
                  </span>
                </div>
              </>
            ) : (
              <div className="flex items-center justify-center h-full min-h-[200px]">
                <span className="font-mono text-xs text-muted-foreground">
                  SELECT AN ENTRY
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
