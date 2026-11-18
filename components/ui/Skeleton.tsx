interface SkeletonProps {
  className?: string;
  /** Softer block for text-like rows */
  rounded?: "none" | "sm" | "md" | "full";
}

const radius = {
  none: "rounded-none",
  sm: "rounded-sm",
  md: "rounded",
  full: "rounded-full",
} as const;

/**
 * Shimmer placeholder while content / images load.
 */
export function Skeleton({
  className = "",
  rounded = "sm",
}: SkeletonProps) {
  return (
    <div
      aria-hidden
      className={[
        "animate-shimmer bg-[linear-gradient(110deg,var(--ink-muted)_8%,var(--ink-soft)_18%,var(--ink-muted)_33%)] bg-[length:200%_100%]",
        radius[rounded],
        className,
      ].join(" ")}
    />
  );
}
