"use client";

import Image from "next/image";
import { useParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { ArrowLeft } from "lucide-react";
import { usePageMeta } from "@/lib/hooks";
import { Link } from "@/i18n/navigation";
import { Reveal } from "@/components/ui/Reveal";
import { NewsCard, type NewsItem } from "@/components/news/NewsCard";

export default function NewsDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const t = useTranslations("news");
  const items = t.raw("items") as NewsItem[];
  const item = items.find((i) => i.slug === slug);

  usePageMeta(item ? `${item.title} — 20-maktab` : undefined);

  if (!item) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center px-5 text-center">
        <div className="font-display text-7xl font-extrabold text-primary">20</div>
        <h1 className="mt-6 font-display text-2xl font-bold text-ink">
          {t("notFound")}
        </h1>
        <Link
          href="/news"
          className="mt-8 inline-flex items-center gap-2 text-sm font-bold text-primary transition-colors hover:text-primary-bright"
        >
          <ArrowLeft className="h-4 w-4" />
          {t("back")}
        </Link>
      </div>
    );
  }

  const index = items.findIndex((i) => i.slug === item.slug);
  const related = items.filter((i) => i.slug !== item.slug).slice(0, 2);

  return (
    <>
      {/* article header */}
      <section className="relative overflow-hidden bg-navy-deep pb-16 pt-32 text-white lg:pt-40">
        <div className="pointer-events-none absolute inset-0 bg-grid-dark opacity-40" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(10,132,255,0.16)_0%,transparent_60%)]" />
        <div className="hairline-gradient absolute inset-x-0 bottom-0" />

        <div className="relative mx-auto max-w-4xl px-5 lg:px-8">
          <Reveal>
            <Link
              href="/news"
              className="inline-flex items-center gap-2 text-sm font-semibold text-white/60 transition-colors hover:text-primary-bright"
            >
              <ArrowLeft className="h-4 w-4" />
              {t("back")}
            </Link>
          </Reveal>
          <Reveal delay={0.08}>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <span className="rounded-full bg-primary px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-[0.14em] text-white">
                {item.category}
              </span>
              <span className="text-sm font-semibold text-white/55">
                {item.date}
              </span>
            </div>
          </Reveal>
          <Reveal delay={0.14}>
            <h1 className="mt-5 font-display text-3xl font-extrabold leading-[1.12] tracking-tight sm:text-4xl lg:text-5xl">
              {item.title}
            </h1>
          </Reveal>
        </div>
      </section>

      <section className="py-16 lg:py-20">
        <div className="mx-auto max-w-4xl px-5 lg:px-8">
          <Reveal>
            <div className="relative aspect-[16/9] overflow-hidden rounded-[6px]">
              <Image
                src={`https://picsum.photos/seed/s20-${index}-${item.slug}/1200/675`}
                alt={item.title}
                fill
                sizes="(max-width: 1024px) 100vw, 896px"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-deep/40 to-transparent" />
            </div>
          </Reveal>

          <div className="mt-10 space-y-6">
            {item.body.map((p, i) => (
              <Reveal key={i} delay={i * 0.05}>
                <p className="text-base leading-[1.9] text-ink-soft sm:text-lg">
                  {p}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {related.length > 0 && (
        <section className="bg-surface py-16 lg:py-24">
          <div className="mx-auto max-w-7xl px-5 lg:px-8">
            <Reveal>
              <h2 className="font-display text-2xl font-bold tracking-tight text-ink sm:text-3xl">
                {t("readMore")}
              </h2>
            </Reveal>
            <div className="mt-10 grid gap-6 md:grid-cols-2">
              {related.map((r, i) => (
                <Reveal key={r.slug} delay={i * 0.08} className="h-full">
                  <NewsCard item={r} />
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
