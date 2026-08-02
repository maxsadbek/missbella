import { useEffect, useState } from "react";
import { Check, Clock, Ruler, Truck } from "lucide-react";
import { Link, useParams } from "react-router-dom";

import { BuyButton } from "@/components/ui/BuyButton";
import { ProductGrid } from "@/components/ui/ProductGrid";
import { SizeSelector } from "@/components/ui/SizeSelector";
import { SITE } from "@/config";
import { getCategoryLabel, getProductById, getSimilarProducts } from "@/data/products";
import { usePageMeta } from "@/hooks/usePageMeta";
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
      <section className="mx-auto max-w-7xl px-6 py-32 text-center">
        <h1 className="font-display text-4xl tracking-wide text-brand-950">
          Mahsulot topilmadi
        </h1>
        <p className="mt-4 text-brand-700">
          So'ralgan mahsulot mavjud emas yoki o'chirilgan bo'lishi mumkin.
        </p>
        <Link
          to="/catalog"
          className="mt-10 inline-flex items-center gap-2 border border-brand-500 bg-brand-500 px-8 py-4 text-xs font-semibold uppercase tracking-[0.25em] text-white transition-colors duration-300 hover:border-brand-600 hover:bg-brand-600"
        >
          Katalogga qaytish
        </Link>
      </section>
    );
  }

  const similar = getSimilarProducts(product);

  return (
    <section className="mx-auto max-w-7xl px-6 py-12 md:py-16">
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
          <div className="relative border border-brand-100 bg-brand-50">
            <img
              src={product.image}
              alt={product.name}
              className="aspect-[3/4] w-full object-cover"
            />
            {product.isNew && (
              <span className="absolute left-0 top-0 bg-brand-500 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-white">
                Yangi
              </span>
            )}
          </div>
        </div>

        <div className="lg:col-span-5">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-brand-500">
            {getCategoryLabel(product.category)}
          </p>
          <h1 className="mt-4 font-display text-4xl leading-[1.05] tracking-wide text-brand-950 md:text-5xl">
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
            <p className="mt-3 inline-block border border-brand-500 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-brand-500">
              Chegirma {Math.round((1 - product.price / product.oldPrice) * 100)}%
            </p>
          )}

          <p className="mt-8 text-base leading-relaxed text-brand-700">
            {product.description}
          </p>

          <div className="mt-8 border-t border-brand-100 pt-8">
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
            <BuyButton label="Sotib olish — Telegram orqali" className="w-full" />
            <p className="mt-3 text-center text-xs text-brand-600">
              Buyurtma shaxsiy Telegram orqali tasdiqlanadi
            </p>
          </div>

          <ul className="mt-10 space-y-3 border-t border-brand-100 pt-8">
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

          <div className="mt-10 grid grid-cols-1 gap-4 border-t border-brand-100 pt-8 sm:grid-cols-2">
            <div className="flex items-center gap-3 border border-brand-100 px-5 py-4">
              <Truck className="size-5 shrink-0 text-brand-500" />
              <div>
                <p className="text-sm font-semibold text-brand-950">
                  Yetkazib berish 1–3 kun
                </p>
                <p className="text-xs text-brand-600">Toshkent bo'ylab bepul</p>
              </div>
            </div>
            <div className="flex items-center gap-3 border border-brand-100 px-5 py-4">
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
        </div>
      </div>

      <div className="mt-24">
        <h2 className="font-display text-3xl tracking-wide text-brand-950 md:text-4xl">
          O'xshash mahsulotlar
        </h2>
        <div className="mt-10">
          <ProductGrid products={similar} />
        </div>
      </div>
    </section>
  );
}
