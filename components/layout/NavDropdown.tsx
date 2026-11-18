"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { NavLink } from "@/lib/nav";
import { durations, easeOut } from "@/lib/motion";

interface NavDropdownProps {
  label: string;
  items: NavLink[];
  active: boolean;
  pathname: string;
}

/**
 * Text-style nav dropdown (not a CTA button).
 * Used for Models and Discover in the center header nav.
 */
export function NavDropdown({
  label,
  items,
  active,
  pathname,
}: NavDropdownProps) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    const onPointerDown = (event: MouseEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  return (
    <div
      ref={rootRef}
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        type="button"
        className={[
          "group relative inline-flex cursor-pointer items-center gap-1 py-1 text-sm tracking-wide transition-colors duration-75",
          active || open ? "text-mist" : "text-mist-dim hover:text-mist",
        ].join(" ")}
        aria-expanded={open}
        aria-haspopup="menu"
        onClick={() => setOpen((v) => !v)}
      >
        {label}
        <span
          aria-hidden
          className={[
            "text-[10px] leading-none transition-transform duration-200",
            open ? "rotate-180" : "",
          ].join(" ")}
        >
          ▾
        </span>
        <span
          aria-hidden
          className={[
            "pointer-events-none absolute -bottom-0.5 left-0 h-[1.5px] w-full origin-left bg-gold transition-transform duration-200 ease-out",
            active || open
              ? "scale-x-100"
              : "scale-x-0 group-hover:scale-x-100",
          ].join(" ")}
        />
      </button>

      <AnimatePresence>
        {open ? (
          <motion.div
            key={`${label}-menu`}
            role="menu"
            aria-label={label}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 6 }}
            transition={{ duration: durations.fast, ease: easeOut }}
            className="absolute left-1/2 top-full z-50 w-40 -translate-x-1/2 pt-3"
          >
            <div className="overflow-hidden rounded border border-silver/20 bg-ink-soft shadow-[0_20px_50px_-24px_rgba(0,0,0,0.55)]">
              {items.map((item) => {
                const itemActive =
                  pathname === item.href ||
                  (item.href !== "/models" &&
                    pathname.startsWith(`${item.href}/`));
                return (
                  <Link
                    key={`${item.href}-${item.label}`}
                    href={item.href}
                    role="menuitem"
                    className={[
                      "block cursor-pointer px-3 py-2.5 text-sm transition-colors duration-300",
                      itemActive
                        ? "bg-gold/10 text-mist"
                        : "text-mist-dim hover:bg-surface-hover hover:text-mist",
                    ].join(" ")}
                    onClick={() => setOpen(false)}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
