import { useCallback, useMemo, useState } from 'react';
import { fabric } from 'fabric';

import { BuildEditorProps, Editor } from '../types';
import { addToCanvas, isTextType } from '../helpers';
import {
  CIRCLE_OPTIONS,
  DIAMOND_OPTIONS,
  FILL_COLOR,
  RECTANGLE_OPTIONS,
  STROKE_COLOR,
  STROKE_WIDTH,
  TRIANGLE_OPTIONS,
  WORKSPACE_NAME
} from '../constants';
import { useCanvasEvents } from './use-canvas-events';
import { useAutoResize } from './use-auto-resize';

const buildEditor = (props: BuildEditorProps): Editor => {
  const {
    canvas,
    fillColor,
    setFillColor,
    strokeColor,
    setStrokeColor,
    strokeWidth,
    setStrokeWidth
  } = props;

  /**
   * Changes the fill color.
   */
  const changeFillColor = (value: string) => {
    setFillColor(value);

    canvas.getActiveObjects().forEach((object) => object.set({ fill: value }));
    canvas.renderAll();
  };

  /**
   * Changes the stroke color.
   */
  const changeStrokeColor = (value: string) => {
    setStrokeColor(value);

    canvas.getActiveObjects().forEach((object) => {
      // Text types don't have stroke
      if (isTextType(object.type)) {
        object.set({ fill: value });

        return;
      }

      object.set({ stroke: value });
    });

    canvas.renderAll();
  };

  /**
   * Changes the stroke width.
   */
  const changeStrokeWidth = (value: number) => {
    setStrokeWidth(value);

    canvas.getActiveObjects().forEach((object) => object.set({ strokeWidth: value }));
    canvas.renderAll();
  };

  /**
   * Adds the circle to the canvas.
   */
  const addCircle = () => {
    const circle = new fabric.Circle({
      ...CIRCLE_OPTIONS,
      fill: fillColor,
      stroke: strokeColor,
      strokeWidth: strokeWidth
    });

    addToCanvas(canvas, circle);
  };

  /**
   * Adds the soft rectangle to the canvas.
   */
  const addSoftRectangle = () => {
    const softRectangle = new fabric.Rect({
      ...RECTANGLE_OPTIONS,
      rx: 50,
      ry: 50,
      fill: fillColor,
      stroke: strokeColor,
      strokeWidth: strokeWidth
    });

    addToCanvas(canvas, softRectangle);
  };

  /**
   * Adds the rectangle to the canvas.
   */
  const addRectangle = () => {
    const rectangle = new fabric.Rect({
      ...RECTANGLE_OPTIONS,
      fill: fillColor,
      stroke: strokeColor,
      strokeWidth: strokeWidth
    });

    addToCanvas(canvas, rectangle);
  };

  /**
   * Adds the triangle to the canvas.
   */
  const addTriangle = () => {
    const triangle = new fabric.Triangle({
      ...TRIANGLE_OPTIONS,
      fill: fillColor,
      stroke: strokeColor,
      strokeWidth: strokeWidth
    });

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
        ...options,
        fill: fillColor,
        stroke: strokeColor,
        strokeWidth: strokeWidth
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
        ...options,
        fill: fillColor,
        stroke: strokeColor,
        strokeWidth: strokeWidth
      }
    );

    addToCanvas(canvas, diamond);
  };

  return {
    changeFillColor,
    changeStrokeColor,
    changeStrokeWidth,
    addCircle,
    addSoftRectangle,
    addRectangle,
    addTriangle,
    addInverseTriangle,
    addDiamond,
    canvas,
    fillColor,
    strokeColor,
    strokeWidth
  };
};

export function useEditor() {
  const [canvas, setCanvas] = useState<fabric.Canvas | null>(null);
  const [container, setContainer] = useState<HTMLDivElement | null>(null);
  const [selectedObjects, setSelectedObjects] = useState<fabric.Object[]>([]);

  const [fillColor, setFillColor] = useState(FILL_COLOR);
  const [strokeColor, setStrokeColor] = useState(STROKE_COLOR);
  const [strokeWidth, setStrokeWidth] = useState(STROKE_WIDTH);

  useAutoResize({ canvas, container });
  useCanvasEvents({ canvas, setSelectedObjects });

  const editor = useMemo(() => {
    if (canvas) {
      return buildEditor({
        canvas,
        fillColor,
        setFillColor,
        strokeColor,
        setStrokeColor,
        strokeWidth,
        setStrokeWidth
      });
    }

    return undefined;
  }, [canvas, fillColor, strokeColor, strokeWidth]);

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
  }, []);

  return {
    init,
    editor
  };
}