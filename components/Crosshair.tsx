'use client'

import { useEffect, useRef, useState } from 'react'

export function Crosshair() {
  const hRef = useRef<HTMLDivElement>(null)
  const vRef = useRef<HTMLDivElement>(null)
  const [coord, setCoord] = useState({ x: 0, y: 0, visible: false })

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      if (hRef.current) hRef.current.style.top = e.clientY + 'px'
      if (vRef.current) vRef.current.style.left = e.clientX + 'px'
      setCoord({ x: e.clientX, y: e.clientY, visible: true })
    }
    const onLeave = () => setCoord((c) => ({ ...c, visible: false }))
    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseleave', onLeave)
    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseleave', onLeave)
    }
  }, [])

  return (
    <>
      <div ref={hRef} className="crosshair-h" />
      <div ref={vRef} className="crosshair-v" />
      <div
        className="fixed bottom-3 right-3 z-50 font-mono text-[11px] pointer-events-none"
        style={{
          color: 'var(--muted)',
          opacity: coord.visible ? 1 : 0,
          transition: 'opacity 200ms ease',
        }}
      >
        x:{String(coord.x).padStart(4, '0')}{'  '}y:{String(coord.y).padStart(4, '0')}
      </div>
    </>
  )
}
