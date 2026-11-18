"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { mediaRevealVariants } from "@/lib/motion";

interface MediaRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  once?: boolean;
}

/**
 * Image / video enter: fade + soft scale 1.04 → 1 when scrolled into view.
 * Wrap the media frame only — not entire sections.
 */
export function MediaReveal({
  children,
  className,
  delay = 0,
  once = true,
}: MediaRevealProps) {
  return (
    <motion.div
      className={className}
      variants={mediaRevealVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount: 0.2 }}
      transition={{ delay }}
    >
      {children}
    </motion.div>
  );
}
