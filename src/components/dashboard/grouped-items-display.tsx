'use client';

import { useState } from 'react';
import { SavedItemsList } from './saved-items-list';
import { Button } from '@/components/ui/button';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SavedItem {
  id: string;
  url: string;
  title: string;
  estimatedTime: number;
  savedAt: Date;
  topics: string[];
  relevanceScore: number;
  reasoning: string;
  readAt: Date | null;
  archivedAt: Date | null;
}

interface GroupedItemsDisplayProps {
  unread: SavedItem[];
  read: SavedItem[];
  archived: SavedItem[];
}

/**
 * Client component that displays grouped items with collapsible sections
 * for read and archived items (inbox-style)
 */
export function GroupedItemsDisplay({ unread, read, archived }: GroupedItemsDisplayProps) {
  const [showRead, setShowRead] = useState(false);
  const [showArchived, setShowArchived] = useState(false);

  return (
    <div className="space-y-12">
      {/* Unread Section - Always visible */}
      {unread.length > 0 && (
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <h2 className="text-2xl font-semibold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
              Up Next
            </h2>
            <span className="text-lg text-muted-foreground">
              {unread.length}
            </span>
          </div>
          <SavedItemsList items={unread} />
        </div>
      )}

      {/* Read Section - Collapsible */}
      {read.length > 0 && (
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowRead(!showRead)}
              className="flex items-center gap-2 -ml-2 hover:bg-transparent"
            >
              {showRead ? (
                <ChevronDown className="h-5 w-5 text-muted-foreground" />
              ) : (
                <ChevronRight className="h-5 w-5 text-muted-foreground" />
              )}
              <h2 className="text-2xl font-semibold">Read</h2>
            </Button>
            <span className="text-lg text-muted-foreground">
              {read.length}
            </span>
          </div>

          {showRead && <SavedItemsList items={read} />}

          {!showRead && (
            <div className="text-sm text-muted-foreground pl-2">
              {read.length} read article{read.length !== 1 ? 's' : ''} hidden · Click to show
            </div>
          )}
        </div>
      )}

      {/* Archived Section - Collapsible */}
      {archived.length > 0 && (
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowArchived(!showArchived)}
              className="flex items-center gap-2 -ml-2 hover:bg-transparent"
            >
              {showArchived ? (
                <ChevronDown className="h-5 w-5 text-muted-foreground" />
              ) : (
                <ChevronRight className="h-5 w-5 text-muted-foreground" />
              )}
              <h2 className="text-2xl font-semibold">Archived</h2>
            </Button>
            <span className="text-lg text-muted-foreground">
              {archived.length}
            </span>
          </div>

          {showArchived && <SavedItemsList items={archived} />}

          {!showArchived && (
            <div className="text-sm text-muted-foreground pl-2">
              {archived.length} archived article{archived.length !== 1 ? 's' : ''} hidden · Click to show
            </div>
          )}
        </div>
      )}
    </div>
  );
}
