"use client";

import { useTranslations } from "next-intl";
import { Sparkles } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { buttonStyles } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";

export function CTASection() {
  const t = useTranslations("cta");

  return (
    <section className="pb-24 pt-4 lg:pb-32">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <Reveal>
          <div className="relative overflow-hidden rounded-[6px] bg-navy-deep px-8 py-20 text-center text-white lg:px-16">
            <div className="pointer-events-none absolute inset-0 bg-grid-dark opacity-50" />
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(10,132,255,0.18)_0%,transparent_65%)]" />
            <div className="hairline-gradient absolute inset-x-0 top-0" />

            <div className="relative">
              <span className="mx-auto grid h-14 w-14 place-items-center rounded-[6px] bg-gradient-to-br from-primary-bright to-primary shadow-[0_14px_40px_-12px_rgba(0,102,255,0.9)]">
                <Sparkles className="h-7 w-7" />
              </span>
              <h2 className="mx-auto mt-8 max-w-2xl font-display text-3xl font-extrabold leading-tight sm:text-4xl lg:text-5xl">
                {t("title")}
              </h2>
              <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-white/60">
                {t("text")}
              </p>
              <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <Link href="/register" className={buttonStyles("primary", "lg")}>
                  {t("btn1")}
                </Link>
                <Link href="/news" className={buttonStyles("glass", "lg")}>
                  {t("btn2")}
                </Link>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
