import type { Meta, StoryObj } from "@storybook/react-vite"
import { SiLock, SiMusic, SiSettings, SiUser, SiVideo } from "stera-icons"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "./tabs"

const meta: Meta<typeof Tabs> = {
  title: "UI/Tabs",
  component: Tabs,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
}

export default meta
type Story = StoryObj<typeof Tabs>

export const Default: Story = {
  render: () => (
    <Tabs defaultValue="account" className="w-[400px]">
      <TabsList>
        <TabsTrigger value="account">Account</TabsTrigger>
        <TabsTrigger value="password">Password</TabsTrigger>
      </TabsList>
      <TabsContent value="account">
        Make changes to your account here.
      </TabsContent>
      <TabsContent value="password">Change your password here.</TabsContent>
    </Tabs>
  ),
}

export const Line: Story = {
  render: () => (
    <Tabs defaultValue="account" className="w-[400px]">
      <TabsList variant="line">
        <TabsTrigger value="account">Account</TabsTrigger>
        <TabsTrigger value="password">Password</TabsTrigger>
      </TabsList>
      <TabsContent value="account">
        Make changes to your account here.
      </TabsContent>
      <TabsContent value="password">Change your password here.</TabsContent>
    </Tabs>
  ),
}

export const Vertical: Story = {
  render: () => (
    <Tabs defaultValue="account" orientation="vertical" className="w-[400px]">
      <TabsList>
        <TabsTrigger value="account">Account</TabsTrigger>
        <TabsTrigger value="password">Password</TabsTrigger>
        <TabsTrigger value="settings">Settings</TabsTrigger>
      </TabsList>
      <TabsContent value="account">
        Make changes to your account here.
      </TabsContent>
      <TabsContent value="password">Change your password here.</TabsContent>
      <TabsContent value="settings">Update your settings here.</TabsContent>
    </Tabs>
  ),
}

export const Disabled: Story = {
  render: () => (
    <Tabs defaultValue="account" className="w-[400px]">
      <TabsList>
        <TabsTrigger value="account">Account</TabsTrigger>
        <TabsTrigger value="password" disabled>
          Password
        </TabsTrigger>
        <TabsTrigger value="settings">Settings</TabsTrigger>
      </TabsList>
      <TabsContent value="account">
        Make changes to your account here.
      </TabsContent>
      <TabsContent value="password">Change your password here.</TabsContent>
      <TabsContent value="settings">Update your settings here.</TabsContent>
    </Tabs>
  ),
}

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col gap-6 w-[400px]">
      <Tabs defaultValue="account">
        <TabsList size="sm">
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="password">Password</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>
        <TabsContent value="account">Small tabs (default).</TabsContent>
      </Tabs>
      <Tabs defaultValue="account">
        <TabsList size="md">
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="password">Password</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>
        <TabsContent value="account">Medium tabs.</TabsContent>
      </Tabs>
      <Tabs defaultValue="account">
        <TabsList size="lg">
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="password">Password</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>
        <TabsContent value="account">Large tabs.</TabsContent>
      </Tabs>
    </div>
  ),
}

export const SizesLine: Story = {
  render: () => (
    <div className="flex flex-col gap-6 w-[400px]">
      <Tabs defaultValue="account">
        <TabsList variant="line" size="sm">
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="password">Password</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>
        <TabsContent value="account">Small line tabs (default).</TabsContent>
      </Tabs>
      <Tabs defaultValue="account">
        <TabsList variant="line" size="md">
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="password">Password</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>
        <TabsContent value="account">Medium line tabs.</TabsContent>
      </Tabs>
      <Tabs defaultValue="account">
        <TabsList variant="line" size="lg">
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="password">Password</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>
        <TabsContent value="account">Large line tabs.</TabsContent>
      </Tabs>
    </div>
  ),
}

export const Icons: Story = {
  render: () => (
    <Tabs defaultValue="music" className="w-[400px]">
      <TabsList>
        <TabsTrigger value="music">
          <SiMusic />
          Music
        </TabsTrigger>
        <TabsTrigger value="video">
          <SiVideo />
          Video
        </TabsTrigger>
        <TabsTrigger value="settings">
          <SiSettings />
          Settings
        </TabsTrigger>
      </TabsList>
      <TabsContent value="music">Browse your music library.</TabsContent>
      <TabsContent value="video">Watch your saved videos.</TabsContent>
      <TabsContent value="settings">Manage your preferences.</TabsContent>
    </Tabs>
  ),
}
