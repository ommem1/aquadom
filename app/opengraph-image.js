import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'AquaDom — дистиллированная вода с доставкой по Узбекистану'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(160deg, #071428 0%, #0D2547 50%, #123768 100%)',
          fontFamily: 'sans-serif',
          padding: 80,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 20, marginBottom: 40 }}>
          <svg width="84" height="90" viewBox="0 0 84 90" fill="none">
            <path d="M42 5C20 27 8 49 8 63C8 77 24 90 42 90C60 90 76 77 76 63C76 49 64 27 42 5Z" fill="#2585CC" />
            <polygon points="28,57 42,42 56,57" fill="white" />
            <rect x="28" y="56" width="28" height="22" fill="white" />
            <rect x="37" y="65" width="12" height="13" rx="3" fill="#2585CC" />
          </svg>
          <div style={{ fontSize: 56, fontWeight: 800, color: 'white', letterSpacing: -2 }}>
            AquaDom
          </div>
        </div>
        <div
          style={{
            fontSize: 64,
            fontWeight: 800,
            color: 'white',
            textAlign: 'center',
            lineHeight: 1.1,
            letterSpacing: -2,
            marginBottom: 28,
          }}
        >
          Дистиллированная вода
          <br />
          <span style={{ color: '#60B4F7' }}>для техники</span>
        </div>
        <div style={{ fontSize: 30, color: 'rgba(255,255,255,0.65)', textAlign: 'center' }}>
          Доставка по всему Узбекистану · ГОСТ
        </div>
      </div>
    ),
    { ...size }
  )
}
