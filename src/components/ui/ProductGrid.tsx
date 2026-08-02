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
      <p className="border border-dashed border-brand-200 px-6 py-16 text-center text-sm uppercase tracking-[0.2em] text-brand-600">
        Bu bo'limda hozircha mahsulot yo'q
      </p>
    );
  }

  return (
    <div
      className={cn(
        "grid grid-cols-1 gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
        className
      )}
    >
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
