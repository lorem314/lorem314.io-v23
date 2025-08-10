import { type AnnotationHandler, InnerLine } from "codehike/code"

import { cn } from "@/lib/utils"

export const lineNumbers: AnnotationHandler = {
  name: "line-numbers",
  Line: (props) => {
    const width = props.totalLines.toString().length + 1
    return (
      <div className="flex items-center">
        <span
          className={cn(
            "text-right opacity-50 select-none",
            "inline-flex items-center justify-end",
          )}
          style={{ minWidth: `${width}ch` }}
        >
          {props.lineNumber}
        </span>
        <InnerLine merge={props} className="flex-1" />
      </div>
    )
  },
}
