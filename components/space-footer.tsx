export function SpaceFooter() {
  return (
    <footer className="border-t border-border py-12 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
          {/* Branding */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-2 h-2 rounded-full bg-primary" />
              <span className="font-mono text-sm text-primary tracking-widest">VOID.STN</span>
            </div>
            <p className="font-sans text-xs text-muted-foreground leading-relaxed">
              Deep Space Observatory // Sector 9-Alpha.
              Monitoring the cosmos since 2184.
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="font-mono text-[10px] tracking-wider text-muted-foreground mb-3 uppercase">
              Navigation
            </h3>
            <ul className="flex flex-col gap-2">
              {["Transmissions", "Telemetry", "Systems", "Log"].map((link) => (
                <li key={link}>
                  <a
                    href={`#${link.toLowerCase()}`}
                    className="font-mono text-xs text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Status */}
          <div>
            <h3 className="font-mono text-[10px] tracking-wider text-muted-foreground mb-3 uppercase">
              Station Status
            </h3>
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                <span className="font-mono text-xs text-muted-foreground">Comm Array: Online</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                <span className="font-mono text-xs text-muted-foreground">Sensors: Active</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-destructive animate-pulse" />
                <span className="font-mono text-xs text-muted-foreground">Shields: Degraded</span>
              </div>
            </div>
          </div>
        </div>

        <div className="h-px w-full bg-border mb-6" />

        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <span className="font-mono text-[10px] text-muted-foreground">
            VST-7742 // ALL TRANSMISSIONS MONITORED
          </span>
          <span className="font-mono text-[10px] text-muted-foreground">
            STARDATE 2187.042
          </span>
        </div>
      </div>
    </footer>
  )
}
