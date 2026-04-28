'use client'

import { useEffect, useRef, useState } from 'react'

interface CountUpProps {
  to: number
  suffix?: string
  prefix?: string
  duration?: number
  decimals?: number
}

export function CountUp({ to, suffix = '', prefix = '', duration = 1400, decimals = 0 }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const [val, setVal] = useState(0)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) { setVal(to); return }

    let raf: number
    let start = 0

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const animate = (ts: number) => {
              if (!start) start = ts
              const t = Math.min((ts - start) / duration, 1)
              const eased = 1 - Math.pow(1 - t, 3)
              setVal(to * eased)
              if (t < 1) raf = requestAnimationFrame(animate)
            }
            raf = requestAnimationFrame(animate)
            io.unobserve(el)
          }
        })
      },
      { threshold: 0.4 }
    )
    io.observe(el)
    return () => {
      io.disconnect()
      if (raf) cancelAnimationFrame(raf)
    }
  }, [to, duration])

  const display = decimals > 0 ? val.toFixed(decimals) : Math.round(val)
  return <span ref={ref}>{prefix}{display}{suffix}</span>
}
