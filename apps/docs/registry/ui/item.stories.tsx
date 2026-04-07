import type { Meta, StoryObj } from "@storybook/react-vite"
import {
  SiArchive,
  SiBell,
  SiCheckCircle,
  SiFolder,
  SiInfoCircle,
  SiUser,
  SiX,
} from "stera-icons"

import { Badge } from "./badge"
import { Button } from "./button"
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemFooter,
  ItemGroup,
  ItemHeader,
  ItemMedia,
  ItemSeparator,
  ItemTitle,
} from "./item"

const meta: Meta<typeof Item> = {
  title: "UI/Item",
  component: Item,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
  },
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "outline", "muted"],
    },
    size: {
      control: "select",
      options: ["default", "sm", "xs"],
    },
  },
}

export default meta
type Story = StoryObj<typeof Item>

export const Default: Story = {
  render: () => (
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
  ),
}

export const AllVariants: Story = {
  render: () => (
    <div className="w-96">
      <ItemGroup>
        <Item variant="default">
          <ItemMedia variant="icon">
            <SiArchive />
          </ItemMedia>
          <ItemContent>
            <ItemTitle>Default variant</ItemTitle>
            <ItemDescription>No border, transparent background.</ItemDescription>
          </ItemContent>
        </Item>
        <Item variant="outline">
          <ItemMedia variant="icon">
            <SiArchive />
          </ItemMedia>
          <ItemContent>
            <ItemTitle>Outline variant</ItemTitle>
            <ItemDescription>Visible border, transparent background.</ItemDescription>
          </ItemContent>
        </Item>
        <Item variant="muted">
          <ItemMedia variant="icon">
            <SiArchive />
          </ItemMedia>
          <ItemContent>
            <ItemTitle>Muted variant</ItemTitle>
            <ItemDescription>Subtle muted background, no border.</ItemDescription>
          </ItemContent>
        </Item>
      </ItemGroup>
    </div>
  ),
}

export const AllSizes: Story = {
  render: () => (
    <div className="w-96">
      <ItemGroup>
        <Item size="default" variant="outline">
          <ItemMedia variant="icon">
            <SiFolder />
          </ItemMedia>
          <ItemContent>
            <ItemTitle>Default size</ItemTitle>
            <ItemDescription>Standard padding and spacing.</ItemDescription>
          </ItemContent>
        </Item>
        <Item size="sm" variant="outline">
          <ItemMedia variant="icon">
            <SiFolder />
          </ItemMedia>
          <ItemContent>
            <ItemTitle>Small size</ItemTitle>
            <ItemDescription>Reduced padding and spacing.</ItemDescription>
          </ItemContent>
        </Item>
        <Item size="xs" variant="outline">
          <ItemMedia variant="icon">
            <SiFolder />
          </ItemMedia>
          <ItemContent>
            <ItemTitle>Extra small size</ItemTitle>
            <ItemDescription>Compact padding and spacing.</ItemDescription>
          </ItemContent>
        </Item>
      </ItemGroup>
    </div>
  ),
}

export const WithItemGroup: Story = {
  render: () => (
    <div className="w-96">
      <ItemGroup>
        <Item variant="outline">
          <ItemMedia variant="icon">
            <SiArchive />
          </ItemMedia>
          <ItemContent>
            <ItemTitle>Design tokens</ItemTitle>
            <ItemDescription>Updated 2 hours ago</ItemDescription>
          </ItemContent>
        </Item>
        <Item variant="outline">
          <ItemMedia variant="icon">
            <SiArchive />
          </ItemMedia>
          <ItemContent>
            <ItemTitle>Component library</ItemTitle>
            <ItemDescription>Updated yesterday</ItemDescription>
          </ItemContent>
        </Item>
        <ItemSeparator />
        <Item variant="outline">
          <ItemMedia variant="icon">
            <SiFolder />
          </ItemMedia>
          <ItemContent>
            <ItemTitle>Archive</ItemTitle>
            <ItemDescription>Older files</ItemDescription>
          </ItemContent>
        </Item>
        <Item variant="outline">
          <ItemMedia variant="icon">
            <SiFolder />
          </ItemMedia>
          <ItemContent>
            <ItemTitle>Trash</ItemTitle>
            <ItemDescription>Items ready for deletion</ItemDescription>
          </ItemContent>
        </Item>
      </ItemGroup>
    </div>
  ),
}

export const WithItemMediaIcon: Story = {
  render: () => (
    <div className="w-96">
      <ItemGroup>
        <Item variant="outline">
          <ItemMedia variant="icon">
            <SiInfoCircle />
          </ItemMedia>
          <ItemContent>
            <ItemTitle>Icon without description</ItemTitle>
          </ItemContent>
        </Item>
        <Item variant="outline">
          <ItemMedia variant="icon">
            <SiInfoCircle />
          </ItemMedia>
          <ItemContent>
            <ItemTitle>Icon with description</ItemTitle>
            <ItemDescription>
              The icon shifts to align with the title when a description is present.
            </ItemDescription>
          </ItemContent>
        </Item>
      </ItemGroup>
    </div>
  ),
}

export const WithItemMediaImage: Story = {
  render: () => (
    <div className="w-96">
      <ItemGroup>
        <Item variant="outline" size="default">
          <ItemMedia variant="image">
            <img
              src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=80&h=80&fit=crop"
              alt="Avatar"
            />
          </ItemMedia>
          <ItemContent>
            <ItemTitle>Default size (40px image)</ItemTitle>
            <ItemDescription>Image scales with the item size.</ItemDescription>
          </ItemContent>
        </Item>
        <Item variant="outline" size="sm">
          <ItemMedia variant="image">
            <img
              src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=80&h=80&fit=crop"
              alt="Avatar"
            />
          </ItemMedia>
          <ItemContent>
            <ItemTitle>Small size (32px image)</ItemTitle>
            <ItemDescription>Image scales with the item size.</ItemDescription>
          </ItemContent>
        </Item>
        <Item variant="outline" size="xs">
          <ItemMedia variant="image">
            <img
              src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=80&h=80&fit=crop"
              alt="Avatar"
            />
          </ItemMedia>
          <ItemContent>
            <ItemTitle>Extra small size (24px image)</ItemTitle>
            <ItemDescription>Image scales with the item size.</ItemDescription>
          </ItemContent>
        </Item>
      </ItemGroup>
    </div>
  ),
}

export const WithItemActions: Story = {
  render: () => (
    <div className="w-96">
      <ItemGroup>
        <Item variant="outline">
          <ItemMedia variant="icon">
            <SiBell />
          </ItemMedia>
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
          <ItemMedia variant="icon">
            <SiUser />
          </ItemMedia>
          <ItemContent>
            <ItemTitle>Team member request</ItemTitle>
          </ItemContent>
          <ItemActions>
            <Button size="sm" variant="brand">Accept</Button>
            <Button size="sm" variant="outline">
              <SiX />
            </Button>
          </ItemActions>
        </Item>
      </ItemGroup>
    </div>
  ),
}

export const WithItemHeader: Story = {
  render: () => (
    <div className="w-96">
      <Item variant="outline">
        <ItemHeader>
          <span className="text-xs text-text-secondary font-medium uppercase tracking-wide">
            Recent
          </span>
          <Badge variant="default" size="sm">3 new</Badge>
        </ItemHeader>
        <ItemMedia variant="icon">
          <SiArchive />
        </ItemMedia>
        <ItemContent>
          <ItemTitle>Q4 Report.pdf</ItemTitle>
          <ItemDescription>Last opened 5 minutes ago</ItemDescription>
        </ItemContent>
      </Item>
    </div>
  ),
}

export const WithItemFooter: Story = {
  render: () => (
    <div className="w-96">
      <Item variant="outline">
        <ItemMedia variant="image">
          <img
            src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=80&h=80&fit=crop"
            alt="Workspace"
          />
        </ItemMedia>
        <ItemContent>
          <ItemTitle>Product retrospective</ItemTitle>
          <ItemDescription>Q4 planning session with the full team.</ItemDescription>
        </ItemContent>
        <ItemFooter>
          <span className="text-xs text-text-secondary">Dec 18, 2024</span>
          <span className="text-xs text-text-secondary">12 attendees</span>
        </ItemFooter>
      </Item>
    </div>
  ),
}

export const WithItemDescription: Story = {
  render: () => (
    <div className="w-96">
      <ItemGroup>
        <Item variant="outline">
          <ItemMedia variant="icon">
            <SiInfoCircle />
          </ItemMedia>
          <ItemContent>
            <ItemTitle>Plain description</ItemTitle>
            <ItemDescription>
              This is a standard description with no interactive elements.
            </ItemDescription>
          </ItemContent>
        </Item>
        <Item variant="outline">
          <ItemMedia variant="icon">
            <SiInfoCircle />
          </ItemMedia>
          <ItemContent>
            <ItemTitle>Description with a link</ItemTitle>
            <ItemDescription>
              Read the{" "}
              <a href="#">documentation</a> to learn more about this feature.
            </ItemDescription>
          </ItemContent>
        </Item>
      </ItemGroup>
    </div>
  ),
}

export const AsLink: Story = {
  render: () => (
    <div className="w-96">
      <ItemGroup>
        <Item variant="outline" render={<a href="#" />}>
          <ItemMedia variant="icon">
            <SiArchive />
          </ItemMedia>
          <ItemContent>
            <ItemTitle>Clickable item (anchor)</ItemTitle>
            <ItemDescription>
              The entire item is rendered as an &lt;a&gt; tag via the render prop.
            </ItemDescription>
          </ItemContent>
        </Item>
        <Item variant="outline" render={<a href="#" />}>
          <ItemMedia variant="icon">
            <SiFolder />
          </ItemMedia>
          <ItemContent>
            <ItemTitle>Another link item</ItemTitle>
            <ItemDescription>Hover to see the transition effect.</ItemDescription>
          </ItemContent>
        </Item>
      </ItemGroup>
    </div>
  ),
}

export const NotificationList: Story = {
  render: () => (
    <div className="w-[420px]">
      <ItemGroup>
        <Item variant="outline">
          <ItemMedia variant="icon">
            <SiCheckCircle />
          </ItemMedia>
          <ItemContent>
            <ItemTitle>Deployment successful</ItemTitle>
            <ItemDescription>
              Production build <a href="#">v2.4.1</a> deployed without errors.
            </ItemDescription>
          </ItemContent>
          <ItemActions>
            <Badge variant="success" size="sm">Done</Badge>
          </ItemActions>
        </Item>
        <Item variant="outline">
          <ItemMedia variant="image">
            <img
              src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=80&h=80&fit=crop"
              alt="Alex"
            />
          </ItemMedia>
          <ItemContent>
            <ItemTitle>Alex left a comment</ItemTitle>
            <ItemDescription>
              "Looks great, just a few small things to address before we merge."
            </ItemDescription>
          </ItemContent>
          <ItemActions>
            <Button size="sm" variant="outline">Reply</Button>
          </ItemActions>
        </Item>
        <ItemSeparator />
        <Item variant="outline" size="sm">
          <ItemMedia variant="icon">
            <SiBell />
          </ItemMedia>
          <ItemContent>
            <ItemTitle>3 new mentions</ItemTitle>
            <ItemDescription>You were mentioned in the #design channel.</ItemDescription>
          </ItemContent>
          <ItemActions>
            <Badge variant="accent" size="sm">3</Badge>
          </ItemActions>
        </Item>
        <Item variant="outline" size="sm">
          <ItemMedia variant="icon">
            <SiUser />
          </ItemMedia>
          <ItemContent>
            <ItemTitle>Team invite accepted</ItemTitle>
            <ItemDescription>Jordan joined the workspace.</ItemDescription>
          </ItemContent>
        </Item>
      </ItemGroup>
    </div>
  ),
}
