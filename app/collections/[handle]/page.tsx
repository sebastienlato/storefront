import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ProductGrid } from "@/components/commerce/ProductGrid";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { getStore } from "@/lib/store/getStore";

type CollectionPageProps = {
  params: Promise<{ handle: string }>;
};

export const generateMetadata = async ({
  params,
}: CollectionPageProps): Promise<Metadata> => {
  const { handle } = await params;
  const { collections, config } = await getStore();
  const collection = collections.find((item) => item.handle === handle);

  if (!collection) {
    return {
      title: config.brand.name,
    };
  }

  return {
    title: `${collection.title} | ${config.brand.name}`,
    description: collection.description,
  };
};

export default async function CollectionPage({ params }: CollectionPageProps) {
  const { handle } = await params;
  const { collections, products, config } = await getStore();
  const collection = collections.find((item) => item.handle === handle);

  if (!collection) {
    notFound();
  }

  const collectionProducts = products.filter((product) =>
    collection.productHandles.includes(product.handle)
  );

  return (
    <Section>
      <Container className="space-y-10">
        <div className="space-y-4">
          <h1>{collection.title}</h1>
          {collection.description ? (
            <p className="max-w-2xl">{collection.description}</p>
          ) : null}
        </div>
        <ProductGrid
          products={collectionProducts}
          storeId={config.id}
          currency={config.commerce.currency}
          locale={config.commerce.locale}
        />
      </Container>
    </Section>
  );
}
