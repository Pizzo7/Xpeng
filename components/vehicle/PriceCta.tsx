"use client";

import { Reveal, TiltCard } from "@/components/motion";
import { Button } from "@/components/ui/Button";
import { formatGhs } from "@/lib/format";

interface PriceCtaProps {
  priceGhs: number;
  priceNote: string;
}

export function PriceCta({ priceGhs, priceNote }: PriceCtaProps) {
  return (
    <Reveal direction="left" className="h-full min-h-0">
      <TiltCard className="h-full border border-gold/30 bg-ink-soft p-6 transition-colors hover:border-gold/55 sm:p-8">
        <div className="flex h-full min-h-[16rem] flex-col justify-between gap-6">
          <div>
            <p className="text-xs uppercase tracking-brand text-gold">From</p>
            <p className="mt-2 font-display text-3xl text-mist sm:text-4xl">
              {priceGhs > 0 ? formatGhs(priceGhs) : "Ask for pricing"}
            </p>
            <p className="mt-2 text-sm leading-relaxed text-mist-dim">
              {priceNote}
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button href="/test-drive" variant="gold">
              Book Test Drive
            </Button>
            <Button href="/contact?intent=quote" variant="secondary">
              Request a Quote
            </Button>
          </div>
        </div>
      </TiltCard>
    </Reveal>
  );
}
