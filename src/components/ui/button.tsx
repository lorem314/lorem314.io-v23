import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  cn(
    "inline-flex items-center",
    "whitespace-nowrap",
    "rounded",
    "transition-colors",
    "cursor-pointer select-none",
    "[&:has(>[data-slot=icon]:only-child)]:aspect-square",
  ),
  {
    variants: {
      variant: {
        default: "bg-sky-500 text-white hover:bg-sky-600 active:bg-sky-700",
        glass: cn(
          "bg-black/10 hover:bg-black/20 active:bg-black/30",
          "dark:bg-white/10 dark:hover:bg-white/20 dark:active:bg-white/30",
        ),
        goast: cn(
          "bg-transparent opacity-38 hover:opacity-60 active:opacity-87",
        ),
        misc: cn(
          "rounded p-2 transition-colors",
          "text-misc-button-icon-color",
          "bg-misc-button-bg hover:bg-misc-button-hover-bg",
          "active:text-misc-button-active-color active:bg-misc-button-active-bg",
        ),
      },
      size: {
        small: cn(
          "rounded-sm px-1.5 py-1 text-sm",
          "[&:has(>[data-slot=icon]:only-child)]:p-1.5",
          "[&:has(>[data-slot=icon]:only-child)]:[&>[data-slot=icon]]:size-4",
        ),
        medium: cn(
          "rounded-md px-2.5 py-2 text-base",
          "[&:has(>[data-slot=icon]:only-child)]:p-2",
          "[&:has(>[data-slot=icon]:only-child)]:[&>[data-slot=icon]]:size-5",
        ),
        large: cn(
          "rounded-lg px-3.5 py-3 text-lg",
          "[&:has(>[data-slot=icon]:only-child)]:p-2.5",
          "[&:has(>[data-slot=icon]:only-child)]:[&>[data-slot=icon]]:size-6",
        ),
      },
    },
    defaultVariants: {
      variant: "default",
      size: "medium",
    },
    compoundVariants: [
      {
        variant: "goast",
        // size: ["small", "medium", "large"],
        className: "[&:has(>[data-slot=icon]:only-child)]:p-0",
      },
    ],
  },
)

type ButtonProps = React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & { asChild?: boolean }

function Button({
  variant,
  size,
  className,
  asChild = false,
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot : "button"

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    />
  )
}

export { Button, buttonVariants }
