import { useEvent } from 'react-use';
import { fabric } from 'fabric';

type UseHotkeysProps = {
  canvas: fabric.Canvas | null;
  undo: () => void;
  redo: () => void;
  save: (skip?: boolean) => void;
  copy: () => void;
  paste: () => void;
}

export function useHotkeys(props: UseHotkeysProps) {
  const {
    canvas,
    undo,
    redo,
    save,
    copy,
    paste
  } = props;

  /**
   * Handles the keydown event.
   */
  const handleKeydown = (event: any) => {
    const isInput = ['INPUT', 'TEXTAREA'].includes((event.target as HTMLElement).tagName);
    if (isInput) return;

    const isCtrlKey = event.ctrlKey || event.metaKey;
    const isDelete = ['Backspace', 'Delete'].includes(event.key);

    if (isDelete) {
      canvas?.remove(...canvas?.getActiveObjects());
      canvas?.discardActiveObject();
    }

    if (isCtrlKey) {
      event.preventDefault();

      switch (event.key) {
      case 'z':
        undo();
        break;
      case 'y':
        redo();
        break;
      case 'c':
        copy();
        break;
      case 'v':
        paste();
        break;
      case 's':
        // Skip saving to the history
        save(true);
        break;
      case 'a':
        canvas?.discardActiveObject();

        const allSelectableObjects = canvas?.getObjects().filter((object) => object.selectable);
        canvas?.setActiveObject(new fabric.ActiveSelection(allSelectableObjects, { canvas }));

        canvas?.renderAll();
      }
    }
  };

  useEvent('keydown', handleKeydown);
}