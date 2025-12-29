"use client";

import Link from "next/link";

import { Button } from "@/components/ui/Button";
import { StoreImage } from "@/components/ui/StoreImage";
import { getCartSubtotal, resolveCartItems } from "@/lib/commerce/cart";
import { formatMoney } from "@/lib/commerce/money";
import { useCart } from "@/lib/commerce/cart-store";
import type { Product, StoreConfig } from "@/lib/store/types";

export type CartViewProps = {
  products: Product[];
  commerce: StoreConfig["commerce"];
  storeId: string;
};

export function CartView({ products, commerce, storeId }: CartViewProps) {
  const { items, updateQuantity, removeItem } = useCart(storeId);
  const resolvedItems = resolveCartItems(items, products);
  const subtotal = getCartSubtotal(resolvedItems);
  const { currency, locale } = commerce;

  if (resolvedItems.length === 0) {
    return (
      <div className="space-y-6 rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-surface)] p-10 text-center">
        <h1>{commerce.cart.emptyTitle}</h1>
        {commerce.cart.emptyDescription ? (
          <p className="mx-auto max-w-md">{commerce.cart.emptyDescription}</p>
        ) : null}
        {commerce.ctas.continueShopping ? (
          <Button as={Link} href={commerce.ctas.continueShopping.href}>
            {commerce.ctas.continueShopping.label}
          </Button>
        ) : null}
      </div>
    );
  }

  return (
    <div className="grid gap-10 lg:grid-cols-[1.4fr_0.6fr]">
      <div className="space-y-6">
        <h1>{commerce.cart.title}</h1>
        <div className="space-y-6">
          {resolvedItems.map(({ line, product, variant }) => (
            <div
              key={`${line.productId}-${line.variantId}`}
              className="flex flex-col gap-6 rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-surface)] p-6 md:flex-row"
            >
              <div className="relative h-40 w-full overflow-hidden rounded-[var(--radius-md)] bg-[var(--color-bg)] md:h-32 md:w-32">
                <StoreImage
                  storeId={storeId}
                  src={product.images[0]}
                  alt={product.title}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="flex-1 space-y-4">
                <div className="space-y-2">
                  <div className="text-xs uppercase tracking-[0.2em] text-[var(--color-muted)]">
                    {product.title}
                  </div>
                  <div className="text-sm text-[var(--color-muted)]">
                    {variant.options.map((option, index) => (
                      <span key={`${variant.id}-${option.name}`}>
                        {option.name}: {option.value}
                        {index < variant.options.length - 1 ? " · " : ""}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex flex-wrap items-center gap-4">
                  <div className="text-xs uppercase tracking-[0.2em] text-[var(--color-muted)]">
                    {commerce.cart.quantityLabel}
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      aria-label={commerce.cart.decreaseLabel}
                      className="h-9 w-9 rounded-[var(--radius-pill)] border border-[var(--color-border)] text-sm text-[var(--color-muted)]"
                      onClick={() =>
                        updateQuantity(
                          line.productId,
                          line.variantId,
                          line.quantity - 1
                        )
                      }
                    >
                      -
                    </button>
                    <span className="min-w-[2ch] text-center text-sm">
                      {line.quantity}
                    </span>
                    <button
                      type="button"
                      aria-label={commerce.cart.increaseLabel}
                      className="h-9 w-9 rounded-[var(--radius-pill)] border border-[var(--color-border)] text-sm text-[var(--color-muted)]"
                      onClick={() =>
                        updateQuantity(
                          line.productId,
                          line.variantId,
                          line.quantity + 1
                        )
                      }
                    >
                      +
                    </button>
                  </div>
                </div>
                <button
                  type="button"
                  className="text-xs uppercase tracking-[0.2em] text-[var(--color-muted)]"
                  onClick={() => removeItem(line.productId, line.variantId)}
                >
                  {commerce.cart.removeLabel}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="space-y-6 rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-surface)] p-6">
        <div className="space-y-2">
          <div className="text-xs uppercase tracking-[0.2em] text-[var(--color-muted)]">
            {commerce.cart.subtotalLabel}
          </div>
          <div className="text-2xl text-[var(--color-fg)]">
            {formatMoney(subtotal, { currency, locale })}
          </div>
        </div>
        <div className="space-y-3">
          <label
            htmlFor="promo-code"
            className="text-xs uppercase tracking-[0.2em] text-[var(--color-muted)]"
          >
            {commerce.cart.promoLabel}
          </label>
          <div className="flex gap-2">
            <input
              id="promo-code"
              name="promo-code"
              placeholder={commerce.cart.promoPlaceholder}
              className="flex-1 rounded-[var(--radius-pill)] border border-[var(--color-border)] bg-[var(--color-bg)] px-4 py-2 text-sm text-[var(--color-fg)]"
            />
            <Button type="button" variant="ghost">
              {commerce.cart.promoApplyLabel}
            </Button>
          </div>
        </div>
        <Button as={Link} href={commerce.ctas.checkout.href}>
          {commerce.ctas.checkout.label}
        </Button>
        {commerce.ctas.continueShopping ? (
          <Button
            as={Link}
            href={commerce.ctas.continueShopping.href}
            variant="ghost"
          >
            {commerce.ctas.continueShopping.label}
          </Button>
        ) : null}
      </div>
    </div>
  );
}
