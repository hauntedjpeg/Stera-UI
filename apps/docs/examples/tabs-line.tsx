import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function TabsLine() {
  return (
    <Tabs defaultValue="profile">
      <TabsList variant="line">
        <TabsTrigger value="profile">Profile</TabsTrigger>
        <TabsTrigger value="notifications">Notifications</TabsTrigger>
        <TabsTrigger value="security">Security</TabsTrigger>
      </TabsList>
      <div className="mt-3 w-100 rounded-xl bg-surface-subtle p-4">
        <TabsContent value="profile">Profile details</TabsContent>
        <TabsContent value="notifications">
          Notificaitons preferences
        </TabsContent>
        <TabsContent value="security">Security options</TabsContent>
      </div>
    </Tabs>
  )
}
