import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { Reveal, Stagger, StaggerItem, TiltCard } from "@/components/motion";
import { discover } from "@/lib/data";

export const metadata: Metadata = {
  title: "News",
  description: "News and updates from XPENG Ghana.",
};

export default function NewsPage() {
  const content = discover.news;

  return (
    <div className="pb-section-sm sm:pb-section">
      <section className="bg-ink-soft pt-8 pb-5 sm:pt-10 sm:pb-6">
        <Container>
          <Reveal direction="left">
            <SectionHeading
              title={content.headline}
              description={content.subheadline}
            />
          </Reveal>
        </Container>
      </section>

      <Container className="mt-6 sm:mt-8">
        <Stagger className="space-y-4">
          {content.articles.map((article, index) => (
            <StaggerItem
              key={article.id}
              direction={index % 2 === 0 ? "left" : "right"}
            >
              <TiltCard className="border border-silver/15 bg-ink-soft p-6 transition-colors hover:border-gold/40 sm:p-8">
                <div className="flex flex-wrap items-center gap-3 text-xs uppercase tracking-brand">
                  <span className="text-gold">{article.category}</span>
                  <span className="text-silver">{article.date}</span>
                </div>
                <h2 className="mt-3 font-display text-2xl text-mist sm:text-3xl">
                  {article.title}
                </h2>
                <p className="mt-3 max-w-3xl leading-relaxed text-mist-dim">
                  {article.excerpt}
                </p>
              </TiltCard>
            </StaggerItem>
          ))}
        </Stagger>

        <Reveal className="mt-10">
          <Button href="/contact" variant="secondary">
            Media enquiries
          </Button>
        </Reveal>
      </Container>
    </div>
  );
}
