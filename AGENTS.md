# AGENTS — Contribution & Coding Rules

This repo is a reusable storefront framework. Every change must preserve brand-agnostic, config-driven architecture.

## Golden Rules

1. **No hard-coded store-specific strings** in components/pages:
   - brand names, product names, copy, nav labels, category names, policies, testimonials, etc.
2. **No hard-coded theme values**:
   - colors, font families, radii must come from theme tokens in store config.
3. **No logic coupled to Store A**:
   - Store A is only sample data.
4. **Minimal dependencies**:
   - add a library only if it materially improves production quality and can’t be done simply.
5. Prefer **server components**; use **client components** only when necessary.

## Required Project Structure

- `app/` routes (App Router)
- `components/` split into `ui/`, `layout/`, `blocks/`, `commerce/`
- `data/stores/<id>/` contains all per-store JSON datasets
- `public/stores/<id>/` contains per-store assets (logo/images)
- `lib/` contains store loader, SEO utils, commerce helpers, etc.

## Data-Driven UI Contract

- Pages must render using:
  - `getStore()` (selected store)
  - JSON-driven content blocks
  - JSON-driven products/collections
- Components should accept props like `title`, `items`, `cta`, `images`, not fetch their own store-specific content unless they’re designated “block renderers”.

## Styling & Aesthetic Rules (Luxury)

- Use generous spacing and strong hierarchy
- Avoid heavy borders; prefer subtle separators and refined contrast
- Motion: subtle, short, and purposeful (hover/fade/slide a few px)
- Typography: consistent scale; avoid random font sizes

## Accessibility Rules

- Buttons/inputs must have labels
- Focus states visible
- Keyboard navigation works for menus, variant selectors, cart
- Semantic headings in blocks (h1 only once per page)

## Cart & Checkout Rules

- Cart persistence required (guest cart)
- Cart line items must include selected variant
- Checkout must be conversion-first and minimal friction
- Payment provider must be abstracted (Stripe-ready adapter later)

## Testing / Verification (per change)

- `npm run lint` must pass
- `npm run build` must pass
- No React hydration warnings
- Verify Store switching doesn’t break rendering

## Commit Style

Use multi-line commit commands with a concise title + bullet details, e.g.
git commit -m "feat(store): add store loader + typed config" \
 -m "- Added STORE_ID-based store selection with fallback" \
 -m "- Implemented typed schemas for store/content/products" \
 -m "- Added Store A sample dataset and assets structure"

## PR / Diff Expectations

- Keep changes small and phase-scoped
- Each phase should:
  - update only relevant layers
  - include a short notes section in the PR description explaining decisions

## If You’re Unsure

When adding a feature, ask:

- “Can Store B change this without code?”
  If not, refactor until yes.
