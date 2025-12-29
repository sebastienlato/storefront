import type { Metadata } from "next";

import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { getStore } from "@/lib/store/getStore";
import type { ContentBlock } from "@/lib/store/types";

export const generateMetadata = async (): Promise<Metadata> => {
  const { content, config } = await getStore();

  return {
    title: content.about.seo.title,
    description: content.about.seo.description ?? config.brand.description,
  };
};

const renderBlock = (block: ContentBlock) => {
  if (block.type === "rich-text") {
    return (
      <div key={block.id} className="space-y-4">
        {block.title ? <h1>{block.title}</h1> : null}
        {block.paragraphs.map((paragraph, index) => (
          <p key={`${block.id}-${index}`}>{paragraph}</p>
        ))}
      </div>
    );
  }

  return null;
};

export default async function AboutPage() {
  const { content } = await getStore();

  return (
    <Section>
      <Container className="space-y-10">
        {content.about.blocks.map((block) => renderBlock(block))}
      </Container>
    </Section>
  );
}
