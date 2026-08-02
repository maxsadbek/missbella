import { ArrowUpRight } from "lucide-react";

import { TELEGRAM_LINK } from "@/config";
import { cn } from "@/lib/utils";

import { buttonVariants } from "./button";

interface BuyButtonProps {
  label?: string;
  variant?: "solid" | "outline" | "white";
  size?: "md" | "lg";
  className?: string;
}

/** BuyButton variantlarini umumiy button sistemasi variantlariga moslash. */
const VARIANT_MAP = {
  solid: "default",
  outline: "outline",
  white: "white",
} as const;

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
        buttonVariants({
          variant: VARIANT_MAP[variant],
          size: size === "lg" ? "lg" : "default",
        }),
        "group",
        className
      )}
    >
      {label}
      <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
    </a>
  );
}
