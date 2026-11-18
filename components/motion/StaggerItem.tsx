"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { staggerItemFrom, type StaggerDirection } from "@/lib/motion";

interface StaggerItemProps {
  children: ReactNode;
  className?: string;
  as?: "div" | "li" | "article" | "dt" | "dd" | "tr";
  /** Slide enter direction — alternate left/right in grids */
  direction?: StaggerDirection;
}

/**
 * One item inside a Stagger parent.
 * Defaults to fade-up; use direction left/right for scroll slide-ins.
 */
export function StaggerItem({
  children,
  className,
  as = "div",
  direction = "up",
}: StaggerItemProps) {
  const Tag = motion[as];

  return (
    <Tag
      className={className}
      variants={staggerItemFrom(direction)}
      style={{ transformStyle: "preserve-3d" }}
    >
      {children}
    </Tag>
  );
}
