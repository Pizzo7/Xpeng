"use client";

import Image from "next/image";
import { site } from "@/lib/data";

interface BrandLogoProps {
  className?: string;
}

/**
 * Official XPENG mark (white on dark).
 */
export function BrandLogo({
  className = "relative h-9 w-[168px]",
}: BrandLogoProps) {
  return (
    <div className={className}>
      <Image
        src="/brand/xpeng-logo-white.png"
        alt={`${site.companyName} logo`}
        fill
        priority
        sizes="168px"
        className="object-contain object-left"
      />
    </div>
  );
}
