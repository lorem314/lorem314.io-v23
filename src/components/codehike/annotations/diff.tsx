import { InnerLine } from "codehike/code"
import type { AnnotationHandler, BlockAnnotation } from "codehike/code"
import { twMerge } from "tailwind-merge"

// !diff -
// !diff +
export const diff: AnnotationHandler = {
  name: "diff",
  onlyIfAnnotated: true,
  transform: (annotation: BlockAnnotation) => {
    const color = annotation.query == "-" ? "#f85149" : "#3fb950"
    return [annotation, { ...annotation, name: "mark", query: color }]
  },
  Line: ({ annotation, ...props }) => {
    const isMinus = annotation?.query === "-"
    return (
      <>
        <div className="box-content min-w-[1ch] pl-2 opacity-70 select-none">
          {annotation?.query}
        </div>
        <InnerLine
          merge={props}
          className={twMerge(isMinus ? "select-none" : "")}
        />
      </>
    )
  },
}
