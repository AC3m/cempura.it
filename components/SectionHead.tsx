interface SectionHeadProps {
  ord: string
  label: string
  className?: string
}

export function SectionHead({ ord, label, className = '' }: SectionHeadProps) {
  return (
    <div className={`flex items-baseline gap-3 ${className}`}>
      <span className="ord">{ord}</span>
      <span className="font-mono text-[12px] tracking-[0.06em]" style={{ color: 'var(--muted)' }}>
        — {label}
      </span>
    </div>
  )
}
