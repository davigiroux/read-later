"use client"

import { cn } from "@/lib/utils"

interface PageHeaderProps {
  title: string
  subtitle?: string | React.ReactNode
  actions?: React.ReactNode
  className?: string
}

function PageHeader({
  title,
  subtitle,
  actions,
  className,
}: PageHeaderProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-1 md:flex-row md:items-end md:justify-between",
        className
      )}
    >
      {/* Left side: Title and subtitle */}
      <div>
        <h1 className="font-display text-3xl font-bold tracking-tight text-slate-900 mb-2">
          {title}
        </h1>
        {subtitle && (
          <p className="text-slate-500 text-sm">{subtitle}</p>
        )}
      </div>

      {/* Right side: Actions */}
      {actions && (
        <div className="mt-4 md:mt-0">{actions}</div>
      )}
    </div>
  )
}

export { PageHeader }
