import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import type { TestimonialBlock } from "@/lib/store/types";

export type TestimonialsProps = {
  block: TestimonialBlock;
};

export function Testimonials({ block }: TestimonialsProps) {
  return (
    <Section>
      <Container className="space-y-10">
        {block.title ? <h2>{block.title}</h2> : null}
        <div className="grid gap-6 md:grid-cols-2">
          {block.items.map((item, index) => (
            <figure
              key={`${item.name}-${index}`}
              className="rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-surface)] p-6"
            >
              <blockquote className="text-lg text-[var(--color-fg)]">
                “{item.quote}”
              </blockquote>
              <figcaption className="mt-6 text-xs uppercase tracking-[0.2em] text-[var(--color-muted)]">
                {item.name}
                {item.role ? `, ${item.role}` : ""}
              </figcaption>
            </figure>
          ))}
        </div>
      </Container>
    </Section>
  );
}
