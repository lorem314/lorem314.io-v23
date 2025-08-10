import { createContext } from "react"

import type { PreferredTheme } from "@/types"

interface GlobalContextProps {
  test: "OK"

  preferredTheme: PreferredTheme
  setPreferredTheme: (arg0: PreferredTheme) => void

  leftDrawerWidth: number
  setLeftDrawerWidth: (arg0: number) => void

  isLeftDrawerAlwaysCollapsed: boolean
  setIsLeftDrawerAlwaysCollapsed: (arg0: boolean) => void

  isRightDrawerAlwaysCollapsed: boolean
  setIsRightDrawerAlwaysCollapsed: (arg0: boolean) => void

  showRightDrawerOpener: boolean
  isRightDrawerOpen: boolean
  rightDrawerHandler: { open: () => void; close: () => void }
}

const GlobalContext = createContext<GlobalContextProps | undefined>(undefined)

export default GlobalContext
