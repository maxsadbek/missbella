"use client";

import { Reveal } from "@/components/ui/Reveal";

export function PageHero({
  eyebrow,
  title,
  subtitle,
  children,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  children?: React.ReactNode;
}) {
  return (
    <section className="relative overflow-hidden bg-navy-deep pb-16 pt-32 text-white lg:pb-20 lg:pt-40">
      <div className="pointer-events-none absolute inset-0 bg-grid-dark opacity-40" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(10,132,255,0.16)_0%,transparent_60%)]" />
      <div className="hairline-gradient absolute inset-x-0 bottom-0" />

      <div className="relative mx-auto max-w-7xl px-5 lg:px-8">
        {eyebrow && (
          <Reveal>
            <div className="flex items-center gap-3">
              <span className="h-px w-8 bg-primary/60" />
              <span className="text-xs font-bold uppercase tracking-[0.25em] text-primary-bright">
                {eyebrow}
              </span>
            </div>
          </Reveal>
        )}
        <Reveal delay={0.08}>
          <h1 className="mt-5 max-w-3xl font-display text-3xl font-extrabold leading-[1.12] tracking-tight sm:text-5xl lg:text-6xl">
            {title}
          </h1>
        </Reveal>
        {subtitle && (
          <Reveal delay={0.16}>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-white/60 sm:text-lg">
              {subtitle}
            </p>
          </Reveal>
        )}
        {children}
      </div>
    </section>
  );
}
