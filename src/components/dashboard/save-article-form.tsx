'use client';

import { useState, useTransition } from 'react';
import { Loader2, Plus } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { saveArticle } from '@/app/actions/save-article';

/**
 * Client component for saving article URLs
 * Handles form submission with loading and error states
 */
export function SaveArticleForm() {
  const [url, setUrl] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [isPending, startTransition] = useTransition();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Reset states
    setError(null);
    setSuccess(false);

    // Create FormData
    const formData = new FormData();
    formData.append('url', url);

    // Submit with transition for pending state
    startTransition(async () => {
      const result = await saveArticle(formData);

      if (result.success) {
        setSuccess(true);
        setUrl(''); // Clear input on success

        // Clear success message after 3 seconds
        setTimeout(() => setSuccess(false), 3000);
      } else {
        setError(result.error || 'Failed to save article');
      }
    });
  };

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="flex gap-2">
          <Input
            type="url"
            placeholder="Paste article URL here (e.g., https://example.com/article)"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            disabled={isPending}
            className="flex-1"
            required
          />
          <Button type="submit" disabled={isPending || !url.trim()}>
            {isPending ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
                Saving...
              </>
            ) : (
              <>
                <Plus className="h-4 w-4 mr-2" />
                Save Article
              </>
            )}
          </Button>
        </div>

        {/* Error message */}
        {error && (
          <div className="text-sm text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950/20 px-3 py-2 rounded-md">
            {error}
          </div>
        )}

        {/* Success message */}
        {success && (
          <div className="text-sm text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-950/20 px-3 py-2 rounded-md">
            Article saved successfully!
          </div>
        )}
      </form>

      {/* Helper text */}
      <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-2">
        Paste any article URL to save it to your reading queue
      </p>
    </div>
  );
}
