import { ProductCard } from "@/components/commerce/ProductCard";
import type { Product } from "@/lib/store/types";

export type ProductGridProps = {
  products: Product[];
  storeId: string;
  currency: string;
  locale: string;
};

export function ProductGrid({
  products,
  storeId,
  currency,
  locale,
}: ProductGridProps) {
  return (
    <div className="grid gap-6 md:grid-cols-3">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          storeId={storeId}
          currency={currency}
          locale={locale}
        />
      ))}
    </div>
  );
}
