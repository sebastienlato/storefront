"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";

import { Button } from "@/components/ui/Button";
import { getCartSubtotal, resolveCartItems } from "@/lib/commerce/cart";
import { formatMoney } from "@/lib/commerce/money";
import { useCart } from "@/lib/commerce/cart-store";
import { mockPaymentProvider } from "@/lib/commerce/payment";
import type { Product, StoreConfig } from "@/lib/store/types";

export type CheckoutFlowProps = {
  products: Product[];
  commerce: StoreConfig["commerce"];
  storeId: string;
};

export function CheckoutFlow({ products, commerce, storeId }: CheckoutFlowProps) {
  const router = useRouter();
  const { items, clear } = useCart(storeId);
  const resolvedItems = useMemo(
    () => resolveCartItems(items, products),
    [items, products]
  );
  const subtotal = getCartSubtotal(resolvedItems);
  const { currency, locale } = commerce;
  const shipping = 0;
  const tax = 0;
  const total = subtotal + shipping + tax;

  const steps = [
    { key: "contact", label: commerce.checkout.steps.contact },
    { key: "shipping", label: commerce.checkout.steps.shipping },
    { key: "payment", label: commerce.checkout.steps.payment },
  ] as const;

  const [stepIndex, setStepIndex] = useState(0);
  const [contact, setContact] = useState({ email: "", phone: "" });
  const [shippingDetails, setShippingDetails] = useState({
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    postal: "",
    country: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const goNext = () =>
    setStepIndex((current) => Math.min(current + 1, steps.length - 1));
  const goBack = () => setStepIndex((current) => Math.max(current - 1, 0));

  const handlePlaceOrder = async () => {
    if (resolvedItems.length === 0) return;
    setIsSubmitting(true);
    const intent = await mockPaymentProvider.createIntent(total, currency);
    await mockPaymentProvider.confirmIntent(intent.id);
    clear();
    router.push("/checkout/confirmation");
  };

  return (
    <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr]">
      <div className="space-y-8">
        <h1>{commerce.checkout.title}</h1>
        <div className="flex flex-wrap gap-3">
          {steps.map((step, index) => (
            <button
              key={step.key}
              type="button"
              onClick={() => setStepIndex(index)}
              className={`rounded-[var(--radius-pill)] border px-4 py-2 text-xs uppercase tracking-[0.2em] transition ${
                index === stepIndex
                  ? "border-[var(--color-accent)] text-[var(--color-fg)]"
                  : "border-[var(--color-border)] text-[var(--color-muted)]"
              }`}
            >
              {step.label}
            </button>
          ))}
        </div>
        {steps[stepIndex]?.key === "contact" ? (
          <div className="space-y-6">
            <h2>{commerce.checkout.contact.title}</h2>
            <div className="grid gap-4">
              <label className="space-y-2 text-sm">
                <span className="text-xs uppercase tracking-[0.2em] text-[var(--color-muted)]">
                  {commerce.checkout.contact.emailLabel}
                </span>
                <input
                  type="email"
                  value={contact.email}
                  onChange={(event) =>
                    setContact((current) => ({
                      ...current,
                      email: event.target.value,
                    }))
                  }
                  className="w-full rounded-[var(--radius-pill)] border border-[var(--color-border)] bg-[var(--color-bg)] px-4 py-2"
                />
              </label>
              <label className="space-y-2 text-sm">
                <span className="text-xs uppercase tracking-[0.2em] text-[var(--color-muted)]">
                  {commerce.checkout.contact.phoneLabel}
                </span>
                <input
                  type="tel"
                  value={contact.phone}
                  onChange={(event) =>
                    setContact((current) => ({
                      ...current,
                      phone: event.target.value,
                    }))
                  }
                  className="w-full rounded-[var(--radius-pill)] border border-[var(--color-border)] bg-[var(--color-bg)] px-4 py-2"
                />
              </label>
            </div>
          </div>
        ) : null}
        {steps[stepIndex]?.key === "shipping" ? (
          <div className="space-y-6">
            <h2>{commerce.checkout.shipping.title}</h2>
            <div className="grid gap-4 md:grid-cols-2">
              <label className="space-y-2 text-sm">
                <span className="text-xs uppercase tracking-[0.2em] text-[var(--color-muted)]">
                  {commerce.checkout.shipping.firstNameLabel}
                </span>
                <input
                  value={shippingDetails.firstName}
                  onChange={(event) =>
                    setShippingDetails((current) => ({
                      ...current,
                      firstName: event.target.value,
                    }))
                  }
                  className="w-full rounded-[var(--radius-pill)] border border-[var(--color-border)] bg-[var(--color-bg)] px-4 py-2"
                />
              </label>
              <label className="space-y-2 text-sm">
                <span className="text-xs uppercase tracking-[0.2em] text-[var(--color-muted)]">
                  {commerce.checkout.shipping.lastNameLabel}
                </span>
                <input
                  value={shippingDetails.lastName}
                  onChange={(event) =>
                    setShippingDetails((current) => ({
                      ...current,
                      lastName: event.target.value,
                    }))
                  }
                  className="w-full rounded-[var(--radius-pill)] border border-[var(--color-border)] bg-[var(--color-bg)] px-4 py-2"
                />
              </label>
              <label className="space-y-2 text-sm md:col-span-2">
                <span className="text-xs uppercase tracking-[0.2em] text-[var(--color-muted)]">
                  {commerce.checkout.shipping.addressLabel}
                </span>
                <input
                  value={shippingDetails.address}
                  onChange={(event) =>
                    setShippingDetails((current) => ({
                      ...current,
                      address: event.target.value,
                    }))
                  }
                  className="w-full rounded-[var(--radius-pill)] border border-[var(--color-border)] bg-[var(--color-bg)] px-4 py-2"
                />
              </label>
              <label className="space-y-2 text-sm">
                <span className="text-xs uppercase tracking-[0.2em] text-[var(--color-muted)]">
                  {commerce.checkout.shipping.cityLabel}
                </span>
                <input
                  value={shippingDetails.city}
                  onChange={(event) =>
                    setShippingDetails((current) => ({
                      ...current,
                      city: event.target.value,
                    }))
                  }
                  className="w-full rounded-[var(--radius-pill)] border border-[var(--color-border)] bg-[var(--color-bg)] px-4 py-2"
                />
              </label>
              <label className="space-y-2 text-sm">
                <span className="text-xs uppercase tracking-[0.2em] text-[var(--color-muted)]">
                  {commerce.checkout.shipping.postalLabel}
                </span>
                <input
                  value={shippingDetails.postal}
                  onChange={(event) =>
                    setShippingDetails((current) => ({
                      ...current,
                      postal: event.target.value,
                    }))
                  }
                  className="w-full rounded-[var(--radius-pill)] border border-[var(--color-border)] bg-[var(--color-bg)] px-4 py-2"
                />
              </label>
              <label className="space-y-2 text-sm md:col-span-2">
                <span className="text-xs uppercase tracking-[0.2em] text-[var(--color-muted)]">
                  {commerce.checkout.shipping.countryLabel}
                </span>
                <input
                  value={shippingDetails.country}
                  onChange={(event) =>
                    setShippingDetails((current) => ({
                      ...current,
                      country: event.target.value,
                    }))
                  }
                  className="w-full rounded-[var(--radius-pill)] border border-[var(--color-border)] bg-[var(--color-bg)] px-4 py-2"
                />
              </label>
            </div>
          </div>
        ) : null}
        {steps[stepIndex]?.key === "payment" ? (
          <div className="space-y-6">
            <h2>{commerce.checkout.payment.title}</h2>
            {commerce.checkout.payment.description ? (
              <p>{commerce.checkout.payment.description}</p>
            ) : null}
            <div className="rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-surface)] p-6">
              <div className="text-xs uppercase tracking-[0.2em] text-[var(--color-muted)]">
                {commerce.checkout.payment.title}
              </div>
            </div>
          </div>
        ) : null}
        <div className="flex flex-wrap items-center gap-3">
          {stepIndex > 0 ? (
            <Button type="button" variant="ghost" onClick={goBack}>
              {commerce.checkout.actions.backLabel}
            </Button>
          ) : null}
          {stepIndex < steps.length - 1 ? (
            <Button type="button" onClick={goNext}>
              {commerce.checkout.actions.nextLabel}
            </Button>
          ) : (
            <Button
              type="button"
              onClick={handlePlaceOrder}
              disabled={isSubmitting || resolvedItems.length === 0}
            >
              {commerce.checkout.placeOrderLabel}
            </Button>
          )}
        </div>
      </div>
      <div className="space-y-6 rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-surface)] p-6">
        <div className="space-y-2">
          <h2>{commerce.checkout.summary.title}</h2>
          {resolvedItems.length === 0 && commerce.cart.emptyDescription ? (
            <p>{commerce.cart.emptyDescription}</p>
          ) : null}
        </div>
        <div className="space-y-4">
          {resolvedItems.map(({ line, product, variant }) => (
            <div key={`${line.productId}-${line.variantId}`}>
              <div className="text-xs uppercase tracking-[0.2em] text-[var(--color-muted)]">
                {product.title}
              </div>
              <div className="text-sm text-[var(--color-muted)]">
                {variant.options.map((option, index) => (
                  <span key={`${variant.id}-${option.name}`}>
                    {option.value}
                    {index < variant.options.length - 1 ? " · " : ""}
                  </span>
                ))}
                {` · ${line.quantity}`}
              </div>
            </div>
          ))}
        </div>
        <div className="space-y-3 text-sm">
          <div className="flex items-center justify-between">
            <span>{commerce.checkout.summary.subtotalLabel}</span>
            <span>{formatMoney(subtotal, { currency, locale })}</span>
          </div>
          <div className="flex items-center justify-between text-[var(--color-muted)]">
            <span>{commerce.checkout.summary.shippingLabel}</span>
            <span>{formatMoney(shipping, { currency, locale })}</span>
          </div>
          <div className="flex items-center justify-between text-[var(--color-muted)]">
            <span>{commerce.checkout.summary.taxLabel}</span>
            <span>{formatMoney(tax, { currency, locale })}</span>
          </div>
          <div className="flex items-center justify-between text-base">
            <span>{commerce.checkout.summary.totalLabel}</span>
            <span>{formatMoney(total, { currency, locale })}</span>
          </div>
        </div>
        {commerce.ctas.continueShopping ? (
          <Button as={Link} href={commerce.ctas.continueShopping.href} variant="ghost">
            {commerce.ctas.continueShopping.label}
          </Button>
        ) : null}
      </div>
    </div>
  );
}
