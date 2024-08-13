import { useState } from 'react';

import { cn } from '@/lib/utils';
import { useGenerateImage } from '@/features/ai/hooks/query';
import { Textarea } from '@/components/ui/textarea';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';

import { ActiveTool, Editor } from '../../types';
import ToolSidebarHeader from './tool-sidebar-header';
import ToolSidebarClose from './tool-sidebar-close';

type AiSidebarProps = {
  editor: Editor | undefined;
  activeTool: ActiveTool;
  onChangeActiveTool: (too: ActiveTool) => void;
}

export default function AiSidebar(props: AiSidebarProps) {
  const {
    editor,
    activeTool,
    onChangeActiveTool
  } = props;

  const { mutate: generate, isPending } = useGenerateImage();

  const [value, setValue] = useState<string>('');

  /**
   * Handles the close action.
   */
  const handleClose = () => {
    onChangeActiveTool('select');
  };

  /**
   * Handles the form submit action.
   */
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // TODO: Paywall

    generate({ prompt: value }, {
      onSuccess: ({ data }) => editor?.addImage(data)
    });
  };

  return (
    <aside
      className={cn('relative z-40 flex h-full w-[360px] flex-col border-r bg-white',
        activeTool === 'ai' ? 'visible' : 'hidden'
      )}
    >
      <ToolSidebarHeader title="AI" description="Generate an image using AI" />

      <ScrollArea>
        <form className="space-y-6 p-4" onSubmit={handleSubmit}>
          <Textarea
            required
            cols={30}
            rows={10}
            minLength={3}
            value={value}
            disabled={isPending}
            onChange={(e) => setValue(e.target.value)}
            placeholder="An astronaut riding a horse on mars, hd, dramatic lighting"
          />

          <Button
            type="submit"
            className="w-full"
            disabled={isPending}
          >
            Generate
          </Button>
        </form>
      </ScrollArea>

      <ToolSidebarClose onClick={handleClose} />
    </aside>
  );
}