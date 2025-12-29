import type { HTMLAttributes } from "react";

export type ContainerProps = HTMLAttributes<HTMLDivElement>;

export function Container({ className, ...props }: ContainerProps) {
  return (
    <div
      className={`mx-auto w-full max-w-[1200px] px-[var(--spacing-container-x)] ${
        className ?? ""
      }`}
      {...props}
    />
  );
}
