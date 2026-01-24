import * as React from "react"
import { cn } from "@/lib/utils"

interface ScoreBadgeProps {
  score: number
  maxScore?: number
  showLabel?: boolean
  size?: "sm" | "md" | "lg"
  variant?: "default" | "highlight" | "circular"
  colorClass?: string
  className?: string
}

/**
 * Get priority label based on score
 */
export function getPriorityLabel(score: number): { label: string; colorClass: string } {
  if (score >= 95) return { label: "Top Match", colorClass: "text-primary bg-blue-50" }
  if (score >= 85) return { label: "High", colorClass: "text-slate-600" }
  if (score >= 70) return { label: "Strong", colorClass: "text-slate-600" }
  return { label: "Relevant", colorClass: "text-slate-600" }
}

/**
 * Get category color classes based on topic
 */
export function getCategoryColor(topic: string): { text: string; bg: string; border: string } {
  const topicLower = topic.toLowerCase()

  if (topicLower.includes('ai') || topicLower.includes('ml') || topicLower.includes('machine learning')) {
    return { text: 'text-blue-600', bg: 'bg-blue-50', border: 'border-blue-100' }
  }
  if (topicLower.includes('engineering') || topicLower.includes('programming') || topicLower.includes('code')) {
    return { text: 'text-sky-600', bg: 'bg-sky-50', border: 'border-sky-100' }
  }
  if (topicLower.includes('design') || topicLower.includes('ux') || topicLower.includes('ui')) {
    return { text: 'text-purple-600', bg: 'bg-purple-50', border: 'border-purple-100' }
  }
  if (topicLower.includes('career') || topicLower.includes('job') || topicLower.includes('work')) {
    return { text: 'text-amber-600', bg: 'bg-amber-50', border: 'border-amber-100' }
  }
  if (topicLower.includes('finance') || topicLower.includes('money') || topicLower.includes('invest')) {
    return { text: 'text-slate-500', bg: 'bg-slate-100', border: 'border-slate-200' }
  }
  if (topicLower.includes('product') || topicLower.includes('startup') || topicLower.includes('business')) {
    return { text: 'text-green-600', bg: 'bg-green-50', border: 'border-green-100' }
  }
  // Default
  return { text: 'text-slate-600', bg: 'bg-slate-100', border: 'border-slate-200' }
}

/**
 * Get ring color class based on score
 */
function getRingColorClass(score: number): string {
  if (score >= 95) return 'text-primary'
  if (score >= 85) return 'text-sky-500'
  if (score >= 70) return 'text-purple-500'
  return 'text-slate-400'
}

function ScoreBadge({
  score,
  maxScore = 100,
  showLabel = true,
  size = "md",
  variant,
  colorClass,
  className,
}: ScoreBadgeProps) {
  const isHighScore = score >= 90
  const normalizedScore = Math.round((score / maxScore) * 100)
  const shouldHighlight = variant === "highlight" || (variant === undefined && isHighScore)

  // Circular variant with SVG ring
  if (variant === "circular") {
    const ringColor = colorClass || getRingColorClass(normalizedScore)
    const { label } = getPriorityLabel(normalizedScore)

    return (
      <div className={cn("flex flex-col items-center text-center", className)}>
        <div className="relative flex items-center justify-center w-12 h-12">
          <svg className="w-full h-full rotate-[-90deg]" viewBox="0 0 36 36">
            {/* Background ring */}
            <path
              className="text-slate-100"
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
            />
            {/* Progress ring */}
            <path
              className={cn(ringColor, "drop-shadow-sm")}
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              fill="none"
              stroke="currentColor"
              strokeDasharray={`${normalizedScore}, 100`}
              strokeWidth="3"
            />
          </svg>
          <span className="absolute text-sm font-bold text-slate-900">
            {normalizedScore}
          </span>
        </div>
        {showLabel && (
          <span className={cn(
            "text-[10px] mt-1 font-bold",
            normalizedScore >= 95 ? "text-primary bg-blue-50 px-1.5 py-0.5 rounded" : "text-slate-500"
          )}>
            {label}
          </span>
        )}
      </div>
    )
  }

  // Original box variant
  const sizeClasses = {
    sm: "w-12 h-12",
    md: "w-14 h-14",
    lg: "w-16 h-16",
  }

  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center rounded-xl border shadow-sm",
        shouldHighlight
          ? "bg-white border-blue-100"
          : "bg-slate-50 border-slate-100 dark:bg-slate-800 dark:border-slate-700",
        sizeClasses[size],
        className
      )}
    >
      {showLabel && (
        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">
          Score
        </span>
      )}
      <span className={cn(
        "font-display font-bold leading-none",
        size === "sm" && "text-base",
        size === "md" && "text-lg",
        size === "lg" && "text-xl",
        shouldHighlight
          ? "text-primary"
          : "text-slate-600 dark:text-slate-300"
      )}>
        {normalizedScore}
      </span>
    </div>
  )
}

export { ScoreBadge }
