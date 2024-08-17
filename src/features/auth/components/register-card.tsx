'use client';

import { FcGoogle } from 'react-icons/fc';
import { FaGithub } from 'react-icons/fa';
import { IconType } from 'react-icons';
import { useState } from 'react';
import { signIn } from 'next-auth/react';
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

import { useRegister } from '../hooks/query';

export default function RegisterCard() {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const { mutate: register, isPending, isError } = useRegister();

  /**
   * Handles the credentials sign up action.
   */
  const handleCredentialsSignUp = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    register({
      name,
      email,
      password
    }, {
      onSuccess: () => signIn('credentials', { email, password })
    });
  };

  /**
   * Handles the provider sign up action.
   */
  const handleProviderSignUp = (provider: 'github' | 'google') => {
    signIn(provider);
  };

  return (
    <Card className="size-full p-8">
      <CardHeader className="px-0 pt-0">
        <CardTitle>
          Create an account
        </CardTitle>

        <CardDescription>
          Use your email or another service to continue
        </CardDescription>
      </CardHeader>

      {!!isError && (
        <div className="mb-6 flex items-center gap-x-2 rounded-md bg-destructive/15 p-3 text-sm text-destructive">
          <TriangleAlert className="size-4" />
          <p>Something went wrong</p>
        </div>
      )}

      <CardContent className="space-y-5 px-0 pb-0">
        <form onSubmit={handleCredentialsSignUp} className="space-y-2.5">
          <Input
            required
            type="text"
            value={name}
            disabled={isPending}
            placeholder="Full name"
            onChange={(e) => setName(e.target.value)}
          />

          <Input
            required
            type="email"
            value={email}
            placeholder="Email"
            disabled={isPending}
            onChange={(e) => setEmail(e.target.value)}
          />

          <Input
            required
            minLength={3}
            type="password"
            value={password}
            disabled={isPending}
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />

          <Button
            size="lg"
            type="submit"
            className="w-full"
            disabled={isPending}
          >
            Continue
          </Button>
        </form>

        <Separator />

        <div className="flex flex-col gap-y-2.5">
          <ProviderButton
            icon={FaGithub}
            disabled={isPending}
            label="Continue with GitHub"
            onClick={() => handleProviderSignUp('github')}
          />

          <ProviderButton
            icon={FcGoogle}
            disabled={isPending}
            label="Continue with Google"
            onClick={() => handleProviderSignUp('google')}
          />
        </div>

        <p className="text-xs text-muted-foreground">
          Already have an account? {' '}

          <Link href="/login">
            <span className="text-sky-700 hover:underline">
              Login
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
  disabled?: boolean;
};

function ProviderButton(props: ProviderButtonProps) {
  const {
    label,
    onClick,
    icon: Icon,
    disabled = false
  } = props;

  return (
    <Button
      size="lg"
      variant="outline"
      onClick={onClick}
      disabled={disabled}
      className="relative w-full"
    >
      <Icon className="absolute left-2.5 top-2.5 mr-2 size-5" />

      {label}
    </Button>
  );
}