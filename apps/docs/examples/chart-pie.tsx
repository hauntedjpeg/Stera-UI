"use client"

import { Pie, PieChart } from "recharts"

import {
  type ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

// Each row carries its own fill, pointing at the color the config defines.
const chartData = [
  { browser: "chrome", visitors: 412, fill: "var(--color-chrome)" },
  { browser: "safari", visitors: 268, fill: "var(--color-safari)" },
  { browser: "firefox", visitors: 141, fill: "var(--color-firefox)" },
  { browser: "edge", visitors: 97, fill: "var(--color-edge)" },
]

const chartConfig = {
  visitors: {
    label: "Visitors",
  },
  chrome: {
    label: "Chrome",
    color: "var(--chart-1)",
  },
  safari: {
    label: "Safari",
    color: "var(--chart-2)",
  },
  firefox: {
    label: "Firefox",
    color: "var(--chart-3)",
  },
  edge: {
    label: "Edge",
    color: "var(--chart-4)",
  },
} satisfies ChartConfig

export default function ChartPie() {
  return (
    <ChartContainer
      config={chartConfig}
      className="mx-auto aspect-square max-h-80 w-full"
    >
      <PieChart accessibilityLayer>
        <ChartTooltip content={<ChartTooltipContent hideLabel />} />
        <Pie
          data={chartData}
          dataKey="visitors"
          nameKey="browser"
          innerRadius="45%"
        />
        {/* itemSorter={null} keeps the legend in data order */}
        <ChartLegend
          itemSorter={null}
          content={<ChartLegendContent nameKey="browser" />}
        />
      </PieChart>
    </ChartContainer>
  )
}
