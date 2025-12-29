"use client";

/* 
  eslint-disable @next/next/no-img-element
  We intentionally use <img> here to support reliable onError fallback
  for dynamic, store-scoped assets. next/image is unsuitable for this use case.
*/

import { useEffect, useState } from "react";

export type StoreImageProps = {
  storeId: string;
  src?: string | null;
  alt: string;
  className?: string;
};

export function StoreImage({ storeId, src, alt, className }: StoreImageProps) {
  const fallback = `/stores/${storeId}/placeholder.jpg`;
  const resolvedSrc = src && src.length > 0 ? src : fallback;
  const [currentSrc, setCurrentSrc] = useState(resolvedSrc);

  useEffect(() => {
    setCurrentSrc(resolvedSrc);
  }, [resolvedSrc]);

  return (
    <img
      src={currentSrc}
      alt={alt}
      className={className}
      onError={() => {
        if (currentSrc !== fallback) {
          setCurrentSrc(fallback);
        }
      }}
    />
  );
}
