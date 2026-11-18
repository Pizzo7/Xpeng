"use client";

import { useEffect, useState } from "react";
import type { Transition, Variants } from "framer-motion";

/* ------------------------------------------------------------------ */
/* Shared motion settings — change the whole site feel here           */
/* ------------------------------------------------------------------ */

export const durations = {
  fast: 0.35,
  normal: 0.55,
  slow: 0.75,
} as const;

/** Soft ease-out curve (no bounce) */
export const easeOut = [0.22, 1, 0.36, 1] as const;

export const springs = {
  soft: { type: "spring" as const, stiffness: 200, damping: 18 },
  snappy: { type: "spring" as const, stiffness: 380, damping: 30 },
  /** Cursor-tilt cards — smooth, low overshoot */
  tilt: { stiffness: 260, damping: 24, mass: 0.35 },
};

/** Caps for TiltCard (degrees / px / scale) */
export const tiltLimits = {
  maxRotate: 12,
  liftY: -14,
  hoverScale: 1.03,
  tapScale: 0.985,
  perspective: 900,
} as const;

export const transitions = {
  fade: { duration: durations.normal, ease: easeOut } satisfies Transition,
  reveal: { duration: durations.slow, ease: easeOut } satisfies Transition,
  page: { duration: durations.fast, ease: easeOut } satisfies Transition,
  button: { duration: durations.fast, ease: easeOut } satisfies Transition,
};

/** Shared hover / tap presets — use via Pressable or MotionButton */
export const pressPresets = {
  /** CTAs and primary buttons */
  button: {
    whileHover: { scale: 1.04 },
    whileTap: { scale: 0.96 },
  },
  /** Cards and large clickable tiles */
  card: {
    whileHover: { y: -6 },
    whileTap: { scale: 0.99 },
  },
  /** Icon controls (theme, menu, thumbs, swatches) */
  icon: {
    whileHover: { scale: 1.05 },
    whileTap: { scale: 0.94 },
  },
} as const;

export const mediaRevealVariants: Variants = {
  hidden: { opacity: 0, scale: 1.04 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: transitions.reveal,
  },
};

export type RevealDirection = "up" | "down" | "left" | "right";

const offset = 40;

/** Start / end values for Reveal by direction */
export function revealOffset(direction: RevealDirection): {
  x?: number;
  y?: number;
} {
  switch (direction) {
    case "down":
      return { y: -offset };
    case "left":
      return { x: offset };
    case "right":
      return { x: -offset };
    case "up":
    default:
      return { y: offset };
  }
}

export const revealVariants = {
  hidden: (direction: RevealDirection) => ({
    opacity: 0,
    ...revealOffset(direction),
  }),
  visible: {
    opacity: 1,
    x: 0,
    y: 0,
  },
} satisfies Variants;

export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: transitions.reveal,
  },
};

export type StaggerDirection = "up" | "left" | "right";

/** Stagger child enter — up (default), or slide from left / right */
export function staggerItemFrom(direction: StaggerDirection = "up"): Variants {
  if (direction === "left") {
    return {
      hidden: { opacity: 0, x: offset },
      visible: {
        opacity: 1,
        x: 0,
        transition: transitions.reveal,
      },
    };
  }
  if (direction === "right") {
    return {
      hidden: { opacity: 0, x: -offset },
      visible: {
        opacity: 1,
        x: 0,
        transition: transitions.reveal,
      },
    };
  }
  return staggerItem;
}

export const popInVariants: Variants = {
  hidden: { opacity: 0, scale: 0.85 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: springs.soft,
  },
};

export const pageVariants: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: transitions.page,
  },
  exit: {
    opacity: 0,
    y: -8,
    transition: transitions.page,
  },
};

/** Legacy aliases used by older home sections — prefer Reveal / Stagger */
export const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: transitions.fade,
  },
};

export const staggerChildren = staggerContainer;

/* ------------------------------------------------------------------ */
/* Hooks (video policy + reduced motion)                              */
/* ------------------------------------------------------------------ */

/** True when the user prefers reduced motion */
export function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  return reduced;
}

/**
 * Muted inline video may autoplay on every screen size.
 * Reduced motion is the only block — phones and production builds included.
 */
export function useShouldAutoplayVideo(): boolean {
  return !usePrefersReducedMotion();
}

/** True below md — used to skip parallax on small screens */
export function useIsSmallScreen(): boolean {
  const [small, setSmall] = useState(true);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 768px)");
    const update = () => setSmall(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  return small;
}
