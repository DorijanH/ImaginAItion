import { toast } from 'sonner';
import { InferRequestType } from 'hono';
import { useMutation } from '@tanstack/react-query';

import { client } from '@/lib/hono';

type RegisterRequest = InferRequestType<typeof client.api.users.$post>['json'];

export function useRegister() {
  return useMutation({
    mutationFn: async (payload: RegisterRequest) => {
      const response = await client.api.users.$post({ json: payload });

      if (!response.ok) {
        throw new Error('Something went wrong');
      }

      return await response.json();
    },
    onSuccess: () => {
      toast.success('User created');
    }
  });
}