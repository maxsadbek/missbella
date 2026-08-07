"use client";

import { useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import { usePageMeta } from "@/lib/hooks";
import { PageHero } from "@/components/layout/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { NewsCard, type NewsItem } from "@/components/news/NewsCard";
import { CTASection } from "@/components/home/CTASection";
import { cn } from "@/lib/utils";

export default function NewsPage() {
  const t = useTranslations("news");
  usePageMeta(`${t("eyebrow")} — 20-maktab`);

  const items = t.raw("items") as NewsItem[];
  const [cat, setCat] = useState("all");

  const categories = useMemo(
    () => ["all", ...Array.from(new Set(items.map((i) => i.category)))],
    [items]
  );

  const filtered = cat === "all" ? items : items.filter((i) => i.category === cat);

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

          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filtered.map((item, i) => (
              <Reveal key={item.slug} delay={(i % 3) * 0.08} className="h-full">
                <NewsCard item={item} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
