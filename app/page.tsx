import { BlockRenderer } from "@/components/blocks/BlockRenderer";
import { getStore } from "@/lib/store/getStore";

export default async function Home() {
  const { content, collections, config } = await getStore();

  return (
    <BlockRenderer
      blocks={content.home.blocks}
      collections={collections}
      store={config}
    />
  );
}
