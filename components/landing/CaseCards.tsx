import Link from 'next/link'
import { Reveal } from '../Reveal'
import { SectionHead } from '../SectionHead'

const CARDS = [
  {
    num: '01',
    title: '92% reviewed,\n78% AI-assisted',
    meta: '2025 · betting · eng lead',
    summary:
      'Stood up an internal full-stack DORA + AI-usage dashboard for a 9-engineer team. Scaling toward the 60-engineer Sportsbook channel.',
    active: true,
    href: '/case/ai-adoption',
  },
  {
    num: '02',
    title: '120+ stale flags deleted\nin days, not weeks',
    meta: '2024 · platform · eng lead',
    summary:
      'Hard sunset deadline. ~300k daily users behind a feature-flag platform 400+ devs leaned on. Agents read the code, proposed deletions, opened the PRs. The replacement runs in-house: a TS/React SDK now powering 60 Sportsbook engineers.',
    active: false,
    href: '#',
  },
  {
    num: '03',
    title: 'Shared Codex workflows\nfor a 9-person team',
    meta: '2025 · tooling · eng lead',
    summary:
      'Nine engineers, nine flavours of AI output. Standardised on CLI-first tooling — Codex, Copilot — and codified the things that kept drifting: specs, implementation, review, docs. Quality stops depending on whoever wrote today\u2019s prompt.',
    active: false,
    href: '#',
  },
]

export function CaseCards() {
  return (
    <section
      id="case-studies"
      className="py-[96px] md:py-[160px] border-t"
      style={{ borderColor: 'var(--border)' }}
    >
      <div className="max-w-[1280px] mx-auto px-6 md:px-8">
        <Reveal>
          <div className="flex items-end justify-between mb-12 md:mb-16">
            <SectionHead ord="02" label="case studies" />
            <span className="font-mono text-[11px]" style={{ color: 'var(--muted)' }}>
              03 entries · 1 published
            </span>
          </div>
        </Reveal>

        <div className="grid grid-cols-12 gap-6">
          {CARDS.map((c, i) => (
            <Reveal key={c.num} className="col-span-12 md:col-span-4" delay={i * 80}>
              {c.active ? (
                <Link
                  href={c.href}
                  className="case-card active block h-full p-6 md:p-7"
                  style={{ border: '1px solid var(--border)', background: 'var(--surface)' }}
                >
                  <CardInner card={c} />
                </Link>
              ) : (
                <div
                  className="case-card block h-full p-6 md:p-7 cursor-not-allowed"
                  style={{
                    border: '1px solid var(--border)',
                    background: 'var(--surface)',
                    opacity: 0.55,
                  }}
                  aria-disabled="true"
                >
                  <CardInner card={c} />
                </div>
              )}
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

function CardInner({ card }: { card: (typeof CARDS)[number] }) {
  return (
    <>
      <div className="flex items-start justify-between mb-10">
        <div
          className="font-display font-light text-[64px] leading-none"
          style={{ color: 'var(--accent)' }}
        >
          {card.num}
        </div>
        <div className="font-mono text-[10px] mt-2" style={{ color: 'var(--muted)' }}>
          {card.active ? '● published' : '○ coming soon'}
        </div>
      </div>
      <h3
        className="font-display font-light text-[26px] leading-[1.08] mb-4 whitespace-pre-line"
        style={{ color: 'var(--ink)' }}
      >
        {card.title}
      </h3>
      <p className="text-[14px] leading-[1.55] mb-8" style={{ color: 'var(--muted)' }}>
        {card.summary}
      </p>
      <div
        className="font-mono text-[11px] mb-8 pt-4"
        style={{ color: 'var(--muted)', borderTop: '1px solid var(--border)' }}
      >
        {card.meta}
      </div>
      <div
        className="font-mono text-[12px] inline-flex flex-col gap-1"
        style={{ color: card.active ? 'var(--ink)' : 'var(--muted)' }}
      >
        <span>{card.active ? '[ read → ]' : '[ coming soon ]'}</span>
        <span className="read-underline" />
      </div>
    </>
  )
}
