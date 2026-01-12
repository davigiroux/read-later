'use client';

import { Loader2, AlertCircle, RotateCw, X } from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { getDomain } from '@/lib/article-utils';

/**
 * Shimmer skeleton component with refined gradient animation
 */
function Shimmer({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        'animate-[shimmer_2s_ease-in-out_infinite] bg-gradient-to-r',
        'from-[oklch(0.92_0.004_240)] via-[oklch(0.88_0.006_240)] to-[oklch(0.92_0.004_240)]',
        'dark:from-[oklch(0.20_0.015_240)] dark:via-[oklch(0.24_0.018_240)] dark:to-[oklch(0.20_0.015_240)]',
        'bg-[length:200%_100%] rounded-lg',
        className
      )}
    />
  );
}

interface LoadingArticleCardProps {
  url: string;
  index?: number;
}

/**
 * Premium loading state card with sophisticated blue accent
 */
export function LoadingArticleCard({ url, index = 0 }: LoadingArticleCardProps) {
  const domain = getDomain(url);

  return (
    <Card
      elevation="elevated"
      className={cn(
        'flex flex-col relative overflow-hidden',
        'animate-[slide-up_0.3s_ease-out] opacity-0 [animation-fill-mode:forwards]',
        // Sophisticated blue accent
        'bg-[oklch(0.96_0.02_240)] dark:bg-[oklch(0.19_0.02_240)]',
        'border-l-4 border-l-[oklch(0.50_0.15_240)]',
        'border-t border-r border-b border-[oklch(0.88_0.006_240)] dark:border-[oklch(0.25_0.02_240)]',
      )}
      style={{
        animationDelay: `${index * 50}ms`,
      }}
    >
      {/* Loading indicator badge */}
      <div className="absolute top-6 right-6 z-10">
        <div className="px-2.5 py-1 text-[10px] font-semibold tracking-widest bg-[oklch(0.50_0.15_240)]/10 dark:bg-[oklch(0.50_0.15_240)]/20 text-[oklch(0.40_0.12_240)] dark:text-[oklch(0.65_0.15_260)] border border-[oklch(0.50_0.15_240)]/20 dark:border-[oklch(0.50_0.15_240)]/30 rounded-md backdrop-blur-sm flex items-center gap-1.5">
          <Loader2 className="h-2.5 w-2.5 animate-spin" />
          ANALYZING
        </div>
      </div>

      <CardHeader>
        <div className="flex items-start gap-2">
          <CardTitle className="text-2xl font-semibold leading-tight text-[oklch(0.42_0.08_240)] dark:text-[oklch(0.68_0.08_240)] flex items-center gap-3 flex-1">
            <Loader2 className="h-5 w-5 animate-spin text-[oklch(0.50_0.15_240)] flex-shrink-0" />
            <span className="truncate">{domain}</span>
          </CardTitle>
        </div>
        <CardDescription className="text-[oklch(0.48_0.06_240)] dark:text-[oklch(0.62_0.06_240)] font-medium">
          Extracting content and analyzing relevance...
        </CardDescription>
      </CardHeader>

      <CardContent className="flex-1 space-y-6">
        {/* Shimmer skeleton for metadata */}
        <div className="flex items-center gap-3 flex-wrap">
          <Shimmer className="h-7 w-28" />
          <Shimmer className="h-7 w-24" />
        </div>

        {/* Shimmer skeleton for topics */}
        <div className="flex flex-wrap gap-2">
          <Shimmer className="h-6 w-20" />
          <Shimmer className="h-6 w-24" />
          <Shimmer className="h-6 w-16" />
          <Shimmer className="h-6 w-22" />
        </div>

        {/* Shimmer skeleton for AI reasoning */}
        <div className="space-y-2">
          <Shimmer className="h-3.5 w-full" />
          <Shimmer className="h-3.5 w-[92%]" />
          <Shimmer className="h-3.5 w-[78%]" />
        </div>
      </CardContent>

      <CardFooter className="flex gap-3">
        <Button
          variant="secondary"
          size="default"
          disabled
          className="flex-1 cursor-not-allowed opacity-50"
        >
          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
          Processing
        </Button>
        <Button
          variant="ghost"
          size="icon"
          disabled
          className="cursor-not-allowed opacity-40"
        >
          <Loader2 className="h-4 w-4 animate-spin" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          disabled
          className="cursor-not-allowed opacity-40"
        >
          <Loader2 className="h-4 w-4 animate-spin" />
        </Button>
      </CardFooter>

      {/* Animated progress bar */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-[oklch(0.50_0.15_240)]/10 dark:bg-[oklch(0.50_0.15_240)]/15 overflow-hidden">
        <div className="h-full bg-gradient-to-r from-[oklch(0.50_0.15_240)] to-[oklch(0.60_0.18_250)] animate-progress-bar" />
      </div>
    </Card>
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
 * Premium error state card with sophisticated red accent
 */
export function ErrorArticleCard({ url, error, onRetry, onDismiss, index = 0 }: ErrorArticleCardProps) {
  const domain = getDomain(url);

  // Check if it's a duplicate error for special styling
  const isDuplicate = error.toLowerCase().includes('already saved') ||
                      error.toLowerCase().includes('duplicate');

  return (
    <Card
      role="alert"
      elevation="elevated"
      className={cn(
        'flex flex-col relative overflow-hidden',
        'animate-[slide-up_0.3s_ease-out] opacity-0 [animation-fill-mode:forwards]',
        // Sophisticated red accent
        'bg-[oklch(0.96_0.025_20)] dark:bg-[oklch(0.19_0.02_20)]',
        'border-l-4 border-l-[oklch(0.55_0.22_25)]',
        'border-t border-r border-b border-[oklch(0.88_0.015_20)] dark:border-[oklch(0.25_0.02_20)]',
      )}
      style={{
        animationDelay: `${index * 50}ms`,
      }}
    >
      {/* Dismiss button */}
      <div className="absolute top-6 right-6 z-10">
        <button
          onClick={onDismiss}
          className={cn(
            "p-1.5 rounded-lg transition-all duration-200",
            "bg-[oklch(0.55_0.22_25)]/10 dark:bg-[oklch(0.55_0.22_25)]/20",
            "text-[oklch(0.45_0.20_25)] dark:text-[oklch(0.65_0.20_25)]",
            "border border-[oklch(0.55_0.22_25)]/20 dark:border-[oklch(0.55_0.22_25)]/30",
            "hover:bg-[oklch(0.55_0.22_25)]/20 dark:hover:bg-[oklch(0.55_0.22_25)]/30",
            "hover:scale-105 active:scale-95"
          )}
          aria-label="Dismiss error"
        >
          <X className="h-3.5 w-3.5" />
        </button>
      </div>

      <CardHeader>
        <div className="flex items-start gap-2">
          <CardTitle className="text-2xl font-semibold leading-tight text-[oklch(0.42_0.15_25)] dark:text-[oklch(0.68_0.18_25)] flex items-center gap-3 flex-1 pr-10">
            <AlertCircle className="h-5 w-5 text-[oklch(0.55_0.22_25)] flex-shrink-0" />
            <span className="truncate">{domain}</span>
          </CardTitle>
        </div>
        <CardDescription className="text-[oklch(0.48_0.12_25)] dark:text-[oklch(0.62_0.12_25)] font-medium">
          {isDuplicate ? 'Article already in your collection' : 'Failed to save article'}
        </CardDescription>
      </CardHeader>

      <CardContent className="flex-1 space-y-6">
        {/* Error message */}
        <div className={cn(
          "p-4 rounded-xl border text-sm font-medium transition-all duration-200",
          isDuplicate ? [
            "bg-[oklch(0.94_0.03_60)] dark:bg-[oklch(0.21_0.02_60)]",
            "border-[oklch(0.75_0.08_60)] dark:border-[oklch(0.40_0.05_60)]",
            "text-[oklch(0.38_0.08_60)] dark:text-[oklch(0.72_0.08_60)]"
          ] : [
            "bg-[oklch(0.94_0.02_25)] dark:bg-[oklch(0.21_0.02_25)]",
            "border-[oklch(0.75_0.18_25)] dark:border-[oklch(0.40_0.15_25)]",
            "text-[oklch(0.38_0.18_25)] dark:text-[oklch(0.72_0.18_25)]"
          ]
        )}>
          <p className="flex items-start gap-2.5">
            <span className="text-lg leading-none">{isDuplicate ? '⚠️' : '❌'}</span>
            <span className="flex-1 leading-relaxed">{error}</span>
          </p>
        </div>

        {/* URL preview */}
        <div className={cn(
          "text-xs font-mono p-3 rounded-lg border truncate transition-all duration-200",
          "bg-[oklch(0.94_0.015_25)] dark:bg-[oklch(0.21_0.015_25)]",
          "border-[oklch(0.85_0.015_25)] dark:border-[oklch(0.28_0.02_25)]",
          "text-[oklch(0.48_0.08_25)] dark:text-[oklch(0.60_0.08_25)]"
        )}>
          {url}
        </div>
      </CardContent>

      <CardFooter className="flex gap-3">
        {!isDuplicate && (
          <Button
            variant="secondary"
            size="default"
            onClick={onRetry}
            className={cn(
              "flex-1 transition-all duration-200",
              "hover:scale-[1.02] active:scale-[0.98]"
            )}
          >
            <RotateCw className="h-4 w-4 mr-2" />
            Retry
          </Button>
        )}
        <Button
          variant="ghost"
          size={isDuplicate ? "default" : "icon"}
          onClick={onDismiss}
          className={cn(
            "transition-all duration-200",
            "hover:scale-105 active:scale-95",
            isDuplicate && "flex-1"
          )}
        >
          <X className="h-4 w-4" />
          {isDuplicate && <span className="ml-2">Dismiss</span>}
        </Button>
      </CardFooter>
    </Card>
  );
}
