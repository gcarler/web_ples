// src/components/dashboard/orders-by-status-chart.tsx
"use client"

import { TrendingUp } from "lucide-react"
import { Pie, PieChart, Cell } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { OrderStatusSchema } from "@/lib/models/erp"
import { useMemo } from "react";

const chartConfig = {
  count: {
    label: "Orders",
  },
   ...OrderStatusSchema.options.reduce((acc, status) => {
    // Assign colors dynamically or use predefined ones
    const colors = ["hsl(var(--chart-1))", "hsl(var(--chart-2))", "hsl(var(--chart-3))", "hsl(var(--chart-4))", "hsl(var(--chart-5))", "hsl(var(--muted))", "hsl(var(--destructive))"];
    acc[status] = {
      label: status,
      // Cycle through colors based on index
      color: colors[OrderStatusSchema.options.indexOf(status) % colors.length],
    };
    return acc;
  }, {} as Record<string, { label: string; color: string }>),
   Unknown: { // Add fallback for unknown/null sources
    label: "Unknown",
    color: "hsl(var(--muted))",
  }
} satisfies ChartConfig

interface OrdersByStatusChartProps {
  data: { name: string; count: number }[];
}

export function OrdersByStatusChart({ data }: OrdersByStatusChartProps) {
    // Ensure data uses the defined config keys
   const chartData = useMemo(() => data.map(item => ({
    ...item,
    fill: chartConfig[item.name as keyof typeof chartConfig]?.color || chartConfig.Unknown.color,
  })), [data]);

  const totalOrders = useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.count, 0)
  }, [chartData])


  return (
      <ChartContainer
        config={chartConfig}
        className="mx-auto aspect-square max-h-[300px]"
      >
        <PieChart>
          <ChartTooltip
            cursor={false}
            content={<ChartTooltipContent hideLabel />}
          />
          <Pie
            data={chartData}
            dataKey="count"
            nameKey="name"
            innerRadius={60}
            strokeWidth={5}
            labelLine={false}
            label={({ Pct, ...props }) => null} // Hide default labels
          >
             {chartData.map((entry) => (
                 <Cell key={`cell-${entry.name}`} fill={entry.fill} />
             ))}
          </Pie>
        </PieChart>
      </ChartContainer>
  )
}
