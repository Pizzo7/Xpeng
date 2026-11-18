import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { Reveal, Stagger, StaggerItem, TiltCard } from "@/components/motion";
import { ContactMap } from "@/components/contact/ContactMap";
import { site } from "@/lib/data";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Visit XPENG Ghana in Accra or reach us by phone, WhatsApp, and email.",
};

export default function ContactPage() {
  const location = site.contactLocation;

  return (
    <div className="pb-section-sm sm:pb-section">
      <section className="bg-ink-soft pt-8 pb-5 sm:pt-10 sm:pb-6">
        <Container>
          <Reveal>
            <SectionHeading title="Visit us in Accra" align="center" />
          </Reveal>
        </Container>
      </section>

      <Container className="mt-6 space-y-12 sm:mt-8">
        <ContactMap location={location} />

        <div className="space-y-6">
          <Reveal>
            <h2 className="text-center font-display text-2xl text-mist sm:text-3xl">
              Reach the team
            </h2>
          </Reveal>

          <div className="grid gap-8 lg:grid-cols-2 lg:items-stretch">
            <Reveal direction="left" className="h-full min-h-0">
              <TiltCard className="h-full border border-silver/15 bg-ink-soft p-6 transition-colors hover:border-gold/40 sm:p-8">
                <div className="flex h-full min-h-[22rem] flex-col justify-between gap-6">
                  <div className="space-y-6">
                    <div>
                      <p className="text-xs uppercase tracking-brand text-gold">
                        Showroom
                      </p>
                      <h2 className="mt-2 font-display text-2xl text-mist">
                        {location.name}
                      </h2>
                    </div>
                    <dl className="space-y-4 text-sm">
                      <div>
                        <dt className="text-silver">Address</dt>
                        <dd className="mt-1 leading-relaxed text-mist">
                          {location.address}
                        </dd>
                      </div>
                      <div>
                        <dt className="text-silver">City</dt>
                        <dd className="mt-1 text-mist">{location.city}</dd>
                      </div>
                      <div>
                        <dt className="text-silver">Hours</dt>
                        <dd className="mt-1 text-mist">{location.hours}</dd>
                      </div>
                    </dl>
                  </div>
                  <div className="space-y-3">
                    <div className="flex flex-wrap gap-3">
                      <Button href="/test-drive" variant="gold">
                        Book a Test Drive
                      </Button>
                      <a
                        href={location.mapUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex cursor-pointer items-center justify-center rounded-sm border border-silver/40 bg-transparent px-6 py-3 text-sm font-medium tracking-wide text-mist transition-colors hover:border-mist hover:bg-surface-hover"
                      >
                        Get directions
                      </a>
                    </div>
                    <p className="text-xs text-mist-dim">
                      Located in Airport City, Accra — open directions for the
                      exact pin.
                    </p>
                  </div>
                </div>
              </TiltCard>
            </Reveal>

            <Stagger className="grid h-full min-h-0 grid-rows-3 gap-3">
              <StaggerItem direction="right" className="min-h-0 h-full">
                <TiltCard className="h-full border border-silver/15 bg-ink-soft px-6 py-4 transition-colors hover:border-gold/40">
                  <div className="flex h-full flex-col justify-center">
                    <p className="text-xs uppercase tracking-brand text-gold">
                      Phone
                    </p>
                    <a
                      href={`tel:${site.phone}`}
                      className="mt-2 block cursor-pointer font-display text-xl text-mist hover:text-gold sm:text-2xl"
                    >
                      {site.phone}
                    </a>
                  </div>
                </TiltCard>
              </StaggerItem>
              <StaggerItem direction="left" className="min-h-0 h-full">
                <TiltCard className="h-full border border-silver/15 bg-ink-soft px-6 py-4 transition-colors hover:border-gold/40">
                  <div className="flex h-full flex-col justify-center">
                    <p className="text-xs uppercase tracking-brand text-gold">
                      WhatsApp
                    </p>
                    <p className="mt-2 font-display text-xl text-mist sm:text-2xl">
                      {site.whatsapp}
                    </p>
                  </div>
                </TiltCard>
              </StaggerItem>
              <StaggerItem direction="right" className="min-h-0 h-full">
                <TiltCard className="h-full border border-silver/15 bg-ink-soft px-6 py-4 transition-colors hover:border-gold/40">
                  <div className="flex h-full flex-col justify-center">
                    <p className="text-xs uppercase tracking-brand text-gold">
                      Email
                    </p>
                    <a
                      href={`mailto:${site.email}`}
                      className="mt-2 block cursor-pointer break-all font-display text-xl text-mist hover:text-gold sm:text-2xl"
                    >
                      {site.email}
                    </a>
                  </div>
                </TiltCard>
              </StaggerItem>
            </Stagger>
          </div>
        </div>

        <Reveal>
          <p className="text-sm text-mist-dim">
            We also support customers across {site.cities.join(", ")}.
          </p>
        </Reveal>
      </Container>
    </div>
  );
}
