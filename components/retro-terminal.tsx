"use client"

import React from "react"

import { useState, useRef, useEffect } from "react"

interface TerminalLine {
  type: "input" | "output" | "error"
  text: string
}

const COMMANDS: Record<string, string[]> = {
  help: [
    "Available commands:",
    "  help      - Show this help message",
    "  status    - Display station status",
    "  scan      - Initiate deep space scan",
    "  crew      - List active crew members",
    "  coords    - Show current coordinates",
    "  date      - Display stardate",
    "  clear     - Clear terminal",
    "  ping      - Test comm relay",
  ],
  status: [
    "=== VOID STATION STATUS ===",
    "Hull Integrity:   97.8%",
    "Reactor Output:   4.7 GW",
    "O2 Level:         20.4%",
    "Fuel Reserve:     72.4%",
    "Shields:          43.0% [CRITICAL]",
    "All other systems NOMINAL.",
  ],
  scan: [
    "Initiating deep space scan...",
    "Scanning sector 9-Alpha.......... DONE",
    "Scanning sector 9-Beta........... DONE",
    "Scanning sector 9-Gamma.......... DONE",
    "",
    "Results: 3 anomalous signals detected.",
    "Flagged for analysis. See LOG-007.",
  ],
  crew: [
    "ACTIVE CREW ROSTER:",
    "  01. Cmdr. Okafor       - Command",
    "  02. Dr. Vasquez        - Science",
    "  03. Tech. Reyes        - Engineering",
    "  04. Nav. Tanaka        - Navigation",
    "  05. Lt. Petrov         - Defense",
    "",
    "Total: 42 crew members active.",
  ],
  coords: [
    "Current Position:",
    "  RA:  14h 39m 36.49s",
    "  Dec: -60\u00b0 50' 02.3\"",
    "  Dist: 14.7 LY from Sol",
    "  Sector: 9-Alpha / Centaurus Arm",
  ],
  date: [`Stardate: ${new Date().toISOString().replace(/[-:T]/g, ".").slice(0, 14)}`, "Earth Equivalent: " + new Date().toUTCString()],
  ping: [
    "Pinging Relay Station Alpha...",
    "Response: 4.2s latency",
    "Signal strength: 87%",
    "Connection: STABLE",
  ],
}

export function RetroTerminal() {
  const [lines, setLines] = useState<TerminalLine[]>([
    { type: "output", text: "VOID STATION TERMINAL v3.2.1" },
    { type: "output", text: 'Type "help" for available commands.' },
    { type: "output", text: "" },
  ])
  const [input, setInput] = useState("")
  const endRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [lines])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const cmd = input.trim().toLowerCase()
    const newLines: TerminalLine[] = [
      ...lines,
      { type: "input", text: `> ${input}` },
    ]

    if (cmd === "clear") {
      setLines([])
      setInput("")
      return
    }

    if (cmd in COMMANDS) {
      for (const line of COMMANDS[cmd]) {
        newLines.push({ type: "output", text: line })
      }
    } else if (cmd === "") {
      // do nothing
    } else {
      newLines.push({
        type: "error",
        text: `Command not recognized: "${cmd}". Type "help" for available commands.`,
      })
    }

    newLines.push({ type: "output", text: "" })
    setLines(newLines)
    setInput("")
  }

  return (
    <section className="py-20 px-6">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-2 h-2 rounded-full bg-primary" />
          <h2 className="font-mono text-xs tracking-[0.3em] text-primary uppercase">
            Terminal Access
          </h2>
        </div>

        <div className="border border-border bg-card">
          {/* Title bar */}
          <div className="flex items-center gap-2 px-4 py-2 border-b border-border bg-secondary/30">
            <div className="w-2 h-2 rounded-full bg-destructive" />
            <div className="w-2 h-2 rounded-full bg-accent" />
            <div className="w-2 h-2 rounded-full bg-primary" />
            <span className="font-mono text-[10px] text-muted-foreground ml-2">
              vst-terminal // session active
            </span>
          </div>

          {/* Terminal body */}
          <div className="p-4 h-72 overflow-y-auto font-mono text-xs leading-relaxed">
            {lines.map((line, i) => (
              <div
                key={`${line.text}-${i}`}
                className={
                  line.type === "input"
                    ? "text-primary"
                    : line.type === "error"
                      ? "text-destructive"
                      : "text-muted-foreground"
                }
              >
                {line.text || "\u00A0"}
              </div>
            ))}
            <div ref={endRef} />

            {/* Input */}
            <form onSubmit={handleSubmit} className="flex items-center gap-2 mt-1">
              <span className="text-primary">{">"}</span>
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="flex-1 bg-transparent text-foreground outline-none caret-primary"
                autoFocus
                aria-label="Terminal input"
                spellCheck={false}
                autoComplete="off"
              />
            </form>
          </div>
        </div>

        <p className="font-mono text-[10px] text-muted-foreground mt-2">
          Try: help, status, scan, crew, coords, ping, clear
        </p>
      </div>
    </section>
  )
}
