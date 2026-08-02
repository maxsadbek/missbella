import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";

import { buttonVariants } from "@/components/ui/button";
import { TELEGRAM_LINK } from "@/config";
import { cn } from "@/lib/utils";

import { MobileMenu } from "./MobileMenu";
import { NAV_LINKS } from "./nav";

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  // Sahifa o'zgarganda mobil menyuni yopish
  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname, location.search]);

  // Scroll'da navbar effekti — jimgina xiralashish va soya
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 transition-shadow duration-300",
        scrolled && "shadow-[0_12px_32px_-24px_rgb(69_10_10/0.4)]"
      )}
    >
      {/* Navbar (xiralashuvchi qatlam) — MobileMenu shu qatlamning SIBLING'i,
          aks holda backdrop-filter fixed pozitsiyaga ta'sir qiladi. */}
      <div
        className={cn(
          "relative z-50 bg-white transition-all duration-300",
          scrolled ? "bg-white/85 backdrop-blur-xl" : "bg-white/95 backdrop-blur"
        )}
      >
        {/* Yuqori qizil tasma — scroll'da jimgina yig'iladi */}
        <div
          className={cn(
            "overflow-hidden bg-brand-500 transition-all duration-300",
            scrolled ? "max-h-0" : "max-h-14"
          )}
        >
          <p className="px-4 py-2.5 text-center text-[9px] font-semibold uppercase tracking-[0.18em] text-white sm:text-[10px] sm:tracking-[0.3em]">
            Telegram orqali buyurtma bering — Toshkent bo'ylab bepul yetkazib
            berish
          </p>
        </div>

        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-4 px-5 sm:px-6">
          <Link
            to="/"
            className="font-display text-2xl tracking-[0.08em] text-brand-950 transition-colors duration-300 hover:text-brand-600"
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
                      ? "text-brand-600 after:w-full"
                      : "text-brand-950 after:w-0 hover:text-brand-600 hover:after:w-full"
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
              className={buttonVariants({ variant: "outline", size: "sm" })}
            >
              Buyurtma berish
            </a>
          </div>

          {/* Animatlangan hamburger — ochilganda X ga aylanadi */}
          <button
            type="button"
            aria-label={menuOpen ? "Menyuni yopish" : "Menyuni ochish"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
            className="flex size-11 items-center justify-center rounded-full border border-brand-200 text-brand-950 transition-colors duration-300 hover:border-brand-500 hover:text-brand-600 lg:hidden"
          >
            <span className="relative block size-5" aria-hidden>
              <span
                className={cn(
                  "absolute left-0 top-[2px] h-[2px] w-full rounded-full bg-current transition-all duration-300",
                  menuOpen && "top-1/2 -translate-y-1/2 rotate-45"
                )}
              />
              <span
                className={cn(
                  "absolute left-0 top-1/2 h-[2px] w-full -translate-y-1/2 rounded-full bg-current transition-all duration-300",
                  menuOpen && "opacity-0"
                )}
              />
              <span
                className={cn(
                  "absolute bottom-[2px] left-0 h-[2px] w-full rounded-full bg-current transition-all duration-300",
                  menuOpen && "bottom-1/2 translate-y-1/2 -rotate-45"
                )}
              />
            </span>
          </button>
        </div>
      </div>

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </header>
  );
}
