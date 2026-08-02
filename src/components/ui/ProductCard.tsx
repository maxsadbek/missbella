import { motion } from "framer-motion";
import { Link } from "react-router-dom";

import { getCategoryLabel } from "@/data/products";
import { staggerItem } from "@/lib/animations";
import { formatPrice } from "@/lib/format";
import type { Product } from "@/types/product";

export function ProductCard({ product }: { product: Product }) {
  return (
    <motion.div variants={staggerItem} className="group">
      <Link to={`/product/${product.id}`} className="block">
        <div className="relative overflow-hidden rounded-2xl border border-brand-200 bg-brand-50 transition-shadow duration-300 group-hover:shadow-card">
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            className="aspect-[3/4] w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
          {product.isNew && (
            <span className="absolute left-4 top-4 rounded-full bg-brand-500 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-white shadow-soft">
              Yangi
            </span>
          )}
        </div>
        <div className="flex items-start justify-between gap-4 px-1 pt-5">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-brand-500">
              {getCategoryLabel(product.category)}
            </p>
            <h3 className="mt-1.5 font-display text-lg leading-snug text-brand-950 transition-colors duration-300 group-hover:text-brand-600">
              {product.name}
            </h3>
          </div>
          <p className="shrink-0 pt-0.5 text-sm font-medium text-brand-900">
            {formatPrice(product.price)}
          </p>
        </div>
      </Link>
    </motion.div>
  );
}
