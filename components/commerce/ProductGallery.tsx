import Image from "next/image";

export type ProductGalleryProps = {
  images: string[];
  alt: string;
};

export function ProductGallery({ images, alt }: ProductGalleryProps) {
  const [primary, ...rest] = images;

  return (
    <div className="space-y-4">
      <div className="relative h-[420px] overflow-hidden rounded-[var(--radius-lg)] bg-[var(--color-surface)]">
        {primary ? (
          <Image
            src={primary}
            alt={alt}
            fill
            className="object-cover"
            sizes="(min-width: 1024px) 45vw, 90vw"
          />
        ) : null}
      </div>
      {rest.length ? (
        <div className="grid grid-cols-3 gap-3">
          {rest.map((image, index) => (
            <div
              key={`${image}-${index}`}
              className="relative h-28 overflow-hidden rounded-[var(--radius-md)] bg-[var(--color-surface)]"
            >
              <Image
                src={image}
                alt={alt}
                fill
                className="object-cover"
                sizes="(min-width: 1024px) 15vw, 30vw"
              />
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
}
