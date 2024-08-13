import { TbColorFilter } from 'react-icons/tb';
import { RxTransparencyGrid } from 'react-icons/rx';
import { FaBold, FaItalic, FaStrikethrough, FaUnderline } from 'react-icons/fa';
import { BsBorderWidth } from 'react-icons/bs';
import { useState } from 'react';
import {
  AlignCenter,
  AlignLeft,
  AlignRight,
  ArrowDown,
  ArrowUp,
  ChevronDown,
  SquareSplitHorizontal,
  Trash
} from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button, ButtonProps } from '@/components/ui/button';
import Hint from '@/components/hint';

import { ActiveTool, Editor } from '../types';
import { isImageType, isTextType } from '../helpers';
import {
  FILL_COLOR,
  FONT_FAMILY,
  FONT_LINETHROUGH,
  FONT_SIZE,
  FONT_STYLE,
  FONT_UNDERLINE,
  FONT_WEIGHT,
  STROKE_COLOR,
  TEXT_ALIGN
} from '../constants';
import FontSizeInput from './font-size-input';

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

  const [properties, setProperties] = useState({
    fillColor: editor?.getActiveFillColor() ?? FILL_COLOR,
    strokeColor: editor?.getActiveStrokeColor() ?? STROKE_COLOR,
    fontFamily: editor?.getActiveFontFamily() ?? FONT_FAMILY,
    fontWeight: editor?.getActiveFontWeight() ?? FONT_WEIGHT,
    fontStyle: editor?.getActiveFontStyle() ?? FONT_STYLE,
    fontLinethrough: editor?.getActiveFontLinethrough() ?? FONT_LINETHROUGH,
    fontUnderline: editor?.getActiveFontUnderline() ?? FONT_UNDERLINE,
    textAlign: editor?.getActiveTextAlign() ?? TEXT_ALIGN,
    fontSize: editor?.getActiveFontSize() ?? FONT_SIZE
  });

  const isAnySelected = !!editor?.selectedObjects.length;

  // If there isn't anything selected, show the empty toolbar
  if (!isAnySelected) {
    return <div className="z-[49] flex h-[56px] w-full shrink-0 items-center gap-x-2 overflow-x-auto border-b bg-white p-2" />;
  }

  const selectedObject = editor?.selectedObjects[0];
  const selectedObjectType = selectedObject?.type;

  const isText = isTextType(selectedObjectType);
  const isImage = isImageType(selectedObjectType);

  const isBold = properties.fontWeight > 500;
  const isItalic = properties.fontStyle === 'italic';

  /**
   * Handles the delete action.
   */
  const handleDelete = () => {
    editor?.deleteSelected();
  };

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

  /**
   * Handles the toggle bold action.
   */
  const handleToggleBold = () => {
    const newValue = isBold ? 500 : 700;

    editor?.changeFontWeight(newValue);
    setProperties((prev) => ({
      ...prev,
      fontWeight: newValue
    }));
  };

  /**
   * Handles the toggle italic action.
   */
  const handleToggleItalic = () => {
    const newValue = isItalic ? 'normal' : 'italic';

    editor?.changeFontStyle(newValue);
    setProperties((prev) => ({
      ...prev,
      fontStyle: newValue
    }));
  };

  /**
   * Handles the toggle linethrough action.
   */
  const handleToggleLinethrough = () => {
    editor?.changeFontLinethrough(!properties.fontLinethrough);

    setProperties((prev) => ({
      ...prev,
      fontLinethrough: !prev.fontLinethrough
    }));
  };

  /**
   * Handles the toggle underline action.
   */
  const handleToggleUnderline = () => {
    editor?.changeFontUnderline(!properties.fontUnderline);

    setProperties((prev) => ({
      ...prev,
      fontUnderline: !prev.fontUnderline
    }));
  };

  /**
   * Handles the text align change action.
   */
  const handleTextAlignChange = (value: 'left' | 'center' | 'right') => {
    editor?.changeTextAlign(value);

    setProperties((prev) => ({
      ...prev,
      textAlign: value
    }));
  };

  /**
   * Handles the font size change action.
   */
  const handleFontSizeChange = (value: number) => {
    editor?.changeFontSize(value);

    setProperties((prev) => ({
      ...prev,
      fontSize: value
    }));
  };

  /**
   * Renders the toolbar actions based on the selected object's type.
   */
  const renderToolbarActions = () => {
    const shareableActions = (
      <>
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

        <ToolbarButton label="Delete" onClick={handleDelete}>
          <Trash className="size-4" />
        </ToolbarButton>
      </>
    );

    if (isText) {
      return (
        <>
          <ToolbarButton
            label="Color"
            onClick={() => onChangeActiveTool('fill')}
            className={cn(activeTool === 'fill' && 'bg-gray-100')}
          >
            <div className="size-4 rounded-sm border" style={{ backgroundColor: properties.fillColor }} />
          </ToolbarButton>

          <ToolbarButton
            size="sm"
            label="Font"
            onClick={() => onChangeActiveTool('font')}
            className={cn(activeTool === 'font' && 'bg-gray-100')}
          >
            <div className="max-w-[100px] truncate">
              {properties.fontFamily}
            </div>
            <ChevronDown className="ml-2 size-4 shrink-0" />
          </ToolbarButton>

          <ToolbarButton
            label="Bold"
            onClick={handleToggleBold}
            className={cn(isBold && 'bg-gray-100')}
          >
            <FaBold className="size-4" />
          </ToolbarButton>

          <ToolbarButton
            label="Italic"
            onClick={handleToggleItalic}
            className={cn(isItalic && 'bg-gray-100')}
          >
            <FaItalic className="size-4" />
          </ToolbarButton>

          <ToolbarButton
            label="Underline"
            onClick={handleToggleUnderline}
            className={cn(properties.fontUnderline && 'bg-gray-100')}
          >
            <FaUnderline className="size-4" />
          </ToolbarButton>

          <ToolbarButton
            label="Strike"
            onClick={handleToggleLinethrough}
            className={cn(properties.fontLinethrough && 'bg-gray-100')}
          >
            <FaStrikethrough className="size-4" />
          </ToolbarButton>

          <ToolbarButton
            label="Align left"
            onClick={() => handleTextAlignChange('left')}
            className={cn(properties.textAlign === 'left' && 'bg-gray-100')}
          >
            <AlignLeft className="size-4" />
          </ToolbarButton>

          <ToolbarButton
            label="Align center"
            onClick={() => handleTextAlignChange('center')}
            className={cn(properties.textAlign === 'center' && 'bg-gray-100')}
          >
            <AlignCenter className="size-4" />
          </ToolbarButton>

          <ToolbarButton
            label="Align right"
            onClick={() => handleTextAlignChange('right')}
            className={cn(properties.textAlign === 'right' && 'bg-gray-100')}
          >
            <AlignRight className="size-4" />
          </ToolbarButton>

          <FontSizeInput
            value={properties.fontSize}
            onChange={handleFontSizeChange}
          />

          {shareableActions}
        </>
      );
    }

    if (isImage) {
      return (
        <>
          <ToolbarButton
            label="Stroke color"
            onClick={() => onChangeActiveTool('stroke-color')}
            className={cn(activeTool === 'stroke-color' && 'bg-gray-100')}
          >
            <div className="size-4 rounded-sm border-2 bg-white" style={{ borderColor: properties.strokeColor }} />
          </ToolbarButton>

          <ToolbarButton
            label="Stroke options"
            onClick={() => onChangeActiveTool('stroke-width')}
            className={cn(activeTool === 'stroke-width' && 'bg-gray-100')}
          >
            <BsBorderWidth className="size-4" />
          </ToolbarButton>

          <ToolbarButton
            label="Filters"
            onClick={() => onChangeActiveTool('filter')}
            className={cn(activeTool === 'filter' && 'bg-gray-100')}
          >
            <TbColorFilter className="size-4" />
          </ToolbarButton>

          <ToolbarButton
            label="Remove background"
            onClick={() => onChangeActiveTool('remove-bg')}
            className={cn(activeTool === 'remove-bg' && 'bg-gray-100')}
          >
            <SquareSplitHorizontal className="size-4" />
          </ToolbarButton>

          {shareableActions}
        </>
      );
    }

    return (
      <>
        <ToolbarButton
          label="Color"
          onClick={() => onChangeActiveTool('fill')}
          className={cn(activeTool === 'fill' && 'bg-gray-100')}
        >
          <div className="size-4 rounded-sm border" style={{ backgroundColor: properties.fillColor }} />
        </ToolbarButton>

        <ToolbarButton
          label="Stroke color"
          onClick={() => onChangeActiveTool('stroke-color')}
          className={cn(activeTool === 'stroke-color' && 'bg-gray-100')}
        >
          <div className="size-4 rounded-sm border-2 bg-white" style={{ borderColor: properties.strokeColor }} />
        </ToolbarButton>

        <ToolbarButton
          label="Stroke options"
          onClick={() => onChangeActiveTool('stroke-width')}
          className={cn(activeTool === 'stroke-width' && 'bg-gray-100')}
        >
          <BsBorderWidth className="size-4" />
        </ToolbarButton>

        {shareableActions}
      </>
    );
  };

  return (
    <div className="z-[49] flex h-[56px] w-full shrink-0 overflow-x-auto border-b bg-white p-2">
      <div className="flex h-full items-center justify-center gap-x-2">
        {renderToolbarActions()}
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