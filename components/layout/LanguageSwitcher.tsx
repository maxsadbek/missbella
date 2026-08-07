"use client";

import { useEffect, useRef, useState } from "react";
import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Check, ChevronDown, Globe } from "lucide-react";
import { cn } from "@/lib/utils";

const LOCALES = [
  { code: "uz", label: "O'zbek", short: "UZ" },
  { code: "ru", label: "Русский", short: "RU" },
  { code: "en", label: "English", short: "EN" },
];

export function LanguageSwitcher({
  align = "right",
  className,
}: {
  align?: "left" | "right";
  className?: string;
}) {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onDown = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, []);

  const current = LOCALES.find((l) => l.code === locale) ?? LOCALES[0];

  const switchTo = (code: string) => {
    setOpen(false);
    if (code === locale) return;
    document.documentElement.lang = code;
    router.replace(pathname, { locale: code });
  };

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className={cn(
          "flex h-10 items-center gap-1.5 rounded-[6px] border border-line px-3 text-ink-soft transition-all duration-300 hover:border-primary/50 hover:text-primary",
          className
        )}
        aria-label="Language"
      >
        <Globe className="h-4 w-4" />
        <span className="text-xs font-bold tracking-wider">{current.short}</span>
        <ChevronDown
          className={cn(
            "h-3 w-3 transition-transform duration-300",
            open && "rotate-180"
          )}
        />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.97 }}
            transition={{ duration: 0.18 }}
            className={cn(
              "absolute top-full z-[90] mt-2 w-44 overflow-hidden rounded-[6px] border border-line glass p-1 shadow-[0_20px_50px_-20px_rgba(2,6,18,0.5)]",
              align === "right" ? "right-0" : "left-0"
            )}
          >
            {LOCALES.map((l) => (
              <button
                key={l.code}
                type="button"
                onClick={() => switchTo(l.code)}
                className={cn(
                  "flex w-full items-center justify-between rounded-[4px] px-3 py-2.5 text-sm transition-colors duration-200",
                  l.code === locale
                    ? "bg-primary-soft font-semibold text-primary"
                    : "text-ink hover:bg-surface"
                )}
              >
                <span>{l.label}</span>
                {l.code === locale && <Check className="h-4 w-4" />}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
