import { type ChangeEvent } from "react"

import { CardTitle } from "../ui/card"
import { Input } from "../ui/input"
import { cn } from "@/lib/utils"

const Search = ({
  className,
  value,
  onChange,
}: {
  className?: string
  value: string
  onChange: (event: ChangeEvent<HTMLInputElement>) => void
}) => {
  return (
    <div className={cn("", className)}>
      <CardTitle asChild>
        <label htmlFor="blogs-search">搜索</label>
      </CardTitle>
      <Input
        id="blogs-search"
        type="search"
        name="blogs-search"
        placeholder="搜索标题..."
        autoComplete="off"
        value={value}
        onChange={onChange}
      />
    </div>
  )
}

export default Search
