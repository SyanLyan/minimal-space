"use client"

import { useState } from "react"

interface SystemModule {
  id: string
  name: string
  status: "NOMINAL" | "WARNING" | "CRITICAL"
  description: string
  details: string[]
}

const systems: SystemModule[] = [
  {
    id: "nav",
    name: "NAV-CORE",
    status: "NOMINAL",
    description: "Primary navigation and trajectory computation",
    details: [
      "Gyroscope calibration: 99.7%",
      "Star tracker lock: CONFIRMED",
      "Course deviation: 0.002 AU",
      "Next correction: T+4h 22m",
    ],
  },
  {
    id: "comm",
    name: "COMM-ARRAY",
    status: "NOMINAL",
    description: "Long-range communication and signal relay",
    details: [
      "Antenna gain: 42.3 dBi",
      "Uplink: ACTIVE",
      "Downlink latency: 4.2s",
      "Encryption: AES-512",
    ],
  },
  {
    id: "life",
    name: "LIFE-SYS",
    status: "WARNING",
    description: "Environmental and atmospheric regulation",
    details: [
      "O2 level: 20.4% [LOW]",
      "CO2 scrubbers: 78% capacity",
      "Humidity: 42%",
      "Recycler efficiency: 91.2%",
    ],
  },
  {
    id: "power",
    name: "PWR-GRID",
    status: "NOMINAL",
    description: "Fusion reactor and power distribution network",
    details: [
      "Reactor output: 4.7 GW",
      "Battery reserve: 87%",
      "Load balance: OPTIMAL",
      "Coolant temp: 312K",
    ],
  },
  {
    id: "sensor",
    name: "SENS-NET",
    status: "NOMINAL",
    description: "Deep-space sensor array and spectrometer grid",
    details: [
      "Active sensors: 2,847",
      "Spectral range: 10nm-15cm",
      "Resolution: 0.001 arcsec",
      "Calibration: CURRENT",
    ],
  },
  {
    id: "defense",
    name: "DEF-GRID",
    status: "CRITICAL",
    description: "Micrometeorite and radiation shielding systems",
    details: [
      "Shield power: 43% [CRITICAL]",
      "Deflector array: PARTIAL",
      "Radiation filter: DEGRADED",
      "Impact alert: STANDBY",
    ],
  },
]

export function SystemsPanel() {
  const [expanded, setExpanded] = useState<string | null>(null)

  const statusColor = (s: SystemModule["status"]) => {
    if (s === "NOMINAL") return "text-primary"
    if (s === "WARNING") return "text-accent"
    return "text-destructive"
  }

  const statusDot = (s: SystemModule["status"]) => {
    if (s === "NOMINAL") return "bg-primary"
    if (s === "WARNING") return "bg-accent"
    return "bg-destructive animate-pulse"
  }

  return (
    <section id="systems" className="py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-2 h-2 rounded-full bg-primary" />
          <h2 className="font-mono text-xs tracking-[0.3em] text-primary uppercase">
            System Modules
          </h2>
        </div>
        <p className="font-sans text-sm text-muted-foreground mb-8 ml-5">
          Interactive subsystem status overview
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {systems.map((sys) => (
            <button
              type="button"
              key={sys.id}
              onClick={() => setExpanded(expanded === sys.id ? null : sys.id)}
              className="text-left border border-border p-4 hover:border-primary/30 transition-all group"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2.5">
                  <div className={`w-2 h-2 rounded-full ${statusDot(sys.status)}`} />
                  <span className="font-mono text-sm text-foreground group-hover:text-primary transition-colors">
                    {sys.name}
                  </span>
                </div>
                <span className={`font-mono text-[10px] tracking-wider ${statusColor(sys.status)}`}>
                  {sys.status}
                </span>
              </div>

              <p className="font-sans text-xs text-muted-foreground mb-2">
                {sys.description}
              </p>

              {expanded === sys.id && (
                <div className="mt-3 pt-3 border-t border-border/50">
                  {sys.details.map((detail) => (
                    <p key={detail} className="font-mono text-[11px] text-muted-foreground py-0.5">
                      <span className="text-primary/60 mr-2">{">"}</span>
                      {detail}
                    </p>
                  ))}
                </div>
              )}

              <div className="mt-2 font-mono text-[10px] text-muted-foreground/50">
                {expanded === sys.id ? "[ COLLAPSE ]" : "[ EXPAND ]"}
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}
