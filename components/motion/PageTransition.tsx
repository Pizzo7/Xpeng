"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { pageVariants } from "@/lib/motion";

/**
 * Short fade + slight upward settle when a page mounts.
 * Use from app/template.tsx so layouts stay as server components.
 */
export function PageTransition({ children }: { children: ReactNode }) {
  return (
    <motion.div
      variants={pageVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      {children}
    </motion.div>
  );
}
