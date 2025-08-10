import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "@/components/ui/card"

export default function Home() {
  return (
    <Card className="container max-w-4xl" variant={"page"}>
      <CardHeader>
        <CardTitle>主页</CardTitle>
        <CardDescription>欢迎来到我的博客</CardDescription>
        {/* <CardAction>Card Action</CardAction> */}
      </CardHeader>
      <CardContent>
        <p>目前博客还在开发中，将在不久的将来开始更新...</p>
      </CardContent>
      {/* <p className="bg-[hsl(0_63%_31%)] text-[hsl(210_40%_98%)]">Error</p> */}
      {/* <CardFooter>
        <p>敬请期待</p>
      </CardFooter> */}
      {/* <div className="animate-in fade-in slide-in-from-top-8 duration-500">
        Fade in from 0% opacity,
        <br />
        slide from top by 8 spacing units (2rem),
        <br />
        with a 500ms duration.
      </div> */}
    </Card>
  )
}
