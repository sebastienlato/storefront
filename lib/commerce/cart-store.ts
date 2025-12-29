"use client";

import { useSyncExternalStore } from "react";

import type { CartLineItem } from "@/lib/commerce/cart";

const STORAGE_KEY = "storefront.cart";

let items: CartLineItem[] = [];
let loaded = false;
const listeners = new Set<() => void>();

const load = () => {
  if (loaded || typeof window === "undefined") {
    return;
  }

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as CartLineItem[];
      if (Array.isArray(parsed)) {
        items = parsed;
      }
    }
  } catch {
    items = [];
  }

  loaded = true;
};

const save = () => {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
};

const emit = () => {
  listeners.forEach((listener) => listener());
};

const setItems = (next: CartLineItem[]) => {
  items = next;
  save();
  emit();
};

const getSnapshot = () => {
  load();
  return items;
};

const getServerSnapshot = () => [] as CartLineItem[];

const subscribe = (listener: () => void) => {
  listeners.add(listener);
  return () => listeners.delete(listener);
};

const addItem = (nextItem: CartLineItem) => {
  const existingIndex = items.findIndex(
    (item) =>
      item.productId === nextItem.productId &&
      item.variantId === nextItem.variantId
  );

  if (existingIndex >= 0) {
    const updated = items.map((item, index) =>
      index === existingIndex
        ? { ...item, quantity: item.quantity + nextItem.quantity }
        : item
    );
    setItems(updated);
    return;
  }

  setItems([...items, nextItem]);
};

const updateQuantity = (productId: string, variantId: string, quantity: number) => {
  if (quantity <= 0) {
    removeItem(productId, variantId);
    return;
  }

  setItems(
    items.map((item) =>
      item.productId === productId && item.variantId === variantId
        ? { ...item, quantity }
        : item
    )
  );
};

const removeItem = (productId: string, variantId: string) => {
  setItems(
    items.filter(
      (item) => item.productId !== productId || item.variantId !== variantId
    )
  );
};

const clear = () => {
  setItems([]);
};

export const useCart = () => {
  const cartItems = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot
  );

  return {
    items: cartItems,
    addItem,
    updateQuantity,
    removeItem,
    clear,
  };
};
