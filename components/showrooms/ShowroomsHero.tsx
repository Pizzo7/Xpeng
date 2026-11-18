"use client";

import { CinematicVideo } from "@/components/media/CinematicVideo";

/**
 * Showrooms hero — multi-model showroom film, media only.
 */
export function ShowroomsHero() {
  return (
    <section className="relative min-h-[78svh] overflow-hidden bg-black">
      <div className="absolute inset-0">
        <CinematicVideo
          src="/videos/xpeng_showroom_multi_models.mp4"
          poster="/videos/tracking-poster.jpg"
          alt="XPENG models in the Ghana showroom"
          className="h-full w-full"
          autoPlayWhenAllowed
          priority
          loop
          overlay={false}
        />
      </div>
    </section>
  );
}
