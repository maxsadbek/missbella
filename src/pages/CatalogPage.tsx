import { useSearchParams } from "react-router-dom";

import { Reveal } from "@/components/ui/Reveal";
import { ProductGrid } from "@/components/ui/ProductGrid";
import { SITE } from "@/config";
import { CATEGORIES, PRODUCTS } from "@/data/products";
import { usePageMeta } from "@/hooks/usePageMeta";
import { cn } from "@/lib/utils";
import type { CategoryId } from "@/types/product";

export function CatalogPage() {
  usePageMeta(
    `Katalog — ${SITE.name}`,
    `${SITE.name} katalogi — ko'ylaklar, yubkalar, bluzkalar va kostyumlar. Buyurtma Telegram orqali qabul qilinadi.`
  );

  const [searchParams, setSearchParams] = useSearchParams();
  const activeCategory = searchParams.get("category");

  const filtered = activeCategory
    ? PRODUCTS.filter((product) => product.category === activeCategory)
    : PRODUCTS;

  function selectCategory(category: CategoryId | null) {
    if (category) {
      setSearchParams({ category });
    } else {
      setSearchParams({});
    }
  }

  return (
    <section className="mx-auto max-w-7xl px-5 py-20 sm:px-6 md:py-24">
      <Reveal>
        <p className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.35em] text-brand-500">
          <span className="h-px w-10 bg-brand-500" aria-hidden />
          Katalog
        </p>
        <div className="mt-5 flex flex-wrap items-end justify-between gap-6">
          <h1 className="font-display text-4xl leading-[1.05] tracking-wide text-balance text-brand-950 sm:text-5xl md:text-6xl">
            Barcha mahsulotlar
          </h1>
          <p className="pb-2 text-sm uppercase tracking-[0.2em] text-brand-600">
            {filtered.length} ta mahsulot
          </p>
        </div>
      </Reveal>

      <Reveal
        delay={0.08}
        className="mt-10 flex flex-wrap gap-3 border-y border-brand-200 py-5"
      >
        <FilterChip
          active={!activeCategory}
          onClick={() => selectCategory(null)}
          label="Barchasi"
        />
        {CATEGORIES.map((category) => (
          <FilterChip
            key={category.id}
            active={activeCategory === category.id}
            onClick={() => selectCategory(category.id)}
            label={category.label}
          />
        ))}
      </Reveal>

      <div className="mt-14">
        <ProductGrid products={filtered} />
      </div>
    </section>
  );
}

interface FilterChipProps {
  active: boolean;
  onClick: () => void;
  label: string;
}

function FilterChip({ active, onClick, label }: FilterChipProps) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onClick}
      className={cn(
        "rounded-full border px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.2em] transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0",
        active
          ? "border-brand-500 bg-brand-500 text-white shadow-soft"
          : "border-brand-200 bg-transparent text-brand-950 hover:border-brand-500 hover:text-brand-500"
      )}
    >
      {label}
    </button>
  );
}
