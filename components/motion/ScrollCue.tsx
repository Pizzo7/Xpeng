"use client";

import { motion } from "framer-motion";
import { durations, easeOut } from "@/lib/motion";

interface ScrollCueProps {
  className?: string;
  label?: string;
}

/**
 * Hero scroll indicator — soft y pulse.
 */
export function ScrollCue({
  className,
  label = "Scroll",
}: ScrollCueProps) {
  return (
    <div
      className={[
        "pointer-events-none flex flex-col items-center gap-2",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      aria-hidden
    >
      <span className="sr-only">{label}</span>
      <div className="flex h-9 w-5 items-start justify-center rounded-full border border-mist/40 p-1">
        <motion.span
          className="mt-1 h-1.5 w-1 rounded-full bg-mist/70"
          animate={{
            y: [0, 8, 0],
            opacity: [0.45, 1, 0.45],
          }}
          transition={{
            duration: durations.slow * 2.2,
            ease: easeOut,
            repeat: Infinity,
          }}
        />
      </div>
    </div>
  );
}
