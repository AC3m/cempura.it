import { TopBar } from '@/components/TopBar'
import { ScrollProgress } from '@/components/ScrollProgress'
import { Crosshair } from '@/components/Crosshair'
import { Hero } from '@/components/landing/Hero'
import { SynekSection } from '@/components/landing/SynekSection'
import { CaseCards } from '@/components/landing/CaseCards'
import { PositioningStrip } from '@/components/landing/PositioningStrip'
import { Footer } from '@/components/Footer'

export default function HomePage() {
  return (
    <>
      <ScrollProgress />
      <Crosshair />
      <TopBar />
      <main>
        <Hero />
        <SynekSection />
        <CaseCards />
        <PositioningStrip />
        <Footer />
      </main>
    </>
  )
}
