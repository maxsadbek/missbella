import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Menu } from "lucide-react";

import { TELEGRAM_LINK } from "@/config";
import { cn } from "@/lib/utils";

import { MobileMenu } from "./MobileMenu";
import { NAV_LINKS } from "./nav";

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  // Sahifa o'zgarganda mobil menyuni yopish
  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname, location.search]);

  return (
    <header className="sticky top-0 z-40 border-b border-brand-100 bg-white/95 backdrop-blur">
      {/* Yuqori qizil tasma */}
      <div className="bg-brand-500">
        <p className="mx-auto max-w-7xl px-6 py-2 text-center text-[10px] font-semibold uppercase tracking-[0.3em] text-white">
          Telegram orqali buyurtma bering — Toshkent bo'ylab bepul yetkazib
          berish
        </p>
      </div>

      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
        <Link
          to="/"
          className="font-display text-2xl tracking-[0.08em] text-brand-950 transition-colors duration-300 hover:text-brand-500"
        >
          Miss<span className="text-brand-500">Bella</span>
        </Link>

        <nav
          className="hidden items-center gap-10 lg:flex"
          aria-label="Asosiy navigatsiya"
        >
          {NAV_LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === "/"}
              className={({ isActive }) =>
                cn(
                  "relative pb-1 text-xs font-semibold uppercase tracking-[0.2em] transition-colors duration-300 after:absolute after:inset-x-0 after:bottom-0 after:h-px after:bg-brand-500 after:transition-all after:duration-300",
                  isActive
                    ? "text-brand-500 after:w-full"
                    : "text-brand-950 after:w-0 hover:text-brand-500 hover:after:w-full"
                )
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden lg:block">
          <a
            href={TELEGRAM_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex border border-brand-500 px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.2em] text-brand-500 transition-colors duration-300 hover:bg-brand-500 hover:text-white"
          >
            Buyurtma berish
          </a>
        </div>

        <button
          type="button"
          aria-label="Menyuni ochish"
          onClick={() => setMenuOpen(true)}
          className="flex size-11 items-center justify-center border border-brand-100 text-brand-950 transition-colors duration-300 hover:border-brand-500 hover:text-brand-500 lg:hidden"
        >
          <Menu className="size-5" />
        </button>
      </div>

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </header>
  );
}
