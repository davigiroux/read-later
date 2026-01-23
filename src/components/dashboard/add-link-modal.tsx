'use client';

import { useState, useCallback } from 'react';
import { X, Link } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useOptimisticArticles } from '@/contexts/optimistic-articles-context';
import { useAddLinkModal } from '@/contexts/add-link-modal-context';
import { cn } from '@/lib/utils';

function isValidUrl(string: string): boolean {
  try {
    const url = new URL(string);
    return url.protocol === 'http:' || url.protocol === 'https:';
  } catch {
    return false;
  }
}

export function AddLinkModal() {
  const [url, setUrl] = useState('');
  const { addOptimisticArticle } = useOptimisticArticles();
  const { isOpen, close } = useAddLinkModal();

  const urlIsValid = isValidUrl(url);

  const handleSubmit = useCallback(() => {
    if (!urlIsValid) return;
    addOptimisticArticle(url);
    close();
    setUrl('');
  }, [url, urlIsValid, addOptimisticArticle, close]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      close();
    } else if (e.key === 'Enter' && urlIsValid) {
      handleSubmit();
    }
  }, [close, urlIsValid, handleSubmit]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      onKeyDown={handleKeyDown}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={close}
      />

      {/* Modal */}
      <div className="relative w-full max-w-lg mx-4 bg-white rounded-2xl shadow-2xl animate-[slide-up_0.2s_ease-out]">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-100">
          <h2 className="text-lg font-bold text-slate-900">Add to Queue</h2>
          <button
            onClick={close}
            className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <X className="size-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* URL Input */}
          <div className="relative">
            <Link className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-slate-400" />
            <input
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="Paste article URL..."
              autoFocus
              className={cn(
                'w-full h-12 pl-12 pr-4 rounded-xl border',
                'bg-slate-50 focus:bg-white',
                'text-slate-900 placeholder-slate-400',
                'focus:ring-4 focus:ring-primary/10 focus:border-primary/30',
                'outline-none transition-all'
              )}
            />
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 p-6 border-t border-slate-100 bg-slate-50/50">
          <Button
            variant="ghost"
            onClick={close}
            className="text-slate-600"
          >
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={!urlIsValid}
            className={cn(
              'bg-primary hover:bg-blue-700 text-white font-bold px-6',
              'shadow-lg shadow-blue-500/20'
            )}
          >
            Add to Queue
          </Button>
        </div>
      </div>
    </div>
  );
}
