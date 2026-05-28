import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'AquaDom — дистиллированная вода с доставкой по Узбекистану'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function Image() {
  return new ImageResponse(
    (
      <div style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        background: 'linear-gradient(150deg, #071428 0%, #0D2547 55%, #123768 100%)',
        fontFamily: 'sans-serif',
        position: 'relative',
        overflow: 'hidden',
      }}>

        {/* Decorative glow circles */}
        <div style={{
          position: 'absolute', right: -120, top: -120,
          width: 520, height: 520,
          borderRadius: '50%',
          background: 'rgba(26,111,176,0.25)',
          display: 'flex',
        }}/>
        <div style={{
          position: 'absolute', right: 80, top: 60,
          width: 260, height: 260,
          borderRadius: '50%',
          background: 'rgba(37,133,204,0.15)',
          display: 'flex',
        }}/>
        <div style={{
          position: 'absolute', left: -80, bottom: -80,
          width: 380, height: 380,
          borderRadius: '50%',
          background: 'rgba(26,111,176,0.12)',
          display: 'flex',
        }}/>

        <div style={{
          display: 'flex',
          flexDirection: 'column',
          padding: '64px 80px',
          flex: 1,
          justifyContent: 'space-between',
          position: 'relative',
        }}>

          {/* Top: logo + domain */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
              <svg width="56" height="60" viewBox="0 0 92 92" fill="none">
                <path d="M46 5C20 27 8 49 8 63C8 77 25 90 46 90C67 90 84 77 84 63C84 49 72 27 46 5Z" fill="#2585CC"/>
                <polygon points="32,55 46,40 60,55" fill="white"/>
                <rect x="32" y="54" width="28" height="22" fill="white"/>
                <rect x="40" y="64" width="12" height="12" rx="3" fill="#2585CC"/>
              </svg>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <span style={{ fontSize: 38, fontWeight: 800, color: 'white', lineHeight: 1, letterSpacing: -1 }}>AquaDom</span>
                <span style={{ fontSize: 17, color: 'rgba(255,255,255,0.45)', letterSpacing: 1 }}>aquadom.uz</span>
              </div>
            </div>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              background: 'rgba(37,133,204,0.25)',
              border: '1px solid rgba(96,180,247,0.3)',
              borderRadius: 30,
              padding: '8px 22px',
            }}>
              <span style={{ fontSize: 17, color: 'rgba(255,255,255,0.7)', fontWeight: 500 }}>Производитель · ГОСТ · pH = 0</span>
            </div>
          </div>

          {/* Center: main headline */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
            <div style={{
              fontSize: 76,
              fontWeight: 800,
              color: 'white',
              lineHeight: 1.05,
              letterSpacing: -2,
            }}>
              Дистиллированная<br/>
              <span style={{ color: '#60B4F7' }}>вода для техники</span>
            </div>
            <div style={{ fontSize: 27, color: 'rgba(255,255,255,0.55)', letterSpacing: 0 }}>
              Увлажнители · Утюги · Аккумуляторы · Радиаторы
            </div>
          </div>

          {/* Bottom: price + phone */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              background: 'rgba(26,111,176,0.4)',
              border: '1.5px solid rgba(96,180,247,0.45)',
              borderRadius: 14,
              padding: '14px 30px',
            }}>
              <span style={{ fontSize: 22, color: 'rgba(255,255,255,0.6)', fontWeight: 500 }}>от</span>
              <span style={{ fontSize: 32, color: 'white', fontWeight: 800 }}>30 000 сум</span>
              <span style={{ fontSize: 18, color: 'rgba(255,255,255,0.5)', marginLeft: 4 }}>/ 1.5 л</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 6 }}>
              <span style={{ fontSize: 28, color: 'white', fontWeight: 700 }}>+998 90 186 01 28</span>
              <span style={{ fontSize: 17, color: 'rgba(255,255,255,0.45)' }}>Доставка по всему Узбекистану</span>
            </div>
          </div>

        </div>
      </div>
    ),
    { ...size }
  )
}
