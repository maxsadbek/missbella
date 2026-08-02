import { Button as ButtonPrimitive } from "@base-ui/react/button"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "group/button inline-flex shrink-0 items-center justify-center rounded-none border border-transparent bg-clip-padding text-xs font-semibold tracking-[0.2em] uppercase whitespace-nowrap transition-colors duration-300 outline-none select-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-brand-600",
        outline:
          "border-brand-200 bg-background text-brand-950 hover:border-brand-500 hover:text-brand-500",
        secondary: "bg-secondary text-secondary-foreground hover:bg-brand-100",
        ghost: "hover:bg-brand-50 hover:text-brand-700",
        destructive: "bg-brand-500/10 text-brand-500 hover:bg-brand-500/20",
        link: "text-brand-500 underline-offset-4 hover:underline",
      },
      size: {
        default: "h-11 gap-2 px-6",
        sm: "h-9 gap-1.5 px-4 text-[11px]",
        lg: "h-12 gap-2 px-8",
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
