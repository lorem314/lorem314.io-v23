import { RiCloseLine } from "react-icons/ri"
import { GrFormClose } from "react-icons/gr"
import { VscChromeClose } from "react-icons/vsc"

import { Button } from "@/components/ui/button"

export default function Page() {
  return (
    <div className="my-8 flex items-center bg-white">
      <Button variant="goast" size="small">
        <RiCloseLine data-slot="icon" />
      </Button>
      <Button variant="goast" size="small">
        <GrFormClose data-slot="icon" />
      </Button>
      <Button variant="goast" size="small">
        <VscChromeClose data-slot="icon" />
      </Button>
    </div>
  )
}
