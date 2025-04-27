// src/components/dashboard/contacts-by-source-chart.tsx
"use client"

import { useMemo } from "react";
import { Pie, PieChart, Cell } from "recharts"
import { LeadSourceSchema } from "@/lib/models/contact"
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
 } from "@/components/ui/chart"

// Define base colors from the theme variables
const baseColors = [
  "hsl(var(--chart-1))",
  "hsl(var(--chart-2))",
  "hsl(var(--chart-3))",
  "hsl(var(--chart-4))",
  "hsl(var(--chart-5))",
  "hsl(var(--muted))",
];


const chartConfig = {
  count: {
    label: "Contacts",
  },
  ...LeadSourceSchema.options.reduce((acc, source, index) => {
    acc[source] = {
      label: source,
      // Cycle through base colors
      color: baseColors[index % baseColors.length],
    };
    return acc;
  }, {} as Record<string, { label: string; color: string }>),
  Unknown: { // Add fallback for unknown/null sources or sources not in enum
    label: "Unknown",
    color: "hsl(var(--muted))",
  }
} satisfies ChartConfig

interface ContactsBySourceChartProps {
  data: { name: string; count: number }[];
}

export function ContactsBySourceChart({ data }: ContactsBySourceChartProps) {
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


  const totalContacts = useMemo(() => {
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
            nameKey="name" // Use the potentially updated name from chartData mapping
            innerRadius={60}
            strokeWidth={5}
            labelLine={false}
            label={({ percent }) => null } // Hide default labels using percent or other props
          >
             {/* Map over chartData to render Cell components with assigned fill colors and use index for key */}
             {chartData.map((entry, index) => (
                 <Cell key={`cell-${index}`} fill={entry.fill} />
             ))}
          </Pie>
        </PieChart>
      </ChartContainer>
  )
}
