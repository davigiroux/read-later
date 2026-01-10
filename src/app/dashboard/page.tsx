import { auth, clerkClient } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { SaveArticleForm } from "@/components/dashboard/save-article-form";
import { SavedItemsList } from "@/components/dashboard/saved-items-list";
import { EmptyState } from "@/components/dashboard/empty-state";
import { FilterTabs } from "@/components/dashboard/filter-tabs";
import { Button } from "@/components/ui/button";
import { Settings } from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "Dashboard | Read Later",
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
    redirect("/sign-in");
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
    } catch (error: any) {
      // User was created by webhook between our check and create attempt
      // Just query for them again
      if (error.code === 'P2002') {
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
    redirect('/sign-in');
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
    <div className="min-h-screen bg-zinc-50 p-8 dark:bg-zinc-950">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-8 flex items-start justify-between">
          <div>
            <h1 className="mb-2 text-3xl font-bold text-zinc-900 dark:text-zinc-50">
              Dashboard
            </h1>
            <p className="text-zinc-600 dark:text-zinc-400">
              Your reading queue
              {allCount > 0 &&
                ` • ${allCount} article${allCount !== 1 ? "s" : ""} saved`}
            </p>
          </div>
          <Button variant="outline" size="sm" asChild>
            <Link href="/settings" className="flex items-center gap-2">
              <Settings className="h-4 w-4" />
              Settings
            </Link>
          </Button>
        </div>

        {/* Save Article Form */}
        <div className="mb-12 rounded-lg border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
          <h2 className="mb-4 text-lg font-semibold text-zinc-900 dark:text-zinc-50">
            Save New Article
          </h2>
          <SaveArticleForm />
        </div>

        {/* Filter Tabs */}
        {allCount > 0 && (
          <FilterTabs
            counts={{
              all: allCount,
              unread: unreadCount,
              read: readCount,
              archived: archivedCount,
              quickRead: quickReadCount,
            }}
          />
        )}

        {/* Saved Articles or Empty State */}
        {savedItems.length > 0 ? (
          <SavedItemsList items={savedItems} />
        ) : (
          <EmptyState />
        )}
      </div>
    </div>
  );
}
