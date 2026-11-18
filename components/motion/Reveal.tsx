"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import {
  revealVariants,
  transitions,
  type RevealDirection,
} from "@/lib/motion";

interface RevealProps {
  children: ReactNode;
  /** Wait before starting (seconds) */
  delay?: number;
  /** Which way the content slides in */
  direction?: RevealDirection;
  /** Play only once when first seen (default true) */
  once?: boolean;
  className?: string;
  as?: "div" | "section" | "article" | "li" | "span";
}

/**
 * Fades in and slides a short distance when the block scrolls into view.
 * Uses opacity + x/y only — no layout jumps.
 */
export function Reveal({
  children,
  delay = 0,
  direction = "up",
  once = true,
  className,
  as = "div",
}: RevealProps) {
  const Tag = motion[as];

  return (
    <Tag
      className={className}
      custom={direction}
      variants={revealVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount: 0.2 }}
      transition={{ ...transitions.reveal, delay }}
    >
      {children}
    </Tag>
  );
}
