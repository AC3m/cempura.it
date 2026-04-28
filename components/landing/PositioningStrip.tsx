import { Reveal } from '../Reveal'
import { SectionHead } from '../SectionHead'

export function PositioningStrip() {
  return (
    <section
      className="py-[96px] md:py-[160px] border-t"
      style={{ borderColor: 'var(--border)' }}
    >
      <div className="max-w-[1280px] mx-auto px-6 md:px-8">
        <Reveal>
          <SectionHead ord="03" label="positioning" className="mb-12 md:mb-16" />
        </Reveal>
        <div className="grid grid-cols-12 gap-6">
          <Reveal className="col-span-12 md:col-span-8 md:col-start-3">
            <p
              className="font-display font-light pull leading-[1.08] tracking-[-0.025em]"
              style={{ fontSize: 'clamp(28px, 4.4vw, 56px)', color: 'var(--ink)' }}
            >
              Ten-plus years across software, product, and operations in{' '}
              <em style={{ fontStyle: 'italic', color: 'var(--accent)' }}>
                regulated, high-traffic betting
              </em>
              . Hands-on with AI-assisted delivery, internal tooling, automation, and workflow
              design.
            </p>
            <p className="mt-10 font-mono text-[13px]" style={{ color: 'var(--muted)' }}>
              ↳ building over advising · prototypes over decks
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
