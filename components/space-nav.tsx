"use client"

import { useState, useEffect } from "react"

export function SpaceNav() {
  const [time, setTime] = useState("")
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const tick = () => {
      const now = new Date()
      setTime(
        now.toISOString().slice(11, 19).replace(/:/g, ":") +
          " UTC"
      )
    }
    tick()
    const interval = setInterval(tick, 1000)
    return () => clearInterval(interval)
  }, [])

  const navLinks = [
    { label: "TRANSMISSIONS", href: "#transmissions" },
    { label: "TELEMETRY", href: "#telemetry" },
    { label: "SYSTEMS", href: "#systems" },
    { label: "LOG", href: "#log" },
  ]

  return (
    <header className="fixed top-0 left-0 right-0 z-40 border-b border-border bg-background/80 backdrop-blur-sm">
      <nav className="flex items-center justify-between px-6 py-3 max-w-7xl mx-auto">
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
          <span className="font-mono text-sm text-primary tracking-widest glitch-text">
            VOID.STN
          </span>
        </div>

        {/* Desktop nav */}
        <ul className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                className="font-mono text-xs tracking-wider text-muted-foreground hover:text-primary transition-colors"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden md:flex items-center gap-4">
          <span className="font-mono text-xs text-muted-foreground">
            {time}
          </span>
          <div className="flex items-center gap-1.5">
            <div className="w-1.5 h-1.5 rounded-full bg-primary" />
            <span className="font-mono text-xs text-primary">ONLINE</span>
          </div>
        </div>

        {/* Mobile toggle */}
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden font-mono text-xs text-muted-foreground border border-border px-3 py-1.5 hover:border-primary hover:text-primary transition-colors"
          aria-label="Toggle navigation"
        >
          {isOpen ? "CLOSE" : "MENU"}
        </button>
      </nav>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden border-t border-border bg-background/95 backdrop-blur-sm">
          <ul className="flex flex-col px-6 py-4 gap-4">
            {navLinks.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="font-mono text-xs tracking-wider text-muted-foreground hover:text-primary transition-colors"
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li className="pt-2 border-t border-border">
              <span className="font-mono text-xs text-muted-foreground">
                {time}
              </span>
            </li>
          </ul>
        </div>
      )}
    </header>
  )
}
