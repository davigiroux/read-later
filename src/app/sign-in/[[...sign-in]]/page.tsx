import { SignIn } from '@clerk/nextjs';
import Image from 'next/image';

export default function SignInPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-zinc-50 dark:bg-zinc-950">
      <Image
        src="/logo-main-blue.png"
        alt="LaterStack"
        width={280}
        height={280}
        className="mb-8"
        priority
      />
      <SignIn />
    </div>
  );
}
