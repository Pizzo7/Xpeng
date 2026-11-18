"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { playMuted } from "@/lib/autoplay";
import { usePrefersReducedMotion, useShouldAutoplayVideo } from "@/lib/motion";

interface CinematicVideoProps {
  src: string;
  poster?: string;
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
  const [showPoster, setShowPoster] = useState(Boolean(poster));
  const allowAutoplay = useShouldAutoplayVideo();
  const reduced = usePrefersReducedMotion();

  const shouldAutoplay =
    activated && autoPlayWhenAllowed && allowAutoplay && !reduced;

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !shouldAutoplay) return;

    const sync = () => {
      const isPlaying = !video.paused && !video.ended;
      setPlaying(isPlaying);
      if (isPlaying) setShowPoster(false);
    };

    video.addEventListener("play", sync);
    video.addEventListener("playing", sync);
    video.addEventListener("pause", sync);
    const stop = playMuted(video);
    sync();

    return () => {
      stop();
      video.removeEventListener("play", sync);
      video.removeEventListener("playing", sync);
      video.removeEventListener("pause", sync);
    };
  }, [shouldAutoplay, src]);

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
      {poster && (showPoster || !activated) ? (
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
          className="absolute inset-0 z-[1] h-full w-full object-cover"
          src={src}
          poster={poster}
          muted
          playsInline
          autoPlay={shouldAutoplay}
          loop={loop}
          preload={shouldAutoplay ? "auto" : "metadata"}
          aria-label={alt}
        />
      ) : null}

      {overlay ? (
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-black/35" />
      ) : null}

      <button
        type="button"
        onClick={toggle}
        className="absolute bottom-4 right-4 z-10 inline-flex items-center gap-2 rounded-sm border border-white/30 bg-black/75 px-3.5 py-2 text-sm font-medium text-white shadow-sm backdrop-blur-sm transition-colors hover:bg-black/90 sm:bottom-5 sm:right-5 sm:px-4"
        aria-label={playing ? "Pause video" : "Play video"}
      >
        <span aria-hidden className="text-white">
          {playing ? "❚❚" : "▶"}
        </span>
        <span className="text-white">{playing ? "Pause" : "Play"}</span>
      </button>
    </div>
  );
}
