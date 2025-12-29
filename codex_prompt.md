# Codex Build Prompt — Storefront Framework

You are implementing a premium, reusable Next.js storefront framework.

## Project Context

- Next.js App Router + Tailwind + TypeScript
- No `src/`
- Alias `@/*`
- Must be configuration-driven and brand-agnostic.
- The same codebase must support Store A/B/C by swapping config/data only.

## Hard Rules (Do Not Break)

1. **No hard-coded brand/product/copy/theme values in components/pages.**
2. All display strings, nav items, policies, hero text, testimonials, promo banners come from store content JSON.
3. All theme colors/fonts/radii/spacing tokens come from store config and map to CSS variables.
4. Products/collections/variants come from JSON dataset per store.
5. The selected store is determined by `process.env.STORE_ID` with a safe fallback (e.g. `store-a`).
6. Keep dependencies minimal and justify additions in PR notes.

## Implementation Strategy

Work in small phases with clean diffs and tests/build checks. After each phase:

- summarize what changed
- list key files touched
- provide a multi-line git commit command with a concise title + bullet details

### Phase Order

0. Scaffold folders + basic types
1. Store loader + typed schemas + Store A dataset
2. Theme system with CSS variables + layout shell
3. Content blocks + config-driven homepage
4. Collections + product detail with variant selection
5. Cart store with persistence + cart page
6. Checkout UI flow + payment provider interface stub
7. SEO/perf/accessibility polish + errors/not-found
8. Store B/C minimal examples + README “new store in minutes”

## Required Interfaces (High Level)

### Store Loader

- `lib/store/getStore.ts`
  - Reads `STORE_ID`
  - Loads `data/stores/${id}/*.json`
  - Validates shape (lightweight runtime checks ok)
  - Exposes a typed `Store` object for server components

### Theme Tokens

- Store config defines tokens: colors, font family, radii, spacing, shadows
- Tokens become CSS variables on `<html data-store="...">` or `:root`
- Tailwind should use CSS vars where appropriate (e.g., `bg-[var(--color-bg)]` etc.)

### Commerce Data

- `Product` has `variants[]` (size/color/options), pricing, images, inventory-ready fields
- `Collection` references product handles/ids
- Cart line item uses productId + variantId + qty

## UX Requirements (Luxury / Editorial)

- Spacious layout, clean typography hierarchy, subtle motion
- Strong product photography
- Conversion-minded CTA patterns
- Responsive, accessible, fast

## What “Done” Looks Like

- You can create Store B by adding `data/stores/store-b/*` + assets and setting `STORE_ID=store-b`.
- No code changes required to rebrand.

## Build & Quality Checks

- Ensure `npm run lint` passes
- Ensure `npm run build` passes
- Avoid client components unless necessary (cart/variant selection)
- Prefer server components for content rendering and SEO metadata

## Output Format After Each Phase

1. Summary
2. File list (paths)
3. Notes/decisions
4. Commit command (multi-line with multiple `-m` flags)

Proceed sequentially by phases.
