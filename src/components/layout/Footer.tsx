import { Clock, MapPin, Phone, Send } from "lucide-react";
import { Link } from "react-router-dom";

import { InstagramIcon } from "@/components/ui/InstagramIcon";
import { SITE } from "@/config";
import { CATEGORIES } from "@/data/products";

import { NAV_LINKS } from "./nav";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-brand-100 bg-white">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-6 py-16 md:grid-cols-2 lg:grid-cols-4">
        {/* Brend */}
        <div>
          <p className="font-display text-2xl tracking-[0.08em] text-brand-950">
            Miss<span className="text-brand-500">Bella</span>
          </p>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-brand-700">
            {SITE.tagline}. Har bir ayolning o'z uslubini topishi uchun tanlangan
            premium kiyimlar.
          </p>
          <div className="mt-6 flex gap-3">
            <a
              href={SITE.telegramLink}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Telegram"
              className="flex size-11 items-center justify-center border border-brand-200 text-brand-950 transition-colors duration-300 hover:border-brand-500 hover:text-brand-500"
            >
              <Send className="size-4" />
            </a>
            <a
              href={SITE.instagramLink}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="flex size-11 items-center justify-center border border-brand-200 text-brand-950 transition-colors duration-300 hover:border-brand-500 hover:text-brand-500"
            >
              <InstagramIcon className="size-4" />
            </a>
          </div>
        </div>

        {/* Navigatsiya */}
        <div>
          <h3 className="text-xs font-semibold uppercase tracking-[0.3em] text-brand-500">
            Navigatsiya
          </h3>
          <ul className="mt-5 space-y-3">
            {NAV_LINKS.map((link) => (
              <li key={link.to}>
                <Link
                  to={link.to}
                  className="text-sm text-brand-700 transition-colors duration-300 hover:text-brand-500"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Kategoriyalar */}
        <div>
          <h3 className="text-xs font-semibold uppercase tracking-[0.3em] text-brand-500">
            Kategoriyalar
          </h3>
          <ul className="mt-5 space-y-3">
            {CATEGORIES.map((category) => (
              <li key={category.id}>
                <Link
                  to={`/catalog?category=${category.id}`}
                  className="text-sm text-brand-700 transition-colors duration-300 hover:text-brand-500"
                >
                  {category.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Aloqa */}
        <div>
          <h3 className="text-xs font-semibold uppercase tracking-[0.3em] text-brand-500">
            Aloqa
          </h3>
          <ul className="mt-5 space-y-4 text-sm text-brand-700">
            <li className="flex gap-3">
              <MapPin className="mt-0.5 size-4 shrink-0 text-brand-500" />
              {SITE.address}
            </li>
            <li className="flex gap-3">
              <Phone className="mt-0.5 size-4 shrink-0 text-brand-500" />
              <a
                href={SITE.phoneHref}
                className="transition-colors duration-300 hover:text-brand-500"
              >
                {SITE.phone}
              </a>
            </li>
            <li className="flex gap-3">
              <Clock className="mt-0.5 size-4 shrink-0 text-brand-500" />
              {SITE.workHours}
            </li>
            <li className="flex gap-3">
              <Send className="mt-0.5 size-4 shrink-0 text-brand-500" />
              <a
                href={SITE.telegramLink}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors duration-300 hover:text-brand-500"
              >
                @{SITE.telegramHandle}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-brand-100">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-6 py-6 text-[11px] uppercase tracking-[0.2em] text-brand-600 md:flex-row">
          <p>© {year} MissBella. Barcha huquqlar himoyalangan.</p>
          <p>Demo do'kon — buyurtmalar Telegram orqali qabul qilinadi</p>
        </div>
      </div>
    </footer>
  );
}
