"use client";

import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal, Stagger, StaggerItem, TiltCard } from "@/components/motion";
import { LifestyleParallaxMedia } from "@/components/home/LifestyleParallaxMedia";
import { getFeaturedModel } from "@/lib/data";

export function LifestyleSection() {
  const lifestyle = getFeaturedModel().lifestyle;

  if (lifestyle.length === 0) return null;

  return (
    <section className="py-section-sm sm:py-section bg-ink-soft">
      <Container>
        <Reveal direction="left">
          <SectionHeading
            eyebrow="Lifestyle"
            title="Made for the road — and the people in it"
            description="Coastal weekends, city evenings, and family days across Ghana."
          />
        </Reveal>

        <Stagger className="mt-10 grid gap-8 lg:grid-cols-2">
          {lifestyle.map((item, index) => (
            <StaggerItem
              key={item.id}
              direction={index % 2 === 0 ? "left" : "right"}
            >
              <TiltCard
                as="article"
                className="overflow-hidden border border-silver/15 bg-ink transition-colors hover:border-gold/40"
              >
                <LifestyleParallaxMedia
                  video={item.video}
                  poster={item.poster}
                  alt={item.title}
                />
                <div className="space-y-3 p-6">
                  <h3 className="font-display text-2xl text-mist">{item.title}</h3>
                  <p className="leading-relaxed text-mist-dim">
                    {item.description}
                  </p>
                </div>
              </TiltCard>
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </section>
  );
}
