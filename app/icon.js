import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const size = { width: 32, height: 32 }
export const contentType = 'image/png'

export default function Icon() {
  return new ImageResponse(
    (
      <div style={{ width: 32, height: 32, display: 'flex' }}>
        <svg width="32" height="32" viewBox="0 0 92 92" fill="none">
          <path d="M46 5C20 27 8 49 8 63C8 77 25 90 46 90C67 90 84 77 84 63C84 49 72 27 46 5Z" fill="#1A6FB0"/>
          <polygon points="32,55 46,40 60,55" fill="white"/>
          <rect x="32" y="54" width="28" height="22" fill="white"/>
          <rect x="40" y="64" width="12" height="12" rx="3" fill="#1A6FB0"/>
        </svg>
      </div>
    ),
    { ...size }
  )
}
