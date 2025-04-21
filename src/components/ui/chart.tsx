
import React from "react";
import { BarChart as RechartsBarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip } from "recharts";
import { cn } from "@/lib/utils";

interface BarChartProps {
  data: {
    name: string;
    value: number;
    [key: string]: any;
  }[];
  categories: string[];
  colors?: string[];
  valueFormatter?: (value: number) => string;
  className?: string;
}

export function BarChart({ data, categories, colors = ["primary"], valueFormatter = (value) => `${value}`, className }: BarChartProps) {
  // Map color names to actual tailwind colors
  const getColorClass = (colorName: string) => {
    const colorMap: Record<string, string> = {
      primary: "var(--primary)",
      secondary: "var(--secondary)",
      accent: "var(--accent)",
      muted: "var(--muted)",
    };
    
    return colorMap[colorName] || colorName;
  };

  return (
    <div className={cn("w-full h-full", className)}>
      <ResponsiveContainer width="100%" height="100%">
        <RechartsBarChart
          data={data}
          margin={{ top: 10, right: 10, left: -20, bottom: 10 }}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" />
          <XAxis 
            dataKey="name"
            axisLine={false}
            tickLine={false}
            tick={{ fill: "var(--muted-foreground)", fontSize: 12 }}
          />
          <YAxis 
            axisLine={false}
            tickLine={false}
            tick={{ fill: "var(--muted-foreground)", fontSize: 12 }}
          />
          <Tooltip 
            formatter={(value: number) => [valueFormatter(value)]}
            contentStyle={{ 
              backgroundColor: "var(--background)",
              borderColor: "var(--border)",
              borderRadius: 8,
              fontSize: 12
            }}
          />
          {categories.map((category, index) => (
            <Bar
              key={category}
              dataKey={category}
              fill={getColorClass(colors[index % colors.length])}
              radius={[4, 4, 0, 0]}
              className="animate-fade-in"
              animationDuration={600}
              animationBegin={index * 150}
            />
          ))}
        </RechartsBarChart>
      </ResponsiveContainer>
    </div>
  );
}
