import { ImageResponse } from 'next/og'

export const size = { width: 180, height: 180 }
export const contentType = 'image/png'

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 180,
          height: 180,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#151413',
          borderRadius: 36,
        }}
      >
        <svg width="120" height="120" viewBox="0 0 28 28">
          <path d="M5 6 L2 14 L5 22" stroke="#f7f5f2" strokeWidth="1.5" fill="none" strokeLinecap="square" />
          <path d="M23 6 L26 14 L23 22" stroke="#f7f5f2" strokeWidth="1.5" fill="none" strokeLinecap="square" />
          <line x1="11" y1="14" x2="17" y2="14" stroke="#c9a87c" strokeWidth="1" />
        </svg>
      </div>
    ),
    { ...size }
  )
}
