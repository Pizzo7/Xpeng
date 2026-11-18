import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Accordion } from "@/components/ui/Accordion";
import { Reveal, Stagger, StaggerItem, TiltCard } from "@/components/motion";
import { getOwnershipContent } from "@/lib/data";

export const metadata: Metadata = {
  title: "Ownership",
  description:
    "Charging, warranty, service, and FAQ guidance for XPENG owners in Ghana.",
};

export default function OwnershipPage() {
  const ownership = getOwnershipContent();

  return (
    <div className="pt-8 pb-12 sm:pt-10 sm:pb-16">
      <Container>
        <Reveal>
          <SectionHeading
            title="Support that stays with you"
            description="Guidance for charging, warranty, and service across the XPENG Ghana ownership journey."
            className="mb-8"
          />
        </Reveal>

        <Stagger className="mb-12 grid gap-6 md:grid-cols-3">
          {[
            { title: "Charging", body: ownership.charging },
            { title: "Warranty", body: ownership.warranty },
            { title: "Service", body: ownership.service },
          ].map((block, index) => (
            <StaggerItem
              key={block.title}
              direction={index % 2 === 0 ? "left" : "right"}
            >
              <TiltCard
                as="article"
                className="h-full border border-silver/15 bg-ink-soft p-6"
              >
                <h2 className="font-display text-2xl text-mist">{block.title}</h2>
                <p className="mt-3 text-sm leading-relaxed text-mist-dim">
                  {block.body}
                </p>
              </TiltCard>
            </StaggerItem>
          ))}
        </Stagger>

        <Reveal>
          <h2 className="mb-6 font-display text-3xl text-mist">FAQ</h2>
        </Reveal>
        <Reveal delay={0.06}>
          <Accordion items={ownership.faq} />
        </Reveal>
      </Container>
    </div>
  );
}
