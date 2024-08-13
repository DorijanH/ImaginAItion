import { useCallback, useRef, useState } from 'react';

import { JSON_PROPERTY_KEYS } from '../constants';

type UseHistoryProps = {
  canvas: fabric.Canvas | null;
}

export function useHistory(props: UseHistoryProps) {
  const {
    canvas
  } = props;

  const [historyIndex, setHistoryIndex] = useState<number>(0);
  const canvasHistory = useRef<string[]>([]);
  const skipSave = useRef<boolean>(false);

  const canUndo = useCallback(() => historyIndex > 0, [historyIndex]);
  const canRedo = useCallback(() => historyIndex < canvasHistory.current.length - 1, [historyIndex]);

  const handleSave = useCallback((skip = false) => {
    if (!canvas) return;

    const currentState = canvas.toJSON(JSON_PROPERTY_KEYS);
    const currentStateJson = JSON.stringify(currentState);

    if (!skip && !skipSave.current) {
      canvasHistory.current.push(currentStateJson);
      setHistoryIndex(canvasHistory.current.length - 1);
    }

    // TODO: Save callback to the database (autosave feature)
  }, [canvas]);

  const handleUndo = useCallback(() => {
    if (canUndo()) {
      skipSave.current = true;

      canvas?.clear();
      canvas?.renderAll();

      const previousIndex = historyIndex - 1;
      const previousState = JSON.parse(canvasHistory.current[previousIndex]);

      canvas?.loadFromJSON(previousState, () => {
        canvas?.renderAll();

        setHistoryIndex(previousIndex);
        skipSave.current = false;
      });
    }
  }, [canUndo, canvas, historyIndex]);

  const handleRedo = useCallback(() => {
    if (canRedo()) {
      skipSave.current = true;

      canvas?.clear();
      canvas?.renderAll();

      const nextIndex = historyIndex + 1;
      const nextState = JSON.parse(canvasHistory.current[nextIndex]);

      canvas?.loadFromJSON(nextState, () => {
        canvas?.renderAll();

        setHistoryIndex(nextIndex);
        skipSave.current = false;
      });
    }
  }, [canRedo, canvas, historyIndex]);

  return {
    canUndo,
    canRedo,
    undo: handleUndo,
    redo: handleRedo,
    save: handleSave,
    setHistoryIndex,
    canvasHistory
  };
}