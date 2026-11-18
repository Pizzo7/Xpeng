"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { BrandLogo } from "@/components/brand/BrandLogo";
import { NavDropdown } from "@/components/layout/NavDropdown";
import { MobileNav } from "@/components/layout/MobileNav";
import { site } from "@/lib/data";
import {
  isActivePath,
  isGroupActive,
  primaryNav,
} from "@/lib/nav";
import { durations, easeOut, pressPresets, transitions } from "@/lib/motion";

/**
 * Three-zone header: logo | centered nav (with dropdowns) | Test Drive
 */
export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 12);
  });

  return (
    <motion.header
      className={[
        "sticky top-0 z-50 border-b backdrop-blur-md",
        scrolled
          ? "border-silver/25 bg-header"
          : "border-silver/15 bg-header-top",
      ].join(" ")}
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: durations.normal, ease: easeOut }}
    >
      <div className="relative mx-auto flex w-full max-w-content items-center justify-between gap-2 px-4 py-3 sm:gap-3 sm:px-6 lg:gap-4 lg:px-8">
        <Link
          href="/"
          className="relative z-10 block min-w-0 shrink-0"
          aria-label={`${site.companyName} home`}
        >
          <BrandLogo className="relative h-7 w-[132px] sm:h-9 sm:w-[168px]" />
        </Link>

        <nav
          className="absolute left-1/2 hidden -translate-x-1/2 items-center justify-center gap-7 lg:flex"
          aria-label="Main navigation"
        >
          {primaryNav.map((item) => {
            if (item.type === "group") {
              return (
                <NavDropdown
                  key={item.group.id}
                  label={item.group.label}
                  items={item.group.children}
                  active={isGroupActive(pathname, item.group.id)}
                  pathname={pathname}
                />
              );
            }

            const active = isActivePath(pathname, item.link.href);
            return (
              <Link
                key={item.link.href}
                href={item.link.href}
                className={[
                  "group relative cursor-pointer py-1 text-sm tracking-wide transition-colors duration-75",
                  active ? "text-mist" : "text-mist-dim hover:text-mist",
                ].join(" ")}
                aria-current={active ? "page" : undefined}
              >
                {item.link.label}
                <span
                  aria-hidden
                  className={[
                    "pointer-events-none absolute -bottom-0.5 left-0 h-[1.5px] w-full origin-left bg-gold transition-transform duration-200 ease-out",
                    active
                      ? "scale-x-100"
                      : "scale-x-0 group-hover:scale-x-100",
                  ].join(" ")}
                />
              </Link>
            );
          })}
        </nav>

        <div className="relative z-10 ml-auto flex shrink-0 items-center gap-2 sm:gap-2.5">
          <Button
            href="/test-drive"
            size="sm"
            variant="gold"
            className="hidden rounded md:!inline-flex"
          >
            Book a Test Drive
          </Button>
          <motion.button
            type="button"
            className="relative z-20 inline-flex h-9 w-9 cursor-pointer items-center justify-center rounded border border-silver/30 text-mist sm:h-10 sm:w-10 lg:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((v) => !v)}
            whileHover={pressPresets.icon.whileHover}
            whileTap={pressPresets.icon.whileTap}
            transition={transitions.button}
          >
            <span aria-hidden className="text-lg">
              {open ? "✕" : "☰"}
            </span>
          </motion.button>
        </div>
      </div>

      <MobileNav open={open} onClose={() => setOpen(false)} pathname={pathname} />
    </motion.header>
  );
}
