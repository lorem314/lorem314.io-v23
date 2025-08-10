"use client"

import { cn } from "@/lib/utils"
import type { Tag } from "@/types"
import Kbd from "../ui/kbd"

export default function AllTags({
  allTags,
  selectedTags,
  handleSelectTag,
}: {
  allTags: Tag[]
  selectedTags: Tag[]
  handleSelectTag: (
    tag: Tag,
  ) => (event: React.MouseEvent<HTMLButtonElement> | KeyboardEvent) => void
}) {
  return (
    <ul className="flex flex-wrap items-center gap-x-2.5 gap-y-3">
      {allTags.map((tag) => {
        const isSelected = selectedTags.includes(tag)
        return (
          <li key={tag.name}>
            <Kbd asChild isPressed={isSelected}>
              <button onClick={handleSelectTag(tag)}>{tag.name}</button>
            </Kbd>
          </li>
        )
      })}
    </ul>
  )
}
