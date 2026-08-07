"use client";

import { useTranslations } from "next-intl";
import { AnimatePresence, motion } from "framer-motion";
import { LogOut, X } from "lucide-react";
import { Link, usePathname } from "@/i18n/navigation";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { ThemeToggle } from "./ThemeToggle";
import { Logo } from "./Logo";
import { useAuth } from "@/components/auth/AuthProvider";
import { cn } from "@/lib/utils";

export function MobileMenu({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const t = useTranslations("nav");
  const pathname = usePathname();
  const { user, logout } = useAuth();

  const links = [
    { href: "/", label: t("home") },
    { href: "/about", label: t("about") },
    { href: "/news", label: t("news") },
    { href: "/teachers", label: t("teachers") },
    { href: "/gallery", label: t("gallery") },
  ];

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(href + "/");

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[130] bg-black/50 backdrop-blur-sm"
            onClick={onClose}
          />
          
          {/* Menu Panel */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 z-[131] flex h-full w-[70%] flex-col bg-navy-deep shadow-2xl"
          >
            <div className="flex h-[72px] items-center justify-between px-5 border-b border-white/10">
              <Logo light />
              <button
                type="button"
                onClick={onClose}
                aria-label="Close menu"
                className="grid h-10 w-10 place-items-center rounded-[6px] border border-white/15 text-white transition-colors hover:border-white/40"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <nav className="flex flex-1 flex-col justify-center gap-1 px-6">
              {links.map((l, i) => (
                <motion.div
                  key={l.href}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * i + 0.1, duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                >
                  <Link
                    href={l.href}
                    onClick={onClose}
                    className={cn(
                      "block border-b border-white/8 py-3 font-display text-lg font-medium transition-colors duration-300",
                      isActive(l.href) ? "text-primary-bright" : "text-white/90 hover:text-primary-bright"
                    )}
                  >
                    {l.label}
                  </Link>
                </motion.div>
              ))}
            </nav>

            <div className="flex items-center justify-between gap-4 px-6 pb-8 border-t border-white/10 pt-6">
              <div className="flex items-center gap-2">
                <LanguageSwitcher
                  align="left"
                  className="border-white/20 text-white/80 hover:border-primary-bright hover:text-white"
                />
                <ThemeToggle className="border-white/20 text-white hover:border-primary-bright hover:text-white" />
              </div>
              {user ? (
                <button
                  type="button"
                  onClick={() => {
                    void logout();
                    onClose();
                  }}
                  className="flex items-center gap-2 rounded-[6px] border border-white/15 px-3 py-2 text-xs font-semibold text-white/80 transition-colors hover:border-white/40 hover:text-white"
                >
                  <LogOut className="h-3.5 w-3.5" />
                  {t("logout")}
                </button>
              ) : (
                <Link
                  href="/login"
                  onClick={onClose}
                  className="rounded-[6px] bg-primary px-4 py-2 text-xs font-bold text-white shadow-[0_8px_20px_-8px_rgba(0,102,255,0.7)]"
                >
                  {t("login")}
                </Link>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
