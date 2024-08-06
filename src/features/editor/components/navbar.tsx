'use client';

import { CiFileOn } from 'react-icons/ci';
import { BsCloudCheck } from 'react-icons/bs';
import { ChevronDown, Download, MousePointerClick, Redo2, Undo2 } from 'lucide-react';

import { Separator } from '@/components/ui/separator';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import Hint from '@/components/hint';

import Logo from './logo';

export default function Navbar() {
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
              className="flex items-center gap-x-2"
              onClick={() => console.log('OPEN A FILE')}
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

        <Hint
          side="bottom"
          label="Select"
          sideOffset={10}
        >
          <Button
            size="icon"
            variant="ghost"
            onClick={() => console.log('ON SELECT CLICK')}
          >
            <MousePointerClick className="size-4" />
          </Button>
        </Hint>

        <Hint
          label="Undo"
          side="bottom"
          sideOffset={10}
        >
          <Button
            size="icon"
            variant="ghost"
            onClick={() => console.log('ON UNDO CLICK')}
          >
            <Undo2 className="size-4" />
          </Button>
        </Hint>

        <Hint
          label="Redo"
          side="bottom"
          sideOffset={10}
        >
          <Button
            size="icon"
            variant="ghost"
            onClick={() => console.log('ON REDO CLICK')}
          >
            <Redo2 className="size-4" />
          </Button>
        </Hint>

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
                className="flex items-center gap-x-2"
                onClick={() => console.log('EXPORT JSON')}
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
                className="flex items-center gap-x-2"
                onClick={() => console.log('EXPORT PNG')}
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
                className="flex items-center gap-x-2"
                onClick={() => console.log('EXPORT JPG')}
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
                className="flex items-center gap-x-2"
                onClick={() => console.log('EXPORT SVG')}
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

          {/* TODO: Add user-button */}
        </div>
      </div>
    </nav>
  );
}