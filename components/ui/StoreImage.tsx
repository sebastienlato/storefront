"use client";

import { useEffect, useState } from "react";

export type StoreImageProps = {
  storeId: string;
  src?: string | null;
  alt: string;
  className?: string;
};

export function StoreImage({
  storeId,
  src,
  alt,
  className,
}: StoreImageProps) {
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
