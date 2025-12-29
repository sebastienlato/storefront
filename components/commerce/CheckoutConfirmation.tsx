"use client";

import Link from "next/link";
import { useEffect } from "react";

import { Button } from "@/components/ui/Button";
import { useCart } from "@/lib/commerce/cart-store";
import type { StoreConfig } from "@/lib/store/types";

export type CheckoutConfirmationProps = {
  commerce: StoreConfig["commerce"];
};

export function CheckoutConfirmation({ commerce }: CheckoutConfirmationProps) {
  const { clear } = useCart();

  useEffect(() => {
    clear();
  }, [clear]);

  return (
    <div className="space-y-6 rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-surface)] p-10 text-center">
      <h1>{commerce.checkout.confirmation.title}</h1>
      {commerce.checkout.confirmation.description ? (
        <p className="mx-auto max-w-xl">{commerce.checkout.confirmation.description}</p>
      ) : null}
      {commerce.checkout.confirmation.cta ? (
        <Button as={Link} href={commerce.checkout.confirmation.cta.href}>
          {commerce.checkout.confirmation.cta.label}
        </Button>
      ) : null}
    </div>
  );
}
