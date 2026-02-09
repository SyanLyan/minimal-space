import { Starfield } from "@/components/starfield"
import { SpaceNav } from "@/components/space-nav"
import { HeroSection } from "@/components/hero-section"
import { SignalFeed } from "@/components/signal-feed"
import { WaveformVisualizer } from "@/components/waveform-visualizer"
import { TelemetryDashboard } from "@/components/telemetry-dashboard"
import { CountdownTimer } from "@/components/countdown-timer"
import { SystemsPanel } from "@/components/systems-panel"
import { MissionLog } from "@/components/mission-log"
import { RetroTerminal } from "@/components/retro-terminal"
import { SpaceFooter } from "@/components/space-footer"

export default function Page() {
  return (
    <>
      <Starfield />
      <SpaceNav />
      <main>
        <HeroSection />
        <SignalFeed />
        <WaveformVisualizer />
        <TelemetryDashboard />
        <CountdownTimer />
        <SystemsPanel />
        <MissionLog />
        <RetroTerminal />
      </main>
      <SpaceFooter />
    </>
  )
}
