"use client";

import { motion } from "framer-motion";
import { useTheme } from "@/components/theme/ThemeProvider";
import { pressPresets, transitions } from "@/lib/motion";

/**
 * Quiet utility control — sits before Test Drive, not a third CTA.
 */
export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <motion.button
      type="button"
      onClick={toggleTheme}
      className="inline-flex h-10 w-10 shrink-0 cursor-pointer items-center justify-center rounded border border-silver/30 bg-transparent text-mist transition-colors hover:border-silver/50 hover:bg-surface-hover hover:text-gold"
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      title={isDark ? "Light mode" : "Dark mode"}
      whileHover={pressPresets.icon.whileHover}
      whileTap={pressPresets.icon.whileTap}
      transition={transitions.button}
    >
      <span aria-hidden className="text-base leading-none">
        {isDark ? "☀" : "☾"}
      </span>
    </motion.button>
  );
}
