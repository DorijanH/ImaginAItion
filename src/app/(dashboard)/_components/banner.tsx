'use client';

import { useRouter } from 'next/navigation';
import { ArrowRight, Sparkles } from 'lucide-react';

import { useCreateProject } from '@/features/projects/hooks/query';
import { WORKSPACE_HEIGHT, WORKSPACE_WIDTH } from '@/features/editor/constants';
import { Button } from '@/components/ui/button';

export default function Banner() {
  const router = useRouter();

  const { mutate, isPending } = useCreateProject();

  /**
   * Handles the start creating action click.
   */
  const handleStartCreating = () => {
    mutate(
      {
        name: 'Untitled project',
        width: WORKSPACE_WIDTH,
        height: WORKSPACE_HEIGHT,
        json: ''
      },
      {
        onSuccess: ({ data }) => router.push(`/editor/${data.id}`)
      }
    );
  };

  return (
    <div className="flex aspect-[5/1] min-h-[248px] items-center gap-x-6 rounded-xl bg-gradient-to-r from-[#2e62cb] via-[#0073ff] to-[#3faff5] p-6 text-white">
      <div className="hidden size-28 items-center justify-center rounded-full bg-white/50 md:flex">
        <div className="flex size-20 items-center justify-center rounded-full bg-white">
          <Sparkles className="h-20 fill-[#0073ff] text-[#0073ff]" />
        </div>
      </div>

      <div className="flex flex-col gap-y-2">
        <h1 className="text-xl font-semibold md:text-3xl">
          Visualize your ideas with ImaginAItion
        </h1>

        <p className="mb-2 text-xs md:text-sm">
          Turn inspiration into design in no time.
        </p>

        <Button
          variant="secondary"
          disabled={isPending}
          className="w-[160px]"
          onClick={handleStartCreating}
        >
          Start creating
          <ArrowRight className="ml-2 size-4" />
        </Button>
      </div>
    </div>
  );
}