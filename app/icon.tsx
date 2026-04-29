import { ImageResponse } from 'next/og'

export const size = { width: 32, height: 32 }
export const contentType = 'image/png'

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 32,
          height: 32,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#151413',
        }}
      >
        <svg width="28" height="28" viewBox="0 0 28 28">
          <path d="M5 6 L2 14 L5 22" stroke="#f7f5f2" strokeWidth="1.5" fill="none" strokeLinecap="square" />
          <path d="M23 6 L26 14 L23 22" stroke="#f7f5f2" strokeWidth="1.5" fill="none" strokeLinecap="square" />
          <text x="14" y="18" textAnchor="middle" fontSize="11" fontWeight="500" fill="#f7f5f2">ac</text>
        </svg>
      </div>
    ),
    { ...size }
  )
}
