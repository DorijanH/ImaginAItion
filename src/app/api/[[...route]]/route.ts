import { handle } from 'hono/vercel';
import { Context, Hono } from 'hono';
import { AuthConfig, initAuthConfig } from '@hono/auth-js';

import authConfig from '@/auth.config';

import users from './users';
import images from './images';
import ai from './ai';

export const runtime = 'nodejs';

function getAuthConfig(c: Context): AuthConfig {
  return {
    secret: c.env.AUTH_SECRET,
    ...authConfig
  };
}

const app = new Hono().basePath('/api');

app.use('*', initAuthConfig(getAuthConfig));

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const routes = app
  .route('/images', images)
  .route('/ai', ai)
  .route('/users', users);

export type AppType = typeof routes;

export const GET = handle(app);
export const POST = handle(app);