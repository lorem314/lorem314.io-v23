import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const inputVariants = cva(
  cn(
    "w-full px-2.5 py-1.5 leading-7",
    "border transition-colors",
    "border-gray-400 hover:border-gray-500",
    "dark:border-gray-500 dark:hover:border-gray-400",
    "dark:bg-bg-0 bg-transparent",
    "focus-within:outline-1 focus:outline-1",
    "focus:border-sky-600 dark:focus:border-sky-400",
    "focus-within:border-sky-600 dark:focus-within:border-sky-400",
    "focus:outline-sky-600 dark:focus:outline-sky-400",
    "focus-within:outline-sky-600 dark:focus-within:outline-sky-400",
  ),
  {
    variants: {
      variant: {
        default: "rounded",
        goast: "border-none focus:outline-0 focus-within:outline-0",
      },
    },
    defaultVariants: {
      variant: "default",
    },
    compoundVariants: [],
  },
)

type InputProps = React.ComponentProps<"input"> &
  VariantProps<typeof inputVariants>

function Input({ variant, className, ...props }: InputProps) {
  return (
    <input
      data-slot="input"
      className={cn(inputVariants({ variant }), className)}
      {...props}
    />
  )
}

export { Input, inputVariants }
