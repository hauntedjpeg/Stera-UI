import * as React from "react"
import type { Meta, StoryObj } from "@storybook/react-vite"
import {
  SiUser,
  SiSettings,
  SiCreditCard,
  SiSignOut,
  SiPlus,
  SiMail,
  SiShare,
  SiArchive,
  SiCopy,
  SiLink,
  SiPencil,
  SiTrash,
  SiKeyboard,
  SiBell,
  SiSliders,
  SiLayoutGrid,
  SiSidebarLeft,
  SiArrowBigUp,
  SiArrowBigDown,
  SiArrowRight,
  SiBank,
  SiFolder,
  SiFolderOpen,
  SiSave,
  SiDownload,
  SiEye,
  SiCode,
  SiChatBox,
  SiChevronsDown,
  SiCheck,
} from "stera-icons"

import { Avatar, AvatarFallback, AvatarImage } from "./avatar"
import { Button } from "./button"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuItemContent,
  DropdownMenuItemDescription,
  DropdownMenuItemShortcut,
  DropdownMenuItemTitle,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "./dropdown-menu"

const meta: Meta<typeof DropdownMenu> = {
  title: "UI/DropdownMenu",
  component: DropdownMenu,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
}

export default meta
type Story = StoryObj<typeof DropdownMenu>

export const Basic: Story = {
  render: () => (
    <DropdownMenu>
      <DropdownMenuTrigger render={<Button variant="outline" className="w-fit" />}>
        Open
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuGroup>
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuItem>Profile</DropdownMenuItem>
          <DropdownMenuItem>Billing</DropdownMenuItem>
          <DropdownMenuItem>Settings</DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem>GitHub</DropdownMenuItem>
        <DropdownMenuItem>Support</DropdownMenuItem>
        <DropdownMenuItem disabled>API</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ),
}

export const Submenu: Story = {
  render: () => (
    <DropdownMenu>
      <DropdownMenuTrigger render={<Button variant="outline" className="w-fit" />}>
        Open
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuGroup>
          <DropdownMenuItem>Team</DropdownMenuItem>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>Invite users</DropdownMenuSubTrigger>
            <DropdownMenuSubContent>
              <DropdownMenuItem>Email</DropdownMenuItem>
              <DropdownMenuItem>Message</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>More...</DropdownMenuItem>
            </DropdownMenuSubContent>
          </DropdownMenuSub>
          <DropdownMenuItem>
            New Team
            <DropdownMenuItemShortcut>⌘+T</DropdownMenuItemShortcut>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  ),
}

export const Shortcuts: Story = {
  render: () => (
    <DropdownMenu>
      <DropdownMenuTrigger render={<Button variant="outline" className="w-fit" />}>
        Open
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuGroup>
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuItem>
            Profile
            <DropdownMenuItemShortcut>⇧⌘P</DropdownMenuItemShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>
            Billing
            <DropdownMenuItemShortcut>⌘B</DropdownMenuItemShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>
            Settings
            <DropdownMenuItemShortcut>⌘S</DropdownMenuItemShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>
            Keyboard shortcuts
            <DropdownMenuItemShortcut>⌘K</DropdownMenuItemShortcut>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          Log out
          <DropdownMenuItemShortcut>⇧⌘Q</DropdownMenuItemShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ),
}

export const Icons: Story = {
  render: () => (
    <DropdownMenu>
      <DropdownMenuTrigger render={<Button variant="outline" className="w-fit" />}>
        Open
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>
          <SiUser />
          Profile
        </DropdownMenuItem>
        <DropdownMenuItem>
          <SiCreditCard />
          Billing
        </DropdownMenuItem>
        <DropdownMenuItem>
          <SiSettings />
          Settings
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem variant="danger">
          <SiSignOut />
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ),
}

function CheckboxesDemo() {
  const [showStatusBar, setShowStatusBar] = React.useState(true)
  const [showActivityBar, setShowActivityBar] = React.useState(false)
  const [showPanel, setShowPanel] = React.useState(false)

  return (
    <DropdownMenu>
      <DropdownMenuTrigger render={<Button variant="outline" className="w-fit" />}>
        Checkboxes
      </DropdownMenuTrigger>
      <DropdownMenuContent className="min-w-40">
        <DropdownMenuGroup>
          <DropdownMenuLabel>Appearance</DropdownMenuLabel>
          <DropdownMenuCheckboxItem
            checked={showStatusBar}
            onCheckedChange={setShowStatusBar}
          >
            Status Bar
          </DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem
            checked={showActivityBar}
            onCheckedChange={setShowActivityBar}
            disabled
          >
            Activity Bar
          </DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem
            checked={showPanel}
            onCheckedChange={setShowPanel}
          >
            Panel
          </DropdownMenuCheckboxItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export const Checkboxes: Story = {
  render: () => <CheckboxesDemo />,
}

function CheckboxesIconsDemo() {
  const [notifications, setNotifications] = React.useState({
    email: true,
    sms: false,
    push: true,
  })

  return (
    <DropdownMenu>
      <DropdownMenuTrigger render={<Button variant="outline" className="w-fit" />}>
        Notifications
      </DropdownMenuTrigger>
      <DropdownMenuContent className="min-w-56">
        <DropdownMenuGroup>
          <DropdownMenuLabel>Notification Preferences</DropdownMenuLabel>
          <DropdownMenuCheckboxItem
            checked={notifications.email}
            onCheckedChange={(checked) =>
              setNotifications({ ...notifications, email: checked === true })
            }
          >
            <SiMail />
            Email notifications
          </DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem
            checked={notifications.sms}
            onCheckedChange={(checked) =>
              setNotifications({ ...notifications, sms: checked === true })
            }
          >
            <SiChatBox />
            SMS notifications
          </DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem
            checked={notifications.push}
            onCheckedChange={(checked) =>
              setNotifications({ ...notifications, push: checked === true })
            }
          >
            <SiBell />
            Push notifications
          </DropdownMenuCheckboxItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export const CheckboxesIcons: Story = {
  render: () => <CheckboxesIconsDemo />,
}

function RadioGroupDemo() {
  const [position, setPosition] = React.useState("bottom")

  return (
    <DropdownMenu>
      <DropdownMenuTrigger render={<Button variant="outline" className="w-fit" />}>
        Radio Group
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuGroup>
          <DropdownMenuLabel>Panel Position</DropdownMenuLabel>
          <DropdownMenuRadioGroup value={position} onValueChange={setPosition}>
            <DropdownMenuRadioItem value="top">Top</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="bottom">Bottom</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="right" disabled>Right</DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export const RadioGroup: Story = {
  render: () => <RadioGroupDemo />,
}

function RadioIconsDemo() {
  const [paymentMethod, setPaymentMethod] = React.useState("card")

  return (
    <DropdownMenu>
      <DropdownMenuTrigger render={<Button variant="outline" className="w-fit" />}>
        Payment Method
      </DropdownMenuTrigger>
      <DropdownMenuContent className="min-w-56">
        <DropdownMenuGroup>
          <DropdownMenuLabel>Select Payment Method</DropdownMenuLabel>
          <DropdownMenuRadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
            <DropdownMenuRadioItem value="card">
              <SiCreditCard />
              Credit Card
            </DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="paypal">
              <SiCheck />
              PayPal
            </DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="bank">
              <SiBank />
              Bank Transfer
            </DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export const RadioIcons: Story = {
  render: () => <RadioIconsDemo />,
}

export const Destructive: Story = {
  render: () => (
    <DropdownMenu>
      <DropdownMenuTrigger render={<Button variant="outline" className="w-fit" />}>
        Actions
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>
          <SiPencil />
          Edit
        </DropdownMenuItem>
        <DropdownMenuItem>
          <SiShare />
          Share
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <SiArchive />
          Archive
        </DropdownMenuItem>
        <DropdownMenuItem variant="danger">
          <SiTrash />
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ),
}

const avatarMenuContent = (
  <>
    <DropdownMenuGroup>
      <DropdownMenuItem>
        <SiCheck />
        Account
      </DropdownMenuItem>
      <DropdownMenuItem>
        <SiCreditCard />
        Billing
      </DropdownMenuItem>
      <DropdownMenuItem>
        <SiBell />
        Notifications
      </DropdownMenuItem>
    </DropdownMenuGroup>
    <DropdownMenuSeparator />
    <DropdownMenuItem>
      <SiSignOut />
      Sign Out
    </DropdownMenuItem>
  </>
)

export const AvatarTrigger: Story = {
  render: () => (
    <div className="flex items-center justify-between gap-4">
      <DropdownMenu>
        <DropdownMenuTrigger
          render={
            <Button
              variant="outline"
              className="h-12 justify-start px-2 md:max-w-[200px]"
            />
          }
        >
          <Avatar>
            <AvatarImage src="/images/demo-image.png" alt="Sofia Collins" />
            <AvatarFallback>SC</AvatarFallback>
          </Avatar>
          <div className="grid flex-1 text-left text-sm leading-tight">
            <span className="truncate font-semibold">Sofia Collins</span>
            <span className="truncate text-xs text-muted-foreground">
              sofia@example.com
            </span>
          </div>
          <SiChevronsDown className="ml-auto text-muted-foreground" />
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-(--anchor-width) min-w-56">
          {avatarMenuContent}
        </DropdownMenuContent>
      </DropdownMenu>

      <DropdownMenu>
        <DropdownMenuTrigger
          render={<Button variant="ghost" size="icon" className="rounded-full" />}
        >
          <Avatar>
            <AvatarImage src="/images/demo-image.png" alt="Sofia Collins" />
            <AvatarFallback>SC</AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" side="top">
          {avatarMenuContent}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  ),
}

function ComplexDemo() {
  const [view, setView] = React.useState({
    sidebar: true,
    statusBar: false,
  })
  const [theme, setTheme] = React.useState("light")

  return (
    <DropdownMenu>
      <DropdownMenuTrigger render={<Button variant="outline" className="w-fit" />}>
        Complex Menu
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuGroup>
          <DropdownMenuLabel>File</DropdownMenuLabel>
          <DropdownMenuItem>
            <SiFolder />
            New File
            <DropdownMenuItemShortcut>⌘N</DropdownMenuItemShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <SiFolder />
            New Folder
            <DropdownMenuItemShortcut>⇧⌘N</DropdownMenuItemShortcut>
          </DropdownMenuItem>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>
              <SiFolderOpen />
              Open Recent
            </DropdownMenuSubTrigger>
            <DropdownMenuSubContent>
              <DropdownMenuGroup>
                <DropdownMenuLabel>Recent Projects</DropdownMenuLabel>
                <DropdownMenuItem>
                  <SiCode />
                  Project Alpha
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <SiCode />
                  Project Beta
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <SiFolder />
                Browse...
              </DropdownMenuItem>
            </DropdownMenuSubContent>
          </DropdownMenuSub>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <SiSave />
            Save
            <DropdownMenuItemShortcut>⌘S</DropdownMenuItemShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <SiDownload />
            Export
            <DropdownMenuItemShortcut>⇧⌘E</DropdownMenuItemShortcut>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuLabel>View</DropdownMenuLabel>
          <DropdownMenuCheckboxItem
            checked={view.sidebar}
            onCheckedChange={(checked) =>
              setView({ ...view, sidebar: checked === true })
            }
          >
            <SiSidebarLeft />
            Show Sidebar
          </DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem
            checked={view.statusBar}
            onCheckedChange={(checked) =>
              setView({ ...view, statusBar: checked === true })
            }
          >
            <SiLayoutGrid />
            Show Status Bar
          </DropdownMenuCheckboxItem>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>
              <SiSliders />
              Theme
            </DropdownMenuSubTrigger>
            <DropdownMenuSubContent>
              <DropdownMenuGroup>
                <DropdownMenuLabel>Appearance</DropdownMenuLabel>
                <DropdownMenuRadioGroup value={theme} onValueChange={setTheme}>
                  <DropdownMenuRadioItem value="light">Light</DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="dark">Dark</DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="system">System</DropdownMenuRadioItem>
                </DropdownMenuRadioGroup>
              </DropdownMenuGroup>
            </DropdownMenuSubContent>
          </DropdownMenuSub>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export const Complex: Story = {
  render: () => <ComplexDemo />,
}

export const TitleDescription: Story = {
  render: () => (
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
        <DropdownMenuItem>
          <SiSettings />
          <DropdownMenuItemContent>
            <DropdownMenuItemTitle>Settings</DropdownMenuItemTitle>
            <DropdownMenuItemDescription>Configure preferences</DropdownMenuItemDescription>
          </DropdownMenuItemContent>
          <DropdownMenuItemShortcut>⌘S</DropdownMenuItemShortcut>
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
  ),
}
