"use client";

import { useEffect, useRef, useState } from "react";
import { playMuted } from "@/lib/autoplay";

interface InViewVideoProps {
  src: string;
  className?: string;
  poster?: string;
  label?: string;
  /** object-fit class — default object-cover */
  fit?: "cover" | "contain";
}

/**
 * Muted looping video. Starts after the element is mounted and on screen.
 */
export function InViewVideo({
  src,
  className = "",
  poster,
  label,
  fit = "cover",
}: InViewVideoProps) {
  const ref = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setActive(Boolean(entry?.isIntersecting));
      },
      { rootMargin: "120px", threshold: 0.15 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (!active) {
      video.pause();
      return;
    }

    return playMuted(video);
  }, [active, src]);

  return (
    <div
      ref={ref}
      className={["relative overflow-hidden bg-black", className].join(" ")}
    >
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        className={[
          "absolute inset-0 h-full w-full",
          fit === "contain" ? "object-contain" : "object-cover",
        ].join(" ")}
        muted
        playsInline
        loop
        autoPlay={active}
        preload={active ? "auto" : "metadata"}
        aria-label={label}
      />
    </div>
  );
}
