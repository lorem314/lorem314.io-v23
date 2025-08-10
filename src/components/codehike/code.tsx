import { Pre, highlight } from "codehike/code"
import type {
  RawCode,
  AnnotationHandler,
  // HighlightedCode,
  // CodeAnnotation,
  BlockAnnotation,
  InlineAnnotation,
  // Token,
} from "codehike/code"

import { cn } from "@/lib/utils"
// annotations
import { callout } from "./annotations/callout"
import { lineNumbers } from "./annotations/line-numbers"
import { mark } from "./annotations/mark"
import { linePadding } from "./annotations/line-padding"
import { diff } from "./annotations/diff"
import {
  collapse,
  collapseTrigger,
  collapseContent,
} from "./annotations/collapse"
import CopyButton from "./annotations/copy-button"

import { firaCode } from "@/fonts"

export default async function Code({ codeblock }: { codeblock: RawCode }) {
  // const highlighted = await highlight(codeblock, "dark-plus")
  const highlighted = await highlight(codeblock, "github-from-css")
  const meta = parseCodeHikePreMeta(highlighted.meta)

  const linesOfCode = highlighted.code.split("\n")
  console.log("linesOfCode", linesOfCode)

  const totalLine = linesOfCode.length
  console.log("totalLine", totalLine)

  const totalLineNumberLength = totalLine.toString().length
  console.log("totalLineNumberLength", totalLineNumberLength)

  const handlers = [
    linePadding,
    callout,
    // className,

    collapse,
    collapseTrigger,
    collapseContent,

    mark,
    diff,
    // focus,
    // fold,
    // hover,
  ]

  if (meta.showLineNumbers) {
    handlers.push(lineNumbers)
  }

  const diffMinusAnnotationLineNumbers = highlighted.annotations
    .filter((annotation) => annotation.query === "-")
    .map((annotation) => {
      return (annotation as BlockAnnotation).fromLineNumber
    })
  const copyButtonText = linesOfCode
    .map((line, index) => {
      const lineNumber = index + 1
      return diffMinusAnnotationLineNumbers.includes(lineNumber) ? null : line
    })
    .filter((line) => line !== null)
    .join("\n")

  const newAnnotations = highlighted.annotations.map((annotation) => {
    const anno = annotation as InlineAnnotation
    // console.log("annotation name", annotation.name)
    // console.log("meta.showLineNumber", meta.showLineNumbers)
    if (annotation.name == "callout" && meta.showLineNumbers) {
      return {
        ...annotation,
        data: {
          ...annotation.data,
          leftOffset: `${totalLineNumberLength}ch - 1ch + 10px`,
        },
      }
    } else {
      return anno
    }
  })

  return (
    <div className="group relative my-4 rounded border border-neutral-500">
      <div className="border-b border-neutral-500 px-3 py-2 leading-6 font-bold">
        标题
      </div>
      <CopyButton text={copyButtonText} />
      <div className="overflow-auto rounded-b-md py-2.5">
        <Pre
          className={cn(firaCode.className, "")}
          // code={highlighted}
          code={{ ...highlighted, annotations: newAnnotations }}
          // code={highlighted}
          handlers={handlers}
        />
      </div>
    </div>
  )
}

export const parseCodeHikePreMeta = (rawMeta: string) => {
  const iterator = rawMeta.matchAll(/([a-zA-Z]+)(?:="(.+?)")?/g)
  const meta: Record<string, string | number | boolean> = {}
  // const meta: { [key: string]: string | number | boolean } = {}
  for (const match of iterator) {
    const key = match[1]
    const value = match[2]
    if (value === undefined) meta[key] = true
    else meta[key] = value
  }
  return meta
}
