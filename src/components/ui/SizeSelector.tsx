import { cn } from "@/lib/utils";

interface SizeSelectorProps {
  sizes: string[];
  value: string | undefined;
  onChange: (size: string) => void;
}

export function SizeSelector({ sizes, value, onChange }: SizeSelectorProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {sizes.map((size) => (
        <button
          key={size}
          type="button"
          aria-pressed={value === size}
          onClick={() => onChange(size)}
          className={cn(
            "min-w-12 border px-4 py-2.5 text-sm font-semibold uppercase tracking-[0.15em] transition-colors duration-300",
            value === size
              ? "border-brand-500 bg-brand-500 text-white"
              : "border-brand-200 text-brand-950 hover:border-brand-500 hover:text-brand-500"
          )}
        >
          {size}
        </button>
      ))}
    </div>
  );
}
