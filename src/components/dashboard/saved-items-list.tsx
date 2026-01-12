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
import {
  useOptimisticArticles,
  isOptimisticArticle,
  type SavedItem,
} from '@/contexts/optimistic-articles-context';
import {
  LoadingArticleCard,
  ErrorArticleCard,
} from './optimistic-article-card';

interface SavedItemsListProps {
  items?: SavedItem[];
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
 * Supports optimistic UI updates for both new articles and read/archive actions
 */
export function SavedItemsList({ items }: SavedItemsListProps) {
  const { articles, retryArticle, dismissArticle } = useOptimisticArticles();
  const [isPending, startTransition] = useTransition();

  // Use provided items or get all from context
  const savedItems = items || (articles.filter(a => !isOptimisticArticle(a)) as SavedItem[]);
  const [optimisticItems, updateOptimisticItems] = useOptimistic(
    savedItems,
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

  // Get optimistic articles and merge with saved items
  const optimisticArticles = articles.filter(isOptimisticArticle);
  const allArticles = [...optimisticArticles, ...optimisticItems];

  return (
    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
      {allArticles.map((article, index) => {
        // Render optimistic cards (loading, error, success)
        if (isOptimisticArticle(article)) {
          if (article.status === 'loading') {
            return (
              <LoadingArticleCard
                key={article.optimisticId}
                url={article.url}
                index={index}
              />
            );
          }

          if (article.status === 'error') {
            return (
              <ErrorArticleCard
                key={article.optimisticId}
                url={article.url}
                error={article.error || 'Unknown error'}
                onRetry={() => retryArticle(article.optimisticId, article.url)}
                onDismiss={() => dismissArticle(article.optimisticId)}
                index={index}
              />
            );
          }

          // Status is 'success' - render briefly with "NEW" badge
          if (!article.savedItem) return null;
          const successItem = article.savedItem;

          return (
            <Card
              key={article.optimisticId}
              elevation="elevated"
              className={cn(
                'flex flex-col relative overflow-hidden',
                'animate-[slide-up_0.3s_ease-out] opacity-0 [animation-fill-mode:forwards]',
                'bg-card border-border',
              )}
              style={{
                animationDelay: `${index * 50}ms`,
              }}
            >
              {/* NEW badge for successful optimistic adds */}
              <div className="absolute top-6 right-6 z-10">
                <div className="px-2.5 py-1 text-[10px] font-semibold tracking-widest bg-[oklch(0.58_0.08_165)]/10 dark:bg-[oklch(0.58_0.08_165)]/20 text-[oklch(0.48_0.08_165)] dark:text-[oklch(0.65_0.08_165)] border border-[oklch(0.58_0.08_165)]/20 dark:border-[oklch(0.58_0.08_165)]/30 rounded-md backdrop-blur-sm animate-pulse">
                  NEW
                </div>
              </div>

              <CardHeader>
                <div className="flex items-start gap-2">
                  <CardTitle className="text-2xl font-semibold leading-tight flex-1">
                    {successItem.title}
                  </CardTitle>
                </div>
                <CardDescription className="text-muted-foreground flex items-center gap-2">
                  <span className="truncate">{getDomain(successItem.url)}</span>
                  <span>•</span>
                  <span>{formatRelativeTime(successItem.savedAt)}</span>
                </CardDescription>
              </CardHeader>

              <CardContent className="flex-1 space-y-6">
                <div className="flex items-center gap-3 flex-wrap">
                  <Badge variant="secondary" className="flex items-center gap-1.5">
                    <Clock className="h-3.5 w-3.5" />
                    {successItem.estimatedTime} min read
                  </Badge>
                  {successItem.relevanceScore > 0 && (
                    <Badge variant={successItem.relevanceScore >= 0.8 ? 'default' : 'secondary'}>
                      ⭐ {Math.round(successItem.relevanceScore * 100)}% match
                    </Badge>
                  )}
                </div>

                {successItem.topics.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {successItem.topics.map((topic, idx) => (
                      <Badge key={idx} variant="outline" className="text-xs">
                        {topic}
                      </Badge>
                    ))}
                  </div>
                )}

                {successItem.reasoning && successItem.relevanceScore > 0 && (
                  <p className="text-sm text-muted-foreground italic leading-relaxed">
                    {successItem.reasoning}
                  </p>
                )}
              </CardContent>

              <CardFooter className="flex gap-3">
                <Button variant="secondary" size="default" className="flex-1" asChild>
                  <a
                    href={successItem.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2"
                  >
                    Read Article
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </Button>
                <Button variant="ghost" size="icon" disabled title="Just added">
                  <Check className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" disabled title="Just added">
                  <Archive className="h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
          );
        }

        // Render normal saved item card
        const item = article;
        const isRead = !!item.readAt;
        const isArchived = !!item.archivedAt;

        return (
          <Card
            key={item.id}
            elevation="interactive"
            className={cn(
              'flex flex-col relative overflow-hidden',
              // Stagger animation on load
              'animate-[slide-up_0.3s_ease-out] opacity-0 [animation-fill-mode:forwards]',
              // Unread state (default) - clean and sophisticated
              !isRead && !isArchived && 'bg-card border-border',
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
              <div className="flex items-start gap-2">
                <CardTitle className={cn(
                  'line-clamp-2 text-2xl font-semibold leading-tight transition-colors flex-1',
                  isRead && !isArchived && 'text-[oklch(0.40_0.01_165)] dark:text-[oklch(0.75_0.01_165)]',
                  isArchived && 'text-[oklch(0.45_0.015_60)] dark:text-[oklch(0.70_0.015_60)]'
                )}>
                  {item.title}
                </CardTitle>
                {/* Relevance Score Dots */}
                {item.relevanceScore > 0 && (
                  <div className="flex items-center gap-0.5 mt-1">
                    {Array.from({ length: 5 }).map((_, i) => {
                      const threshold = (i + 1) * 0.2;
                      const isActive = item.relevanceScore >= threshold;
                      const isHighRelevance = item.relevanceScore >= 0.8;
                      return (
                        <div
                          key={i}
                          className={cn(
                            'w-1.5 h-1.5 rounded-full transition-all duration-200',
                            isActive && isHighRelevance && 'bg-gradient-to-r from-[oklch(0.60_0.12_75)] to-[oklch(0.58_0.14_65)] shadow-sm',
                            isActive && !isHighRelevance && 'bg-muted-foreground/60',
                            !isActive && 'bg-border'
                          )}
                        />
                      );
                    })}
                  </div>
                )}
              </div>
              <CardDescription className={cn(
                'flex items-center gap-2 mt-1',
                isArchived && 'opacity-60'
              )}>
                <span className="truncate font-mono text-xs">{getDomain(item.url)}</span>
                <span className="text-muted-foreground/50">•</span>
                <span className="text-xs">{formatRelativeTime(item.savedAt)}</span>
              </CardDescription>
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
                <span className="text-muted-foreground/40 text-sm mt-0.5">&quot;</span>
                <p className={cn(
                  "text-xs italic leading-relaxed transition-colors flex-1",
                  !isArchived && "text-muted-foreground",
                  isArchived && "opacity-60"
                )}>
                  {item.reasoning}
                </p>
                <span className="text-muted-foreground/40 text-sm mt-0.5">&quot;</span>
              </div>
            )}
          </CardContent>

          <CardFooter className="flex gap-2">
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
                className="hover:bg-[oklch(0.94_0.015_165)] hover:text-[oklch(0.40_0.06_165)] dark:hover:bg-[oklch(0.22_0.015_165)] dark:hover:text-[oklch(0.75_0.05_165)]"
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
                onClick={() => handleArchive(item.id)}
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
                onClick={() => handleUnarchive(item.id)}
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
      })}
    </div>
  );
}
