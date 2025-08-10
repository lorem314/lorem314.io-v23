import { cn } from "@/lib/utils"

const Tags = ({ className, tags }: { className?: string; tags: string[] }) => {
  return (
    <ul className={cn("flex flex-wrap items-center gap-2.5", className)}>
      {tags.map((tag, index) => {
        return (
          <li
            key={index}
            className="rounded border-1 border-current/38 px-2 py-1"
          >
            {tag}
          </li>
        )
      })}
    </ul>
  )
}

export default Tags
