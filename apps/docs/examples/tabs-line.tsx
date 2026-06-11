import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function TabsLine() {
  return (
    <Tabs defaultValue="profile">
      <TabsList variant="line">
        <TabsTrigger value="profile">Profile</TabsTrigger>
        <TabsTrigger value="notifications">Notifications</TabsTrigger>
        <TabsTrigger value="security">Security</TabsTrigger>
      </TabsList>
      <div className="bg-surface-subtle rounded-xl p-4 w-100 mt-3">
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
