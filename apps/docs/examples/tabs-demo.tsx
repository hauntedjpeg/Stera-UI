import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function TabsDemo() {
  return (
    <Tabs defaultValue="profile">
      <TabsList>
        <TabsTrigger value="profile">Profile</TabsTrigger>
        <TabsTrigger value="notifications">Notifications</TabsTrigger>
        <TabsTrigger value="security">Security</TabsTrigger>
      </TabsList>
      <div className="w-100 rounded-xl bg-surface-subtle p-4">
        <TabsContent value="profile">Profile details</TabsContent>
        <TabsContent value="notifications">
          Notificaitons preferences
        </TabsContent>
        <TabsContent value="security">Security options</TabsContent>
      </div>
    </Tabs>
  )
}
