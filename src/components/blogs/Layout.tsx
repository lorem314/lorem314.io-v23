"use client"

import {
  ChangeEvent,
  MouseEvent,
  useCallback,
  useEffect,
  useState,
} from "react"

import { Card, CardTitle, CardContent } from "@/components/ui/card"
import Search from "./Search"
import Select from "./Select"
import Drawer from "../ui/Drawer"
import AllTags from "./AllTags"
import BlogPostList from "./BlogPostList"
import useDebounce from "../hooks/useDebounce"
import useGlobalContext from "../hooks/useGlobalContext"
import { cn } from "@/lib/utils"
import type { BlogPost, Tag } from "@/types"

export default function Layout({
  allBlogPosts,
  allTags,
}: {
  allBlogPosts: BlogPost[]
  allTags: Tag[]
}) {
  const [blogPosts, setBlogPosts] = useState(allBlogPosts)
  const [selectedTags, setSelectedTags] = useState<Tag[]>([])
  const [isOrMode, setIsOrMode] = useState(true)
  const [query, setQuery] = useState("")
  const debouncedQuery = useDebounce(query, 500)

  const { showRightDrawerOpener, isRightDrawerOpen, rightDrawerHandler } =
    useGlobalContext()

  const handleSelectTag = useCallback(
    (tag: Tag) =>
      (
        event:
          | React.MouseEvent<HTMLButtonElement | HTMLLIElement>
          | KeyboardEvent,
      ) => {
        setSelectedTags((prevSelectedTags) => {
          const hasSelected = prevSelectedTags.includes(tag)
          if (hasSelected) {
            event.stopPropagation()
            return prevSelectedTags.filter((selectedTag) => selectedTag !== tag)
          } else {
            if (event.shiftKey) return [...prevSelectedTags, tag]
            else return [tag]
          }
        })
      },
    [],
  )

  const clearSelectedTags = useCallback(() => setSelectedTags([]), [])

  const handleChangeQuery = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setQuery(event.target.value)
    },
    [],
  )

  const toggleFilterMode = useCallback((event: MouseEvent) => {
    event.stopPropagation()
    setIsOrMode((_) => !_)
  }, [])

  useEffect(() => {
    setBlogPosts(
      allBlogPosts
        .filter((blogPost) => {
          if (!debouncedQuery) return true
          const lowercasedQuery = debouncedQuery.toLowerCase()
          const lowercasedBlogPostTitle = blogPost.title.toLowerCase()
          return lowercasedBlogPostTitle.includes(lowercasedQuery)
        })
        .filter((blogPost) => {
          if (selectedTags.length === 0) return true
          return selectedTags
            .map((tag) => blogPost.tags.includes(tag.name))
            [isOrMode ? "some" : "every"]((b) => b)
        }),
    )
  }, [debouncedQuery, selectedTags, isOrMode, allBlogPosts])

  console.log("allBlogPosts", allBlogPosts)
  console.log("allTags", allTags)

  return (
    <div className="mx-auto my-8 grid max-w-6xl grid-cols-8 gap-2.5">
      <Card className="col-span-8 grid grid-cols-2 gap-2.5">
        <Search
          className="col-span-full md:col-span-1"
          value={query}
          onChange={handleChangeQuery}
        />
        <Select
          className="col-span-full md:col-span-1"
          options={allTags}
          selectedTags={selectedTags}
          onSelectTag={handleSelectTag}
          clearSelectedTags={clearSelectedTags}
          isOrMode={isOrMode}
          toggleFilterMode={toggleFilterMode}
        />
      </Card>

      <Card
        className={cn(showRightDrawerOpener ? "col-span-full" : "col-span-5")}
      >
        <CardTitle asChild>
          <h2>博客</h2>
        </CardTitle>
        <CardContent>
          <BlogPostList blogPosts={blogPosts} />
        </CardContent>
      </Card>

      {showRightDrawerOpener ? (
        <Drawer
          isOpen={isRightDrawerOpen}
          onClose={rightDrawerHandler.close}
          placement="right"
          size={360}
          title="所有标签"
        >
          {() => {
            return (
              <div className="p-2.5">
                <AllTags
                  allTags={allTags}
                  selectedTags={selectedTags}
                  handleSelectTag={handleSelectTag}
                />
              </div>
            )
          }}
        </Drawer>
      ) : (
        <Card className="col-span-3">
          <CardTitle asChild>
            <h2>标签</h2>
          </CardTitle>
          <CardContent>
            <AllTags
              allTags={allTags}
              selectedTags={selectedTags}
              handleSelectTag={handleSelectTag}
            />
          </CardContent>
        </Card>
      )}
    </div>
  )
}
