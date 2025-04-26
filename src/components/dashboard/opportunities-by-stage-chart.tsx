// src/components/dashboard/opportunities-by-stage-chart.tsx
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
import { OpportunityStageSchema } from "@/lib/models/opportunity";
import { useMemo } from "react";

const chartConfig = {
  count: {
    label: "Count",
    color: "hsl(var(--chart-1))", // Use a consistent color for bars
  },
   ...OpportunityStageSchema.options.reduce((acc, stage) => {
     acc[stage] = { label: stage }; // Add labels for tooltip/legend
     return acc;
   }, {} as Record<string, { label: string }>),
   Unknown: { // Fallback
     label: "Unknown",
   }
} satisfies ChartConfig

interface OpportunitiesByStageChartProps {
  data: { name: string; count: number }[];
}

export function OpportunitiesByStageChart({ data }: OpportunitiesByStageChartProps) {

   const chartData = useMemo(() => data.map(item => ({
    stage: item.name, // Use 'name' as the stage label
    count: item.count,
  })), [data]);


  return (
      <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
        <BarChart accessibilityLayer data={chartData} margin={{ top: 5, right: 10, left: -10, bottom: 0 }}>
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="stage"
            tickLine={false}
            tickMargin={10}
            axisLine={false}
            // Optional: shorten labels if too long
             // tickFormatter={(value) => value.substring(0, 3)}
          />
          <YAxis />
          <ChartTooltip
            cursor={false}
            content={<ChartTooltipContent indicator="line" />}
          />
          {/* Optional Legend
           <ChartLegend content={<ChartLegendContent />} />
          */}
          <Bar dataKey="count" fill="var(--color-count)" radius={4} />
        </BarChart>
      </ChartContainer>
  )
}
