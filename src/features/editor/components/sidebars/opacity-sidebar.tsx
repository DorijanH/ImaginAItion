import { useEffect, useMemo, useState } from 'react';

import { cn } from '@/lib/utils';
import { Slider } from '@/components/ui/slider';
import { ScrollArea } from '@/components/ui/scroll-area';

import { ActiveTool, Editor } from '../../types';
import ToolSidebarHeader from './tool-sidebar-header';
import ToolSidebarClose from './tool-sidebar-close';

type OpacitySidebarProps = {
  editor: Editor | undefined;
  activeTool: ActiveTool;
  onChangeActiveTool: (too: ActiveTool) => void;
}

export default function OpacitySidebar(props: OpacitySidebarProps) {
  const {
    editor,
    activeTool,
    onChangeActiveTool
  } = props;

  const initialValue = editor?.getActiveOpacity() ?? 1;

  const [opacity, setOpacity] = useState<number>(initialValue);

  const selectedObject = useMemo(() => editor?.selectedObjects[0], [editor?.selectedObjects]);

  /**
   * Reset the opacity state when the selected object changes.
   */
  useEffect(() => {
    if (selectedObject) {
      setOpacity(selectedObject.get('opacity') || 1);
    }
  }, [selectedObject]);

  /**
   * Handles the close action.
   */
  const handleClose = () => {
    onChangeActiveTool('select');
  };

  /**
   * Handles the opacity change action.
   */
  const handleChange = (value: number) => {
    editor?.changeOpacity(value);
    setOpacity(value);
  };

  return (
    <aside
      className={cn('relative z-40 flex h-full w-[360px] flex-col border-r bg-white',
        activeTool === 'opacity' ? 'visible' : 'hidden'
      )}
    >
      <ToolSidebarHeader title="Opacity" description="Change the opacity of the selected element" />

      <ScrollArea>
        <div className="space-y-4 border-b p-4">
          <Slider
            max={1}
            min={0}
            step={0.01}
            value={[opacity]}
            onValueChange={(values) => handleChange(values[0])}
          />
        </div>
      </ScrollArea>

      <ToolSidebarClose onClick={handleClose} />
    </aside>
  );
}