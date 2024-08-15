'use client';

import { FcGoogle } from 'react-icons/fc';
import { FaGithub } from 'react-icons/fa';
import { IconType } from 'react-icons';
import { signIn } from 'next-auth/react';
import Link from 'next/link';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function RegisterCard() {
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

      <CardContent className="space-y-5 px-0 pb-0">
        <div className="flex flex-col gap-y-2.5">
          <ProviderButton
            icon={FaGithub}
            label="Continue with GitHub"
            onClick={() => handleProviderSignUp('github')}
          />

          <ProviderButton
            icon={FcGoogle}
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