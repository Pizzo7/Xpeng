"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { ButtonHTMLAttributes, ReactNode } from "react";
import { pressPresets, transitions } from "@/lib/motion";

type Variant = "primary" | "secondary" | "ghost" | "gold";
type Size = "sm" | "md" | "lg";

const variantClasses: Record<Variant, string> = {
  primary: "bg-mist text-ink hover:opacity-90 border border-transparent",
  secondary:
    "bg-transparent text-mist border border-silver/40 hover:border-mist hover:bg-surface-hover",
  ghost: "bg-transparent text-mist hover:bg-surface-hover border border-transparent",
  gold: "bg-gold text-on-gold hover:bg-gold-soft border border-transparent",
};

const sizeClasses: Record<Size, string> = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-3 text-sm",
  lg: "px-8 py-3.5 text-base",
};

interface SharedProps {
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  className?: string;
}

interface ButtonAsButton
  extends SharedProps,
    Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children" | "className"> {
  href?: undefined;
}

interface ButtonAsLink extends SharedProps {
  href: string;
  type?: never;
  disabled?: boolean;
  onClick?: never;
}

export type MotionButtonProps = ButtonAsButton | ButtonAsLink;

function buttonClasses(
  variant: Variant,
  size: Size,
  className: string,
): string {
  return [
    "inline-flex items-center justify-center gap-2 rounded font-medium tracking-wide transition-colors duration-300 ease-premium focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold disabled:opacity-50 disabled:pointer-events-none",
    variantClasses[variant],
    sizeClasses[size],
    className,
  ].join(" ");
}

/**
 * Same look as the site Button, plus a light hover/tap scale.
 * Scale only — colours and padding stay identical.
 */
export function MotionButton({
  children,
  variant = "primary",
  size = "md",
  className = "",
  ...props
}: MotionButtonProps) {
  const classes = buttonClasses(variant, size, className);

  if ("href" in props && props.href) {
    const { href, disabled } = props;
    if (disabled) {
      return (
        <span className={`${classes} opacity-50 pointer-events-none`}>
          {children}
        </span>
      );
    }
    return (
      <motion.div
        className="inline-flex"
        whileHover={pressPresets.button.whileHover}
        whileTap={pressPresets.button.whileTap}
        transition={transitions.button}
      >
        <Link href={href} className={classes}>
          {children}
        </Link>
      </motion.div>
    );
  }

  const { type = "button", disabled, onClick, ...rest } = props as ButtonAsButton;

  return (
    <motion.div
      className="inline-flex"
      whileHover={disabled ? undefined : pressPresets.button.whileHover}
      whileTap={disabled ? undefined : pressPresets.button.whileTap}
      transition={transitions.button}
    >
      <button
        type={type}
        disabled={disabled}
        onClick={onClick}
        className={classes}
        {...rest}
      >
        {children}
      </button>
    </motion.div>
  );
}
