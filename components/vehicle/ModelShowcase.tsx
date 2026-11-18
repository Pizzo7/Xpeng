"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";
import { SkeletonImage } from "@/components/media/SkeletonImage";
import { MediaReveal, Pressable } from "@/components/motion";
import { Button } from "@/components/ui/Button";
import type { ColorOption, GalleryItem } from "@/lib/types";
import { formatGhs } from "@/lib/format";
import { getModelSpinVideo } from "@/lib/modelMedia";
import { durations, easeOut } from "@/lib/motion";

interface ModelShowcaseProps {
  modelId: string;
  colors: ColorOption[];
  gallery: GalleryItem[];
  modelName: string;
  priceGhs: number;
  priceNote: string;
}

export function ModelShowcase({
  modelId,
  colors,
  gallery,
  modelName,
  priceGhs,
  priceNote,
}: ModelShowcaseProps) {
  const spinVideo = getModelSpinVideo(modelId);
  const videoRef = useRef<HTMLVideoElement>(null);

  const colorSrcs = useMemo(
    () => new Set(colors.map((c) => c.image)),
    [colors],
  );

  const extraViews = useMemo(
    () => gallery.filter((item) => !colorSrcs.has(item.src)),
    [gallery, colorSrcs],
  );

  const fallback = gallery[0]
    ? {
        id: "gallery-0",
        name: gallery[0].alt || modelName,
        hex: "#888888",
        image: gallery[0].src,
      }
    : null;

  const palette = colors.length > 0 ? colors : fallback ? [fallback] : [];
  const [selectedId, setSelectedId] = useState(palette[0]?.id ?? "");
  const [viewOverride, setViewOverride] = useState<GalleryItem | null>(null);
  const [showVideo, setShowVideo] = useState(Boolean(spinVideo));

  const activeColor =
    palette.find((c) => c.id === selectedId) ?? palette[0] ?? null;

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !spinVideo || !showVideo) return;
    video.muted = true;
    void video.play().catch(() => undefined);
  }, [spinVideo, showVideo, modelId]);

  if (!activeColor && !spinVideo) return null;

  const displaySrc =
    viewOverride?.src ?? activeColor?.image ?? gallery[0]?.src ?? "";
  const displayAlt =
    viewOverride?.alt ??
    (activeColor ? `${modelName} — ${activeColor.name}` : modelName);

  const selectColor = (id: string) => {
    setSelectedId(id);
    setViewOverride(null);
    setShowVideo(false);
  };

  const usingVideo = Boolean(spinVideo && showVideo);

  return (
    <div className="overflow-hidden rounded-sm border border-silver/15 bg-ink-soft">
      <MediaReveal className="relative aspect-[16/9] bg-black sm:aspect-[16/10]">
        {usingVideo && spinVideo ? (
          <video
            key={spinVideo}
            ref={videoRef}
            src={spinVideo}
            className="absolute inset-0 h-full w-full object-contain"
            muted
            loop
            playsInline
            autoPlay
            poster={activeColor?.image ?? gallery[0]?.src}
            aria-label={`${modelName} 360 view`}
          />
        ) : displaySrc ? (
          <AnimatePresence mode="wait">
            <motion.div
              key={displaySrc}
              className="absolute inset-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: durations.fast, ease: easeOut }}
            >
              <SkeletonImage
                src={displaySrc}
                alt={displayAlt}
                fill
                quality={80}
                className="object-contain object-center p-4 sm:p-8"
                sizes="(max-width: 1024px) 100vw, 960px"
                priority
              />
            </motion.div>
          </AnimatePresence>
        ) : null}
      </MediaReveal>

      <div className="grid gap-5 border-t border-silver/15 p-4 sm:gap-6 sm:p-6 md:grid-cols-2 md:items-center md:gap-8">
        <div className="space-y-4">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
            {activeColor ? (
              <p className="text-sm text-mist-dim">
                Colour: <span className="text-mist">{activeColor.name}</span>
              </p>
            ) : null}
            {spinVideo ? (
              <button
                type="button"
                onClick={() => {
                  setShowVideo(true);
                  setViewOverride(null);
                }}
                className={[
                  "cursor-pointer rounded-sm border px-2.5 py-1 text-xs uppercase tracking-brand transition-colors",
                  usingVideo
                    ? "border-gold bg-gold/10 text-gold"
                    : "border-silver/40 text-mist-dim hover:border-gold hover:text-gold",
                ].join(" ")}
              >
                360°
              </button>
            ) : null}
          </div>

          {palette.length > 0 ? (
            <div
              className="flex flex-wrap items-center gap-3"
              role="radiogroup"
              aria-label="Exterior colour"
            >
              {palette.map((color) => {
                const checked =
                  !usingVideo &&
                  color.id === activeColor?.id &&
                  !viewOverride;
                return (
                  <Pressable
                    key={color.id}
                    variant="icon"
                    className="rounded-full"
                  >
                    <button
                      type="button"
                      role="radio"
                      aria-checked={checked}
                      aria-label={color.name}
                      title={color.name}
                      onClick={() => selectColor(color.id)}
                      className={[
                        "h-8 w-8 cursor-pointer rounded-full border-2 transition-colors sm:h-9 sm:w-9",
                        checked ? "border-gold" : "border-silver/40",
                      ].join(" ")}
                      style={{ backgroundColor: color.hex }}
                    />
                  </Pressable>
                );
              })}
            </div>
          ) : null}

          {!usingVideo && extraViews.length > 0 ? (
            <div
              className="flex flex-wrap gap-2"
              role="listbox"
              aria-label="Additional views"
            >
              {extraViews.map((item) => {
                const selected = viewOverride?.src === item.src;
                return (
                  <Pressable
                    key={item.src}
                    variant="icon"
                    className="rounded-sm"
                  >
                    <button
                      type="button"
                      role="option"
                      aria-selected={selected}
                      onClick={() => {
                        setViewOverride(item);
                        setShowVideo(false);
                      }}
                      className={[
                        "relative h-12 w-[4.5rem] cursor-pointer overflow-hidden rounded-sm border bg-black sm:h-14 sm:w-24",
                        selected
                          ? "border-gold"
                          : "border-silver/25 opacity-80 hover:opacity-100",
                      ].join(" ")}
                    >
                      <SkeletonImage
                        src={item.src}
                        alt={item.alt}
                        fill
                        className="object-contain object-center p-1"
                        sizes="96px"
                      />
                    </button>
                  </Pressable>
                );
              })}
            </div>
          ) : null}
        </div>

        <div className="flex flex-col gap-4 border-t border-silver/10 pt-5 md:items-end md:border-t-0 md:pt-0 md:text-right">
          <div>
            <p className="text-xs uppercase tracking-brand text-gold">From</p>
            <p className="mt-1 break-words font-display text-2xl leading-none text-mist sm:text-3xl md:text-4xl">
              {priceGhs > 0 ? formatGhs(priceGhs) : "Ask for pricing"}
            </p>
            <p className="mt-2 max-w-sm text-sm leading-relaxed text-mist-dim md:ml-auto">
              {priceNote}
            </p>
          </div>
          <div className="flex w-full flex-col gap-2.5 sm:w-auto sm:flex-row sm:flex-wrap sm:gap-3 md:justify-end">
            <Button
              href="/test-drive"
              variant="gold"
              size="sm"
              className="w-full sm:w-auto"
            >
              Book Test Drive
            </Button>
            <Button
              href="/contact?intent=quote"
              variant="secondary"
              size="sm"
              className="w-full sm:w-auto"
            >
              Request a Quote
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
