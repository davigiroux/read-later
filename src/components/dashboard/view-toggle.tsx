'use client';

import { LayoutGrid, List } from 'lucide-react';
import { useViewPreference, type ViewMode } from '@/contexts/view-preference-context';
import { cn } from '@/lib/utils';

/**
 * Toggle component to switch between card and list views
 * Uses localStorage to persist user preference
 */
export function ViewToggle() {
  const { viewMode, setViewMode } = useViewPreference();

  const views: { mode: ViewMode; icon: typeof LayoutGrid; label: string }[] = [
    { mode: 'card', icon: LayoutGrid, label: 'Card view' },
    { mode: 'list', icon: List, label: 'List view' },
  ];

  return (
    <div
      className="inline-flex items-center rounded-lg bg-muted p-1"
      role="group"
      aria-label="View mode"
    >
      {views.map(({ mode, icon: Icon, label }) => {
        const isActive = viewMode === mode;

        return (
          <button
            key={mode}
            onClick={() => setViewMode(mode)}
            aria-label={label}
            aria-pressed={isActive}
            className={cn(
              'relative inline-flex items-center justify-center rounded-md p-2 transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
              isActive
                ? 'bg-background text-foreground shadow-sm'
                : 'text-muted-foreground hover:bg-background/50 hover:text-foreground'
            )}
          >
            <Icon className="h-4 w-4" />
          </button>
        );
      })}
    </div>
  );
}
