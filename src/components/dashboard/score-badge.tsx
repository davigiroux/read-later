import * as React from "react"
import { cn } from "@/lib/utils"

interface ScoreBadgeProps {
  score: number
  maxScore?: number
  showLabel?: boolean
  size?: "sm" | "md" | "lg"
  className?: string
}

function ScoreBadge({
  score,
  maxScore = 100,
  showLabel = true,
  size = "md",
  className,
}: ScoreBadgeProps) {
  const isHighScore = score >= 90
  const normalizedScore = Math.round((score / maxScore) * 100)

  const sizeClasses = {
    sm: "text-xs px-2 py-1",
    md: "text-sm px-3 py-1.5",
    lg: "text-base px-4 py-2",
  }

  return (
    <div
      className={cn(
        "flex flex-col items-center gap-0.5 rounded-lg font-semibold",
        isHighScore
          ? "bg-primary text-primary-foreground"
          : "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300",
        sizeClasses[size],
        className
      )}
    >
      {showLabel && (
        <span className={cn(
          "uppercase tracking-wider font-medium",
          size === "sm" ? "text-[9px]" : "text-[10px]",
          isHighScore
            ? "text-primary-foreground/80"
            : "text-slate-500 dark:text-slate-400"
        )}>
          Score
        </span>
      )}
      <span className={cn(
        "font-bold leading-none",
        size === "sm" && "text-base",
        size === "md" && "text-lg",
        size === "lg" && "text-xl"
      )}>
        {normalizedScore}
      </span>
    </div>
  )
}

export { ScoreBadge }
