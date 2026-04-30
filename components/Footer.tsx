export function Footer() {
  return (
    <footer className="border-t" style={{ borderColor: 'var(--border)' }}>
      <div className="max-w-[1280px] mx-auto px-6 md:px-8 py-16 md:py-24">
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-12 md:col-span-4">
            <div className="ord mb-4">contact</div>
            <ul className="space-y-2 text-[15px]" style={{ color: 'var(--ink)' }}>
              <li><a className="ilink" href="mailto:artur@cempura.it">artur@cempura.it</a></li>
              <li>
                <a className="ilink" href="https://linkedin.com/in/arturcempura" target="_blank" rel="noreferrer">
                  linkedin.com/in/arturcempura
                </a>
              </li>
              <li>
                <a className="ilink" href="https://github.com/AC3m" target="_blank" rel="noreferrer">
                  github.com/AC3m
                </a>
              </li>
            </ul>
          </div>

          <div className="col-span-6 md:col-span-4">
            <div className="ord mb-4">meta</div>
            <ul className="space-y-2 font-mono text-[12px]" style={{ color: 'var(--muted)' }}>
              <li>last updated: 2026-04-29</li>
              <li>version: v1.2.0</li>
              <li>uptime: 100%</li>
            </ul>
          </div>

          <div className="col-span-6 md:col-span-4">
            <div className="ord mb-4">colophon</div>
            <p className="font-mono text-[12px] leading-[1.7]" style={{ color: 'var(--muted)' }}>
              set in fraunces, inter, jetbrains mono · built with next.js, tailwind, css transitions
            </p>
          </div>
        </div>

        <div
          className="mt-20 pt-6 flex items-center justify-between font-mono text-[12px]"
          style={{ borderTop: '1px solid var(--border)', color: 'var(--muted)' }}
        >
          <span>
            <span style={{ color: 'var(--ink)' }} className="cursor-blink-signal">
              $ end_of_line
            </span>
          </span>
          <span>© 2026 — krakow / pl</span>
        </div>
      </div>
    </footer>
  )
}
