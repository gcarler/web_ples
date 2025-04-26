// src/components/dashboard/processes-by-status-chart.tsx
"use client"

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart"
import { ProcessStatusSchema } from "@/lib/models/bpm";
import { useMemo } from "react";

const chartConfig = {
  count: {
    label: "Instances",
     // Assign different colors based on status for better visual distinction
    color: "hsl(var(--chart-1))", // Default
  },
    ...ProcessStatusSchema.options.reduce((acc, status) => {
    let color = "hsl(var(--chart-1))"; // Default blue-ish
    if (status === 'Completed') color = "hsl(var(--chart-2))"; // Green-ish
    if (status === 'Failed') color = "hsl(var(--destructive))"; // Red
    if (status === 'Suspended') color = "hsl(var(--chart-4))"; // Yellow-ish
     if (status === 'Running') color = "hsl(var(--chart-5))"; // Another distinct color
    acc[status] = { label: status, color: color };
    return acc;
  }, {} as Record<string, { label: string; color: string }>),
   Unknown: {
    label: "Unknown",
    color: "hsl(var(--muted))",
  },
} satisfies ChartConfig

interface ProcessesByStatusChartProps {
  data: { name: string; count: number }[];
}

export function ProcessesByStatusChart({ data }: ProcessesByStatusChartProps) {
  // Assign fill color based on status name
   const chartData = useMemo(() => data.map(item => ({
    status: item.name,
    count: item.count,
    fill: chartConfig[item.name as keyof typeof chartConfig]?.color || chartConfig.Unknown.color,
  })), [data]);

  return (
      <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
        <BarChart accessibilityLayer data={chartData} layout="vertical" margin={{ top: 5, right: 10, left: 10, bottom: 0 }}>
          <CartesianGrid horizontal={false} />
           <YAxis
            dataKey="status"
            type="category"
            tickLine={false}
            tickMargin={10}
            axisLine={false}
            width={80} // Adjust width if labels are long
          />
          <XAxis dataKey="count" type="number" hide /> {/* Hide X-axis numerical labels */}
          <ChartTooltip
            cursor={false}
            content={<ChartTooltipContent indicator="line" />}
          />
          {/* Optional Legend
           <ChartLegend content={<ChartLegendContent />} />
          */}
           <Bar dataKey="count" layout="vertical" radius={4}>
              {chartData.map((entry) => (
                 <Cell key={`cell-${entry.status}`} fill={entry.fill} />
             ))}
           </Bar>
        </BarChart>
      </ChartContainer>
  )
}
