import { SignUp } from '@clerk/nextjs';
import { Logo } from '@/components/ui/logo';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sign Up | LaterStack',
  description: 'Create a free LaterStack account. AI-powered article prioritization based on your goals.',
};

export default function SignUpPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-zinc-50 dark:bg-zinc-950">
      <Logo size="lg" className="mb-8 scale-125" />
      <SignUp />
    </div>
  );
}
