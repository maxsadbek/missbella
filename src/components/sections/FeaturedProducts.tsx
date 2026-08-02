import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

import { ProductGrid } from "@/components/ui/ProductGrid";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getFeaturedProducts } from "@/data/products";

export function FeaturedProducts() {
  const products = getFeaturedProducts().slice(0, 4);

  return (
    <section className="mx-auto max-w-7xl px-6 py-24">
      <SectionHeading
        eyebrow="Tanlangan"
        title="Kolleksiyadan eng yaxshilari"
        action={
          <Link
            to="/catalog"
            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.25em] text-brand-950 transition-colors duration-300 hover:text-brand-500"
          >
            Barchasini ko'rish
            <ArrowRight className="size-4" />
          </Link>
        }
      />
      <ProductGrid products={products} className="lg:grid-cols-4" />
    </section>
  );
}
