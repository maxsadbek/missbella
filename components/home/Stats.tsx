"use client";

import { useTranslations } from "next-intl";
import { Counter } from "@/components/ui/Counter";
import { Reveal } from "@/components/ui/Reveal";

const stats = [
  { value: 1250, suffix: "+", labelKey: "students" },
  { value: 87, suffix: "", labelKey: "teachers" },
  { value: 48, suffix: "", labelKey: "years" },
  { value: 350, suffix: "+", labelKey: "awards" },
] as const;

export function Stats() {
  const t = useTranslations("stats");

  return (
    <section className="relative overflow-hidden bg-navy-deep py-20 text-white lg:py-24">
      <div className="pointer-events-none absolute inset-0 bg-grid-dark opacity-40" />
      <div className="hairline-gradient absolute inset-x-0 top-0" />

      <div className="relative mx-auto max-w-7xl px-5 lg:px-8">
        <Reveal>
          <p className="text-center text-xs font-bold uppercase tracking-[0.3em] text-primary-bright">
            {t("eyebrow")}
          </p>
        </Reveal>
        <div className="mt-12 grid grid-cols-2 gap-x-6 gap-y-12 lg:grid-cols-4">
          {stats.map((s, i) => (
            <Reveal key={s.labelKey} delay={i * 0.08} className="text-center">
              <div className="font-display text-4xl font-extrabold sm:text-5xl">
                <span className="text-gradient">
                  <Counter to={s.value} suffix={s.suffix} />
                </span>
              </div>
              <p className="mt-3 text-[13px] font-semibold uppercase tracking-[0.18em] text-white/50">
                {t(s.labelKey)}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
