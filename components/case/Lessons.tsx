interface Lesson {
  bold: string
  text: string
}

export function Lessons({ items }: { items: Lesson[] }) {
  return (
    <ul className="space-y-5 text-[15px] leading-[1.65]" style={{ color: 'var(--muted)' }}>
      {items.map((item, i) => (
        <li key={i} className="flex gap-4">
          <span className="font-mono text-[11px] pt-1.5" style={{ color: 'var(--accent)' }}>
            —
          </span>
          <span>
            <span style={{ color: 'var(--ink)' }}>{item.bold}</span> {item.text}
          </span>
        </li>
      ))}
    </ul>
  )
}
