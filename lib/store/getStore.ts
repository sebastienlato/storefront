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

  assertString(value.commerce.addToCartLabel, "store.commerce.addToCartLabel");

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
