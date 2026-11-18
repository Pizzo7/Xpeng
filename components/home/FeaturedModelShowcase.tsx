"use client";

import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { Reveal, Stagger, StaggerItem, TiltCard } from "@/components/motion";
import { getFeaturedModel, site } from "@/lib/data";

function CardVideo({ src, label }: { src: string; label: string }) {
  return (
    <div className="relative aspect-[4/3] bg-black">
      <video
        src={src}
        className="absolute inset-0 h-full w-full object-cover"
        autoPlay
        muted
        playsInline
        loop
        preload="metadata"
        aria-label={label}
      />
    </div>
  );
}

/** Home spotlight for the featured model — showroom-style stagger + tilt */
export function FeaturedModelShowcase() {
  const model = getFeaturedModel();

  const keySpecs = [
    { label: "Range", value: model.specs.range },
    { label: "Acceleration", value: model.specs.acceleration },
    { label: "Battery", value: model.specs.battery },
    { label: "Charging", value: model.specs.charging },
  ];

  return (
    <section className="py-section-sm sm:py-section bg-ink">
      <Container>
        <Reveal direction="left">
          <SectionHeading
            eyebrow="Featured"
            title={model.headline}
            description={model.subheadline}
          />
        </Reveal>

        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          <Reveal direction="left">
            <TiltCard
              as="article"
              className="overflow-hidden border border-silver/15 bg-ink transition-colors hover:border-gold/40"
            >
              <CardVideo
                src="/videos/xpeng_x9_intelligent_parking.mp4"
                label="XPENG intelligent parking"
              />
              <div className="space-y-3 p-6">
                <h3 className="font-display text-2xl text-mist">
                  Intelligent Parking
                </h3>
                <p className="leading-relaxed text-mist-dim">
                  Park with precision in tight city spaces — cameras and sensors
                  guide every move so everyday manoeuvres feel effortless.
                </p>
              </div>
            </TiltCard>
          </Reveal>
          <Reveal direction="right" delay={0.08}>
            <TiltCard
              as="article"
              className="overflow-hidden border border-silver/15 bg-ink transition-colors hover:border-gold/40"
            >
              <CardVideo
                src="/videos/_users_1a03c492_9658_4404_b72b_497614eb29a5_generated_da375319_458a.mp4"
                label="XPENG on the open road"
              />
              <div className="space-y-3 p-6">
                <h3 className="font-display text-2xl text-mist">
                  Road presence
                </h3>
                <p className="leading-relaxed text-mist-dim">
                  Composed electric power for Ghana’s roads — from city streets
                  to coastal stretches, with a planted stance and quiet
                  confidence.
                </p>
              </div>
            </TiltCard>
          </Reveal>
        </div>

        <Stagger
          as="dl"
          className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-4"
        >
          {keySpecs.map((spec, index) => (
            <StaggerItem
              key={spec.label}
              direction={index % 2 === 0 ? "left" : "right"}
            >
              <TiltCard className="border border-silver/15 bg-ink-soft p-5 transition-colors hover:border-gold/40">
                <dt className="text-xs uppercase tracking-brand text-silver">
                  {spec.label}
                </dt>
                <dd className="mt-2 font-display text-2xl text-mist">
                  {spec.value}
                </dd>
              </TiltCard>
            </StaggerItem>
          ))}
        </Stagger>

        <Stagger className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {model.features.map((feature, index) => (
            <StaggerItem
              key={feature.id}
              direction={index % 2 === 0 ? "left" : "right"}
            >
              <TiltCard
                as="article"
                className="h-full border border-silver/15 bg-ink-soft p-5 transition-colors hover:border-gold/40"
              >
                <h3 className="font-display text-xl text-mist">
                  {feature.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-mist-dim">
                  {feature.description}
                </p>
              </TiltCard>
            </StaggerItem>
          ))}
        </Stagger>

        <Stagger className="mt-12 grid gap-4 md:grid-cols-2">
          <StaggerItem direction="left">
            <TiltCard
              as="aside"
              className="h-full border border-silver/15 bg-ink-soft p-6 transition-colors hover:border-gold/40"
            >
              <p className="mb-2 text-xs uppercase tracking-brand text-gold">
                Ghana roads
              </p>
              <p className="text-sm leading-relaxed text-mist-dim">
                {site.ghanaNotes.roads}
              </p>
            </TiltCard>
          </StaggerItem>
          <StaggerItem direction="right">
            <TiltCard
              as="aside"
              className="h-full border border-silver/15 bg-ink-soft p-6 transition-colors hover:border-gold/40"
            >
              <p className="mb-2 text-xs uppercase tracking-brand text-gold">
                Charging in Ghana
              </p>
              <p className="text-sm leading-relaxed text-mist-dim">
                {site.ghanaNotes.charging}
              </p>
            </TiltCard>
          </StaggerItem>
        </Stagger>

        <Reveal className="mt-10 flex flex-wrap gap-3">
          <Button href="/models" variant="secondary">
            Explore models
          </Button>
          <Button href="/models" variant="ghost">
            All models
          </Button>
        </Reveal>
      </Container>
    </section>
  );
}
