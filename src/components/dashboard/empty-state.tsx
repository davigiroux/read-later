import { BookOpen, Sparkles, TrendingUp } from 'lucide-react';

/**
 * Empty state component shown when user has no saved articles
 */
export function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-20 px-4 text-center animate-[fade-in_0.6s_ease-out]">
      {/* Icon with gradient background */}
      <div className="relative mb-6">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-primary/5 rounded-2xl blur-xl" />
        <div className="relative rounded-2xl bg-gradient-to-br from-primary/10 to-primary/5 p-8 border border-primary/10">
          <BookOpen className="h-16 w-16 text-primary" />
        </div>
      </div>

      {/* Main message */}
      <h3 className="text-2xl font-semibold mb-3 max-w-md">
        Your reading queue awaits
      </h3>
      <p className="text-muted-foreground text-lg max-w-md mb-8 leading-relaxed">
        Save your first article to start building your personalized reading collection.
      </p>

      {/* Helpful suggestions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-2xl mt-4">
        <div className="flex items-start gap-3 p-4 rounded-lg bg-muted/50 text-left">
          <div className="rounded-lg bg-primary/10 p-2 shrink-0">
            <Sparkles className="h-4 w-4 text-primary" />
          </div>
          <div>
            <p className="text-sm font-medium mb-1">AI-Powered</p>
            <p className="text-xs text-muted-foreground">Get smart relevance scores</p>
          </div>
        </div>

        <div className="flex items-start gap-3 p-4 rounded-lg bg-muted/50 text-left">
          <div className="rounded-lg bg-primary/10 p-2 shrink-0">
            <BookOpen className="h-4 w-4 text-primary" />
          </div>
          <div>
            <p className="text-sm font-medium mb-1">Organize</p>
            <p className="text-xs text-muted-foreground">Read, archive, and filter</p>
          </div>
        </div>

        <div className="flex items-start gap-3 p-4 rounded-lg bg-muted/50 text-left">
          <div className="rounded-lg bg-primary/10 p-2 shrink-0">
            <TrendingUp className="h-4 w-4 text-primary" />
          </div>
          <div>
            <p className="text-sm font-medium mb-1">Track Progress</p>
            <p className="text-xs text-muted-foreground">Monitor reading habits</p>
          </div>
        </div>
      </div>
    </div>
  );
}
