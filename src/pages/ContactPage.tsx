import { useId, useState, type FormEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Clock, MapPin, Phone, Plus, Send } from "lucide-react";

import { BuyButton } from "@/components/ui/BuyButton";
import { InstagramIcon } from "@/components/ui/InstagramIcon";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { SITE, TELEGRAM_LINK } from "@/config";
import { usePageMeta } from "@/hooks/usePageMeta";
import { EASE } from "@/lib/animations";

const CONTACT_ITEMS = [
  { icon: MapPin, label: "Manzil", value: SITE.address, href: undefined },
  { icon: Phone, label: "Telefon", value: SITE.phone, href: SITE.phoneHref },
  {
    icon: Send,
    label: "Telegram",
    value: `@${SITE.telegramHandle}`,
    href: SITE.telegramLink,
  },
  {
    icon: InstagramIcon,
    label: "Instagram",
    value: "@missbella_shop",
    href: SITE.instagramLink,
  },
  { icon: Clock, label: "Ish vaqti", value: SITE.workHours, href: undefined },
] as const;

const FAQS = [
  {
    q: "Qanday qilib buyurtma beraman?",
    a: "Katalogdan yoqqan mahsulotni tanlang va «Sotib olish» tugmasini bosing — siz Telegram'ga o'tasiz. Model nomi va o'lchamingizni yozib qoldirsangiz kifoya.",
  },
  {
    q: "Yetkazib berish qancha vaqt oladi?",
    a: "Toshkent bo'ylab buyurtma 1–3 kun ichida yetkaziladi va yetkazib berish bepul.",
  },
  {
    q: "O'lcham bilan adashsam-chi?",
    a: "O'lcham bo'yicha bepul maslahat beramiz — Telegram'da yozing. Yetkazib berishdan oldin o'lchamni birga tasdiqlaymiz.",
  },
  {
    q: "To'lov qanday amalga oshiriladi?",
    a: "To'lov buyurtmani tasdiqlashda kelishiladi — naqd yoki karta orqali amalga oshiriladi.",
  },
];

export function ContactPage() {
  usePageMeta(
    `Aloqa — ${SITE.name}`,
    `${SITE.name} bilan bog'lanish: manzil, telefon, Telegram va Instagram.`
  );

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const text = `Salom! MissBella do'konidan yozmoqchiman.\n\nIsm: ${name}\nTelefon: ${phone}\n\nXabar: ${message}`;
    window.open(
      `${TELEGRAM_LINK}?text=${encodeURIComponent(text)}`,
      "_blank",
      "noopener,noreferrer"
    );
  }

  return (
    <section className="mx-auto max-w-7xl px-5 py-20 sm:px-6 md:py-24">
      <Reveal>
        <p className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.35em] text-brand-500">
          <span className="h-px w-10 bg-brand-500" aria-hidden />
          Aloqa
        </p>
        <h1 className="mt-5 font-display text-4xl leading-[1.05] tracking-wide text-balance text-brand-950 sm:text-5xl md:text-6xl">
          Bog'lanish
        </h1>
        <p className="mt-6 max-w-xl text-base leading-relaxed text-brand-700">
          Savolingiz bormi? Telegram orqali eng tez javob olasiz — yoki quyidagi
          forma orqali xabar qoldiring, biz Telegram'da qaytamiz.
        </p>
      </Reveal>

      <div className="mt-14 grid grid-cols-1 gap-16 lg:grid-cols-12">
        {/* Aloqa ma'lumotlari */}
        <Reveal className="lg:col-span-5">
          <ul className="divide-y divide-brand-200 border-y border-brand-200">
            {CONTACT_ITEMS.map((item) => (
              <li key={item.label} className="flex items-center gap-5 py-5">
                <span className="flex size-11 shrink-0 items-center justify-center rounded-full border border-brand-200 text-brand-500 transition-all duration-300 hover:-translate-y-0.5 hover:border-brand-500 hover:shadow-soft">
                  <item.icon className="size-4" />
                </span>
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-brand-600">
                    {item.label}
                  </p>
                  {item.href ? (
                    <a
                      href={item.href}
                      target={item.href.startsWith("http") ? "_blank" : undefined}
                      rel={
                        item.href.startsWith("http")
                          ? "noopener noreferrer"
                          : undefined
                      }
                      className="mt-1 block text-brand-950 transition-colors duration-300 hover:text-brand-500"
                    >
                      {item.value}
                    </a>
                  ) : (
                    <p className="mt-1 text-brand-950">{item.value}</p>
                  )}
                </div>
              </li>
            ))}
          </ul>

          <div className="mt-8 rounded-2xl border border-brand-200 bg-brand-50 p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-brand-700">
              Tezkor aloqa
            </p>
            <p className="mt-2 text-sm leading-relaxed text-brand-700">
              Eng tez javob Telegram orqali — ish vaqtida 10 daqiqa ichida
              yozamiz.
            </p>
            <BuyButton label="Telegramga o'tish" className="mt-5" size="md" />
          </div>
        </Reveal>

        {/* Forma */}
        <Reveal delay={0.1} className="lg:col-span-6 lg:col-start-7">
          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <Label htmlFor="name">Ismingiz</Label>
                <Input
                  id="name"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  required
                  placeholder="Masalan: Aziza"
                  className="mt-2"
                />
              </div>
              <div>
                <Label htmlFor="phone">Telefon raqamingiz</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={phone}
                  onChange={(event) => setPhone(event.target.value)}
                  required
                  placeholder="+998 90 000 00 00"
                  className="mt-2"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="message">Xabaringiz</Label>
              <Textarea
                id="message"
                value={message}
                onChange={(event) => setMessage(event.target.value)}
                required
                placeholder="Qaysi mahsulot qiziqtirayotganini yozing..."
                className="mt-2"
              />
            </div>
            <Button type="submit" size="lg" className="w-full sm:w-auto">
              Xabarni yuborish
            </Button>
            <p className="text-xs text-brand-600">
              Forma sizni Telegram orqali xabar yuborishga yo'naltiradi — hech
              qanday ma'lumot serverda saqlanmaydi.
            </p>
          </form>
        </Reveal>
      </div>

      {/* Ko'p so'raladigan savollar */}
      <div className="mt-24">
        <SectionHeading
          eyebrow="Savol-javob"
          title="Ko'p so'raladigan savollar"
          description="Buyurtma va yetkazib berish haqida eng ko'p so'raladigan savollarga qisqa javoblar."
          align="center"
        />
        <Reveal delay={0.1} className="mx-auto flex max-w-3xl flex-col gap-4">
          {FAQS.map((faq) => (
            <FaqItem key={faq.q} q={faq.q} a={faq.a} />
          ))}
        </Reveal>
      </div>
    </section>
  );
}

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  const panelId = useId();

  return (
    <div className="overflow-hidden rounded-2xl border border-brand-200 bg-white transition-shadow duration-300 hover:shadow-soft">
      <button
        type="button"
        onClick={() => setOpen((current) => !current)}
        aria-expanded={open}
        aria-controls={panelId}
        className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left transition-colors duration-300 hover:bg-brand-50"
      >
        <span className="font-display text-lg text-brand-950 sm:text-xl">
          {q}
        </span>
        <motion.span
          animate={{ rotate: open ? 45 : 0 }}
          transition={{ duration: 0.3, ease: EASE }}
          className="flex size-8 shrink-0 items-center justify-center rounded-full border border-brand-200 text-brand-500"
        >
          <Plus className="size-4" />
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={panelId}
            role="region"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: EASE }}
          >
            <p className="px-6 pb-6 text-sm leading-relaxed text-brand-700">
              {a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
