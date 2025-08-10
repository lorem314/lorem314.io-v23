import { cn } from "@/lib/utils"
import ExternalLink from "../ui/ExternalLink"

import { geistSans } from "@/fonts"

const Footer = () => {
  return (
    <footer
      className={cn(
        "bg-content-bg -mx-2.5 p-4 text-center shadow transition-colors",
        geistSans.className,
      )}
    >
      <p>lorem314.io-v18</p>
      <p>该网站使用 NextJS 构建</p>
      <p>
        若发现错误或有改正建议 欢迎
        <ExternalLink href="https://github.com/lorem314">提出</ExternalLink>或
        <ExternalLink href="https://space.bilibili.com/7909744/">
          私信
        </ExternalLink>
      </p>
      {/* <hr className="my-2 " /> */}
      <p>
        ICP备案号：
        <a
          className="text-link-color"
          href="https://beian.miit.gov.cn/"
          target="_blank"
          rel="noopener noreferrer"
        >
          京 ICP 备 2024101464 号
        </a>
      </p>
    </footer>
  )
}

export default Footer

// 京ICP备2024101464号
// <a href="https://beian.miit.gov.cn/" target="_blank">蜀ICP备XXXXX号-X</a>
// ${geistSans.className}
