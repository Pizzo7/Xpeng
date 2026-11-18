"use client";

import { useEffect, useRef, useState } from "react";
import { CinematicVideo } from "@/components/media/CinematicVideo";

interface LazyVideoProps {
  src: string;
  poster?: string;
  alt: string;
  className?: string;
  loop?: boolean;
}

/** Mounts cinematic video only when scrolled near viewport */
export function LazyVideo({
  src,
  poster,
  alt,
  className = "",
  loop = true,
}: LazyVideoProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "200px" },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className={className}>
      {visible ? (
        <CinematicVideo
          src={src}
          poster={poster}
          alt={alt}
          className="h-full w-full"
          lazy
          loop={loop}
          autoPlayWhenAllowed={false}
        />
      ) : (
        <div className="relative h-full min-h-[240px] w-full bg-ink-muted">
          {poster ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={poster}
              alt={alt}
              className="absolute inset-0 h-full w-full object-cover"
              loading="lazy"
            />
          ) : null}
        </div>
      )}
    </div>
  );
}
