import Link from "next/link";

import { Container } from "@/components/layout/Container";
import type { StoreConfig } from "@/lib/store/types";

export type FooterProps = {
  store: StoreConfig;
};

export function Footer({ store }: FooterProps) {
  const linkClassName = "block transition hover:text-[var(--color-accent)]";

  const renderLink = (item: { href: string; label: string }) => {
    const isExternal = /^https?:\/\//.test(item.href);

    if (isExternal) {
      return (
        <a
          key={item.href}
          href={item.href}
          target="_blank"
          rel="noreferrer"
          className={linkClassName}
        >
          {item.label}
        </a>
      );
    }

    return (
      <Link key={item.href} href={item.href} className={linkClassName}>
        {item.label}
      </Link>
    );
  };

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
          {store.navigation.footer.map((item) => renderLink(item))}
        </div>
        <div className="space-y-3 text-xs uppercase tracking-[0.2em]">
          {(store.navigation.social ?? []).map((item) => renderLink(item))}
        </div>
      </Container>
    </footer>
  );
}
