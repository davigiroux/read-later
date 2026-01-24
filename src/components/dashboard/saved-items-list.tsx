'use client';

import { useOptimistic, useTransition } from 'react';
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

interface SavedItemsListProps {
  items?: SavedItem[];  // Optional: when provided, filter to these items (grouped mode)
}

type ArticleAction = 'read' | 'unread' | 'archive' | 'unarchive';

/**
 * Client component that displays saved articles as cards with action buttons
 * Supports optimistic UI updates for both new articles and read/archive actions
 *
 * @param items - Optional: when provided, only shows articles matching these items (grouped mode)
 *                When undefined, shows all articles from context (ungrouped mode)
 */
export function SavedItemsList({ items }: SavedItemsListProps) {
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

  // Get optimistic articles (from filtered list)
  const optimisticArticles = filteredArticles.filter(isOptimisticArticle);

  return (
    <div className="grid grid-cols-1 gap-4">
      {/* Optimistic articles (loading/error states) */}
      {optimisticArticles.map((article, index) => {
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

          // Status is 'success' - render as normal ArticleCard
          if (!article.savedItem) return null;
          return (
            <ArticleCard
              key={article.optimisticId}
              item={article.savedItem}
              index={index}
              onMarkAsRead={handleMarkRead}
            />
          );
        }

        return null;
      })}

      {/* Saved items as cards */}
      {optimisticItems.map((item, index) => (
        <ArticleCard
          key={item.id}
          item={item}
          index={optimisticArticles.length + index}
          onMarkAsRead={handleMarkRead}
        />
      ))}
    </div>
  );
}
