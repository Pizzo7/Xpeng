"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { SkeletonImage } from "@/components/media/SkeletonImage";
import { MediaReveal, Pressable } from "@/components/motion";
import type { GalleryItem } from "@/lib/types";
import { durations, easeOut, pressPresets, transitions } from "@/lib/motion";

interface ImageGalleryProps {
  items: GalleryItem[];
}

export function ImageGallery({ items }: ImageGalleryProps) {
  const [active, setActive] = useState(0);
  const current = items[active] ?? items[0];

  if (!current) return null;

  const goPrev = () => {
    setActive((i) => (i - 1 + items.length) % items.length);
  };

  const goNext = () => {
    setActive((i) => (i + 1) % items.length);
  };

  const showArrows = items.length > 1;

  return (
    <div className="space-y-4">
      <MediaReveal className="relative aspect-[16/10] overflow-hidden rounded-sm bg-black">
        <AnimatePresence mode="wait">
          <motion.div
            key={current.src}
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: durations.fast, ease: easeOut }}
          >
            <SkeletonImage
              src={current.src}
              alt={current.alt}
              fill
              quality={90}
              className="object-contain object-center p-4 sm:p-6"
              sizes="(max-width: 1024px) 100vw, 70vw"
              priority
            />
          </motion.div>
        </AnimatePresence>

        {showArrows ? (
          <>
            <motion.button
              type="button"
              aria-label="Previous image"
              onClick={goPrev}
              className="absolute left-3 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-white/25 bg-black/55 text-white backdrop-blur-sm transition-colors hover:border-gold hover:text-gold sm:left-4"
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
              aria-label="Next image"
              onClick={goNext}
              className="absolute right-3 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-white/25 bg-black/55 text-white backdrop-blur-sm transition-colors hover:border-gold hover:text-gold sm:right-4"
              whileHover={pressPresets.icon.whileHover}
              whileTap={pressPresets.icon.whileTap}
              transition={transitions.button}
            >
              <span aria-hidden className="text-lg leading-none">
                ›
              </span>
            </motion.button>
          </>
        ) : null}
      </MediaReveal>
      <div
        className="grid grid-cols-4 gap-2"
        role="listbox"
        aria-label="Gallery thumbnails"
      >
        {items.map((item, index) => (
          <Pressable key={item.src} variant="icon" className="rounded-sm">
            <button
              type="button"
              role="option"
              aria-selected={active === index}
              onClick={() => setActive(index)}
              className={[
                "relative aspect-video w-full cursor-pointer overflow-hidden rounded-sm border bg-black",
                active === index
                  ? "border-gold"
                  : "border-transparent opacity-70 hover:opacity-100",
              ].join(" ")}
            >
              <SkeletonImage
                src={item.src}
                alt={item.alt}
                fill
                className="object-contain object-center p-1"
                sizes="120px"
              />
            </button>
          </Pressable>
        ))}
      </div>
    </div>
  );
}
