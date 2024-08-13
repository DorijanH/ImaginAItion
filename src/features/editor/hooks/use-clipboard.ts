import { useCallback, useRef } from 'react';

type UseClipboardProps = {
  canvas: fabric.Canvas | null;
}

export function useClipboard({ canvas }: UseClipboardProps) {
  const clipboard = useRef<any>(null);

  const handleCopy = useCallback(() => {
    canvas?.getActiveObject()?.clone((cloned: any) => clipboard.current = cloned);
  }, [canvas]);

  const handlePaste = useCallback(() => {
    if (!clipboard.current) return;

    clipboard.current.clone((cloned: any) => {
      canvas?.discardActiveObject();

      cloned.set({
        left: cloned.left + 10,
        top: cloned.top + 10,
        evented: true
      });

      if (cloned.type === 'activeSelection') {
        cloned.canvas = canvas;

        cloned.forEachObject((object: any) => canvas?.add(object));
        cloned.setCoords();
      } else {
        canvas?.add(cloned);
      }

      clipboard.current.top += 10;
      clipboard.current.left += 10;

      canvas?.setActiveObject(cloned);
      canvas?.requestRenderAll();
    });
  }, [canvas]);

  return {
    copy: handleCopy,
    paste: handlePaste
  };
}