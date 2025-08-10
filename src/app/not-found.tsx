import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card"

export default function NotFound() {
  return (
    <Card variant={"page"} className="max-w-3xl">
      <CardHeader>
        <CardTitle asChild>
          <h2>404</h2>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p>抱歉，没有找到你想要的页面...</p>
      </CardContent>
      <CardFooter></CardFooter>
    </Card>
  )
}
