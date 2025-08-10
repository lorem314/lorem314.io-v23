import { InnerLine, type AnnotationHandler } from "codehike/code"

const linePadding: AnnotationHandler = {
  name: "uglyLineNumbers",
  Line: (props) => {
    const { lineNumber, totalLines, indentation } = props
    return (
      <div className="">
        <InnerLine merge={props} className="pl-3" />
      </div>
    )
  },
}

export { linePadding }
