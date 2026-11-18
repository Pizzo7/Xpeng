"use client";

import { useRef, type ReactNode } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useIsSmallScreen } from "@/lib/motion";

interface ParallaxFrameProps {
  children: ReactNode;
  className?: string;
  /** Vertical travel in px (default 40) */
  distance?: number;
}

/**
 * Light vertical parallax on desktop. Skipped on small screens.
 */
export function ParallaxFrame({
  children,
  className,
  distance = 40,
}: ParallaxFrameProps) {
  const ref = useRef<HTMLDivElement>(null);
  const small = useIsSmallScreen();
  const enable = !small;

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(
    scrollYProgress,
    [0, 1],
    enable ? [distance, -distance] : [0, 0],
  );

  return (
    <div
      ref={ref}
      className={["relative overflow-hidden", className].filter(Boolean).join(" ")}
    >
      <motion.div className="h-full w-full" style={{ y }}>
        <div className="h-[120%] w-full -mt-[10%]">{children}</div>
      </motion.div>
    </div>
  );
}
