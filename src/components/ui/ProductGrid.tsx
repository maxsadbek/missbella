import { motion } from "framer-motion";

import { staggerContainer, VIEWPORT } from "@/lib/animations";
import { cn } from "@/lib/utils";
import type { Product } from "@/types/product";

import { ProductCard } from "./ProductCard";

interface ProductGridProps {
  products: Product[];
  className?: string;
}

export function ProductGrid({ products, className }: ProductGridProps) {
  if (products.length === 0) {
    return (
      <motion.p
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={VIEWPORT}
        className="rounded-2xl border border-dashed border-brand-200 px-6 py-16 text-center text-sm uppercase tracking-[0.2em] text-brand-600"
      >
        Bu bo'limda hozircha mahsulot yo'q
      </motion.p>
    );
  }

  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT}
      className={cn(
        "grid grid-cols-1 gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
        className
      )}
    >
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </motion.div>
  );
}
