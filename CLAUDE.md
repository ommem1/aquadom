# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start dev server (Next.js on :3000, Sanity Studio at /studio)
npm run build    # Production build
npm run start    # Start production server
```

No linting or test setup exists in this project.

## Architecture

AquaDom is a distilled water delivery service for Uzbekistan (aquadom.uz). It's a Next.js 14 App Router project with an embedded Sanity Studio for product management.

### Pages

- **`app/page.js`** — Landing page. Fully client-side (`'use client'`). Sections: hero (with radial gradient blobs), stats (4.9★ Uzum rating → links to Uzum store), products grid, features (numbered 01–04), reviews carousel (8 real Uzum reviews), B2B promo card, order form, footer. Contains subscription calculator: container size (1.5/3/5/10 L), delivery frequency, subscription duration with discount tiers (5%/10%/15% for 3/6/12 months). Form hits `/api/order`.

- **`app/catalog/page.js`** — Product catalog fetching from Sanity at runtime via client-side Sanity client. Glassmorphism header, light hero with blob, pill-shaped filter tabs by category, 4-col product grid with hover-lift cards, modal for quick view. Dark `#080F1E` footer.

- **`app/catalog/[slug]/page.js`** — Individual product page. 440px image column, 40px bold price, quantity selector (44px buttons), 2-col order form (name/phone), trust badges, spec table. Same glassmorphism header and dark footer.

- **`app/b2b/page.js`** — B2B page for wholesale clients. Light hero with blobs, client type cards (52px icon box in `#EFF6FF`), numbered advantages (01–06), product cards, numbered steps (01–04), contact form, dark footer with nav links.

- **`app/studio/[[...tool]]`** — Embedded Sanity Studio served at `/studio`.

### API Routes

- **`app/api/order/route.js`** — Handles new orders: generates a 6-digit order number (`Date.now().toString().slice(-6)`), persists to Supabase (optional), sends admin notification to Telegram with slash-command status shortcuts, optionally sends customer confirmation if they provided a Telegram username.

- **`app/api/webhook/route.js`** — Telegram bot webhook. Handles two contexts:
  - **Private chats**: `/start` greeting; users enter 6-digit order number to link their Telegram ID to the order in Supabase for status notifications.
  - **Admin chat**: Commands `/принят`, `/в_пути`, `/доставлен`, `/отменён` followed by order number update the order status and notify the customer via Telegram.

### Metadata & Icons

- **`app/icon.js`** — Dynamic 32×32 PNG favicon using Next.js `ImageResponse` with AquaDom water-drop SVG logo. `runtime = 'edge'`.
- **`app/apple-icon.js`** — 180×180 Apple touch icon with white background.
- **`app/opengraph-image.js`** — 1200×630 OG image with price (от 30 000 сум), phone, usage list, decorative blobs, dark gradient background.
- **`app/layout.js`** — Root layout. JSON-LD `LocalBusiness` schema (no Product schema — avoids Google Search Console warnings about missing review/aggregateRating). Inter font loaded from Google Fonts.

### Sanity

- **`sanity.config.js`** — Hardcoded `projectId: 'u9a9j56i'` and `dataset: 'production'`. Registers `GenerateSeoAction` for product documents.
- **`lib/sanity.js`** — Client for data fetching reads from `NEXT_PUBLIC_SANITY_PROJECT_ID` and `NEXT_PUBLIC_SANITY_DATASET` env vars.
- **`sanity/schema/product.js`** — Product document type with: name, slug, category (distilled/double/triple/electrolyte/silver/bulk), volume, price, oldPrice, image, inStock, description, specs (key-value array), uzumUrl, and SEO fields (seoTitle, seoDescription, keywords).
- **`sanity/actions/generateSeo.js`** — Sanity Studio document action "Сгенерировать SEO". One click auto-fills seoTitle (≤60 chars), seoDescription (≤160 chars), and keywords from the product's name, volume, category, and price. Uses `useClient` hook and `client.patch().set().commit()`.

### Environment Variables

| Variable | Required | Purpose |
|---|---|---|
| `TELEGRAM_BOT_TOKEN` | Yes | Bot token from @BotFather |
| `TELEGRAM_ADMIN_CHAT_ID` | Yes | Chat ID that receives new order notifications |
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | Yes | Sanity project ID for catalog fetches |
| `NEXT_PUBLIC_SANITY_DATASET` | Yes | Sanity dataset (production) |
| `SUPABASE_URL` | Optional | Order persistence and status tracking |
| `SUPABASE_SERVICE_KEY` | Optional | Supabase auth key |

Supabase is optional — orders still deliver to Telegram without it. Without Supabase, order status tracking via the bot is unavailable.

### Design System

All CSS is written as inline `<style>` tag strings inside JSX. No CSS modules, Tailwind, or external CSS files (except `globals.css`).

- **Font**: Inter (loaded from Google Fonts in each page's `<style>`)
- **Primary color**: `#1A6FB0` (blue)
- **Background**: `#FAFCFF` or `#F8FAFC` for light sections, `#F0F6FF` for tinted sections
- **Footer**: `#080F1E` dark background, white text
- **Header**: Glassmorphism — `rgba(255,255,255,0.92)` + `backdrop-filter: blur(12px)`, `position: sticky`
- **Logo**: `const LOGO = (<svg .../>)` defined at top of each page file (water-drop SVG in `#1A6FB0`)
- **Hero decoration**: `position: absolute` radial gradient blobs (blue/teal, low opacity)
- **Typography**: `clamp()` for responsive headings (e.g. `clamp(44px, 7vw, 80px)` for H1)
- **Cards**: `border-radius: 20px`, hover lift `transform: translateY(-3px)` with `box-shadow` transition
- **Custom props**: `--blue: #1A6FB0`, `--dark: #0A1628`, `--text: #374151`, `--light: #F8FAFC`

### Pending / To-Do

- Add GOST certificate and business registration certificate to the website (user will discuss with owners)
- Register on 2GIS for local search in Uzbekistan
- Fill Sanity Studio products with photos, prices, uzumUrl per product
