import { IoTriangle } from 'react-icons/io5';
import { FaDiamond } from 'react-icons/fa6';
import { FaCircle, FaSquare, FaSquareFull } from 'react-icons/fa';
import { IconType } from 'react-icons';
import { LucideIcon } from 'lucide-react';

import { cn } from '@/lib/utils';
import { ScrollArea } from '@/components/ui/scroll-area';

import { ActiveTool, Editor } from '../types';
import ToolSidebarHeader from './tool-sidebar-header';
import ToolSidebarClose from './tool-sidebar-close';

type ShapeSidebarProps = {
  editor: Editor | undefined;
  activeTool: ActiveTool;
  onChangeActiveTool: (too: ActiveTool) => void;
}

export default function ShapeSidebar(props: ShapeSidebarProps) {
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

  return (
    <aside
      className={cn('relative z-40 flex h-full w-[360px] flex-col border-r bg-white',
        activeTool === 'shapes' ? 'visible' : 'hidden'
      )}
    >
      <ToolSidebarHeader title="Shapes" description="Add shapes to your canvas" />

      <ScrollArea>
        <div className="grid grid-cols-3 gap-4 p-4">
          <ShapeTool
            icon={FaCircle}
            onClick={() => editor?.addCircle()}
          />

          <ShapeTool
            icon={FaSquare}
            onClick={() => editor?.addSoftRectangle()}
          />

          <ShapeTool
            icon={FaSquareFull}
            onClick={() => editor?.addRectangle()}
          />

          <ShapeTool
            icon={IoTriangle}
            onClick={() => editor?.addTriangle()}
          />

          <ShapeTool
            icon={IoTriangle}
            iconClassName="rotate-180"
            onClick={() => editor?.addInverseTriangle()}
          />

          <ShapeTool
            icon={FaDiamond}
            onClick={() => editor?.addDiamond()}
          />
        </div>
      </ScrollArea>

      <ToolSidebarClose onClick={handleClose} />
    </aside>
  );
}

type ShapeToolProps = {
  onClick: () => void;
  icon: LucideIcon | IconType;
  iconClassName?: string;
};

export function ShapeTool(props: ShapeToolProps) {
  const {
    onClick,
    icon: Icon,
    iconClassName
  } = props;

  return (
    <button
      onClick={onClick}
      className="aspect-square rounded-md border p-5"
    >
      <Icon className={cn('size-full', iconClassName)} />
    </button>
  );
}