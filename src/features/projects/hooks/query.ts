import { toast } from 'sonner';
import { InferRequestType } from 'hono';
import { useMutation } from '@tanstack/react-query';

import { client } from '@/lib/hono';

type CreateProjectRequest = InferRequestType<typeof client.api.projects['$post']>['json'];

export function useCreateProject() {
  return useMutation({
    mutationFn: async (payload: CreateProjectRequest) => {
      const response = await client.api.projects.$post({ json: payload });

      if (!response.ok) {
        throw new Error('Something went wrong');
      }

      return await response.json();
    },
    onSuccess: () => {
      toast.success('Project created');
    },
    onError: () => {
      toast.error('Failed to create project');
    }
  });
}