import { SiMusic, SiSettings, SiVideo } from "stera-icons"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"

export default function TabsWithIcons() {
  return (
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
  )
}
