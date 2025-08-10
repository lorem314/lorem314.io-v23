"use client"

import {
  Children,
  useState,
  useCallback,
  type HTMLProps,
  type ComponentProps,
  forwardRef,
  useImperativeHandle,
} from "react"
import { twMerge } from "tailwind-merge"
import { BiChevronRight, BiChevronDown } from "react-icons/bi"

import { Button } from "./button"

interface ToggleRef {
  open: () => void
  close: () => void
}

type DetailsProps = {
  isOpen?: boolean
}

// HTMLProps<HTMLDetailsElement> & DetailsProps
const Details = forwardRef<ToggleRef, ComponentProps<"details"> & DetailsProps>(
  (props, ref) => {
    const { isOpen: _isOpen = true, children, className, ...rest } = props
    const childArray = Children.toArray(children)
    const [isOpen, setIsOpen] = useState(_isOpen)

    const summary = childArray[0]
    const content = childArray[1]

    const open = useCallback(() => setIsOpen(true), [])
    const close = useCallback(() => setIsOpen(false), [])

    useImperativeHandle(ref, () => ({ open, close }), [open, close])

    return (
      <details
        open={isOpen}
        className={twMerge(isOpen ? "opened" : "closed", className)}
        {...rest}
      >
        <summary
          className={twMerge(
            "flex items-start",
            "cursor-pointer select-none",
            "hover:bg-black/8 dark:hover:bg-white/5",
          )}
          tabIndex={-1}
          onClick={(event) => {
            event.preventDefault()
            if (isOpen) close()
            else open()
          }}
        >
          <Button
            variant="goast"
            size={"large"}
            style={{ padding: 0 }}
            onClick={(event) => {
              event.preventDefault()
              if (isOpen) close()
              else open()
            }}
          >
            {isOpen ? (
              <BiChevronDown data-slot="icon" className="size-6" />
            ) : (
              <BiChevronRight data-slot="icon" className="size-6" />
            )}
          </Button>
          {summary}
        </summary>
        {content}
      </details>
    )
  },
)

Details.displayName = "Details"

export default Details
