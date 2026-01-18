import { SignUp } from '@clerk/nextjs';
import Image from 'next/image';

export default function SignUpPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-zinc-50 dark:bg-zinc-950">
      <Image
        src="/logo-main-blue.png"
        alt="LaterStack"
        width={220}
        height={220}
        className="mb-8"
        priority
      />
      <SignUp />
    </div>
  );
}
