"use client"

import {
  SiArchive,
  SiBell,
  SiCheckCircle,
  SiFolder,
  SiUser,
  SiX,
} from "stera-icons"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemMedia,
  ItemSeparator,
  ItemTitle,
} from "@/components/ui/item"
import { Preview } from "@/components/preview"

export function ItemDefault() {
  return (
    <Preview>
      <div className="w-96">
        <Item>
          <ItemMedia variant="icon">
            <SiUser />
          </ItemMedia>
          <ItemContent>
            <ItemTitle>Jane Appleseed</ItemTitle>
            <ItemDescription>Product designer · San Francisco</ItemDescription>
          </ItemContent>
        </Item>
      </div>
    </Preview>
  )
}

export function ItemAllVariants() {
  return (
    <Preview>
      <div className="w-96">
        <ItemGroup>
          <Item variant="default">
            <ItemMedia variant="icon"><SiArchive /></ItemMedia>
            <ItemContent>
              <ItemTitle>Default variant</ItemTitle>
              <ItemDescription>No border, transparent background.</ItemDescription>
            </ItemContent>
          </Item>
          <Item variant="outline">
            <ItemMedia variant="icon"><SiArchive /></ItemMedia>
            <ItemContent>
              <ItemTitle>Outline variant</ItemTitle>
              <ItemDescription>Visible border, transparent background.</ItemDescription>
            </ItemContent>
          </Item>
          <Item variant="muted">
            <ItemMedia variant="icon"><SiArchive /></ItemMedia>
            <ItemContent>
              <ItemTitle>Muted variant</ItemTitle>
              <ItemDescription>Subtle muted background, no border.</ItemDescription>
            </ItemContent>
          </Item>
        </ItemGroup>
      </div>
    </Preview>
  )
}

export function ItemAllSizes() {
  return (
    <Preview>
      <div className="w-96">
        <ItemGroup>
          <Item size="default" variant="outline">
            <ItemMedia variant="icon"><SiFolder /></ItemMedia>
            <ItemContent>
              <ItemTitle>Default size</ItemTitle>
              <ItemDescription>Standard padding and spacing.</ItemDescription>
            </ItemContent>
          </Item>
          <Item size="sm" variant="outline">
            <ItemMedia variant="icon"><SiFolder /></ItemMedia>
            <ItemContent>
              <ItemTitle>Small size</ItemTitle>
              <ItemDescription>Reduced padding and spacing.</ItemDescription>
            </ItemContent>
          </Item>
          <Item size="xs" variant="outline">
            <ItemMedia variant="icon"><SiFolder /></ItemMedia>
            <ItemContent>
              <ItemTitle>Extra small size</ItemTitle>
              <ItemDescription>Compact padding and spacing.</ItemDescription>
            </ItemContent>
          </Item>
        </ItemGroup>
      </div>
    </Preview>
  )
}

export function ItemWithActions() {
  return (
    <Preview>
      <div className="w-96">
        <ItemGroup>
          <Item variant="outline">
            <ItemMedia variant="icon"><SiBell /></ItemMedia>
            <ItemContent>
              <ItemTitle>Notifications</ItemTitle>
              <ItemDescription>You have new activity.</ItemDescription>
            </ItemContent>
            <ItemActions>
              <Badge variant="danger">4</Badge>
              <Button size="sm" variant="outline">View</Button>
            </ItemActions>
          </Item>
          <Item variant="outline">
            <ItemMedia variant="icon"><SiUser /></ItemMedia>
            <ItemContent>
              <ItemTitle>Team member request</ItemTitle>
            </ItemContent>
            <ItemActions>
              <Button size="sm" variant="brand">Accept</Button>
              <Button size="sm" variant="outline"><SiX /></Button>
            </ItemActions>
          </Item>
        </ItemGroup>
      </div>
    </Preview>
  )
}

export function ItemNotificationList() {
  return (
    <Preview>
      <div className="w-[420px]">
        <ItemGroup>
          <Item variant="outline">
            <ItemMedia variant="icon"><SiCheckCircle /></ItemMedia>
            <ItemContent>
              <ItemTitle>Deployment successful</ItemTitle>
              <ItemDescription>Production build v2.4.1 deployed without errors.</ItemDescription>
            </ItemContent>
            <ItemActions>
              <Badge variant="success" size="sm">Done</Badge>
            </ItemActions>
          </Item>
          <ItemSeparator />
          <Item variant="outline" size="sm">
            <ItemMedia variant="icon"><SiBell /></ItemMedia>
            <ItemContent>
              <ItemTitle>3 new mentions</ItemTitle>
              <ItemDescription>You were mentioned in the #design channel.</ItemDescription>
            </ItemContent>
            <ItemActions>
              <Badge variant="accent" size="sm">3</Badge>
            </ItemActions>
          </Item>
          <Item variant="outline" size="sm">
            <ItemMedia variant="icon"><SiUser /></ItemMedia>
            <ItemContent>
              <ItemTitle>Team invite accepted</ItemTitle>
              <ItemDescription>Jordan joined the workspace.</ItemDescription>
            </ItemContent>
          </Item>
        </ItemGroup>
      </div>
    </Preview>
  )
}
