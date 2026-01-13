import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { ProfileSettingsForm } from "@/components/dashboard/profile-settings-form";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata = {
  title: "Settings | LaterStack",
  description: "Manage your reading preferences",
};

export default async function SettingsPage() {
  const { userId } = await auth();

  if (!userId) {
    redirect("/sign-in");
  }

  // Get user profile
  const user = await db.user.findUnique({
    where: { clerkId: userId },
  });

  if (!user) {
    redirect("/dashboard");
  }

  return (
    <div className="min-h-screen bg-zinc-50 p-8 dark:bg-zinc-950">
      <div className="mx-auto max-w-2xl">
        {/* Back button */}
        <Button variant="ghost" size="sm" className="mb-6" asChild>
          <Link href="/dashboard" className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Dashboard
          </Link>
        </Button>

        {/* Header */}
        <div className="mb-8">
          <h1 className="mb-2 text-3xl font-bold text-zinc-900 dark:text-zinc-50">
            Settings
          </h1>
          <p className="text-zinc-600 dark:text-zinc-400">
            Customize your reading preferences to get better recommendations for your stack
          </p>
        </div>

        {/* Settings form */}
        <div className="rounded-lg border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
          <h2 className="mb-6 text-lg font-semibold text-zinc-900 dark:text-zinc-50">
            Profile & Preferences
          </h2>
          <ProfileSettingsForm
            interests={user.interests}
            goals={user.goals}
            readingSpeed={user.readingSpeed}
          />
        </div>

        {/* Help text */}
        <div className="mt-6 rounded-lg border border-zinc-200 bg-zinc-50 p-4 dark:border-zinc-800 dark:bg-zinc-900/50">
          <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-50 mb-2">
            How AI uses your preferences
          </h3>
          <ul className="text-sm text-zinc-600 dark:text-zinc-400 space-y-1">
            <li>
              • <strong>Interests</strong>: Articles matching your interests get higher
              relevance scores
            </li>
            <li>
              • <strong>Goals</strong>: Helps the AI understand what you want to learn
            </li>
            <li>
              • <strong>Reading Speed</strong>: Used to calculate estimated reading times
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
