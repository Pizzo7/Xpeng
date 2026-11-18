import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { Reveal, Stagger, StaggerItem, TiltCard } from "@/components/motion";
import { discover, site } from "@/lib/data";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Maintenance, warranty, and owner services from XPENG Ghana.",
};

export default function ServicesPage() {
  const content = discover.services;

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

      <Container className="mt-6 space-y-10 sm:mt-8">
        <Reveal direction="right">
          <p className="max-w-2xl leading-relaxed text-mist-dim">
            {content.intro}
          </p>
        </Reveal>

        <Stagger className="grid gap-5 sm:grid-cols-2">
          {content.items.map((item, index) => (
            <StaggerItem
              key={item.id}
              direction={index % 2 === 0 ? "left" : "right"}
            >
              <TiltCard className="h-full border border-silver/15 bg-ink-soft p-6 transition-colors hover:border-gold/40 sm:p-8">
                <h2 className="font-display text-2xl text-mist">{item.title}</h2>
                <p className="mt-3 text-sm leading-relaxed text-mist-dim">
                  {item.description}
                </p>
              </TiltCard>
            </StaggerItem>
          ))}
        </Stagger>

        <Reveal>
          <TiltCard className="border border-silver/15 bg-ink-soft p-6 transition-colors hover:border-gold/40 sm:p-8">
            <p className="text-xs uppercase tracking-brand text-gold">
              Book service
            </p>
            <h2 className="mt-2 font-display text-2xl text-mist">
              Visit us in Accra
            </h2>
            <p className="mt-3 text-sm text-mist-dim">
              {site.contactLocation.address}
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button href="/contact" variant="gold">
                Contact service
              </Button>
              <Button href="/showrooms" variant="secondary">
                Find a showroom
              </Button>
            </div>
          </TiltCard>
        </Reveal>
      </Container>
    </div>
  );
}
