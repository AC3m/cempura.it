import Link from 'next/link'

interface PrevNextItem {
  num: string
  title: string
  href?: string
}

interface PrevNextProps {
  prev?: PrevNextItem
  next?: PrevNextItem
}

export function PrevNext({ prev, next }: PrevNextProps) {
  return (
    <section className="py-16 border-t" style={{ borderColor: 'var(--border)' }}>
      <div className="max-w-[1280px] mx-auto px-6 md:px-8">
        <div className="grid grid-cols-12 gap-6">
          <div className={`col-span-12 md:col-span-4 ${prev ? 'opacity-40' : 'invisible'}`}>
            {prev && (
              <>
                <div className="ord mb-2">prev · {prev.num}</div>
                <div className="font-display text-[22px] leading-[1.15]" style={{ color: 'var(--ink)' }}>
                  {prev.title}
                </div>
                <div className="font-mono text-[11px] mt-2" style={{ color: 'var(--muted)' }}>
                  [ coming soon ]
                </div>
              </>
            )}
          </div>

          <div className="col-span-12 md:col-span-4 flex items-center justify-center">
            <Link href="/" className="btn-bracket">
              [ ← return to index ]
            </Link>
          </div>

          <div className={`col-span-12 md:col-span-4 md:text-right ${next ? 'opacity-40' : 'invisible'}`}>
            {next && (
              <>
                <div className="ord mb-2">next · {next.num}</div>
                <div className="font-display text-[22px] leading-[1.15]" style={{ color: 'var(--ink)' }}>
                  {next.title}
                </div>
                <div className="font-mono text-[11px] mt-2" style={{ color: 'var(--muted)' }}>
                  [ coming soon ]
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
