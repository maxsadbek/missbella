import { Send } from "lucide-react";

import { BuyButton } from "@/components/ui/BuyButton";
import { SITE } from "@/config";

export function TelegramCta() {
  return (
    <section className="bg-brand-500">
      <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-10 px-6 py-20 lg:flex-row lg:items-center">
        <div className="max-w-2xl">
          <p className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.35em] text-white">
            <Send className="size-4" />
            Buyurtma qabul qilamiz
          </p>
          <h2 className="mt-5 font-display text-4xl leading-[1.1] tracking-wide text-white md:text-5xl">
            Yoqqan modelni topdingizmi?
            <br />
            Telegramda buyurtma qiling.
          </h2>
          <p className="mt-4 text-base leading-relaxed text-white">
            Bizga xabar yozing — model, o'lcham va manzilingizni ayting.
            O'lcham va uslub bo'yicha bepul maslahat beramiz.
          </p>
        </div>
        <BuyButton
          variant="white"
          label={`Telegramga o'tish — @${SITE.telegramHandle}`}
          className="shrink-0"
        />
      </div>
    </section>
  );
}
