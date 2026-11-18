"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { SkeletonImage } from "@/components/media/SkeletonImage";
import { Reveal } from "@/components/motion";
import { models } from "@/lib/data";
import { getModelSpinVideo } from "@/lib/modelMedia";
import { playMuted } from "@/lib/autoplay";
import { easeOut, pressPresets, transitions } from "@/lib/motion";

const SWAP_MS = 700;

const yawVariants = {
  enter: (dir: number) => ({
    opacity: 0,
    x: dir * 48,
  }),
  center: {
    opacity: 1,
    x: 0,
  },
  exit: (dir: number) => ({
    opacity: 0,
    x: dir * -48,
  }),
};

/**
 * Model showcase — 360 video when available, otherwise a static studio image.
 */
export function ModelFinder() {
  const list = models.models;
  const [activeId, setActiveId] = useState(list[0]?.id ?? "g9l");
  const [direction, setDirection] = useState(1);
  const [hovered, setHovered] = useState(false);
  const [swapping, setSwapping] = useState(false);
  const swapTimer = useRef<number | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const activeIndex = useMemo(
    () => Math.max(0, list.findIndex((m) => m.id === activeId)),
    [activeId, list],
  );
  const active = list[activeIndex] ?? list[0];
  const spinVideo = active ? getModelSpinVideo(active.id) : undefined;

  useEffect(() => {
    return () => {
      if (swapTimer.current) window.clearTimeout(swapTimer.current);
    };
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !spinVideo) return;
    if (hovered || swapping) {
      video.pause();
      return;
    }
    return playMuted(video);
  }, [hovered, swapping, spinVideo, activeId]);

  if (!active) return null;

  const beginSwap = () => {
    setSwapping(true);
    if (swapTimer.current) window.clearTimeout(swapTimer.current);
    swapTimer.current = window.setTimeout(() => setSwapping(false), SWAP_MS);
  };

  const goTo = (index: number, dir?: 1 | -1) => {
    const next = list[index];
    if (!next || next.id === activeId) return;
    setDirection(dir ?? (index > activeIndex ? 1 : -1));
    beginSwap();
    setActiveId(next.id);
  };

  const goPrev = () => goTo((activeIndex - 1 + list.length) % list.length, -1);
  const goNext = () => goTo((activeIndex + 1) % list.length, 1);

  return (
    <section className="bg-[color:var(--ink-soft)] py-section-sm sm:py-section">
      <Container>
        <Reveal direction="left">
          <div className="text-center">
            <h2 className="font-display text-3xl text-mist sm:text-4xl md:text-5xl">
              Find your ideal XPENG
            </h2>
            <p className="mt-3 text-mist-dim">
              Pick a model — browse with the arrows or the tabs above.
            </p>
          </div>
        </Reveal>

        <div
          className="mt-8 flex flex-wrap justify-center gap-2"
          role="tablist"
          aria-label="Model picker"
        >
          {list.map((model, index) => {
            const selected = model.id === active.id;
            return (
              <motion.button
                key={model.id}
                type="button"
                role="tab"
                aria-selected={selected}
                onClick={() => goTo(index)}
                className={[
                  "cursor-pointer rounded border px-3 py-2 text-sm tracking-wide transition-colors duration-75",
                  selected
                    ? "border-mist bg-mist text-ink"
                    : "border-silver/30 bg-transparent text-mist-dim hover:border-gold hover:bg-gold/15 hover:text-mist",
                ].join(" ")}
                whileHover={{ scale: 1.06, y: -2 }}
                whileTap={{ scale: 0.96 }}
                transition={{ duration: 0.12, ease: easeOut }}
              >
                {model.name}
              </motion.button>
            );
          })}
        </div>

        <div className="relative mt-10 overflow-hidden rounded border border-silver/15 bg-black">
          <div
            className="relative aspect-[16/9] sm:aspect-[21/9]"
            style={{ perspective: 1200 }}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
          >
            <AnimatePresence initial={false} custom={direction}>
              <motion.div
                key={active.id}
                custom={direction}
                variants={yawVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.55, ease: easeOut }}
                className="absolute inset-0 bg-black"
              >
                {spinVideo ? (
                  <video
                    ref={videoRef}
                    src={spinVideo}
                    poster={active.poster}
                    className="absolute inset-0 h-full w-full object-contain object-center p-4 sm:p-6"
                    autoPlay
                    muted
                    playsInline
                    loop
                    preload="auto"
                    aria-label={`${active.fullName} 360 view`}
                  />
                ) : (
                  <SkeletonImage
                    src={active.poster}
                    alt={`${active.fullName} preview`}
                    fill
                    quality={75}
                    className="object-contain object-center p-4 sm:p-6"
                    sizes="100vw"
                  />
                )}
              </motion.div>
            </AnimatePresence>

            <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[5] bg-gradient-to-t from-black/80 to-transparent pt-24" />
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={active.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.35, ease: easeOut }}
                className="absolute inset-x-3 bottom-3 z-[5] flex sm:inset-x-auto sm:bottom-5 sm:right-5 sm:justify-end sm:pl-12"
              >
                <Button
                  href={active.href}
                  variant="secondary"
                  size="sm"
                  className="w-full rounded sm:w-auto"
                >
                  Explore {active.name}
                </Button>
              </motion.div>
            </AnimatePresence>

            <motion.button
              type="button"
              aria-label="Previous model"
              onClick={goPrev}
              className="absolute left-3 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-white/25 bg-black/55 text-white backdrop-blur-sm transition-colors hover:border-gold hover:text-gold sm:left-4 sm:h-11 sm:w-11"
              whileHover={pressPresets.icon.whileHover}
              whileTap={pressPresets.icon.whileTap}
              transition={transitions.button}
            >
              <span aria-hidden className="text-lg leading-none">
                ‹
              </span>
            </motion.button>

            <motion.button
              type="button"
              aria-label="Next model"
              onClick={goNext}
              className="absolute right-3 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-white/25 bg-black/55 text-white backdrop-blur-sm transition-colors hover:border-gold hover:text-gold sm:right-4 sm:h-11 sm:w-11"
              whileHover={pressPresets.icon.whileHover}
              whileTap={pressPresets.icon.whileTap}
              transition={transitions.button}
            >
              <span aria-hidden className="text-lg leading-none">
                ›
              </span>
            </motion.button>
          </div>
        </div>

        <Reveal direction="right" className="mt-8 text-center">
          <Link
            href="/models"
            className="cursor-pointer text-sm text-gold underline-offset-4 hover:underline"
          >
            View full lineup →
          </Link>
        </Reveal>
      </Container>
    </section>
  );
}
