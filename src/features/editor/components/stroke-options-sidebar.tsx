import { cn } from '@/lib/utils';
import { Slider } from '@/components/ui/slider';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';

import { ActiveTool, Editor } from '../types';
import { STROKE_DASH_ARRAY, STROKE_WIDTH } from '../constants';
import ToolSidebarHeader from './tool-sidebar-header';
import ToolSidebarClose from './tool-sidebar-close';

type StrokeOptionsSidebarProps = {
  editor: Editor | undefined;
  activeTool: ActiveTool;
  onChangeActiveTool: (too: ActiveTool) => void;
}

export default function StrokeOptionsSidebar(props: StrokeOptionsSidebarProps) {
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
   * Handles the stroke width change action.
   */
  const handleStrokeWidthChange = (value: number) => {
    editor?.changeStrokeWidth(value);
  };

  /**
   * Handles the stroke dash array change action.
   */
  const handleStrokeDashArrayChange = (value: number[]) => {
    editor?.changeStrokeDashArray(value);
  };

  const strokeWidthValue = editor?.getActiveStrokeWidth() ?? STROKE_WIDTH;
  const strokeDashArrayValue = editor?.getActiveStrokeDashArray() ?? STROKE_DASH_ARRAY;

  return (
    <aside
      className={cn('relative z-40 flex h-full w-[360px] flex-col border-r bg-white',
        activeTool === 'stroke-width' ? 'visible' : 'hidden'
      )}
    >
      <ToolSidebarHeader title="Stroke options" description="Modify the stroke of your element" />

      <ScrollArea>
        <SidebarItem label="Stroke width">
          <Slider value={[strokeWidthValue]} onValueChange={(values) => handleStrokeWidthChange(values[0])} />
        </SidebarItem>

        <SidebarItem label="Stroke type">
          <Button
            size="lg"
            variant="secondary"
            onClick={() => handleStrokeDashArrayChange([])}
            className={cn(
              'h-16 w-full justify-start px-4 py-2 text-left',
              !strokeDashArrayValue.length && 'border border-blue-500'
            )}
          >
            <div className="w-full rounded-full border-4 border-black" />
          </Button>
          <Button
            size="lg"
            variant="secondary"
            onClick={() => handleStrokeDashArrayChange([5, 5])}
            className={cn(
              'h-16 w-full justify-start px-4 py-2 text-left',
              JSON.stringify(strokeDashArrayValue) === '[5,5]' && 'border border-blue-500'
            )}
          >
            <div className="w-full rounded-full border-4 border-dashed border-black" />
          </Button>
        </SidebarItem>
      </ScrollArea>

      <ToolSidebarClose onClick={handleClose} />
    </aside>
  );
}

type SidebarItemProps = {
  label: string;
  children: React.ReactNode;
}

function SidebarItem(props: SidebarItemProps) {
  const {
    label,
    children
  } = props;

  return (
    <div className="space-y-4 border-b p-4">
      <Label>
        {label}
      </Label>

      {children}
    </div>
  );
}