import { motion, type Variants } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

import { BuyButton } from "@/components/ui/BuyButton";
import { buttonVariants } from "@/components/ui/button";
import { SITE } from "@/config";
import { HERO_IMAGE } from "@/data/products";
import { EASE } from "@/lib/animations";

const heroContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.12 } },
};

const heroItem: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};

export function Hero() {
  return (
    <section className="border-b border-brand-200">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-16 px-5 py-20 sm:px-6 md:py-24 lg:grid-cols-12 lg:py-28">
        <motion.div
          variants={heroContainer}
          initial="hidden"
          animate="visible"
          className="lg:col-span-6"
        >
          <motion.p
            variants={heroItem}
            className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.35em] text-brand-500"
          >
            <span className="h-px w-10 bg-brand-500" aria-hidden />
            Ayollar kiyimi · {SITE.foundedYear} yildan beri
          </motion.p>
          <motion.h1
            variants={heroItem}
            className="mt-6 font-display text-4xl leading-[1.05] tracking-wide text-balance text-brand-950 sm:text-5xl lg:text-7xl"
          >
            Go'zallik — sizning{" "}
            <span className="italic text-brand-500">uslubingizda</span>
          </motion.h1>
          <motion.p
            variants={heroItem}
            className="mt-6 max-w-md text-base leading-relaxed text-brand-700 md:text-lg"
          >
            MissBella — har bir ayolning o'z uslubini topishi uchun tanlangan
            premium ayollar kiyimlari. Buyurtma Telegram orqali, tez va qulay.
          </motion.p>
          <motion.div
            variants={heroItem}
            className="mt-10 flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:items-center sm:gap-4"
          >
            <Link
              to="/catalog"
              className={buttonVariants({
                variant: "default",
                size: "lg",
                className: "w-full sm:w-auto",
              })}
            >
              Katalogni ko'rish
              <ArrowRight className="size-4" />
            </Link>
            <BuyButton
              variant="outline"
              label="Telegram'da buyurtma"
              className="w-full sm:w-auto"
            />
          </motion.div>
          <motion.dl
            variants={heroItem}
            className="mt-14 flex flex-wrap gap-x-10 gap-y-6 border-t border-brand-200 pt-8 sm:gap-x-12"
          >
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
          </motion.dl>
        </motion.div>

        <motion.div
          initial={{
            opacity: 0,
            scale: 1.06,
            clipPath: "inset(8% 8% 8% 8%)",
          }}
          animate={{
            opacity: 1,
            scale: 1,
            clipPath: "inset(0% 0% 0% 0%)",
          }}
          transition={{ duration: 1, ease: EASE, delay: 0.2 }}
          className="lg:col-span-6"
        >
          <div className="relative ml-auto w-full max-w-xl">
            <div
              className="absolute -right-5 -top-5 hidden h-full w-full rounded-2xl border border-brand-200 md:block"
              aria-hidden
            />
            <div className="group relative overflow-hidden rounded-2xl">
              <img
                src={HERO_IMAGE}
                alt="MissBella yangi kolleksiyasi"
                className="aspect-[4/5] w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105"
              />
            </div>
            <div className="absolute bottom-0 left-0 flex items-center gap-3 rounded-tr-2xl bg-brand-500 px-6 py-4 text-white shadow-lift">
              <p className="text-[10px] font-semibold uppercase tracking-[0.3em]">
                Yangi kolleksiya
              </p>
              <span className="h-4 w-px bg-white/50" aria-hidden />
              <p className="font-display text-xl">2026 · Kuz</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
