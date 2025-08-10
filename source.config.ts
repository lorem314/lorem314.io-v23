import {
  defineCollections,
  frontmatterSchema,
  defineConfig,
} from "fumadocs-mdx/config"
import { remarkHeading } from "fumadocs-core/mdx-plugins"
import {
  remarkCodeHike,
  recmaCodeHike,
  type CodeHikeConfig,
} from "codehike/mdx"
import { z } from "zod"

export const blogPosts = defineCollections({
  type: "doc",
  dir: "content/blog-posts",
  schema: frontmatterSchema.extend({
    title: z.string(),
    tags: z.array(z.string()),
    createdAt: z.string(),
  }),
})

const chConfig: CodeHikeConfig = {
  components: {
    code: "CodeHikePre",
  },
}

export default defineConfig({
  mdxOptions: {
    remarkPlugins: (v) => [
      [remarkCodeHike, chConfig],
      // remarkHeading,
      ...v,
    ],
    recmaPlugins: [[recmaCodeHike, chConfig]],
  },
})
