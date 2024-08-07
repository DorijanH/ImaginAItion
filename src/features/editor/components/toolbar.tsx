import { BsBorderWidth } from 'react-icons/bs';
import { ArrowDown, ArrowUp } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import Hint from '@/components/hint';

import { ActiveTool, Editor } from '../types';

type ToolbarProps = {
  editor: Editor | undefined;
  activeTool: ActiveTool;
  onChangeActiveTool: (tool: ActiveTool) => void;
};

export default function Toolbar(props: ToolbarProps) {
  const {
    editor,
    activeTool,
    onChangeActiveTool
  } = props;

  const isAnySelected = !!editor?.selectedObjects.length;

  // If there isn't anything selected, show the empty toolbar
  if (!isAnySelected) {
    return <div className="z-[49] flex h-[56px] w-full shrink-0 items-center gap-x-2 overflow-x-auto border-b bg-white p-2" />;
  }

  const fillColor = editor?.getActiveFillColor();
  const strokeColor = editor?.getActiveStrokeColor();

  /**
   * Handles the bring forward action.
   */
  const handleBringForward = () => {
    editor?.bringForward();
  };

  /**
   * Handles the send backwards action.
   */
  const handleSendBackwards = () => {
    editor?.sendBackwards();
  };

  return (
    <div className="z-[49] flex h-[56px] w-full shrink-0 overflow-x-auto border-b bg-white p-2">
      <div className="flex h-full items-center justify-center gap-x-2">
        <Hint
          label="Color"
          side="bottom"
          sideOffset={5}
        >
          <Button
            size="icon"
            variant="ghost"
            onClick={() => onChangeActiveTool('fill')}
            className={cn(activeTool === 'fill' && 'bg-gray-100')}
          >
            <div className="size-4 rounded-sm border" style={{ backgroundColor: fillColor }} />
          </Button>
        </Hint>

        <Hint
          side="bottom"
          sideOffset={5}
          label="Stroke color"
        >
          <Button
            size="icon"
            variant="ghost"
            onClick={() => onChangeActiveTool('stroke-color')}
            className={cn(activeTool === 'stroke-color' && 'bg-gray-100')}
          >
            <div className="size-4 rounded-sm border-2 bg-white" style={{ borderColor: strokeColor }} />
          </Button>
        </Hint>

        <Hint
          side="bottom"
          sideOffset={5}
          label="Stroke options"
        >
          <Button
            size="icon"
            variant="ghost"
            onClick={() => onChangeActiveTool('stroke-width')}
            className={cn(activeTool === 'stroke-width' && 'bg-gray-100')}
          >
            <BsBorderWidth className="size-4" />
          </Button>
        </Hint>

        <Hint
          side="bottom"
          sideOffset={5}
          label="Bring forward"
        >
          <Button
            size="icon"
            variant="ghost"
            onClick={handleBringForward}
          >
            <ArrowUp className="size-4" />
          </Button>
        </Hint>

        <Hint
          side="bottom"
          sideOffset={5}
          label="Send backwards"
        >
          <Button
            size="icon"
            variant="ghost"
            onClick={handleSendBackwards}
          >
            <ArrowDown className="size-4" />
          </Button>
        </Hint>
      </div>
    </div>
  );
}