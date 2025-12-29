"use client";

import type { Variant } from "@/lib/store/types";

export type VariantSelectorProps = {
  variants: Variant[];
  selectedOptions: Record<string, string>;
  onChange: (name: string, value: string) => void;
};

const buildOptions = (variants: Variant[]) => {
  const optionMap = new Map<string, Set<string>>();

  variants.forEach((variant) => {
    variant.options.forEach((option) => {
      if (!optionMap.has(option.name)) {
        optionMap.set(option.name, new Set());
      }
      optionMap.get(option.name)?.add(option.value);
    });
  });

  return Array.from(optionMap.entries()).map(([name, values]) => ({
    name,
    values: Array.from(values),
  }));
};

export function VariantSelector({
  variants,
  selectedOptions,
  onChange,
}: VariantSelectorProps) {
  const optionGroups = buildOptions(variants);

  return (
    <div className="space-y-5">
      {optionGroups.map((group) => (
        <div key={group.name} className="space-y-3">
          <div className="text-xs uppercase tracking-[0.2em] text-[var(--color-muted)]">
            {group.name}
          </div>
          <div className="flex flex-wrap gap-3">
            {group.values.map((value) => {
              const isActive = selectedOptions[group.name] === value;

              return (
                <button
                  key={value}
                  type="button"
                  aria-pressed={isActive}
                  className={`rounded-[var(--radius-pill)] border px-4 py-2 text-xs uppercase tracking-[0.2em] transition ${
                    isActive
                      ? "border-[var(--color-accent)] text-[var(--color-fg)]"
                      : "border-[var(--color-border)] text-[var(--color-muted)]"
                  }`}
                  onClick={() => onChange(group.name, value)}
                >
                  {value}
                </button>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
