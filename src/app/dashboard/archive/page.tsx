import { auth, clerkClient } from "@clerk/nextjs/server";
import { db } from "@/lib/db";
import { SavedItemsList } from "@/components/dashboard/saved-items-list";
import { OptimisticArticlesProvider } from "@/contexts/optimistic-articles-context";
import { PageHeader } from "@/components/layout";
import { AddLinkModal } from "@/components/dashboard/add-link-modal";
import { Archive, CheckCircle } from "lucide-react";

export const metadata = {
  title: "Archive | LaterStack",
  description: "Your read and archived articles",
};

interface ArchivePageProps {
  searchParams: Promise<{ filter?: string }>;
}

export default async function ArchivePage({ searchParams }: ArchivePageProps) {
  const params = await searchParams;
  const filter = params.filter || 'read';
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
      console.error("Error creating user in archive:", error);
      user = await db.user.findUnique({
        where: { clerkId: userId },
      });

      if (!user) {
        throw new Error(`Failed to find user. ClerkId: ${userId}`);
      }
    }
  }

  if (!user) {
    throw new Error(`User not found. ClerkId: ${userId}`);
  }

  const baseWhere = { userId: user.id };
  const whereClause = filter === 'archived'
    ? { ...baseWhere, archivedAt: { not: null } }
    : { ...baseWhere, readAt: { not: null }, archivedAt: null };

  const savedItems = await db.savedItem.findMany({
    where: whereClause,
    orderBy: [
      { readAt: 'desc' },
      { savedAt: 'desc' },
    ],
    take: 50,
  });

  const [readCount, archivedCount] = await Promise.all([
    db.savedItem.count({ where: { ...baseWhere, readAt: { not: null }, archivedAt: null } }),
    db.savedItem.count({ where: { ...baseWhere, archivedAt: { not: null } } }),
  ]);

  return (
    <div className="min-h-full bg-slate-50 animate-[fade-in_0.4s_ease-out]">
      <div className="p-8">
        <div className="max-w-5xl mx-auto flex flex-col gap-8 pb-10">
          {/* Header */}
          <PageHeader
            title="Archive"
            subtitle="Articles you've read or archived"
          />

          {/* Filter tabs */}
          <div className="flex items-center gap-2 bg-white p-1 rounded-lg border border-slate-200 shadow-sm w-fit">
            <a
              href="/dashboard/archive?filter=read"
              className={`flex items-center gap-2 px-4 py-2 rounded text-sm font-medium transition-colors ${
                filter === 'read'
                  ? 'bg-slate-100 text-slate-900 shadow-sm border border-slate-200'
                  : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <CheckCircle className="size-4" />
              Read ({readCount})
            </a>
            <a
              href="/dashboard/archive?filter=archived"
              className={`flex items-center gap-2 px-4 py-2 rounded text-sm font-medium transition-colors ${
                filter === 'archived'
                  ? 'bg-slate-100 text-slate-900 shadow-sm border border-slate-200'
                  : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <Archive className="size-4" />
              Archived ({archivedCount})
            </a>
          </div>

          <OptimisticArticlesProvider initialArticles={savedItems}>
            {/* Articles list */}
            {savedItems.length > 0 ? (
              <SavedItemsList />
            ) : (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mb-4">
                  {filter === 'archived' ? (
                    <Archive className="size-8 text-slate-400" />
                  ) : (
                    <CheckCircle className="size-8 text-slate-400" />
                  )}
                </div>
                <h3 className="text-lg font-semibold text-slate-900 mb-1">
                  No {filter === 'archived' ? 'archived' : 'read'} articles yet
                </h3>
                <p className="text-slate-500 text-sm max-w-sm">
                  {filter === 'archived'
                    ? 'Archive articles you want to save for later reference.'
                    : 'Mark articles as read when you finish them.'}
                </p>
              </div>
            )}
            <AddLinkModal />
          </OptimisticArticlesProvider>
        </div>
      </div>
    </div>
  );
}
