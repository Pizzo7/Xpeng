import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Reveal, TiltCard } from "@/components/motion";
import { site } from "@/lib/data";

export function TestDrivePreview() {
  return (
    <section className="py-section-sm sm:py-section bg-ink-soft border-y border-white/5">
      <Container>
        <div className="grid gap-8 lg:grid-cols-[1.4fr_1fr] lg:items-end">
          <Reveal direction="left">
            <div>
              <p className="mb-3 text-xs uppercase tracking-brand text-gold">
                Visit us
              </p>
              <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-mist text-balance">
                Feel XPENG on Ghana’s roads
              </h2>
              <p className="mt-4 max-w-xl text-mist-dim leading-relaxed">
                Book a test drive across the XPENG lineup in Accra, Kumasi, or
                another major city. Our team will welcome you at a local
                showroom and walk you through the cabin, charging, and ownership
                journey.
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.1} direction="right">
            <TiltCard className="space-y-4 border border-silver/15 bg-ink p-6 transition-colors hover:border-gold/40">
              <p className="text-sm text-mist-dim">
                Call {site.phone} · WhatsApp {site.whatsapp}
              </p>
              <p className="text-sm text-mist-dim">
                Email{" "}
                <a
                  href={`mailto:${site.email}`}
                  className="text-gold hover:underline"
                >
                  {site.email}
                </a>
              </p>
              <div className="flex flex-wrap gap-3 pt-2">
                <Button href="/test-drive" variant="gold">
                  Book a Test Drive
                </Button>
                <Button href="/contact" variant="secondary">
                  Contact
                </Button>
              </div>
            </TiltCard>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
