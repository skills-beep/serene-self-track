
import React from "react";
import { cn } from "@/lib/utils";

interface ProgressRingProps {
  progress: number;
  size?: number;
  strokeWidth?: number;
  textClass?: string;
  circleClass?: string;
  children?: React.ReactNode;
  showPercentage?: boolean;
  className?: string;
}

export function ProgressRing({
  progress,
  size = 120,
  strokeWidth = 8,
  textClass,
  circleClass,
  children,
  showPercentage = true,
  className,
}: ProgressRingProps) {
  // Calculate parameters for the SVG
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (progress / 100) * circumference;
  const center = size / 2;

  return (
    <div className={cn("progress-ring-container", className)} style={{ width: size, height: size }}>
      <svg className="progress-ring" width={size} height={size}>
        {/* Background circle */}
        <circle
          className="text-muted stroke-current"
          cx={center}
          cy={center}
          r={radius}
          strokeWidth={strokeWidth}
          fill="transparent"
        />
        {/* Progress circle */}
        <circle
          className={cn("progress-ring-circle text-primary stroke-current", circleClass)}
          cx={center}
          cy={center}
          r={radius}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          fill="transparent"
        />
      </svg>
      <div className={cn("progress-ring-text", textClass)}>
        {children ? (
          children
        ) : showPercentage ? (
          <div className="text-xl font-medium">{progress}%</div>
        ) : null}
      </div>
    </div>
  );
}
