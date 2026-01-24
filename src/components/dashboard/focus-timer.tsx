"use client"

import * as React from "react"
import { Timer } from "lucide-react"
import { CircularProgress } from "@/components/ui/circular-progress"
import { cn } from "@/lib/utils"

interface FocusTimerProps {
  timeLeft?: string
  progress?: number
  className?: string
}

function FocusTimer({
  timeLeft = "45m left",
  progress = 75,
  className,
}: FocusTimerProps) {
  return (
    <div
      className={cn(
        "flex items-center gap-3 px-3 py-2 rounded-lg",
        "bg-primary/5 dark:bg-primary/10",
        "border border-primary/20",
        className
      )}
    >
      <CircularProgress
        value={progress}
        max={100}
        size="sm"
        showIcon
        icon={<Timer className="size-4 text-primary" />}
      />
      <div className="flex flex-col">
        <span className="text-xs font-medium text-muted-foreground">
          Focus Time
        </span>
        <span className="text-sm font-semibold text-primary">
          {timeLeft}
        </span>
      </div>
    </div>
  )
}

export { FocusTimer }
