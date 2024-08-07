import { RxTransparencyGrid } from 'react-icons/rx';
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
        <ToolbarButton
          label="Color"
          onClick={() => onChangeActiveTool('fill')}
          className={cn(activeTool === 'fill' && 'bg-gray-100')}
        >
          <div className="size-4 rounded-sm border" style={{ backgroundColor: fillColor }} />
        </ToolbarButton>

        <ToolbarButton
          label="Stroke color"
          onClick={() => onChangeActiveTool('stroke-color')}
          className={cn(activeTool === 'stroke-color' && 'bg-gray-100')}
        >
          <div className="size-4 rounded-sm border-2 bg-white" style={{ borderColor: strokeColor }} />
        </ToolbarButton>

        <ToolbarButton
          label="Stroke options"
          onClick={() => onChangeActiveTool('stroke-width')}
          className={cn(activeTool === 'stroke-width' && 'bg-gray-100')}
        >
          <BsBorderWidth className="size-4" />
        </ToolbarButton>

        <ToolbarButton label="Bring forward" onClick={handleBringForward}>
          <ArrowUp className="size-4" />
        </ToolbarButton>

        <ToolbarButton label="Send backwards" onClick={handleSendBackwards}>
          <ArrowDown className="size-4" />
        </ToolbarButton>

        <ToolbarButton
          label="Opacity"
          onClick={() => onChangeActiveTool('opacity')}
          className={cn(activeTool === 'opacity' && 'bg-gray-100')}
        >
          <RxTransparencyGrid className="size-4" />
        </ToolbarButton>
      </div>
    </div>
  );
}

type ToolbarButtonProps = {
  label: string;
  className?: string;
  onClick: () => void;
  children: React.ReactNode;
};

function ToolbarButton(props: ToolbarButtonProps) {
  const {
    label,
    onClick,
    children,
    className
  } = props;

  return (
    <Hint
      side="bottom"
      label={label}
      sideOffset={5}
    >
      <Button
        size="icon"
        variant="ghost"
        onClick={onClick}
        className={className}
      >
        {children}
      </Button>
    </Hint>
  );
}