"use client";

import { SkeletonImage } from "@/components/media/SkeletonImage";

interface PosterImageProps {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
  fill?: boolean;
  sizes?: string;
}

/** Poster / fallback image with skeleton while loading */
export function PosterImage({
  src,
  alt,
  className = "",
  priority = false,
  fill = true,
  sizes = "100vw",
}: PosterImageProps) {
  return (
    <SkeletonImage
      src={src}
      alt={alt}
      fill={fill}
      priority={priority}
      sizes={sizes}
      className={`object-cover ${className}`}
    />
  );
}
