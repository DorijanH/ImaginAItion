'use client';

import { useSession, signOut } from 'next-auth/react';
import { CreditCard, Loader, LogOut } from 'lucide-react';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import {
  Avatar,
  AvatarFallback,
  AvatarImage
} from '@/components/ui/avatar';

export default function UserButton() {
  const session = useSession();

  if (session.status === 'loading') {
    return <Loader className="size-4 animate-spin text-muted-foreground" />;
  }

  if (session.status === 'unauthenticated' || !session.data) {
    return null;
  }

  const user = session.data.user!;

  const name = user.name!;
  const imageUrl = user.image;

  /**
   * Handles the sign out action.
   */
  const handleSignOut = () => {
    signOut();
  };

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger>
        {/* TODO: Do something if user is premium */}
        <Avatar className="size-10 transition hover:opacity-75">
          <AvatarImage src={imageUrl || ''} alt={name} />

          <AvatarFallback className="bg-blue-500 font-medium text-white">
            {name.charAt(0).toUpperCase()}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="min-w-60">
        <DropdownMenuItem
          disabled={true}
          className="h-10"
          onClick={() => {}}
        >
          <CreditCard className="mr-2 size-4" />
          Billing
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem className="h-10" onClick={handleSignOut}>
          <LogOut className="mr-2 size-4" />
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}