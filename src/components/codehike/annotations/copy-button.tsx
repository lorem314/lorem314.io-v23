"use client"

import { useState } from "react"
import { FaRegCopy, FaCheck } from "react-icons/fa"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export default function CopyButton({ text }: { text: string }) {
  const [isCopied, setIsCopied] = useState(false)

  return (
    <Button
      variant={"glass"}
      size={"small"}
      className={cn("absolute top-1 right-1", "")}
      aria-label="复制代码"
      onClick={() => {
        navigator.clipboard.writeText(text)
        setIsCopied(true)
        setTimeout(() => setIsCopied(false), 1200)
      }}
    >
      {isCopied ? (
        <FaCheck data-slot="icon" color="green" className="size-5" />
      ) : (
        <FaRegCopy data-slot="icon" className="size-5" />
      )}
    </Button>
  )
}
