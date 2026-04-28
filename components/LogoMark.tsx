import Link from 'next/link'

export function LogoMark({ className = '' }: { className?: string }) {
  return (
    <Link href="/" className={`flex items-center gap-2 group ${className}`} style={{ color: 'var(--ink)' }}>
      <svg viewBox="0 0 28 28" className="w-7 h-7" aria-hidden="true">
        <path
          d="M5 6 L2 14 L5 22"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="square"
          strokeLinejoin="miter"
        />
        <path
          d="M23 6 L26 14 L23 22"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="square"
          strokeLinejoin="miter"
        />
        <text
          x="14"
          y="18"
          textAnchor="middle"
          fontFamily="var(--font-mono)"
          fontSize="11"
          fontWeight="500"
          fill="currentColor"
          letterSpacing="0"
        >
          ac
        </text>
      </svg>
      <span className="font-mono text-[12px] tracking-[0.06em]" style={{ color: 'var(--ink)' }}>
        cempura<span style={{ color: 'var(--muted)' }}>.it</span>
      </span>
    </Link>
  )
}
