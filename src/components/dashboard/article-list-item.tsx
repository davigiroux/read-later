'use client';

import { Clock, Check, Undo, Archive, ArchiveX } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { formatRelativeTime, getDomain } from '@/lib/article-utils';
import type { SavedItem } from '@/contexts/optimistic-articles-context';

interface ArticleListItemProps {
  item: SavedItem;
  index?: number;
  onMarkRead: (id: string) => void;
  onMarkUnread: (id: string) => void;
  onArchive: (id: string) => void;
  onUnarchive: (id: string) => void;
  isPending: boolean;
}

/**
 * List view component for displaying a saved article in a compact row format
 * Features comfortable spacing and condensed information for scanning
 */
export function ArticleListItem({
  item,
  index = 0,
  onMarkRead,
  onMarkUnread,
  onArchive,
  onUnarchive,
  isPending,
}: ArticleListItemProps) {
  const isRead = !!item.readAt;
  const isArchived = !!item.archivedAt;
  const displayTopics = item.topics.slice(0, 3);
  const additionalTopicsCount = item.topics.length - 3;

  return (
    <div
      className={cn(
        'group relative flex items-center gap-4 p-4 border-b last:border-b-0 transition-all duration-200',
        'animate-[slide-up_0.3s_ease-out] opacity-0 [animation-fill-mode:forwards]',
        // Unread state - clean default
        !isRead && !isArchived && [
          'hover:bg-muted/50',
        ],
        // Read state - sage accent
        isRead && !isArchived && [
          'bg-[oklch(0.98_0.01_165)] dark:bg-[oklch(0.18_0.01_165)]',
          'border-l-4 border-l-[oklch(0.58_0.08_165)]',
          'hover:bg-[oklch(0.96_0.015_165)] dark:hover:bg-[oklch(0.19_0.015_165)]',
        ],
        // Archived state - sepia with dashed left border
        isArchived && [
          'bg-[oklch(0.98_0.008_60)] dark:bg-[oklch(0.17_0.008_60)]',
          'border-l-4 border-l-dashed border-l-[oklch(0.75_0.04_60)] dark:border-l-[oklch(0.40_0.03_60)]',
          'opacity-75',
          'hover:bg-[oklch(0.96_0.01_60)] dark:hover:bg-[oklch(0.18_0.01_60)]',
        ]
      )}
      style={{
        animationDelay: `${index * 50}ms`,
      }}
    >
      {/* Title and metadata section */}
      <div className="flex-1 min-w-0 space-y-1">
        <div className="flex items-start gap-3">
          <a
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              'text-base font-semibold leading-tight truncate hover:underline transition-colors flex-1',
              !isRead && !isArchived && 'text-foreground',
              isRead && !isArchived && 'text-[oklch(0.42_0.02_165)] dark:text-[oklch(0.72_0.02_165)]',
              isArchived && 'text-[oklch(0.48_0.02_60)] dark:text-[oklch(0.68_0.02_60)]'
            )}
          >
            {item.title}
          </a>

          {/* Relevance Score Dots (compact) */}
          {item.relevanceScore > 0 && (
            <div className="flex items-center gap-0.5 mt-0.5">
              {Array.from({ length: 5 }).map((_, i) => {
                const threshold = (i + 1) * 0.2;
                const isActive = item.relevanceScore >= threshold;
                const isHighRelevance = item.relevanceScore >= 0.8;
                return (
                  <div
                    key={i}
                    className={cn(
                      'w-1 h-1 rounded-full transition-all duration-200',
                      isActive && isHighRelevance && 'bg-gradient-to-r from-[oklch(0.60_0.12_75)] to-[oklch(0.58_0.14_65)]',
                      isActive && !isHighRelevance && 'bg-muted-foreground/60',
                      !isActive && 'bg-border'
                    )}
                  />
                );
              })}
            </div>
          )}
        </div>

        <div className={cn(
          'flex items-center gap-2 text-xs',
          isArchived && 'opacity-60'
        )}>
          <span className="font-mono text-muted-foreground">{getDomain(item.url)}</span>
          <span className="text-muted-foreground/50">•</span>
          <span className="text-muted-foreground">{formatRelativeTime(item.savedAt)}</span>

          {/* State badge (inline for list view) */}
          {isRead && !isArchived && (
            <>
              <span className="text-muted-foreground/50">•</span>
              <span className="text-[10px] font-semibold tracking-wider text-emerald-700 dark:text-emerald-400 uppercase">
                Read
              </span>
            </>
          )}
          {isArchived && (
            <>
              <span className="text-muted-foreground/50">•</span>
              <span className="text-[10px] font-semibold tracking-wider text-amber-700 dark:text-amber-400 uppercase">
                Archived
              </span>
            </>
          )}
        </div>
      </div>

      {/* Topics (max 3, hidden on mobile) */}
      {displayTopics.length > 0 && (
        <div className="hidden md:flex items-center gap-1.5 flex-shrink-0">
          {displayTopics.map((topic, idx) => (
            <Badge
              key={idx}
              size="xs"
              variant="outline"
              className={cn(
                "transition-colors",
                isRead && !isArchived && "border-[oklch(0.85_0.02_165)] dark:border-[oklch(0.28_0.02_165)] text-[oklch(0.42_0.06_165)] dark:text-[oklch(0.72_0.05_165)]",
                isArchived && "opacity-60"
              )}
            >
              {topic}
            </Badge>
          ))}
          {additionalTopicsCount > 0 && (
            <span className="text-xs text-muted-foreground">
              +{additionalTopicsCount}
            </span>
          )}
        </div>
      )}

      {/* Metadata badges */}
      <div className="flex items-center gap-2 flex-shrink-0">
        <Badge
          size="sm"
          variant="secondary"
          className={cn(
            "transition-colors",
            isRead && !isArchived && "bg-[oklch(0.94_0.01_165)] dark:bg-[oklch(0.20_0.01_165)] text-[oklch(0.42_0.05_165)] dark:text-[oklch(0.72_0.04_165)]",
            isArchived && "opacity-60"
          )}
        >
          <Clock className="h-3 w-3" />
          {item.estimatedTime}m
        </Badge>
        {item.relevanceScore > 0 && (
          <Badge
            size="sm"
            variant={item.relevanceScore >= 0.8 ? 'default' : 'secondary'}
            className={cn(
              isArchived && "opacity-60"
            )}
          >
            {Math.round(item.relevanceScore * 100)}%
          </Badge>
        )}
      </div>

      {/* Actions */}
      <div className="flex items-center gap-1 flex-shrink-0">
        {/* Read/Unread button */}
        {!item.readAt ? (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onMarkRead(item.id)}
            disabled={isPending}
            title="Mark as read"
            className="hover:bg-[oklch(0.94_0.015_165)] hover:text-[oklch(0.40_0.06_165)] dark:hover:bg-[oklch(0.22_0.015_165)] dark:hover:text-[oklch(0.75_0.05_165)]"
          >
            <Check className="h-4 w-4" />
          </Button>
        ) : (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onMarkUnread(item.id)}
            disabled={isPending}
            title="Mark as unread"
            className="text-[oklch(0.45_0.06_165)] hover:bg-[oklch(0.94_0.015_165)] dark:text-[oklch(0.70_0.05_165)] dark:hover:bg-[oklch(0.22_0.015_165)]"
          >
            <Undo className="h-4 w-4" />
          </Button>
        )}

        {/* Archive/Unarchive button */}
        {!item.archivedAt ? (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onArchive(item.id)}
            disabled={isPending}
            title="Archive"
            className="hover:bg-[oklch(0.94_0.012_60)] hover:text-[oklch(0.45_0.04_60)] dark:hover:bg-[oklch(0.21_0.015_60)] dark:hover:text-[oklch(0.70_0.03_60)]"
          >
            <Archive className="h-4 w-4" />
          </Button>
        ) : (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onUnarchive(item.id)}
            disabled={isPending}
            title="Unarchive"
            className="text-[oklch(0.50_0.04_60)] hover:bg-[oklch(0.94_0.012_60)] dark:text-[oklch(0.65_0.03_60)] dark:hover:bg-[oklch(0.21_0.015_60)]"
          >
            <ArchiveX className="h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  );
}
