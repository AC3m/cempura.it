interface ApproachStepProps {
  n: string
  title: string
  description: string
}

export function ApproachStep({ n, title, description }: ApproachStepProps) {
  return (
    <div className="grid grid-cols-12 gap-4 py-6" style={{ borderTop: '1px solid var(--border)' }}>
      <div
        className="col-span-2 md:col-span-1 font-mono text-[12px] pt-1"
        style={{ color: 'var(--accent)' }}
      >
        {n}
      </div>
      <div className="col-span-10 md:col-span-11">
        <h3
          className="font-display font-light text-[24px] md:text-[28px] leading-[1.15] mb-2"
          style={{ color: 'var(--ink)' }}
        >
          {title}
        </h3>
        <p className="text-[15px] leading-[1.6]" style={{ color: 'var(--muted)' }}>
          {description}
        </p>
      </div>
    </div>
  )
}
