import { useCallback, useMemo, useState } from 'react';
import { fabric } from 'fabric';

import { BuildEditorProps, Editor } from '../types';
import { addToCanvas } from '../helpers';
import {
  CIRCLE_OPTIONS,
  DIAMOND_OPTIONS,
  RECTANGLE_OPTIONS,
  TRIANGLE_OPTIONS,
  WORKSPACE_NAME
} from '../constants';
import { useAutoResize } from './use-auto-resize';

const buildEditor = (props: BuildEditorProps): Editor => {
  const {
    canvas
  } = props;

  /**
   * Adds the circle to the canvas.
   */
  const addCircle = () => {
    const circle = new fabric.Circle({ ...CIRCLE_OPTIONS });

    addToCanvas(canvas, circle);
  };

  /**
   * Adds the soft rectangle to the canvas.
   */
  const addSoftRectangle = () => {
    const softRectangle = new fabric.Rect({
      ...RECTANGLE_OPTIONS,
      rx: 50,
      ry: 50
    });

    addToCanvas(canvas, softRectangle);
  };

  /**
   * Adds the rectangle to the canvas.
   */
  const addRectangle = () => {
    const rectangle = new fabric.Rect({ ...RECTANGLE_OPTIONS });

    addToCanvas(canvas, rectangle);
  };

  /**
   * Adds the triangle to the canvas.
   */
  const addTriangle = () => {
    const triangle = new fabric.Triangle({ ...TRIANGLE_OPTIONS });

    addToCanvas(canvas, triangle);
  };

  /**
   * Adds the inverse triangle to the canvas.
   */
  const addInverseTriangle = () => {
    const options = TRIANGLE_OPTIONS;

    const inverseTriangle = new fabric.Polygon(
      [
        { x: 0, y: 0 },
        { x: options.width, y: 0 },
        { x: options.width / 2, y: options.height }
      ],
      {
        ...options
      }
    );

    addToCanvas(canvas, inverseTriangle);
  };

  /**
   * Adds the diamond to the canvas.
   */
  const addDiamond = () => {
    const options = DIAMOND_OPTIONS;

    const diamond = new fabric.Polygon(
      [
        { x: options.width / 2, y: 0 },
        { x: options.width, y: options.height / 2 },
        { x: options.width / 2, y: options.height },
        { x: 0, y: options.height / 2 }
      ],
      {
        ...options
      }
    );

    addToCanvas(canvas, diamond);
  };

  return {
    addCircle,
    addSoftRectangle,
    addRectangle,
    addTriangle,
    addInverseTriangle,
    addDiamond
  };
};

export function useEditor() {
  const [canvas, setCanvas] = useState<fabric.Canvas | null>(null);
  const [container, setContainer] = useState<HTMLDivElement | null>(null);

  useAutoResize({ canvas, container });

  const editor = useMemo(() => {
    if (canvas) {
      return buildEditor({ canvas });
    }

    return undefined;
  }, [canvas]);

  const init = useCallback(({ initialCanvas, initialContainer }: { initialCanvas: fabric.Canvas; initialContainer: HTMLDivElement }) => {
    fabric.Object.prototype.set({
      cornerColor: '#FFF',
      cornerStyle: 'circle',
      borderColor: '#3b82f6',
      borderScaleFactor: 1.5,
      transparentCorners: false,
      borderOpacityWhenMoving: 1,
      cornerStrokeColor: '#3b82f6'
    });

    const initialWorkspace = new fabric.Rect({
      width: 900,
      height: 1200,
      name: WORKSPACE_NAME,
      fill: 'white',
      selectable: false,
      hasControls: false,
      shadow: new fabric.Shadow({
        color: 'rgba(0, 0, 0, 0.8)',
        blur: 5
      })
    });

    initialCanvas.setWidth(initialContainer.offsetWidth);
    initialCanvas.setHeight(initialContainer.offsetHeight);

    initialCanvas.add(initialWorkspace);
    initialCanvas.centerObject(initialWorkspace);
    initialCanvas.clipPath = initialWorkspace;

    setCanvas(initialCanvas);
    setContainer(initialContainer);

    const test = new fabric.Rect({
      height: 100,
      width: 100,
      fill: 'black'
    });

    initialCanvas.add(test);
    initialCanvas.centerObject(test);
  }, []);

  return {
    init,
    editor
  };
}