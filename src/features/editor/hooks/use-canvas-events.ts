import { Dispatch, SetStateAction, useEffect } from 'react';

type UseCanvasEventsProps = {
  canvas: fabric.Canvas | null;
  setSelectedObjects: Dispatch<SetStateAction<fabric.Object[]>>;
};

export function useCanvasEvents(props: UseCanvasEventsProps) {
  const {
    canvas,
    setSelectedObjects
  } = props;

  useEffect(() => {
    if (canvas) {
      canvas.on('selection:created', (e) => setSelectedObjects(e.selected ?? []));
      canvas.on('selection:updated', (e) => setSelectedObjects(e.selected ?? []));
      canvas.on('selection:cleared', () => setSelectedObjects([]));
    }

    return () => {
      if (canvas) {
        canvas.off('selection:created');
        canvas.off('selection:updated');
        canvas.off('selection:cleared');
      }
    };
  }, [canvas, setSelectedObjects]);
}