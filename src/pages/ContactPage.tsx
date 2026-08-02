import { useState, type FormEvent } from "react";
import { Clock, MapPin, Phone, Send } from "lucide-react";

import { BuyButton } from "@/components/ui/BuyButton";
import { InstagramIcon } from "@/components/ui/InstagramIcon";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { SITE, TELEGRAM_LINK } from "@/config";
import { usePageMeta } from "@/hooks/usePageMeta";

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
    <section className="mx-auto max-w-7xl px-6 py-20 md:py-24">
      <p className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.35em] text-brand-500">
        <span className="h-px w-10 bg-brand-500" aria-hidden />
        Aloqa
      </p>
      <h1 className="mt-5 font-display text-5xl leading-[1.05] tracking-wide text-brand-950 md:text-6xl">
        Bog'lanish
      </h1>
      <p className="mt-6 max-w-xl text-base leading-relaxed text-brand-700">
        Savolingiz bormi? Telegram orqali eng tez javob olasiz — yoki quyidagi
        forma orqali xabar qoldiring, biz Telegram'da qaytamiz.
      </p>

      <div className="mt-14 grid grid-cols-1 gap-16 lg:grid-cols-12">
        {/* Aloqa ma'lumotlari */}
        <div className="lg:col-span-5">
          <ul className="divide-y divide-brand-100 border-y border-brand-100">
            {CONTACT_ITEMS.map((item) => (
              <li key={item.label} className="flex items-center gap-5 py-5">
                <span className="flex size-11 shrink-0 items-center justify-center border border-brand-200 text-brand-500">
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

          <div className="mt-8 border border-brand-500 bg-brand-50 p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-brand-700">
              Tezkor aloqa
            </p>
            <p className="mt-2 text-sm leading-relaxed text-brand-700">
              Eng tez javob Telegram orqali — ish vaqtida 10 daqiqa ichida
              yozamiz.
            </p>
            <BuyButton
              label="Telegramga o'tish"
              className="mt-5"
              size="md"
            />
          </div>
        </div>

        {/* Forma */}
        <div className="lg:col-span-6 lg:col-start-7">
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
            <Button
              type="submit"
              size="lg"
              className="w-full sm:w-auto"
            >
              Xabarni yuborish — Telegram orqali
            </Button>
            <p className="text-xs text-brand-600">
              Forma sizni Telegram orqali xabar yuborishga yo'naltiradi — hech
              qanday ma'lumot serverda saqlanmaydi.
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}
