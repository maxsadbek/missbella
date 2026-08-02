import { Link } from "react-router-dom";

import { getCategoryLabel } from "@/data/products";
import { formatPrice } from "@/lib/format";
import type { Product } from "@/types/product";

export function ProductCard({ product }: { product: Product }) {
  return (
    <Link to={`/product/${product.id}`} className="group block">
      <div className="relative overflow-hidden border border-brand-100 bg-brand-50">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="aspect-[3/4] w-full object-cover transition-opacity duration-300 group-hover:opacity-90"
        />
        {product.isNew && (
          <span className="absolute left-0 top-0 bg-brand-500 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-white">
            Yangi
          </span>
        )}
      </div>
      <div className="flex items-start justify-between gap-4 pt-5">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-brand-500">
            {getCategoryLabel(product.category)}
          </p>
          <h3 className="mt-1.5 font-display text-lg leading-snug text-brand-950 transition-colors duration-300 group-hover:text-brand-500">
            {product.name}
          </h3>
        </div>
        <p className="shrink-0 pt-0.5 text-sm text-brand-900">
          {formatPrice(product.price)}
        </p>
      </div>
    </Link>
  );
}
