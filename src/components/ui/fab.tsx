"use client"

import * as React from "react"
import { Plus } from "lucide-react"
import { cn } from "@/lib/utils"

interface FABProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: React.ReactNode
  position?: "bottom-right" | "bottom-left" | "bottom-center"
}

const positionMap = {
  "bottom-right": "bottom-6 right-6",
  "bottom-left": "bottom-6 left-6",
  "bottom-center": "bottom-6 left-1/2 -translate-x-1/2",
}

function FAB({
  icon,
  position = "bottom-right",
  className,
  children,
  ...props
}: FABProps) {
  return (
    <button
      className={cn(
        "fixed z-50 flex items-center justify-center",
        "size-14 rounded-full",
        "bg-primary text-primary-foreground",
        "shadow-[var(--shadow-blue-lg)]",
        "hover:scale-110 hover:shadow-[0_12px_32px_oklch(0.48_0.22_262_/_0.35)]",
        "active:scale-95",
        "transition-all duration-200",
        "group",
        positionMap[position],
        className
      )}
      {...props}
    >
      <span className="transition-transform duration-200 group-hover:rotate-90">
        {icon || <Plus className="size-6" />}
      </span>
      {children}
    </button>
  )
}

export { FAB }
