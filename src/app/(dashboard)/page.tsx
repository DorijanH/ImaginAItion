import { protectServer } from '@/features/auth/helpers';

import Banner from './_components/banner';

export default async function Home() {
  await protectServer();

  return (
    <div className="mx-auto flex max-w-screen-xl flex-col gap-y-6 pb-10">
      <Banner />
    </div>
  );
}
