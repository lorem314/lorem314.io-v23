"use client"

import Link from "next/link"
import { RiMenu2Line } from "react-icons/ri"

import { Button } from "../ui/button"
import Social from "./Social"
import ThemeToggler from "./ThemeToggler"
import { IconType } from "react-icons"

type HeaderProps = {
  showLeftDrawerOpener: boolean
  openLeftDrawer: () => void

  showRightDrawerOpener: boolean
  openRightDrawer: () => void
  RightDrawerIcon: IconType | null
}

const Header = ({
  showLeftDrawerOpener,
  openLeftDrawer,

  showRightDrawerOpener,
  openRightDrawer,
  RightDrawerIcon,
}: HeaderProps) => {
  return (
    <header className="bg-primary-color flex h-[50px] items-center gap-2.5 px-2.5 text-white">
      {showLeftDrawerOpener ? (
        <Button variant="glass" onClick={openLeftDrawer}>
          <RiMenu2Line data-slot="icon" />
        </Button>
      ) : null}

      <h1 className="text-lg font-bold text-white/85 hover:text-white">
        <Link href="/" className="hover:no-underline">
          lorem314.io
        </Link>
      </h1>

      {/* <button>search</button> */}
      <div className="flex-grow" />

      <Social />

      <ThemeToggler />

      {showRightDrawerOpener && RightDrawerIcon ? (
        <Button variant="glass" onClick={openRightDrawer}>
          <RightDrawerIcon data-slot="icon" />
        </Button>
      ) : null}
    </header>
  )
}

export default Header
