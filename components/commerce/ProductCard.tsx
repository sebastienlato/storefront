import Image from "next/image";
import Link from "next/link";

import { Price } from "@/components/commerce/Price";
import type { Product } from "@/lib/store/types";

export type ProductCardProps = {
  product: Product;
};

export function ProductCard({ product }: ProductCardProps) {
  return (
    <Link
      href={`/products/${product.handle}`}
      className="group space-y-4 rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-surface)] p-5 transition hover:-translate-y-1 hover:shadow-[var(--shadow-md)]"
    >
      <div className="relative h-64 overflow-hidden rounded-[var(--radius-md)] bg-[var(--color-bg)]">
        {product.images[0] ? (
          <Image
            src={product.images[0]}
            alt={product.title}
            fill
            className="object-cover transition duration-300 group-hover:scale-[1.02]"
            sizes="(min-width: 768px) 30vw, 90vw"
          />
        ) : null}
      </div>
      <div className="space-y-2">
        <div className="text-xs uppercase tracking-[0.2em] text-[var(--color-muted)]">
          {product.title}
        </div>
        <Price price={product.price} />
      </div>
    </Link>
  );
}
