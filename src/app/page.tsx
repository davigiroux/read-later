import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-zinc-50 to-zinc-100 p-8 dark:from-zinc-950 dark:to-zinc-900">
      <div className="w-full max-w-2xl text-center">
        <h1 className="mb-6 text-5xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
          Your smart reading queue
        </h1>
        <p className="mb-8 text-xl text-zinc-600 dark:text-zinc-400">
          Save articles, get AI-powered recommendations on what to read next based on your interests and available time.
        </p>
        <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
          <Button asChild size="lg" className="text-lg">
            <Link href="/dashboard">Get Started</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
