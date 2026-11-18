"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import {
  isActivePath,
  isGroupActive,
  primaryNav,
  type NavGroup,
} from "@/lib/nav";
import { durations, easeOut, pressPresets, transitions } from "@/lib/motion";

interface MobileNavProps {
  open: boolean;
  onClose: () => void;
  pathname: string;
}

function MobileAccordion({
  group,
  pathname,
  onClose,
}: {
  group: NavGroup;
  pathname: string;
  onClose: () => void;
}) {
  const active = isGroupActive(pathname, group.id);
  const [expanded, setExpanded] = useState(active);

  return (
    <div className="rounded">
      <button
        type="button"
        className={[
          "flex w-full cursor-pointer items-center justify-between rounded px-3 py-3 text-left text-base transition-colors duration-300",
          active
            ? "bg-surface-hover text-mist"
            : "text-mist-dim hover:bg-surface-hover hover:text-mist",
        ].join(" ")}
        aria-expanded={expanded}
        onClick={() => setExpanded((v) => !v)}
      >
        {group.label}
        <span aria-hidden className="text-xs">
          {expanded ? "▴" : "▾"}
        </span>
      </button>
      <AnimatePresence initial={false}>
        {expanded ? (
          <motion.div
            key={`${group.id}-panel`}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: durations.fast, ease: easeOut }}
            className="overflow-hidden"
          >
            <div className="space-y-1 pb-2 pl-3">
              {group.children.map((link) => {
                const itemActive =
                  pathname === link.href ||
                  (link.href !== "/models" &&
                    pathname.startsWith(`${link.href}/`));
                return (
                  <Link
                    key={`${link.href}-${link.label}`}
                    href={link.href}
                    onClick={onClose}
                    className={[
                      "block cursor-pointer rounded px-3 py-2.5 text-sm transition-colors duration-300",
                      itemActive
                        ? "bg-gold/10 text-mist"
                        : "text-mist-dim hover:bg-surface-hover hover:text-mist",
                    ].join(" ")}
                  >
                    {link.label}
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

/** Mobile drawer — portaled to body so header transforms cannot trap it */
export function MobileNav({ open, onClose, pathname }: MobileNavProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [open]);

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {open ? (
        <>
          <motion.button
            key="mobile-overlay"
            type="button"
            aria-label="Close menu"
            className="fixed inset-0 z-[80] cursor-pointer bg-black/60 lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: durations.fast, ease: easeOut }}
            onClick={onClose}
          />
          <motion.aside
            key="mobile-drawer"
            id="mobile-nav"
            className="fixed inset-y-0 right-0 z-[90] flex h-[100dvh] w-[min(100%,20rem)] flex-col border-l border-silver/20 bg-ink-soft lg:hidden"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: durations.normal, ease: easeOut }}
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation"
          >
            <div className="flex items-center justify-between border-b border-silver/15 px-5 py-4">
              <p className="text-sm tracking-wide text-mist-dim">Menu</p>
              <motion.button
                type="button"
                className="inline-flex h-10 w-10 cursor-pointer items-center justify-center rounded border border-silver/30 text-mist"
                aria-label="Close menu"
                onClick={onClose}
                whileHover={pressPresets.icon.whileHover}
                whileTap={pressPresets.icon.whileTap}
                transition={transitions.button}
              >
                <span aria-hidden>✕</span>
              </motion.button>
            </div>

            <nav
              className="flex flex-1 flex-col gap-1 overflow-y-auto px-5 py-4"
              aria-label="Mobile navigation"
            >
              {primaryNav.map((item) => {
                if (item.type === "group") {
                  return (
                    <MobileAccordion
                      key={item.group.id}
                      group={item.group}
                      pathname={pathname}
                      onClose={onClose}
                    />
                  );
                }

                const active = isActivePath(pathname, item.link.href);
                return (
                  <Link
                    key={item.link.href}
                    href={item.link.href}
                    onClick={onClose}
                    className={[
                      "block cursor-pointer rounded px-3 py-3 text-base transition-colors duration-300",
                      active
                        ? "bg-surface-hover text-mist"
                        : "text-mist-dim hover:bg-surface-hover hover:text-mist",
                    ].join(" ")}
                    aria-current={active ? "page" : undefined}
                  >
                    {item.link.label}
                  </Link>
                );
              })}

              <div className="pt-4" onClick={onClose}>
                <Button href="/test-drive" variant="gold" className="w-full rounded">
                  Book a Test Drive
                </Button>
              </div>
            </nav>
          </motion.aside>
        </>
      ) : null}
    </AnimatePresence>,
    document.body,
  );
}
