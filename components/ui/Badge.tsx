import { cn } from "@/lib/utils";

export function Badge({
  children,
  className,
  tone = "soft",
}: {
  children: React.ReactNode;
  className?: string;
  tone?: "soft" | "solid" | "outline";
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-[0.12em]",
        tone === "soft" && "bg-primary-soft text-primary dark:bg-primary-soft/70 dark:text-primary-bright",
        tone === "solid" && "bg-primary text-white",
        tone === "outline" && "border border-primary/40 text-primary",
        className
      )}
    >
      {children}
    </span>
  );
}
