"use client";

import { Pressable } from "@/components/motion";

interface MapPlaceholderProps {
  mapUrl: string;
  label: string;
}

/** Compact map CTA used on showroom cards */
export function MapPlaceholder({ mapUrl, label }: MapPlaceholderProps) {
  const hasLink = Boolean(mapUrl && mapUrl !== "#");

  return (
    <div className="relative flex h-36 items-center justify-center overflow-hidden bg-ink-muted grain sm:h-40">
      <div className="absolute inset-0 bg-gradient-to-br from-ink via-transparent to-gold/10" />
      <div className="relative z-10 px-4 text-center">
        <p className="text-xs uppercase tracking-brand text-gold">Location</p>
        <p className="mt-2 text-sm text-mist-dim">{label}</p>
        {hasLink ? (
          <Pressable as="span" variant="icon" className="mt-3 inline-block">
            <a
              href={mapUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="cursor-pointer text-sm text-gold hover:underline"
              aria-label={`Open map for ${label}`}
            >
              Open map →
            </a>
          </Pressable>
        ) : (
          <p className="mt-3 text-xs text-silver-dark">Map link coming soon</p>
        )}
      </div>
    </div>
  );
}
