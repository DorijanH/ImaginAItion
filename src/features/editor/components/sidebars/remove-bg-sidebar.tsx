import Image from 'next/image';
import { AlertTriangle } from 'lucide-react';

import { cn } from '@/lib/utils';
import { useRemoveBackground } from '@/features/ai/hooks/query';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';

import { ActiveTool, Editor } from '../../types';
import ToolSidebarHeader from './tool-sidebar-header';
import ToolSidebarClose from './tool-sidebar-close';

type RemoveBgSidebarProps = {
  editor: Editor | undefined;
  activeTool: ActiveTool;
  onChangeActiveTool: (too: ActiveTool) => void;
}

export default function RemoveBgSidebar(props: RemoveBgSidebarProps) {
  const {
    editor,
    activeTool,
    onChangeActiveTool
  } = props;

  const { mutate: removeBackground, isPending } = useRemoveBackground();

  const selectedObject = editor?.selectedObjects[0];
  // @ts-ignore
  const imageSrc = selectedObject?._originalElement?.currentSrc;

  /**
   * Handles the close action.
   */
  const handleClose = () => {
    onChangeActiveTool('select');
  };

  /**
   * Handles the click action.
   */
  const handleClick = () => {
    // TODO: Paywall

    removeBackground({ imageUrl: imageSrc }, {
      onSuccess: ({ data }) => editor?.addImage(data)
    });
  };

  return (
    <aside
      className={cn('relative z-40 flex h-full w-[360px] flex-col border-r bg-white',
        activeTool === 'remove-bg' ? 'visible' : 'hidden'
      )}
    >
      <ToolSidebarHeader title="Background removal" description="Remove background from image using AI" />

      {!imageSrc ? (
        <div className="flex flex-1 flex-col items-center justify-center gap-y-4">
          <AlertTriangle className="size-4 text-muted-foreground" />

          <p className="text-xs text-muted-foreground">
            Feature not available for this object
          </p>
        </div>
      ) : (
        <ScrollArea>
          <div className="space-y-6 p-4">
            <div
              className={cn(
                'relative aspect-square overflow-hidden rounded-md bg-muted transition',
                isPending && 'opacity-50'
              )}
            >
              <Image
                fill
                alt="Image"
                src={imageSrc}
                className="object-cover"
              />
            </div>

            <Button
              className="w-full"
              disabled={isPending}
              onClick={handleClick}
            >
              Remove background
            </Button>
          </div>
        </ScrollArea>
      )}

      <ToolSidebarClose onClick={handleClose} />
    </aside>
  );
}