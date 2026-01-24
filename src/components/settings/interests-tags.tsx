"use client"

import * as React from "react"
import { TagInput } from "@/components/ui/tag-input"
import { cn } from "@/lib/utils"

interface InterestsTagsProps {
  interests: string[]
  onChange: (interests: string[]) => void
  suggestedTags?: string[]
  className?: string
}

const defaultSuggestedTags = [
  "Technology",
  "AI & Machine Learning",
  "Web Development",
  "Design",
  "Business",
  "Science",
  "Health",
  "Finance",
  "Productivity",
  "Career",
]

function InterestsTags({
  interests,
  onChange,
  suggestedTags = defaultSuggestedTags,
  className,
}: InterestsTagsProps) {
  const availableSuggestions = suggestedTags.filter(
    (tag) => !interests.includes(tag)
  )

  const handleAddSuggestion = (tag: string) => {
    if (!interests.includes(tag)) {
      onChange([...interests, tag])
    }
  }

  return (
    <div className={cn("space-y-4", className)}>
      <TagInput
        value={interests}
        onChange={onChange}
        suggestions={suggestedTags}
        placeholder="Add an interest..."
      />

      {/* Suggested tags section */}
      {availableSuggestions.length > 0 && (
        <div className="space-y-2">
          <p className="text-sm text-muted-foreground">Suggested topics:</p>
          <div
            className={cn(
              "flex flex-wrap gap-2 p-3 rounded-lg",
              "border-2 border-dashed border-muted"
            )}
          >
            {availableSuggestions.slice(0, 6).map((tag) => (
              <button
                key={tag}
                type="button"
                onClick={() => handleAddSuggestion(tag)}
                className={cn(
                  "px-3 py-1.5 rounded-md text-sm",
                  "bg-muted hover:bg-accent",
                  "text-muted-foreground hover:text-foreground",
                  "transition-colors"
                )}
              >
                + {tag}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export { InterestsTags }
