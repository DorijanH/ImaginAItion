import { RxTransparencyGrid } from 'react-icons/rx';
import { BsBorderWidth } from 'react-icons/bs';
import { ArrowDown, ArrowUp, ChevronDown } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button, ButtonProps } from '@/components/ui/button';
import Hint from '@/components/hint';

import { ActiveTool, Editor } from '../types';
import { isTextType } from '../helpers';

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

  const selectedObjectType = editor?.selectedObjects[0]?.type;
  const isText = isTextType(selectedObjectType);

  const fillColor = editor?.getActiveFillColor();
  const strokeColor = editor?.getActiveStrokeColor();
  const fontFamily = editor?.getActiveFontFamily();

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

        {!isText && (
          <>
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
          </>
        )}

        {isText && (
          <>
            <ToolbarButton
              size="sm"
              label="Font"
              onClick={() => onChangeActiveTool('font')}
              className={cn(activeTool === 'font' && 'bg-gray-100')}
            >
              <div className="max-w-[100px] truncate">
                {fontFamily}
              </div>
              <ChevronDown className="ml-2 size-4 shrink-0" />
            </ToolbarButton>
          </>
        )}

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
  size?: ButtonProps['size'];
  children: React.ReactNode;
};

function ToolbarButton(props: ToolbarButtonProps) {
  const {
    label,
    onClick,
    children,
    className,
    size = 'icon'
  } = props;

  return (
    <Hint
      side="bottom"
      label={label}
      sideOffset={5}
    >
      <Button
        size={size}
        variant="ghost"
        onClick={onClick}
        className={className}
      >
        {children}
      </Button>
    </Hint>
  );
}