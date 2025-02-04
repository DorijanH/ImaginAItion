'use client';

import { useFilePicker } from 'use-file-picker';
import { CiFileOn } from 'react-icons/ci';
import { BsCloudCheck } from 'react-icons/bs';
import { ChevronDown, Download, MousePointerClick, Redo2, Undo2 } from 'lucide-react';

import { cn } from '@/lib/utils';
import UserButton from '@/features/auth/components/user-button';
import { Separator } from '@/components/ui/separator';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import Hint from '@/components/hint';

import { ActiveTool, Editor } from '../types';
import Logo from './logo';

type NavbarProps = {
  editor: Editor | undefined;
  activeTool: ActiveTool;
  onChangeActiveTool: (tool: ActiveTool) => void;
}

export default function Navbar(props: NavbarProps) {
  const {
    editor,
    activeTool,
    onChangeActiveTool
  } = props;

  const { openFilePicker } = useFilePicker({
    accept: '.json',
    onFilesSuccessfullySelected: ({ plainFiles }: any) => {
      if (plainFiles && plainFiles.length > 0) {
        const file = plainFiles[0];
        const reader = new FileReader();

        reader.readAsText(file, 'UTF-8');
        reader.onload = () => {
          editor?.loadJson(reader.result as string);
        };
      }
    }
  });

  /**
   * Handles the undo action.
   */
  const handleUndo = () => {
    editor?.undo();
  };

  /**
   * Handles the redo action.
   */
  const handleRedo = () => {
    editor?.redo();
  };

  /**
   * Handles the JSON export action.
   */
  const handleExportJson = () => {
    editor?.saveJson();
  };

  /**
   * Handles the PNG export action.
   */
  const handleExportPng = () => {
    editor?.savePng();
  };

  /**
   * Handles the JPG export action.
   */
  const handleExportJpg = () => {
    editor?.saveJpg();
  };

  /**
   * Handles the SVG export action.
   */
  const handleExportSvg = () => {
    editor?.saveSvg();
  };

  return (
    <nav className="flex h-[68px] w-full items-center gap-x-8 border-b p-4 lg:pl-[34px]">
      <Logo />

      <div className="flex size-full items-center gap-x-1">
        <DropdownMenu modal={false}>
          <DropdownMenuTrigger asChild>
            <Button size="sm" variant="ghost">
              File
              <ChevronDown className="ml-2 size-4" />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="start" className="min-w-60">
            <DropdownMenuItem
              onClick={openFilePicker}
              className="flex items-center gap-x-2"
            >
              <CiFileOn className="size-8" />

              <div>
                <p>Open</p>
                <p className="text-xs text-muted-foreground">
                  Open a JSON file
                </p>
              </div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <Separator orientation="vertical" className="mx-2" />

        <NavbarButton
          label="Select"
          onClick={() => onChangeActiveTool('select')}
          className={cn(activeTool === 'select' && 'bg-gray-100')}
        >
          <MousePointerClick className="size-4" />
        </NavbarButton>

        <NavbarButton
          label="Undo"
          onClick={handleUndo}
          disabled={!editor?.canUndo()}
        >
          <Undo2 className="size-4" />
        </NavbarButton>

        <NavbarButton
          label="Redo"
          onClick={handleRedo}
          disabled={!editor?.canRedo()}
        >
          <Redo2 className="size-4" />
        </NavbarButton>

        <Separator orientation="vertical" className="mx-2" />

        {/* Placeholder for now */}
        <div className="flex items-center gap-x-2">
          <BsCloudCheck className="size-[20px] text-muted-foreground" />

          <p className="text-xs text-muted-foreground">
            Saved
          </p>
        </div>

        <div className="ml-auto flex items-center gap-x-4">
          <DropdownMenu modal={false}>
            <DropdownMenuTrigger asChild>
              <Button size="sm" variant="ghost">
                Export
                <Download className="ml-4 size-4" />
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end" className="min-w-60">
              <DropdownMenuItem
                onClick={handleExportJson}
                className="flex items-center gap-x-2"
              >
                <CiFileOn className="size-8" />

                <div>
                  <p>JSON</p>
                  <p className="text-xs text-muted-foreground">
                    Save for later editing
                  </p>
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={handleExportPng}
                className="flex items-center gap-x-2"
              >
                <CiFileOn className="size-8" />

                <div>
                  <p>PNG</p>
                  <p className="text-xs text-muted-foreground">
                    Best for sharing on the web
                  </p>
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={handleExportJpg}
                className="flex items-center gap-x-2"
              >
                <CiFileOn className="size-8" />

                <div>
                  <p>JPG</p>
                  <p className="text-xs text-muted-foreground">
                    Best for printing
                  </p>
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={handleExportSvg}
                className="flex items-center gap-x-2"
              >
                <CiFileOn className="size-8" />

                <div>
                  <p>SVG</p>
                  <p className="text-xs text-muted-foreground">
                    Best for editing in vector software
                  </p>
                </div>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <UserButton />
        </div>
      </div>
    </nav>
  );
}

type NavbarButtonProps = {
  label: string;
  disabled?: boolean;
  className?: string;
  onClick: () => void;
  children: React.ReactNode;
}

function NavbarButton(props: NavbarButtonProps) {
  const {
    label,
    disabled,
    onClick,
    children,
    className
  } = props;

  return (
    <Hint
      side="bottom"
      label={label}
      sideOffset={10}
    >
      <Button
        size="icon"
        variant="ghost"
        onClick={onClick}
        disabled={disabled}
        className={className}
      >
        {children}
      </Button>
    </Hint>
  );
}