import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Send } from "lucide-react";
import { NavLink } from "react-router-dom";

import { InstagramIcon } from "@/components/ui/InstagramIcon";
import { buttonVariants } from "@/components/ui/button";
import { SITE, TELEGRAM_LINK } from "@/config";
import { EASE } from "@/lib/animations";
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
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          transition={{ duration: 0.5, ease: EASE }}
          role="dialog"
          aria-modal="true"
          aria-label="Mobil menyu"
          className="fixed inset-0 z-40 bg-white/90 backdrop-blur-2xl lg:hidden"
        >
          <div className="flex h-full flex-col overflow-y-auto px-6 pb-10 pt-28 sm:px-10">
            <p className="text-[10px] font-semibold uppercase tracking-[0.35em] text-brand-500">
              Menyu
            </p>

            <nav className="mt-4 flex flex-col" aria-label="Mobil navigatsiya">
              {NAV_LINKS.map((link, index) => (
                <motion.div
                  key={link.to}
                  initial={{ opacity: 0, y: 28 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.5,
                    ease: EASE,
                    delay: 0.08 + index * 0.07,
                  }}
                >
                  <NavLink
                    to={link.to}
                    end={link.to === "/"}
                    onClick={onClose}
                    className={({ isActive }) =>
                      cn(
                        "group flex items-center justify-between gap-4 border-b border-brand-200 py-5 transition-colors duration-300",
                        isActive
                          ? "text-brand-500"
                          : "text-brand-950 hover:text-brand-500"
                      )
                    }
                  >
                    {({ isActive }) => (
                      <>
                        <span className="font-display text-3xl leading-none tracking-wide sm:text-4xl">
                          {link.label}
                        </span>
                        <span className="flex shrink-0 items-center gap-3">
                          {isActive && (
                            <span
                              className="h-px w-6 bg-brand-500"
                              aria-hidden
                            />
                          )}
                          <ArrowUpRight
                            className={cn(
                              "size-5 transition-all duration-300",
                              isActive
                                ? "opacity-100"
                                : "opacity-30 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100"
                            )}
                          />
                        </span>
                      </>
                    )}
                  </NavLink>
                </motion.div>
              ))}
            </nav>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.5,
                ease: EASE,
                delay: 0.08 + NAV_LINKS.length * 0.07,
              }}
              className="mt-auto pt-12"
            >
              <a
                href={TELEGRAM_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  buttonVariants({ variant: "default", size: "lg" }),
                  "w-full"
                )}
              >
                Buyurtma berish
                <ArrowUpRight className="size-4" />
              </a>

              <div className="mt-8 flex items-center justify-between gap-4">
                <p className="text-[10px] uppercase tracking-[0.25em] text-brand-600">
                  @{SITE.telegramHandle}
                </p>
                <div className="flex gap-3">
                  <a
                    href={SITE.telegramLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Telegram"
                    className="flex size-11 items-center justify-center rounded-full border border-brand-200 text-brand-950 transition-all duration-300 hover:-translate-y-0.5 hover:border-brand-500 hover:text-brand-500"
                  >
                    <Send className="size-4" />
                  </a>
                  <a
                    href={SITE.instagramLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Instagram"
                    className="flex size-11 items-center justify-center rounded-full border border-brand-200 text-brand-950 transition-all duration-300 hover:-translate-y-0.5 hover:border-brand-500 hover:text-brand-500"
                  >
                    <InstagramIcon className="size-4" />
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
