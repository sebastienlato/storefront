import Link from "next/link";

import { Container } from "@/components/layout/Container";
import type { StoreConfig } from "@/lib/store/types";

export type FooterProps = {
  store: StoreConfig;
};

export function Footer({ store }: FooterProps) {
  return (
    <footer className="border-t border-[var(--color-border)] bg-[var(--color-surface)]">
      <Container className="grid gap-10 py-12 md:grid-cols-[2fr_1fr_1fr]">
        <div className="space-y-4">
          <div className="font-display text-sm uppercase tracking-[0.3em]">
            {store.brand.name}
          </div>
          {store.brand.tagline ? (
            <p className="text-sm text-[var(--color-muted)]">
              {store.brand.tagline}
            </p>
          ) : null}
          {store.brand.description ? (
            <p className="max-w-md text-sm text-[var(--color-muted)]">
              {store.brand.description}
            </p>
          ) : null}
        </div>
        <div className="space-y-3 text-xs uppercase tracking-[0.2em]">
          {store.navigation.footer.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="block transition hover:text-[var(--color-accent)]"
            >
              {item.label}
            </Link>
          ))}
        </div>
        <div className="space-y-3 text-xs uppercase tracking-[0.2em]">
          {(store.navigation.social ?? []).map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="block transition hover:text-[var(--color-accent)]"
            >
              {item.label}
            </Link>
          ))}
        </div>
      </Container>
    </footer>
  );
}
