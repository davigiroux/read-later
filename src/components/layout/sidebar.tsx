"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  LayoutDashboard,
  Bookmark,
  Sparkles,
  BarChart3,
  Settings,
  ChevronLeft,
  ChevronRight,
  Layers,
} from "lucide-react"
import { UserButton } from "@clerk/nextjs"
import { cn } from "@/lib/utils"

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/dashboard/bookmarks", label: "Bookmarks", icon: Bookmark },
  { href: "/dashboard/ai-picks", label: "AI Picks", icon: Sparkles },
  { href: "/dashboard/analytics", label: "Analytics", icon: BarChart3 },
  { href: "/settings", label: "Settings", icon: Settings },
]

interface SidebarProps {
  collapsed?: boolean
  onToggle?: () => void
  className?: string
}

function Sidebar({ collapsed = false, onToggle, className }: SidebarProps) {
  const pathname = usePathname()

  return (
    <aside
      className={cn(
        "h-full flex flex-col bg-card border-r transition-all duration-300",
        collapsed ? "w-20" : "w-64",
        className
      )}
    >
      {/* Logo header */}
      <div className="h-16 flex items-center justify-between px-4 border-b">
        <Link href="/dashboard" className="flex items-center gap-3">
          <Layers className="size-7 text-primary flex-shrink-0" />
          {!collapsed && (
            <span className="font-display font-bold text-lg tracking-tight">
              LaterStack
            </span>
          )}
        </Link>
        {onToggle && (
          <button
            onClick={onToggle}
            className={cn(
              "size-8 flex items-center justify-center rounded-md",
              "hover:bg-accent transition-colors",
              collapsed && "mx-auto"
            )}
          >
            {collapsed ? (
              <ChevronRight className="size-4" />
            ) : (
              <ChevronLeft className="size-4" />
            )}
          </button>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-4 px-3">
        <ul className="space-y-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href ||
              (item.href !== "/dashboard" && pathname.startsWith(item.href))

            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2.5 rounded-lg",
                    "transition-all duration-200 relative",
                    "hover:bg-accent group",
                    isActive && "bg-primary/10 text-primary",
                    collapsed && "justify-center px-0"
                  )}
                >
                  {/* Active indicator bar */}
                  {isActive && (
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-primary rounded-r-full" />
                  )}
                  <item.icon
                    className={cn(
                      "size-5 flex-shrink-0",
                      isActive
                        ? "text-primary"
                        : "text-muted-foreground group-hover:text-foreground"
                    )}
                  />
                  {!collapsed && (
                    <span
                      className={cn(
                        "text-sm font-medium",
                        isActive
                          ? "text-primary"
                          : "text-muted-foreground group-hover:text-foreground"
                      )}
                    >
                      {item.label}
                    </span>
                  )}
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>

      {/* User profile section */}
      <div
        className={cn(
          "p-4 border-t",
          collapsed ? "flex justify-center" : "flex items-center gap-3"
        )}
      >
        <UserButton
          appearance={{
            elements: {
              avatarBox: "size-9",
            },
          }}
        />
        {!collapsed && (
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate">Account</p>
            <p className="text-xs text-muted-foreground">Manage profile</p>
          </div>
        )}
      </div>
    </aside>
  )
}

export { Sidebar }
