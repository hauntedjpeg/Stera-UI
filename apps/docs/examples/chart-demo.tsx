"use client"

import * as React from "react"
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"
import { SiDeviceDesktop, SiDevicePhone } from "stera-icons"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { Chip } from "@/components/ui/chip"

const chartData = [
  { date: "2026-10-01", desktop: 218, mobile: 142 },
  { date: "2026-10-02", desktop: 164, mobile: 188 },
  { date: "2026-10-03", desktop: 251, mobile: 126 },
  { date: "2026-10-04", desktop: 302, mobile: 214 },
  { date: "2026-10-05", desktop: 189, mobile: 97 },
  { date: "2026-10-06", desktop: 274, mobile: 233 },
  { date: "2026-10-07", desktop: 236, mobile: 171 },
  { date: "2026-10-08", desktop: 148, mobile: 119 },
  { date: "2026-10-09", desktop: 92, mobile: 156 },
  { date: "2026-10-10", desktop: 207, mobile: 182 },
  { date: "2026-10-11", desktop: 318, mobile: 249 },
  { date: "2026-10-12", desktop: 341, mobile: 206 },
  { date: "2026-10-13", desktop: 267, mobile: 138 },
  { date: "2026-10-14", desktop: 129, mobile: 104 },
  { date: "2026-10-15", desktop: 176, mobile: 162 },
  { date: "2026-10-16", desktop: 223, mobile: 197 },
  { date: "2026-10-17", desktop: 289, mobile: 241 },
  { date: "2026-10-18", desktop: 357, mobile: 268 },
  { date: "2026-10-19", desktop: 244, mobile: 153 },
  { date: "2026-10-20", desktop: 158, mobile: 121 },
  { date: "2026-10-21", desktop: 198, mobile: 174 },
  { date: "2026-10-22", desktop: 263, mobile: 219 },
  { date: "2026-10-23", desktop: 312, mobile: 187 },
  { date: "2026-10-24", desktop: 279, mobile: 236 },
  { date: "2026-10-25", desktop: 186, mobile: 143 },
  { date: "2026-10-26", desktop: 141, mobile: 112 },
  { date: "2026-10-27", desktop: 233, mobile: 191 },
  { date: "2026-10-28", desktop: 297, mobile: 254 },
  { date: "2026-10-29", desktop: 326, mobile: 228 },
  { date: "2026-10-30", desktop: 258, mobile: 179 },
]

const chartConfig = {
  views: {
    label: "Page views",
  },
  desktop: {
    label: "Desktop",
    icon: SiDeviceDesktop,
    color: "var(--chart-1)",
  },
  mobile: {
    label: "Mobile",
    icon: SiDevicePhone,
    color: "var(--chart-1)",
  },
} satisfies ChartConfig

type Series = "desktop" | "mobile"

const series: Series[] = ["desktop", "mobile"]

function formatDate(value: string, month: "short" | "long" = "short") {
  return new Date(`${value}T00:00:00`).toLocaleDateString("en-US", {
    month,
    day: "numeric",
  })
}

export default function ChartDemo() {
  const [active, setActive] = React.useState<Series>("desktop")

  const totals = React.useMemo(
    () => ({
      desktop: chartData.reduce((sum, row) => sum + row.desktop, 0),
      mobile: chartData.reduce((sum, row) => sum + row.mobile, 0),
    }),
    []
  )

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Page views</CardTitle>
        <CardDescription>October 1 to 30</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="flex flex-wrap gap-2">
          {series.map((key) => {
            const Icon = chartConfig[key].icon
            return (
              <Chip
                key={key}
                variant="outline"
                size="sm"
                active={active === key}
                aria-pressed={active === key}
                onClick={() => setActive(key)}
              >
                <Icon data-icon="inline-start" />
                <span className="tabular-nums">
                  {totals[key].toLocaleString()}
                </span>
                <span className="sr-only">{chartConfig[key].label}</span>
              </Chip>
            )
          })}
        </div>
        <ChartContainer config={chartConfig} className="aspect-auto h-64">
          <BarChart
            accessibilityLayer
            data={chartData}
            margin={{ left: 12, right: 12 }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value: string) => formatDate(value)}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  className="w-40"
                  nameKey="views"
                  labelFormatter={(value) => formatDate(String(value), "long")}
                />
              }
            />
            <Bar dataKey={active} fill={`var(--color-${active})`} radius={4} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
