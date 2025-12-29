import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import type { FeatureGridBlock } from "@/lib/store/types";

export type FeatureHighlightsProps = {
  block: FeatureGridBlock;
};

export function FeatureHighlights({ block }: FeatureHighlightsProps) {
  return (
    <Section>
      <Container className="space-y-10">
        {block.title ? <h2>{block.title}</h2> : null}
        <div className="grid gap-6 md:grid-cols-3">
          {block.items.map((item) => (
            <div
              key={item.title}
              className="rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-surface)] p-6"
            >
              <div className="text-xs uppercase tracking-[0.2em] text-[var(--color-muted)]">
                {item.title}
              </div>
              <p className="mt-3 text-sm text-[var(--color-muted)]">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
