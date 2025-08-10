import { Card, CardContent, CardTitle } from "@/components/ui/card"

export default function Page() {
  return (
    <Card className="max-w-4xl" variant="page">
      <CardTitle asChild>
        <h2>Typography</h2>
      </CardTitle>
      <CardContent>
        <h1 className="mt-14 mb-4 text-[1.75rem] font-bold">一级标题</h1>
        <p>测试文字</p>
        <h2 className="mt-12 mb-4 text-[1.625rem] font-bold">二级标题</h2>
        <p>测试文字</p>
        <h3 className="mt-10 mb-4 text-[1.5rem] font-bold">三级标题</h3>
        <p>测试文字</p>
        <h4 className="mt-8 mb-4 text-[1.375rem] font-bold">四级标题</h4>
        <p>测试文字</p>
        <h5 className="mt-6 mb-4 text-[1.25rem] font-bold">五级标题</h5>
        <p>测试文字</p>
        <h6 className="mt-4 mb-4 text-[1.125rem] font-bold">六级标题</h6>
        <p>测试文字</p>
      </CardContent>
    </Card>
  )
}
