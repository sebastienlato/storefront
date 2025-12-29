import "server-only";

import { readFile } from "fs/promises";
import path from "path";

import type {
  Collection,
  LegalContent,
  Product,
  StoreConfig,
  StoreContent,
  StoreDataset,
  StoreIndex,
} from "@/lib/store/types";

const DATA_ROOT = path.join(process.cwd(), "data", "stores");

const readJsonFile = async <T>(filePath: string): Promise<T> => {
  const raw = await readFile(filePath, "utf-8");
  return JSON.parse(raw) as T;
};

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null && !Array.isArray(value);

const assertString = (value: unknown, label: string): asserts value is string => {
  if (typeof value !== "string") {
    throw new Error(`Expected ${label} to be a string.`);
  }
};

const assertArray = (value: unknown, label: string): asserts value is unknown[] => {
  if (!Array.isArray(value)) {
    throw new Error(`Expected ${label} to be an array.`);
  }
};

const assertStoreIndex = (value: unknown): StoreIndex => {
  if (!isRecord(value)) {
    throw new Error("Store index must be an object.");
  }

  assertString(value.defaultStoreId, "defaultStoreId");
  assertArray(value.storeIds, "storeIds");

  return {
    defaultStoreId: value.defaultStoreId,
    storeIds: value.storeIds as string[],
  };
};

const assertStoreConfig = (value: unknown): StoreConfig => {
  if (!isRecord(value)) {
    throw new Error("Store config must be an object.");
  }

  assertString(value.id, "store.id");

  if (!isRecord(value.brand)) {
    throw new Error("store.brand must be an object.");
  }

  assertString(value.brand.name, "store.brand.name");
  assertString(value.brand.logoPath, "store.brand.logoPath");

  if (!isRecord(value.theme)) {
    throw new Error("store.theme must be an object.");
  }

  if (!isRecord(value.navigation)) {
    throw new Error("store.navigation must be an object.");
  }

  assertArray(value.navigation.header, "store.navigation.header");
  assertArray(value.navigation.footer, "store.navigation.footer");

  assertArray(value.trust, "store.trust");

  if (value.navigation.headerCta !== undefined) {
    if (!isRecord(value.navigation.headerCta)) {
      throw new Error("store.navigation.headerCta must be an object.");
    }

    assertString(value.navigation.headerCta.label, "store.navigation.headerCta.label");
    assertString(value.navigation.headerCta.href, "store.navigation.headerCta.href");
  }

  if (!isRecord(value.commerce)) {
    throw new Error("store.commerce must be an object.");
  }

  if (!isRecord(value.commerce.ctas)) {
    throw new Error("store.commerce.ctas must be an object.");
  }

  if (!isRecord(value.commerce.ctas.addToCart)) {
    throw new Error("store.commerce.ctas.addToCart must be an object.");
  }

  assertString(value.commerce.ctas.addToCart.label, "store.commerce.ctas.addToCart.label");

  if (!isRecord(value.commerce.ctas.checkout)) {
    throw new Error("store.commerce.ctas.checkout must be an object.");
  }

  assertString(value.commerce.ctas.checkout.label, "store.commerce.ctas.checkout.label");
  assertString(value.commerce.ctas.checkout.href, "store.commerce.ctas.checkout.href");

  if (value.commerce.ctas.continueShopping !== undefined) {
    if (!isRecord(value.commerce.ctas.continueShopping)) {
      throw new Error("store.commerce.ctas.continueShopping must be an object.");
    }

    assertString(
      value.commerce.ctas.continueShopping.label,
      "store.commerce.ctas.continueShopping.label"
    );
    assertString(
      value.commerce.ctas.continueShopping.href,
      "store.commerce.ctas.continueShopping.href"
    );
  }

  if (!isRecord(value.commerce.cart)) {
    throw new Error("store.commerce.cart must be an object.");
  }

  assertString(value.commerce.cart.title, "store.commerce.cart.title");
  assertString(value.commerce.cart.emptyTitle, "store.commerce.cart.emptyTitle");

  if (value.commerce.cart.emptyDescription !== undefined) {
    assertString(
      value.commerce.cart.emptyDescription,
      "store.commerce.cart.emptyDescription"
    );
  }

  assertString(value.commerce.cart.subtotalLabel, "store.commerce.cart.subtotalLabel");
  assertString(value.commerce.cart.promoLabel, "store.commerce.cart.promoLabel");
  assertString(value.commerce.cart.promoPlaceholder, "store.commerce.cart.promoPlaceholder");
  assertString(value.commerce.cart.promoApplyLabel, "store.commerce.cart.promoApplyLabel");
  assertString(value.commerce.cart.quantityLabel, "store.commerce.cart.quantityLabel");
  assertString(value.commerce.cart.removeLabel, "store.commerce.cart.removeLabel");
  assertString(value.commerce.cart.decreaseLabel, "store.commerce.cart.decreaseLabel");
  assertString(value.commerce.cart.increaseLabel, "store.commerce.cart.increaseLabel");

  if (!isRecord(value.commerce.checkout)) {
    throw new Error("store.commerce.checkout must be an object.");
  }

  assertString(value.commerce.checkout.title, "store.commerce.checkout.title");

  if (!isRecord(value.commerce.checkout.steps)) {
    throw new Error("store.commerce.checkout.steps must be an object.");
  }

  assertString(value.commerce.checkout.steps.contact, "store.commerce.checkout.steps.contact");
  assertString(value.commerce.checkout.steps.shipping, "store.commerce.checkout.steps.shipping");
  assertString(value.commerce.checkout.steps.payment, "store.commerce.checkout.steps.payment");

  if (!isRecord(value.commerce.checkout.contact)) {
    throw new Error("store.commerce.checkout.contact must be an object.");
  }

  assertString(value.commerce.checkout.contact.title, "store.commerce.checkout.contact.title");
  assertString(value.commerce.checkout.contact.emailLabel, "store.commerce.checkout.contact.emailLabel");
  assertString(value.commerce.checkout.contact.phoneLabel, "store.commerce.checkout.contact.phoneLabel");

  if (!isRecord(value.commerce.checkout.shipping)) {
    throw new Error("store.commerce.checkout.shipping must be an object.");
  }

  assertString(value.commerce.checkout.shipping.title, "store.commerce.checkout.shipping.title");
  assertString(value.commerce.checkout.shipping.firstNameLabel, "store.commerce.checkout.shipping.firstNameLabel");
  assertString(value.commerce.checkout.shipping.lastNameLabel, "store.commerce.checkout.shipping.lastNameLabel");
  assertString(value.commerce.checkout.shipping.addressLabel, "store.commerce.checkout.shipping.addressLabel");
  assertString(value.commerce.checkout.shipping.cityLabel, "store.commerce.checkout.shipping.cityLabel");
  assertString(value.commerce.checkout.shipping.postalLabel, "store.commerce.checkout.shipping.postalLabel");
  assertString(value.commerce.checkout.shipping.countryLabel, "store.commerce.checkout.shipping.countryLabel");

  if (!isRecord(value.commerce.checkout.payment)) {
    throw new Error("store.commerce.checkout.payment must be an object.");
  }

  assertString(value.commerce.checkout.payment.title, "store.commerce.checkout.payment.title");

  if (value.commerce.checkout.payment.description !== undefined) {
    assertString(
      value.commerce.checkout.payment.description,
      "store.commerce.checkout.payment.description"
    );
  }

  if (!isRecord(value.commerce.checkout.summary)) {
    throw new Error("store.commerce.checkout.summary must be an object.");
  }

  assertString(value.commerce.checkout.summary.title, "store.commerce.checkout.summary.title");
  assertString(
    value.commerce.checkout.summary.subtotalLabel,
    "store.commerce.checkout.summary.subtotalLabel"
  );
  assertString(
    value.commerce.checkout.summary.shippingLabel,
    "store.commerce.checkout.summary.shippingLabel"
  );
  assertString(value.commerce.checkout.summary.taxLabel, "store.commerce.checkout.summary.taxLabel");
  assertString(
    value.commerce.checkout.summary.totalLabel,
    "store.commerce.checkout.summary.totalLabel"
  );

  if (!isRecord(value.commerce.checkout.actions)) {
    throw new Error("store.commerce.checkout.actions must be an object.");
  }

  assertString(value.commerce.checkout.actions.nextLabel, "store.commerce.checkout.actions.nextLabel");
  assertString(value.commerce.checkout.actions.backLabel, "store.commerce.checkout.actions.backLabel");

  assertString(value.commerce.checkout.placeOrderLabel, "store.commerce.checkout.placeOrderLabel");

  if (!isRecord(value.commerce.checkout.confirmation)) {
    throw new Error("store.commerce.checkout.confirmation must be an object.");
  }

  assertString(
    value.commerce.checkout.confirmation.title,
    "store.commerce.checkout.confirmation.title"
  );

  if (value.commerce.checkout.confirmation.description !== undefined) {
    assertString(
      value.commerce.checkout.confirmation.description,
      "store.commerce.checkout.confirmation.description"
    );
  }

  if (value.commerce.checkout.confirmation.cta !== undefined) {
    if (!isRecord(value.commerce.checkout.confirmation.cta)) {
      throw new Error("store.commerce.checkout.confirmation.cta must be an object.");
    }

    assertString(
      value.commerce.checkout.confirmation.cta.label,
      "store.commerce.checkout.confirmation.cta.label"
    );
    assertString(
      value.commerce.checkout.confirmation.cta.href,
      "store.commerce.checkout.confirmation.cta.href"
    );
  }

  return value as StoreConfig;
};

const assertContent = (value: unknown): StoreContent => {
  if (!isRecord(value)) {
    throw new Error("Store content must be an object.");
  }

  if (!isRecord(value.home) || !isRecord(value.about) || !isRecord(value.contact)) {
    throw new Error("Store content must include home, about, and contact pages.");
  }

  return value as StoreContent;
};

const assertProducts = (value: unknown): Product[] => {
  assertArray(value, "products");
  return value as Product[];
};

const assertCollections = (value: unknown): Collection[] => {
  assertArray(value, "collections");
  return value as Collection[];
};

const assertLegal = (value: unknown): LegalContent => {
  if (!isRecord(value)) {
    throw new Error("Legal content must be an object.");
  }

  return value as LegalContent;
};

const getIndex = async (): Promise<StoreIndex> => {
  const indexPath = path.join(DATA_ROOT, "index.json");
  const indexData = await readJsonFile<StoreIndex>(indexPath);
  return assertStoreIndex(indexData);
};

const resolveStoreId = async (): Promise<string> => {
  const index = await getIndex();
  const envStoreId = process.env.STORE_ID;

  if (envStoreId && index.storeIds.includes(envStoreId)) {
    return envStoreId;
  }

  return index.defaultStoreId;
};

export const getStore = async (): Promise<StoreDataset> => {
  const storeId = await resolveStoreId();
  const storePath = path.join(DATA_ROOT, storeId);

  const [config, content, products, collections, legal] = await Promise.all([
    readJsonFile<StoreConfig>(path.join(storePath, "store.json")),
    readJsonFile<StoreContent>(path.join(storePath, "content.json")),
    readJsonFile<Product[]>(path.join(storePath, "products.json")),
    readJsonFile<Collection[]>(path.join(storePath, "collections.json")),
    readJsonFile<LegalContent>(path.join(storePath, "legal.json")),
  ]);

  return {
    config: assertStoreConfig(config),
    content: assertContent(content),
    products: assertProducts(products),
    collections: assertCollections(collections),
    legal: assertLegal(legal),
  };
};
