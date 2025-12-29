import Image from "next/image";
import Link from "next/link";

import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Button } from "@/components/ui/Button";
import type { HeroBlock } from "@/lib/store/types";

export type HeroSectionProps = {
  block: HeroBlock;
};

export function HeroSection({ block }: HeroSectionProps) {
  return (
    <Section>
      <Container className="grid gap-10 md:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-6">
          <h1>{block.title}</h1>
          {block.subtitle ? <p className="max-w-xl">{block.subtitle}</p> : null}
          {block.cta ? (
            <Button as={Link} href={block.cta.href}>
              {block.cta.label}
            </Button>
          ) : null}
        </div>
        {block.image ? (
          <div className="relative min-h-[320px] overflow-hidden rounded-[var(--radius-lg)] bg-[var(--color-surface)] shadow-[var(--shadow-md)]">
            <Image
              src={block.image}
              alt={block.imageAlt ?? block.title}
              fill
              className="object-cover"
              sizes="(min-width: 768px) 40vw, 90vw"
            />
          </div>
        ) : null}
      </Container>
    </Section>
  );
}
