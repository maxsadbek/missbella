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
      <span className="relative grid h-10 w-10 shrink-0 place-items-center transition-transform duration-300 group-hover:scale-105">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/logo.png"
          alt="20-maktab logosi"
          width={40}
          height={40}
          className="h-full w-full object-contain drop-shadow-[0_6px_16px_rgba(0,102,255,0.35)]"
        />
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
