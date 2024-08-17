import { z } from 'zod';
import Google from 'next-auth/providers/google';
import GitHub from 'next-auth/providers/github';
import Credentials from 'next-auth/providers/credentials';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { JWT } from 'next-auth/jwt';
import { NextAuthConfig } from 'next-auth';
import { eq } from 'drizzle-orm';
import bcrypt from 'bcryptjs';
import { DrizzleAdapter } from '@auth/drizzle-adapter';

import { users } from './db/schema';
import { db } from './db/drizzle';

const CredentialsSchema = z.object({
  email: z.string().email(),
  password: z.string()
});

declare module 'next-auth/jwt' {
  interface JWT {
    id: string | undefined;
  }
}

const authConfig: NextAuthConfig = {
  providers: [
    GitHub({
      allowDangerousEmailAccountLinking: true,
    }),
    Google({
      allowDangerousEmailAccountLinking: true
    }),
    Credentials({
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' }
      },
      authorize: async (credentials) => {
        const validatedFields = CredentialsSchema.safeParse(credentials);

        if (!validatedFields.success) {
          return null;
        }

        const { email, password } = validatedFields.data;

        const [user] = await db
          .select()
          .from(users)
          .where(eq(users.email, email));

        if (!user || !user.passwordHash) {
          return null;
        }

        const isPasswordMatch = await bcrypt.compare(password, user.passwordHash);

        if (!isPasswordMatch) {
          return null;
        }

        return user;
      }
    })
  ],
  adapter: DrizzleAdapter(db),
  pages: {
    signIn: '/login',
    error: '/login'
  },
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    jwt: ({ token, user }) => {
      if (user) {
        token.id = user.id;
      }

      return token;
    },
    session: ({ session, token }) => {
      if (token.id) {
        session.user.id = token.id;
      }

      return session;
    }
  }
};

export default authConfig;