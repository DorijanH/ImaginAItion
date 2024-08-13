import { Dispatch, SetStateAction, useEffect } from 'react';

type UseCanvasEventsProps = {
  save: () => void;
  canvas: fabric.Canvas | null;
  setSelectedObjects: Dispatch<SetStateAction<fabric.Object[]>>;
  clearSelectionCallback?: () => void;
};

export function useCanvasEvents(props: UseCanvasEventsProps) {
  const {
    save,
    canvas,
    setSelectedObjects,
    clearSelectionCallback
  } = props;

  useEffect(() => {
    if (canvas) {
      canvas.on('object:added', () => save());
      canvas.on('object:removed', () => save());
      canvas.on('object:modified', () => save());

      canvas.on('selection:created', (e) => setSelectedObjects(e.selected ?? []));
      canvas.on('selection:updated', (e) => setSelectedObjects(e.selected ?? []));
      canvas.on('selection:cleared', () => {
        setSelectedObjects([]);
        clearSelectionCallback?.();
      });
    }

    return () => {
      if (canvas) {
        canvas.off('object:added');
        canvas.off('object:removed');
        canvas.off('object:modified');

        canvas.off('selection:created');
        canvas.off('selection:updated');
        canvas.off('selection:cleared');
      }
    };
  }, [canvas, clearSelectionCallback, save, setSelectedObjects]);
}