"use client"

import { useState, useEffect, useCallback, memo } from "react"
import { usePathname, useRouter } from "next/navigation"

import { IoMdArrowBack } from "react-icons/io"
import { BiSolidArrowToTop } from "react-icons/bi"
import { MdFullscreen, MdFullscreenExit } from "react-icons/md"

import { Button } from "../ui/button"
import { cn } from "@/lib/utils"

const Actions = ({ className }: { className?: string }) => {
  const pathname = usePathname()
  const router = useRouter()

  const [isFullscreen, setIsFullscreen] = useState(false)

  useEffect(() => {
    const handleFullscreenChange = () => {
      if (document.fullscreenElement) setIsFullscreen(true)
      else setIsFullscreen(false)
    }
    document.addEventListener("fullscreenchange", handleFullscreenChange)
    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange)
    }
  }, [])

  const enterFullscreen = useCallback(() => {
    const nodeMainContent = document.getElementById("main")
    if (nodeMainContent && nodeMainContent.requestFullscreen) {
      nodeMainContent.requestFullscreen()
    } else {
      alert("浏览器不支持全屏")
    }
  }, [])

  const exitFullscreen = useCallback(() => {
    if (document.fullscreenElement) {
      document.exitFullscreen()
      setIsFullscreen(false)
    }
  }, [])

  const toTop = useCallback(() => {
    document.getElementById("main")?.scrollTo(0, 0)
  }, [])

  const goBack = useCallback(() => {
    const splitted = pathname.split("/")
    const withoutLast = splitted.slice(0, splitted.length - 1)
    router.push(withoutLast.join("/"))
  }, [pathname, router])

  const actions = [
    { tip: "后退", Icon: IoMdArrowBack, onClick: goBack },
    { tip: "回到顶部", Icon: BiSolidArrowToTop, onClick: toTop },
    isFullscreen
      ? { tip: "退出全屏", Icon: MdFullscreenExit, onClick: exitFullscreen }
      : { tip: "进入全屏", Icon: MdFullscreen, onClick: enterFullscreen },
  ]

  return (
    <aside className={cn("flex flex-col items-center", className)}>
      <ul className="sticky top-2.5 flex flex-col gap-2.5">
        {actions.map((action) => {
          const { Icon, tip, onClick } = action
          return (
            <li key={tip}>
              <Button variant="glass" onClick={onClick}>
                <Icon />
              </Button>
            </li>
          )
        })}
      </ul>
    </aside>
  )
}

export default memo(Actions)
