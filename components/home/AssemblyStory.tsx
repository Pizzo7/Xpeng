"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/motion";
import { getFeaturedModel } from "@/lib/data";
import { playMuted } from "@/lib/autoplay";
import { durations, easeOut } from "@/lib/motion";

const TECH_VIDEOS = [
  "/videos/xpeng_tech_videos/01_battery_architecture.mp4",
  "/videos/xpeng_tech_videos/02_electric_motors.mp4",
  "/videos/xpeng_tech_videos/xpeng_g9l_assembly_to_road_full.mp4",
  "/videos/xpeng_tech_videos/04_seats_cabin.mp4",
] as const;

const TECH_POSTERS = [
  "/videos/posters/01_battery_architecture.jpg",
  "/videos/posters/02_electric_motors.jpg",
  "/videos/posters/xpeng_g9l_assembly_to_road_full.jpg",
  "/videos/posters/04_seats_cabin.jpg",
] as const;

/**
 * Technology story — each step plays its matching film from xpeng_tech_videos.
 */
export function AssemblyStory() {
  const steps = getFeaturedModel().assemblyStory;
  const sectionRef = useRef<HTMLElement>(null);
  const mediaRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [active, setActive] = useState(0);
  const [near, setNear] = useState(false);
  const [onScreen, setOnScreen] = useState(false);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || steps.length === 0) return;

    const onScroll = () => {
      const rect = section.getBoundingClientRect();
      const total = rect.height - window.innerHeight;
      if (total <= 0) return;
      const progress = Math.min(1, Math.max(0, -rect.top / total));
      const index = Math.min(
        steps.length - 1,
        Math.floor(progress * steps.length),
      );
      setActive(index);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [steps.length]);

  useEffect(() => {
    const node = mediaRef.current;
    if (!node) return;

    const nearObserver = new IntersectionObserver(
      ([entry]) => setNear(Boolean(entry?.isIntersecting)),
      { rootMargin: "600px", threshold: 0 },
    );
    const screenObserver = new IntersectionObserver(
      ([entry]) => setOnScreen(Boolean(entry?.isIntersecting)),
      { rootMargin: "0px", threshold: 0.15 },
    );
    nearObserver.observe(node);
    screenObserver.observe(node);
    return () => {
      nearObserver.disconnect();
      screenObserver.disconnect();
    };
  }, []);

  useEffect(() => {
    setPlaying(false);
  }, [active]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !near || !onScreen) {
      video?.pause();
      return;
    }
    return playMuted(video);
  }, [active, near, onScreen]);

  if (steps.length === 0) return null;

  const clipIndex = Math.min(active, TECH_VIDEOS.length - 1);
  const activeSrc = TECH_VIDEOS[clipIndex] ?? TECH_VIDEOS[0];
  const activePoster = TECH_POSTERS[clipIndex] ?? TECH_POSTERS[0];

  return (
    <section
      ref={sectionRef}
      className="relative bg-ink"
      style={{ minHeight: "220vh" }}
    >
      <div className="sticky top-0 flex min-h-[100svh] w-full items-center py-16">
        <Container className="w-full">
          <Reveal direction="left">
            <SectionHeading
              eyebrow="Technology"
              title="From parts to the road"
              description="A simple look at the pieces that make electric driving feel composed."
              className="mb-10"
            />
          </Reveal>

          <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
            <Reveal
              direction="left"
              className="relative aspect-video overflow-hidden rounded-sm bg-ink-muted"
            >
              <div ref={mediaRef} className="absolute inset-0">
                {!playing ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={activePoster}
                    alt=""
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                ) : null}
                <video
                  key={activeSrc}
                  ref={videoRef}
                  src={near ? activeSrc : undefined}
                  poster={activePoster}
                  muted
                  playsInline
                  loop
                  autoPlay={near && onScreen}
                  preload={near ? "metadata" : "none"}
                  className={[
                    "absolute inset-0 h-full w-full object-cover",
                    playing ? "opacity-100" : "opacity-0",
                  ].join(" ")}
                  aria-label={steps[active]?.title ?? "Technology story"}
                  onPlay={() => setPlaying(true)}
                  onPause={() => setPlaying(false)}
                />
              </div>
            </Reveal>

            <Reveal direction="right" delay={0.08} className="space-y-4">
              {steps.map((step, index) => {
                const isActive = active === index;
                return (
                  <motion.button
                    key={step.id}
                    type="button"
                    onClick={() => setActive(index)}
                    initial={{ opacity: 0, x: 40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    animate={{
                      opacity: isActive ? 1 : 0.35,
                      x: isActive ? 0 : 8,
                    }}
                    transition={{ duration: durations.fast, ease: easeOut }}
                    className="w-full cursor-pointer border-l-2 pl-5 text-left"
                    style={{
                      borderColor: isActive
                        ? "#C4A35A"
                        : "rgba(168,168,168,0.2)",
                    }}
                  >
                    <h3 className="font-display text-2xl text-mist">
                      {step.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-mist-dim">
                      {step.description}
                    </p>
                  </motion.button>
                );
              })}
            </Reveal>
          </div>
        </Container>
      </div>
    </section>
  );
}
