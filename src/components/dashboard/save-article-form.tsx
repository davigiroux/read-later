'use client';

import { useState, useTransition } from 'react';
import { Loader2, Link2, Plus, X, CheckCircle2, AlertCircle } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { saveArticle } from '@/app/actions/save-article';
import { cn } from '@/lib/utils';

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
        <div className="flex gap-3">
          {/* Input with icon prefix and clear button */}
          <div className="flex-1 relative">
            <Link2 className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
            <Input
              type="url"
              placeholder="https://example.com/article"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              disabled={isPending}
              className="pl-11 pr-10"
              required
            />
            {url && !isPending && (
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
            disabled={isPending || !url.trim()}
            variant="premium"
            className="min-w-[140px]"
          >
            {isPending ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Plus className="h-4 w-4" />
                Save Article
              </>
            )}
          </Button>
        </div>

        {/* Error message with better styling */}
        {error && (
          <div className={cn(
            "flex items-start gap-2 text-sm px-4 py-3 rounded-lg border animate-[slide-up_0.2s_ease-out]",
            "bg-destructive/5 border-destructive/20 text-destructive"
          )}>
            <AlertCircle className="h-4 w-4 mt-0.5 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Success message with animation */}
        {success && (
          <div className={cn(
            "flex items-start gap-2 text-sm px-4 py-3 rounded-lg border animate-[scale-in_0.2s_ease-out]",
            "bg-[oklch(0.96_0.02_165)] border-[oklch(0.85_0.02_165)] text-[oklch(0.40_0.06_165)]",
            "dark:bg-[oklch(0.20_0.015_165)] dark:border-[oklch(0.28_0.02_165)] dark:text-[oklch(0.75_0.05_165)]"
          )}>
            <CheckCircle2 className="h-4 w-4 mt-0.5 shrink-0" />
            <span className="font-medium">Article saved successfully!</span>
          </div>
        )}
      </form>

      {/* Helper text */}
      <p className="text-sm text-muted-foreground mt-3">
        Paste any article URL to save it to your reading queue
      </p>
    </div>
  );
}
