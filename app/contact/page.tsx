import type { Metadata } from "next";

import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { getStore } from "@/lib/store/getStore";
import type { ContentBlock } from "@/lib/store/types";

export const generateMetadata = async (): Promise<Metadata> => {
  const { content, config } = await getStore();

  return {
    title: content.contact.seo.title,
    description: content.contact.seo.description ?? config.brand.description,
  };
};

const renderBlock = (block: ContentBlock) => {
  if (block.type === "contact") {
    return (
      <div key={block.id} className="space-y-6">
        {block.title ? <h1>{block.title}</h1> : null}
        <div className="grid gap-4 md:grid-cols-2">
          {block.methods.map((method) => (
            <div
              key={`${block.id}-${method.label}`}
              className="rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-surface)] p-5"
            >
              <div className="text-xs uppercase tracking-[0.2em] text-[var(--color-muted)]">
                {method.label}
              </div>
              <div className="mt-3 text-sm text-[var(--color-fg)]">
                {method.value}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return null;
};

export default async function ContactPage() {
  const { content } = await getStore();

  return (
    <Section>
      <Container className="space-y-10">
        {content.contact.blocks.map((block) => renderBlock(block))}
      </Container>
    </Section>
  );
}
