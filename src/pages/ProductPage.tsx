import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Check, Clock, Ruler, Truck } from "lucide-react";
import { Link, useParams } from "react-router-dom";

import { BuyButton } from "@/components/ui/BuyButton";
import { Reveal } from "@/components/ui/Reveal";
import { buttonVariants } from "@/components/ui/button";
import { ProductGrid } from "@/components/ui/ProductGrid";
import { SizeSelector } from "@/components/ui/SizeSelector";
import { SITE } from "@/config";
import { getCategoryLabel, getProductById, getSimilarProducts } from "@/data/products";
import { usePageMeta } from "@/hooks/usePageMeta";
import { EASE } from "@/lib/animations";
import { cn } from "@/lib/utils";
import { formatPrice } from "@/lib/format";

export function ProductPage() {
  const { id } = useParams();
  const product = getProductById(id);
  const [size, setSize] = useState<string | undefined>(undefined);

  // Boshqa mahsulotga o'tilganda o'lcham tanlovini tozalash
  useEffect(() => {
    setSize(undefined);
  }, [id]);

  usePageMeta(
    product
      ? `${product.name} — ${SITE.name}`
      : `Mahsulot topilmadi — ${SITE.name}`,
    product?.description ?? SITE.description
  );

  if (!product) {
    return (
      <section className="mx-auto max-w-7xl px-5 py-32 text-center sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: EASE }}
        >
          <h1 className="font-display text-4xl tracking-wide text-brand-950">
            Mahsulot topilmadi
          </h1>
          <p className="mt-4 text-brand-700">
            So'ralgan mahsulot mavjud emas yoki o'chirilgan bo'lishi mumkin.
          </p>
          <Link
            to="/catalog"
            className={cn(buttonVariants({ variant: "default", size: "lg" }), "mt-10")}
          >
            Katalogga qaytish
          </Link>
        </motion.div>
      </section>
    );
  }

  const similar = getSimilarProducts(product);

  return (
    <section className="mx-auto max-w-7xl px-5 py-12 sm:px-6 md:py-16">
      {/* Breadcrumb */}
      <nav
        aria-label="Breadcrumb"
        className="flex flex-wrap items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-brand-600"
      >
        <Link
          to="/"
          className="transition-colors duration-300 hover:text-brand-500"
        >
          Bosh sahifa
        </Link>
        <span aria-hidden>/</span>
        <Link
          to="/catalog"
          className="transition-colors duration-300 hover:text-brand-500"
        >
          Katalog
        </Link>
        <span aria-hidden>/</span>
        <Link
          to={`/catalog?category=${product.category}`}
          className="transition-colors duration-300 hover:text-brand-500"
        >
          {getCategoryLabel(product.category)}
        </Link>
        <span aria-hidden>/</span>
        <span className="text-brand-950">{product.name}</span>
      </nav>

      <div className="mt-10 grid grid-cols-1 gap-14 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <motion.div
            initial={{
              opacity: 0,
              scale: 1.04,
              clipPath: "inset(6% 6% 6% 6%)",
            }}
            animate={{
              opacity: 1,
              scale: 1,
              clipPath: "inset(0% 0% 0% 0%)",
            }}
            transition={{ duration: 0.9, ease: EASE }}
            className="group relative overflow-hidden rounded-2xl border border-brand-200 bg-brand-50"
          >
            <img
              src={product.image}
              alt={product.name}
              className="aspect-[3/4] w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />
            {product.isNew && (
              <span className="absolute left-4 top-4 rounded-full bg-brand-500 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-white shadow-soft">
                Yangi
              </span>
            )}
          </motion.div>
        </div>

        <div className="lg:col-span-5">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE, delay: 0.15 }}
          >
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-brand-500">
              {getCategoryLabel(product.category)}
            </p>
            <h1 className="mt-4 font-display text-4xl leading-[1.05] tracking-wide text-balance text-brand-950 md:text-5xl">
              {product.name}
            </h1>

            <div className="mt-6 flex flex-wrap items-baseline gap-4">
              <p className="font-display text-3xl text-brand-500">
                {formatPrice(product.price)}
              </p>
              {product.oldPrice && (
                <p className="text-sm text-brand-600 line-through">
                  {formatPrice(product.oldPrice)}
                </p>
              )}
            </div>
            {product.oldPrice && (
              <p className="mt-3 inline-block rounded-full border border-brand-500 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-brand-500">
                Chegirma{" "}
                {Math.round((1 - product.price / product.oldPrice) * 100)}%
              </p>
            )}

            <p className="mt-8 text-base leading-relaxed text-brand-700">
              {product.description}
            </p>

            <div className="mt-8 border-t border-brand-200 pt-8">
              <h2 className="text-xs font-semibold uppercase tracking-[0.3em] text-brand-950">
                O'lcham tanlang
              </h2>
              <div className="mt-4">
                <SizeSelector
                  sizes={product.sizes}
                  value={size}
                  onChange={setSize}
                />
              </div>
              <p className="mt-3 flex items-center gap-2 text-xs text-brand-600">
                <Ruler className="size-3.5" />
                O'lcham bo'yicha savol — Telegramda so'rang
              </p>
            </div>

            <div className="mt-8">
              <BuyButton label="Sotib olish — Telegram" className="w-full" />
              <p className="mt-3 text-center text-xs text-brand-600">
                Buyurtma shaxsiy Telegram orqali tasdiqlanadi
              </p>
            </div>

            <ul className="mt-10 space-y-3 border-t border-brand-200 pt-8">
              {product.details.map((detail) => (
                <li
                  key={detail}
                  className="flex items-start gap-3 text-sm text-brand-700"
                >
                  <Check className="mt-0.5 size-4 shrink-0 text-brand-500" />
                  {detail}
                </li>
              ))}
            </ul>

            <div className="mt-10 grid grid-cols-1 gap-4 border-t border-brand-200 pt-8 sm:grid-cols-2">
              <div className="flex items-center gap-3 rounded-2xl border border-brand-200 px-5 py-4 transition-shadow duration-300 hover:shadow-soft">
                <Truck className="size-5 shrink-0 text-brand-500" />
                <div>
                  <p className="text-sm font-semibold text-brand-950">
                    Yetkazib berish 1–3 kun
                  </p>
                  <p className="text-xs text-brand-600">Toshkent bo'ylab bepul</p>
                </div>
              </div>
              <div className="flex items-center gap-3 rounded-2xl border border-brand-200 px-5 py-4 transition-shadow duration-300 hover:shadow-soft">
                <Clock className="size-5 shrink-0 text-brand-500" />
                <div>
                  <p className="text-sm font-semibold text-brand-950">
                    {SITE.workDays}
                  </p>
                  <p className="text-xs text-brand-600">
                    savollarga javob beramiz
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <Reveal className="mt-24">
        <h2 className="font-display text-3xl tracking-wide text-balance text-brand-950 md:text-4xl">
          O'xshash mahsulotlar
        </h2>
        <div className="mt-10">
          <ProductGrid products={similar} />
        </div>
      </Reveal>
    </section>
  );
}
