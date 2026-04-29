'use client'

import { useEffect, useRef } from 'react'
import { Reveal } from '../Reveal'
import { SectionHead } from '../SectionHead'

export function SynekSection() {
  const visualRef = useRef<HTMLDivElement>(null)

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
            <h2
              className="font-display font-light leading-[0.95] mb-6"
              style={{ fontSize: 'clamp(56px, 6vw, 88px)', color: 'var(--ink)' }}
            >
              SYNEK
            </h2>
            <p
              className="text-[17px] leading-[1.55] mb-8 max-w-[44ch]"
              style={{ color: 'var(--muted)' }}
            >
              <span style={{ color: 'var(--ink)' }}>A side project for coaches and athletes</span>{' '}
              — replacing spreadsheets and manual Strava copy-paste with a single, opinionated
              workspace.
            </p>

            <div className="flex flex-wrap gap-2 mb-10">
              {['Next.js', 'Supabase', 'Vercel', 'Claude Code'].map((s) => (
                <span key={s} className="chip">
                  {s}
                </span>
              ))}
            </div>

            <div
              className="flex flex-col gap-3 font-mono text-[12px] mb-8"
              style={{ color: 'var(--muted)' }}
            >
              <div className="flex justify-between">
                <span>founded</span>
                <span style={{ color: 'var(--ink)' }}>2024</span>
              </div>
              <div className="flex justify-between">
                <span>role</span>
                <span style={{ color: 'var(--ink)' }}>solo · design + build</span>
              </div>
              <div className="flex justify-between">
                <span>stage</span>
                <span style={{ color: 'var(--ink)' }}>private beta</span>
              </div>
            </div>

            <a href="https://synek.app" className="btn-bracket" target="_blank" rel="noreferrer">
              [ visit <span className="arrow">↗</span> ]
            </a>
          </Reveal>

          <Reveal className="col-span-12 md:col-span-7" delay={120}>
            <div
              ref={visualRef}
              className="ph-rect aspect-[16/10] w-full relative will-change-transform"
            >
              <div
                className="absolute top-3 left-3 font-mono text-[10px]"
                style={{ color: 'var(--muted)' }}
              >
                synek_preview.png · 1600×1000
              </div>
              <div
                className="absolute bottom-3 right-3 font-mono text-[10px]"
                style={{ color: 'var(--accent)' }}
              >
                ⌘ + k · search
              </div>
              <div className="absolute inset-x-10 top-16 bottom-12 grid grid-cols-12 gap-3 opacity-40">
                <div className="col-span-3 border" style={{ borderColor: 'var(--border)' }} />
                <div className="col-span-9 grid grid-rows-6 gap-3">
                  <div className="row-span-2 border" style={{ borderColor: 'var(--border)' }} />
                  <div className="row-span-4 border" style={{ borderColor: 'var(--border)' }} />
                </div>
              </div>
            </div>
            <div
              className="mt-3 flex justify-between font-mono text-[11px]"
              style={{ color: 'var(--muted)' }}
            >
              <span>fig.01 — workspace shell</span>
              <span>parallax · 8px</span>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
