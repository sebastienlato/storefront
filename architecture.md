# Storefront Framework — Architecture

## Overview

This repo is a **multi-store, config-driven storefront framework**. The UI and routing are stable; “what the store is” (brand, theme, products, content) is loaded from per-store JSON datasets and assets.

Key property: **rebranding requires only data changes**, not code changes.

---

## Store Selection

### Mechanism

- `STORE_ID` environment variable selects which store dataset to load.
- Fallback: `store-a`.

### Why env-based?

- Simple deployment (Vercel env vars per deployment/branch).
- Enables “one codebase → many branded stores.”

---

## Data Model (per store)

Located at:

- `data/stores/<store-id>/store.json` (brand + theme tokens + nav/footer)
- `data/stores/<store-id>/content.json` (home/about/contact blocks)
- `data/stores/<store-id>/products.json`
- `data/stores/<store-id>/collections.json`
- `data/stores/<store-id>/legal.json`

Assets:

- `public/stores/<store-id>/logo.svg`
- `public/stores/<store-id>/images/...`

### Core Types (conceptual)

#### Store

- id
- brand (name, tagline, logoPath, socials)
- theme (tokens)
- navigation (header links, footer links)
- policies/trust (shipping/returns/guarantee)

#### Product

- id, handle, title, description (content-driven)
- images[] (paths relative to public)
- price (current, compareAt optional)
- variants[]:
  - id
  - options (e.g., size/color/material)
  - sku
  - inStock / inventoryQty optional
- tags, metadata (SEO fields)

#### Collection

- handle, title, description
- productIds[] or productHandles[]
- hero image optional

---

## Rendering Strategy (Next.js App Router)

### Server Components by default

- Store + content data loads on the server for SEO and performance.
- Pages compose from config-defined blocks (server).

### Client Components only when needed

- Variant selection UI interactions
- Cart store + persistence
- Checkout form steps

---

## Theme System

### Goals

- Neutral luxury base (black/white/gray) with **accent tokens per store**
- All theming controlled by config-defined tokens

### Implementation

- Map store theme tokens → CSS variables on `<html>` (or `:root`)
- Tailwind utilities reference CSS vars:
  - `bg-[var(--color-bg)]`
  - `text-[var(--color-fg)]`
  - `rounded-[var(--radius-md)]`
- Typography:
  - One serif/sans pairing configurable
  - Consistent scale and hierarchy

---

## Component Taxonomy

- `components/ui/` — primitives (Button, Input, Badge, Card, etc.)
- `components/layout/` — Header, Footer, Container, Section
- `components/blocks/` — Hero, CTA, Testimonials, FeatureHighlights, TrustBar
- `components/commerce/` — ProductCard, ProductGrid, VariantSelector, Price, Cart UI

**Rule:** components accept typed props, not embedded copy.

---

## Pages & Routes

- `/` home (block-driven)
- `/collections/[handle]`
- `/products/[handle]`
- `/cart`
- `/checkout`
- `/about`
- `/contact`
- `/legal/privacy`
- `/legal/terms`

All route content comes from store config/content + datasets.

---

## Cart Architecture

- Client-side store (small state container)
- Persistence via localStorage
- Line items:
  - productId
  - variantId
  - qty
- On render, hydrate with product/variant data from dataset

---

## Checkout Architecture (Stripe-ready)

- UI flow implemented now (contact/shipping/payment)
- Payment layer abstracted:
  - `PaymentProvider` interface
  - Stripe adapter stub (later)
- No secrets or real charges committed

---

## SEO

- Global metadata derived from store config (brand, OG defaults)
- Product metadata derived from dataset (title, description, OG image)
- Add sitemap/robots (store-aware)

---

## Error Handling

- `not-found.tsx` for missing product/collection
- `error.tsx` for route errors
- Empty states for missing config sections (fail gracefully)

---

## “New Store” Recipe

1. Copy `data/stores/store-a` → `data/stores/store-b`
2. Replace JSON values + assets in `public/stores/store-b`
3. Set `STORE_ID=store-b`
4. Deploy — no code changes
