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
  )
  .post(
    '/remove-bg',
    zValidator('json', z.object({ imageUrl: z.string() })),
    async (c) => {
      const { imageUrl } = c.req.valid('json');

      const input = {
        image: imageUrl
      };

      const output: unknown = await replicate.run('cjwbw/rembg:fb8af171cfa1616ddcf1242c093f9c46bcada5ad4cf6f2fbe8b81b330ec5c003', { input });
      const response = output as string;

      return c.json({ data: response });
    }
  );

export default ai;