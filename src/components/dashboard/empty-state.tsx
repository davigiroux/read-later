import { BookmarkPlus } from 'lucide-react';

/**
 * Empty state component shown when user has no saved articles
 */
export function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      <div className="rounded-full bg-zinc-100 p-6 dark:bg-zinc-800 mb-4">
        <BookmarkPlus className="h-12 w-12 text-zinc-400 dark:text-zinc-500" />
      </div>
      <h3 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50 mb-2">
        No saved articles yet
      </h3>
      <p className="text-zinc-600 dark:text-zinc-400 max-w-sm">
        Save your first article using the form above. Paste any URL to get
        started with your reading queue.
      </p>
    </div>
  );
}
