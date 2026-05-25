export default function robots() {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '/api/',
    },
    sitemap: 'https://aquadom.uz/sitemap.xml',
    host: 'https://aquadom.uz',
  }
}
