import { ImageResponse } from 'next/og'

export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 1200,
          height: 630,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: '#151413',
          padding: '80px',
          fontFamily: 'serif',
        }}
      >
        <div style={{ color: '#7a756d', fontSize: 16, fontFamily: 'monospace' }}>cempura.it</div>
        <div>
          <div style={{ color: '#c9a87c', fontSize: 18, fontFamily: 'monospace', marginBottom: 32 }}>
            engineering lead · ai enablement
          </div>
          <div
            style={{
              color: '#f7f5f2',
              fontSize: 72,
              fontWeight: 300,
              lineHeight: 0.95,
              letterSpacing: '-0.04em',
            }}
          >
            Building the systems that make engineering teams faster.
          </div>
        </div>
        <div style={{ color: '#7a756d', fontSize: 14, fontFamily: 'monospace' }}>
          krakow / poland · artur cempura
        </div>
      </div>
    ),
    { ...size }
  )
}
