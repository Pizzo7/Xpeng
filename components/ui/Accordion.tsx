"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { durations, easeOut, pressPresets, transitions } from "@/lib/motion";

interface AccordionItem {
  q: string;
  a: string;
}

interface AccordionProps {
  items: AccordionItem[];
}

/**
 * FAQ accordion with smooth height open/close.
 * Height is the one allowed layout animation here.
 */
export function Accordion({ items }: AccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="divide-y divide-silver/15 border-y border-silver/15">
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        const panelId = `faq-panel-${index}`;
        const buttonId = `faq-button-${index}`;

        return (
          <div key={item.q} className="py-1">
            <h3>
              <motion.button
                id={buttonId}
                type="button"
                className="flex w-full cursor-pointer items-center justify-between gap-4 py-5 text-left text-mist transition-colors hover:text-gold"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpenIndex(isOpen ? null : index)}
                whileTap={pressPresets.icon.whileTap}
                transition={transitions.button}
              >
                <span className="font-display text-lg sm:text-xl">
                  {item.q}
                </span>
                <span
                  className="shrink-0 text-xl leading-none text-gold"
                  aria-hidden
                >
                  {isOpen ? "−" : "+"}
                </span>
              </motion.button>
            </h3>
            <AnimatePresence initial={false}>
              {isOpen ? (
                <motion.div
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  key="content"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: durations.fast, ease: easeOut }}
                  className="overflow-hidden"
                >
                  <p className="pb-5 text-mist-dim leading-relaxed">{item.a}</p>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
