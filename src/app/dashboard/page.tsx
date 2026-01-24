import { Suspense } from "react";
import { auth, clerkClient } from "@clerk/nextjs/server";
import { db } from "@/lib/db";
import { SavedItemsList } from "@/components/dashboard/saved-items-list";
import { EmptyState } from "@/components/dashboard/empty-state";
import { SortToggle, type SortOption } from "@/components/dashboard/sort-toggle";
import { OptimisticArticlesProvider } from "@/contexts/optimistic-articles-context";
import { PageHeader } from "@/components/layout";
import { AddLinkModal } from "@/components/dashboard/add-link-modal";

export const metadata = {
  title: "Smart Queue | LaterStack",
  description: "Your AI-powered reading queue",
};

interface DashboardPageProps {
  searchParams: Promise<{ sort?: string }>;
}

export default async function DashboardPage({ searchParams }: DashboardPageProps) {
  const params = await searchParams;
  const sort = (params.sort as SortOption) || 'priority';
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

  // Base query: unread, non-archived items
  const baseWhere = {
    userId: user.id,
    readAt: null,
    archivedAt: null,
  };

  // Order by sort option
  const orderBy = sort === 'newest'
    ? [{ savedAt: 'desc' as const }]
    : sort === 'shortest'
      ? [{ estimatedTime: 'asc' as const }, { relevanceScore: 'desc' as const }]
      : [{ relevanceScore: 'desc' as const }, { savedAt: 'desc' as const }];

  const savedItems = await db.savedItem.findMany({
    where: baseWhere,
    orderBy,
    take: 50,
  });

  const unreadCount = await db.savedItem.count({ where: baseWhere });

  // Get user's primary goal for subtitle
  const userGoal = user.goals || "Your reading interests";

  return (
    <div className="min-h-full bg-slate-50 animate-[fade-in_0.4s_ease-out]">
      <div className="p-8">
        <div className="max-w-5xl mx-auto flex flex-col gap-8 pb-10">
          {/* Header */}
          <div className="flex flex-col gap-6">
            <div className="flex items-end justify-between">
              <PageHeader
                title="Smart Queue"
                subtitle={
                  <span>
                    AI-prioritized based on your goal:{" "}
                    <span className="text-primary font-semibold bg-blue-50 px-2 py-0.5 rounded">
                      &quot;{userGoal}&quot;
                    </span>
                  </span>
                }
              />
              <Suspense fallback={<div className="h-9 w-[180px] bg-slate-100 rounded-lg animate-pulse" />}>
                <SortToggle />
              </Suspense>
            </div>

            {/* Stats row */}
            {unreadCount > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {/* Queue Health */}
                <div className="md:col-span-3 bg-white border border-slate-200 rounded-xl p-6 flex items-center justify-between shadow-sm">
                  <div className="flex flex-col gap-1">
                    <p className="text-slate-400 text-xs font-bold uppercase tracking-wider">Queue Health</p>
                    <div className="flex items-baseline gap-2">
                      <span className="text-slate-900 text-3xl font-bold">
                        {unreadCount}
                        <span className="text-xl text-slate-400 ml-1">articles</span>
                      </span>
                    </div>
                    <p className="text-slate-500 text-sm mt-1">Ready to read</p>
                  </div>
                </div>

                {/* Estimated time */}
                <div className="md:col-span-1 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl p-6 flex flex-col justify-between text-white shadow-lg shadow-blue-500/20">
                  <div className="flex items-start justify-between">
                    <span className="text-white/80 text-sm">Today</span>
                  </div>
                  <div>
                    <p className="text-3xl font-bold mt-2">
                      {savedItems.reduce((acc, item) => acc + item.estimatedTime, 0)}
                      <span className="text-lg font-medium opacity-70 ml-1">min</span>
                    </p>
                    <p className="text-sm opacity-90 font-medium">Estimated read time</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          <OptimisticArticlesProvider initialArticles={savedItems}>
            {/* Articles list */}
            {savedItems.length > 0 ? (
              <SavedItemsList />
            ) : (
              <EmptyState />
            )}
            <AddLinkModal />
          </OptimisticArticlesProvider>
        </div>
      </div>
    </div>
  );
}
