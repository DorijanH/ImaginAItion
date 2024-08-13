import { Minimize, ZoomIn, ZoomOut } from 'lucide-react';

import { Button } from '@/components/ui/button';
import Hint from '@/components/hint';

import { Editor } from '../types';

type FooterProps = {
  editor: Editor | undefined;
}

export default function Footer({ editor }: FooterProps) {
  /**
   * Handles the reset action.
   */
  const handleReset = () => {
    editor?.autoZoom();
  };

  /**
   * Handles the zoom in action.
   */
  const handleZoomIn = () => {
    editor?.zoomIn();
  };

  /**
   * Handles the zoom out action.
   */
  const handleZoomOut = () => {
    editor?.zoomOut();
  };

  return (
    <footer className="z-[49] flex h-[52px] w-full shrink-0 flex-row-reverse items-center gap-x-1 overflow-x-auto border-t bg-white p-2 px-4">
      <FooterButton label="Reset" onClick={handleReset}>
        <Minimize className="size-4" />
      </FooterButton>

      <FooterButton label="Zoom in" onClick={handleZoomIn}>
        <ZoomIn className="size-4" />
      </FooterButton>

      <FooterButton label="Zoom out" onClick={handleZoomOut}>
        <ZoomOut className="size-4" />
      </FooterButton>
    </footer>
  );
}

type FooterButtonProps = {
  label: string;
  onClick: () => void;
  children: React.ReactNode;
}

function FooterButton(props: FooterButtonProps) {
  const {
    label,
    onClick,
    children
  } = props;

  return (
    <Hint
      side="top"
      label={label}
      sideOffset={10}
    >
      <Button
        size="icon"
        variant="ghost"
        onClick={onClick}
        className="h-full"
      >
        {children}
      </Button>
    </Hint>
  );
}