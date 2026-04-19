import { SiArchive, SiPencil, SiShare, SiTrash } from "stera-icons"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default function DropdownMenuDestructive() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger render={<Button variant="outline" className="w-fit" />}>
        Actions
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem><SiPencil />Edit</DropdownMenuItem>
        <DropdownMenuItem><SiShare />Share</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem><SiArchive />Archive</DropdownMenuItem>
        <DropdownMenuItem variant="danger"><SiTrash />Delete</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
