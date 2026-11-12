"use client"

import { Bar, BarChart } from "recharts"

import { type ChartConfig, ChartContainer } from "@/components/ui/chart"

const chartData = [
  { month: "January", desktop: 172, mobile: 94 },
  { month: "February", desktop: 281, mobile: 168 },
  { month: "March", desktop: 246, mobile: 131 },
  { month: "April", desktop: 98, mobile: 176 },
  { month: "May", desktop: 224, mobile: 142 },
  { month: "June", desktop: 239, mobile: 157 },
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

export default function ChartBarBasic() {
  return (
    <ChartContainer config={chartConfig} className="min-h-50 w-full">
      <BarChart accessibilityLayer data={chartData}>
        <Bar dataKey="desktop" fill="var(--color-desktop)" radius={4} />
        <Bar dataKey="mobile" fill="var(--color-mobile)" radius={4} />
      </BarChart>
    </ChartContainer>
  )
}
