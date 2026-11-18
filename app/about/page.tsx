import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { Reveal, Stagger, StaggerItem, TiltCard } from "@/components/motion";
import { models, site } from "@/lib/data";

export const metadata: Metadata = {
  title: "About",
  description: `${site.companyName} — ${site.distributorWording}`,
};

const CATEGORY_COPY: Record<string, { title: string; description: string }> = {
  suv: {
    title: "SUVs",
    description:
      "Space, presence, and highway confidence for family trips and executive travel across Ghana.",
  },
  sedan: {
    title: "Sedans",
    description:
      "Refined electric sedans with a calm cabin and responsive drive for city and intercity roads.",
  },
  mpv: {
    title: "MPVs",
    description:
      "People-first layouts for larger households, hospitality, and flexible everyday journeys.",
  },
};

const PILLARS = [
  {
    title: "Test drives",
    body: "Book a drive in Accra, Kumasi, or another major city and feel XPENG on Ghana’s roads.",
    href: "/test-drive",
  },
  {
    title: "Showrooms",
    body: "Visit our experience centres for walkthroughs, charging advice, and ownership support.",
    href: "/showrooms",
  },
  {
    title: "Charging",
    body: "Home wallboxes and partner public chargers — we help you choose the right setup.",
    href: "/charging-points",
  },
  {
    title: "Ownership",
    body: "Warranty, service, and guidance that stay with you after delivery.",
    href: "/ownership",
  },
];

export default function AboutPage() {
  const categories = models.categories.filter((c) => c.id !== "all");
  const lineup = models.models;

  return (
    <div className="pt-8 pb-12 sm:pt-10 sm:pb-16">
      <Container>
        <Reveal direction="left">
          <SectionHeading
            title={site.about.headline}
            description={site.distributorWording}
            className="max-w-4xl"
          />
        </Reveal>
        <Reveal direction="right" delay={0.08}>
          <p className="mt-6 max-w-4xl text-lg leading-relaxed whitespace-pre-line text-mist-dim">
            {site.about.body}
          </p>
        </Reveal>

        <Reveal direction="left" className="mt-12">
          <SectionHeading
            title="Vehicle types for every journey"
            description="The XPENG Ghana lineup covers SUVs, sedans, and MPVs — so you can match the car to how you drive."
            className="max-w-4xl mb-8"
          />
        </Reveal>
        <Stagger className="grid gap-5 md:grid-cols-3">
          {categories.map((category, index) => {
            const copy = CATEGORY_COPY[category.id];
            const count = lineup.filter((m) => m.category === category.id).length;
            return (
              <StaggerItem
                key={category.id}
                direction={index % 2 === 0 ? "left" : "right"}
              >
                <TiltCard
                  as="article"
                  className="h-full border border-silver/15 bg-ink-soft p-6 transition-colors hover:border-gold/40 sm:p-8"
                >
                  <p className="text-xs uppercase tracking-brand text-gold">
                    {count} model{count === 1 ? "" : "s"}
                  </p>
                  <h3 className="mt-2 font-display text-2xl text-mist">
                    {copy?.title ?? category.label}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-mist-dim">
                    {copy?.description}
                  </p>
                  <Link
                    href={`/models?category=${category.id}`}
                    className="mt-5 inline-block cursor-pointer text-sm text-gold underline-offset-4 hover:underline"
                  >
                    View {category.label} →
                  </Link>
                </TiltCard>
              </StaggerItem>
            );
          })}
        </Stagger>

        <Reveal direction="left" className="mt-16">
          <SectionHeading
            title="The XPENG Ghana lineup"
            description="Explore every model we offer — specs, availability, and test drives confirmed with our team."
            className="max-w-4xl mb-8"
          />
        </Reveal>
        <Stagger className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {lineup.map((model, index) => (
            <StaggerItem
              key={model.id}
              direction={index % 2 === 0 ? "left" : "right"}
            >
              <TiltCard
                as="article"
                className="flex h-full flex-col border border-silver/15 bg-ink-soft p-5 transition-colors hover:border-gold/40 sm:p-6"
              >
                <p className="text-xs uppercase tracking-brand text-gold">
                  {model.category.toUpperCase()}
                </p>
                <h3 className="mt-2 font-display text-xl text-mist sm:text-2xl">
                  {model.fullName}
                </h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-mist-dim">
                  {model.tagline}
                </p>
                <Link
                  href={model.href}
                  className="mt-4 inline-block cursor-pointer text-sm text-gold underline-offset-4 hover:underline"
                >
                  Explore {model.name} →
                </Link>
              </TiltCard>
            </StaggerItem>
          ))}
        </Stagger>

        <Reveal direction="left" className="mt-16">
          <SectionHeading
            title="How we support you"
            description="From first visit to everyday ownership — local help, clear advice, and a team close by."
            className="max-w-4xl mb-8"
          />
        </Reveal>
        <Stagger className="grid gap-5 sm:grid-cols-2">
          {PILLARS.map((pillar, index) => (
            <StaggerItem
              key={pillar.title}
              direction={index % 2 === 0 ? "left" : "right"}
            >
              <TiltCard
                as="article"
                className="h-full border border-silver/15 bg-ink-soft p-6 transition-colors hover:border-gold/40"
              >
                <h3 className="font-display text-2xl text-mist">{pillar.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-mist-dim">
                  {pillar.body}
                </p>
                <Link
                  href={pillar.href}
                  className="mt-4 inline-block cursor-pointer text-sm text-gold underline-offset-4 hover:underline"
                >
                  Learn more →
                </Link>
              </TiltCard>
            </StaggerItem>
          ))}
        </Stagger>

        <Reveal direction="right" className="mt-16">
          <TiltCard className="border border-silver/15 bg-ink-soft p-6 transition-colors hover:border-gold/40 sm:p-8">
            <h3 className="font-display text-2xl text-mist sm:text-3xl">
              Serving customers across Ghana
            </h3>
            <p className="mt-3 max-w-3xl text-sm leading-relaxed text-mist-dim sm:text-base">
              {site.ghanaNotes.roads} {site.ghanaNotes.charging}
            </p>
            <p className="mt-5 text-xs uppercase tracking-brand text-gold">
              Cities we support
            </p>
            <p className="mt-2 text-mist">{site.cities.join(" · ")}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button href="/models" variant="gold">
                Explore models
              </Button>
              <Button href="/test-drive" variant="secondary">
                Book a Test Drive
              </Button>
              <Button href="/contact" variant="ghost">
                Contact
              </Button>
            </div>
          </TiltCard>
        </Reveal>
      </Container>
    </div>
  );
}
