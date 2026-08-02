import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

import { Reveal } from "./Reveal";

interface SectionHeadingProps {
  eyebrow: string;
  title: ReactNode;
  description?: string;
  action?: ReactNode;
  align?: "left" | "center";
  className?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  action,
  align = "left",
  className,
}: SectionHeadingProps) {
  return (
    <Reveal
      className={cn(
        "mb-14 flex flex-wrap items-end justify-between gap-8",
        align === "center" && "flex-col items-center text-center",
        className
      )}
    >
      <div className={cn("max-w-2xl", align === "center" && "mx-auto")}>
        <p
          className={cn(
            "flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.35em] text-brand-500",
            align === "center" && "justify-center"
          )}
        >
          <span className="h-px w-10 bg-brand-500" aria-hidden />
          {eyebrow}
        </p>
        <h2 className="mt-5 font-display text-4xl leading-[1.1] tracking-wide text-balance text-brand-950 md:text-5xl">
          {title}
        </h2>
        {description && (
          <p className="mt-5 text-base leading-relaxed text-brand-700">
            {description}
          </p>
        )}
      </div>
      {action && (
        <div className="shrink-0 border-t border-brand-200 pt-4">{action}</div>
      )}
    </Reveal>
  );
}
