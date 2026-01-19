import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center justify-center rounded-full border w-fit whitespace-nowrap shrink-0 gap-1 [&>svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition-all duration-150 overflow-hidden",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground [a&]:hover:bg-primary/90",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground [a&]:hover:bg-secondary/90",
        destructive:
          "border-transparent bg-destructive text-white [a&]:hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline:
          "text-foreground [a&]:hover:bg-accent [a&]:hover:text-accent-foreground",
        "high-impact":
          "border-transparent bg-[oklch(0.95_0.04_262)] text-[oklch(0.42_0.20_262)] dark:bg-[oklch(0.25_0.06_262)] dark:text-[oklch(0.70_0.16_262)] font-medium",
        category:
          "border-transparent bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300",
        score:
          "border-transparent bg-primary text-primary-foreground font-semibold",
        "relevance-high":
          "border-transparent bg-gradient-to-r from-[oklch(0.60_0.12_75)] to-[oklch(0.58_0.14_65)] text-white shadow-sm [a&]:hover:shadow-md",
        "relevance-medium":
          "border-transparent bg-secondary text-secondary-foreground",
        "relevance-low":
          "border-transparent bg-muted text-muted-foreground opacity-80",
      },
      size: {
        xs: "px-1.5 py-0.5 text-[10px] font-semibold [&>svg]:size-2.5",
        sm: "px-2 py-0.5 text-xs font-medium [&>svg]:size-3",
        md: "px-2.5 py-1 text-sm font-medium [&>svg]:size-3.5",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "sm",
    },
  }
)

function Badge({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"span"> &
  VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "span"

  return (
    <Comp
      data-slot="badge"
      className={cn(badgeVariants({ variant, size }), className)}
      {...props}
    />
  )
}

export { Badge, badgeVariants }
