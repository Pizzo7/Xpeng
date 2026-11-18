"use client";

import { TiltCard } from "@/components/motion";
import type { Showroom } from "@/lib/types";
import { MapPlaceholder } from "@/components/showrooms/MapPlaceholder";

interface ShowroomCardProps {
  showroom: Showroom;
}

export function ShowroomCard({ showroom }: ShowroomCardProps) {
  return (
    <TiltCard
      as="article"
      className="overflow-hidden border border-silver/15 bg-ink-soft transition-colors hover:border-gold/40"
    >
      <MapPlaceholder mapUrl={showroom.mapUrl} label={showroom.name} />
      <div className="space-y-3 p-6">
        <p className="text-xs uppercase tracking-brand text-gold">
          {showroom.city}
        </p>
        <h2 className="font-display text-2xl text-mist">{showroom.name}</h2>
        <p className="text-sm text-mist-dim">{showroom.address}</p>
        <p className="text-sm text-mist-dim">
          <a href={`tel:${showroom.phone}`} className="hover:text-mist">
            {showroom.phone}
          </a>
        </p>
        <p className="text-sm text-mist-dim">{showroom.hours}</p>
      </div>
    </TiltCard>
  );
}
