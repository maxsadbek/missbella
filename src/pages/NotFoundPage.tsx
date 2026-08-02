import { motion } from "framer-motion";
import { Link } from "react-router-dom";

import { buttonVariants } from "@/components/ui/button";
import { SITE } from "@/config";
import { usePageMeta } from "@/hooks/usePageMeta";
import { EASE } from "@/lib/animations";
import { cn } from "@/lib/utils";

export function NotFoundPage() {
  usePageMeta(
    `Sahifa topilmadi — ${SITE.name}`,
    "So'ralgan sahifa topilmadi."
  );

  return (
    <section className="mx-auto flex max-w-7xl flex-col items-center px-5 py-32 text-center sm:px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: EASE }}
      >
        <p className="font-display text-8xl leading-none text-brand-500 md:text-9xl">
          404
        </p>
        <h1 className="mt-6 font-display text-3xl tracking-wide text-balance text-brand-950 md:text-4xl">
          Sahifa topilmadi
        </h1>
        <p className="mt-4 max-w-md text-brand-700">
          Qidirgan sahifa mavjud emas yoki ko'chirilgan bo'lishi mumkin.
        </p>
        <Link
          to="/"
          className={cn(buttonVariants({ variant: "default", size: "lg" }), "mt-10")}
        >
          Bosh sahifaga qaytish
        </Link>
      </motion.div>
    </section>
  );
}
