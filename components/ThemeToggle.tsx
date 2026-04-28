'use client'

import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  if (!mounted) return <div className="w-28 h-8" />

  return (
    <div
      className="font-mono text-[12px] tracking-[0.04em] flex items-center gap-1 select-none"
      style={{ color: 'var(--muted)' }}
    >
      <button
        onClick={() => setTheme('light')}
        className="px-1.5 py-1 transition-colors"
        style={{ color: theme === 'light' ? 'var(--ink)' : 'var(--muted)' }}
        aria-pressed={theme === 'light'}
      >
        <span className={theme === 'light' ? 'cursor-blink' : ''}>[ light ]</span>
      </button>
      <span style={{ color: 'var(--border)' }}>/</span>
      <button
        onClick={() => setTheme('dark')}
        className="px-1.5 py-1 transition-colors"
        style={{ color: theme === 'dark' ? 'var(--ink)' : 'var(--muted)' }}
        aria-pressed={theme === 'dark'}
      >
        <span className={theme === 'dark' ? 'cursor-blink' : ''}>[ dark ]</span>
      </button>
    </div>
  )
}
