import { memo } from "react"
import Link from "next/link"
import { FaHome, FaBook } from "react-icons/fa"
import { RiArticleFill, RiSettings3Fill } from "react-icons/ri"

import { Card, CardTitle } from "../ui/card"
import { Button } from "../ui/button"
import Tooltip from "../ui/Tooltip"
import { cn } from "@/lib/utils"

// import Tooltip from "../ui/Tooltip"

const routes = [
  { Icon: FaHome, title: "主页", href: "/" },
  { Icon: RiArticleFill, title: "博客", href: "/blogs" },
  // { Icon: FaBook, title: "书籍", href: "/books" },
  { Icon: RiSettings3Fill, title: "设置", href: "/setting" },
]

const Sidebar = ({ onCloseDrawer }: { onCloseDrawer?: () => void }) => {
  return (
    <nav className="bg-bg-1 flex h-full transition-colors">
      <ul
        className={cn(
          "flex shrink-0 basis-12.5 flex-col items-center gap-2.5",
          "bg-bg-0 pt-2.5 transition-colors",
        )}
      >
        {routes.map((route, index) => {
          const { Icon, title, href } = route
          return (
            <li key={index} className="flex">
              <Tooltip tip={title} placement="right">
                <Button variant="misc" asChild>
                  <Link
                    className="misc-button"
                    href={href}
                    onClick={onCloseDrawer}
                  >
                    <Icon />
                  </Link>
                </Button>
              </Tooltip>
            </li>
          )
        })}
      </ul>

      <Card className="mx-2.5 mt-2.5 grow-0 overflow-y-auto rounded p-2.5 shadow">
        <CardTitle asChild>
          <h2>卡片标题</h2>
        </CardTitle>
        {Array(30)
          .fill(null)
          .map((item, index) => {
            return (
              <div key={index}>
                <p className="">
                  {index} Lorem ipsum dolor sit amet consectetur adipisicing
                  elit. Facilis, sed.
                </p>
              </div>
            )
          })}
      </Card>
    </nav>
  )
}

export default memo(Sidebar)
