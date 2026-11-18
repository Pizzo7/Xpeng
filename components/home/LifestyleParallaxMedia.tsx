"use client";

import { InViewVideo } from "@/components/media/InViewVideo";
import { ParallaxFrame } from "@/components/motion";

interface LifestyleParallaxMediaProps {
  video: string;
  poster: string;
  alt: string;
}

/**
 * Lifestyle card media — muted in-view loop with light desktop parallax.
 */
export function LifestyleParallaxMedia({
  video,
  poster,
  alt,
}: LifestyleParallaxMediaProps) {
  return (
    <ParallaxFrame className="aspect-video bg-black" distance={40}>
      <InViewVideo
        src={video}
        poster={poster}
        label={alt}
        className="absolute inset-0 h-full w-full"
      />
    </ParallaxFrame>
  );
}
