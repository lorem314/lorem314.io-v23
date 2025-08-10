"use client"

import { type TableOfContents } from "fumadocs-core/server"

import Drawer from "../ui/Drawer"
import Actions from "./Actions"
import Body from "./Body"
import Toc from "./Toc"
import useGlobalContext from "../hooks/useGlobalContext"
import { cn } from "@/lib/utils"

export default function Layout({
  children,
  title,
  toc,
}: {
  children: React.ReactNode
  title: string
  toc: TableOfContents
}) {
  const { showRightDrawerOpener, isRightDrawerOpen, rightDrawerHandler } =
    useGlobalContext()

  return (
    <div
      className={cn(
        "relative mx-auto my-8 grid max-w-[78rem] gap-2.5",
        showRightDrawerOpener
          ? "grid-cols-[3rem_minmax(0,_auto)]"
          : "grid-cols-[3rem_minmax(0,_auto)_minmax(0,_24rem)]",
        // : "grid-cols-[3rem_7fr_3fr]",
      )}
    >
      <Actions />

      <article>{children}</article>

      {showRightDrawerOpener ? (
        <Drawer
          isOpen={isRightDrawerOpen}
          onClose={rightDrawerHandler.close}
          placement="right"
          size={360}
          title="目录"
        >
          {() => {
            return (
              <div className="p-2.5">
                <Toc title={title} toc={toc} />
              </div>
            )
          }}
        </Drawer>
      ) : (
        <aside className="">
          <div
            className={cn(
              "bg-content-bg sticky top-2.5 overflow-y-auto rounded p-2.5 shadow transition-colors",
              "max-h-[calc(100vh-50px-2rem-10px)]",
            )}
          >
            <Toc title={title} toc={toc} />
          </div>
        </aside>
      )}
    </div>
  )
}
