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

// Define base colors from the theme variables
const baseColors = [
  "hsl(var(--chart-1))",
  "hsl(var(--chart-2))",
  "hsl(var(--chart-3))",
  "hsl(var(--chart-4))",
  "hsl(var(--chart-5))",
  "hsl(var(--muted))",
  "hsl(var(--destructive))",
];


const chartConfig = {
  count: {
    label: "Orders",
  },
   ...OrderStatusSchema.options.reduce((acc, status, index) => {
    acc[status] = {
      label: status,
      // Cycle through base colors
      color: baseColors[index % baseColors.length],
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
    // Ensure data uses the defined config keys and assigns fill colors
   const chartData = useMemo(() => {
       return data.map(item => {
           const configEntry = chartConfig[item.name as keyof typeof chartConfig] || chartConfig.Unknown;
           return {
               ...item,
               name: configEntry.label, // Use the formatted label from config
               fill: configEntry.color, // Assign fill color based on config
           };
       });
   }, [data]);

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
            label={({ percent, ...props }) => null} // Standardize label prop, hide default labels
          >
             {/* Map over chartData to render Cell components with assigned fill colors and unique keys */}
             {chartData.map((entry, index) => (
                 // Use just the index as the key, ensuring uniqueness within this map iteration
                 <Cell key={`cell-${index}`} fill={entry.fill} />
             ))}
          </Pie>
        </PieChart>
      </ChartContainer>
  )
}
