import { cn } from '@/lib/utils';
import { ScrollArea } from '@/components/ui/scroll-area';

import { ActiveTool, Editor } from '../types';
import { FILL_COLOR } from '../constants';
import ToolSidebarHeader from './tool-sidebar-header';
import ToolSidebarClose from './tool-sidebar-close';
import ColorPicker from './color-picker';

type FillColorSidebarProps = {
  editor: Editor | undefined;
  activeTool: ActiveTool;
  onChangeActiveTool: (too: ActiveTool) => void;
}

export default function FillColorSidebar(props: FillColorSidebarProps) {
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
   * Handles the fill color change action.
   */
  const handleChange = (value: string) => {
    editor?.changeFillColor(value);
  };

  const value = editor?.fillColor ?? FILL_COLOR;

  return (
    <aside
      className={cn('relative z-40 flex h-full w-[360px] flex-col border-r bg-white',
        activeTool === 'fill' ? 'visible' : 'hidden'
      )}
    >
      <ToolSidebarHeader title="Fill color" description="Add fill color to your element" />

      <ScrollArea>
        <div className="space-y-6 p-4">
          <ColorPicker value={value} onChange={handleChange} />
        </div>
      </ScrollArea>

      <ToolSidebarClose onClick={handleClose} />
    </aside>
  );
}