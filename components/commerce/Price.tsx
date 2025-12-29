import type { Price as PriceType } from "@/lib/store/types";

export type PriceProps = {
  price: PriceType;
};

const formatPrice = (price: PriceType) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: price.currency,
  }).format(price.current);

const formatCompareAt = (price: PriceType) =>
  price.compareAt !== undefined
    ? new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: price.currency,
      }).format(price.compareAt)
    : null;

export function Price({ price }: PriceProps) {
  const compareAt = formatCompareAt(price);

  return (
    <div className="flex items-center gap-3">
      <span className="text-lg text-[var(--color-fg)]">
        {formatPrice(price)}
      </span>
      {compareAt ? (
        <span className="text-sm text-[var(--color-muted)] line-through">
          {compareAt}
        </span>
      ) : null}
    </div>
  );
}
