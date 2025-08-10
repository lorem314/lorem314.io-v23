import { memo } from "react"

import { FaBilibili } from "react-icons/fa6"
import { FaGithub } from "react-icons/fa"
import { FaCodepen } from "react-icons/fa"
import { SiCodesandbox } from "react-icons/si"

import Tooltip from "../ui/Tooltip"
import { cn } from "@/lib/utils"

const refs = {
  codepen: "https://codepen.io/Number_DDD",
  codesandbox: "https://codesandbox.io/u/lorem314",
  github: "https://github.com/lorem314",
  bilibili: "https://space.bilibili.com/7909744/",
}

const links = [
  { Icon: FaCodepen, title: "Codepen", href: refs.codepen },
  { Icon: SiCodesandbox, title: "CodeSandbox", href: refs.codesandbox },
  { Icon: FaGithub, title: "Github", href: refs.github },
  { Icon: FaBilibili, title: "Bilibili", href: refs.bilibili },
]

const Social = () => {
  return (
    <ul className="flex items-center gap-2.5">
      {links.map((link, index) => {
        const { Icon, title, href } = link
        return (
          <li key={index}>
            <Tooltip tip={title} placement="bottom">
              <a
                className={cn(
                  "flex items-center gap-1.5 rounded p-2",
                  "bg-black/10 dark:bg-white/10",
                  "hover:bg-black/20 dark:hover:bg-white/20",
                  "active:bg-black/30 dark:active:bg-white/30",
                  "lg:bg-transparent lg:p-0 dark:lg:bg-transparent",
                  "lg:hover:bg-transparent dark:lg:hover:bg-transparent",
                )}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Icon />
                <span className="hidden lg:inline">{title}</span>
              </a>
            </Tooltip>
          </li>
        )
      })}
    </ul>
  )
}

export default memo(Social)
