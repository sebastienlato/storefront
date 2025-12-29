import Link from "next/link";

import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import type { PromoBannerBlock } from "@/lib/store/types";

export type PromoBannerProps = {
  block: PromoBannerBlock;
};

export function PromoBanner({ block }: PromoBannerProps) {
  return (
    <div className="border-b border-[var(--color-border)] bg-[var(--color-accent-muted)] py-3">
      <Container className="flex flex-wrap items-center justify-between gap-4 text-xs uppercase tracking-[0.2em]">
        <span>{block.text}</span>
        {block.cta ? (
          <Button as={Link} href={block.cta.href} variant="ghost">
            {block.cta.label}
          </Button>
        ) : null}
      </Container>
    </div>
  );
}
