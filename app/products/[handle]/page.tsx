import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ProductGallery } from "@/components/commerce/ProductGallery";
import { ProductPurchasePanel } from "@/components/commerce/ProductPurchasePanel";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { getStore } from "@/lib/store/getStore";

type ProductPageProps = {
  params: Promise<{ handle: string }>;
};

export const generateMetadata = async ({
  params,
}: ProductPageProps): Promise<Metadata> => {
  const { handle } = await params;
  const { products, config } = await getStore();
  const product = products.find((item) => item.handle === handle);

  if (!product) {
    return {
      title: config.brand.name,
    };
  }

  return {
    title: product.metadata?.seoTitle ?? `${product.title} | ${config.brand.name}`,
    description: product.metadata?.seoDescription ?? product.description,
  };
};

export default async function ProductPage({ params }: ProductPageProps) {
  const { handle } = await params;
  const { products, config } = await getStore();
  const product = products.find((item) => item.handle === handle);

  if (!product) {
    notFound();
  }

  return (
    <Section>
      <Container className="grid gap-10 md:grid-cols-[1.1fr_0.9fr]">
        <ProductGallery
          images={product.images}
          alt={product.title}
          storeId={config.id}
        />
        <div className="space-y-6">
          <div className="space-y-4">
            <h1>{product.title}</h1>
            <p className="max-w-xl">{product.description}</p>
          </div>
          <ProductPurchasePanel
            product={product}
            storeId={config.id}
            addToCartLabel={config.commerce.ctas.addToCart.label}
            addToCartSuccessLabel={config.commerce.ctas.addToCart.successLabel}
          />
        </div>
      </Container>
    </Section>
  );
}
