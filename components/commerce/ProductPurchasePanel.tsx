"use client";

import { useMemo, useState } from "react";

import { Price } from "@/components/commerce/Price";
import { VariantSelector } from "@/components/commerce/VariantSelector";
import { Button } from "@/components/ui/Button";
import type { Product, Variant } from "@/lib/store/types";

export type ProductPurchasePanelProps = {
  product: Product;
  addToCartLabel: string;
};

const getInitialOptions = (variants: Variant[]) => {
  const first = variants[0];
  if (!first) {
    return {} as Record<string, string>;
  }

  return first.options.reduce<Record<string, string>>((acc, option) => {
    acc[option.name] = option.value;
    return acc;
  }, {});
};

const resolveVariant = (
  variants: Variant[],
  selectedOptions: Record<string, string>
) =>
  variants.find((variant) =>
    variant.options.every(
      (option) => selectedOptions[option.name] === option.value
    )
  );

export function ProductPurchasePanel({
  product,
  addToCartLabel,
}: ProductPurchasePanelProps) {
  const [selectedOptions, setSelectedOptions] = useState(() =>
    getInitialOptions(product.variants)
  );

  const selectedVariant = useMemo(
    () => resolveVariant(product.variants, selectedOptions),
    [product.variants, selectedOptions]
  );

  const isDisabled = !selectedVariant || selectedVariant.inStock === false;

  return (
    <div className="space-y-6">
      <Price price={product.price} />
      {product.variants.length ? (
        <VariantSelector
          variants={product.variants}
          selectedOptions={selectedOptions}
          onChange={(name, value) =>
            setSelectedOptions((prev) => ({ ...prev, [name]: value }))
          }
        />
      ) : null}
      <Button
        type="button"
        disabled={isDisabled}
        onClick={() => {
          if (!selectedVariant) return;
          console.log("add-to-cart", {
            productId: product.id,
            variantId: selectedVariant.id,
          });
        }}
      >
        {addToCartLabel}
      </Button>
    </div>
  );
}
