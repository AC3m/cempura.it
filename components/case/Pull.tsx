export function Pull({ children }: { children: React.ReactNode }) {
  return (
    <p
      className="pull max-w-[22ch]"
      style={{ fontSize: 'clamp(36px, 5.6vw, 84px)', color: 'var(--ink)' }}
    >
      {children}
    </p>
  )
}
