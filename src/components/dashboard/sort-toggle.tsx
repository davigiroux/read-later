'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { cn } from '@/lib/utils';

export type SortOption = 'priority' | 'newest' | 'shortest';

interface SortToggleProps {
  className?: string;
}

export function SortToggle({ className }: SortToggleProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentSort = (searchParams.get('sort') as SortOption) || 'priority';
  const t = useTranslations('dashboard.sort');

  const sortOptions: { value: SortOption; labelKey: 'priority' | 'newest' | 'shortest' }[] = [
    { value: 'priority', labelKey: 'priority' },
    { value: 'newest', labelKey: 'newest' },
    { value: 'shortest', labelKey: 'shortest' },
  ];

  const handleSortChange = (sort: SortOption) => {
    const params = new URLSearchParams(searchParams.toString());
    if (sort === 'priority') {
      params.delete('sort'); // Default, no need for URL param
    } else {
      params.set('sort', sort);
    }
    router.push(`?${params.toString()}`, { scroll: false });
  };

  return (
    <div
      className={cn(
        'flex items-center gap-1 bg-white p-1 rounded-lg border border-slate-200 shadow-sm',
        className
      )}
    >
      {sortOptions.map((option) => (
        <button
          key={option.value}
          onClick={() => handleSortChange(option.value)}
          className={cn(
            'px-3 py-1.5 rounded text-xs font-medium transition-colors',
            currentSort === option.value
              ? 'bg-slate-100 text-slate-900 font-semibold shadow-sm border border-slate-200'
              : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50'
          )}
        >
          {t(option.labelKey)}
        </button>
      ))}
    </div>
  );
}
