import { Hono } from 'hono';

const users = new Hono()
  .get('/', (context) => {
    return context.json({ users: 'GET' });
  });

export default users;