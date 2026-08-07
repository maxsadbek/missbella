"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { ArrowRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { buttonStyles } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { Counter } from "@/components/ui/Counter";

export function AboutPreview() {
  const t = useTranslations("aboutPreview");
  const stats = useTranslations("stats");

  return (
    <section className="relative overflow-hidden py-24 lg:py-32">
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -right-10 top-1/2 hidden -translate-y-1/2 select-none font-display text-[24rem] font-extrabold leading-none text-primary/[0.05] dark:text-primary/[0.06] lg:block"
      >
        20
      </span>

      <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-5 lg:grid-cols-2 lg:gap-20 lg:px-8">
        <Reveal className="relative">
          <div className="relative overflow-hidden rounded-[6px]">
            <Image
              src="https://picsum.photos/seed/s20-about-main/900/1050"
              alt="20-maktab"
              width={900}
              height={1050}
              className="w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-navy-deep/50 via-transparent to-transparent" />
          </div>

          <div className="absolute -bottom-6 left-6 rounded-[6px] border border-line glass p-6 shadow-[0_24px_60px_-30px_rgba(2,6,18,0.5)]">
            <div className="font-display text-4xl font-extrabold text-primary">
              <Counter to={48} suffix="+" />
            </div>
            <p className="mt-1 text-[11px] font-bold uppercase tracking-[0.2em] text-ink-soft">
              {stats("years")}
            </p>
          </div>
        </Reveal>

        <div>
          <Reveal>
            <div className="flex items-center gap-3">
              <span className="h-px w-8 bg-primary/50" />
              <span className="text-xs font-bold uppercase tracking-[0.25em] text-primary">
                {t("eyebrow")}
              </span>
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="mt-5 font-display text-3xl font-bold leading-[1.15] tracking-tight text-ink sm:text-4xl lg:text-5xl">
              {t("title")}
            </h2>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mt-6 text-base leading-relaxed text-ink-soft sm:text-lg">
              {t("text")}
            </p>
          </Reveal>
          <Reveal delay={0.24}>
            <Link href="/about" className={buttonStyles("primary", "lg", "mt-9")}>
              {t("cta")}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
