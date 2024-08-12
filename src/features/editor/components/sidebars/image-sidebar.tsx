import Link from 'next/link';
import Image from 'next/image';
import { AlertTriangle, Loader } from 'lucide-react';

import { cn } from '@/lib/utils';
import { useImages } from '@/features/images/hooks/query';
import { UploadButton } from '@/components/uploadthing';
import { ScrollArea } from '@/components/ui/scroll-area';

import { ActiveTool, Editor } from '../../types';
import ToolSidebarHeader from './tool-sidebar-header';
import ToolSidebarClose from './tool-sidebar-close';

type ImageSidebarProps = {
  editor: Editor | undefined;
  activeTool: ActiveTool;
  onChangeActiveTool: (too: ActiveTool) => void;
}

export default function ImageSidebar(props: ImageSidebarProps) {
  const {
    editor,
    activeTool,
    onChangeActiveTool
  } = props;

  const { data: images, isLoading, isError } = useImages();

  /**
   * Handles the close action.
   */
  const handleClose = () => {
    onChangeActiveTool('select');
  };

  /**
   * Handles the add image action.
   */
  const handleAddImage = (url: string) => {
    editor?.addImage(url);
  };

  return (
    <aside
      className={cn('relative z-40 flex h-full w-[360px] flex-col border-r bg-white',
        activeTool === 'images' ? 'visible' : 'hidden'
      )}
    >
      <ToolSidebarHeader title="Images" description="Add images to your canvas" />

      <div className="border-b p-4">
        <UploadButton
          endpoint="imageUploader"
          appearance={{
            button: 'w-full text-sm font-medium',
            allowedContent: 'hidden'
          }}
          content={{
            button: 'Upload Image'
          }}
          onClientUploadComplete={(res) => {
            editor?.addImage(res[0].url);
          }}
        />
      </div>

      {isLoading && (
        <div className="flex flex-1 items-center justify-center">
          <Loader className="size-4 animate-spin text-muted-foreground" />
        </div>
      )}
      {isError && (
        <div className="flex flex-1 flex-col items-center justify-center gap-y-4">
          <AlertTriangle className="size-4 text-muted-foreground" />
          <p className="text-xs text-muted-foreground">
            Failed to fetch images
          </p>
        </div>
      )}

      <ScrollArea>
        <div className="p-4">
          <div className="grid grid-cols-2 gap-4">
            {images && images.map((image) => (
              <button
                key={image.id}
                onClick={() => handleAddImage(image.urls.regular)}
                className="group relative h-[100px] w-full overflow-hidden rounded-sm border bg-muted transition hover:opacity-75"
              >
                <Image
                  fill
                  src={image.urls.small}
                  alt={image.alt_description || 'Image'}
                  className="object-cover"
                />

                <Link
                  target="_blank"
                  href={image.links.html}
                  className="absolute bottom-0 left-0 w-full truncate bg-black/50 p-1 text-left text-[10px] text-white opacity-0 hover:underline group-hover:opacity-100"
                >
                  {image.user.name}
                </Link>
              </button>
            ))}
          </div>
        </div>
      </ScrollArea>

      <ToolSidebarClose onClick={handleClose} />
    </aside>
  );
}