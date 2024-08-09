import { createApi } from 'unsplash-js';

export const unsplash = createApi({
  fetch,
  accessKey: process.env.UNSPLASH_ACCESS_KEY!
});