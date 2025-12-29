import Image from "next/image";
import Link from "next/link";

import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Button } from "@/components/ui/Button";
import type { Collection, FeaturedCollectionsBlock } from "@/lib/store/types";

export type FeaturedCollectionsGridProps = {
  block: FeaturedCollectionsBlock;
  collections: Collection[];
};

export function FeaturedCollectionsGrid({
  block,
  collections,
}: FeaturedCollectionsGridProps) {
  return (
    <Section>
      <Container className="space-y-10">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="space-y-3">
            {block.title ? <h2>{block.title}</h2> : null}
            {block.subtitle ? <p className="max-w-2xl">{block.subtitle}</p> : null}
          </div>
          {block.cta ? (
            <Button as={Link} href={block.cta.href} variant="ghost">
              {block.cta.label}
            </Button>
          ) : null}
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          {collections.map((collection) => (
            <Link
              key={collection.id}
              href={`/collections/${collection.handle}`}
              className="group rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-surface)] p-6 transition hover:-translate-y-1 hover:shadow-[var(--shadow-md)]"
            >
              <div className="relative mb-5 h-56 w-full overflow-hidden rounded-[var(--radius-md)] bg-[var(--color-bg)]">
                {collection.image ? (
                  <Image
                    src={collection.image}
                    alt={collection.title}
                    fill
                    className="object-cover transition duration-300 group-hover:scale-[1.02]"
                    sizes="(min-width: 768px) 45vw, 90vw"
                  />
                ) : null}
              </div>
              <div className="space-y-2">
                <div className="text-xs uppercase tracking-[0.2em] text-[var(--color-muted)]">
                  {collection.title}
                </div>
                {collection.description ? (
                  <p className="text-sm text-[var(--color-muted)]">
                    {collection.description}
                  </p>
                ) : null}
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </Section>
  );
}
