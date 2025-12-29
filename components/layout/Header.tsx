import Image from "next/image";
import Link from "next/link";

import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import type { StoreConfig } from "@/lib/store/types";

export type HeaderProps = {
  store: StoreConfig;
};

export function Header({ store }: HeaderProps) {
  return (
    <header className="border-b border-[var(--color-border)] bg-[var(--color-surface)]">
      <Container className="flex items-center justify-between py-6">
        <div className="flex items-center gap-10">
          <Link href="/" className="flex items-center gap-3">
            <Image
              src={store.brand.logoPath}
              alt={store.brand.logoAlt ?? store.brand.name}
              width={36}
              height={36}
              priority
            />
            <span className="font-display text-sm uppercase tracking-[0.3em]">
              {store.brand.name}
            </span>
          </Link>
          <nav className="hidden items-center gap-6 text-xs uppercase tracking-[0.2em] md:flex">
            {store.navigation.header.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="transition hover:text-[var(--color-accent)]"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
        <div className="flex items-center gap-3">
          <Button as={Link} href={store.ui.cartHref} variant="ghost">
            {store.ui.cartLabel}
          </Button>
        </div>
      </Container>
    </header>
  );
}
