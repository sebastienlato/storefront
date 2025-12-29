"use client";

import { useEffect, useMemo, useState } from "react";

import { Price } from "@/components/commerce/Price";
import { VariantSelector } from "@/components/commerce/VariantSelector";
import { Button } from "@/components/ui/Button";
import { useCart } from "@/lib/commerce/cart-store";
import type { Product, Variant } from "@/lib/store/types";

export type ProductPurchasePanelProps = {
  product: Product;
  storeId: string;
  addToCartLabel: string;
  addToCartSuccessLabel: string;
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
  storeId,
  addToCartLabel,
  addToCartSuccessLabel,
}: ProductPurchasePanelProps) {
  const [selectedOptions, setSelectedOptions] = useState(() =>
    getInitialOptions(product.variants)
  );
  const { addItem } = useCart(storeId);
  const [showSuccess, setShowSuccess] = useState(false);

  const selectedVariant = useMemo(
    () => resolveVariant(product.variants, selectedOptions),
    [product.variants, selectedOptions]
  );

  const isDisabled = !selectedVariant || selectedVariant.inStock === false;

  useEffect(() => {
    if (!showSuccess) return;
    const timeout = window.setTimeout(() => setShowSuccess(false), 1200);
    return () => window.clearTimeout(timeout);
  }, [showSuccess]);

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
          addItem({
            productId: product.id,
            variantId: selectedVariant.id,
            quantity: 1,
          });
          setShowSuccess(true);
        }}
      >
        {showSuccess ? addToCartSuccessLabel : addToCartLabel}
      </Button>
    </div>
  );
}
