"use client";

import { ParallaxFrame } from "@/components/motion";

interface LifestyleParallaxMediaProps {
  video: string;
  poster: string;
  alt: string;
}

/**
 * Lifestyle card media — muted autoplay loop with light desktop parallax.
 */
export function LifestyleParallaxMedia({
  video,
  poster,
  alt,
}: LifestyleParallaxMediaProps) {
  return (
    <ParallaxFrame className="aspect-video bg-black" distance={40}>
      <video
        src={video}
        poster={poster}
        className="h-full w-full object-cover"
        autoPlay
        muted
        playsInline
        loop
        preload="metadata"
        aria-label={alt}
      />
    </ParallaxFrame>
  );
}
