import { notFound } from "next/navigation"
import { srcBlogPosts } from "@/lib/source"

import Layout from "@/components/article/Layout"
import Body from "@/components/article/Body"
import { Card, CardHeader } from "@/components/ui/card"
import { H1 } from "@/components/ui/typography"
import Tags from "@/components/blog/Tags"
import { getDate } from "@/lib/utils"

export default async function Page(props: {
  params: Promise<{ title: string }>
}) {
  const params = await props.params
  const blogPost = srcBlogPosts.getPage([params.title])

  if (!blogPost) notFound()

  const Mdx = blogPost.data.body

  return (
    <Layout title={blogPost.data.title} toc={blogPost.data.toc}>
      <>
        <Card asChild>
          <CardHeader className="px-8 pb-8">
            <H1 className="text-">{blogPost.data.title}</H1>
            <Tags className="my-4" tags={blogPost.data.tags} />
            <p>发布于 {getDate(blogPost.data.createdAt)}</p>
          </CardHeader>
        </Card>
        <Body Mdx={Mdx} />
      </>
    </Layout>
  )
}
