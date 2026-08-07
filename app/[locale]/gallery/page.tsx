"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, ZoomIn, X } from "lucide-react";
import { usePageMeta } from "@/lib/hooks";
import { PageHero } from "@/components/layout/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { CTASection } from "@/components/home/CTASection";
import { cn } from "@/lib/utils";

type GalleryItem = { seed: string; title: string; tag: string };

const ASPECTS = [
  "aspect-[3/4]",
  "aspect-[4/3]",
  "aspect-square",
  "aspect-[4/5]",
  "aspect-[16/10]",
  "aspect-[3/4]",
  "aspect-[4/3]",
  "aspect-square",
];

export default function GalleryPage() {
  const t = useTranslations("gallery");
  usePageMeta(`${t("title")} — 20-maktab`);

  const items = t.raw("items") as GalleryItem[];
  const [cat, setCat] = useState("all");
  const [lightbox, setLightbox] = useState<number | null>(null);

  const categories = ["all", ...Array.from(new Set(items.map((i) => i.tag)))];
  const filtered = cat === "all" ? items : items.filter((i) => i.tag === cat);

  const close = useCallback(() => setLightbox(null), []);
  const step = useCallback(
    (dir: number) => {
      setLightbox((prev) =>
        prev === null ? prev : (prev + dir + filtered.length) % filtered.length
      );
    },
    [filtered.length]
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (lightbox === null) return;
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightbox, close, step]);

  const current = lightbox !== null ? filtered[lightbox] : null;

  return (
    <>
      <PageHero eyebrow={t("eyebrow")} title={t("title")} subtitle={t("subtitle")} />

      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <Reveal>
            <div className="flex flex-wrap gap-2.5">
              {categories.map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setCat(c)}
                  className={cn(
                    "rounded-[6px] border px-4 py-2 text-sm font-semibold transition-all duration-300",
                    cat === c
                      ? "border-primary bg-primary text-white shadow-[0_8px_24px_-10px_rgba(0,102,255,0.7)]"
                      : "border-line text-ink-soft hover:border-primary/50 hover:text-primary"
                  )}
                >
                  {c === "all" ? t("all") : c}
                </button>
              ))}
            </div>
          </Reveal>

          <div className="mt-12 columns-1 gap-4 sm:columns-2 lg:columns-3 [&>*]:mb-4">
            {filtered.map((item, i) => (
              <Reveal key={item.seed} delay={(i % 3) * 0.06} className="break-inside-avoid">
                <button
                  type="button"
                  onClick={() => setLightbox(i)}
                  className={cn(
                    "group relative block w-full overflow-hidden rounded-[6px] border border-line",
                    ASPECTS[i % ASPECTS.length]
                  )}
                >
                  <Image
                    src={`https://picsum.photos/seed/${item.seed}/900/1100`}
                    alt={item.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-deep/75 via-navy-deep/10 to-transparent opacity-70 transition-opacity duration-500 group-hover:opacity-100" />
                  <div className="absolute inset-x-0 bottom-0 translate-y-2 p-5 text-left opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                    <p className="text-xs font-bold uppercase tracking-[0.18em] text-primary-bright">
                      {item.tag}
                    </p>
                    <p className="mt-1 font-display text-base font-bold text-white">
                      {item.title}
                    </p>
                  </div>
                  <span className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full bg-navy-deep/60 text-white opacity-0 backdrop-blur transition-opacity duration-500 group-hover:opacity-100">
                    <ZoomIn className="h-4 w-4" />
                  </span>
                </button>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* lightbox */}
      <AnimatePresence>
        {lightbox !== null && current && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[140] flex items-center justify-center bg-navy-deep/95 p-4 backdrop-blur-lg sm:p-10"
            onClick={close}
          >
            <button
              type="button"
              onClick={close}
              aria-label="Close"
              className="absolute right-5 top-5 grid h-11 w-11 place-items-center rounded-[6px] border border-white/15 text-white transition-colors hover:border-white/40 hover:bg-white/10"
            >
              <X className="h-5 w-5" />
            </button>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                step(-1);
              }}
              aria-label="Previous"
              className="absolute left-3 top-1/2 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-[6px] border border-white/15 text-white transition-all hover:border-primary-bright hover:text-primary-bright sm:left-8"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                step(1);
              }}
              aria-label="Next"
              className="absolute right-3 top-1/2 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-[6px] border border-white/15 text-white transition-all hover:border-primary-bright hover:text-primary-bright sm:right-8"
            >
              <ChevronRight className="h-6 w-6" />
            </button>

            <motion.figure
              key={lightbox}
              initial={{ opacity: 0, scale: 0.93, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="max-w-5xl"
            >
              <img
                src={`https://picsum.photos/seed/${current.seed}/1400/1000`}
                alt={current.title}
                className="max-h-[72vh] w-auto rounded-[6px] border border-white/10 object-contain shadow-[0_40px_120px_-40px_rgba(0,102,255,0.5)]"
              />
              <figcaption className="mt-5 text-center">
                <span className="font-display text-lg font-bold text-white">
                  {current.title}
                </span>
                <span className="ml-3 text-xs font-bold uppercase tracking-[0.18em] text-primary-bright">
                  {current.tag}
                </span>
              </figcaption>
            </motion.figure>
          </motion.div>
        )}
      </AnimatePresence>

      <CTASection />
    </>
  );
}
