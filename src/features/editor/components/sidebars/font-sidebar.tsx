import { cn } from '@/lib/utils';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';

import { ActiveTool, Editor } from '../../types';
import { FONT_FAMILY, FONTS } from '../../constants';
import ToolSidebarHeader from './tool-sidebar-header';
import ToolSidebarClose from './tool-sidebar-close';

type FontSidebarProps = {
  editor: Editor | undefined;
  activeTool: ActiveTool;
  onChangeActiveTool: (too: ActiveTool) => void;
}

export default function FontSidebar(props: FontSidebarProps) {
  const {
    editor,
    activeTool,
    onChangeActiveTool
  } = props;

  const value = editor?.getActiveFontFamily() ?? FONT_FAMILY;

  /**
   * Handles the close action.
   */
  const handleClose = () => {
    onChangeActiveTool('select');
  };

  /**
   * Handles the font change action.
   */
  const handleFontChange = (value: string) => {
    editor?.changeFontFamily(value);
  };

  return (
    <aside
      className={cn('relative z-40 flex h-full w-[360px] flex-col border-r bg-white',
        activeTool === 'font' ? 'visible' : 'hidden'
      )}
    >
      <ToolSidebarHeader title="Font" description="Change the text font" />

      <ScrollArea>
        <div className="space-y-2 border-b p-4">
          {FONTS.map((font) => (
            <Button
              size="lg"
              key={font}
              variant="secondary"
              style={{ fontFamily: font }}
              onClick={() => handleFontChange(font)}
              className={cn(
                'h-16 w-full justify-start px-4 py-2 text-base',
                value === font && 'border-2 border-blue-500'
              )}
            >
              {font}
            </Button>
          ))}
        </div>
      </ScrollArea>

      <ToolSidebarClose onClick={handleClose} />
    </aside>
  );
}