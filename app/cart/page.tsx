import type { Metadata } from "next";

import { CartView } from "@/components/commerce/CartView";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { getStore } from "@/lib/store/getStore";

export const generateMetadata = async (): Promise<Metadata> => {
  const { config } = await getStore();

  return {
    title: `${config.commerce.cart.title} | ${config.brand.name}`,
  };
};

export default async function CartPage() {
  const { products, config } = await getStore();

  return (
    <Section>
      <Container>
        <CartView products={products} commerce={config.commerce} />
      </Container>
    </Section>
  );
}
