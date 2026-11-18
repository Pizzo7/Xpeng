"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

interface FieldShakeProps {
  children: ReactNode;
  /** When true, play a short horizontal shake */
  shake: boolean;
  className?: string;
}

/**
 * Tiny side-to-side shake when a form field has an error.
 * Only animates x — layout stays put.
 */
export function FieldShake({ children, shake, className }: FieldShakeProps) {
  return (
    <motion.div
      className={className}
      animate={shake ? { x: [0, -6, 6, -4, 4, 0] } : { x: 0 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}
