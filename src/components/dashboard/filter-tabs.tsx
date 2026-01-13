'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { cn } from '@/lib/utils';

interface FilterTabsProps {
  counts: {
    all: number;
    unread: number;
    read: number;
    archived: number;
    quickRead: number;
  };
}

export function FilterTabs({ counts }: FilterTabsProps) {
  const searchParams = useSearchParams();
  const currentFilter = searchParams.get('filter') || 'all';

  const tabs = [
    { value: 'all', label: 'All', count: counts.all },
    { value: 'unread', label: 'Unread', count: counts.unread },
    { value: 'read', label: 'Read', count: counts.read },
    { value: 'archived', label: 'Archived', count: counts.archived },
    { value: 'quick-read', label: 'Quick Read', count: counts.quickRead },
  ];

  return (
    <div className="flex w-full items-center rounded-lg bg-muted p-1 mb-6 overflow-x-auto">
      {tabs.map((tab) => {
        const isActive = currentFilter === tab.value;
        const href =
          tab.value === 'all' ? '/dashboard' : `/dashboard?filter=${tab.value}`;

        return (
          <Link
            key={tab.value}
            href={href}
            className={cn(
              'relative inline-flex items-center justify-center whitespace-nowrap rounded-md px-2 sm:px-3 md:px-4 h-9 sm:h-10 text-xs sm:text-sm font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 flex-shrink-0',
              isActive
                ? 'bg-background text-foreground shadow-sm font-semibold'
                : 'text-muted-foreground hover:bg-background/50 hover:text-foreground'
            )}
          >
            <span className="truncate">{tab.label}</span>
            {tab.count > 0 && (
              <>
                <span className="mx-1 sm:mx-1.5 text-muted-foreground/40">·</span>
                <span className={cn(
                  'text-xs sm:text-sm tabular-nums transition-colors',
                  isActive ? 'text-muted-foreground font-medium' : 'text-muted-foreground/60'
                )}>
                  {tab.count}
                </span>
              </>
            )}
          </Link>
        );
      })}
    </div>
  );
}
