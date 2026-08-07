"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { ArrowRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

export type NewsItem = {
  slug: string;
  title: string;
  date: string;
  category: string;
  excerpt: string;
  body: string[];
};

export function NewsCard({
  item,
  className,
}: {
  item: NewsItem;
  className?: string;
}) {
  const t = useTranslations("news");

  return (
    <Link
      href={`/news/${item.slug}`}
      className={cn(
        "group flex h-full flex-col overflow-hidden rounded-[6px] border border-line bg-surface transition-all duration-500 hover:border-primary/30 hover:shadow-[0_8px_30px_-12px_rgba(0,102,255,0.3)]",
        className
      )}
    >
      <div className="relative aspect-[16/10] overflow-hidden">
        <Image
          src={`https://picsum.photos/seed/s20-${item.slug}/800/500`}
          alt={item.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-deep/55 via-transparent to-transparent" />
        <span className="absolute left-4 top-4 rounded-full bg-primary px-3 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-white shadow-lg">
          {item.category}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-6">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-ink-soft">
          {item.date}
        </p>
        <h3 className="mt-2.5 font-display text-lg font-bold leading-snug text-ink transition-colors duration-300 group-hover:text-primary">
          {item.title}
        </h3>
        <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-ink-soft">
          {item.excerpt}
        </p>
        <span className="mt-auto inline-flex items-center gap-2 pt-5 text-sm font-bold text-primary">
          {t("readMore")}
          <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1.5" />
        </span>
      </div>
    </Link>
  );
}
