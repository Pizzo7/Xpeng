"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ModelCard } from "@/components/models/ModelCard";
import { Stagger, StaggerItem } from "@/components/motion";
import { models } from "@/lib/data";
import { durations, easeOut } from "@/lib/motion";

/**
 * Category filter + animated model grid.
 * Hover states live on each ModelCard.
 */
export function ModelsExplorer() {
  const [active, setActive] = useState("all");

  const filtered = useMemo(() => {
    if (active === "all") return models.models;
    return models.models.filter((m) => m.category === active);
  }, [active]);

  return (
    <div>
      <div
        className="flex flex-wrap gap-2"
        role="tablist"
        aria-label="Model categories"
      >
        {models.categories.map((cat) => {
          const selected = active === cat.id;
          return (
            <button
              key={cat.id}
              type="button"
              role="tab"
              aria-selected={selected}
              onClick={() => setActive(cat.id)}
              className={[
                "cursor-pointer rounded-sm border px-4 py-2 text-sm tracking-wide transition-all duration-300",
                selected
                  ? "border-gold bg-gold/10 text-mist"
                  : "border-silver/20 text-mist-dim hover:border-silver/50 hover:text-mist",
              ].join(" ")}
            >
              {cat.label}
            </button>
          );
        })}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={active}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: durations.fast, ease: easeOut }}
          className="mt-8"
        >
          <Stagger className="grid gap-6 sm:grid-cols-2">
            {filtered.map((model, index) => (
              <StaggerItem
                key={model.id}
                direction={index % 2 === 0 ? "left" : "right"}
              >
                <ModelCard model={model} />
              </StaggerItem>
            ))}
          </Stagger>
          {filtered.length === 0 ? (
            <p className="text-mist-dim text-sm">
              No models in this category yet.
            </p>
          ) : null}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
