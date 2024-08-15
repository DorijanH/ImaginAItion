import { redirect } from 'next/navigation';

import { auth } from '@/auth';

type AuthLayoutProps = {
  children: React.ReactNode;
}

export default async function AuthLayout({ children }: AuthLayoutProps) {
  const session = await auth();

  // If already authenticated, redirect back to home
  if (session) {
    redirect('/');
  }

  return (
    <div className="flex h-full flex-col bg-[url(/images/background.jpg)] bg-cover bg-top">
      <div className="z-[4] flex size-full flex-col items-center justify-center">
        <div className="size-full md:h-auto md:w-[420px]">
          {children}
        </div>
      </div>

      <div className="fixed inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.8),rgba(0,0,0,0.4),rgba(0,0,0,0.8))]" />
    </div>
  );
}