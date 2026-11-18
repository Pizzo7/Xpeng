"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { SkeletonImage } from "@/components/media/SkeletonImage";
import { models } from "@/lib/data";
import { durations, easeOut, staggerItem } from "@/lib/motion";

/**
 * Cinematic models hero — featured lineup model with text stagger.
 */
export function ModelsHero() {
  const featured = models.models.find((m) => m.featured) ?? models.models[0];

  return (
    <section className="relative min-h-[78svh] overflow-hidden bg-black">
      <div className="absolute inset-0">
        <SkeletonImage
          src={
            featured?.image ??
            "/brand/xpeng_models/XPENG_G9L_Arctic_White_Front.jpg"
          }
          alt={`${featured?.name ?? "XPENG"} lineup visual`}
          fill
          priority
          quality={80}
          className="object-contain object-right object-bottom p-6 sm:p-10 md:p-14"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/50" />
      </div>

      <div className="relative z-10 mx-auto flex min-h-[78svh] max-w-content flex-col justify-end px-4 pb-16 pt-28 sm:px-6 sm:pb-20 sm:pt-32 lg:px-8">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: {
              transition: { staggerChildren: 0.12, delayChildren: 0.08 },
            },
          }}
          className="max-w-2xl"
        >
          <motion.p
            variants={staggerItem}
            className="mb-3 text-xs uppercase tracking-brand text-gold"
          >
            XPENG Ghana lineup
          </motion.p>
          <motion.h1
            variants={staggerItem}
            className="font-display text-3xl leading-[1.05] text-mist sm:text-5xl md:text-6xl"
          >
            {models.headline}
          </motion.h1>
          <motion.p
            variants={staggerItem}
            className="mt-4 max-w-xl text-sm leading-relaxed text-mist-dim sm:text-base md:text-lg"
          >
            {models.subheadline}
          </motion.p>
          <motion.div
            variants={staggerItem}
            className="mt-8 flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:flex-wrap"
            transition={{ duration: durations.normal, ease: easeOut }}
          >
            {featured ? (
              <Button
                href={featured.href}
                variant="gold"
                size="lg"
                className="w-full sm:w-auto"
              >
                Explore {featured.name}
              </Button>
            ) : null}
            <Button
              href="/test-drive"
              variant="secondary"
              size="lg"
              className="w-full sm:w-auto"
            >
              Book a Test Drive
            </Button>
          </motion.div>
          {featured ? (
            <motion.p variants={staggerItem} className="mt-6 text-sm text-silver">
              Featured:{" "}
              <Link
                href={featured.href}
                className="cursor-pointer text-mist underline-offset-4 hover:text-gold hover:underline transition-colors"
              >
                {featured.fullName}
              </Link>
            </motion.p>
          ) : null}
        </motion.div>
      </div>
    </section>
  );
}
