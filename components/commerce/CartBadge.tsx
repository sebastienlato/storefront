"use client";

import { useMemo } from "react";

import { useCart } from "@/lib/commerce/cart-store";

export function CartBadge() {
  const { items } = useCart();
  const count = useMemo(
    () => items.reduce((total, item) => total + item.quantity, 0),
    [items]
  );

  if (count === 0) {
    return null;
  }

  return (
    <span
      className="absolute -right-2 -top-2 flex h-5 min-w-5 items-center justify-center rounded-[var(--radius-pill)] bg-[var(--color-accent)] px-1 text-[0.65rem] text-[var(--color-bg)]"
      aria-label={`Cart contains ${count} item${count === 1 ? "" : "s"}`}
    >
      {count}
    </span>
  );
}
