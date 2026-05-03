import { TopBar } from '@/components/TopBar'
import { ScrollProgress } from '@/components/ScrollProgress'
import { Crosshair } from '@/components/Crosshair'
import { Reveal } from '@/components/Reveal'
import { SectionHead } from '@/components/SectionHead'
import { Footer } from '@/components/Footer'
import { Crumb } from '@/components/case/Crumb'
import { Pull } from '@/components/case/Pull'
import { OutcomeGrid } from '@/components/case/OutcomeGrid'
import { Stat } from '@/components/case/Stat'
import { ApproachStep } from '@/components/case/ApproachStep'
import { Lessons } from '@/components/case/Lessons'
import { PrevNext } from '@/components/case/PrevNext'

export const metadata = {
  title: '92% reviewed, 78% AI-assisted — Artur Cempura',
  description:
    'Two quarters. Nine engineers. One internal full-stack dashboard that turned a vibe into a baseline — and a baseline into a habit.',
}

export default function AiAdoptionPage() {
  return (
    <>
      <ScrollProgress />
      <Crosshair />
      <TopBar showBack />
      <Crumb slug="ai-adoption" meta="case 01 · 2026 · evoke plc" />
      <main>
        {/* Hero */}
        <section className="pt-16 md:pt-24 pb-[96px] md:pb-[160px]">
          <div className="max-w-[1280px] mx-auto px-6 md:px-8">
            <div className="grid grid-cols-12 gap-6">
              <div className="col-span-12 md:col-span-2">
                <div
                  className="font-display font-light text-[80px] leading-none"
                  style={{ color: 'var(--accent)' }}
                >
                  01
                </div>
              </div>
              <div className="col-span-12 md:col-span-10">
                <div
                  className="font-mono text-[12px] mb-6 flex flex-wrap gap-x-4 gap-y-1"
                  style={{ color: 'var(--muted)' }}
                >
                  <span>2026</span><span>·</span>
                  <span>evoke plc</span><span>·</span>
                  <span>engineering lead</span><span>·</span>
                  <span>9-person team</span><span>·</span>
                  <span>typescript / react</span>
                </div>
                <h1
                  className="font-display font-light leading-[0.95] tracking-[-0.035em]"
                  style={{ fontSize: 'clamp(44px, 7vw, 112px)', color: 'var(--ink)' }}
                >
                  92% reviewed.<br />78% AI-assisted.
                </h1>
                <p
                  className="mt-10 max-w-[60ch] text-[17px] md:text-[19px] leading-[1.55]"
                  style={{ color: 'var(--muted)' }}
                >
                  Two quarters. Nine engineers. One internal full-stack dashboard that turned a
                  vibe into a baseline — and a baseline into a habit. Now scaling toward the
                  60-engineer Sportsbook channel.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Problem */}
        <section className="py-[96px] md:py-[160px] border-t" style={{ borderColor: 'var(--border)' }}>
          <div className="max-w-[1280px] mx-auto px-6 md:px-8">
            <Reveal><SectionHead ord="01" label="problem" className="mb-12" /></Reveal>
            <Reveal>
              <Pull>
                Jira and GitLab couldn&apos;t show{' '}
                <span style={{ color: 'var(--accent)' }}>AI usage.</span> The team had no shared baseline.
              </Pull>
            </Reveal>
            <Reveal delay={120}>
              <div className="mt-16 grid grid-cols-12 gap-6">
                <div className="col-span-12 md:col-span-6 md:col-start-7">
                  <p className="text-[16px] leading-[1.7]" style={{ color: 'var(--muted)' }}>
                    Anecdotes everywhere.{' '}
                    <span style={{ color: 'var(--ink)' }}>
                      Some engineers had Copilot pinned, others wouldn&apos;t touch it.
                    </span>{' '}
                    Leadership wanted a number. The team wanted to be left alone. Neither group had
                    what they needed: a shared, honest picture of where AI was actually moving the
                    work.
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* Approach */}
        <section className="py-[96px] md:py-[160px] border-t" style={{ borderColor: 'var(--border)' }}>
          <div className="max-w-[1280px] mx-auto px-6 md:px-8">
            <Reveal><SectionHead ord="02" label="approach" className="mb-12" /></Reveal>
            <div className="grid grid-cols-12 gap-6">
              <Reveal className="col-span-12 md:col-span-4">
                <h2
                  className="font-display font-light leading-[1] tracking-[-0.03em]"
                  style={{ fontSize: 'clamp(32px, 4.2vw, 56px)', color: 'var(--ink)' }}
                >
                  Build the dashboard nobody asked for.
                </h2>
              </Reveal>
              <div className="col-span-12 md:col-span-7 md:col-start-6">
                {[
                  {
                    n: '01',
                    t: 'Internal dashboard, two weeks.',
                    d: 'Stitched GitLab, Jira, and IDE telemetry into a single team view. Owned the schema; owned the read path.',
                  },
                  {
                    n: '02',
                    t: 'DORA + AI-usage metrics, side-by-side.',
                    d: "Lead time, deploy frequency, and AI-assist rate on the same chart — so quality and speed couldn't be argued in isolation.",
                  },
                  {
                    n: '03',
                    t: 'Surfaced gaps weekly, not quarterly.',
                    d: 'A 10-minute Friday review. Names off, patterns on. Trends visible before they became culture.',
                  },
                  {
                    n: '04',
                    t: 'Shared prompts, not policies.',
                    d: 'A small library of prompts and review checklists, versioned in the repo. Suggestions, not mandates.',
                  },
                ].map((s) => (
                  <Reveal key={s.n}>
                    <ApproachStep n={s.n} title={s.t} description={s.d} />
                  </Reveal>
                ))}
                <div className="py-6" style={{ borderTop: '1px solid var(--border)' }} />
              </div>
            </div>
          </div>
        </section>

        {/* Outcome */}
        <section className="py-[96px] md:py-[160px] border-t" style={{ borderColor: 'var(--border)' }}>
          <div className="max-w-[1280px] mx-auto px-6 md:px-8">
            <Reveal><SectionHead ord="03" label="outcome" className="mb-12 md:mb-16" /></Reveal>
            <OutcomeGrid>
              <Reveal className="col-span-12 md:col-span-4" delay={0}>
                <Stat from={0} to={92} suffix="%" label="of work AI-reviewed" duration={1600} />
              </Reveal>
              <Reveal className="col-span-12 md:col-span-4" delay={120}>
                <Stat from={0} to={78} suffix="%" label="of work AI-assisted" duration={1400} />
              </Reveal>
              <Reveal className="col-span-12 md:col-span-4" delay={240}>
                <Stat to={0} suffix="%" label="attrition during rollout" duration={1000} />
              </Reveal>
            </OutcomeGrid>
            <Reveal delay={300}>
              <p className="mt-20 max-w-[58ch] text-[17px] leading-[1.6]" style={{ color: 'var(--muted)' }}>
                <span style={{ color: 'var(--ink)' }}>
                  The dashboard didn&apos;t change the team — the conversation it forced did.
                </span>{' '}
                Once the number was visible, debate moved from &ldquo;should we&rdquo; to
                &ldquo;where next.&rdquo; Adoption stopped being a top-down ask and became a peer
                signal.
              </p>
            </Reveal>
          </div>
        </section>

        {/* What I'd do differently */}
        <section className="py-[96px] md:py-[160px] border-t" style={{ borderColor: 'var(--border)' }}>
          <div className="max-w-[1280px] mx-auto px-6 md:px-8">
            <Reveal><SectionHead ord="04" label="what i'd do differently" className="mb-10" /></Reveal>
            <div className="grid grid-cols-12 gap-6">
              <Reveal className="col-span-12 md:col-span-7">
                <Lessons
                  items={[
                    {
                      bold: 'Ship the metric before the dashboard.',
                      text: "A spreadsheet for two weeks would've validated the signal faster than a polished UI.",
                    },
                    {
                      bold: 'Define "AI-assisted" earlier.',
                      text: "The first month was spent re-litigating what counted. A loose, public definition would've moved faster than a perfect one.",
                    },
                    {
                      bold: 'Bring product in from week one.',
                      text: 'Engineering moved first. By the time PM noticed the velocity shift, scope had already absorbed the gain.',
                    },
                  ]}
                />
              </Reveal>
            </div>
          </div>
        </section>

        <PrevNext
          prev={{ num: '02', title: 'Stale flag cleanup' }}
          next={{ num: '03', title: 'Shared Codex workflows' }}
        />
        <Footer />
      </main>
    </>
  )
}
