import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

export function Select({
  className,
  ...props
}: React.ComponentProps<"select">) {
  return (
    <select
      {...props}
      className={cn("border-label-border-color rounded border p-1", className)}
    />
  )
}

export function Option({
  className,
  ...props
}: React.ComponentProps<"option">) {
  return <option {...props} className={cn("bg-bg-1", className)} />
}
