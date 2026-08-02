import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { Link, NavLink } from "react-router-dom";

import { TELEGRAM_LINK } from "@/config";
import { cn } from "@/lib/utils";

import { NAV_LINKS } from "./nav";

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
}

export function MobileMenu({ open, onClose }: MobileMenuProps) {
  // Ochilganda fon scroll'ini bloklash va Escape bilan yopish
  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onClose();
      }
    }
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="fixed inset-0 z-50 flex flex-col bg-white lg:hidden"
        >
          <div className="flex h-20 items-center justify-between border-b border-brand-100 px-6">
            <Link
              to="/"
              className="font-display text-2xl tracking-[0.08em] text-brand-950"
            >
              Miss<span className="text-brand-500">Bella</span>
            </Link>
            <button
              type="button"
              aria-label="Menyuni yopish"
              onClick={onClose}
              className="flex size-11 items-center justify-center border border-brand-100 text-brand-950 transition-colors duration-300 hover:border-brand-500 hover:text-brand-500"
            >
              <X className="size-5" />
            </button>
          </div>

          <nav
            className="flex flex-1 flex-col justify-center px-6"
            aria-label="Mobil navigatsiya"
          >
            {NAV_LINKS.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === "/"}
                onClick={onClose}
                className={({ isActive }) =>
                  cn(
                    "border-b border-brand-100 py-5 font-display text-3xl tracking-wide transition-colors duration-300",
                    isActive
                      ? "text-brand-500"
                      : "text-brand-950 hover:text-brand-500"
                  )
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          <div className="border-t border-brand-100 px-6 py-8">
            <a
              href={TELEGRAM_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="flex w-full items-center justify-center gap-2 bg-brand-500 px-6 py-4 text-xs font-semibold uppercase tracking-[0.25em] text-white transition-colors duration-300 hover:bg-brand-600"
            >
              Buyurtma berish
            </a>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
