import { useQuery } from '@tanstack/react-query';

import { client } from '@/lib/hono';

export const imagesQueryKeys = {
  images: ['images']
} as const;

export function useImages() {
  return useQuery({
    queryKey: imagesQueryKeys.images,
    queryFn: async () => {
      const response = await client.api.images.$get();

      if (!response.ok) {
        throw new Error('Failed to fetch images');
      }

      const { data } = await response.json();

      return data;
    }
  });
}