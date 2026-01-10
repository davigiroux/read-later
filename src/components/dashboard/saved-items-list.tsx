'use client';

import { useOptimistic, useTransition } from 'react';
import { ExternalLink, Clock, Check, Undo, Archive, ArchiveX } from 'lucide-react';
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
import { cn } from '@/lib/utils';
import {
  markAsRead,
  markAsUnread,
  archiveItem,
  unarchiveItem,
} from '@/app/actions/article-actions';

interface SavedItem {
  id: string;
  url: string;
  title: string;
  estimatedTime: number;
  savedAt: Date;
  topics: string[];
  relevanceScore: number;
  reasoning: string;
  readAt: Date | null;
  archivedAt: Date | null;
}

interface SavedItemsListProps {
  items: SavedItem[];
}

/**
 * Format a date as relative time (e.g., "2 days ago")
 */
function formatRelativeTime(date: Date): string {
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return 'Today';
  if (diffDays === 1) return 'Yesterday';
  if (diffDays < 7) return `${diffDays} days ago`;
  if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
  if (diffDays < 365) return `${Math.floor(diffDays / 30)} months ago`;
  return `${Math.floor(diffDays / 365)} years ago`;
}

/**
 * Extract domain from URL for display
 */
function getDomain(url: string): string {
  try {
    const urlObj = new URL(url);
    return urlObj.hostname.replace('www.', '');
  } catch {
    return url;
  }
}

type ArticleAction = 'read' | 'unread' | 'archive' | 'unarchive';

/**
 * Client component that displays a grid of saved articles with action buttons
 */
export function SavedItemsList({ items }: SavedItemsListProps) {
  const [isPending, startTransition] = useTransition();
  const [optimisticItems, updateOptimisticItems] = useOptimistic(
    items,
    (state, { id, action }: { id: string; action: ArticleAction }) => {
      return state.map((item) => {
        if (item.id !== id) return item;

        switch (action) {
          case 'read':
            return { ...item, readAt: new Date() };
          case 'unread':
            return { ...item, readAt: null };
          case 'archive':
            return { ...item, archivedAt: new Date() };
          case 'unarchive':
            return { ...item, archivedAt: null };
          default:
            return item;
        }
      });
    }
  );

  // Handler functions
  const handleMarkRead = (id: string) => {
    startTransition(() => {
      updateOptimisticItems({ id, action: 'read' });
      markAsRead(id);
    });
  };

  const handleMarkUnread = (id: string) => {
    startTransition(() => {
      updateOptimisticItems({ id, action: 'unread' });
      markAsUnread(id);
    });
  };

  const handleArchive = (id: string) => {
    startTransition(() => {
      updateOptimisticItems({ id, action: 'archive' });
      archiveItem(id);
    });
  };

  const handleUnarchive = (id: string) => {
    startTransition(() => {
      updateOptimisticItems({ id, action: 'unarchive' });
      unarchiveItem(id);
    });
  };

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {optimisticItems.map((item) => {
        const isRead = !!item.readAt;
        const isArchived = !!item.archivedAt;

        return (
          <Card
            key={item.id}
            className={cn(
              'flex flex-col relative overflow-hidden transition-all duration-300',
              // Unread state (default) - crisp and inviting
              !isRead && !isArchived && 'bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 shadow-sm hover:shadow-md',
              // Read state - soft emerald accent with bookmark feel
              isRead && !isArchived && [
                'bg-emerald-50/30 dark:bg-emerald-950/20',
                'border-l-4 border-l-emerald-500 dark:border-l-emerald-600',
                'border-t border-r border-b border-emerald-100 dark:border-emerald-900/50',
                'shadow-sm shadow-emerald-100/50 dark:shadow-emerald-950/50',
              ],
              // Archived state - warm sepia with filing folder feel
              isArchived && [
                'bg-amber-50/40 dark:bg-amber-950/10',
                'border-2 border-dashed border-amber-200 dark:border-amber-900/40',
                'shadow-sm shadow-amber-100/30 dark:shadow-amber-950/30',
              ]
            )}
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
              <CardTitle className={cn(
                'line-clamp-2 text-lg transition-colors',
                isRead && !isArchived && 'text-zinc-700 dark:text-zinc-300',
                isArchived && 'text-amber-900/70 dark:text-amber-200/60'
              )}>
                {item.title}
              </CardTitle>
              <CardDescription className={cn(
                'flex items-center gap-2',
                isArchived && 'text-amber-600/60 dark:text-amber-400/40'
              )}>
                <span className="truncate">{getDomain(item.url)}</span>
                <span>•</span>
                <span>{formatRelativeTime(item.savedAt)}</span>
              </CardDescription>
            </CardHeader>

          <CardContent className="flex-1 space-y-3">
            {/* Reading time and relevance score */}
            <div className="flex items-center gap-2 flex-wrap">
              <Badge
                variant="secondary"
                className={cn(
                  "flex items-center gap-1 transition-colors",
                  isRead && !isArchived && "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300",
                  isArchived && "bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300"
                )}
              >
                <Clock className="h-3 w-3" />
                {item.estimatedTime} min read
              </Badge>
              {item.relevanceScore > 0 && (
                <Badge
                  variant={
                    item.relevanceScore >= 0.8
                      ? 'default'
                      : item.relevanceScore >= 0.5
                        ? 'secondary'
                        : 'outline'
                  }
                  className={cn(
                    "flex items-center gap-1 transition-colors",
                    isArchived && "opacity-60"
                  )}
                >
                  ⭐ {Math.round(item.relevanceScore * 100)}% match
                </Badge>
              )}
            </div>

            {/* Topics */}
            {item.topics.length > 0 && (
              <div className="flex flex-wrap gap-1">
                {item.topics.map((topic, idx) => (
                  <Badge
                    key={idx}
                    variant="outline"
                    className={cn(
                      "text-xs transition-colors",
                      isRead && !isArchived && "border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300",
                      isArchived && "border-amber-200 dark:border-amber-800 text-amber-700 dark:text-amber-400 opacity-70"
                    )}
                  >
                    {topic}
                  </Badge>
                ))}
              </div>
            )}

            {/* AI reasoning (if relevance score exists) */}
            {item.reasoning && item.relevanceScore > 0 && (
              <p className={cn(
                "text-xs italic transition-colors",
                !isArchived && "text-zinc-600 dark:text-zinc-400",
                isArchived && "text-amber-700/60 dark:text-amber-400/50"
              )}>
                {item.reasoning}
              </p>
            )}
          </CardContent>

          <CardFooter className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              className={cn(
                "flex-1 transition-colors",
                isRead && !isArchived && "border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300 hover:bg-emerald-50 dark:hover:bg-emerald-950/30",
                isArchived && "border-amber-200 dark:border-amber-800 text-amber-700 dark:text-amber-400 hover:bg-amber-50 dark:hover:bg-amber-950/30"
              )}
              asChild
            >
              <a
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2"
              >
                Read Article
                <ExternalLink className="h-4 w-4" />
              </a>
            </Button>

            {/* Read/Unread button */}
            {!item.readAt ? (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleMarkRead(item.id)}
                disabled={isPending}
                title="Mark as read"
                className="hover:bg-emerald-50 dark:hover:bg-emerald-950/30 hover:text-emerald-700 dark:hover:text-emerald-300"
              >
                <Check className="h-4 w-4" />
              </Button>
            ) : (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleMarkUnread(item.id)}
                disabled={isPending}
                title="Mark as unread"
                className="text-emerald-600 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-950/30"
              >
                <Undo className="h-4 w-4" />
              </Button>
            )}

            {/* Archive/Unarchive button */}
            {!item.archivedAt ? (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleArchive(item.id)}
                disabled={isPending}
                title="Archive"
                className="hover:bg-amber-50 dark:hover:bg-amber-950/30 hover:text-amber-700 dark:hover:text-amber-300"
              >
                <Archive className="h-4 w-4" />
              </Button>
            ) : (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleUnarchive(item.id)}
                disabled={isPending}
                title="Unarchive"
                className="text-amber-600 dark:text-amber-400 hover:bg-amber-50 dark:hover:bg-amber-950/30"
              >
                <ArchiveX className="h-4 w-4" />
              </Button>
            )}
          </CardFooter>
        </Card>
      );
      })}
    </div>
  );
}
