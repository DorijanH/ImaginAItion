import { redirect } from 'next/navigation';

import { protectServer } from '@/features/auth/helpers';

export default async function Home() {
  await protectServer();

  redirect('/editor/project-1');
}
