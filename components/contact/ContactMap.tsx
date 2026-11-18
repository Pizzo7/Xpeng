import type { ContactLocation } from "@/lib/types";

interface ContactMapProps {
  location: ContactLocation;
}

/**
 * Professional embedded map for the Accra showroom.
 * Replace mapEmbedUrl / mapUrl in data/site.json with the final pin.
 */
export function ContactMap({ location }: ContactMapProps) {
  return (
    <div className="overflow-hidden rounded-sm border border-silver/20 bg-ink-soft shadow-[0_24px_60px_-28px_rgba(0,0,0,0.55)]">
      <div className="flex flex-wrap items-end justify-between gap-3 border-b border-silver/15 px-4 py-4 sm:px-6">
        <div className="min-w-0 flex-1">
          <h3 className="font-display text-lg text-mist sm:text-xl">
            {location.name}
          </h3>
          <p className="mt-1 break-words text-sm text-mist-dim">
            {location.address}
          </p>
        </div>
        <a
          href={location.mapUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="cursor-pointer text-sm text-gold underline-offset-4 hover:underline"
        >
          Open in Maps →
        </a>
      </div>

      <div className="relative h-44 w-full bg-ink-muted sm:h-52 md:h-56">
        <iframe
          title={`Map — ${location.name}`}
          src={location.mapEmbedUrl}
          className="absolute inset-0 h-full w-full border-0 grayscale-[20%] contrast-[1.05]"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
        />
        <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-black/10" />
      </div>
    </div>
  );
}
