import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { Reveal, Stagger, StaggerItem, TiltCard } from "@/components/motion";
import { discover } from "@/lib/data";

export const metadata: Metadata = {
  title: "Charging points",
  description:
    "XPENG charging points and partner locations across Ghana.",
};

export default function ChargingPointsPage() {
  const content = discover.chargingPoints;

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

        <Stagger className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {content.points.map((point, index) => (
            <StaggerItem
              key={point.id}
              direction={index % 2 === 0 ? "left" : "right"}
            >
              <TiltCard className="flex h-full flex-col border border-silver/15 bg-ink-soft p-6 transition-colors hover:border-gold/40">
                <p className="text-xs uppercase tracking-brand text-gold">
                  {point.city}
                </p>
                <h2 className="mt-2 font-display text-2xl text-mist">
                  {point.name}
                </h2>
                <p className="mt-3 text-sm text-mist-dim">{point.address}</p>
                <dl className="mt-5 space-y-2 text-sm">
                  <div className="flex justify-between gap-3">
                    <dt className="text-silver">Type</dt>
                    <dd className="text-right text-mist">{point.type}</dd>
                  </div>
                  <div className="flex justify-between gap-3">
                    <dt className="text-silver">Access</dt>
                    <dd className="text-right text-mist">{point.access}</dd>
                  </div>
                  <div className="flex justify-between gap-3">
                    <dt className="text-silver">Hours</dt>
                    <dd className="text-right text-mist">{point.hours}</dd>
                  </div>
                </dl>
                <p className="mt-auto pt-5 text-xs text-mist-dim">{point.note}</p>
              </TiltCard>
            </StaggerItem>
          ))}
        </Stagger>

        <Reveal className="flex flex-wrap gap-3">
          <Button href="/contact" variant="gold">
            Ask about charging
          </Button>
          <Button href="/ownership" variant="secondary">
            Ownership guide
          </Button>
        </Reveal>
      </Container>
    </div>
  );
}
