"use client";

import { useRef } from "react";
import { useTranslations } from "next-intl";
import dynamic from "next/dynamic";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { HeroBackground } from "@/components/HeroBackground";
import { buttonStyles } from "@/components/ui/Button";

const HeroScene = dynamic(
  () => import("@/components/three/HeroScene").then((m) => m.HeroScene),
  { ssr: false, loading: () => null }
);

export function Hero() {
  const t = useTranslations("hero");
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const textOpacity = useTransform(scrollYProgress, [0, 0.32], [1, 0]);
  const textY = useTransform(scrollYProgress, [0, 0.32], [0, -70]);
  const hintOpacity = useTransform(scrollYProgress, [0.7, 0.9], [1, 0]);

  return (
    <section
      id="hero-scroll"
      ref={sectionRef}
      className="relative h-[340vh] bg-navy-deep"
    >
      <div className="sticky top-0 h-screen overflow-hidden">
        <HeroBackground />
        <HeroScene />

        {/* text overlay */}
        <div className="pointer-events-none absolute inset-0 z-20">
          <div className="absolute inset-0 hero-vignette" />
          <motion.div
            style={{ opacity: textOpacity, y: textY }}
            className="relative mx-auto flex h-full max-w-5xl flex-col items-center px-5 pt-24 text-center sm:pt-28"
          >
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="flex items-center gap-3 rounded-full border border-white/15 glass-dark px-5 py-2"
            >
              <span className="h-2 w-2 animate-pulse rounded-full bg-primary-bright" />
              <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-white/90">
                {t("badge")}
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 26 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="hero-text-shadow mt-6 font-display text-3xl font-extrabold leading-tight text-white sm:text-4xl lg:text-5xl"
            >
              {t("title")}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 26 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.55, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="mt-4 max-w-xl text-sm leading-relaxed text-white/65 sm:text-base"
            >
              {t("subtitle")}
            </motion.p>
          </motion.div>

          {/* CTAs pinned near bottom */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.75, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            style={{ opacity: textOpacity }}
            className="absolute inset-x-0 bottom-12 flex justify-center px-5"
          >
            <div className="pointer-events-auto flex flex-col gap-3 sm:flex-row">
              <Link href="/about" className={buttonStyles("primary", "lg")}>
                {t("cta1")}
              </Link>
              <Link href="/news" className={buttonStyles("glass", "lg")}>
                {t("cta2")}
              </Link>
            </div>
          </motion.div>
        </div>

        {/* scroll hint */}
        <motion.div
          style={{ opacity: hintOpacity }}
          className="absolute bottom-5 left-1/2 z-20 -translate-x-1/2"
        >
          <div className="flex flex-col items-center gap-2">
            <span className="text-[10px] font-bold uppercase tracking-[0.35em] text-white/55">
              {t("scroll")}
            </span>
            <motion.div
              animate={{ y: [0, 7, 0] }}
              transition={{ repeat: Infinity, duration: 1.7, ease: "easeInOut" }}
              className="grid h-10 w-6 place-items-start justify-center rounded-full border border-white/25 pt-2.5"
            >
              <motion.span
                animate={{ y: [0, 9, 0], opacity: [1, 0.25, 1] }}
                transition={{ repeat: Infinity, duration: 1.7, ease: "easeInOut" }}
                className="h-1.5 w-1.5 rounded-full bg-primary-bright"
              />
            </motion.div>
            <ArrowDown className="h-4 w-4 animate-bounce text-white/40" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
