import Image from "next/image";

import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import type { ImageStripBlock } from "@/lib/store/types";

export type ImageStripProps = {
  block: ImageStripBlock;
};

export function ImageStrip({ block }: ImageStripProps) {
  return (
    <Section>
      <Container className="space-y-8">
        {block.title ? <h2>{block.title}</h2> : null}
        <div className="grid gap-4 md:grid-cols-3">
          {block.images.map((image, index) => (
            <div
              key={`${image.src}-${index}`}
              className="relative h-56 overflow-hidden rounded-[var(--radius-md)] bg-[var(--color-surface)]"
            >
              <Image
                src={image.src}
                alt={image.alt ?? block.title ?? ""}
                fill
                className="object-cover"
                sizes="(min-width: 768px) 30vw, 90vw"
              />
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
