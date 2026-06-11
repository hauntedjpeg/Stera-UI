import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function TabsDisabled() {
  return (
    <Tabs defaultValue="profile">
      <TabsList>
        <TabsTrigger value="profile">Profile</TabsTrigger>
        <TabsTrigger value="notifications" disabled>Notifications</TabsTrigger>
        <TabsTrigger value="security">Security</TabsTrigger>
      </TabsList>
      <div className="bg-surface-subtle rounded-xl p-4 w-100">
        <TabsContent value="profile">
          Profile details
        </TabsContent>
        <TabsContent value="notifications">
          Notificaitons preferences
        </TabsContent>
        <TabsContent value="security">
          Security options
        </TabsContent>
      </div>
    </Tabs>
  )
}
