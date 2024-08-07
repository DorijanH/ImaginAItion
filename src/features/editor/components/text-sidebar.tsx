import { cn } from '@/lib/utils';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';

import { ActiveTool, Editor } from '../types';
import ToolSidebarHeader from './tool-sidebar-header';
import ToolSidebarClose from './tool-sidebar-close';

type TextSidebarProps = {
  editor: Editor | undefined;
  activeTool: ActiveTool;
  onChangeActiveTool: (too: ActiveTool) => void;
}

export default function TextSidebar(props: TextSidebarProps) {
  const {
    editor,
    activeTool,
    onChangeActiveTool
  } = props;

  /**
   * Handles the close action.
   */
  const handleClose = () => {
    onChangeActiveTool('select');
  };

  /**
   * Handles the add a textbox action.
   */
  const handleAddTextbox = () => {
    editor?.addText('Textbox');
  };

  /**
   * Handles the add a heading action.
   */
  const handleAddHeading = () => {
    editor?.addText('Heading', {
      fontSize: 80,
      fontWeight: 700
    });
  };

  /**
   * Handles the add a subheading action.
   */
  const handleAddSubheading = () => {
    editor?.addText('Subheading', {
      fontSize: 44,
      fontWeight: 600
    });
  };

  /**
   * Handles the add a paragraph action.
   */
  const handleAddParagraph = () => {
    editor?.addText('Paragraph', { fontSize: 32 });
  };

  return (
    <aside
      className={cn('relative z-40 flex h-full w-[360px] flex-col border-r bg-white',
        activeTool === 'text' ? 'visible' : 'hidden'
      )}
    >
      <ToolSidebarHeader title="Text" description="Add text to your canvas" />

      <ScrollArea>
        <div className="space-y-4 border-b p-4">
          <Button className="w-full" onClick={handleAddTextbox}>
            Add a textbox
          </Button>

          <Button
            size="lg"
            variant="secondary"
            className="h-16 w-full"
            onClick={handleAddHeading}
          >
            <span className="text-3xl font-bold">
              Add a heading
            </span>
          </Button>

          <Button
            size="lg"
            variant="secondary"
            className="h-16 w-full"
            onClick={handleAddSubheading}
          >
            <span className="text-xl font-semibold">
              Add a subheading
            </span>
          </Button>

          <Button
            size="lg"
            variant="secondary"
            className="h-16 w-full"
            onClick={handleAddParagraph}
          >
            Add a paragraph
          </Button>
        </div>
      </ScrollArea>

      <ToolSidebarClose onClick={handleClose} />
    </aside>
  );
}