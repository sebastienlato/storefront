import type { ComponentPropsWithoutRef, ElementType } from "react";

export type ButtonProps<T extends ElementType = "button"> = {
  as?: T;
  variant?: "solid" | "ghost";
} & ComponentPropsWithoutRef<T>;

export function Button<T extends ElementType = "button">({
  as,
  variant = "solid",
  className,
  ...props
}: ButtonProps<T>) {
  const Component = as ?? "button";
  const base =
    "inline-flex items-center justify-center rounded-[var(--radius-pill)] px-5 py-2 text-sm uppercase tracking-[0.18em] transition duration-200";
  const styles =
    variant === "solid"
      ? "bg-[var(--color-accent)] text-[var(--color-bg)] hover:bg-[var(--color-accent-muted)]"
      : "border border-[var(--color-border)] text-[var(--color-fg)] hover:bg-[var(--color-surface)]";

  return (
    <Component className={`${base} ${styles} ${className ?? ""}`} {...props} />
  );
}
