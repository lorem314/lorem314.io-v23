import { useState, useEffect, useRef, useCallback, useMemo } from "react"
import type { ChangeEvent, MouseEvent } from "react"

import { IoCloseSharp } from "react-icons/io5"
import { FaRegTrashAlt } from "react-icons/fa"
import { GiLogicGateAnd, GiLogicGateOr } from "react-icons/gi"
import { FaCaretDown } from "react-icons/fa"

import { CardTitle } from "../ui/card"
import { Button } from "../ui/button"
import { Input, inputVariants } from "../ui/input"
import Kbd from "../ui/kbd"
import useDebounce from "../hooks/useDebounce"
import { cn } from "@/lib/utils"
import { Tag } from "@/types"

const Select = ({
  className,
  options,
  selectedTags,
  onSelectTag,
  clearSelectedTags,
  isOrMode,
  toggleFilterMode,
}: {
  className?: string
  options: Tag[]
  selectedTags: Tag[]
  onSelectTag: (
    tag: Tag,
  ) => (
    event: React.MouseEvent<HTMLButtonElement | HTMLLIElement> | KeyboardEvent,
  ) => void
  clearSelectedTags: () => void
  isOrMode: boolean
  toggleFilterMode: (event: MouseEvent<HTMLButtonElement>) => void
}) => {
  const [isHover, setIsHover] = useState(false)
  const refSelectedTags = useRef<HTMLUListElement>(null)
  const refTagInput = useRef<HTMLInputElement>(null)
  const refOptions = useRef<HTMLUListElement>(null)
  const [isOpen, setIsOpen] = useState(false)
  const [hoveredIndex, setHoveredIndex] = useState(-1)
  const [query, setQuery] = useState("")
  const debouncedQuery = useDebounce(query)

  // close ul.options when click outside
  useEffect(() => {
    const handleClickOutside = () => {
      if (isOpen) setIsOpen(false)
    }
    window.addEventListener("click", handleClickOutside)
    return () => {
      window.removeEventListener("click", handleClickOutside)
    }
  }, [isOpen])

  // nodeSelectedTags horizontal wheel
  useEffect(() => {
    const nodeSelectedTags = refSelectedTags.current

    const handleWheel = (event: WheelEvent) => {
      if (event.deltaY === 0) return
      nodeSelectedTags?.scrollBy({ left: event.deltaY < 0 ? -12 : 12 })
    }

    if (nodeSelectedTags) {
      nodeSelectedTags.addEventListener("wheel", handleWheel, { passive: true })
    }

    return () => {
      if (nodeSelectedTags) {
        nodeSelectedTags.removeEventListener("wheel", handleWheel)
      }
    }
  }, [selectedTags])

  const handleSelectTag = useCallback(
    (tag: Tag) =>
      (
        event:
          | React.MouseEvent<HTMLButtonElement | HTMLLIElement>
          | KeyboardEvent,
      ) => {
        if (event.stopPropagation) {
          event.stopPropagation()
        }
        if (!event.shiftKey) {
          setIsOpen(false)
        }
        setQuery("")
        onSelectTag(tag)(event)
      },
    [onSelectTag],
  )

  const filteredOptions = useMemo(
    () =>
      options.filter((option) => {
        if (debouncedQuery === "") return true
        const lowercasedDebouncedQuery = debouncedQuery.toLocaleLowerCase()
        const lowercasedTagName = option.name.toLocaleLowerCase()
        return lowercasedTagName.includes(lowercasedDebouncedQuery)
      }),
    [debouncedQuery, options],
  )

  // tag input listens to key press event
  useEffect(() => {
    const nodeTagInput = refTagInput.current

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.target !== nodeTagInput) return
      switch (event.code) {
        case "Escape":
          console.log("[Select] pressed Escape")
          setIsOpen(false)
          break
        case "Enter":
        case "NumpadEnter":
        case "Space":
          event.preventDefault()
          if (!isOpen) {
            setIsOpen(true)
          } else {
            const hoveredOption = filteredOptions[hoveredIndex]
            if (hoveredIndex !== -1 && hoveredOption) {
              handleSelectTag(hoveredOption)(event)
            }
            setIsOpen(false)
          }
          break
        case "ArrowUp":
        case "ArrowDown":
          event.preventDefault()
          if (!isOpen) {
            setIsOpen(true)
            break
          }
          if (hoveredIndex === -1) {
            setHoveredIndex(() => 0)
          }
          const indexAddend = event.code === "ArrowDown" ? 1 : -1
          const newHoveredIndex = hoveredIndex + indexAddend
          if (newHoveredIndex >= 0 && newHoveredIndex < options.length) {
            setHoveredIndex(newHoveredIndex)
            const nodeOptions = refOptions.current
            const nodeNextHoveredLi = nodeOptions?.querySelector<HTMLLIElement>(
              `li:nth-of-type(${newHoveredIndex + 1})`,
            )
            if (!nodeNextHoveredLi || !nodeOptions) return
            if (event.code === "ArrowUp") {
              if (nodeNextHoveredLi.offsetTop < nodeOptions.scrollTop) {
                nodeOptions.scrollTop = nodeNextHoveredLi.offsetTop
              }
            } else if (event.code === "ArrowDown") {
              if (
                nodeNextHoveredLi.offsetTop + nodeNextHoveredLi.offsetHeight >
                nodeOptions.scrollTop + nodeOptions.clientHeight
              ) {
                nodeOptions.scrollTop =
                  (newHoveredIndex - 3) * nodeNextHoveredLi.offsetHeight
              }
            }
          }
          return
        default:
          return
      }
    }

    if (nodeTagInput) {
      nodeTagInput.addEventListener("keydown", handleKeyDown)
    }

    return () => {
      if (nodeTagInput) {
        nodeTagInput.removeEventListener("keydown", handleKeyDown)
      }
    }
  }, [
    isOpen,
    hoveredIndex,
    options,
    selectedTags,
    handleSelectTag,
    clearSelectedTags,
    filteredOptions,
  ])

  const handleMouseEnterOption = useCallback(
    (index: number) => () => setHoveredIndex(index),
    [],
  )

  const handleMouseLeaveOptions = useCallback(() => setHoveredIndex(-1), [])

  const handleChangeQuery = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setHoveredIndex(-1)
      setQuery(event.target.value)
      setIsOpen(true)
    },
    [],
  )

  const toggleIsOpen = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      event.stopPropagation()
      setIsOpen((prevIsOpen) => !prevIsOpen)
    },
    [],
  )

  const actions = [
    {
      Icon: IoCloseSharp,
      onClick: () => setQuery(""),
    },
    {
      Icon: FaRegTrashAlt,
      onClick: clearSelectedTags,
    },
    {
      Icon: isOrMode ? GiLogicGateOr : GiLogicGateAnd,
      onClick: toggleFilterMode,
    },
    {
      Icon: FaCaretDown,
      onClick: toggleIsOpen,
    },
  ]

  return (
    <section className={cn("relative", className)}>
      <CardTitle asChild>
        <label
          htmlFor="blogs-select"
          onMouseEnter={() => setIsHover(true)}
          onMouseLeave={() => setIsHover(false)}
        >
          筛选
        </label>
      </CardTitle>

      <div
        className={cn(
          inputVariants(),
          "flex items-center p-0",
          isHover
            ? "border-gray-500 dark:border-gray-400"
            : "border-gray-400 dark:border-gray-500",
        )}
      >
        {selectedTags.length !== 0 ? (
          <ul
            ref={refSelectedTags}
            className="flex max-w-36 shrink-0 items-center gap-2 self-stretch overflow-x-hidden px-2"
          >
            {selectedTags.map((selectedTag) => {
              return (
                <li className="flex items-center" key={selectedTag.name}>
                  <Button size="small" onClick={handleSelectTag(selectedTag)}>
                    {selectedTag.name}
                  </Button>
                </li>
              )
            })}
          </ul>
        ) : null}

        <Input
          ref={refTagInput}
          id="blogs-select"
          variant="goast"
          className=""
          type="text"
          placeholder="筛选标签..."
          value={query}
          autoComplete="off"
          onChange={handleChangeQuery}
          onFocus={() => setIsOpen(true)}
          onClick={(event) => event.stopPropagation()}
        />

        <ul className="flex items-center gap-2.5 pr-2.5">
          {actions.map((action, index) => {
            const { Icon, onClick } = action
            return (
              <li key={index} className="flex items-center">
                <Button
                  variant="goast"
                  size="small"
                  // style={{ padding: "0" }}
                  onClick={onClick}
                >
                  <Icon data-slot="icon" />
                </Button>
              </li>
            )
          })}
        </ul>
      </div>

      <ul
        ref={refOptions}
        className={cn(
          "bg-content-bg absolute top-full z-40 mt-2.5 max-h-32 w-full",
          "rounded border border-gray-400 shadow",
          "overflow-y-auto transition-colors",
          isOpen ? "block" : "hidden",
        )}
        onClick={(event) => event.stopPropagation()}
        onMouseLeave={handleMouseLeaveOptions}
      >
        {filteredOptions.length === 0 ? (
          <li
            className={cn(
              "flex items-center justify-center px-2 py-4",
              "text-black/67 dark:text-white/67",
            )}
          >
            没有符合查询的标签...
          </li>
        ) : (
          filteredOptions.map((option, index) => {
            const parts = option.name.split(new RegExp(`(${query})`, "gi"))
            const isHovered = index === hoveredIndex
            const isSelected = selectedTags.includes(option)

            return (
              <li
                key={option.name}
                className={cn(
                  "flex h-8 cursor-pointer items-center justify-between px-2 select-none",
                  isHovered ? "bg-black/10 active:bg-black/20" : null,
                  isHovered ? "dark:bg-white/10 dark:active:bg-white/20" : null,
                  isSelected
                    ? "bg-sky-500 text-white hover:bg-sky-600 active:bg-sky-700"
                    : null,
                  isSelected
                    ? "text-white dark:bg-sky-500 dark:hover:bg-sky-600 dark:active:bg-sky-700"
                    : null,
                  // isSelected
                  //   ? "hover:bg-sky-600 dark:bg-blue-300 dark:text-black"
                  //   : null,
                  // isSelected ? "active:bg-sky-700" : "",
                )}
                onMouseEnter={handleMouseEnterOption(index)}
                onClick={handleSelectTag(option)}
              >
                <div>
                  {parts.map((part, index) => {
                    return part.toLocaleLowerCase() === query.toLowerCase() ? (
                      <span
                        key={index}
                        style={{ fontWeight: "bolder", color: "red" }}
                      >
                        {part}
                      </span>
                    ) : (
                      part
                    )
                  })}
                </div>
                <div>{option.count}</div>
              </li>
            )
          })
        )}
      </ul>
    </section>
  )
}

export default Select
