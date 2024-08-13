import { InferRequestType } from 'hono';
import { useMutation } from '@tanstack/react-query';

import { client } from '@/lib/hono';

type GenerateImageRequest = InferRequestType<typeof client.api.ai['generate-image']['$post']>['json'];

export function useGenerateImage() {
  return useMutation({
    mutationFn: async (payload: GenerateImageRequest) => {
      const response = await client.api.ai['generate-image'].$post({ json: payload });

      return await response.json();
    }
  });
}

type RemoveBackgroundRequest = InferRequestType<typeof client.api.ai['remove-bg']['$post']>['json'];

export function useRemoveBackground() {
  return useMutation({
    mutationFn: async (payload: RemoveBackgroundRequest) => {
      const response = await client.api.ai['remove-bg'].$post({ json: payload });

      return await response.json();
    }
  });
}