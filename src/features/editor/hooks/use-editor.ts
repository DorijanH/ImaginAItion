import { Dispatch, SetStateAction, useCallback, useMemo, useState } from 'react';
import { fabric } from 'fabric';

import { Editor } from '../types';
import { addToCanvas, getWorkspace, isTextType } from '../helpers';
import {
  CIRCLE_OPTIONS,
  DIAMOND_OPTIONS,
  FILL_COLOR,
  RECTANGLE_OPTIONS,
  STROKE_COLOR,
  STROKE_DASH_ARRAY,
  STROKE_WIDTH,
  TRIANGLE_OPTIONS,
  WORKSPACE_NAME
} from '../constants';
import { useCanvasEvents } from './use-canvas-events';
import { useAutoResize } from './use-auto-resize';

type BuildEditorProps = {
  canvas: fabric.Canvas;
  selectedObjects: fabric.Object[];
  fillColor: string;
  setFillColor: Dispatch<SetStateAction<string>>;
  strokeColor: string;
  setStrokeColor: Dispatch<SetStateAction<string>>;
  strokeWidth: number;
  setStrokeWidth: Dispatch<SetStateAction<number>>;
  strokeDashArray: number[];
  setStrokeDashArray: Dispatch<SetStateAction<number[]>>;
};

const buildEditor = (props: BuildEditorProps): Editor => {
  const {
    canvas,
    selectedObjects,
    fillColor,
    setFillColor,
    strokeColor,
    setStrokeColor,
    strokeWidth,
    setStrokeWidth,
    strokeDashArray,
    setStrokeDashArray
  } = props;

  /**
   * Brings the object forward in the layering terms.
   */
  const bringForward = () => {
    selectedObjects.forEach((object) => canvas.bringForward(object));

    canvas.renderAll();
  };

  /**
   * Sends the object backwards in the layering terms.
   */
  const sendBackwards = () => {
    selectedObjects.forEach((object) => canvas.sendBackwards(object));

    canvas.renderAll();

    const workspace = getWorkspace(canvas);
    workspace?.sendToBack();
  };

  /**
   * Changes the fill color.
   */
  const changeFillColor = (value: string) => {
    setFillColor(value);

    selectedObjects.forEach((object) => object.set({ fill: value }));
    canvas.renderAll();
  };

  /**
   * Changes the stroke color.
   */
  const changeStrokeColor = (value: string) => {
    setStrokeColor(value);

    selectedObjects.forEach((object) => {
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

    selectedObjects.forEach((object) => object.set({ strokeWidth: value }));
    canvas.renderAll();
  };

  /**
   * Changes the stroke dash array.
   */
  const changeStrokeDashArray = (value: number[]) => {
    setStrokeDashArray(value);

    selectedObjects.forEach((object) => object.set({ strokeDashArray: value }));
    canvas.renderAll();
  };

  /**
   * Gets the active fill color.
   */
  const getActiveFillColor = () => {
    const selectedObject = selectedObjects[0];

    if (!selectedObject) {
      return fillColor;
    }

    const value = selectedObject.get('fill') || fillColor;

    // Currently gradiants and patterns are not used
    return value as string;
  };

  /**
   * Gets the active stroke color.
   */
  const getActiveStrokeColor = () => {
    const selectedObject = selectedObjects[0];

    if (!selectedObject) {
      return strokeColor;
    }

    return selectedObject.get('stroke') || strokeColor;
  };

  /**
   * Gets the active stroke width.
   */
  const getActiveStrokeWidth = () => {
    const selectedObject = selectedObjects[0];

    if (!selectedObject) {
      return strokeWidth;
    }

    return selectedObject.get('strokeWidth') || strokeWidth;
  };

  /**
   * Gets the active stroke dash array.
   */
  const getActiveStrokeDashArray = () => {
    const selectedObject = selectedObjects[0];

    if (!selectedObject) {
      return strokeDashArray;
    }

    return selectedObject.get('strokeDashArray') || strokeDashArray;
  };

  /**
   * Adds the circle to the canvas.
   */
  const addCircle = () => {
    const circle = new fabric.Circle({
      ...CIRCLE_OPTIONS,
      fill: fillColor,
      stroke: strokeColor,
      strokeWidth: strokeWidth,
      strokeDashArray: strokeDashArray
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
      strokeWidth: strokeWidth,
      strokeDashArray: strokeDashArray
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
      strokeWidth: strokeWidth,
      strokeDashArray: strokeDashArray
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
      strokeWidth: strokeWidth,
      strokeDashArray: strokeDashArray
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
        strokeWidth: strokeWidth,
        strokeDashArray: strokeDashArray
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
        strokeWidth: strokeWidth,
        strokeDashArray: strokeDashArray
      }
    );

    addToCanvas(canvas, diamond);
  };

  return {
    bringForward,
    sendBackwards,
    changeFillColor,
    changeStrokeColor,
    changeStrokeWidth,
    changeStrokeDashArray,
    getActiveFillColor,
    getActiveStrokeColor,
    getActiveStrokeWidth,
    getActiveStrokeDashArray,
    addCircle,
    addSoftRectangle,
    addRectangle,
    addTriangle,
    addInverseTriangle,
    addDiamond,
    canvas,
    selectedObjects
  };
};

type UseEditorProps = {
  clearSelectionCallback?: () => void;
};

export function useEditor(props: UseEditorProps) {
  const {
    clearSelectionCallback
  } = props;

  const [canvas, setCanvas] = useState<fabric.Canvas | null>(null);
  const [container, setContainer] = useState<HTMLDivElement | null>(null);
  const [selectedObjects, setSelectedObjects] = useState<fabric.Object[]>([]);

  const [fillColor, setFillColor] = useState(FILL_COLOR);
  const [strokeColor, setStrokeColor] = useState(STROKE_COLOR);
  const [strokeWidth, setStrokeWidth] = useState(STROKE_WIDTH);
  const [strokeDashArray, setStrokeDashArray] = useState<number[]>(STROKE_DASH_ARRAY);

  useAutoResize({ canvas, container });
  useCanvasEvents({ canvas, setSelectedObjects, clearSelectionCallback });

  const editor = useMemo(() => {
    if (canvas) {
      return buildEditor({
        canvas,
        selectedObjects,
        fillColor,
        setFillColor,
        strokeColor,
        setStrokeColor,
        strokeWidth,
        setStrokeWidth,
        strokeDashArray,
        setStrokeDashArray
      });
    }

    return undefined;
  }, [canvas, fillColor, selectedObjects, strokeColor, strokeDashArray, strokeWidth]);

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