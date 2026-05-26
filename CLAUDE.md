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

- **`app/page.js`** — Landing page with subscription calculator and order form. Fully client-side (`'use client'`). Contains all CSS inline in a `<style>` tag. The calculator lets users pick container size (1.5/3/5/10 L), delivery frequency, and subscription duration with discount tiers (5%/10%/15% for 3/6/12-month subscriptions). Form submission hits `/api/order`.

- **`app/catalog/page.js`** — Product catalog fetching from Sanity at runtime via the client-side Sanity client. Filters by category using the product schema's category values.

- **`app/studio/[[...tool]]`** — Embedded Sanity Studio served at `/studio`.

### API Routes

- **`app/api/order/route.js`** — Handles new orders: generates a 6-digit order number (`Date.now().toString().slice(-6)`), persists to Supabase (optional), sends admin notification to Telegram with slash-command status shortcuts, optionally sends customer confirmation if they provided a Telegram username.

- **`app/api/webhook/route.js`** — Telegram bot webhook. Handles two contexts:
  - **Private chats**: `/start` greeting; users enter 6-digit order number to link their Telegram ID to the order in Supabase for status notifications.
  - **Admin chat**: Commands `/принят`, `/в_пути`, `/доставлен`, `/отменён` followed by order number update the order status and notify the customer via Telegram.

### Sanity

- **`sanity.config.js`** — Has **hardcoded** `projectId: 'u9a9j56i'` and `dataset: 'production'` for the Studio.
- **`lib/sanity.js`** — Client for data fetching reads from `NEXT_PUBLIC_SANITY_PROJECT_ID` and `NEXT_PUBLIC_SANITY_DATASET` env vars.
- **`sanity/schema/product.js`** — Product document type with: name, slug, category (distilled/double/triple/electrolyte/silver/bulk), volume, price, oldPrice, image, inStock, description, specs (key-value array), uzumUrl, and SEO fields.

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

### Styling

All CSS is written as inline `<style>` tag strings inside JSX. CSS custom properties are defined in `:root` (primary color `--blue: #1A6FB0`). No CSS modules, Tailwind, or external CSS files.
