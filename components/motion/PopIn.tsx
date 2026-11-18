"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { popInVariants } from "@/lib/motion";

interface PopInProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  once?: boolean;
}

/**
 * Soft spring scale (0.85 → 1) with a fade.
 * Good for feature cards and small badges — not for large text blocks.
 */
export function PopIn({
  children,
  className,
  delay = 0,
  once = true,
}: PopInProps) {
  return (
    <motion.div
      className={className}
      variants={popInVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount: 0.2 }}
      transition={{ delay }}
    >
      {children}
    </motion.div>
  );
}
