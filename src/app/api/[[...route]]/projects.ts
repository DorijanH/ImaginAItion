import { Hono } from 'hono';
import { zValidator } from '@hono/zod-validator';
import { verifyAuth } from '@hono/auth-js';

import { projects as projectsSchema, projectsInsertSchema } from '@/db/schema';
import { db } from '@/db/drizzle';

const projects = new Hono()
  .post(
    '/',
    verifyAuth(),
    zValidator('json', projectsInsertSchema.pick({
      name: true,
      json: true,
      width: true,
      height: true
    })),
    async (c) => {
      const auth = c.get('authUser');
      const {
        name,
        json,
        width,
        height
      } = c.req.valid('json');

      if (!auth.token?.id) {
        return c.json({ error: 'Unauthorized' }, 401);
      }

      const creationDate = new Date();

      const data = await db
        .insert(projectsSchema)
        .values({
          name,
          json,
          width,
          height,
          userId: auth.token.id,
          createdAt: creationDate,
          updatedAt: creationDate
        })
        .returning();

      if (!data.length) {
        return c.json({ error: 'Something went wrong' }, 500);
      }

      return c.json({ data: data[0] });
    }
  );

export default projects;