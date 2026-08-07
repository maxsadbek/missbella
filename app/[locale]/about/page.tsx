"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { usePageMeta } from "@/lib/hooks";
import { PageHero } from "@/components/layout/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { Stats } from "@/components/home/Stats";
import { CTASection } from "@/components/home/CTASection";
import { Counter } from "@/components/ui/Counter";

export default function AboutPage() {
  const t = useTranslations("about");
  const stats = useTranslations("stats");
  usePageMeta(`${t("eyebrow")} — 20-maktab`);

  const values = t.raw("values") as { title: string; text: string }[];
  const timeline = t.raw("timeline") as { year: string; text: string }[];

  return (
    <>
      <PageHero eyebrow={t("eyebrow")} title={t("title")} />

      {/* story + mission */}
      <section className="relative py-24 lg:py-32">
        <div className="mx-auto grid max-w-7xl items-center gap-14 px-5 lg:grid-cols-2 lg:gap-20 lg:px-8">
          <div>
            <Reveal>
              <p className="text-lg leading-relaxed text-ink-soft">{t("p1")}</p>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-6 text-lg leading-relaxed text-ink-soft">
                {t("p2")}
              </p>
            </Reveal>
            <div className="mt-10 grid gap-5 sm:grid-cols-2">
              <Reveal delay={0.15}>
                <div className="h-full rounded-[6px] border border-line bg-surface p-7 transition-all duration-500 hover:border-primary/40">
                  <h3 className="font-display text-base font-bold text-primary">
                    {t("missionTitle")}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-ink-soft">
                    {t("mission")}
                  </p>
                </div>
              </Reveal>
              <Reveal delay={0.22}>
                <div className="h-full rounded-[6px] border border-line bg-surface p-7 transition-all duration-500 hover:border-primary/40">
                  <h3 className="font-display text-base font-bold text-primary">
                    {t("visionTitle")}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-ink-soft">
                    {t("vision")}
                  </p>
                </div>
              </Reveal>
            </div>
          </div>

          <Reveal className="relative">
            <div className="relative overflow-hidden rounded-[6px]">
              <Image
                src="https://picsum.photos/seed/s20-about-2/900/1050"
                alt="20-maktab"
                width={900}
                height={1050}
                className="w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-deep/50 via-transparent to-transparent" />
            </div>
            <div className="absolute -bottom-6 right-6 rounded-[6px] border border-line glass p-6 shadow-[0_24px_60px_-30px_rgba(2,6,18,0.5)]">
              <div className="font-display text-4xl font-extrabold text-primary">
                <Counter to={1250} suffix="+" />
              </div>
              <p className="mt-1 text-[11px] font-bold uppercase tracking-[0.2em] text-ink-soft">
                {stats("students")}
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* values */}
      <section className="bg-surface py-24 lg:py-28">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <Reveal>
            <h2 className="text-center font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl">
              {t("valuesTitle")}
            </h2>
          </Reveal>
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v, i) => (
              <Reveal key={v.title} delay={i * 0.08}>
                <div className="group h-full rounded-[6px] border border-line bg-bg p-7 text-center transition-all duration-500 hover:border-primary/30 hover:shadow-[0_8px_30px_-12px_rgba(0,102,255,0.3)]">
                  <div className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-primary-soft font-display text-lg font-extrabold text-primary">
                    0{i + 1}
                  </div>
                  <h3 className="mt-5 font-display text-base font-bold text-ink">
                    {v.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-ink-soft">
                    {v.text}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* timeline */}
      <section className="py-24 lg:py-32">
        <div className="mx-auto max-w-4xl px-5 lg:px-8">
          <Reveal>
            <h2 className="text-center font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl">
              {t("timelineTitle")}
            </h2>
          </Reveal>
          <div className="relative mt-16">
            <span className="absolute bottom-2 left-[19px] top-2 w-px bg-gradient-to-b from-primary/60 via-primary/25 to-transparent sm:left-1/2" />
            <div className="space-y-12">
              {timeline.map((item, i) => (
                <Reveal key={item.year} delay={0.05}>
                  <div
                    className={`relative flex items-start gap-6 sm:w-1/2 ${
                      i % 2 === 0
                        ? "sm:pr-12 sm:text-right sm:flex-row-reverse"
                        : "sm:ml-auto sm:pl-12"
                    }`}
                  >
                    <span
                      className={`relative z-10 mt-1 grid h-10 w-10 shrink-0 place-items-center rounded-full border border-primary/30 bg-bg font-display text-xs font-extrabold text-primary shadow-[0_0_0_5px_rgba(0,102,255,0.08)] ${
                        i % 2 === 0 ? "" : ""
                      }`}
                    >
                      {item.year.slice(2)}
                    </span>
                    <div className="rounded-[6px] border border-line bg-surface p-6 transition-all duration-500 hover:border-primary/40">
                      <div className="font-display text-lg font-extrabold text-primary">
                        {item.year}
                      </div>
                      <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                        {item.text}
                      </p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Stats />
      <CTASection />
    </>
  );
}
