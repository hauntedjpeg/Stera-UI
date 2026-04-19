import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuItemShortcut,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default function DropdownMenuWithShortcuts() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger render={<Button variant="outline" className="w-fit" />}>
        Open
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuGroup>
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuItem>Profile<DropdownMenuItemShortcut>⇧⌘P</DropdownMenuItemShortcut></DropdownMenuItem>
          <DropdownMenuItem>Billing<DropdownMenuItemShortcut>⌘B</DropdownMenuItemShortcut></DropdownMenuItem>
          <DropdownMenuItem>Settings<DropdownMenuItemShortcut>⌘S</DropdownMenuItemShortcut></DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Log out<DropdownMenuItemShortcut>⇧⌘Q</DropdownMenuItemShortcut></DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
