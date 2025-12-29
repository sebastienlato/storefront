import type { Metadata } from "next";

import { CheckoutConfirmation } from "@/components/commerce/CheckoutConfirmation";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { getStore } from "@/lib/store/getStore";

export const generateMetadata = async (): Promise<Metadata> => {
  const { config } = await getStore();

  return {
    title: `${config.commerce.checkout.confirmation.title} | ${config.brand.name}`,
  };
};

export default async function CheckoutConfirmationPage() {
  const { config } = await getStore();

  return (
    <Section>
      <Container>
        <CheckoutConfirmation commerce={config.commerce} />
      </Container>
    </Section>
  );
}
