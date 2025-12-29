import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { getStore } from "@/lib/store/getStore";

export default async function Home() {
  const { content } = await getStore();
  const { seo } = content.home;

  return (
    <Section>
      <Container className="space-y-6">
        <h1>{seo.title}</h1>
        {seo.description ? <p className="max-w-2xl">{seo.description}</p> : null}
      </Container>
    </Section>
  );
}
