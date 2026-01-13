import { auth, clerkClient } from "@clerk/nextjs/server";
import { db } from "@/lib/db";
import { SaveArticleForm } from "@/components/dashboard/save-article-form";
import { SavedItemsList } from "@/components/dashboard/saved-items-list";
import { GroupedItemsDisplay } from "@/components/dashboard/grouped-items-display";
import { EmptyState } from "@/components/dashboard/empty-state";
import { FilterTabs } from "@/components/dashboard/filter-tabs";
import { ViewToggle } from "@/components/dashboard/view-toggle";
import { OptimisticArticlesProvider } from "@/contexts/optimistic-articles-context";
import { ViewPreferenceProvider } from "@/contexts/view-preference-context";
import { Button } from "@/components/ui/button";
import { Settings } from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "Dashboard | LaterStack",
  description: "Your AI-powered reading queue",
};

interface DashboardPageProps {
  searchParams: Promise<{ filter?: string }>;
}

export default async function DashboardPage({ searchParams }: DashboardPageProps) {
  const params = await searchParams;
  const filter = params.filter || 'all';
  const { userId } = await auth();

  // Middleware ensures userId is always present on protected routes
  if (!userId) {
    throw new Error("Unauthorized - userId not found");
  }

  // Find or create user in database
  let user = await db.user.findUnique({
    where: { clerkId: userId },
  });

  // Create user if not found (handles webhook race condition)
  if (!user) {
    try {
      const client = await clerkClient();
      const clerkUser = await client.users.getUser(userId);

      user = await db.user.create({
        data: {
          clerkId: userId,
          email: clerkUser.emailAddresses[0]?.emailAddress || "",
          name:
            `${clerkUser.firstName || ""} ${clerkUser.lastName || ""}`.trim() ||
            null,
          interests: [],
          goals: "",
          readingSpeed: 250,
        },
      });
    } catch (error: unknown) {
      // User was created by webhook between our check and create attempt
      // Just query for them again
      if (error && typeof error === 'object' && 'code' in error && error.code === 'P2002') {
        user = await db.user.findUnique({
          where: { clerkId: userId },
        });
      } else {
        throw error;
      }
    }
  }

  // Ensure user exists (should never happen, but makes TypeScript happy)
  if (!user) {
    throw new Error("Failed to create or find user in database");
  }

  // Build where clause based on filter
  const baseWhere = { userId: user.id };
  const whereClause = {
    ...baseWhere,
    ...(filter === 'unread' && { readAt: null, archivedAt: null }),
    ...(filter === 'read' && { readAt: { not: null }, archivedAt: null }),
    ...(filter === 'archived' && { archivedAt: { not: null } }),
    ...(filter === 'quick-read' && { estimatedTime: { lt: 5 }, archivedAt: null }),
    // 'all' filter = no additional filters beyond userId
  };

  // Fetch filtered items
  const savedItems = await db.savedItem.findMany({
    where: whereClause,
    orderBy: [
      { relevanceScore: 'desc' },
      { savedAt: 'desc' },
    ],
    take: 50,
  });

  // Group items by status for "all" view
  const groupedItems = filter === 'all' ? {
    unread: savedItems.filter((item: { readAt: Date | null; archivedAt: Date | null }) => !item.readAt && !item.archivedAt),
    read: savedItems.filter((item: { readAt: Date | null; archivedAt: Date | null }) => item.readAt && !item.archivedAt),
    archived: savedItems.filter((item: { archivedAt: Date | null }) => item.archivedAt),
  } : null;

  // Calculate counts for all filters (parallel queries for performance)
  const [allCount, unreadCount, readCount, archivedCount, quickReadCount] =
    await Promise.all([
      db.savedItem.count({ where: baseWhere }),
      db.savedItem.count({ where: { ...baseWhere, readAt: null, archivedAt: null } }),
      db.savedItem.count({ where: { ...baseWhere, readAt: { not: null }, archivedAt: null } }),
      db.savedItem.count({ where: { ...baseWhere, archivedAt: { not: null } } }),
      db.savedItem.count({ where: { ...baseWhere, estimatedTime: { lt: 5 }, archivedAt: null } }),
    ]);

  return (
    <div className="min-h-screen bg-background p-8 animate-[fade-in_0.4s_ease-out]">
      <div className="mx-auto max-w-7xl space-y-10">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div>
            <h1 className="mb-2 text-4xl font-bold tracking-tight">
              Dashboard
            </h1>
            <p className="text-muted-foreground text-lg">
              Your reading stack
              {allCount > 0 &&
                ` · ${allCount} article${allCount !== 1 ? "s" : ""}`}
            </p>
          </div>
          <Button variant="outline" asChild>
            <Link href="/settings" className="flex items-center gap-2">
              <Settings className="h-4 w-4" />
              Settings
            </Link>
          </Button>
        </div>

        {/* Wrap client components in providers */}
        <ViewPreferenceProvider>
          <OptimisticArticlesProvider initialArticles={savedItems}>
          {/* Save Article Form */}
          <div className="rounded-xl border bg-card p-8 shadow-sm">
            <h2 className="mb-4 text-xl font-semibold">
              Stack New Article
            </h2>
            <SaveArticleForm />
          </div>

          {/* Filter Tabs with View Toggle */}
          {allCount > 0 && (
            <div className="flex items-center justify-between gap-4 mb-6">
              <FilterTabs
                counts={{
                  all: allCount,
                  unread: unreadCount,
                  read: readCount,
                  archived: archivedCount,
                  quickRead: quickReadCount,
                }}
              />
              <ViewToggle />
            </div>
          )}

          {/* Saved Articles or Empty State */}
          {savedItems.length > 0 ? (
            filter === 'all' && groupedItems ? (
              <GroupedItemsDisplay
                unread={groupedItems.unread}
                read={groupedItems.read}
                archived={groupedItems.archived}
              />
            ) : (
              <SavedItemsList />
            )
          ) : (
            <EmptyState />
          )}
          </OptimisticArticlesProvider>
        </ViewPreferenceProvider>
      </div>
    </div>
  );
}
