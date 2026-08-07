import { cn } from "@/lib/utils";
import { Link } from "@/i18n/navigation";

export function Logo({
  className,
  light = false,
}: {
  className?: string;
  light?: boolean;
}) {
  return (
    <Link
      href="/"
      className={cn("group flex items-center gap-3", className)}
      aria-label="20-maktab"
    >
      <span className="relative grid h-10 w-10 place-items-center overflow-hidden rounded-[6px] bg-gradient-to-br from-[#0A84FF] to-[#0066FF] font-display text-lg font-extrabold text-white shadow-[0_8px_24px_-8px_rgba(0,102,255,0.8)] transition-transform duration-300 group-hover:scale-105">
        <span className="absolute inset-0 bg-gradient-to-t from-black/25 to-transparent" />
        20
      </span>
      <span className="hidden flex-col leading-none sm:flex">
        <span
          className={cn(
            "font-display text-sm font-bold tracking-[0.08em]",
            light ? "text-white" : "text-ink"
          )}
        >
          20-MAKTAB
        </span>
        <span
          className={cn(
            "mt-1 text-[10px] font-semibold uppercase tracking-[0.28em]",
            light ? "text-white/60" : "text-ink-soft"
          )}
        >
          School No. 20
        </span>
      </span>
    </Link>
  );
}
