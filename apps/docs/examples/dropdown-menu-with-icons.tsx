import { SiCreditCard, SiSettings, SiSignOut, SiUser } from "stera-icons"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default function DropdownMenuWithIcons() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger render={<Button variant="outline" className="w-fit" />}>
        Open
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem><SiUser />Profile</DropdownMenuItem>
        <DropdownMenuItem><SiCreditCard />Billing</DropdownMenuItem>
        <DropdownMenuItem><SiSettings />Settings</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem variant="danger"><SiSignOut />Log out</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
