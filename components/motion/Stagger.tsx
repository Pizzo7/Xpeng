"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { staggerContainer } from "@/lib/motion";

interface StaggerProps {
  children: ReactNode;
  className?: string;
  once?: boolean;
  as?: "div" | "ul" | "ol" | "section" | "dl" | "tbody";
}

/**
 * Parent wrapper that staggers child StaggerItem animations by 0.12s.
 * Put StaggerItem around each card or list row.
 */
export function Stagger({
  children,
  className,
  once = true,
  as = "div",
}: StaggerProps) {
  const Tag = motion[as];

  return (
    <Tag
      className={className}
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount: 0.2 }}
    >
      {children}
    </Tag>
  );
}
