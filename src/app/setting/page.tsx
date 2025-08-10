"use client"

import { useState } from "react"
import { IoMdRefresh } from "react-icons/io"
import { BiSolidChevronDown } from "react-icons/bi"

import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card"
import useGlobalContext from "@/components/hooks/useGlobalContext"
import type { PreferredTheme } from "@/types"
import { Select, Option } from "@/components/ui/select"

export default function Page() {
  const {
    preferredTheme,
    setPreferredTheme,
    isLeftDrawerAlwaysCollapsed,
    setIsLeftDrawerAlwaysCollapsed,
    isRightDrawerAlwaysCollapsed,
    setIsRightDrawerAlwaysCollapsed,
    // leftDrawerWidth,
    // setLeftDrawerWidth,
  } = useGlobalContext()

  return (
    <Card variant={"page"} className="max-w-3xl">
      <CardHeader>
        <CardTitle asChild>
          <h2>设置</h2>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {/* theme */}
        <div className="flex items-center gap-2.5">
          <label htmlFor="preferred-theme">主题</label>
          <div className="relative">
            {/* <BiSolidChevronDown className="pointer-events-none absolute top-1/2 right-2 -translate-y-1/2" /> */}
            <Select
              id="preferred-theme"
              value={preferredTheme}
              onChange={(event) => {
                setPreferredTheme(event.target.value as PreferredTheme)
              }}
            >
              <Option value="system">系统</Option>
              <Option value="light">白天</Option>
              <Option value="dark">黑夜</Option>
            </Select>
          </div>
        </div>

        {/* isLeftDrawerAlwaysCollapsed */}
        <div className="my-2 flex items-center gap-2.5">
          <input
            type="checkbox"
            id="is-left-drawer-always-collapsed"
            checked={isLeftDrawerAlwaysCollapsed}
            onChange={(event) => {
              setIsLeftDrawerAlwaysCollapsed(event.target.checked)
            }}
          />
          <label className="" htmlFor="is-left-drawer-always-collapsed">
            总是折叠左侧抽屉
          </label>
        </div>

        {/* isRightDrawerAlwaysCollapsed */}
        <div className="my-2 flex items-center gap-2.5">
          <input
            type="checkbox"
            id="is-right-drawer-always-collapsed"
            checked={isRightDrawerAlwaysCollapsed}
            onChange={(event) => {
              setIsRightDrawerAlwaysCollapsed(event.target.checked)
            }}
          />
          <label htmlFor="is-right-drawer-always-collapsed">
            总是折叠右侧抽屉
          </label>
        </div>
      </CardContent>
      <CardFooter></CardFooter>
    </Card>
  )
}
