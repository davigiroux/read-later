import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/db";
import { EnhancedSettingsForm } from "@/components/settings/enhanced-settings-form";
import { Logo } from "@/components/ui/logo";

export const metadata = {
  title: "Settings | LaterStack",
  description: "Manage your reading preferences",
};

export default async function SettingsPage() {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("Unauthorized - userId not found");
  }

  const user = await db.user.findUnique({
    where: { clerkId: userId },
  });

  if (!user) {
    throw new Error("User not found in database");
  }

  return (
    <div className="min-h-full bg-background animate-[fade-in_0.4s_ease-out]">
      <div className="max-w-3xl mx-auto p-6 lg:p-8 space-y-8">
        {/* Header */}
        <div className="flex items-center gap-3 pb-6 border-b">
          <Logo showText={false} size="lg" />
          <div>
            <h1 className="font-display text-2xl md:text-3xl font-bold tracking-tight">
              Settings
            </h1>
            <p className="text-muted-foreground text-sm">
              Customize your reading preferences for better AI recommendations
            </p>
          </div>
        </div>

        {/* Enhanced Settings Form */}
        <EnhancedSettingsForm
          interests={user.interests}
          goals={user.goals}
          readingSpeed={user.readingSpeed}
        />

        {/* Help Section */}
        <div className="rounded-xl border bg-muted/30 p-6">
          <h3 className="text-sm font-semibold mb-3">How AI uses your preferences</h3>
          <ul className="text-sm text-muted-foreground space-y-2">
            <li className="flex items-start gap-2">
              <span className="text-primary font-bold">1.</span>
              <span><strong>Goals</strong> - Ranked goals boost article scores. #1 goal = +20% relevance.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary font-bold">2.</span>
              <span><strong>Interests</strong> - Articles matching your interests get prioritized in your queue.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary font-bold">3.</span>
              <span><strong>Reading Speed</strong> - Used to calculate accurate estimated reading times.</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
