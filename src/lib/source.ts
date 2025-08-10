import { createMDXSource } from "fumadocs-mdx"
import { loader } from "fumadocs-core/source"
import { blogPosts } from "@/.source"

export const srcBlogPosts = loader({
  baseUrl: "/blogs",
  source: createMDXSource(blogPosts),
})
