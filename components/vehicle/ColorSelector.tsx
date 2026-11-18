"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { SkeletonImage } from "@/components/media/SkeletonImage";
import { MediaReveal, Pressable } from "@/components/motion";
import type { ColorOption } from "@/lib/types";
import { durations, easeOut } from "@/lib/motion";

interface ColorSelectorProps {
  colors: ColorOption[];
}

export function ColorSelector({ colors }: ColorSelectorProps) {
  const [selected, setSelected] = useState(colors[0]?.id ?? "");
  const active = colors.find((c) => c.id === selected) ?? colors[0];

  if (!active) return null;

  return (
    <div className="space-y-5">
      <MediaReveal className="relative aspect-[16/10] overflow-hidden rounded-sm bg-black">
        <AnimatePresence mode="wait">
          <motion.div
            key={active.id}
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: durations.fast, ease: easeOut }}
          >
            <SkeletonImage
              src={active.image}
              alt={`${active.name} exterior`}
              fill
              quality={90}
              className="object-contain object-center p-4 sm:p-6"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </motion.div>
        </AnimatePresence>
      </MediaReveal>
      <div>
        <p className="mb-3 text-sm text-mist-dim">
          Colour: <span className="text-mist">{active.name}</span>
        </p>
        <div
          className="flex flex-wrap gap-3"
          role="radiogroup"
          aria-label="Exterior colour"
        >
          {colors.map((color) => {
            const checked = color.id === active.id;
            return (
              <Pressable key={color.id} variant="icon" className="rounded-full">
                <button
                  type="button"
                  role="radio"
                  aria-checked={checked}
                  aria-label={color.name}
                  onClick={() => setSelected(color.id)}
                  className={[
                    "h-9 w-9 cursor-pointer rounded-full border-2 transition-colors",
                    checked ? "border-gold" : "border-silver/40",
                  ].join(" ")}
                  style={{ backgroundColor: color.hex }}
                />
              </Pressable>
            );
          })}
        </div>
      </div>
    </div>
  );
}
