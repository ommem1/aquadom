import './globals.css'

export const metadata = {
  title: 'AquaDom — Дистиллированная вода с доставкой по Узбекистану',
  description: 'Дистиллированная вода для увлажнителей, утюгов, аккумуляторов и радиаторов. Доставка по всему Узбекистану. Подписка или разовый заказ.',
  keywords: 'дистиллированная вода Ташкент, дистиллят доставка Узбекистан, вода для аккумулятора, вода для увлажнителя, вода для утюга, купить дистиллят',
  authors: [{ name: 'AquaDom' }],
  openGraph: {
    title: 'AquaDom — Дистиллированная вода с доставкой',
    description: 'Дистиллированная вода для техники. Доставка по всему Узбекистану.',
    url: 'https://aquadom.uz',
    siteName: 'AquaDom',
    locale: 'ru_UZ',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
  },
  metadataBase: new URL('https://aquadom.uz'),
}

export default function RootLayout({ children }) {
  return (
    <html lang="ru">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          "name": "AquaDom",
          "description": "Дистиллированная вода для техники с доставкой по Узбекистану",
          "url": "https://aquadom.uz",
          "telephone": "",
          "address": {
            "@type": "PostalAddress",
            "addressCountry": "UZ",
            "addressLocality": "Ташкент"
          },
          "areaServed": "Узбекистан",
          "priceRange": "30000-85000 UZS"
        })}} />
      </head>
      <body>{children}</body>
    </html>
  )
}
