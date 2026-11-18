"use client";

import { useEffect, useRef, useState } from "react";

interface InViewVideoProps {
  src: string;
  className?: string;
  poster?: string;
  label?: string;
  /** object-fit class — default object-cover */
  fit?: "cover" | "contain";
}

/**
 * Plays muted looping video only while in (or near) the viewport.
 * Keeps preload=none until first intersection to protect mobile data + LCP.
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
        const visible = Boolean(entry?.isIntersecting);
        setActive(visible);
        const video = videoRef.current;
        if (!video) return;
        if (visible) {
          video.muted = true;
          void video.play().catch(() => undefined);
        } else {
          video.pause();
        }
      },
      { rootMargin: "120px", threshold: 0.15 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className={["relative overflow-hidden bg-black", className].join(" ")}>
      {active ? (
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
          preload="metadata"
          aria-label={label}
        />
      ) : poster ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={poster}
          alt={label ?? ""}
          className={[
            "absolute inset-0 h-full w-full",
            fit === "contain" ? "object-contain" : "object-cover",
          ].join(" ")}
          loading="lazy"
          decoding="async"
        />
      ) : (
        <div className="absolute inset-0 bg-ink-muted" />
      )}
    </div>
  );
}
