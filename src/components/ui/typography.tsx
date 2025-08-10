import Link from "next/link"
import { cva, type VariantProps } from "class-variance-authority"
import { FaHashtag } from "react-icons/fa"

import { cn } from "@/lib/utils"

export function H1({ className, ...props }: React.ComponentProps<"h1">) {
  return (
    <h1
      className={cn(
        "mt-14 mb-4 scroll-m-4 text-[1.75rem] font-bold first:mt-4",
        className,
      )}
      {...props}
    />
  )
}

export function H2({
  className,
  children,
  ...props
}: React.ComponentProps<"h2">) {
  return (
    <h2
      className={cn(
        "mt-12 mb-4 scroll-m-4 text-[1.625rem] font-bold first:mt-4",
        // "relative content-center",
        // "before:absolute before:left-0 before:-translate-x-full before:content-['_#']",
        className,
      )}
      {...props}
    >
      <Link href={`#${props.id}`}>{children}</Link>
    </h2>
  )
}

export function H3({
  className,
  children,
  ...props
}: React.ComponentProps<"h3">) {
  return (
    <h3
      className={cn(
        "mt-10 mb-4 scroll-m-4 text-[1.5rem] font-bold first:mt-4",
        className,
      )}
      {...props}
    >
      <Link href={`#${props.id}`}>{children}</Link>
    </h3>
  )
}

export function H4({
  className,
  children,
  ...props
}: React.ComponentProps<"h4">) {
  return (
    <h4
      className={cn(
        "mt-8 mb-4 scroll-m-4 text-[1.375rem] font-bold first:mt-4",
        className,
      )}
      {...props}
    >
      <Link href={`#${props.id}`}>{children}</Link>
    </h4>
  )
}

export function H5({
  className,
  children,
  ...props
}: React.ComponentProps<"h5">) {
  return (
    <h5
      className={cn(
        "mt-6 mb-4 scroll-m-4 text-[1.25rem] font-bold first:mt-4",
        className,
      )}
      {...props}
    >
      <Link href={`#${props.id}`}>{children}</Link>
    </h5>
  )
}

export function H6({
  className,
  children,
  ...props
}: React.ComponentProps<"h6">) {
  return (
    <h6
      className={cn(
        "mt-4 mb-4 scroll-m-4 text-[1.125rem] font-bold first:mt-4",
        className,
      )}
      {...props}
    >
      <Link href={`#${props.id}`}>{children}</Link>
    </h6>
  )
}

export function InlineCode({
  className,
  ...props
}: React.ComponentProps<"code">) {
  return (
    <code
      className={cn(
        // "bg-muted",
        "border-label-border-color",
        "rounded border px-1 py-0.5",
        // "transition-colors",
        "bg-black/5",
        "dark:bg-white/5",
        className,
      )}
      {...props}
    />
  )
}
