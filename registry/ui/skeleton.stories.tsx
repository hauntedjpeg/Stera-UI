import type { Meta, StoryObj } from "@storybook/react"

import { Skeleton } from "./skeleton"

const meta: Meta<typeof Skeleton> = {
  title: "UI/Skeleton",
  component: Skeleton,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
}

export default meta
type Story = StoryObj<typeof Skeleton>

export const Default: Story = {
  render: () => <Skeleton className="h-[20px] w-[100px] rounded-full" />,
}

export const Avatar: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Skeleton className="h-12 w-12 rounded-full" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[250px]" />
        <Skeleton className="h-4 w-[200px]" />
      </div>
    </div>
  ),
}

export const Card: Story = {
  render: () => (
    <div className="flex flex-col space-y-3">
      <Skeleton className="h-[125px] w-[250px] rounded-xl" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[250px]" />
        <Skeleton className="h-4 w-[200px]" />
      </div>
    </div>
  ),
}

export const Text: Story = {
  render: () => (
    <div className="space-y-2">
      <Skeleton className="h-4 w-[300px]" />
      <Skeleton className="h-4 w-[280px]" />
      <Skeleton className="h-4 w-[260px]" />
      <Skeleton className="h-4 w-[200px]" />
    </div>
  ),
}

export const Form: Story = {
  render: () => (
    <div className="flex flex-col gap-6 w-[300px]">
      <div className="flex flex-col gap-3">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-9 w-full rounded-md" />
      </div>
      <div className="flex flex-col gap-3">
        <Skeleton className="h-4 w-20" />
        <Skeleton className="h-9 w-full rounded-md" />
      </div>
      <div className="flex flex-col gap-3">
        <Skeleton className="h-4 w-28" />
        <Skeleton className="h-20 w-full rounded-md" />
      </div>
      <Skeleton className="h-9 w-full rounded-md" />
    </div>
  ),
}

export const Table: Story = {
  render: () => (
    <div className="w-[500px] space-y-3">
      <div className="flex gap-4">
        <Skeleton className="h-4 w-[120px]" />
        <Skeleton className="h-4 w-[100px]" />
        <Skeleton className="h-4 w-[80px]" />
        <Skeleton className="h-4 w-[90px]" />
      </div>
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={i} className="flex gap-4">
          <Skeleton className="h-4 w-[120px]" />
          <Skeleton className="h-4 w-[100px]" />
          <Skeleton className="h-4 w-[80px]" />
          <Skeleton className="h-4 w-[90px]" />
        </div>
      ))}
    </div>
  ),
}
