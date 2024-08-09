import { handle } from 'hono/vercel';
import { Hono } from 'hono';

import images from './images';

export const runtime = 'nodejs';

const app = new Hono().basePath('/api');

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const routes = app
  .route('/images', images);

export type AppType = typeof routes;
export const GET = handle(app);