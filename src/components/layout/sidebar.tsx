"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useUser, useClerk } from "@clerk/nextjs"
import {
  List,
  Archive,
  Compass,
  Settings,
  ChevronLeft,
  ChevronRight,
  LogOut,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Logo } from "@/components/ui/logo"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const navItems = [
  { href: "/dashboard", label: "Smart Queue", icon: List, exactMatch: true },
  { href: "/dashboard/archive", label: "Archive", icon: Archive },
  { href: "/dashboard/discover", label: "Discover", icon: Compass },
]

interface SidebarProps {
  collapsed?: boolean
  onToggle?: () => void
  className?: string
}

function Sidebar({ collapsed = false, onToggle, className }: SidebarProps) {
  const pathname = usePathname()
  const { user } = useUser()
  const { signOut } = useClerk()

  // Get user initials for avatar
  const userInitials = React.useMemo(() => {
    if (!user) return 'U'
    const first = user.firstName?.charAt(0) || ''
    const last = user.lastName?.charAt(0) || ''
    return (first + last).toUpperCase() || user.emailAddresses[0]?.emailAddress?.charAt(0).toUpperCase() || 'U'
  }, [user])

  const userName = user?.fullName || user?.firstName || 'User'

  return (
    <aside
      className={cn(
        "h-full flex flex-col bg-white border-r border-slate-200 transition-all duration-300",
        collapsed ? "w-20" : "w-72",
        className
      )}
    >
      {/* Logo header */}
      <div className="p-6">
        <Link href="/dashboard" className="flex items-center gap-3">
          <Logo showText={!collapsed} size="md" />
        </Link>
        {!collapsed && (
          <p className="text-slate-400 text-xs font-normal mt-1 ml-11">Smart Queue v2.0</p>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-4 py-2 flex flex-col gap-8">
        <div className="flex flex-col gap-1.5">
          {!collapsed && (
            <p className="px-3 text-slate-400 text-xs font-bold uppercase tracking-wider mb-2">
              Library
            </p>
          )}
          {navItems.map((item) => {
            const isActive = item.exactMatch
              ? pathname === item.href
              : pathname === item.href || pathname.startsWith(item.href + '/')

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all group",
                  isActive
                    ? "bg-blue-50 text-primary border border-blue-100 font-medium"
                    : "text-slate-500 hover:bg-slate-50 hover:text-slate-900",
                  collapsed && "justify-center px-0"
                )}
              >
                <item.icon className={cn(
                  "size-5 flex-shrink-0",
                  isActive && "fill-primary/20"
                )} />
                {!collapsed && (
                  <span className="text-sm">{item.label}</span>
                )}
              </Link>
            )
          })}
        </div>

        {/* Collapse toggle */}
        {onToggle && (
          <button
            onClick={onToggle}
            className={cn(
              "flex items-center gap-3 px-3 py-2 rounded-lg",
              "text-slate-400 hover:text-slate-600 hover:bg-slate-50 transition-colors",
              collapsed && "justify-center px-0"
            )}
          >
            {collapsed ? (
              <ChevronRight className="size-5" />
            ) : (
              <>
                <ChevronLeft className="size-5" />
                <span className="text-sm">Collapse</span>
              </>
            )}
          </button>
        )}
      </nav>

      {/* Bottom section: Settings + Profile */}
      <div className="p-4 border-t border-slate-200 bg-white">
        {/* Settings link */}
        <Link
          href="/settings"
          className={cn(
            "flex items-center gap-3 px-3 py-2 rounded-lg",
            "text-slate-500 hover:text-slate-900 transition-colors",
            collapsed && "justify-center px-0"
          )}
        >
          <Settings className="size-5" />
          {!collapsed && <span className="text-sm font-medium">Settings</span>}
        </Link>

        {/* User profile dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button
              className={cn(
                "flex items-center gap-3 px-3 py-3 mt-2 rounded-lg w-full",
                "hover:bg-slate-50 cursor-pointer transition-colors",
                "border border-transparent hover:border-slate-100",
                collapsed && "justify-center px-0"
              )}
            >
              {/* Gradient avatar */}
              <div className="w-8 h-8 rounded-full bg-linear-to-tr from-blue-500 to-purple-500 flex items-center justify-center text-white text-xs font-bold shadow-md shrink-0">
                {userInitials}
              </div>
              {!collapsed && (
                <div className="flex flex-col min-w-0 text-left">
                  <span className="text-slate-900 text-sm font-semibold leading-none truncate">
                    {userName}
                  </span>
                  <span className="text-slate-400 text-xs leading-none mt-1">
                    Pro Member
                  </span>
                </div>
              )}
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent side={collapsed ? "right" : "top"} align="start" className="w-56">
            <DropdownMenuItem asChild>
              <Link href="/settings" className="flex items-center gap-2">
                <Settings className="size-4" />
                Settings
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => signOut({ redirectUrl: '/' })}
              className="text-red-600 focus:text-red-600 focus:bg-red-50"
            >
              <LogOut className="size-4 mr-2" />
              Sign out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </aside>
  )
}

export { Sidebar }
