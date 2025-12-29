import type { Metadata } from "next";

import { CheckoutFlow } from "@/components/commerce/CheckoutFlow";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { getStore } from "@/lib/store/getStore";

export const generateMetadata = async (): Promise<Metadata> => {
  const { config } = await getStore();

  return {
    title: `${config.commerce.checkout.title} | ${config.brand.name}`,
  };
};

export default async function CheckoutPage() {
  const { products, config } = await getStore();

  return (
    <Section>
      <Container>
        <CheckoutFlow
          products={products}
          commerce={config.commerce}
          storeId={config.id}
        />
      </Container>
    </Section>
  );
}
