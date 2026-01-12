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
import { ArticleCard } from './article-card';
import { ArticleListItem } from './article-list-item';
import { formatRelativeTime, getDomain } from '@/lib/article-utils';
import { useViewPreference } from '@/hooks/use-view-preference';

interface SavedItemsListProps {
  items?: SavedItem[];  // Optional: when provided, filter to these items (grouped mode)
}

type ArticleAction = 'read' | 'unread' | 'archive' | 'unarchive';

/**
 * Client component that displays a grid of saved articles with action buttons
 * Supports optimistic UI updates for both new articles and read/archive actions
 *
 * @param items - Optional: when provided, only shows articles matching these items (grouped mode)
 *                When undefined, shows all articles from context (ungrouped mode)
 */
export function SavedItemsList({ items }: SavedItemsListProps) {
  const { viewMode } = useViewPreference();
  const { articles, retryArticle, dismissArticle } = useOptimisticArticles();
  const [isPending, startTransition] = useTransition();

  // Filter articles based on whether items prop is provided
  const filteredArticles = items
    ? articles.filter(article => {
        // Always include optimistic articles (loading/error states appear in all groups)
        if (isOptimisticArticle(article)) return true;
        // Only include saved items that match the provided items array
        return items.some(item => item.id === article.id);
      })
    : articles;  // No filtering when items prop is undefined (ungrouped mode)

  // Separate optimistic articles from saved items
  const savedItems = filteredArticles.filter(a => !isOptimisticArticle(a)) as SavedItem[];
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

  // Get optimistic articles (from filtered list)
  const optimisticArticles = filteredArticles.filter(isOptimisticArticle);

  return (
    <div className={cn(
      viewMode === 'list' ? 'space-y-0' : 'grid gap-8 md:grid-cols-2 lg:grid-cols-3'
    )}>
      {/* Optimistic articles always render as cards */}
      {optimisticArticles.map((article, index) => {
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

        // This should not happen (all optimistic articles handled above)
        return null;
      })}

      {/* Saved items render based on view mode */}
      {viewMode === 'list' ? (
        <div className="border rounded-lg overflow-hidden">
          {optimisticItems.map((item, index) => (
            <ArticleListItem
              key={item.id}
              item={item}
              index={index}
              onMarkRead={handleMarkRead}
              onMarkUnread={handleMarkUnread}
              onArchive={handleArchive}
              onUnarchive={handleUnarchive}
              isPending={isPending}
            />
          ))}
        </div>
      ) : (
        optimisticItems.map((item, index) => (
          <ArticleCard
            key={item.id}
            item={item}
            index={index}
            onMarkRead={handleMarkRead}
            onMarkUnread={handleMarkUnread}
            onArchive={handleArchive}
            onUnarchive={handleUnarchive}
            isPending={isPending}
          />
        ))
      )}
    </div>
  );
}
