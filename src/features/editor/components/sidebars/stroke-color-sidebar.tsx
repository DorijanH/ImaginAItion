import { cn } from '@/lib/utils';
import { ScrollArea } from '@/components/ui/scroll-area';

import ColorPicker from '../color-picker';
import { ActiveTool, Editor } from '../../types';
import { STROKE_COLOR } from '../../constants';
import ToolSidebarHeader from './tool-sidebar-header';
import ToolSidebarClose from './tool-sidebar-close';

type StrokeColorSidebarProps = {
  editor: Editor | undefined;
  activeTool: ActiveTool;
  onChangeActiveTool: (too: ActiveTool) => void;
}

export default function StrokeColorSidebar(props: StrokeColorSidebarProps) {
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
   * Handles the stroke color change action.
   */
  const handleChange = (value: string) => {
    editor?.changeStrokeColor(value);
  };

  const value = editor?.getActiveStrokeColor() ?? STROKE_COLOR;

  return (
    <aside
      className={cn('relative z-40 flex h-full w-[360px] flex-col border-r bg-white',
        activeTool === 'stroke-color' ? 'visible' : 'hidden'
      )}
    >
      <ToolSidebarHeader title="Stroke color" description="Add stroke color to your element" />

      <ScrollArea>
        <div className="space-y-6 p-4">
          <ColorPicker value={value} onChange={handleChange} />
        </div>
      </ScrollArea>

      <ToolSidebarClose onClick={handleClose} />
    </aside>
  );
}