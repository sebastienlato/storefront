import { ProductCard } from "@/components/commerce/ProductCard";
import type { Product } from "@/lib/store/types";

export type ProductGridProps = {
  products: Product[];
  storeId: string;
};

export function ProductGrid({ products, storeId }: ProductGridProps) {
  return (
    <div className="grid gap-6 md:grid-cols-3">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} storeId={storeId} />
      ))}
    </div>
  );
}
