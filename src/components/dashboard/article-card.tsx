'use client';

import { Clock, Calendar, Check } from 'lucide-react';
import { ScoreBadge, getCategoryColor } from './score-badge';
import { cn } from '@/lib/utils';
import type { SavedItem } from '@/contexts/optimistic-articles-context';

interface ArticleCardProps {
  item: SavedItem;
  index?: number;
  onMarkAsRead?: (id: string) => void;
}

/**
 * Format relative time (e.g., "2h ago", "1d ago")
 */
function formatRelativeTime(date: Date): string {
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMins / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays < 7) return `${diffDays}d ago`;
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
}

/**
 * Get gradient background for image placeholder based on topic
 */
function getPlaceholderGradient(topic: string): string {
  const topicLower = topic.toLowerCase();

  if (topicLower.includes('ai') || topicLower.includes('ml')) {
    return 'bg-gradient-to-br from-blue-400 to-blue-600';
  }
  if (topicLower.includes('engineering') || topicLower.includes('code')) {
    return 'bg-gradient-to-br from-sky-400 to-sky-600';
  }
  if (topicLower.includes('design') || topicLower.includes('ux')) {
    return 'bg-gradient-to-br from-purple-400 to-purple-600';
  }
  if (topicLower.includes('career') || topicLower.includes('work')) {
    return 'bg-gradient-to-br from-amber-400 to-amber-600';
  }
  if (topicLower.includes('finance') || topicLower.includes('money')) {
    return 'bg-gradient-to-br from-slate-400 to-slate-600';
  }
  if (topicLower.includes('product') || topicLower.includes('business')) {
    return 'bg-gradient-to-br from-green-400 to-green-600';
  }
  return 'bg-gradient-to-br from-slate-300 to-slate-500';
}

/**
 * Redesigned horizontal article card with image thumbnail and circular score
 */
export function ArticleCard({
  item,
  index = 0,
  onMarkAsRead,
}: ArticleCardProps) {
  const primaryTopic = item.topics[0] || 'Article';
  const categoryColors = getCategoryColor(primaryTopic);
  const score = Math.round(item.relevanceScore * 100);

  return (
    <article
      className={cn(
        'group relative flex flex-col sm:flex-row items-stretch gap-0 sm:gap-6',
        'bg-white border border-slate-200 rounded-xl p-4',
        'hover:border-primary/40 transition-all hover:shadow-md overflow-hidden',
        'animate-[slide-up_0.3s_ease-out] opacity-0 [animation-fill-mode:forwards]'
      )}
      style={{ animationDelay: `${index * 50}ms` }}
    >
      {/* Image thumbnail */}
      <div
        className={cn(
          'w-full sm:w-48 h-32 sm:h-auto flex-shrink-0 rounded-lg overflow-hidden',
          'border border-slate-200 relative',
          !item.imageUrl && getPlaceholderGradient(primaryTopic)
        )}
      >
        {item.imageUrl ? (
          <img
            src={item.imageUrl}
            alt=""
            className="w-full h-full object-cover"
            onError={(e) => {
              // Hide broken image, show gradient instead
              (e.target as HTMLImageElement).style.display = 'none';
              (e.target as HTMLImageElement).parentElement!.classList.add(
                getPlaceholderGradient(primaryTopic)
              );
            }}
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center opacity-30">
            <span className="text-white text-4xl font-bold">
              {primaryTopic.charAt(0).toUpperCase()}
            </span>
          </div>
        )}
      </div>

      {/* Content section */}
      <div className="flex flex-col justify-center flex-1 py-1 min-w-0 mt-4 sm:mt-0">
        {/* Category badge + source domain */}
        <div className="flex flex-wrap items-center gap-2 mb-2">
          <span
            className={cn(
              'text-xs font-bold px-2 py-0.5 rounded border',
              categoryColors.text,
              categoryColors.bg,
              categoryColors.border
            )}
          >
            {primaryTopic}
          </span>
          {item.sourceDomain && (
            <span className="text-xs text-slate-400 flex items-center gap-1 font-medium">
              <span className="w-1 h-1 bg-slate-300 rounded-full" />
              {item.sourceDomain}
            </span>
          )}
        </div>

        {/* Title */}
        <a
          href={item.url}
          target="_blank"
          rel="noopener noreferrer"
          className="block"
        >
          <h3 className="text-slate-900 text-lg font-bold leading-tight mb-2 truncate group-hover:text-primary transition-colors">
            {item.title}
          </h3>
        </a>

        {/* Description */}
        {(item.description || item.reasoning) && (
          <p className="text-slate-500 text-sm line-clamp-2 mb-3">
            {item.description || item.reasoning}
          </p>
        )}

        {/* Meta: read time + added date */}
        <div className="flex items-center gap-4 text-xs font-medium text-slate-400">
          <span className="flex items-center gap-1.5">
            <Clock className="size-3.5" />
            {item.estimatedTime} min read
          </span>
          <span className="flex items-center gap-1.5">
            <Calendar className="size-3.5" />
            Added {formatRelativeTime(new Date(item.savedAt))}
          </span>
        </div>
      </div>

      {/* Score + action section */}
      <div
        className={cn(
          'flex flex-row sm:flex-col items-center sm:justify-center justify-between',
          'border-t sm:border-t-0 sm:border-l border-slate-100',
          'pt-4 sm:pt-0 pl-0 sm:pl-6 gap-4 min-w-[100px] mt-4 sm:mt-0'
        )}
      >
        {/* Circular score badge */}
        {score > 0 && (
          <ScoreBadge
            score={score}
            variant="circular"
            showLabel={true}
          />
        )}

        {/* Mark as read button */}
        <button
          onClick={() => onMarkAsRead?.(item.id)}
          className={cn(
            'bg-slate-50 hover:bg-primary border border-slate-200 hover:border-primary',
            'text-slate-400 hover:text-white p-2 rounded-lg transition-all shadow-sm',
            'group/btn'
          )}
          title="Mark as Read"
        >
          <Check className="size-5 group-hover/btn:scale-110 transition-transform" />
        </button>
      </div>
    </article>
  );
}
