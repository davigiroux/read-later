'use client';

import { ExternalLink, Clock, Check, Undo, Archive, ArchiveX, Play, TrendingUp } from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ScoreBadge } from './score-badge';
import { cn } from '@/lib/utils';
import { formatRelativeTime, getDomain } from '@/lib/article-utils';
import type { SavedItem } from '@/contexts/optimistic-articles-context';

interface ArticleCardProps {
  item: SavedItem;
  index?: number;
  onMarkRead: (id: string) => void;
  onMarkUnread: (id: string) => void;
  onArchive: (id: string) => void;
  onUnarchive: (id: string) => void;
  isPending: boolean;
  showScore?: boolean;
  isPriority?: boolean;
}

/**
 * Card component for displaying a saved article with all metadata and actions
 * Supports read/unread and archived states with distinct visual styling
 */
export function ArticleCard({
  item,
  index = 0,
  onMarkRead,
  onMarkUnread,
  onArchive,
  onUnarchive,
  isPending,
  showScore = true,
  isPriority = false,
}: ArticleCardProps) {
  const isRead = !!item.readAt;
  const isArchived = !!item.archivedAt;
  const isHighImpact = item.relevanceScore >= 0.9;

  return (
    <Card
      key={item.id}
      elevation="interactive"
      accentBar={isPriority && !isRead && !isArchived}
      accentColor="primary"
      className={cn(
        'flex flex-col relative overflow-hidden',
        // Stagger animation on load
        'animate-[slide-up_0.3s_ease-out] opacity-0 [animation-fill-mode:forwards]',
        // Unread state (default) - clean and sophisticated
        !isRead && !isArchived && 'bg-card border-border',
        // Priority item highlight
        isPriority && !isRead && !isArchived && 'border-primary/30 bg-primary/[0.02]',
        // Read state - cool sage accent with refined feel
        isRead && !isArchived && [
          'bg-[oklch(0.96_0.02_165)] dark:bg-[oklch(0.20_0.015_165)]',
          'border-l-4 border-l-[oklch(0.58_0.08_165)]',
          'border-t border-r border-b border-[oklch(0.88_0.02_165)] dark:border-[oklch(0.25_0.02_165)]',
        ],
        // Archived state - cool sepia with filed-away feel
        isArchived && [
          'bg-[oklch(0.96_0.015_60)] dark:bg-[oklch(0.19_0.015_60)]',
          'border-2 border-dashed border-[oklch(0.85_0.02_60)] dark:border-[oklch(0.28_0.02_60)]',
          'opacity-85',
        ]
      )}
      style={{
        animationDelay: `${index * 50}ms`,
      }}
    >
      {/* State indicator badge */}
      {isRead && !isArchived && (
        <div className="absolute top-3 right-3 z-10">
          <div className="px-2 py-0.5 text-[10px] font-semibold tracking-wider bg-emerald-500/10 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-400 border border-emerald-500/20 dark:border-emerald-500/30 rounded-sm backdrop-blur-sm">
            READ
          </div>
        </div>
      )}
      {isArchived && (
        <div className="absolute top-3 right-3 z-10">
          <div className="px-2 py-0.5 text-[10px] font-semibold tracking-wider bg-amber-500/10 dark:bg-amber-500/20 text-amber-700 dark:text-amber-400 border border-amber-500/20 dark:border-amber-500/30 rounded-sm backdrop-blur-sm">
            ARCHIVED
          </div>
        </div>
      )}

      <CardHeader>
        <div className="flex items-start gap-3">
          <div className="flex-1 min-w-0">
            {/* High Impact Badge */}
            {isHighImpact && !isRead && !isArchived && (
              <Badge variant="high-impact" size="xs" className="mb-2">
                <TrendingUp className="size-3" />
                High Impact
              </Badge>
            )}
            <CardTitle className={cn(
              'line-clamp-2 text-xl font-semibold leading-tight transition-colors',
              isRead && !isArchived && 'text-[oklch(0.40_0.01_165)] dark:text-[oklch(0.75_0.01_165)]',
              isArchived && 'text-[oklch(0.45_0.015_60)] dark:text-[oklch(0.70_0.015_60)]'
            )}>
              {item.title}
            </CardTitle>
            <CardDescription className={cn(
              'flex items-center gap-2 mt-2',
              isArchived && 'opacity-60'
            )}>
              <span className="truncate font-mono text-xs">{getDomain(item.url)}</span>
              <span className="text-muted-foreground/50">•</span>
              <span className="text-xs">{formatRelativeTime(item.savedAt)}</span>
            </CardDescription>
          </div>
          {/* Score Badge on right */}
          {showScore && item.relevanceScore > 0 && !isArchived && (
            <ScoreBadge
              score={Math.round(item.relevanceScore * 100)}
              size="md"
              className="flex-shrink-0"
            />
          )}
        </div>
      </CardHeader>

      <CardContent className="flex-1 space-y-4">
        {/* Reading time */}
        <div className="flex items-center gap-2">
          <Badge
            size="sm"
            variant="secondary"
            className={cn(
              "transition-colors",
              isRead && !isArchived && "bg-[oklch(0.92_0.015_165)] dark:bg-[oklch(0.22_0.015_165)] text-[oklch(0.40_0.06_165)] dark:text-[oklch(0.75_0.05_165)] border-[oklch(0.85_0.02_165)] dark:border-[oklch(0.28_0.02_165)]",
              isArchived && "opacity-60"
            )}
          >
            <Clock className="h-3 w-3" />
            {item.estimatedTime} min read
          </Badge>
        </div>

        {/* Topics */}
        {item.topics.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {item.topics.map((topic, idx) => (
              <Badge
                key={idx}
                size="xs"
                variant="outline"
                className={cn(
                  "transition-colors",
                  isRead && !isArchived && "border-[oklch(0.85_0.02_165)] dark:border-[oklch(0.28_0.02_165)] text-[oklch(0.40_0.06_165)] dark:text-[oklch(0.75_0.05_165)]",
                  isArchived && "opacity-60"
                )}
              >
                {topic}
              </Badge>
            ))}
          </div>
        )}

        {/* AI reasoning (if relevance score exists) */}
        {item.reasoning && item.relevanceScore > 0 && (
          <div className="flex gap-2 items-start">
            <span className="text-muted-foreground/40 text-sm mt-0.5">&ldquo;</span>
            <p className={cn(
              "text-xs italic leading-relaxed transition-colors flex-1",
              !isArchived && "text-muted-foreground",
              isArchived && "opacity-60"
            )}>
              {item.reasoning}
            </p>
            <span className="text-muted-foreground/40 text-sm mt-0.5">&rdquo;</span>
          </div>
        )}
      </CardContent>

      <CardFooter className="flex gap-2">
        {/* Play/Start Reading Button */}
        <Button
          variant="primary-blue"
          size="sm"
          className="gap-2"
          asChild
        >
          <a
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Play className="size-4 fill-current" />
            Read
          </a>
        </Button>

        <Button
          variant="outline"
          size="sm"
          className={cn(
            "flex-1",
            isRead && !isArchived && "border-[oklch(0.85_0.02_165)] text-[oklch(0.40_0.06_165)] hover:bg-[oklch(0.94_0.015_165)] dark:border-[oklch(0.28_0.02_165)] dark:text-[oklch(0.75_0.05_165)] dark:hover:bg-[oklch(0.22_0.015_165)]",
            isArchived && "border-[oklch(0.85_0.02_60)] text-[oklch(0.45_0.04_60)] hover:bg-[oklch(0.94_0.012_60)] dark:border-[oklch(0.28_0.02_60)] dark:text-[oklch(0.70_0.03_60)] dark:hover:bg-[oklch(0.21_0.015_60)]"
          )}
          asChild
        >
          <a
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2"
          >
            Open
            <ExternalLink className="h-4 w-4" />
          </a>
        </Button>

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
      </CardFooter>
    </Card>
  );
}
