import { ProductCard } from "@/components/commerce/ProductCard";
import type { Product } from "@/lib/store/types";

export type ProductGridProps = {
  products: Product[];
};

export function ProductGrid({ products }: ProductGridProps) {
  return (
    <div className="grid gap-6 md:grid-cols-3">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
