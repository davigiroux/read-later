import { auth, clerkClient } from "@clerk/nextjs/server";
import { db } from "@/lib/db";
import { SaveArticleForm } from "@/components/dashboard/save-article-form";
import { SavedItemsList } from "@/components/dashboard/saved-items-list";
import { GroupedItemsDisplay } from "@/components/dashboard/grouped-items-display";
import { EmptyState } from "@/components/dashboard/empty-state";
import { FilterTabs } from "@/components/dashboard/filter-tabs";
import { ViewToggle } from "@/components/dashboard/view-toggle";
import { FocusTimer } from "@/components/dashboard/focus-timer";
import { OptimisticArticlesProvider } from "@/contexts/optimistic-articles-context";
import { ViewPreferenceProvider } from "@/contexts/view-preference-context";
import { PageHeader } from "@/components/layout";
import { FAB } from "@/components/ui/fab";
import { Badge } from "@/components/ui/badge";
import { Cloud, Plus, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";

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

  if (!userId) {
    throw new Error("Unauthorized - userId not found");
  }

  let user = await db.user.findUnique({
    where: { clerkId: userId },
  });

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
      console.error("Error creating user in dashboard:", error);
      user = await db.user.findUnique({
        where: { clerkId: userId },
      });

      if (!user) {
        console.error("User still not found after retry. Original error:", error);
        throw new Error(`Failed to create user in database. ClerkId: ${userId}`);
      }
    }
  }

  if (!user) {
    throw new Error(`User not found in database after all attempts. ClerkId: ${userId}`);
  }

  const baseWhere = { userId: user.id };
  const whereClause = {
    ...baseWhere,
    ...(filter === 'unread' && { readAt: null, archivedAt: null }),
    ...(filter === 'read' && { readAt: { not: null }, archivedAt: null }),
    ...(filter === 'archived' && { archivedAt: { not: null } }),
    ...(filter === 'quick-read' && { estimatedTime: { lt: 5 }, archivedAt: null }),
  };

  const savedItems = await db.savedItem.findMany({
    where: whereClause,
    orderBy: [
      { relevanceScore: 'desc' },
      { savedAt: 'desc' },
    ],
    take: 50,
  });

  const groupedItems = filter === 'all' ? {
    unread: savedItems.filter((item: { readAt: Date | null; archivedAt: Date | null }) => !item.readAt && !item.archivedAt),
    read: savedItems.filter((item: { readAt: Date | null; archivedAt: Date | null }) => item.readAt && !item.archivedAt),
    archived: savedItems.filter((item: { archivedAt: Date | null }) => item.archivedAt),
  } : null;

  // Get priority items (top 3 unread by relevance)
  const priorityItems = savedItems
    .filter((item: { readAt: Date | null; archivedAt: Date | null }) => !item.readAt && !item.archivedAt)
    .slice(0, 3);

  const [allCount, unreadCount, readCount, archivedCount, quickReadCount] =
    await Promise.all([
      db.savedItem.count({ where: baseWhere }),
      db.savedItem.count({ where: { ...baseWhere, readAt: null, archivedAt: null } }),
      db.savedItem.count({ where: { ...baseWhere, readAt: { not: null }, archivedAt: null } }),
      db.savedItem.count({ where: { ...baseWhere, archivedAt: { not: null } } }),
      db.savedItem.count({ where: { ...baseWhere, estimatedTime: { lt: 5 }, archivedAt: null } }),
    ]);

  return (
    <div className="min-h-full bg-background animate-[fade-in_0.4s_ease-out]">
      <div className="max-w-6xl mx-auto p-6 lg:p-8 space-y-8">
        {/* Header with search and focus timer */}
        <PageHeader
          title="Dashboard"
          subtitle={allCount > 0 ? `${allCount} article${allCount !== 1 ? "s" : ""} in your queue` : "Your reading queue is empty"}
          focusTimer={<FocusTimer timeLeft="45m left" progress={75} />}
          actions={
            <div className="flex items-center gap-2">
              {/* Sync status indicator */}
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <Cloud className="size-4 text-green-500" />
                <span className="hidden sm:inline">Synced</span>
              </div>
            </div>
          }
        />

        <ViewPreferenceProvider>
          <OptimisticArticlesProvider initialArticles={savedItems}>
            {/* Save Article Form */}
            <div className="rounded-xl border bg-card p-6 shadow-sm">
              <h2 className="mb-4 text-lg font-semibold">Stack New Article</h2>
              <SaveArticleForm />
            </div>

            {/* Today's Priorities Section */}
            {priorityItems.length > 0 && filter === 'all' && (
              <section className="space-y-4">
                <div className="flex items-center gap-2">
                  <h2 className="text-lg font-semibold font-display">Today&apos;s Priorities</h2>
                  <Badge variant="high-impact" size="xs">
                    <TrendingUp className="size-3" />
                    AI Picked
                  </Badge>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {priorityItems.map((item: { id: string; title: string; url: string; estimatedTime: number; relevanceScore: number }, index: number) => (
                    <a
                      key={item.id}
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={cn(
                        "block p-4 rounded-xl border bg-card",
                        "hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200",
                        index === 0 && "border-l-4 border-l-primary"
                      )}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex-1 min-w-0">
                          <p className="font-medium line-clamp-2 text-sm">{item.title}</p>
                          <p className="text-xs text-muted-foreground mt-1">
                            {item.estimatedTime} min read
                          </p>
                        </div>
                        <div className={cn(
                          "flex-shrink-0 text-xs font-bold px-2 py-1 rounded",
                          item.relevanceScore >= 0.9
                            ? "bg-primary text-primary-foreground"
                            : "bg-muted text-muted-foreground"
                        )}>
                          {Math.round(item.relevanceScore * 100)}
                        </div>
                      </div>
                    </a>
                  ))}
                </div>
              </section>
            )}

            {/* Filter Tabs with View Toggle */}
            {allCount > 0 && (
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
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

      {/* FAB for adding articles on mobile */}
      <div className="lg:hidden">
        <FAB icon={<Plus className="size-6" />} />
      </div>
    </div>
  );
}
