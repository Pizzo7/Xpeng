import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { Reveal, TiltCard } from "@/components/motion";
import { ModelsHero } from "@/components/models/ModelsHero";
import { ModelsExplorer } from "@/components/models/ModelsExplorer";
import { models } from "@/lib/data";

export const metadata: Metadata = {
  title: "Models",
  description:
    "Explore the XPENG lineup in Ghana — SUV, sedan, and MPV. Specs and availability are confirmed model by model.",
};

export default function ModelsPage() {
  const featured = models.models.find((m) => m.featured);

  return (
    <>
      <ModelsHero />

      <section className="py-section-sm sm:py-section bg-ink">
        <Container>
          <Reveal direction="left">
            <SectionHeading
              title="Choose your type"
              description="Filter by SUV, sedan, or MPV across the XPENG Ghana lineup."
              className="mb-8"
            />
          </Reveal>
          <ModelsExplorer />
        </Container>
      </section>

      {featured ? (
        <section className="border-y border-white/5 bg-ink-soft py-section-sm sm:py-section">
          <Container>
            <Reveal>
              <div className="grid gap-8 lg:grid-cols-[1.2fr_1fr] lg:items-center">
                <div>
                  <p className="text-xs uppercase tracking-brand text-gold mb-3">
                    Spotlight
                  </p>
                  <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-mist">
                    {featured.fullName}
                  </h2>
                  <p className="mt-4 max-w-xl text-mist-dim leading-relaxed">
                    {featured.description}
                  </p>
                  <div className="mt-8 flex flex-wrap gap-3">
                    <Button href={featured.href} variant="gold">
                      Explore {featured.name}
                    </Button>
                    <Button href="/test-drive" variant="secondary">
                      Book a Test Drive
                    </Button>
                  </div>
                </div>
                <Reveal direction="right" delay={0.08}>
                  <TiltCard className="border border-silver/15 bg-ink p-6 transition-colors hover:border-gold/40 sm:p-8">
                    <p className="font-sans text-4xl tracking-tight text-mist sm:text-5xl md:text-6xl">
                      {featured.name}
                    </p>
                    <ul className="mt-6 space-y-3">
                      {featured.highlights.map((h) => (
                        <li
                          key={h.label}
                          className="flex justify-between gap-4 border-b border-silver/10 pb-3 text-sm"
                        >
                          <span className="text-silver">{h.label}</span>
                          <span className="text-mist">{h.value}</span>
                        </li>
                      ))}
                    </ul>
                  </TiltCard>
                </Reveal>
              </div>
            </Reveal>
          </Container>
        </section>
      ) : null}

      <section className="py-section-sm sm:py-section bg-ink">
        <Container>
          <Reveal>
            <div className="max-w-2xl">
              <h2 className="font-display text-3xl sm:text-4xl text-mist">
                Ready to drive?
              </h2>
              <p className="mt-4 text-mist-dim leading-relaxed">
                Book a test drive for any XPENG model in Accra, Kumasi, or
                another major city — or ask our team about the full lineup.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button href="/test-drive" variant="gold">
                  Book a Test Drive
                </Button>
                <Button href="/contact" variant="secondary">
                  Contact
                </Button>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
