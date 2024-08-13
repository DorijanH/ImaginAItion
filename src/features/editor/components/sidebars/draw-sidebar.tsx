import { cn } from '@/lib/utils';
import { Slider } from '@/components/ui/slider';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Label } from '@/components/ui/label';

import ColorPicker from '../color-picker';
import { ActiveTool, Editor } from '../../types';
import { STROKE_COLOR, STROKE_WIDTH } from '../../constants';
import ToolSidebarHeader from './tool-sidebar-header';
import ToolSidebarClose from './tool-sidebar-close';

type DrawSidebarProps = {
  editor: Editor | undefined;
  activeTool: ActiveTool;
  onChangeActiveTool: (too: ActiveTool) => void;
}

export default function DrawSidebar(props: DrawSidebarProps) {
  const {
    editor,
    activeTool,
    onChangeActiveTool
  } = props;

  const colorValue = editor?.getActiveStrokeColor() ?? STROKE_COLOR;
  const widthValue = editor?.getActiveStrokeWidth() ?? STROKE_WIDTH;

  /**
   * Handles the close action.
   */
  const handleClose = () => {
    onChangeActiveTool('select');
  };

  /**
   * Handles the color change action.
   */
  const handleColorChange = (value: string) => {
    editor?.changeStrokeColor(value);
  };

  /**
   * Handles the stroke width change action.
   */
  const handleWidthChange = (value: number) => {
    editor?.changeStrokeWidth(value);
  };

  return (
    <aside
      className={cn('relative z-40 flex h-full w-[360px] flex-col border-r bg-white',
        activeTool === 'draw' ? 'visible' : 'hidden'
      )}
    >
      <ToolSidebarHeader title="Draw" description="Modify brush settings" />

      <ScrollArea>
        <div className="space-y-4 border-b p-4">
          <Label className="text-sm">
            Brush width
          </Label>

          <Slider value={[widthValue]} onValueChange={(values) => handleWidthChange(values[0])} />
        </div>

        <div className="p-4">
          <ColorPicker value={colorValue} onChange={handleColorChange} />
        </div>
      </ScrollArea>

      <ToolSidebarClose onClick={handleClose} />
    </aside>
  );
}