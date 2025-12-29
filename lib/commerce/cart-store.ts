"use client";

import { useCallback, useSyncExternalStore } from "react";

import type { CartLineItem } from "@/lib/commerce/cart";

const EMPTY_CART: CartLineItem[] = [];
const carts = new Map<string, CartLineItem[]>();
const loadedKeys = new Set<string>();
const listeners = new Map<string, Set<() => void>>();

const getStorageKey = (storeId: string) => `storefront_cart__${storeId}`;

const getListeners = (storeId: string) => {
  const existing = listeners.get(storeId);
  if (existing) {
    return existing;
  }
  const next = new Set<() => void>();
  listeners.set(storeId, next);
  return next;
};

const getItems = (storeId: string) => carts.get(storeId) ?? EMPTY_CART;

const load = (storeId: string) => {
  if (loadedKeys.has(storeId) || typeof window === "undefined") {
    return;
  }

  try {
    const raw = window.localStorage.getItem(getStorageKey(storeId));
    if (raw) {
      const parsed = JSON.parse(raw) as CartLineItem[];
      if (Array.isArray(parsed)) {
        carts.set(storeId, parsed);
      }
    }
  } catch {
    carts.set(storeId, []);
  }

  loadedKeys.add(storeId);
};

const save = (storeId: string) => {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(
    getStorageKey(storeId),
    JSON.stringify(getItems(storeId))
  );
};

const emit = (storeId: string) => {
  getListeners(storeId).forEach((listener) => listener());
};

const setItems = (storeId: string, next: CartLineItem[]) => {
  carts.set(storeId, next);
  save(storeId);
  emit(storeId);
};

const getSnapshot = (storeId: string) => {
  load(storeId);
  return getItems(storeId);
};

const getServerSnapshot = () => EMPTY_CART;

const subscribe = (storeId: string, listener: () => void) => {
  const storeListeners = getListeners(storeId);
  storeListeners.add(listener);
  return () => storeListeners.delete(listener);
};

const addItem = (storeId: string, nextItem: CartLineItem) => {
  const items = getItems(storeId);
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
    setItems(storeId, updated);
    return;
  }

  setItems(storeId, [...items, nextItem]);
};

const updateQuantity = (
  storeId: string,
  productId: string,
  variantId: string,
  quantity: number
) => {
  const items = getItems(storeId);
  if (quantity <= 0) {
    removeItem(storeId, productId, variantId);
    return;
  }

  setItems(
    storeId,
    items.map((item) =>
      item.productId === productId && item.variantId === variantId
        ? { ...item, quantity }
        : item
    )
  );
};

const removeItem = (storeId: string, productId: string, variantId: string) => {
  const items = getItems(storeId);
  setItems(
    storeId,
    items.filter(
      (item) => item.productId !== productId || item.variantId !== variantId
    )
  );
};

const clear = (storeId: string) => {
  setItems(storeId, []);
};

export const useCart = (storeId: string) => {
  const subscribeToCart = useCallback(
    (listener: () => void) => subscribe(storeId, listener),
    [storeId]
  );
  const getCartSnapshot = useCallback(() => getSnapshot(storeId), [storeId]);
  const cartItems = useSyncExternalStore(
    subscribeToCart,
    getCartSnapshot,
    getServerSnapshot
  );
  const addItemForStore = useCallback(
    (nextItem: CartLineItem) => addItem(storeId, nextItem),
    [storeId]
  );
  const updateQuantityForStore = useCallback(
    (productId: string, variantId: string, quantity: number) =>
      updateQuantity(storeId, productId, variantId, quantity),
    [storeId]
  );
  const removeItemForStore = useCallback(
    (productId: string, variantId: string) =>
      removeItem(storeId, productId, variantId),
    [storeId]
  );
  const clearForStore = useCallback(() => clear(storeId), [storeId]);

  return {
    items: cartItems,
    addItem: addItemForStore,
    updateQuantity: updateQuantityForStore,
    removeItem: removeItemForStore,
    clear: clearForStore,
  };
};
