'use client';


import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { CreditCard, Crown, Home, LucideIcon, MessageCircleQuestion } from 'lucide-react';

import { cn } from '@/lib/utils';
import { knownPages } from '@/config/known-pages';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';

export default function SidebarRoutes() {
  const pathname = usePathname();

  return (
    <div className="flex flex-1 flex-col gap-y-4">
      <div className="px-4">
        <Button
          size="lg"
          variant="outline"
          onClick={() => {}}
          className="w-full rounded-xl border-none transition hover:bg-white hover:opacity-75"
        >
          <Crown className="mr-2 size-4 shrink-0 fill-yellow-500 text-yellow-500" />
          Upgrade to ImaginAItion Pro
        </Button>
      </div>

      <div className="px-3">
        <Separator />
      </div>

      <ul className="flex flex-col gap-y-1 px-3">
        <SidebarItem
          icon={Home}
          label="Home"
          href={knownPages.Root}
          isActive={pathname === knownPages.Root}
        />
      </ul>

      <div className="px-3">
        <Separator />
      </div>

      <ul className="flex flex-col gap-y-1 px-3">
        <SidebarItem
          label="Billing"
          href={pathname}
          icon={CreditCard}
          onClick={() => {}}
        />
        <SidebarItem
          label="Get Help"
          icon={MessageCircleQuestion}
          href="mailto:dhaspl@gmail.com"
        />
      </ul>
    </div>
  );
}

type SidebarItemProps = {
  href: string;
  label: string;
  icon: LucideIcon;
  isActive?: boolean;
  onClick?: () => void;
}

function SidebarItem(props: SidebarItemProps) {
  const {
    icon: Icon,
    href,
    label,
    onClick,
    isActive
  } = props;

  return (
    <Link href={href} onClick={onClick}>
      <div
        className={cn(
          'flex items-center rounded-xl bg-transparent p-3 transition hover:bg-white',
          isActive && 'bg-white'
        )}
      >
        <Icon className="mr-2 size-4 stroke-2" />

        <span className="text-sm font-medium">
          {label}
        </span>
      </div>
    </Link>
  );
}