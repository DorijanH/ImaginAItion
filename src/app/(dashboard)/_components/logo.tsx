import Link from 'next/link';
import Image from 'next/image';
import { Space_Grotesk } from 'next/font/google';

import { cn } from '@/lib/utils';
import { knownPages } from '@/config/known-pages';

const font = Space_Grotesk({
  weight: ['700'],
  subsets: ['latin']
});

export default function Logo() {
  return (
    <Link href={knownPages.Root}>
      <div className="flex h-[68px] items-center gap-x-2 px-4 transition hover:opacity-75">
        <div className="relative size-8">
          <Image
            fill
            priority
            alt="ImaginAItion"
            src="/icons/logo.svg"
          />
        </div>

        <h1 className={cn(font.className, 'text-xl font-bold')}>
          ImaginAItion
        </h1>
      </div>
    </Link>
  );
}