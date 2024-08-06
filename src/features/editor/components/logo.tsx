import Link from 'next/link';
import Image from 'next/image';

import { knownPages } from '@/config/known-pages';

export default function Logo() {
  return (
    <Link href={knownPages.Root}>
      <div className="relative size-8 shrink-0">
        <Image
          fill
          src="/logo.svg"
          alt="ImaginAItion"
          className="shrink-0 transition hover:opacity-75"
        />
      </div>
    </Link>
  );
}