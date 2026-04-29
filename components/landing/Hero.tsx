'use client'

import { useState } from 'react'
import Link from 'next/link'
import { TerminalBoot } from '../TerminalBoot'

export function Hero() {
  const [settled, setSettled] = useState(false)

  return (
    <section className="relative pt-24 md:pt-32 min-h-[100vh] flex flex-col">
      <div className="max-w-[1280px] w-full mx-auto px-6 md:px-8 flex-1 flex flex-col">

        {/* Terminal layer */}
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-12 md:col-span-5 min-h-[80px]">
            <TerminalBoot onSettle={() => setSettled(true)} />
          </div>
          <div className="hidden md:block col-span-7">
            <div
              className="font-mono text-[11px] flex justify-end gap-6"
              style={{ color: 'var(--muted)' }}
            >
              <span>lat 50.0647° n</span>
              <span>lon 19.9450° e</span>
              <span>tz utc+2</span>
            </div>
          </div>
        </div>

        {/* Display headline */}
        <div
          className={`mt-16 md:mt-24 transition-opacity duration-700 ${settled ? 'opacity-100' : 'opacity-0'}`}
        >
          <h1
            className="font-display font-light leading-[0.95]"
            style={{ fontSize: 'clamp(44px, 8vw, 132px)', color: 'var(--ink)' }}
          >
            {['Building the systems', 'that make engineering', 'teams faster.'].map((line, i) => (
              <span key={i} style={{ display: 'block' }}>
                {line}
              </span>
            ))}
          </h1>
        </div>

        {/* Subhead + CTAs */}
        <div
          className={`mt-10 md:mt-14 grid grid-cols-12 gap-6 transition-opacity duration-700 delay-200 ${
            settled ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <p
            className="col-span-12 md:col-span-7 text-[17px] md:text-[19px] leading-[1.5]"
            style={{ color: 'var(--muted)' }}
          >
            <span style={{ color: 'var(--ink)' }}>
              AI-assisted delivery, internal tooling, and team scaling
            </span>{' '}
            — for organizations that want results, not roadmaps.
          </p>
          <div className="col-span-12 md:col-span-5 flex md:justify-end items-end gap-3 flex-wrap">
            <Link href="/case/ai-adoption" className="btn-bracket">
              [ view case study <span className="arrow">→</span> ]
            </Link>
            <a href="#synek" className="btn-bracket">
              [ see SYNEK <span className="arrow">↗</span> ]
            </a>
          </div>
        </div>

        {/* Scroll cue */}
        <div
          className="mt-auto pt-16 pb-8 flex items-end justify-between font-mono text-[11px]"
          style={{ color: 'var(--muted)' }}
        >
          <span>↓ scroll · 04 sections</span>
          <span>{new Date().toISOString().slice(0, 10)} · session.live</span>
        </div>
      </div>
    </section>
  )
}
