'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

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
    <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
      {tabs.map((tab) => {
        const isActive = currentFilter === tab.value;
        const href =
          tab.value === 'all' ? '/dashboard' : `/dashboard?filter=${tab.value}`;

        return (
          <Button
            key={tab.value}
            asChild
            variant={isActive ? 'default' : 'outline'}
            size="sm"
          >
            <Link href={href} className="flex items-center gap-2">
              {tab.label}
              {tab.count > 0 && (
                <Badge
                  variant={isActive ? 'secondary' : 'outline'}
                  className="ml-1"
                >
                  {tab.count}
                </Badge>
              )}
            </Link>
          </Button>
        );
      })}
    </div>
  );
}
