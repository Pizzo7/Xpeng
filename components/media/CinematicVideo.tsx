"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { usePrefersReducedMotion, useShouldAutoplayVideo } from "@/lib/motion";

interface CinematicVideoProps {
  src: string;
  poster: string;
  alt: string;
  className?: string;
  /** Autoplay only when policy allows (desktop + good connection) */
  autoPlayWhenAllowed?: boolean;
  loop?: boolean;
  priority?: boolean;
  /** When true, video starts only after user play (always for below-fold) */
  lazy?: boolean;
  /** Skip the built-in dim overlay (hero paints its own) */
  overlay?: boolean;
}

export function CinematicVideo({
  src,
  poster,
  alt,
  className = "",
  autoPlayWhenAllowed = false,
  loop = true,
  priority = false,
  lazy = false,
  overlay = true,
}: CinematicVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [activated, setActivated] = useState(!lazy);
  const [showPoster, setShowPoster] = useState(true);
  const allowAutoplay = useShouldAutoplayVideo();
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    if (!activated || lazy || !autoPlayWhenAllowed || !allowAutoplay || reduced) {
      return;
    }
    const video = videoRef.current;
    if (!video) return;

    const play = async () => {
      try {
        video.muted = true;
        await video.play();
        setPlaying(true);
        setShowPoster(false);
      } catch {
        setPlaying(false);
        setShowPoster(true);
      }
    };

    void play();
  }, [activated, lazy, autoPlayWhenAllowed, allowAutoplay, reduced]);

  const toggle = async () => {
    const video = videoRef.current;
    if (!activated) {
      setActivated(true);
      // Wait a tick for video mount
      requestAnimationFrame(async () => {
        const v = videoRef.current;
        if (!v) return;
        try {
          v.muted = true;
          await v.play();
          setPlaying(true);
          setShowPoster(false);
        } catch {
          setPlaying(false);
        }
      });
      return;
    }

    if (!video) return;

    if (video.paused) {
      try {
        await video.play();
        setPlaying(true);
        setShowPoster(false);
      } catch {
        setPlaying(false);
      }
    } else {
      video.pause();
      setPlaying(false);
    }
  };

  return (
    <div className={`relative overflow-hidden bg-ink-muted ${className}`}>
      {showPoster || !activated ? (
        <Image
          src={poster}
          alt={alt}
          fill
          priority={priority}
          sizes="100vw"
          className="object-cover"
        />
      ) : null}

      {activated ? (
        <video
          ref={videoRef}
          className={[
            "absolute inset-0 h-full w-full object-cover",
            showPoster ? "opacity-0" : "opacity-100",
          ].join(" ")}
          src={src}
          poster={poster}
          muted
          playsInline
          loop={loop}
          preload={lazy ? "none" : "metadata"}
          aria-label={alt}
          onPlay={() => {
            setPlaying(true);
            setShowPoster(false);
          }}
          onPause={() => setPlaying(false)}
        />
      ) : null}

      {overlay ? (
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-ink/30" />
      ) : null}

      <button
        type="button"
        onClick={toggle}
        className="absolute bottom-5 right-5 z-10 inline-flex items-center gap-2 rounded-sm border border-white/20 bg-ink/70 px-4 py-2 text-sm text-mist backdrop-blur-sm hover:bg-ink/90 transition-colors"
        aria-label={playing ? "Pause video" : "Play video"}
      >
        <span aria-hidden>{playing ? "❚❚" : "▶"}</span>
        {playing ? "Pause" : "Play"}
      </button>
    </div>
  );
}
