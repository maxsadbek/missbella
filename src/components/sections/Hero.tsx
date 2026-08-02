import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

import { BuyButton } from "@/components/ui/BuyButton";
import { SITE } from "@/config";
import { HERO_IMAGE } from "@/data/products";

export function Hero() {
  return (
    <section className="border-b border-brand-100">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-16 px-6 py-20 md:py-24 lg:grid-cols-12 lg:py-28">
        <div className="lg:col-span-6">
          <p className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.35em] text-brand-500">
            <span className="h-px w-10 bg-brand-500" aria-hidden />
            Ayollar kiyimi · {SITE.foundedYear} yildan beri
          </p>
          <h1 className="mt-6 font-display text-5xl leading-[1.05] tracking-wide text-brand-950 md:text-7xl">
            Go'zallik — sizning{" "}
            <span className="italic text-brand-500">uslubingizda</span>
          </h1>
          <p className="mt-6 max-w-md text-base leading-relaxed text-brand-700 md:text-lg">
            MissBella — har bir ayolning o'z uslubini topishi uchun tanlangan
            premium ayollar kiyimlari. Buyurtma Telegram orqali, tez va qulay.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <Link
              to="/catalog"
              className="inline-flex items-center gap-2 border border-brand-500 bg-brand-500 px-8 py-4 text-xs font-semibold uppercase tracking-[0.25em] text-white transition-colors duration-300 hover:border-brand-600 hover:bg-brand-600"
            >
              Katalogni ko'rish
              <ArrowRight className="size-4" />
            </Link>
            <BuyButton variant="outline" label="Telegram orqali buyurtma" />
          </div>
          <dl className="mt-14 flex gap-12 border-t border-brand-100 pt-8">
            <div>
              <dt className="font-display text-4xl text-brand-950">500+</dt>
              <dd className="mt-1 text-[10px] font-semibold uppercase tracking-[0.25em] text-brand-600">
                mamnun mijoz
              </dd>
            </div>
            <div>
              <dt className="font-display text-4xl text-brand-950">
                {SITE.foundedYear}
              </dt>
              <dd className="mt-1 text-[10px] font-semibold uppercase tracking-[0.25em] text-brand-600">
                yildan beri ishda
              </dd>
            </div>
            <div>
              <dt className="font-display text-4xl text-brand-950">1–3</dt>
              <dd className="mt-1 text-[10px] font-semibold uppercase tracking-[0.25em] text-brand-600">
                kunda yetkazish
              </dd>
            </div>
          </dl>
        </div>

        <div className="lg:col-span-6">
          <div className="relative ml-auto w-full max-w-xl">
            <div
              className="absolute -right-5 -top-5 hidden h-full w-full border border-brand-200 md:block"
              aria-hidden
            />
            <img
              src={HERO_IMAGE}
              alt="MissBella yangi kolleksiyasi"
              className="relative aspect-[4/5] w-full object-cover"
            />
            <div className="absolute bottom-0 left-0 flex items-center gap-3 bg-brand-500 px-6 py-4 text-white">
              <p className="text-[10px] font-semibold uppercase tracking-[0.3em]">
                Yangi kolleksiya
              </p>
              <span className="h-4 w-px bg-white/50" aria-hidden />
              <p className="font-display text-xl">2026 · Kuz</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
