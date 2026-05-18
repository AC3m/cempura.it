'use client'

import { useEffect, useRef } from 'react'
import { useTheme } from 'next-themes'
import { Reveal } from '../Reveal'
import { SectionHead } from '../SectionHead'

export function SynekSection() {
  const visualRef = useRef<HTMLDivElement>(null)
  const { resolvedTheme } = useTheme()
  const isDark = resolvedTheme === 'dark'

  useEffect(() => {
    const el = visualRef.current
    if (!el) return
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) return

    const onScroll = () => {
      const rect = el.getBoundingClientRect()
      const mid = window.innerHeight / 2
      const delta = (rect.top + rect.height / 2 - mid) / window.innerHeight
      el.style.transform = `translateY(${(-delta * 16).toFixed(2)}px)`
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <section
      id="synek"
      className="py-[96px] md:py-[160px] border-t"
      style={{ borderColor: 'var(--border)' }}
    >
      <div className="max-w-[1280px] mx-auto px-6 md:px-8">
        <Reveal>
          <SectionHead ord="01" label="featured / live project" className="mb-12 md:mb-16" />
        </Reveal>

        <div className="grid grid-cols-12 gap-6 md:gap-8 items-start">
          <Reveal className="col-span-12 md:col-span-5">
            <div className="font-mono text-[11px] mb-6" style={{ color: 'var(--accent)' }}>
              ● live · synek.app
            </div>
            <h2 className="synek-lockup mb-6">
              <span className="synek-mark" aria-hidden="true">
                <span className="sq sq-a" />
                <span className="sq sq-b" />
              </span>
              <span className="synek-word">SYNEK</span>
            </h2>
            <p
              className="text-[17px] leading-[1.55] mb-8 max-w-[44ch]"
              style={{ color: 'var(--muted)' }}
            >
              <span style={{ color: 'var(--ink)' }}>A side project for coaches and athletes</span>{' '}
              — replacing spreadsheets and manual Strava copy-paste with a single, opinionated
              workspace.
            </p>

            <div className="flex flex-wrap gap-2 mb-3">
              {['React Router 7', 'Supabase', 'TypeScript', 'Claude Code'].map((s) => (
                <span key={s} className="chip">
                  {s}
                </span>
              ))}
            </div>
            <div
              className="font-mono text-[11px] mb-10"
              style={{ color: 'var(--muted)' }}
            >
              ↳ Strava integration
            </div>

            <div
              className="flex flex-col gap-3 font-mono text-[12px] mb-8"
              style={{ color: 'var(--muted)' }}
            >
              <div className="flex justify-between">
                <span>founded</span>
                <span style={{ color: 'var(--ink)' }}>2026</span>
              </div>
              <div className="flex justify-between">
                <span>role</span>
                <span style={{ color: 'var(--ink)' }}>solo · design + build</span>
              </div>
              <div className="flex justify-between">
                <span>stage</span>
                <span style={{ color: 'var(--ink)' }}>public beta</span>
              </div>
            </div>

            <a href="https://synek.app" className="btn-bracket" target="_blank" rel="noreferrer">
              [ visit <span className="arrow">↗</span> ]
            </a>
          </Reveal>

          <Reveal className="col-span-12 md:col-span-7" delay={120}>
            <div ref={visualRef} className="will-change-transform">
              <figure className="m-0">
                <img
                  src={isDark ? '/synek-ipad-dark.png' : '/synek-ipad-light.png'}
                  alt="SYNEK — coach view on iPad Pro"
                  className="block w-full h-auto"
                  style={{
                    filter: isDark
                      ? 'drop-shadow(0 28px 50px rgba(0,0,0,0.5)) drop-shadow(0 6px 12px rgba(0,0,0,0.3))'
                      : 'drop-shadow(0 28px 50px rgba(20,20,40,0.18)) drop-shadow(0 6px 12px rgba(20,20,40,0.08))',
                  }}
                />
                <figcaption
                  className="mt-6 flex justify-between font-mono text-[11px]"
                  style={{ color: 'var(--muted)' }}
                >
                  <span>fig.01 — synek.app on iPad Pro 13&quot; · coach view · week 7/14</span>
                  <span>{isDark ? 'space black' : 'silver'}</span>
                </figcaption>
              </figure>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
