import { handle } from 'hono/vercel';
import { Hono } from 'hono';

import users from './users';

export const runtime = 'nodejs';

const app = new Hono().basePath('/api');

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const routes = app.route('/users', users);

export const GET = handle(app);
export type AppType = typeof routes;