import { ExternalLink, Clock } from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface SavedItem {
  id: string;
  url: string;
  title: string;
  estimatedTime: number;
  savedAt: Date;
  topics: string[];
  relevanceScore: number;
  reasoning: string;
}

interface SavedItemsListProps {
  items: SavedItem[];
}

/**
 * Format a date as relative time (e.g., "2 days ago")
 */
function formatRelativeTime(date: Date): string {
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return 'Today';
  if (diffDays === 1) return 'Yesterday';
  if (diffDays < 7) return `${diffDays} days ago`;
  if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
  if (diffDays < 365) return `${Math.floor(diffDays / 30)} months ago`;
  return `${Math.floor(diffDays / 365)} years ago`;
}

/**
 * Extract domain from URL for display
 */
function getDomain(url: string): string {
  try {
    const urlObj = new URL(url);
    return urlObj.hostname.replace('www.', '');
  } catch {
    return url;
  }
}

/**
 * Server component that displays a grid of saved articles
 */
export function SavedItemsList({ items }: SavedItemsListProps) {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {items.map((item) => (
        <Card key={item.id} className="flex flex-col">
          <CardHeader>
            <CardTitle className="line-clamp-2 text-lg">
              {item.title}
            </CardTitle>
            <CardDescription className="flex items-center gap-2">
              <span className="truncate">{getDomain(item.url)}</span>
              <span>•</span>
              <span>{formatRelativeTime(item.savedAt)}</span>
            </CardDescription>
          </CardHeader>

          <CardContent className="flex-1 space-y-3">
            {/* Reading time and relevance score */}
            <div className="flex items-center gap-2 flex-wrap">
              <Badge variant="secondary" className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                {item.estimatedTime} min read
              </Badge>
              {item.relevanceScore > 0 && (
                <Badge
                  variant={
                    item.relevanceScore >= 0.8
                      ? 'default'
                      : item.relevanceScore >= 0.5
                        ? 'secondary'
                        : 'outline'
                  }
                  className="flex items-center gap-1"
                >
                  ⭐ {Math.round(item.relevanceScore * 100)}% match
                </Badge>
              )}
            </div>

            {/* Topics */}
            {item.topics.length > 0 && (
              <div className="flex flex-wrap gap-1">
                {item.topics.map((topic, idx) => (
                  <Badge
                    key={idx}
                    variant="outline"
                    className="text-xs"
                  >
                    {topic}
                  </Badge>
                ))}
              </div>
            )}

            {/* AI reasoning (if relevance score exists) */}
            {item.reasoning && item.relevanceScore > 0 && (
              <p className="text-xs text-zinc-600 dark:text-zinc-400 italic">
                {item.reasoning}
              </p>
            )}
          </CardContent>

          <CardFooter>
            <Button variant="outline" size="sm" className="w-full" asChild>
              <a
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2"
              >
                Read Article
                <ExternalLink className="h-4 w-4" />
              </a>
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
