"use client";

import { useTranslations } from "next-intl";

export function AuthLayout({
  children,
  title,
  subtitle,
}: {
  children: React.ReactNode;
  title: string;
  subtitle: string;
}) {
  const hero = useTranslations("hero");

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-navy-deep px-5 pb-24 pt-28">
      <div className="pointer-events-none absolute inset-0 bg-grid-dark opacity-40" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(10,132,255,0.13)_0%,transparent_60%)]" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-navy-deep/40 via-transparent to-navy-deep" />

      <div className="relative grid w-full max-w-5xl overflow-hidden rounded-[6px] border border-white/10 shadow-[0_40px_120px_-50px_rgba(0,102,255,0.6)] lg:grid-cols-2">
        {/* brand panel */}
        <div className="relative hidden flex-col justify-between overflow-hidden bg-gradient-to-br from-[#06102b] via-[#081838] to-[#0a1a38] p-12 lg:flex">
          <div className="pointer-events-none absolute inset-0 bg-grid-dark opacity-50" />
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(10,132,255,0.28)_0%,transparent_55%)]" />
          <div className="relative">
            <span className="font-display text-[7rem] font-extrabold leading-none text-white/95">
              20
            </span>
            <p className="mt-2 text-xs font-bold uppercase tracking-[0.35em] text-primary-bright">
              20-MAKTAB
            </p>
          </div>
          <div className="relative">
            <h2 className="font-display text-2xl font-bold leading-snug text-white">
              {hero("title")}
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-white/55">
              {hero("subtitle")}
            </p>
          </div>
        </div>

        {/* form panel */}
        <div className="relative bg-[#0a1120]/90 p-8 backdrop-blur-xl sm:p-12">
          <div className="mx-auto max-w-sm">
            <div className="lg:hidden">
              <span className="font-display text-6xl font-extrabold text-white">
                20
              </span>
            </div>
            <h1 className="mt-2 font-display text-2xl font-bold text-white lg:mt-0">
              {title}
            </h1>
            <p className="mt-2 text-sm leading-relaxed text-white/50">
              {subtitle}
            </p>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
