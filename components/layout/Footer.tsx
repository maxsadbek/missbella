import { useTranslations } from "next-intl";
import { AtSign, Clock, Heart, Mail, MapPin, Phone, Send } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { Logo } from "./Logo";

export function Footer() {
  const t = useTranslations("footer");
  const nav = useTranslations("nav");

  const links = [
    { href: "/", label: nav("home") },
    { href: "/about", label: nav("about") },
    { href: "/news", label: nav("news") },
    { href: "/teachers", label: nav("teachers") },
    { href: "/gallery", label: nav("gallery") },
  ];

  const socials = [
    { href: "https://t.me", icon: Send, label: "Telegram" },
    { href: "https://instagram.com", icon: AtSign, label: "Instagram" },
  ];

  return (
    <footer className="relative overflow-hidden bg-navy-deep text-white">
      <div className="pointer-events-none absolute inset-0 bg-grid-dark opacity-50" />
      <div className="hairline-gradient absolute inset-x-0 top-0" />

      <div className="relative mx-auto max-w-7xl px-5 pb-10 pt-16 lg:px-8 lg:pt-20">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Logo light />
            <p className="mt-6 max-w-md text-sm leading-relaxed text-white/55">
              {t("blurb")}
            </p>
            <div className="mt-7 flex gap-3">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={s.label}
                  className="grid h-10 w-10 place-items-center rounded-[6px] border border-white/15 text-white/70 transition-all duration-300 hover:-translate-y-0.5 hover:border-primary-bright hover:text-primary-bright"
                >
                  <s.icon className="h-[18px] w-[18px]" />
                </a>
              ))}
            </div>
          </div>

          <div className="lg:col-span-3">
            <h3 className="text-xs font-bold uppercase tracking-[0.25em] text-white/40">
              {t("linksTitle")}
            </h3>
            <ul className="mt-6 space-y-3.5">
              {links.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="group inline-flex items-center gap-2.5 text-sm text-white/70 transition-colors duration-300 hover:text-primary-bright"
                  >
                    <span className="h-px w-4 bg-primary/40 transition-all duration-300 group-hover:w-7 group-hover:bg-primary-bright" />
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-4">
            <h3 className="text-xs font-bold uppercase tracking-[0.25em] text-white/40">
              {t("infoTitle")}
            </h3>
            <ul className="mt-6 space-y-4 text-sm text-white/70">
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary-bright" />
                {t("address")}
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-4 w-4 shrink-0 text-primary-bright" />
                {t("phone")}
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-4 w-4 shrink-0 text-primary-bright" />
                {t("email")}
              </li>
              <li className="flex items-start gap-3">
                <Clock className="mt-0.5 h-4 w-4 shrink-0 text-primary-bright" />
                {t("hours")}
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 text-xs text-white/40 sm:flex-row">
          <p>© 2026 20-MAKTAB. {t("rights")}</p>
          <p className="flex items-center gap-1.5">
            {t("madeWith")}
            <Heart className="h-3.5 w-3.5 fill-primary text-primary" />
          </p>
        </div>
      </div>
    </footer>
  );
}
