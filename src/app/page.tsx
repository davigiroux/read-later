import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Sparkles, Clock, Target } from 'lucide-react';

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-background via-background to-secondary/30 p-8 relative overflow-hidden">
      {/* Abstract background pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,oklch(0.35_0.12_260_/_0.05),transparent_50%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,oklch(0.90_0.004_240_/_0.05)_1px,transparent_1px),linear-gradient(to_bottom,oklch(0.90_0.004_240_/_0.05)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />

      <div className="w-full max-w-4xl text-center relative z-10 animate-[fade-in_0.6s_ease-out]">
        <h1 className="mb-6 text-6xl font-bold tracking-tight leading-tight bg-gradient-to-br from-foreground to-foreground/70 bg-clip-text text-transparent">
          Your smart reading queue
        </h1>
        <p className="mb-12 text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          Stack articles, get AI-powered recommendations on what to read next based on your interests and available time.
        </p>
        <div className="flex flex-col gap-4 sm:flex-row sm:justify-center mb-20">
          <Button asChild variant="premium" size="lg" className="text-base">
            <Link href="/dashboard">Get Started</Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="text-base">
            <Link href="/sign-in">Sign In</Link>
          </Button>
        </div>

        {/* Feature showcase */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 animate-[fade-in_0.8s_ease-out_0.3s_both]">
          <div className="p-6 rounded-xl bg-card/50 backdrop-blur-sm border shadow-sm hover:shadow-md transition-all duration-200 hover:-translate-y-1">
            <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center mb-4 mx-auto">
              <Sparkles className="w-6 h-6 text-primary-foreground" />
            </div>
            <h3 className="text-lg font-semibold mb-2">AI-Powered Curation</h3>
            <p className="text-sm text-muted-foreground">
              Smart relevance scoring helps you focus on articles that matter most to you.
            </p>
          </div>

          <div className="p-6 rounded-xl bg-card/50 backdrop-blur-sm border shadow-sm hover:shadow-md transition-all duration-200 hover:-translate-y-1">
            <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center mb-4 mx-auto">
              <Clock className="w-6 h-6 text-primary-foreground" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Time-Aware Reading</h3>
            <p className="text-sm text-muted-foreground">
              Automatic reading time estimates help you choose articles that fit your schedule.
            </p>
          </div>

          <div className="p-6 rounded-xl bg-card/50 backdrop-blur-sm border shadow-sm hover:shadow-md transition-all duration-200 hover:-translate-y-1">
            <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center mb-4 mx-auto">
              <Target className="w-6 h-6 text-primary-foreground" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Personal Goals</h3>
            <p className="text-sm text-muted-foreground">
              Set reading goals and interests to get tailored article recommendations.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
