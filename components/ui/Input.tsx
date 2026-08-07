"use client";

import { forwardRef, type InputHTMLAttributes } from "react";
import { AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  labelClassName?: string;
  error?: string;
  hint?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  function Input({ label, labelClassName, error, hint, className, id, ...props }, ref) {
    const inputId = id ?? props.name;
    return (
      <div className="space-y-2">
        {label && (
          <label
            htmlFor={inputId}
            className={cn("block text-sm font-semibold text-ink", labelClassName)}
          >
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          className={cn(
            "h-11 w-full rounded-[6px] border bg-surface px-4 text-sm text-ink outline-none transition-all duration-300 placeholder:text-ink-soft/50",
            error
              ? "border-primary/70 focus:border-primary focus:ring-2 focus:ring-primary/25"
              : "border-line hover:border-ink-soft/50 focus:border-primary focus:ring-2 focus:ring-primary/20",
            className
          )}
          {...props}
        />
        {error ? (
          <p className="flex items-center gap-1.5 text-xs font-medium text-primary-bright">
            <AlertCircle className="h-3.5 w-3.5 shrink-0" />
            {error}
          </p>
        ) : hint ? (
          <p className="text-xs text-ink-soft">{hint}</p>
        ) : null}
      </div>
    );
  }
);
