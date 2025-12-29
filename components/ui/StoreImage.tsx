"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

export type StoreImageProps = {
  storeId: string;
  src?: string | null;
  alt: string;
  width?: number;
  height?: number;
  fill?: boolean;
  sizes?: string;
  className?: string;
  priority?: boolean;
};

export function StoreImage({
  storeId,
  src,
  alt,
  width,
  height,
  fill,
  sizes,
  className,
  priority,
}: StoreImageProps) {
  const fallback = `/stores/${storeId}/placeholder.jpg`;
  const resolvedSrc = src && src.length > 0 ? src : fallback;
  const [currentSrc, setCurrentSrc] = useState(resolvedSrc);

  useEffect(() => {
    setCurrentSrc(resolvedSrc);
  }, [resolvedSrc]);

  return (
    <Image
      src={currentSrc}
      alt={alt}
      width={fill ? undefined : width}
      height={fill ? undefined : height}
      fill={fill}
      sizes={sizes}
      className={className}
      priority={priority}
      onError={() => {
        if (currentSrc !== fallback) {
          setCurrentSrc(fallback);
        }
      }}
    />
  );
}
