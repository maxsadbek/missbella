import { cn } from "@/lib/utils";

interface SizeSelectorProps {
  sizes: string[];
  value: string | undefined;
  onChange: (size: string) => void;
}

export function SizeSelector({ sizes, value, onChange }: SizeSelectorProps) {
  return (
    <div className="flex flex-wrap gap-2.5">
      {sizes.map((size) => (
        <button
          key={size}
          type="button"
          aria-pressed={value === size}
          onClick={() => onChange(size)}
          className={cn(
            "min-w-12 rounded-full border px-4 py-2.5 text-sm font-semibold uppercase tracking-[0.15em] transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0",
            value === size
              ? "border-brand-500 bg-brand-500 text-white shadow-soft"
              : "border-brand-200 text-brand-900 hover:border-brand-500 hover:text-brand-500"
          )}
        >
          {size}
        </button>
      ))}
    </div>
  );
}
