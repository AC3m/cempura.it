import { CountUp } from '../CountUp'

interface StatProps {
  from?: number
  to: number
  suffix?: string
  prefix?: string
  label: string
  duration?: number
}

export function Stat({ from, to, suffix = '', prefix = '', label, duration = 1400 }: StatProps) {
  return (
    <div className="col-span-12 md:col-span-4">
      <div className="num-callout" style={{ fontSize: 'clamp(72px, 10vw, 144px)' }}>
        {from !== undefined && (
          <>
            <CountUp to={from} duration={400} />
            {' → ~'}
          </>
        )}
        <CountUp to={to} suffix={suffix} prefix={prefix} duration={duration} />
      </div>
      <div className="mt-6 font-mono text-[12px]" style={{ color: 'var(--muted)' }}>
        {label}
      </div>
    </div>
  )
}
