import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const cardVariants = cva(
  cn(
    "rounded border border-transparent p-2.5 shadow transition-colors",
    "bg-content-bg",
  ),
  {
    variants: {
      variant: {
        default: "",
        page: cn("mx-auto my-8"),
      },
      defaultVariants: {
        variant: "default",
      },
    },
  },
)

type CardProps = React.ComponentProps<"section"> &
  VariantProps<typeof cardVariants> & { asChild?: boolean }

const Card = ({ className, variant, asChild = false, ...props }: CardProps) => {
  const Comp = asChild ? Slot : "section"

  return (
    <Comp
      data-slot="card"
      className={cn(cardVariants({ variant }), "", className)}
      {...props}
    />
  )
}

const CardHeader = ({
  className,
  asChild,
  ...props
}: React.ComponentProps<"header"> & { asChild?: boolean }) => {
  const Comp = asChild ? Slot : "header"

  return (
    <Comp
      data-slot="card-header"
      className={cn("p-1.5", className)}
      {...props}
    />
  )
}

type CardTitleProps = React.ComponentProps<"div"> & { asChild?: boolean }

const CardTitle = ({ asChild, className, ...props }: CardTitleProps) => {
  const Comp = asChild ? Slot : "div"

  return (
    <Comp
      data-slot="card-header"
      className={cn(
        "mb-1.5 block pb-1.5 text-lg font-bold select-none",
        "text-label-color border-label-border-color border-b",
        className,
      )}
      {...props}
    />
  )
}

const CardDescription = ({
  className,
  ...props
}: React.ComponentProps<"p">) => {
  return <p data-slot="card-description" className={className} {...props} />
}

const CardAction = ({ className, ...props }: React.ComponentProps<"div">) => {
  return <div data-slot="card-header" className={className} {...props} />
}

const CardContent = ({ className, ...props }: React.ComponentProps<"div">) => {
  return (
    <div
      data-slot="card-content"
      className={cn("p-1.5", className)}
      {...props}
    />
  )
}

const CardFooter = ({
  className,
  ...props
}: React.ComponentProps<"footer">) => {
  return (
    <footer
      data-slot="card-header"
      className={cn("p-1.5", className)}
      {...props}
    />
  )
}

export {
  cardVariants,
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardAction,
  CardContent,
  CardFooter,
}
