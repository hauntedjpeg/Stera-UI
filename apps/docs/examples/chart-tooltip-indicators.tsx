"use client"

import { Bar, BarChart, XAxis } from "recharts"

import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

const chartData = [
  { month: "January", desktop: 172, mobile: 94 },
  { month: "February", desktop: 281, mobile: 168 },
  { month: "March", desktop: 246, mobile: 131 },
]

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "var(--chart-1)",
  },
  mobile: {
    label: "Mobile",
    color: "var(--chart-3)",
  },
} satisfies ChartConfig

const variants = [
  { title: "Dot", props: { indicator: "dot" } },
  { title: "Line", props: { indicator: "line" } },
  { title: "Dashed", props: { indicator: "dashed" } },
  { title: "No label", props: { hideLabel: true } },
] as const

export default function ChartTooltipIndicators() {
  return (
    <div className="grid w-full gap-6 sm:grid-cols-2">
      {variants.map(({ title, props }) => (
        <div key={title} className="grid gap-2">
          <p className="st-label-sm text-ink-subtler">{title}</p>
          <ChartContainer config={chartConfig} className="aspect-auto h-44">
            <BarChart
              accessibilityLayer
              data={chartData}
              margin={{ top: 8, right: 8, bottom: 0, left: 8 }}
            >
              <XAxis
                dataKey="month"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tickFormatter={(value: string) => value.slice(0, 3)}
              />
              {/* defaultIndex opens the tooltip on load so each variant shows */}
              <ChartTooltip
                defaultIndex={1}
                content={<ChartTooltipContent {...props} />}
              />
              <Bar dataKey="desktop" fill="var(--color-desktop)" radius={4} />
              <Bar dataKey="mobile" fill="var(--color-mobile)" radius={4} />
            </BarChart>
          </ChartContainer>
        </div>
      ))}
    </div>
  )
}
