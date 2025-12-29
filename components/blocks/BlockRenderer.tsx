import type { Collection, ContentBlock, StoreConfig } from "@/lib/store/types";

import { CTASection } from "@/components/blocks/CTASection";
import { FeatureHighlights } from "@/components/blocks/FeatureHighlights";
import { FeaturedCollectionsGrid } from "@/components/blocks/FeaturedCollectionsGrid";
import { HeroSection } from "@/components/blocks/HeroSection";
import { ImageStrip } from "@/components/blocks/ImageStrip";
import { PromoBanner } from "@/components/blocks/PromoBanner";
import { Testimonials } from "@/components/blocks/Testimonials";
import { TrustBar } from "@/components/blocks/TrustBar";

export type BlockRendererProps = {
  blocks: ContentBlock[];
  collections: Collection[];
  store: StoreConfig;
};

export function BlockRenderer({ blocks, collections, store }: BlockRendererProps) {
  const collectionMap = new Map(
    collections.map((collection) => [collection.handle, collection])
  );

  return (
    <>
      {blocks.map((block) => {
        switch (block.type) {
          case "promo-banner":
            return <PromoBanner key={block.id} block={block} />;
          case "hero":
            return <HeroSection key={block.id} block={block} />;
          case "featured-collections": {
            const featured = block.collectionHandles
              .map((handle) => collectionMap.get(handle))
              .filter((collection): collection is Collection => Boolean(collection));

            return (
              <FeaturedCollectionsGrid
                key={block.id}
                block={block}
                collections={featured}
              />
            );
          }
          case "feature-grid":
            return <FeatureHighlights key={block.id} block={block} />;
          case "trust-bar": {
            const items =
              block.source === "store" ? store.trust : block.items ?? [];

            return <TrustBar key={block.id} block={block} items={items} />;
          }
          case "image-strip":
            return <ImageStrip key={block.id} block={block} />;
          case "testimonials":
            return <Testimonials key={block.id} block={block} />;
          case "cta-section":
            return <CTASection key={block.id} block={block} />;
          default:
            return null;
        }
      })}
    </>
  );
}
