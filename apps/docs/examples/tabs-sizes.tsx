import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"

export default function TabsSizes() {
  return (
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
  )
}
