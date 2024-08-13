import { cn } from '@/lib/utils';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';

import { ActiveTool, Editor, Filter } from '../../types';
import { FILTERS  } from '../../constants';
import ToolSidebarHeader from './tool-sidebar-header';
import ToolSidebarClose from './tool-sidebar-close';

type FilterSidebarProps = {
  editor: Editor | undefined;
  activeTool: ActiveTool;
  onChangeActiveTool: (too: ActiveTool) => void;
}

export default function FilterSidebar(props: FilterSidebarProps) {
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
   * Handles the image filter change action.
   */
  const handleFilterChange = (value: Filter) => {
    editor?.changeImageFilter(value);
  };

  return (
    <aside
      className={cn('relative z-40 flex h-full w-[360px] flex-col border-r bg-white',
        activeTool === 'filter' ? 'visible' : 'hidden'
      )}
    >
      <ToolSidebarHeader title="Filters" description="Apply a filter to selected image" />

      <ScrollArea>
        <div className="space-y-2 border-b p-4">
          {FILTERS.map((filter) => (
            <Button
              size="lg"
              key={filter}
              variant="secondary"
              className="h-16 w-full justify-start"
              onClick={() => handleFilterChange(filter)}
            >
              {filter}
            </Button>
          ))}
        </div>
      </ScrollArea>

      <ToolSidebarClose onClick={handleClose} />
    </aside>
  );
}