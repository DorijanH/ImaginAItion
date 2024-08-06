'use client';

import { Image, LayoutTemplate, LucideIcon, Settings, Shapes, Sparkles, Type } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

import { ActiveTool } from '../types';

type SidebarProps = {
  activeTool: ActiveTool;
  onChangeActiveTool: (tool: ActiveTool) => void;
}

export default function Sidebar(props: SidebarProps) {
  const {
    activeTool,
    onChangeActiveTool
  } = props;

  return (
    <aside className="flex h-full w-[100px] flex-col overflow-y-auto border-r bg-white">
      <ul className="flex flex-col">
        <SidebarItem
          label="Design"
          icon={LayoutTemplate}
          isActive={activeTool === 'templates'}
          onClick={() => onChangeActiveTool('templates')}
        />

        <SidebarItem
          label="Image"
          icon={Image}
          isActive={activeTool === 'images'}
          onClick={() => onChangeActiveTool('images')}
        />

        <SidebarItem
          label="Text"
          icon={Type}
          isActive={activeTool === 'text'}
          onClick={() => onChangeActiveTool('text')}
        />

        <SidebarItem
          label="Shapes"
          icon={Shapes}
          isActive={activeTool === 'shapes'}
          onClick={() => onChangeActiveTool('shapes')}
        />

        <SidebarItem
          label="AI"
          icon={Sparkles}
          isActive={activeTool === 'ai'}
          onClick={() => onChangeActiveTool('ai')}
        />

        <SidebarItem
          label="Settings"
          icon={Settings}
          isActive={activeTool === 'settings'}
          onClick={() => onChangeActiveTool('settings')}
        />
      </ul>
    </aside>
  );
}

type SidebarItemProps = {
  icon: LucideIcon;
  label: string;
  isActive?: boolean;
  onClick: () => void;
};

export function SidebarItem(props: SidebarItemProps) {
  const {
    icon: Icon,
    label,
    isActive,
    onClick
  } = props;

  return (
    <Button
      variant="ghost"
      onClick={onClick}
      className={cn(
        'flex aspect-video size-full flex-col rounded-none p-3 py-4',
        isActive && 'bg-muted text-primary'
      )}
    >
      <Icon className="size-5 shrink-0 stroke-2" />
      <span className="mt-2 text-xs">
        {label}
      </span>
    </Button>
  );
}