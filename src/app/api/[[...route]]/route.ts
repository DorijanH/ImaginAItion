import { handle } from 'hono/vercel';
import { Hono } from 'hono';

import images from './images';
import ai from './ai';

export const runtime = 'nodejs';

const app = new Hono().basePath('/api');

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const routes = app
  .route('/images', images)
  .route('/ai', ai);

export type AppType = typeof routes;

export const GET = handle(app);
export const POST = handle(app);