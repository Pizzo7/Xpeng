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
 * Muted looping video. The file stays unloaded until the block is near
 * the viewport, then plays once it is actually on screen.
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
  const [near, setNear] = useState(false);
  const [active, setActive] = useState(false);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const nearObserver = new IntersectionObserver(
      ([entry]) => setNear(Boolean(entry?.isIntersecting)),
      { rootMargin: "600px", threshold: 0 },
    );
    const activeObserver = new IntersectionObserver(
      ([entry]) => setActive(Boolean(entry?.isIntersecting)),
      { rootMargin: "120px", threshold: 0.15 },
    );

    nearObserver.observe(node);
    activeObserver.observe(node);
    return () => {
      nearObserver.disconnect();
      activeObserver.disconnect();
    };
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (!near || !active) {
      video.pause();
      return;
    }

    return playMuted(video);
  }, [active, near, src]);

  const fitClass = fit === "contain" ? "object-contain" : "object-cover";

  return (
    <div
      ref={ref}
      className={["relative overflow-hidden bg-black", className].join(" ")}
    >
      {poster && !playing ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={poster}
          alt=""
          className={["absolute inset-0 h-full w-full", fitClass].join(" ")}
        />
      ) : null}
      <video
        ref={videoRef}
        src={near ? src : undefined}
        poster={poster}
        className={[
          "absolute inset-0 h-full w-full",
          fitClass,
          playing ? "opacity-100" : "opacity-0",
        ].join(" ")}
        muted
        playsInline
        loop
        autoPlay={near && active}
        preload={near ? "metadata" : "none"}
        aria-label={label}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
      />
    </div>
  );
}
