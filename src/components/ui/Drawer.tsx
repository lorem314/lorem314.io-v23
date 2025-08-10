"use client"

import {
  useState,
  useEffect,
  cloneElement,
  memo,
  type ReactElement,
} from "react"
import { createPortal } from "react-dom"
import { VscChromeClose } from "react-icons/vsc"

import { cn } from "@/lib/utils"
import { Button } from "./button"
import { type Placement } from "@/types"

type DrawerProps = {
  isOpen: boolean
  title?: string
  placement: Placement
  size: number
  onClose: () => void
  children:
    | ReactElement
    | (({ onCloseDrawer }: { onCloseDrawer?: () => void }) => ReactElement)
}

const Drawer = (props: DrawerProps) => {
  const { isOpen, ...restProps } = props
  return isOpen ? <Portal {...restProps} /> : null
}

export default memo(Drawer)

const Portal = ({
  title,
  placement,
  size,
  onClose,
  children,
}: Omit<DrawerProps, "isOpen">) => {
  const [style, setStyle] = useState({
    opacity: 0,
    transform: getTransform(placement),
  })

  useEffect(() => {
    const transform = "translate(0, 0)"
    setStyle({ opacity: 1, transform })
  }, [])

  const handleCloseDrawer = () => {
    Promise.resolve()
      .then(() => {
        return new Promise<void>((resolve) => {
          const transform = getTransform(placement)
          setStyle({ opacity: 0, transform })
          setTimeout(() => resolve(), 150)
        })
      })
      .then(() => onClose && onClose())
  }

  const { transform, opacity } = style
  const positionProps = getPositionProps(placement, size)

  return createPortal(
    <div
      className={cn(
        "absolute inset-0",
        "cursor-pointer overflow-x-hidden backdrop-blur-xs transition-opacity",
        "bg-black/25",
      )}
      style={{ opacity }}
      onClick={handleCloseDrawer}
      role="button"
    >
      <div
        className="absolute flex cursor-auto flex-col transition-transform"
        style={{ ...positionProps, transform }}
        onClick={(event) => event.stopPropagation()}
      >
        <header
          className={cn(
            "h-12.5 shrink-0 px-2.5",
            "flex items-center gap-2.5",
            "bg-primary-color text-white transition-colors",
            placement === "left"
              ? "flex-row-reverse justify-end"
              : "flex-row justify-between",
          )}
        >
          <h2 className="text-lg font-bold text-white/85 select-none hover:text-white">
            {title ? title : "lorem314.io"}
          </h2>
          <Button variant="glass" onClick={handleCloseDrawer}>
            <VscChromeClose data-slot="icon" />
          </Button>
        </header>
        <div className="bg-content-bg grow overflow-y-auto transition-colors">
          {typeof children === "function"
            ? children({ onCloseDrawer: handleCloseDrawer })
            : cloneElement(
                children as ReactElement<{
                  onCloseDrawer: () => void
                }>,
                {
                  onCloseDrawer: handleCloseDrawer,
                },
              )}
        </div>
      </div>
    </div>,
    document.body,
  )
}

const getPositionProps = (placement: Placement, size: number) => {
  switch (placement) {
    case "top":
    case "bottom":
      return { left: 0, right: 0, [placement]: 0, height: `${size}px` }
    case "left":
    case "right":
      return { top: 0, bottom: 0, [placement]: 0, width: `${size}px` }
    default:
      return { top: 0, bottom: 0, left: 0, width: `${size}px` }
  }
}

const getTransform = (placement: Placement) => {
  switch (placement) {
    case "top":
      return "translate(0, -100%)"
    case "right":
      return "translate(100%, 0)"
    case "bottom":
      return "translate(0, 100%)"
    case "left":
      return "translate(-100%, 0)"
    default:
      return "translate(-100%, 0)"
  }
}
