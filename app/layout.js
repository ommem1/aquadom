import './globals.css'

export const metadata = {
  metadataBase: new URL('https://aquadom.uz'),
  title: 'AquaDom — Дистиллированная вода с доставкой по Узбекистану',
  description: 'Дистиллированная вода для увлажнителей, утюгов, аккумуляторов и радиаторов. Доставка по всему Узбекистану. Подписка или разовый заказ.',
  keywords: 'дистиллированная вода Ташкент, дистиллят доставка Узбекистан, вода для аккумулятора, вода для увлажнителя, вода для утюга, купить дистиллят',
  authors: [{ name: 'AquaDom' }],
  alternates: {
    canonical: 'https://aquadom.uz',
  },
  openGraph: {
    title: 'AquaDom — Дистиллированная вода с доставкой',
    description: 'Дистиллированная вода для техники. Доставка по всему Узбекистану.',
    url: 'https://aquadom.uz',
    siteName: 'AquaDom',
    locale: 'ru_UZ',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AquaDom — Дистиллированная вода с доставкой',
    description: 'Дистиллированная вода для техники. Доставка по всему Узбекистану.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="ru">
      <head>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          "name": "AquaDom",
          "description": "Дистиллированная вода для техники с доставкой по Узбекистану. Собственное производство, ГОСТ.",
          "url": "https://aquadom.uz",
          "image": "https://aquadom.uz/opengraph-image",
          "telephone": "+998901860128",
          "address": {
            "@type": "PostalAddress",
            "addressCountry": "UZ",
            "addressLocality": "Ташкент"
          },
          "areaServed": {
            "@type": "Country",
            "name": "Узбекистан"
          },
          "priceRange": "30000-85000 UZS",
          "sameAs": ["https://t.me/aquadomm_bot"],
          "hasOfferCatalog": {
            "@type": "OfferCatalog",
            "name": "Дистиллированная вода",
            "itemListElement": [
              {
                "@type": "Offer",
                "name": "Дистиллированная вода 1.5 л",
                "price": "30000",
                "priceCurrency": "UZS",
                "availability": "https://schema.org/InStock",
                "seller": { "@type": "Organization", "name": "AquaDom" }
              },
              {
                "@type": "Offer",
                "name": "Дистиллированная вода 3 л",
                "price": "58000",
                "priceCurrency": "UZS",
                "availability": "https://schema.org/InStock",
                "seller": { "@type": "Organization", "name": "AquaDom" }
              },
              {
                "@type": "Offer",
                "name": "Дистиллированная вода 5 л",
                "price": "65000",
                "priceCurrency": "UZS",
                "availability": "https://schema.org/InStock",
                "seller": { "@type": "Organization", "name": "AquaDom" }
              },
              {
                "@type": "Offer",
                "name": "Дистиллированная вода 10 л",
                "price": "85000",
                "priceCurrency": "UZS",
                "availability": "https://schema.org/InStock",
                "seller": { "@type": "Organization", "name": "AquaDom" }
              }
            ]
          }
        })}} />
      </head>
      <body>{children}</body>
    </html>
  )
}
