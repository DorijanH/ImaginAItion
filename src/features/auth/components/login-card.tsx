'use client';

import { FcGoogle } from 'react-icons/fc';
import { FaGithub } from 'react-icons/fa';
import { IconType } from 'react-icons';
import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { TriangleAlert } from 'lucide-react';

import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function LoginCard() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const params = useSearchParams();
  const error = params.get('error');

  /**
   * Handles the credentials sign in action.
   */
  const handleCredentialsSignIn = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    signIn('credentials', { email, password });
  };

  /**
   * Handles the provider sign in action.
   */
  const handleProviderSignIn = (provider: 'github' | 'google') => {
    signIn(provider);
  };

  return (
    <Card className="size-full p-8">
      <CardHeader className="px-0 pt-0">
        <CardTitle>
          Login to continue
        </CardTitle>

        <CardDescription>
          Use your email or another service to continue
        </CardDescription>
      </CardHeader>

      {!!error && (
        <div className="mb-6 flex items-center gap-x-2 rounded-md bg-destructive/15 p-3 text-sm text-destructive">
          <TriangleAlert className="size-4" />
          <p>Invalid email or password</p>
        </div>
      )}

      <CardContent className="space-y-5 px-0 pb-0">
        <form onSubmit={handleCredentialsSignIn} className="space-y-2.5">
          <Input
            required
            type="email"
            value={email}
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />

          <Input
            required
            type="password"
            value={password}
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />

          <Button
            size="lg"
            type="submit"
            className="w-full"
          >
            Continue
          </Button>
        </form>

        <Separator />

        <div className="flex flex-col gap-y-2.5">
          <ProviderButton
            icon={FaGithub}
            label="Continue with GitHub"
            onClick={() => handleProviderSignIn('github')}
          />

          <ProviderButton
            icon={FcGoogle}
            label="Continue with Google"
            onClick={() => handleProviderSignIn('google')}
          />
        </div>

        <p className="text-xs text-muted-foreground">
          Don&apos;t have an account? {' '}

          <Link href="/register">
            <span className="text-sky-700 hover:underline">
              Register
            </span>
          </Link>
        </p>
      </CardContent>
    </Card>
  );
}

type ProviderButtonProps = {
  icon: IconType;
  label: string;
  onClick: () => void;
};

function ProviderButton(props: ProviderButtonProps) {
  const {
    label,
    onClick,
    icon: Icon
  } = props;

  return (
    <Button
      size="lg"
      variant="outline"
      onClick={onClick}
      className="relative w-full"
    >
      <Icon className="absolute left-2.5 top-2.5 mr-2 size-5" />

      {label}
    </Button>
  );
}