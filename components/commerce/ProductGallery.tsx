import { StoreImage } from "@/components/ui/StoreImage";

export type ProductGalleryProps = {
  images: string[];
  alt: string;
  storeId: string;
};

export function ProductGallery({ images, alt, storeId }: ProductGalleryProps) {
  const [primary, ...rest] = images;

  return (
    <div className="space-y-4">
      <div className="relative h-[420px] overflow-hidden rounded-[var(--radius-lg)] bg-[var(--color-surface)]">
        <StoreImage
          storeId={storeId}
          src={primary}
          alt={alt}
          className="h-full w-full object-cover"
        />
      </div>
      {rest.length ? (
        <div className="grid grid-cols-3 gap-3">
          {rest.map((image, index) => (
            <div
              key={`${image}-${index}`}
              className="relative h-28 overflow-hidden rounded-[var(--radius-md)] bg-[var(--color-surface)]"
            >
              <StoreImage
                storeId={storeId}
                src={image}
                alt={alt}
                className="h-full w-full object-cover"
              />
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
}
