import { formatMoney } from "@/lib/commerce/money";
import type { Price as PriceType } from "@/lib/store/types";

export type PriceProps = {
  price: PriceType;
  currency: string;
  locale: string;
};

const formatCompareAt = (price: PriceType, currency: string, locale: string) =>
  price.compareAt !== undefined
    ? formatMoney(price.compareAt, { currency, locale })
    : null;

export function Price({ price, currency, locale }: PriceProps) {
  const compareAt = formatCompareAt(price, currency, locale);

  return (
    <div className="flex items-center gap-3">
      <span className="text-lg text-[var(--color-fg)]">
        {formatMoney(price.current, { currency, locale })}
      </span>
      {compareAt ? (
        <span className="text-sm text-[var(--color-muted)] line-through">
          {compareAt}
        </span>
      ) : null}
    </div>
  );
}
