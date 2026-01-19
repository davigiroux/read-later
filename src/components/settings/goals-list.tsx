"use client"

import * as React from "react"
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core"
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import { GripVertical } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

interface Goal {
  id: string
  name: string
  description?: string
}

interface GoalsListProps {
  goals: Goal[]
  onChange: (goals: Goal[]) => void
  className?: string
}

const scoreModifiers = [
  { label: "+20%", color: "bg-primary text-primary-foreground" },
  { label: "+10%", color: "bg-primary/60 text-primary-foreground" },
  { label: "Baseline", color: "bg-slate-200 text-slate-700 dark:bg-slate-700 dark:text-slate-300" },
]

function SortableGoalItem({
  goal,
  index,
}: {
  goal: Goal
  index: number
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: goal.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  const isTopGoal = index === 0
  const modifier = scoreModifiers[Math.min(index, scoreModifiers.length - 1)]

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={cn(
        "flex items-center gap-3 p-4 rounded-lg border bg-card",
        "transition-all duration-200",
        isDragging && "shadow-lg opacity-90 z-50",
        isTopGoal && "border-l-4 border-l-primary"
      )}
    >
      {/* Drag handle */}
      <button
        {...attributes}
        {...listeners}
        className={cn(
          "cursor-grab active:cursor-grabbing",
          "p-1 -ml-1 rounded hover:bg-accent",
          "text-muted-foreground hover:text-foreground",
          "transition-colors"
        )}
      >
        <GripVertical className="size-5" />
      </button>

      {/* Position badge */}
      <div
        className={cn(
          "size-8 rounded-full flex items-center justify-center flex-shrink-0",
          "text-sm font-bold",
          isTopGoal
            ? "bg-primary text-primary-foreground"
            : "bg-muted text-muted-foreground"
        )}
      >
        {index + 1}
      </div>

      {/* Goal content */}
      <div className="flex-1 min-w-0">
        <p className="font-medium truncate">{goal.name}</p>
        {goal.description && (
          <p className="text-sm text-muted-foreground truncate">
            {goal.description}
          </p>
        )}
      </div>

      {/* Score modifier badge */}
      <Badge className={cn("flex-shrink-0", modifier.color)}>
        {modifier.label}
      </Badge>
    </div>
  )
}

function GoalsList({ goals, onChange, className }: GoalsListProps) {
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  )

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event

    if (over && active.id !== over.id) {
      const oldIndex = goals.findIndex((g) => g.id === active.id)
      const newIndex = goals.findIndex((g) => g.id === over.id)
      onChange(arrayMove(goals, oldIndex, newIndex))
    }
  }

  return (
    <div className={cn("space-y-2", className)}>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={goals.map((g) => g.id)}
          strategy={verticalListSortingStrategy}
        >
          {goals.map((goal, index) => (
            <SortableGoalItem key={goal.id} goal={goal} index={index} />
          ))}
        </SortableContext>
      </DndContext>
    </div>
  )
}

export { GoalsList, type Goal }
