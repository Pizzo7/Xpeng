"use client";

import Link from "next/link";
import { SkeletonImage } from "@/components/media/SkeletonImage";
import { TiltCard } from "@/components/motion";
import type { ModelItem } from "@/lib/types";

interface ModelCardProps {
  model: ModelItem;
}

/**
 * Interactive model card — sharp studio image, 3D tilt on desktop.
 */
export function ModelCard({ model }: ModelCardProps) {
  return (
    <TiltCard
      as="article"
      className="group relative h-full overflow-hidden rounded-sm border border-silver/15 bg-ink-soft"
    >
      <Link
        href={model.href}
        className="flex h-full cursor-pointer flex-col outline-none focus-visible:ring-2 focus-visible:ring-gold"
      >
        <div className="relative aspect-[16/10] overflow-hidden bg-black">
          <SkeletonImage
            src={model.poster}
            alt={`${model.fullName} visual`}
            fill
            quality={75}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-contain object-center p-3 transition-transform duration-700 ease-premium group-hover:scale-[1.03] sm:p-4"
          />
        </div>

        <div className="flex flex-1 flex-col gap-4 p-5 sm:p-6">
          <div>
            <p className="text-xs uppercase tracking-brand text-silver">
              {model.category}
            </p>
            <h3 className="mt-1 font-display text-xl text-mist transition-colors group-hover:text-gold">
              {model.fullName}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-mist-dim">
              {model.tagline}
            </p>
          </div>

          <dl className="mt-auto grid grid-cols-3 gap-2 border-t border-silver/10 pt-4">
            {model.highlights.map((item) => (
              <div key={item.label}>
                <dt className="text-[10px] uppercase tracking-brand text-silver">
                  {item.label}
                </dt>
                <dd className="mt-1 text-xs text-mist">{item.value}</dd>
              </div>
            ))}
          </dl>

          <span className="inline-flex items-center gap-2 text-sm text-gold transition-transform duration-300 group-hover:translate-x-1">
            Explore model
            <span aria-hidden>→</span>
          </span>
        </div>
      </Link>
    </TiltCard>
  );
}
