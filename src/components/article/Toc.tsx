"use client"
import {
  createRef,
  forwardRef,
  type MouseEvent,
  useEffect,
  useImperativeHandle,
  useRef,
} from "react"
import type { TableOfContents, TOCItemType } from "fumadocs-core/server"
import { VscCollapseAll, VscExpandAll } from "react-icons/vsc"

import Details from "../ui/Details"
import { Button } from "../ui/button"
import { cn } from "@/lib/utils"

const Toc = ({ title, toc }: { title: string; toc: TableOfContents }) => {
  console.log("toc", toc)
  const nestedToc = flatToNested(toc)
  console.log("nestedToc", nestedToc)

  const refDetails = useRef<{ open: () => void; close: () => void }>(null)
  const refItems = useRef<{ openAll: () => void; closeAll: () => void }>(null)

  const openAll = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation()
    refDetails.current?.open()
    refItems.current?.openAll()
  }
  const closeAll = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation()
    refDetails.current?.close()
    refItems.current?.closeAll()
  }

  return (
    <div>
      <Details ref={refDetails}>
        <div className="details-head-in-toc group">
          <div className="font-bold">{title}</div>
          <div className="grow" />
          <div className="flex items-center opacity-0 group-hover:opacity-100">
            <Button
              variant="goast"
              size="large"
              style={{ padding: 0 }}
              onClick={openAll}
            >
              <VscExpandAll data-slot="icon" className="size-6" />
            </Button>
            <Button
              variant="goast"
              size="large"
              style={{ padding: 0 }}
              onClick={closeAll}
            >
              <VscCollapseAll data-slot="icon" className="size-6" />
            </Button>
          </div>
        </div>
        <Items ref={refItems} items={nestedToc} />
      </Details>
    </div>
  )
}

export default Toc

type TocItem = TOCItemType & { items: TocItem[] }

function flatToNested(flatArray: TOCItemType[]) {
  const result = [] // 存储最终嵌套结构的根节点数组
  const stack: TocItem[] = [] // 辅助栈，用于跟踪当前处理路径上的节点

  for (const item of flatArray) {
    // 创建新节点（浅拷贝原对象并添加 items 数组）
    const node = { ...item, items: [] }

    // 弹出栈中所有深度大于等于当前节点的元素（找到父节点）
    while (stack.length && node.depth <= stack[stack.length - 1].depth) {
      stack.pop()
    }

    // 确定当前节点的父节点
    if (stack.length) {
      // 如果栈非空，当前节点是栈顶节点的子节点
      stack[stack.length - 1].items.push(node)
    } else {
      // 如果栈为空，当前节点是根节点
      result.push(node)
    }

    // 将当前节点压入栈（可能成为后续节点的父节点）
    stack.push(node)
  }

  return result
}

type ItemsProps = { items: TocItem[] }
const Items = forwardRef((props: ItemsProps, ref) => {
  const refs = useRef(
    props.items.map(() =>
      createRef<{ openAll: () => void; closeAll: () => void }>(),
    ),
  )

  useImperativeHandle(
    ref,
    () => ({
      openAll: () => refs.current.forEach((ref) => ref.current?.openAll()),
      closeAll: () => refs.current.forEach((ref) => ref.current?.closeAll()),
    }),
    [],
  )

  if (props.items.length === 0) {
    return null
  }

  return (
    <ul className="tree-list">
      {props.items.map((item, index) => {
        return (
          <li key={index}>
            <Item ref={refs.current[index]} item={item} />
          </li>
        )
      })}
    </ul>
  )
})
Items.displayName = "TocItems"

type ItemProps = { item: TOCItemType & { items: TocItem[] } }
const Item = forwardRef((props: ItemProps, ref) => {
  const refDetails = useRef<{ open: () => void; close: () => void }>(null)
  const refItems = useRef<{ openAll: () => void; closeAll: () => void }>(null)

  const openAll = (event: MouseEvent<HTMLButtonElement>) => {
    event?.stopPropagation()
    refDetails.current?.open()
    refItems.current?.openAll()
  }
  const closeAll = (event: MouseEvent<HTMLButtonElement>) => {
    event?.stopPropagation()
    refDetails.current?.close()
    refItems.current?.closeAll()
  }

  useImperativeHandle(ref, () => ({ closeAll, openAll }), [])

  if (props.item.items.length === 0) {
    return (
      <a className="text-link-color transition-colors" href={props.item.url}>
        {props.item.title}
      </a>
    )
  }

  return (
    <Details ref={refDetails} isOpen={true}>
      <div className="details-head-in-toc group">
        <a
          className="text-link-color transition-colors"
          href={props.item.url}
          onClick={(event) => {
            event.stopPropagation()
          }}
        >
          {props.item.title}
        </a>
        <div className="grow" />
        <div className="flex items-center opacity-0 group-hover:opacity-100">
          <Button
            variant="goast"
            size="large"
            style={{ padding: 0 }}
            onClick={openAll}
          >
            <VscExpandAll data-slot="icon" className="size-6" />
          </Button>
          <Button
            variant="goast"
            size="large"
            style={{ padding: 0 }}
            onClick={closeAll}
          >
            <VscCollapseAll data-slot="icon" className="size-6" />
          </Button>
        </div>
      </div>
      <Items ref={refItems} items={props.item.items} />
    </Details>
  )
})
Item.displayName = "TocItem"

// function throttle(mainFunction: Function, delay: number) {
//   let timerFlag: NodeJS.Timeout | null = null // Variable to keep track of the timer

//   // Returning a throttled version
//   return (...args: any[]) => {
//     if (timerFlag === null) {
//       // If there is no timer currently running
//       mainFunction(...args) // Execute the main function
//       timerFlag = setTimeout(() => {
//         // Set a timer to clear the timerFlag after the specified delay
//         timerFlag = null // Clear the timerFlag to allow the main function to be executed again
//       }, delay)
//     }
//   }
// }
