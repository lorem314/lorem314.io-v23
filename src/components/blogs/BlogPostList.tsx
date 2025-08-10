import Link from "next/link"

import Tags from "../blog/Tags"
import { getTimesAgo } from "@/lib/utils"
import { BlogPost } from "@/types"

export default function BlogPostList({ blogPosts }: { blogPosts: BlogPost[] }) {
  return (
    <ul className="flex flex-col gap-4">
      {blogPosts.map((blogPost) => {
        return (
          <li key={blogPost.id}>
            <article>
              <header>
                <h3 className="text-link-color text-lg font-bold">
                  <Link href={blogPost.url}>{blogPost.title}</Link>
                </h3>
              </header>
              <div className="my-2.5 text-sm">
                <Tags tags={blogPost.tags} />
              </div>
              <div>
                发布于{" "}
                <time dateTime={blogPost.createdAt}>
                  {getTimesAgo(blogPost.createdAt)}前
                </time>
              </div>
            </article>
          </li>
        )
      })}
    </ul>
  )
}
