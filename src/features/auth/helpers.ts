import { redirect } from 'next/navigation';

import { auth } from '@/auth';

export async function protectServer() {
  const session = await auth();

  if (!session) {
    redirect('/api/auth/signin');
  }
}
