import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

import { Reveal } from "@/components/ui/Reveal";
import { SITE } from "@/config";
import { STORE_IMAGE } from "@/data/products";

export function AboutPreview() {
  return (
    <section className="border-t border-brand-200">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-16 px-5 py-24 sm:px-6 lg:grid-cols-12">
        <Reveal className="relative order-2 lg:order-1 lg:col-span-5">
          <div
            className="absolute -bottom-5 -left-5 hidden h-full w-full rounded-2xl border border-brand-200 md:block"
            aria-hidden
          />
          <div className="group relative overflow-hidden rounded-2xl">
            <img
              src={STORE_IMAGE}
              alt="MissBella do'koni"
              className="relative aspect-[4/5] w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />
          </div>
        </Reveal>
        <Reveal
          delay={0.1}
          className="order-1 lg:order-2 lg:col-span-6 lg:col-start-7"
        >
          <p className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.35em] text-brand-500">
            <span className="h-px w-10 bg-brand-500" aria-hidden />
            Biz haqimizda
          </p>
          <h2 className="mt-5 font-display text-4xl leading-[1.1] tracking-wide text-balance text-brand-950 md:text-5xl">
            Uslub va sifatning{" "}
            <span className="italic text-brand-500">uchrashuvi</span>
          </h2>
          <p className="mt-6 text-base leading-relaxed text-brand-700">
            {SITE.foundedYear}-yildan beri MissBella ayollarning o'ziga xos
            uslubini topishiga yordam beradi. Har bir model diqqat bilan
            tanlanadi — sifatli matolar, aniq kesim va har bir mijozga
            individual yondashuv.
          </p>
          <p className="mt-4 text-base leading-relaxed text-brand-700">
            Biz sizning vaqtingizni qadrlaymiz: mahsulotni Telegram orqali
            tanlaysiz, biz esa uni imkon qadar tez yetkazib beramiz.
          </p>
          <Link
            to="/about"
            className="group mt-8 inline-flex items-center gap-2 border-b border-brand-500 pb-1 text-xs font-semibold uppercase tracking-[0.25em] text-brand-500 transition-colors duration-300 hover:border-brand-600 hover:text-brand-600"
          >
            Batafsil ma'lumot
            <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
