import React from "react"
import type { MDXProps } from "mdx/types"

import { cn } from "@/lib/utils"
import { Card, CardContent } from "../ui/card"
import { H2, H3, H4, H5, H6, InlineCode } from "../ui/typography"
import Code from "../codehike/code"

const Body = ({ Mdx }: { Mdx: React.FC<MDXProps> }) => {
  return (
    //   "bg-content-bg my-2.5 rounded border border-transparent
    //  px-8 py-6 shadow transition-colors",
    <Card className="mt-4 px-8 py-6">
      <Mdx
        components={{
          h2: H2,
          h3: H3,
          h4: H4,
          h5: H5,
          h6: H6,
          code: InlineCode,
          CodeHikePre: Code,
        }}
      />

      {/* {Array(30)
        .fill(null)
        .map((_, index) => {
          return <Lorem key={index} />
        })} */}
    </Card>
  )
}

export default React.memo(Body)

const lorem =
  "Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis ipsum totam doloribus quia, facere ea! Doloribus temporibus possimus optio autem pariatur praesentium placeat, voluptate quia repellendus dolores, doloremque quas? Labore tempora iste non quae molestias eum quia alias dolor velit consectetur natus soluta tempore inventore minima nam voluptatem quidem ea, optio, culpa facilis. Earum reprehenderit numquam doloribus iure, sed fuga incidunt molestias quam quo, exercitationem laboriosam? Illo sint quibusdam labore laudantium tenetur aliquam autem, nisi error iusto inventore dolores delectus, recusandae exercitationem! Accusantium exercitationem, officia quidem laborum quae in, necessitatibus consectetur ea inventore fuga nihil facilis, commodi quo sed iure esse earum maxime! Beatae, voluptate! Sit veniam quos eius, suscipit repellat animi architecto molestiae sed exercitationem libero vero obcaecati eum placeat voluptatem cupiditate alias maiores repudiandae deleniti. Voluptas recusandae veniam voluptatum accusantium aliquid? Quos vel velit error pariatur sunt delectus ea magnam? Architecto libero suscipit officia eos, numquam perspiciatis provident ratione sequi quidem voluptas ab repudiandae cum cumque facilis necessitatibus laudantium ea rem. Nihil voluptas eos culpa asperiores accusantium aliquam delectus facilis odio repellendus quod rem, voluptatibus sequi similique sapiente commodi dolor harum, vero odit quisquam saepe reprehenderit? Libero obcaecati adipisci praesentium quis perspiciatis, labore fuga dignissimos similique, voluptates dolorem reprehenderit optio, rem aut ex eum excepturi consequatur earum ducimus tempora natus harum distinctio modi accusamus aspernatur! Doloribus facere temporibus odio repellat vel eos dolorum? Eum modi veritatis, necessitatibus libero officia dignissimos totam, accusamus repellendus, eos enim eligendi iste. Explicabo, impedit, totam non fuga placeat minus ducimus odit sequi voluptatibus, quod deserunt nihil perferendis libero quam. Perferendis ullam et eveniet voluptas a natus, earum provident rerum accusantium vel beatae atque, rem est. Debitis quasi rerum quia unde natus iste sit recusandae odit dolores, quod sunt reprehenderit cumque, mollitia ut. Distinctio perspiciatis inventore ipsa ipsum, vel eveniet sed dignissimos minus odit mollitia autem. Itaque consequuntur consectetur asperiores unde vel a omnis! Odio neque labore soluta."

const Lorem = () => {
  return <p className="my-4">{lorem.slice(0, Math.random() * 314)}</p>
}
