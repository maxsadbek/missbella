import { ArrowUpRight } from "lucide-react";

import { TELEGRAM_LINK } from "@/config";
import { cn } from "@/lib/utils";

interface BuyButtonProps {
  label?: string;
  variant?: "solid" | "outline" | "white";
  size?: "md" | "lg";
  className?: string;
}

/**
 * «Sotib olish» tugmasi — har doim TELEGRAM_LINK ga yo'naltiradi.
 * (src/config.ts dagi TELEGRAM_LINK ni o'zgartirish kifoya.)
 */
export function BuyButton({
  label = "Sotib olish",
  variant = "solid",
  size = "lg",
  className,
}: BuyButtonProps) {
  return (
    <a
      href={TELEGRAM_LINK}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "group inline-flex items-center justify-center gap-2 border text-xs font-semibold uppercase tracking-[0.25em] transition-colors duration-300",
        size === "lg" ? "px-8 py-4" : "px-6 py-3",
        variant === "solid" &&
          "border-brand-500 bg-brand-500 text-white hover:border-brand-600 hover:bg-brand-600",
        variant === "outline" &&
          "border-brand-950 bg-transparent text-brand-950 hover:border-brand-500 hover:text-brand-500",
        variant === "white" &&
          "border-white bg-white text-brand-500 hover:border-brand-50 hover:bg-brand-50",
        className
      )}
    >
      {label}
      <ArrowUpRight className="size-4 transition-colors duration-300" />
    </a>
  );
}
