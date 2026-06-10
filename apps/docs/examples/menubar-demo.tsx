import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
} from "@/components/ui/menubar"

export default function MenubarDemo() {
  return (
    <Menubar>
      <MenubarMenu>
        <MenubarTrigger>File</MenubarTrigger>
        <MenubarContent>
          <MenubarItem>
            New File<MenubarShortcut>⌘N</MenubarShortcut>
          </MenubarItem>
          <MenubarItem>
            Open<MenubarShortcut>⌘O</MenubarShortcut>
          </MenubarItem>
          <MenubarItem>
            Save<MenubarShortcut>⌘S</MenubarShortcut>
          </MenubarItem>
          <MenubarSub>
            <MenubarSubTrigger>Export</MenubarSubTrigger>
            <MenubarSubContent>
              <MenubarItem>PDF</MenubarItem>
              <MenubarItem>PNG</MenubarItem>
              <MenubarItem>SVG</MenubarItem>
            </MenubarSubContent>
          </MenubarSub>
          <MenubarSeparator />
          <MenubarItem variant="danger">Delete</MenubarItem>
        </MenubarContent>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger>Edit</MenubarTrigger>
        <MenubarContent>
          <MenubarItem>
            Cut<MenubarShortcut>⌘X</MenubarShortcut>
          </MenubarItem>
          <MenubarItem>
            Copy<MenubarShortcut>⌘C</MenubarShortcut>
          </MenubarItem>
          <MenubarItem>
            Paste<MenubarShortcut>⌘V</MenubarShortcut>
          </MenubarItem>
          <MenubarSeparator />
          <MenubarItem disabled>
            Undo<MenubarShortcut>⌘Z</MenubarShortcut>
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger>View</MenubarTrigger>
        <MenubarContent>
          <MenubarItem>
            Zoom In<MenubarShortcut>⌘+</MenubarShortcut>
          </MenubarItem>
          <MenubarItem>
            Zoom Out<MenubarShortcut>⌘-</MenubarShortcut>
          </MenubarItem>
          <MenubarSeparator />
          <MenubarItem>Full Screen</MenubarItem>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  )
}
