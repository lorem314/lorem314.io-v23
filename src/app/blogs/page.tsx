import { srcBlogPosts } from "@/lib/source"

import Layout from "@/components/blogs/Layout"
import { collectAllTags } from "@/lib/utils"

const allBlogPosts = srcBlogPosts.getPages().map((blogPost) => {
  return {
    id: blogPost.path,
    title: blogPost.data.title,
    tags: blogPost.data.tags,
    createdAt: blogPost.data.createdAt,
    url: blogPost.url,
    path: blogPost.path,
  }
})

export default function Page() {
  const allTags = collectAllTags(allBlogPosts)
  return <Layout allBlogPosts={allBlogPosts} allTags={allTags} />
}
