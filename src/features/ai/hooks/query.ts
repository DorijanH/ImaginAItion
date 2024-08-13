import { InferRequestType } from 'hono';
import { useMutation } from '@tanstack/react-query';

import { client } from '@/lib/hono';

type RequestType = InferRequestType<typeof client.api.ai['generate-image']['$post']>['json'];

export function useGenerateImage() {
  return useMutation({
    mutationFn: async (payload: RequestType) => {
      const response = await client.api.ai['generate-image'].$post({ json: payload });

      return await response.json();
    }
  });
}