import type { Product, Variant } from "@/lib/store/types";

export type CartLineItem = {
  productId: string;
  variantId: string;
  quantity: number;
};

export type ResolvedCartLineItem = {
  line: CartLineItem;
  product: Product;
  variant: Variant;
};

export const resolveCartItems = (
  items: CartLineItem[],
  products: Product[]
): ResolvedCartLineItem[] => {
  const productMap = new Map(products.map((product) => [product.id, product]));

  return items.flatMap((line) => {
    const product = productMap.get(line.productId);
    if (!product) {
      return [];
    }

    const variant = product.variants.find((item) => item.id === line.variantId);
    if (!variant) {
      return [];
    }

    return [{ line, product, variant }];
  });
};

export const getCartSubtotal = (items: ResolvedCartLineItem[]) =>
  items.reduce(
    (total, item) => total + item.product.price.current * item.line.quantity,
    0
  );
