import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "@/components/ui/menubar"

export default function MenubarDisabledMenu() {
  return (
    <Menubar>
      <MenubarMenu>
        <MenubarTrigger>File</MenubarTrigger>
        <MenubarContent>
          <MenubarItem>New File</MenubarItem>
          <MenubarItem>Open</MenubarItem>
          <MenubarItem>Save</MenubarItem>
        </MenubarContent>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger>Edit</MenubarTrigger>
        <MenubarContent>
          <MenubarItem>Cut</MenubarItem>
          <MenubarItem>Copy</MenubarItem>
          <MenubarItem>Paste</MenubarItem>
        </MenubarContent>
      </MenubarMenu>
      <MenubarMenu disabled>
        <MenubarTrigger>Help</MenubarTrigger>
      </MenubarMenu>
    </Menubar>
  )
}
