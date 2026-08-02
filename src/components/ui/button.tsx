import { Button as ButtonPrimitive } from "@base-ui/react/button"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "group/button inline-flex shrink-0 items-center justify-center gap-2 rounded-2xl border text-xs font-semibold tracking-[0.15em] uppercase whitespace-nowrap transition-all duration-300 outline-none select-none sm:tracking-[0.2em] focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/40 disabled:pointer-events-none disabled:opacity-50 disabled:hover:translate-y-0 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default:
          "border-brand-500 bg-brand-500 text-white hover:-translate-y-0.5 hover:border-brand-600 hover:bg-brand-600 hover:shadow-soft active:translate-y-0 active:shadow-none",
        outline:
          "border-brand-500 bg-white text-brand-500 hover:-translate-y-0.5 hover:border-brand-500 hover:bg-brand-500 hover:text-white hover:shadow-soft active:translate-y-0 active:shadow-none",
        secondary:
          "border-transparent bg-brand-50 text-brand-600 hover:-translate-y-0.5 hover:bg-brand-100 hover:text-brand-700 active:translate-y-0",
        ghost: "border-transparent bg-transparent text-brand-950 hover:bg-brand-50 hover:text-brand-600",
        destructive:
          "border-transparent bg-brand-500/10 text-brand-500 hover:-translate-y-0.5 hover:bg-brand-500/20 active:translate-y-0",
        link: "border-transparent bg-transparent text-brand-500 underline-offset-4 hover:underline",
        white:
          "border-white bg-white text-brand-500 hover:-translate-y-0.5 hover:border-brand-50 hover:bg-brand-50 hover:shadow-soft active:translate-y-0 active:shadow-none",
      },
      size: {
        default: "h-11 gap-2 px-5 sm:px-6",
        sm: "h-9 gap-1.5 px-4 text-[11px]",
        lg: "h-12 gap-2 px-6 sm:px-8",
        icon: "size-11",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant = "default",
  size = "default",
  ...props
}: ButtonPrimitive.Props & VariantProps<typeof buttonVariants>) {
  return (
    <ButtonPrimitive
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
