import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import type { TrustBarBlock, TrustItem } from "@/lib/store/types";

export type TrustBarProps = {
  block: TrustBarBlock;
  items: TrustItem[];
};

export function TrustBar({ block, items }: TrustBarProps) {
  return (
    <Section className="py-10">
      <Container className="space-y-6">
        {block.title ? (
          <div className="text-xs uppercase tracking-[0.3em] text-[var(--color-muted)]">
            {block.title}
          </div>
        ) : null}
        <div className="grid gap-4 md:grid-cols-3">
          {items.map((item) => (
            <div
              key={item.title}
              className="rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-surface)] p-5"
            >
              <div className="text-xs uppercase tracking-[0.2em] text-[var(--color-muted)]">
                {item.title}
              </div>
              <p className="mt-2 text-sm text-[var(--color-muted)]">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
