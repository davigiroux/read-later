'use client';

import { Loader2, AlertCircle, RotateCw, X, Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import { getDomain } from '@/lib/article-utils';

interface LoadingArticleCardProps {
  url: string;
  index?: number;
}

/**
 * Loading state card matching the horizontal ArticleCard layout
 */
export function LoadingArticleCard({ url, index = 0 }: LoadingArticleCardProps) {
  const domain = getDomain(url);
  const firstLetter = domain.charAt(0).toUpperCase();

  return (
    <article
      className={cn(
        'group relative flex flex-col sm:flex-row items-stretch gap-0 sm:gap-6',
        'bg-white border border-slate-200 rounded-xl p-4',
        'overflow-hidden shadow-sm',
        'animate-[slide-up_0.3s_ease-out] opacity-0 [animation-fill-mode:forwards]'
      )}
      style={{ animationDelay: `${index * 50}ms` }}
    >
      {/* Left: Shimmer thumbnail placeholder */}
      <div
        className={cn(
          'w-full sm:w-48 h-32 sm:h-auto flex-shrink-0 rounded-lg overflow-hidden',
          'bg-gradient-to-br from-blue-100 to-blue-200 animate-pulse',
          'flex items-center justify-center border border-slate-200'
        )}
      >
        <span className="text-4xl font-bold text-blue-400">{firstLetter}</span>
      </div>

      {/* Center: Content with shimmer placeholders */}
      <div className="flex flex-col justify-center flex-1 py-1 min-w-0 mt-4 sm:mt-0 gap-2">
        {/* Category + domain shimmer */}
        <div className="flex items-center gap-2 mb-1">
          <div className="h-5 w-16 bg-slate-200 rounded animate-pulse" />
          <span className="text-xs text-slate-400 font-medium">{domain}</span>
        </div>

        {/* Title shimmer */}
        <div className="h-6 w-3/4 bg-slate-200 rounded animate-pulse" />

        {/* Description shimmer */}
        <div className="space-y-1.5 mb-1">
          <div className="h-4 w-full bg-slate-100 rounded animate-pulse" />
          <div className="h-4 w-2/3 bg-slate-100 rounded animate-pulse" />
        </div>

        {/* Metadata shimmer */}
        <div className="flex items-center gap-4">
          <div className="h-4 w-20 bg-slate-100 rounded animate-pulse" />
          <div className="h-4 w-24 bg-slate-100 rounded animate-pulse" />
        </div>
      </div>

      {/* Right: Score placeholder + action */}
      <div
        className={cn(
          'flex flex-row sm:flex-col items-center sm:justify-center justify-between',
          'border-t sm:border-t-0 sm:border-l border-slate-100',
          'pt-4 sm:pt-0 pl-0 sm:pl-6 gap-4 min-w-[100px] mt-4 sm:mt-0'
        )}
      >
        {/* ANALYZING badge */}
        <div className="flex flex-col items-center gap-1">
          <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center animate-pulse">
            <Loader2 className="size-5 text-blue-500 animate-spin" />
          </div>
          <span className="text-[10px] font-bold text-blue-600 uppercase tracking-wide">
            Analyzing
          </span>
        </div>

        {/* Disabled action button */}
        <button
          disabled
          className={cn(
            'bg-slate-50 border border-slate-200',
            'text-slate-300 p-2 rounded-lg cursor-not-allowed'
          )}
        >
          <Check className="size-5" />
        </button>
      </div>
    </article>
  );
}

interface ErrorArticleCardProps {
  url: string;
  error: string;
  onRetry: () => void;
  onDismiss: () => void;
  index?: number;
}

/**
 * Error state card matching the horizontal ArticleCard layout
 */
export function ErrorArticleCard({
  url,
  error,
  onRetry,
  onDismiss,
  index = 0,
}: ErrorArticleCardProps) {
  const domain = getDomain(url);
  const firstLetter = domain.charAt(0).toUpperCase();

  const isDuplicate =
    error.toLowerCase().includes('already in your stack') ||
    error.toLowerCase().includes('already in your collection') ||
    error.toLowerCase().includes('duplicate');

  return (
    <article
      role="alert"
      className={cn(
        'group relative flex flex-col sm:flex-row items-stretch gap-0 sm:gap-6',
        'bg-white border border-red-200 rounded-xl p-4',
        'overflow-hidden shadow-sm',
        'animate-[slide-up_0.3s_ease-out] opacity-0 [animation-fill-mode:forwards]'
      )}
      style={{ animationDelay: `${index * 50}ms` }}
    >
      {/* Left: Error thumbnail */}
      <div
        className={cn(
          'w-full sm:w-48 h-32 sm:h-auto flex-shrink-0 rounded-lg overflow-hidden',
          'bg-gradient-to-br from-red-100 to-red-200',
          'flex items-center justify-center border border-red-200'
        )}
      >
        <span className="text-4xl font-bold text-red-400">{firstLetter}</span>
      </div>

      {/* Center: Error content */}
      <div className="flex flex-col justify-center flex-1 py-1 min-w-0 mt-4 sm:mt-0 gap-2">
        {/* Domain */}
        <div className="flex items-center gap-2 mb-1">
          <span
            className={cn(
              'text-xs font-bold px-2 py-0.5 rounded border',
              'text-red-700 bg-red-50 border-red-200'
            )}
          >
            {isDuplicate ? 'Duplicate' : 'Error'}
          </span>
          <span className="text-xs text-slate-400 font-medium">{domain}</span>
        </div>

        {/* Error title */}
        <h3 className="text-slate-900 text-lg font-bold leading-tight flex items-center gap-2">
          <AlertCircle className="size-5 text-red-500 flex-shrink-0" />
          {isDuplicate ? 'Already in your collection' : 'Failed to save'}
        </h3>

        {/* Error message */}
        <p className="text-red-600 text-sm">{error}</p>

        {/* URL */}
        <p className="text-slate-400 text-xs truncate font-mono">{url}</p>
      </div>

      {/* Right: Actions */}
      <div
        className={cn(
          'flex flex-row sm:flex-col items-center sm:justify-center justify-between',
          'border-t sm:border-t-0 sm:border-l border-red-100',
          'pt-4 sm:pt-0 pl-0 sm:pl-6 gap-3 min-w-[100px] mt-4 sm:mt-0'
        )}
      >
        {!isDuplicate && (
          <button
            onClick={onRetry}
            className={cn(
              'bg-slate-50 hover:bg-blue-500 border border-slate-200 hover:border-blue-500',
              'text-slate-600 hover:text-white p-2 rounded-lg transition-all'
            )}
            title="Retry"
          >
            <RotateCw className="size-5" />
          </button>
        )}

        <button
          onClick={onDismiss}
          className={cn(
            'bg-slate-50 hover:bg-red-500 border border-slate-200 hover:border-red-500',
            'text-slate-600 hover:text-white p-2 rounded-lg transition-all'
          )}
          title="Dismiss"
        >
          <X className="size-5" />
        </button>
      </div>
    </article>
  );
}
