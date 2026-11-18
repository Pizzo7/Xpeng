"use client";

import { Stagger, StaggerItem, TiltCard } from "@/components/motion";
import type { Feature } from "@/lib/types";

interface FeatureHighlightsProps {
  features: Feature[];
}

export function FeatureHighlights({ features }: FeatureHighlightsProps) {
  return (
    <Stagger className="grid auto-rows-fr gap-4 sm:grid-cols-2 sm:gap-5">
      {features.map((feature, index) => (
        <StaggerItem
          key={feature.id}
          direction={index % 2 === 0 ? "left" : "right"}
          className="h-full min-h-0"
        >
          <TiltCard
            as="article"
            className="h-full border border-silver/15 bg-ink-soft p-6"
          >
            <div className="flex h-full flex-col">
              <h3 className="font-display text-xl text-mist">{feature.title}</h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-mist-dim">
                {feature.description}
              </p>
            </div>
          </TiltCard>
        </StaggerItem>
      ))}
    </Stagger>
  );
}
