"use client"

import { useEffect } from "react"
import { usePathname } from "next/navigation"

import { AiOutlineTags } from "react-icons/ai"
import { VscListTree } from "react-icons/vsc"
import { type IconType } from "react-icons"

import GlobalContext from "../contexts/GlobalContext"
import Header from "./Header"
import Sidebar from "./Sidebar"
import Footer from "./Footer"
import Drawer from "../ui/Drawer"
import useClient from "../hooks/useClient"
import useDrawer from "../hooks/useDrawer"
import useLocalStorage from "../hooks/useLocalStorage"
import { cn } from "@/lib/utils"
import type { PreferredTheme } from "@/types"

export default function Layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isClient = useClient()

  const [preferredTheme, setPreferredTheme] = useLocalStorage<PreferredTheme>(
    "preferred-theme",
    "system",
  )

  const [leftDrawerWidth, setLeftDrawerWidth] = useLocalStorage(
    "left-drawer-width",
    320,
  )

  const [isLeftDrawerAlwaysCollapsed, setIsLeftDrawerAlwaysCollapsed] =
    useLocalStorage("is-left-drawer-always-collapsed", false)

  const [isRightDrawerAlwaysCollapsed, setIsRightDrawerAlwaysCollapsed] =
    useLocalStorage("is-right-drawer-always-collapsed", false)

  const {
    isCollapsed: isLeftDrawerCollapsed,
    isOpen: isLeftDrawerOpen,
    handler: leftDrawerHandler,
  } = useDrawer({
    isAlwaysCollapsed: isLeftDrawerAlwaysCollapsed,
    mediaQuery: "(max-width: 96rem)",
  })
  const showLeftDrawerOpener =
    isLeftDrawerAlwaysCollapsed || isLeftDrawerCollapsed

  const rightDrawerConfig = getRightDrawerConfig(pathname)
  const {
    isCollapsed: isRightDrawerCollapsed,
    isOpen: isRightDrawerOpen,
    handler: rightDrawerHandler,
  } = useDrawer({
    isAlwaysCollapsed: isRightDrawerAlwaysCollapsed,
    mediaQuery: rightDrawerConfig.mediaQuery,
  })
  const showRightDrawerOpener =
    isRightDrawerAlwaysCollapsed || isRightDrawerCollapsed

  // theme
  useEffect(() => {
    const darkQuery = window.matchMedia("(prefers-color-scheme: dark)")

    const handleThemeChange = ({ matches }: { matches: boolean }) => {
      if (matches) {
        document.documentElement.classList.remove("light")
        document.documentElement.classList.add("dark")
      } else {
        document.documentElement.classList.remove("dark")
        document.documentElement.classList.add("light")
      }
    }

    if (preferredTheme === "system") {
      darkQuery.addEventListener("change", handleThemeChange)
      const dataTheme = darkQuery.matches ? "dark" : "light"
      document.documentElement.setAttribute("data-theme", dataTheme)
    } else {
      document.documentElement.setAttribute("data-theme", preferredTheme)
    }

    return () => {
      darkQuery.removeEventListener("change", handleThemeChange)
    }
  }, [preferredTheme])

  return isClient ? (
    <GlobalContext.Provider
      value={{
        test: "OK",

        preferredTheme,
        setPreferredTheme,

        leftDrawerWidth,
        setLeftDrawerWidth,

        isLeftDrawerAlwaysCollapsed,
        setIsLeftDrawerAlwaysCollapsed,

        isRightDrawerAlwaysCollapsed,
        setIsRightDrawerAlwaysCollapsed,

        showRightDrawerOpener,
        isRightDrawerOpen,
        rightDrawerHandler,
      }}
    >
      <Header
        showLeftDrawerOpener={showLeftDrawerOpener}
        openLeftDrawer={leftDrawerHandler.open}
        showRightDrawerOpener={showRightDrawerOpener}
        openRightDrawer={rightDrawerHandler.open}
        RightDrawerIcon={rightDrawerConfig.icon}
      />

      {showLeftDrawerOpener ? (
        <Drawer
          isOpen={isLeftDrawerOpen}
          placement="left"
          size={leftDrawerWidth}
          onClose={leftDrawerHandler.close}
        >
          {({ onCloseDrawer }) => {
            return <Sidebar onCloseDrawer={onCloseDrawer} />
          }}
        </Drawer>
      ) : (
        <aside
          className="absolute top-12.5 bottom-0 left-0 w-80"
          style={{ width: `${leftDrawerWidth}px` }}
        >
          <Sidebar />
        </aside>
      )}

      <main
        id="main"
        className={cn(
          "absolute top-12.5 right-0 bottom-0",
          "bg-bg-0 text-app-color overflow-auto px-2.5 transition-colors",
        )}
        style={{ left: showLeftDrawerOpener ? "0" : `${leftDrawerWidth}px` }}
      >
        {children}
        <Footer />
      </main>
    </GlobalContext.Provider>
  ) : (
    "not on client"
  )
}

const getRightDrawerConfig = (
  pathname: string,
): { mediaQuery: string; icon: IconType | null } => {
  const splitted = pathname.split("/")
  const length = splitted.length

  if (splitted[1] === "blogs" && length === 2) {
    // /blogs
    return { mediaQuery: "(max-width: 64rem)", icon: AiOutlineTags }
  } else if (splitted[1] === "blogs" && length === 3) {
    // /blogs/[title]
    return { mediaQuery: "(max-width: 72rem)", icon: VscListTree }
  } else if (splitted[1] === "books" && length === 4) {
    // /books/[title]/[chapter]
    return { mediaQuery: "(max-width: 64rem)", icon: VscListTree }
  } else {
    return { mediaQuery: "(max-width: 0px)", icon: null }
  }
}
