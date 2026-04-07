"use client"

import { SiMusic, SiSettings, SiVideo } from "stera-icons"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { Preview } from "@/components/preview"

export function TabsDefault() {
  return (
    <Preview>
      <Tabs defaultValue="account" className="w-[400px]">
        <TabsList>
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="password">Password</TabsTrigger>
        </TabsList>
        <TabsContent value="account">Make changes to your account here.</TabsContent>
        <TabsContent value="password">Change your password here.</TabsContent>
      </Tabs>
    </Preview>
  )
}

export function TabsLine() {
  return (
    <Preview>
      <Tabs defaultValue="account" className="w-[400px]">
        <TabsList variant="line">
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="password">Password</TabsTrigger>
        </TabsList>
        <TabsContent value="account">Make changes to your account here.</TabsContent>
        <TabsContent value="password">Change your password here.</TabsContent>
      </Tabs>
    </Preview>
  )
}

export function TabsVertical() {
  return (
    <Preview>
      <Tabs defaultValue="account" orientation="vertical" className="w-[400px]">
        <TabsList>
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="password">Password</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>
        <TabsContent value="account">Make changes to your account here.</TabsContent>
        <TabsContent value="password">Change your password here.</TabsContent>
        <TabsContent value="settings">Update your settings here.</TabsContent>
      </Tabs>
    </Preview>
  )
}

export function TabsDisabled() {
  return (
    <Preview>
      <Tabs defaultValue="account" className="w-[400px]">
        <TabsList>
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="password" disabled>Password</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>
        <TabsContent value="account">Make changes to your account here.</TabsContent>
        <TabsContent value="password">Change your password here.</TabsContent>
        <TabsContent value="settings">Update your settings here.</TabsContent>
      </Tabs>
    </Preview>
  )
}

export function TabsSizes() {
  return (
    <Preview>
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
    </Preview>
  )
}

export function TabsWithIcons() {
  return (
    <Preview>
      <Tabs defaultValue="music" className="w-[400px]">
        <TabsList>
          <TabsTrigger value="music"><SiMusic />Music</TabsTrigger>
          <TabsTrigger value="video"><SiVideo />Video</TabsTrigger>
          <TabsTrigger value="settings"><SiSettings />Settings</TabsTrigger>
        </TabsList>
        <TabsContent value="music">Browse your music library.</TabsContent>
        <TabsContent value="video">Watch your saved videos.</TabsContent>
        <TabsContent value="settings">Manage your preferences.</TabsContent>
      </Tabs>
    </Preview>
  )
}
