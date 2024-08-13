import { useEffect, useMemo, useState } from 'react';

import { cn } from '@/lib/utils';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

import ColorPicker from '../color-picker';
import { ActiveTool, Editor } from '../../types';
import { getWorkspace } from '../../helpers';
import ToolSidebarHeader from './tool-sidebar-header';
import ToolSidebarClose from './tool-sidebar-close';

type SettingsSidebarProps = {
  editor: Editor | undefined;
  activeTool: ActiveTool;
  onChangeActiveTool: (too: ActiveTool) => void;
}

export default function SettingsSidebar(props: SettingsSidebarProps) {
  const {
    editor,
    activeTool,
    onChangeActiveTool
  } = props;

  const workspace = editor ? getWorkspace(editor.canvas) : null;

  const initialWidth = useMemo(() => `${workspace?.width ?? 0}`, [workspace]);
  const initialHeight = useMemo(() => `${workspace?.height ?? 0}`, [workspace]);
  const initialBackground = useMemo(() => workspace?.fill ?? '#ffffff', [workspace]);

  const [width, setWidth] = useState(initialWidth);
  const [height, setHeight] = useState(initialHeight);
  const [background, setBackground] = useState(initialBackground);

  useEffect(() => {
    setWidth(initialWidth);
    setHeight(initialHeight);
    setBackground(initialBackground);
  }, [initialWidth, initialHeight, initialBackground]);

  /**
   * Handles the close action.
   */
  const handleClose = () => {
    onChangeActiveTool('select');
  };

  /**
   * Handles the width change action.
   */
  const handleWidthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setWidth(e.target.value);
  };

  /**
   * Handles the height change action.
   */
  const handleHeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setHeight(e.target.value);
  };

  /**
   * Handles the background change action.
   */
  const handleBackgroundChange = (value: string) => {
    setBackground(value);

    editor?.changeBackground(value);
  };

  /**
   * Handles the form submit action.
   */
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    editor?.changeSize({
      width: parseInt(width, 10),
      height: parseInt(height, 10)
    });
  };

  return (
    <aside
      className={cn('relative z-40 flex h-full w-[360px] flex-col border-r bg-white',
        activeTool === 'settings' ? 'visible' : 'hidden'
      )}
    >
      <ToolSidebarHeader title="Settings" description="Change the look of your workspace" />

      <ScrollArea>
        <form className="space-y-4 p-4" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <Label>
              Height
            </Label>

            <Input
              min={1}
              type="number"
              value={height}
              placeholder="Height"
              onChange={handleHeightChange}
            />
          </div>

          <div className="space-y-2">
            <Label>
              Width
            </Label>

            <Input
              min={1}
              type="number"
              value={width}
              placeholder="Width"
              onChange={handleWidthChange}
            />
          </div>
          <Button type="submit" className="w-full">
            Resize
          </Button>
        </form>

        <div className="p-4">
          <ColorPicker value={background as string} onChange={handleBackgroundChange} />
        </div>
      </ScrollArea>

      <ToolSidebarClose onClick={handleClose} />
    </aside>
  );
}