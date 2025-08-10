"use client"

import {
  useState,
  createContext,
  useContext,
  useCallback,
  type ReactNode,
  type Dispatch,
  type SetStateAction,
  useEffect,
  useMemo,
} from "react"
import { createPortal } from "react-dom"
import { Slot } from "@radix-ui/react-slot"

import { Button, buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Placement } from "@/types"

interface DrawerContextProps {
  isOpen: boolean
  open: () => void
  close: () => void
  toggle: () => void
  setIsOpen: Dispatch<SetStateAction<boolean>>
}

const DrawerContext = createContext<DrawerContextProps | undefined>(undefined)

const useDrawerContext = () => {
  const drawerContext = useContext(DrawerContext)
  if (!drawerContext) {
    throw new Error(
      "drawerContext has to be used within <DrawerContext.Provider>",
    )
  }
  return drawerContext
}

function Drawer({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)

  const open = useCallback(() => setIsOpen(true), [])
  const close = useCallback(() => setIsOpen(false), [])
  const toggle = useCallback(() => setIsOpen((prevIsOpen) => !prevIsOpen), [])

  return (
    <DrawerContext.Provider value={{ isOpen, open, close, toggle, setIsOpen }}>
      {children}
    </DrawerContext.Provider>
  )
}

function DrawerTrigger(props: React.ComponentProps<"button">) {
  const { setIsOpen } = useDrawerContext()
  return (
    <Button
      {...props}
      onClick={(event) => {
        event.stopPropagation()
        setIsOpen(true)
      }}
    />
  )
}

function DrawerClose({
  asChild,
  ...props
}: React.ComponentProps<"button"> & { asChild: boolean }) {
  const Comp = asChild ? Slot : "button"
  const { close, setIsOpen } = useDrawerContext()
  return (
    <Comp
      {...props}
      onClick={(event) => {
        event.stopPropagation()
        close()
      }}
    />
  )
}

function DrawerContent({ children }: { children: ReactNode }) {
  const { isOpen } = useDrawerContext()

  return isOpen
    ? createPortal(<Portal>{children}</Portal>, document.body)
    : null
}

function Overlay({ className, ...props }: React.ComponentProps<"div">) {
  const { isOpen } = useDrawerContext()
  return isOpen ? (
    <div
      className={cn("absolute inset-0 cursor-pointer bg-black/25", className)}
      {...props}
    />
  ) : null
}

const placement = "left"
const size = 320

function Portal({ children }: { children: ReactNode }) {
  const { setIsOpen } = useDrawerContext()

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
      .then(() => {
        setIsOpen(false)
      })
  }

  const { transform, opacity } = style
  const positionProps = getPositionProps(placement, size)

  return (
    <div className={cn("absolute inset-0")}>
      <Overlay
        className="transition-opacity"
        style={{ opacity }}
        onClick={handleCloseDrawer}
      />
      <div
        className={cn(
          "bg-content-bg absolute",
          "transition-transform duration-150 ease-in-out",
        )}
        style={{ ...positionProps, transform }}
      >
        {children}
      </div>
    </div>
  )
}

function DrawerHeader({ className, ...props }: React.ComponentProps<"header">) {
  return <header {...props} className={cn("", className)} />
}

function DrawerFooter({ className, ...props }: React.ComponentProps<"footer">) {
  return <footer {...props} className={cn("", className)} />
}

export {
  Drawer,
  DrawerTrigger,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerFooter,
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
