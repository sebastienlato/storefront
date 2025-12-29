# Storefront Framework — Plan

## Goal

Build a premium, production-ready, reusable eCommerce storefront framework in Next.js (App Router + Tailwind + TS) that can be rebranded into Store A / B / C by swapping config/data files (no core code changes).

## Non-Negotiables (Core Principles)

- **Brand-agnostic**: no hard-coded brand names, product names, categories, prices, color tokens, or copy in components/pages.
- **Configuration-driven**: branding, theme tokens, nav, pages, products, collections, policies, and imagery come from config/data.
- **Luxury aesthetic**: editorial layout, strong typography hierarchy, spacious composition, subtle motion, premium UI polish.
- **Scalable/reusable**: add a new store by adding a dataset/config folder + switching store id.

## Tech Constraints

- Next.js App Router
- Tailwind CSS
- TypeScript
- Alias: `@/*`
- No `src/` directory (use `/app`, `/components`, etc.)
- Keep dependencies minimal; add only what improves production quality.

---

## Milestones & Phases

### Phase 0 — Repo Setup & Guardrails

**Deliverables**

- Add the 4 guidance files (this set).
- Establish folder structure for config-driven stores.
- Add basic lint/build scripts notes.
- Add placeholder assets structure.

**Acceptance**

- Folder scaffolding exists.
- No store-specific values in code.

---

### Phase 1 — Store Config System (Multi-Store Ready)

**Deliverables**

- A **store selector** based on env var (e.g. `STORE_ID`) with safe default.
- `getStore()` server utility to load store config + dataset.
- Typed schemas/interfaces for:
  - Brand
  - Theme tokens
  - Nav/footer
  - Pages content (home/about/contact/legal)
  - Products, variants, collections
  - Promotions/banners
  - Policies/trust blocks
- Add **Store A** sample dataset (neutral/luxury demo content).

**Acceptance**

- Switching store is possible by changing `STORE_ID`.
- Rendering reads from store config only.

---

### Phase 2 — Design System & Layout Shell (Premium UI)

**Deliverables**

- Global theme tokens mapped to CSS variables (via `:root` or `[data-theme]`)
- Base layout:
  - Header (logo, nav, cart button)
  - Footer (links, support, social)
- Typography scale + spacing rules
- Reusable primitives:
  - Container
  - Section
  - Button (primary/secondary/ghost)
  - Badge
  - Card
  - Input/select
- Motion utilities (subtle transitions only)

**Acceptance**

- App looks premium with sample content.
- Theme tokens fully driven by config (colors, fonts, radii).

---

### Phase 3 — Content Blocks (Reusable Marketing Components)

**Deliverables (brand-agnostic blocks)**

- HeroSection
- FeaturedCollectionsGrid
- ProductCard + ProductGrid
- FeatureHighlights
- Testimonials
- TrustBar (shipping/returns/guarantee)
- PromoBanner
- CTASection

**Acceptance**

- Homepage is assembled from config-defined blocks.
- No hard-coded copy.

---

### Phase 4 — Catalog + Product Detail (Variants Ready)

**Deliverables**

- Collection page (category/collection)
- Product detail page:
  - Gallery
  - Price display
  - Variant selector (size/color/options)
  - Inventory-ready fields (inStock, sku, qty optional)
  - Add to cart
- SEO metadata per store + per product (server metadata)

**Acceptance**

- Product pages render purely from dataset.
- Variants selectable and reflected in cart line item.

---

### Phase 5 — Cart System (Persistent + Reliable)

**Deliverables**

- Cart store with persistence:
  - LocalStorage for guest carts (client)
  - Server-safe hydration
- Cart drawer/page:
  - Update quantity
  - Remove item
  - Subtotal
  - Promo code placeholder (configurable rules later)
- Shipping/tax placeholders (config-driven)

**Acceptance**

- Cart persists refresh and across pages.
- Cart line items include productId + selectedVariantId + qty.

---

### Phase 6 — Checkout UX (Conversion-First, Stripe-Ready)

**Deliverables**

- Checkout page UX:
  - Steps: Contact → Shipping → Payment
  - Minimal friction, clean form UI, accessibility
- Payment integration placeholder interface:
  - `PaymentProvider` interface
  - Stripe-ready adapter stub (no secrets committed)
- Order summary + confirmation page (mocked)

**Acceptance**

- Checkout flow works end-to-end with mock provider.
- Stripe integration can be added by implementing adapter.

---

### Phase 7 — SEO, Performance, Accessibility, Polish

**Deliverables**

- Metadata: OpenGraph, Twitter cards, canonical, sitemap, robots
- Image optimization rules
- Route segment caching strategy (server components)
- Accessibility pass (focus states, labels, contrast, keyboard nav)
- Empty/loading states
- Error boundaries and not-found pages

**Acceptance**

- Lighthouse-friendly structure
- AA-ish accessibility basics
- No console errors

---

### Phase 8 — “New Store in Minutes” DX

**Deliverables**

- `data/stores/store-b` and `data/stores/store-c` examples (minimal)
- README instructions:
  - How to create a new store config
  - How to swap store id
  - Dataset schema overview

**Acceptance**

- Creating a new store is copy/rename + edit config/data only.

---

## Suggested Folder Structure

- app/
  - (store)/
    - page.tsx (home)
    - collections/[handle]/page.tsx
    - products/[handle]/page.tsx
    - cart/page.tsx
    - checkout/page.tsx
    - about/page.tsx
    - contact/page.tsx
    - legal/
      - privacy/page.tsx
      - terms/page.tsx
  - layout.tsx
  - globals.css
- components/
  - layout/
  - blocks/
  - commerce/
  - ui/
- data/
  - stores/
    - store-a/
      - store.json
      - products.json
      - collections.json
      - content.json
      - legal.json
- lib/
  - store/
  - commerce/
  - seo/
  - utils/
- public/
  - stores/
    - store-a/
      - logo.svg
      - images/...
- styles/ (optional if needed)

---

## Definition of Done

- Production-quality code, typed, organized, minimal deps
- Everything brand/product/theme/content is replaceable via config/data
- Responsive, premium UI finish
- Cart persistence + checkout UX stub
- SEO metadata and basic performance considerations
