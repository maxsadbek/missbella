import { Link } from "react-router-dom";

import { SITE } from "@/config";
import { usePageMeta } from "@/hooks/usePageMeta";

export function NotFoundPage() {
  usePageMeta(
    `Sahifa topilmadi — ${SITE.name}`,
    "So'ralgan sahifa topilmadi."
  );

  return (
    <section className="mx-auto flex max-w-7xl flex-col items-center px-6 py-32 text-center">
      <p className="font-display text-8xl leading-none text-brand-500 md:text-9xl">
        404
      </p>
      <h1 className="mt-6 font-display text-3xl tracking-wide text-brand-950 md:text-4xl">
        Sahifa topilmadi
      </h1>
      <p className="mt-4 max-w-md text-brand-700">
        Qidirgan sahifa mavjud emas yoki ko'chirilgan bo'lishi mumkin.
      </p>
      <Link
        to="/"
        className="mt-10 inline-flex items-center gap-2 border border-brand-500 bg-brand-500 px-8 py-4 text-xs font-semibold uppercase tracking-[0.25em] text-white transition-colors duration-300 hover:border-brand-600 hover:bg-brand-600"
      >
        Bosh sahifaga qaytish
      </Link>
    </section>
  );
}
