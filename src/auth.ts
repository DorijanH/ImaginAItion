import GitHub from 'next-auth/providers/github';
import NextAuth from 'next-auth';
import { DrizzleAdapter } from '@auth/drizzle-adapter';

import { db } from './db/drizzle';

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [GitHub],
  adapter: DrizzleAdapter(db)
});