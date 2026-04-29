import Link from 'next/link'
import { LogoMark } from './LogoMark'
import { ThemeToggle } from './ThemeToggle'

interface TopBarProps {
  showBack?: boolean
}

export function TopBar({ showBack }: TopBarProps) {
  return (
    <header
      className="fixed top-0 left-0 right-0 z-40 crumb-blur"
      style={{ borderBottom: '1px solid var(--border)' }}
    >
      <div className="max-w-[1280px] mx-auto px-6 md:px-8 h-14 flex items-center justify-between overflow-hidden">
        <LogoMark />
        <nav className="flex items-center gap-3 md:gap-6">
          {showBack && (
            <Link
              href="/"
              className="font-mono text-[12px] whitespace-nowrap"
              style={{ color: 'var(--muted)' }}
            >
              <span className="ilink">
                ← back<span className="hidden md:inline"> to index</span>
              </span>
            </Link>
          )}
          <ThemeToggle />
        </nav>
      </div>
    </header>
  )
}
