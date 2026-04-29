export function OutcomeGrid({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-12 gap-8 md:gap-6">
      {children}
    </div>
  )
}
