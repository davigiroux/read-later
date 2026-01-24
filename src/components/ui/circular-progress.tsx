import * as React from "react"
import { cn } from "@/lib/utils"

interface CircularProgressProps {
  value: number
  max?: number
  size?: "sm" | "md" | "lg"
  showIcon?: boolean
  icon?: React.ReactNode
  className?: string
}

const sizeMap = {
  sm: { width: 40, strokeWidth: 3, textSize: "text-xs" },
  md: { width: 56, strokeWidth: 4, textSize: "text-sm" },
  lg: { width: 72, strokeWidth: 5, textSize: "text-base" },
}

function CircularProgress({
  value,
  max = 100,
  size = "md",
  showIcon = false,
  icon,
  className,
}: CircularProgressProps) {
  const { width, strokeWidth, textSize } = sizeMap[size]
  const radius = (width - strokeWidth) / 2
  const circumference = 2 * Math.PI * radius
  const progress = Math.min(Math.max(value, 0), max)
  const offset = circumference - (progress / max) * circumference

  return (
    <div className={cn("relative inline-flex items-center justify-center", className)}>
      <svg
        width={width}
        height={width}
        viewBox={`0 0 ${width} ${width}`}
        className="-rotate-90"
      >
        {/* Background circle */}
        <circle
          cx={width / 2}
          cy={width / 2}
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          className="text-muted opacity-20"
        />
        {/* Progress circle */}
        <circle
          cx={width / 2}
          cy={width / 2}
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className="text-primary transition-all duration-300"
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        {showIcon && icon ? (
          icon
        ) : (
          <span className={cn("font-semibold text-foreground", textSize)}>
            {Math.round((progress / max) * 100)}%
          </span>
        )}
      </div>
    </div>
  )
}

export { CircularProgress }
