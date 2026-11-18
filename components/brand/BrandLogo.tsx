"use client";

import Image from "next/image";
import { useTheme } from "@/components/theme/ThemeProvider";
import { site } from "@/lib/data";

interface BrandLogoProps {
  className?: string;
}

/**
 * Official XPENG mark (white on black asset).
 * On light theme, invert so the mark reads dark on the header.
 */
export function BrandLogo({
  className = "relative h-9 w-[168px]",
}: BrandLogoProps) {
  const { theme } = useTheme();
  const isLight = theme === "light";

  return (
    <div className={className}>
      <Image
        src="/brand/xpeng-logo-white.png"
        alt={`${site.companyName} logo`}
        fill
        priority
        sizes="168px"
        className={[
          "object-contain object-left",
          isLight ? "brightness-0" : "",
        ]
          .filter(Boolean)
          .join(" ")}
      />
    </div>
  );
}
