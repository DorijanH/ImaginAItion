import { z } from 'zod';
import { Hono } from 'hono';
import { zValidator } from '@hono/zod-validator';

import { replicate } from '@/lib/replicate';

const ai = new Hono()
  .post(
    '/generate-image',
    zValidator('json', z.object({ prompt: z.string() })),
    async (c) => {
      const { prompt } = c.req.valid('json');

      const input = {
        prompt,
        scheduler: 'K_EULER'
      };

      const output = await replicate.run('stability-ai/stable-diffusion:ac732df83cea7fff18b8472768c88ad041fa750ff7682a21affe81863cbe77e4', { input });
      const response = output as string[];

      return c.json({ data: response[0] });
    }
  );

export default ai;