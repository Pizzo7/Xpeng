"use client";

import { useRef, type PointerEvent, type ReactNode } from "react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
} from "framer-motion";
import { springs, tiltLimits, useIsSmallScreen } from "@/lib/motion";

interface TiltCardProps {
  children: ReactNode;
  className?: string;
  as?: "div" | "article" | "aside" | "li" | "span";
  disabled?: boolean;
}

/**
 * 3D tilt + lift. Disabled only on small screens.
 * Overflow stays on an inner layer so 3D transforms are not flattened.
 */
export function TiltCard({
  children,
  className,
  as = "div",
  disabled = false,
}: TiltCardProps) {
  const Tag = motion[as];
  const ref = useRef<HTMLElement | null>(null);
  const small = useIsSmallScreen();
  const enableTilt = !disabled && !small;

  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const lift = useMotionValue(0);
  const scale = useMotionValue(1);
  const shadowDepth = useMotionValue(8);

  const springCfg = springs.tilt;
  const rX = useSpring(rotateX, springCfg);
  const rY = useSpring(rotateY, springCfg);
  const y = useSpring(lift, springCfg);
  const s = useSpring(scale, springCfg);
  const depth = useSpring(shadowDepth, springCfg);
  const boxShadow = useMotionTemplate`0 ${depth}px ${depth}px -8px rgba(0,0,0,0.55)`;

  const reset = () => {
    rotateX.set(0);
    rotateY.set(0);
    lift.set(0);
    scale.set(1);
    shadowDepth.set(8);
  };

  const onPointerMove = (event: PointerEvent) => {
    if (!enableTilt || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const nx = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    const ny = ((event.clientY - rect.top) / rect.height) * 2 - 1;
    rotateX.set(-ny * tiltLimits.maxRotate);
    rotateY.set(nx * tiltLimits.maxRotate);
    lift.set(tiltLimits.liftY);
    scale.set(tiltLimits.hoverScale);
    shadowDepth.set(36);
  };

  if (!enableTilt) {
    return (
      <Tag
        className={className}
        whileHover={disabled ? undefined : { y: -8, scale: 1.02 }}
        whileTap={disabled ? undefined : { scale: tiltLimits.tapScale }}
        transition={springs.snappy}
      >
        {children}
      </Tag>
    );
  }

  return (
    <div
      className="h-full"
      style={{ perspective: tiltLimits.perspective }}
    >
      <Tag
        ref={ref as never}
        className={className}
        style={{
          rotateX: rX,
          rotateY: rY,
          y,
          scale: s,
          boxShadow,
          transformStyle: "preserve-3d",
          overflow: "visible",
        }}
        onPointerMove={onPointerMove}
        onPointerEnter={onPointerMove}
        onPointerLeave={reset}
        onPointerDown={() => scale.set(tiltLimits.tapScale)}
        onPointerUp={() => scale.set(tiltLimits.hoverScale)}
        onPointerCancel={reset}
      >
        <div className="h-full overflow-hidden rounded-[inherit]">
          {children}
        </div>
      </Tag>
    </div>
  );
}
