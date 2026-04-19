import { SiCreditCard, SiSignOut, SiUser } from "stera-icons"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuItemContent,
  DropdownMenuItemDescription,
  DropdownMenuItemShortcut,
  DropdownMenuItemTitle,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default function DropdownMenuTitleDescription() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger render={<Button variant="outline" className="w-fit" />}>
        Open
      </DropdownMenuTrigger>
      <DropdownMenuContent className="min-w-56">
        <DropdownMenuItem>
          <SiUser />
          <DropdownMenuItemContent>
            <DropdownMenuItemTitle>Profile</DropdownMenuItemTitle>
            <DropdownMenuItemDescription>View and edit your profile</DropdownMenuItemDescription>
          </DropdownMenuItemContent>
          <DropdownMenuItemShortcut>⇧⌘P</DropdownMenuItemShortcut>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <SiCreditCard />
          <DropdownMenuItemContent>
            <DropdownMenuItemTitle>Billing</DropdownMenuItemTitle>
            <DropdownMenuItemDescription>Manage your subscription</DropdownMenuItemDescription>
          </DropdownMenuItemContent>
          <DropdownMenuItemShortcut>⌘B</DropdownMenuItemShortcut>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem variant="danger">
          <SiSignOut />
          <DropdownMenuItemContent>
            <DropdownMenuItemTitle>Log out</DropdownMenuItemTitle>
            <DropdownMenuItemDescription>Sign out of your account</DropdownMenuItemDescription>
          </DropdownMenuItemContent>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
