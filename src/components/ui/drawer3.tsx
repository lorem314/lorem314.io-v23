// "use client"

// import {
//   useState,
//   createContext,
//   useContext,
//   useCallback,
//   type ReactNode,
//   type Dispatch,
//   type SetStateAction,
//   useEffect,
//   useMemo,
// } from "react"
// import { createPortal } from "react-dom"
// import { Slot } from "@radix-ui/react-slot"
// import { useTransition, animated } from "@react-spring/web"

// import { Button, buttonVariants } from "@/components/ui/button"
// import { cn } from "@/lib/utils"
// import { Placement } from "@/types"

// interface DrawerContextProps {}

// const DrawerContext = createContext<DrawerContextProps | undefined>(undefined)

// const useDrawerContext = () => {
//   const drawerContext = useContext(DrawerContext)
//   if (!drawerContext) {
//     throw new Error(
//       "drawerContext has to be used within <DrawerContext.Provider>",
//     )
//   }
//   return drawerContext
// }

// function Drawer({
//   isOpen,
//   onClose,
//   placement,
//   size,
//   children,
// }: {
//   isOpen: boolean
//   onClose: () => void
//   placement: Placement
//   size: number
//   children: ReactNode
// }) {
//   const overlayTransition = useTransition(isOpen, {
//     from: { opacity: 0 },
//     enter: { opacity: 1 },
//     leave: { opacity: 0 },
//   })
//   const drawerTransition = useTransition(isOpen, getTransformConfig(placement))
//   const drawerStyles = getDrawerStyles(placement, size)

//   return null
// }

// const getTransformConfig = (placement: Placement) => {
//   const baseConfig = { config: { tension: 300, friction: 30, clamp: true } }

//   switch (placement) {
//     case "top":
//       return {
//         from: { transform: "translateY(-100%)" },
//         enter: { transform: "translateY(0%)" },
//         leave: { transform: "translateY(-100%)" },
//         ...baseConfig,
//       }
//     case "right":
//       return {
//         from: { transform: "translateX(100%)" },
//         enter: { transform: "translateX(0%)" },
//         leave: { transform: "translateX(100%)" },
//         ...baseConfig,
//       }
//     case "bottom":
//       return {
//         from: { transform: "translateY(100%)" },
//         enter: { transform: "translateY(0%)" },
//         leave: { transform: "translateY(100%)" },
//         ...baseConfig,
//       }
//     case "left":
//       return {
//         from: { transform: "translateX(-100%)" },
//         enter: { transform: "translateX(0%)" },
//         leave: { transform: "translateX(-100%)" },
//         ...baseConfig,
//       }
//   }
// }

// const getDrawerStyles = (placement: Placement, size: number) => {
//   const baseStyles = {
//     position: "fixed" as const,
//     backgroundColor: "white",
//     zIndex: 50,
//     boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
//   }

//   switch (placement) {
//     case "top":
//       return { ...baseStyles, top: 0, left: 0, right: 0, height: size }
//     case "right":
//       return { ...baseStyles, top: 0, right: 0, bottom: 0, width: size }
//     case "bottom":
//       return { ...baseStyles, bottom: 0, left: 0, right: 0, height: size }
//     case "left":
//       return { ...baseStyles, top: 0, left: 0, bottom: 0, width: size }
//     default:
//       return baseStyles
//   }
// }
