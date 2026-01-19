"use client"

import * as React from "react"
import { Search, Command } from "lucide-react"
import { cn } from "@/lib/utils"

interface PageHeaderProps {
  title: string
  subtitle?: string
  sortDropdown?: React.ReactNode
  searchPlaceholder?: string
  onSearch?: (query: string) => void
  searchValue?: string
  focusTimer?: React.ReactNode
  actions?: React.ReactNode
  className?: string
}

function PageHeader({
  title,
  subtitle,
  sortDropdown,
  searchPlaceholder = "Search...",
  onSearch,
  searchValue = "",
  focusTimer,
  actions,
  className,
}: PageHeaderProps) {
  const [localSearchValue, setLocalSearchValue] = React.useState(searchValue)

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocalSearchValue(e.target.value)
    onSearch?.(e.target.value)
  }

  // Handle ⌘K keyboard shortcut
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault()
        const input = document.querySelector<HTMLInputElement>('[data-search-input]')
        input?.focus()
      }
    }
    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [])

  return (
    <div
      className={cn(
        "flex flex-col gap-4 md:flex-row md:items-center md:justify-between",
        "pb-6 border-b",
        className
      )}
    >
      {/* Left side: Title and sort */}
      <div className="flex flex-col gap-2 md:flex-row md:items-center md:gap-4">
        <div>
          <h1 className="font-display text-2xl md:text-3xl font-bold tracking-tight">
            {title}
          </h1>
          {subtitle && (
            <p className="text-muted-foreground text-sm mt-1">{subtitle}</p>
          )}
        </div>
        {sortDropdown && (
          <div className="md:ml-4">{sortDropdown}</div>
        )}
      </div>

      {/* Right side: Search, timer, actions */}
      <div className="flex items-center gap-3">
        {/* Search bar */}
        {onSearch && (
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
            <input
              data-search-input
              type="text"
              value={localSearchValue}
              onChange={handleSearchChange}
              placeholder={searchPlaceholder}
              className={cn(
                "h-10 pl-10 pr-16 rounded-lg border bg-background",
                "text-sm placeholder:text-muted-foreground",
                "focus:outline-none focus:ring-2 focus:ring-ring",
                "w-full md:w-64 lg:w-80"
              )}
            />
            <kbd
              className={cn(
                "absolute right-3 top-1/2 -translate-y-1/2",
                "hidden sm:flex items-center gap-1",
                "px-1.5 py-0.5 rounded text-xs text-muted-foreground",
                "bg-muted border"
              )}
            >
              <Command className="size-3" />K
            </kbd>
          </div>
        )}

        {/* Focus timer */}
        {focusTimer}

        {/* Additional actions */}
        {actions}
      </div>
    </div>
  )
}

export { PageHeader }
