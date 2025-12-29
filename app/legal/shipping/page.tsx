import type { Metadata } from "next";

import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { getStore } from "@/lib/store/getStore";

export const generateMetadata = async (): Promise<Metadata> => {
  const { legal, config } = await getStore();

  return {
    title: `${legal.shipping.title} | ${config.brand.name}`,
  };
};

export default async function ShippingPage() {
  const { legal } = await getStore();

  return (
    <Section>
      <Container className="space-y-8">
        <div className="space-y-2">
          <h1>{legal.shipping.title}</h1>
          <p className="text-sm text-[var(--color-muted)]">
            {legal.shipping.updated}
          </p>
        </div>
        <div className="space-y-8">
          {legal.shipping.sections.map((section) => (
            <div key={section.title} className="space-y-3">
              <h2>{section.title}</h2>
              {section.body.map((paragraph, index) => (
                <p key={`${section.title}-${index}`}>{paragraph}</p>
              ))}
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
