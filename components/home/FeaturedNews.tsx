"use client";

import { useTranslations } from "next-intl";
import { ArrowRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { NewsCard, type NewsItem } from "@/components/news/NewsCard";

export function FeaturedNews() {
  const t = useTranslations("featuredNews");
  const news = useTranslations("news");
  const items = news.raw("items") as NewsItem[];

  return (
    <section className="relative bg-surface py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="flex flex-col items-end justify-between gap-6 sm:flex-row">
          <SectionHeading
            align="left"
            eyebrow={t("eyebrow")}
            title={t("title")}
          />
          <Reveal delay={0.15} className="shrink-0">
            <Link
              href="/news"
              className="group inline-flex items-center gap-2 text-sm font-bold text-primary transition-colors hover:text-primary-bright"
            >
              {t("cta")}
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {items.slice(0, 3).map((item, i) => (
            <Reveal key={item.slug} delay={i * 0.1} className="h-full">
              <NewsCard item={item} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
