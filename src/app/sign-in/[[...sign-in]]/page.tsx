import { SignIn } from '@clerk/nextjs';
import { Logo } from '@/components/ui/logo';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sign In | LaterStack',
  description: 'Sign in to your LaterStack account to access your smart reading queue.',
  robots: {
    index: false,
    follow: true,
  },
};

export default function SignInPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-zinc-50 dark:bg-zinc-950">
      <Logo size="lg" className="mb-8 scale-150" />
      <SignIn />
    </div>
  );
}
