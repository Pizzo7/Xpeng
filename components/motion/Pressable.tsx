"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { pressPresets, transitions } from "@/lib/motion";

type PressVariant = keyof typeof pressPresets;

interface PressableProps {
  children: ReactNode;
  /** button | card | icon — shared hover/tap language */
  variant?: PressVariant;
  className?: string;
  as?: "div" | "article" | "li" | "span";
  disabled?: boolean;
}

/**
 * Quiet hover / tap feedback for cards, icons, and custom clickables.
 * Prefer MotionButton for real CTAs; use Pressable for everything else.
 */
export function Pressable({
  children,
  variant = "card",
  className,
  as = "div",
  disabled = false,
}: PressableProps) {
  const Tag = motion[as];
  const preset = pressPresets[variant];

  return (
    <Tag
      className={className}
      whileHover={disabled ? undefined : preset.whileHover}
      whileTap={disabled ? undefined : preset.whileTap}
      transition={transitions.button}
    >
      {children}
    </Tag>
  );
}
