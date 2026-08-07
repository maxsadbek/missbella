"use client";

import { useTranslations } from "next-intl";
import { Cpu, Globe2, Sparkles } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

const ICONS = [Cpu, Globe2, Sparkles];

export function Intro() {
  const t = useTranslations("intro");
  const features = t.raw("features") as {
    title: string;
    text: string;
  }[];

  return (
    <section className="relative py-24 lg:py-32">
      <div className="pointer-events-none absolute inset-0 bg-grid opacity-60 [mask-image:radial-gradient(ellipse_at_top,black,transparent_70%)]" />
      <div className="relative mx-auto max-w-7xl px-5 lg:px-8">
        <SectionHeading eyebrow={t("eyebrow")} title={t("title")} />

        <div className="mx-auto mt-6 max-w-2xl text-center">
          <Reveal delay={0.15}>
            <p className="text-base leading-relaxed text-ink-soft sm:text-lg">
              {t("p1")}
            </p>
          </Reveal>
          <Reveal delay={0.22}>
            <p className="mt-4 text-base leading-relaxed text-ink-soft sm:text-lg">
              {t("p2")}
            </p>
          </Reveal>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {features.map((f, i) => {
            const Icon = ICONS[i % ICONS.length];
            return (
              <Reveal key={f.title} delay={i * 0.1}>
                <div className="group relative h-full overflow-hidden rounded-[6px] border border-line bg-surface p-8 transition-all duration-500 hover:border-primary/30 hover:shadow-[0_8px_30px_-12px_rgba(0,102,255,0.3)]">
                  <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-primary/10 blur-2xl transition-all duration-500 group-hover:bg-primary/15" />
                  <div className="relative grid h-12 w-12 place-items-center rounded-[6px] bg-gradient-to-br from-primary-bright to-primary text-white shadow-[0_10px_24px_-10px_rgba(0,102,255,0.8)]">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="relative mt-6 font-display text-lg font-bold text-ink">
                    {f.title}
                  </h3>
                  <p className="relative mt-3 text-sm leading-relaxed text-ink-soft">
                    {f.text}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
