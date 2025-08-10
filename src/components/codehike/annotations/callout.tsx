import { InlineAnnotation, AnnotationHandler } from "codehike/code"

import { cn } from "@/lib/utils"

export const callout: AnnotationHandler = {
  name: "callout",
  transform: (annotation: InlineAnnotation) => {
    const { name, query, lineNumber, fromColumn, toColumn, data } = annotation
    return {
      name,
      query,
      fromLineNumber: lineNumber,
      toLineNumber: lineNumber,
      data: { ...data, column: (fromColumn + toColumn) / 2 },
    }
  },
  Block: ({ annotation, children }) => {
    const { column } = annotation.data
    const leftOffset = annotation?.data?.leftOffset || "-1ch"
    // console.log("annotation?.data?.leftOffset", annotation?.data?.leftOffset)
    // console.log("leftOffset", leftOffset)
    return (
      <>
        {children}
        <div
          style={{
            minWidth: `${column + 4}ch`,
            marginLeft: `calc(${leftOffset} + 16px)`,
            marginRight: `calc(-1ch + 16px)`,
          }}
          className={cn(
            "relative my-1 whitespace-break-spaces",
            "border-muted w-fit rounded border px-2",
            "pointer-events-none select-none",
            // "bg-zinc-800",
          )}
        >
          <div
            style={{ left: `${column}ch` }}
            className={cn(
              "absolute -top-[1px] h-2 w-2 -translate-y-1/2 rotate-45",
              "border-muted border-t border-l",
              // "bg-zinc-800",
            )}
          />
          {annotation.query}
        </div>
      </>
    )
  },
}
