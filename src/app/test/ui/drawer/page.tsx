import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerClose,
  DrawerHeader,
  DrawerFooter,
} from "@/components/ui/drawer2"
import { Card, CardTitle, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { VscClose } from "react-icons/vsc"

export default function Page() {
  return (
    <Card className="mx-auto my-8 max-w-5xl">
      <CardTitle>Drawer</CardTitle>
      <CardContent>
        <Drawer>
          <DrawerTrigger>Open</DrawerTrigger>
          <DrawerContent>
            {/* <DrawerHeader className="bg-primary-color flex h-[50px] items-center gap-2.5 px-2.5 text-white">
              <DrawerClose asChild>
                <Button variant={"glass"}>
                  <VscClose data-slot="icon" />
                </Button>
              </DrawerClose>
              <h1 className="text-lg font-bold">lorem314.io</h1>
            </DrawerHeader> */}
            <div>
              <p>
                Drawer Content Lorem ipsum dolor sit amet consectetur
                adipisicing.
              </p>
            </div>
            {/* <DrawerHeader></DrawerHeader> */}
          </DrawerContent>
        </Drawer>
      </CardContent>
    </Card>
  )
}
