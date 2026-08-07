import { cn } from "@/lib/utils";
import { Reveal } from "./Reveal";

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "center",
  className,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "center" | "left";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "max-w-3xl",
        align === "center" ? "mx-auto text-center" : "text-left",
        className
      )}
    >
      {eyebrow && (
        <Reveal>
          <div
            className={cn(
              "mb-4 flex items-center gap-3",
              align === "center" && "justify-center"
            )}
          >
            <span className="h-px w-8 bg-primary/50" />
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-primary">
              {eyebrow}
            </span>
            <span className="h-px w-8 bg-primary/50" />
          </div>
        </Reveal>
      )}
      <Reveal delay={0.06}>
        <h2 className="font-display text-3xl font-bold leading-[1.15] tracking-tight text-ink sm:text-4xl lg:text-5xl">
          {title}
        </h2>
      </Reveal>
      {subtitle && (
        <Reveal delay={0.12}>
          <p className="mt-5 text-base leading-relaxed text-ink-soft sm:text-lg">
            {subtitle}
          </p>
        </Reveal>
      )}
    </div>
  );
}
