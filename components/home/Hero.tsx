"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { CinematicVideo } from "@/components/media/CinematicVideo";
import { Button } from "@/components/ui/Button";
import { easeOut, staggerItem, useIsSmallScreen } from "@/lib/motion";

/**
 * Brand hero — full-bleed media with staggered enter + soft scroll fade.
 */
export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const small = useIsSmallScreen();
  const enableScrollFade = !small;

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const copyOpacity = useTransform(
    scrollYProgress,
    [0, 0.55],
    enableScrollFade ? [1, 0] : [1, 1],
  );
  const copyY = useTransform(
    scrollYProgress,
    [0, 0.55],
    enableScrollFade ? [0, 48] : [0, 0],
  );

  return (
    <section ref={sectionRef} className="relative flex min-h-[100svh] items-end">
      <div className="absolute inset-0">
        <CinematicVideo
          src="/videos/hero-page.mp4"
          alt="XPENG driving in Ghana"
          className="h-full w-full"
          autoPlayWhenAllowed
          priority
          loop
        />
      </div>

      {/* CHANGE 1: lighter gradient + much less padding = smaller dark area */}
      <div className="relative z-10 w-full bg-gradient-to-t from-black/80 via-black/30 to-transparent pb-20 pt-24 sm:pb-20 md:pb-24">
        <div className="mx-auto max-w-content px-4 sm:px-6 lg:px-8">
          <motion.div
            className="max-w-md"
            style={{ opacity: copyOpacity, y: copyY }}
          >
            <motion.div
              initial="hidden"
              animate="visible"
              variants={{
                hidden: {},
                visible: {
                  transition: { staggerChildren: 0.12, delayChildren: 0.1 },
                },
              }}
            >
              {/* CHANGE 3: smaller headline */}
              <motion.h1
                variants={staggerItem}
                className="font-display text-[1.85rem] leading-[1.05] text-balance text-white sm:text-4xl md:text-5xl"
              >
                Where next?
              </motion.h1>

              <motion.p
                variants={staggerItem}
                className="mt-3 text-sm leading-relaxed text-white/75 sm:text-base"
              >
                Explore the XPENG lineup in Ghana.
              </motion.p>

              <motion.div
                variants={staggerItem}
                className="mt-6 flex flex-wrap items-center gap-4 sm:gap-5"
                transition={{ duration: 0.55, ease: easeOut }}
              >
                <Button href="/models" variant="gold" size="md">
                  Explore Models
                </Button>
                <Link
                  href="/about"
                  className="text-sm text-white/80 underline-offset-4 transition hover:text-white hover:underline"
                >
                  About Us
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}