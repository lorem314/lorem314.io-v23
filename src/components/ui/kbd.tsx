import { cn } from "@/lib/utils"
import { Slot } from "@radix-ui/react-slot"

export default function Kbd({
  asChild = false,
  isPressed = false,
  className,
  ...props
}: React.ComponentProps<"kbd"> & { asChild?: boolean; isPressed?: boolean }) {
  const Comp = asChild ? Slot : "kbd"

  return (
    <Comp
      {...props}
      className={cn(
        "relative cursor-pointer outline-offset-4 select-none",
        "mx-2 mr-0.5 rounded border-2 border-gray-300 px-2 py-0.5",
        "shadow-[2px_2px_#999]",
        // "shadow-sm",
        "inline-block min-w-6 text-center transition-all",
        // "hover:bg-black/7",
        "active:relative active:top-px active:left-px active:shadow-[1px_1px_#999]",
        isPressed ? "top-px left-px shadow-[1px_1px_#999]" : "",
        isPressed ? "border-blue-400 shadow-[0px_0px]" : "",
        className,
      )}
    />
  )
}
