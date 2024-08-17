import { z } from 'zod';
import { Hono } from 'hono';
import { eq } from 'drizzle-orm';
import bcrypt from 'bcryptjs';
import { zValidator } from '@hono/zod-validator';

import { users as usersTable } from '@/db/schema';
import { db } from '@/db/drizzle';

const users = new Hono()
  .post(
    '/',
    zValidator('json', z.object({
      name: z.string(),
      email: z.string().email(),
      password: z.string().min(3)
    })),
    async (c) => {
      const { name, email, password } = c.req.valid('json');

      const query = await db
        .select()
        .from(usersTable)
        .where(eq(usersTable.email, email));

      // If user already exists with the given email, deny registering
      if (query.length) {
        return c.json({ error: 'Email already exists' }, 400);
      }

      const hashedPassword = await bcrypt.hash(password, 12);

      await db.insert(usersTable).values({
        name,
        email,
        passwordHash: hashedPassword
      });

      return c.json(null, 200);
    }
  );

export default users;