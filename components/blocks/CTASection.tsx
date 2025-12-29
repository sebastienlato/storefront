import Image from "next/image";
import Link from "next/link";

import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Button } from "@/components/ui/Button";
import type { CTASectionBlock } from "@/lib/store/types";

export type CTASectionProps = {
  block: CTASectionBlock;
};

export function CTASection({ block }: CTASectionProps) {
  return (
    <Section>
      <Container>
        <div className="grid gap-10 rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-surface)] p-8 md:grid-cols-[1.2fr_0.8fr] md:p-12">
          <div className="space-y-4">
            <h2>{block.title}</h2>
            {block.description ? (
              <p className="max-w-xl text-sm">{block.description}</p>
            ) : null}
            <Button as={Link} href={block.cta.href}>
              {block.cta.label}
            </Button>
          </div>
          {block.image ? (
            <div className="relative min-h-[220px] overflow-hidden rounded-[var(--radius-md)]">
              <Image
                src={block.image}
                alt={block.imageAlt ?? block.title}
                fill
                className="object-cover"
                sizes="(min-width: 768px) 35vw, 90vw"
              />
            </div>
          ) : null}
        </div>
      </Container>
    </Section>
  );
}
