'use client';

import { useState } from 'react';
import { Link2, Plus, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useOptimisticArticles } from '@/contexts/optimistic-articles-context';

/**
 * Client component for saving article URLs
 * Enables continuous submission with optimistic UI updates
 */
export function SaveArticleForm() {
  const [url, setUrl] = useState('');
  const { addOptimisticArticle } = useOptimisticArticles();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Store URL and clear input immediately for next submission
    const submittedUrl = url.trim();
    setUrl('');

    // Add optimistic article (context handles server action)
    await addOptimisticArticle(submittedUrl);
  };

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="flex gap-3">
          {/* Input with icon prefix and clear button */}
          <div className="flex-1 relative">
            <Link2 className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
            <Input
              type="url"
              placeholder="https://example.com/article"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="pl-11 pr-10"
              required
            />
            {url && (
              <button
                type="button"
                onClick={() => setUrl('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 h-6 w-6 rounded-md hover:bg-muted flex items-center justify-center transition-colors"
                aria-label="Clear input"
              >
                <X className="h-3.5 w-3.5 text-muted-foreground" />
              </button>
            )}
          </div>
          <Button
            type="submit"
            disabled={!url.trim()}
            variant="premium"
            className="min-w-[140px]"
          >
            <Plus className="h-4 w-4" />
            Save Article
          </Button>
        </div>
      </form>

      {/* Helper text */}
      <p className="text-sm text-muted-foreground mt-3">
        Paste any article URL to save it to your reading queue. You can add multiple articles at once!
      </p>
    </div>
  );
}
