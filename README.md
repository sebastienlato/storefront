# Storefront Framework

Premium, reusable, config-driven storefront framework built with Next.js App Router, Tailwind CSS, and TypeScript.

## Scripts

- `npm run dev` - local dev server
- `npm run lint` - lint the codebase
- `npm run build` - production build

## Structure (Phase 0)

- `app/` Next.js routes (App Router)
- `components/` UI, layout, blocks, commerce
- `data/stores/<store-id>/` per-store JSON datasets (scaffolded)
- `public/stores/<store-id>/` per-store assets (scaffolded)
- `lib/` store loader, commerce helpers, SEO utilities

## Notes

- store-a is sample data only and “no code should assume store-a”.
- Store-specific content, products, and theme tokens live in data folders, not in components.
- See `plan.md`, `architecture.md`, and `AGENTS.md` for contribution rules and phase guidance.

## Switching store

- STORE_ID=store-a npm run dev
- STORE_ID=store-b npm run dev
