'use client';

import { createContext, useContext, useOptimistic, useTransition, ReactNode, useState, useCallback } from 'react';
import { saveArticle } from '@/app/actions/save-article';

// Types
export type OptimisticStatus = 'loading' | 'error' | 'success';

export interface SavedItem {
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

export interface OptimisticArticle {
  optimisticId: string;
  url: string;
  status: OptimisticStatus;
  error?: string;
  savedItem?: SavedItem;
  submittedAt: Date;
}

export type Article = SavedItem | OptimisticArticle;

// Helper to check if article is optimistic
export function isOptimisticArticle(article: Article): article is OptimisticArticle {
  return 'optimisticId' in article;
}

// Context type
interface OptimisticArticlesContextValue {
  articles: Article[];
  addOptimisticArticle: (url: string) => Promise<void>;
  retryArticle: (optimisticId: string, url: string) => Promise<void>;
  dismissArticle: (optimisticId: string) => void;
  isPending: boolean;
}

const OptimisticArticlesContext = createContext<OptimisticArticlesContextValue | null>(null);

// Provider props
interface OptimisticArticlesProviderProps {
  children: ReactNode;
  initialArticles: SavedItem[];
}

/**
 * Provider that manages optimistic article state
 * Enables continuous submission with instant UI feedback
 */
export function OptimisticArticlesProvider({ children, initialArticles }: OptimisticArticlesProviderProps) {
  const [isPending, startTransition] = useTransition();
  const [optimisticArticles, setOptimisticArticles] = useState<OptimisticArticle[]>([]);

  // Use optimistic hook for instant UI updates
  const [pendingArticles, addPendingArticle] = useOptimistic<OptimisticArticle[], OptimisticArticle>(
    optimisticArticles,
    (state, newArticle) => {
      // If article with same ID exists, replace it (for status updates)
      const existingIndex = state.findIndex(a => a.optimisticId === newArticle.optimisticId);
      if (existingIndex >= 0) {
        const updated = [...state];
        updated[existingIndex] = newArticle;
        return updated;
      }
      // Otherwise add new article
      return [...state, newArticle];
    }
  );

  // Add optimistic article and trigger save
  const addOptimisticArticle = useCallback(async (url: string) => {
    const optimisticId = crypto.randomUUID();
    const optimisticArticle: OptimisticArticle = {
      optimisticId,
      url,
      status: 'loading',
      submittedAt: new Date(),
    };

    // Optimistically add the article
    startTransition(() => {
      addPendingArticle(optimisticArticle);
    });

    // Update actual state (for persistence across optimistic updates)
    setOptimisticArticles(prev => [...prev, optimisticArticle]);

    // Call server action
    try {
      const formData = new FormData();
      formData.append('url', url);
      const result = await saveArticle(formData);

      if (result.success && result.data) {
        // Success - update to success status with saved data
        const successArticle: OptimisticArticle = {
          ...optimisticArticle,
          status: 'success',
          savedItem: result.data,
        };

        startTransition(() => {
          addPendingArticle(successArticle);
        });

        setOptimisticArticles(prev =>
          prev.map(a => a.optimisticId === optimisticId ? successArticle : a)
        );

        // Remove from optimistic list after a delay (server revalidation will show actual item)
        setTimeout(() => {
          setOptimisticArticles(prev => prev.filter(a => a.optimisticId !== optimisticId));
        }, 1000);
      } else {
        // Error - update to error status
        const errorArticle: OptimisticArticle = {
          ...optimisticArticle,
          status: 'error',
          error: result.error || 'Failed to save article',
        };

        startTransition(() => {
          addPendingArticle(errorArticle);
        });

        setOptimisticArticles(prev =>
          prev.map(a => a.optimisticId === optimisticId ? errorArticle : a)
        );
      }
    } catch (error) {
      // Unexpected error - update to error status
      const errorArticle: OptimisticArticle = {
        ...optimisticArticle,
        status: 'error',
        error: 'An unexpected error occurred',
      };

      startTransition(() => {
        addPendingArticle(errorArticle);
      });

      setOptimisticArticles(prev =>
        prev.map(a => a.optimisticId === optimisticId ? errorArticle : a)
      );
    }
  }, [addPendingArticle]);

  // Retry failed article
  const retryArticle = useCallback(async (optimisticId: string, url: string) => {
    // Remove old error article
    setOptimisticArticles(prev => prev.filter(a => a.optimisticId !== optimisticId));

    // Add new optimistic article (new ID)
    await addOptimisticArticle(url);
  }, [addOptimisticArticle]);

  // Dismiss error article
  const dismissArticle = useCallback((optimisticId: string) => {
    setOptimisticArticles(prev => prev.filter(a => a.optimisticId !== optimisticId));
  }, []);

  // Merge optimistic and actual articles
  // Optimistic articles go first (sorted by submittedAt), then actual articles
  const mergedArticles: Article[] = [
    ...pendingArticles.sort((a, b) => b.submittedAt.getTime() - a.submittedAt.getTime()),
    ...initialArticles,
  ];

  const value: OptimisticArticlesContextValue = {
    articles: mergedArticles,
    addOptimisticArticle,
    retryArticle,
    dismissArticle,
    isPending,
  };

  return (
    <OptimisticArticlesContext.Provider value={value}>
      {children}
    </OptimisticArticlesContext.Provider>
  );
}

/**
 * Hook to access optimistic articles context
 */
export function useOptimisticArticles() {
  const context = useContext(OptimisticArticlesContext);
  if (!context) {
    throw new Error('useOptimisticArticles must be used within OptimisticArticlesProvider');
  }
  return context;
}
