import Google from 'next-auth/providers/google';
import GitHub from 'next-auth/providers/github';
import NextAuth from 'next-auth';
import { DrizzleAdapter } from '@auth/drizzle-adapter';

import { db } from './db/drizzle';

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    GitHub({
      allowDangerousEmailAccountLinking: true,
    }),
    Google({
      allowDangerousEmailAccountLinking: true
    })
  ],
  adapter: DrizzleAdapter(db),
  pages: {
    signIn: '/login',
    error: '/login'
  }
});