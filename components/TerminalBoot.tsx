'use client'

import { useEffect, useState } from 'react'

const LINES = [
  { kind: 'cmd' as const, text: '$ whoami' },
  { kind: 'out' as const, text: 'artur cempura' },
  { kind: 'out' as const, text: 'engineering lead · ai enablement' },
  { kind: 'out' as const, text: 'krakow / poland · hybrid · remote' },
]

interface TerminalBootProps {
  onSettle?: () => void
}

export function TerminalBoot({ onSettle }: TerminalBootProps) {
  const [shown, setShown] = useState<Array<{ kind: 'cmd' | 'out'; text: string }>>([{ kind: 'cmd', text: '' }])
  const [phase, setPhase] = useState<'typing' | 'printing' | 'done'>('typing')

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) {
      setShown([...LINES])
      setPhase('done')
      onSettle?.()
      return
    }

    let cancelled = false

    const run = async () => {
      const cmd = LINES[0].text
      for (let i = 1; i <= cmd.length; i++) {
        if (cancelled) return
        setShown([{ kind: 'cmd', text: cmd.slice(0, i) }])
        await new Promise((r) => setTimeout(r, 55))
      }
      await new Promise((r) => setTimeout(r, 520))
      setPhase('printing')

      const next: Array<{ kind: 'cmd' | 'out'; text: string }> = [{ kind: 'cmd', text: cmd }]
      for (let i = 1; i < LINES.length; i++) {
        if (cancelled) return
        next.push(LINES[i])
        setShown([...next])
        await new Promise((r) => setTimeout(r, 220))
      }
      await new Promise((r) => setTimeout(r, 280))
      if (cancelled) return
      setPhase('done')
      onSettle?.()
    }

    run()
    return () => { cancelled = true }
  }, [onSettle])

  return (
    <div className="font-mono text-[12px] leading-[1.65]" style={{ color: 'var(--muted)' }}>
      {shown.map((l, i) => (
        <div key={i}>
          <span style={{ color: l.kind === 'cmd' ? 'var(--ink)' : 'var(--muted)' }}>
            {l.text}
          </span>
          {i === shown.length - 1 && phase !== 'done' && (
            <span className="cursor-blink" />
          )}
        </div>
      ))}
    </div>
  )
}
