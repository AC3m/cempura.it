interface CrumbProps {
  slug: string
  meta: string
}

export function Crumb({ slug, meta }: CrumbProps) {
  return (
    <div
      className="sticky top-14 z-30 crumb-blur"
      style={{ borderBottom: '1px solid var(--border)' }}
    >
      <div
        className="max-w-[1280px] mx-auto px-6 md:px-8 h-10 flex items-center justify-between font-mono text-[12px]"
        style={{ color: 'var(--muted)' }}
      >
        <span>
          <span style={{ color: 'var(--ink)' }}>$</span> cd ~/case-studies/{slug}
        </span>
        <span className="hidden md:inline">{meta}</span>
      </div>
    </div>
  )
}
