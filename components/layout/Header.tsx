"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { useMotionValueEvent, useScroll, motion } from "framer-motion";
import { LogOut, Menu } from "lucide-react";
import { Link, usePathname } from "@/i18n/navigation";
import { buttonStyles } from "@/components/ui/Button";
import { useAuth } from "@/components/auth/AuthProvider";
import { cn } from "@/lib/utils";
import { Logo } from "./Logo";
import { ThemeToggle } from "./ThemeToggle";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { MobileMenu } from "./MobileMenu";

export function Header() {
  const t = useTranslations("nav");
  const auth = useTranslations("auth");
  const pathname = usePathname();
  const { scrollY } = useScroll();
  const { user, logout } = useAuth();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useMotionValueEvent(scrollY, "change", (y) => setScrolled(y > 32));

  const links = [
    { href: "/", label: t("home") },
    { href: "/about", label: t("about") },
    { href: "/news", label: t("news") },
    { href: "/teachers", label: t("teachers") },
    { href: "/gallery", label: t("gallery") },
  ];

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(href + "/");

  const firstName = user?.name?.split(" ")[0] ?? "";

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-[100] transition-all duration-500",
          scrolled
            ? "glass border-b border-line shadow-[0_12px_40px_-24px_rgba(2,6,18,0.4)]"
            : "bg-transparent"
        )}
      >
        <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between gap-4 px-5 lg:px-8">
          <Logo light={!scrolled} />

          <nav className="hidden items-center gap-0.5 lg:flex">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className={cn(
                  "relative rounded-[6px] px-4 py-2 text-sm font-semibold transition-colors duration-300",
                  isActive(l.href)
                    ? "text-primary"
                    : scrolled
                      ? "text-ink-soft hover:text-primary"
                      : "text-white/80 hover:text-white"
                )}
              >
                {l.label}
                {isActive(l.href) && (
                  <motion.span
                    layoutId="nav-active"
                    className="absolute inset-x-3 -bottom-0.5 h-0.5 rounded-full bg-primary"
                  />
                )}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2.5">
            {scrolled ? (
              <>
                <ThemeToggle />
                <LanguageSwitcher />
              </>
            ) : (
              <>
                <ThemeToggle className="border-white/20 text-white/90 hover:border-white/50 hover:text-white" />
                <LanguageSwitcher className="border-white/20 text-white/90 hover:border-white/50 hover:text-white" />
              </>
            )}

            {user ? (
              <div className="hidden items-center gap-1 rounded-[6px] border border-line py-1 pl-1.5 pr-1.5 md:flex">
                <span className="grid h-7 w-7 place-items-center rounded-[4px] bg-gradient-to-br from-primary-bright to-primary text-[11px] font-extrabold text-white">
                  {firstName.charAt(0).toUpperCase()}
                </span>
                <span className={cn("max-w-28 truncate px-1.5 text-sm font-semibold", scrolled ? "text-ink" : "text-white")}>
                  {firstName}
                </span>
                <button
                  type="button"
                  onClick={() => void logout()}
                  aria-label={t("logout")}
                  title={t("logout")}
                  className={cn(
                    "grid h-7 w-7 place-items-center rounded-[4px] transition-colors",
                    scrolled ? "text-ink-soft hover:bg-surface hover:text-primary" : "text-white/70 hover:bg-white/10 hover:text-white"
                  )}
                >
                  <LogOut className="h-4 w-4" />
                </button>
              </div>
            ) : (
              <Link
                href="/login"
                className={cn(
                  buttonStyles(
                    scrolled ? "outline" : "glass",
                    "sm",
                    "hidden md:inline-flex"
                  )
                )}
              >
                {auth("loginBtn")}
              </Link>
            )}

            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-label={t("menu")}
              className={cn(
                "grid h-10 w-10 place-items-center rounded-[6px] border transition-colors duration-300 lg:hidden",
                scrolled
                  ? "border-line text-ink"
                  : "border-white/20 text-white"
              )}
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>
      </header>
      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}
