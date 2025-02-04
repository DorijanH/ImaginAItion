import { Dispatch, SetStateAction, useCallback, useMemo, useState } from 'react';
import { ITextOptions } from 'fabric/fabric-impl';
import { fabric } from 'fabric';

import { Editor, Filter, Font } from '../types';
import {
  addToCanvas,
  createFilter,
  downloadFile,
  generateSaveOptions,
  getWorkspace,
  isImageType,
  isTextType
} from '../helpers';
import {
  CIRCLE_OPTIONS,
  DIAMOND_OPTIONS,
  FILL_COLOR,
  FONT_FAMILY,
  FONT_LINETHROUGH,
  FONT_SIZE,
  FONT_STYLE,
  FONT_UNDERLINE,
  FONT_WEIGHT,
  JSON_PROPERTY_KEYS,
  RECTANGLE_OPTIONS,
  STROKE_COLOR,
  STROKE_DASH_ARRAY,
  STROKE_WIDTH,
  TEXT_ALIGN,
  TEXT_OPTIONS,
  TRIANGLE_OPTIONS,
  WORKSPACE_HEIGHT,
  WORKSPACE_NAME,
  WORKSPACE_WIDTH
} from '../constants';
import { useWindowEvents } from './use-window-events';
import { useHotkeys } from './use-hotkeys';
import { useHistory } from './use-history';
import { useClipboard } from './use-clipboard';
import { useCanvasEvents } from './use-canvas-events';
import { useAutoResize } from './use-auto-resize';

type BuildEditorProps = {
  save: (skip?: boolean) => void;
  undo: () => void;
  redo: () => void;
  canUndo: () => boolean;
  canRedo: () => boolean;
  autoZoom: () => void;
  canvas: fabric.Canvas;
  copy: () => void;
  paste: () => void;
  selectedObjects: fabric.Object[];
  fillColor: string;
  setFillColor: Dispatch<SetStateAction<string>>;
  strokeColor: string;
  setStrokeColor: Dispatch<SetStateAction<string>>;
  strokeWidth: number;
  setStrokeWidth: Dispatch<SetStateAction<number>>;
  strokeDashArray: number[];
  setStrokeDashArray: Dispatch<SetStateAction<number[]>>;
  fontFamily: string;
  setFontFamily: Dispatch<SetStateAction<string>>;
};

const buildEditor = (props: BuildEditorProps): Editor => {
  const {
    save,
    undo,
    redo,
    canUndo,
    canRedo,
    autoZoom,
    canvas,
    copy,
    paste,
    selectedObjects,
    fillColor,
    setFillColor,
    strokeColor,
    setStrokeColor,
    strokeWidth,
    setStrokeWidth,
    strokeDashArray,
    setStrokeDashArray,
    fontFamily,
    setFontFamily
  } = props;

  /**
   * Saves the canvas as a PNG.
   */
  const savePng = () => {
    const options = generateSaveOptions(canvas);

    canvas.setViewportTransform([1, 0, 0, 1, 0, 0]);

    const dataUrl = canvas.toDataURL(options);
    downloadFile(dataUrl, 'png');

    autoZoom();
  };

  /**
   * Saves the canvas as a SVG.
   */
  const saveSvg = () => {
    const options = generateSaveOptions(canvas);

    canvas.setViewportTransform([1, 0, 0, 1, 0, 0]);

    const dataUrl = canvas.toDataURL(options);
    downloadFile(dataUrl, 'svg');

    autoZoom();
  };

  /**
   * Saves the canvas as a JPG.
   */
  const saveJpg = () => {
    const options = generateSaveOptions(canvas);

    canvas.setViewportTransform([1, 0, 0, 1, 0, 0]);

    const dataUrl = canvas.toDataURL(options);
    downloadFile(dataUrl, 'jpg');

    autoZoom();
  };

  /**
   * Saves the canvas as a JSON.
   */
  const saveJson = () => {
    const currentState = canvas.toJSON(JSON_PROPERTY_KEYS);
    const currentStateJson = JSON.stringify(currentState, null, '\t');

    const fileString = `data:text/json;charset=utf-8,${encodeURIComponent(currentStateJson)}`;
    downloadFile(fileString, 'json');
  };

  /**
   * Loads the canvas from a JSON.
   */
  const loadJson = (json: string) => {
    const data = JSON.parse(json);

    canvas.loadFromJSON(data, () => {
      autoZoom();
    });
  };

  /**
   * Zooms out from the workspace.
   */
  const zoomOut = () => {
    let zoomRatio = canvas.getZoom();
    zoomRatio -= 0.05;
    zoomRatio = zoomRatio < 0.2 ? 0.2 : zoomRatio;

    const center = canvas.getCenter();

    canvas.zoomToPoint(new fabric.Point(center.left, center.top), zoomRatio);
  };

  /**
   * Zooms in to the workspace.
   */
  const zoomIn = () => {
    let zoomRatio = canvas.getZoom();
    zoomRatio += 0.05;
    zoomRatio = zoomRatio > 1.5 ? 1.5 : zoomRatio;

    const center = canvas.getCenter();

    canvas.zoomToPoint(new fabric.Point(center.left, center.top), zoomRatio);
  };

  /**
   * Changes the workspace size.
   */
  const changeSize = (value: { width: number; height: number }) => {
    const workspace = getWorkspace(canvas);

    workspace?.set(value);
    autoZoom();

    save();
  };

  /**
   * Changes the workspace background.
   */
  const changeBackground = (value: string) => {
    const workspace = getWorkspace(canvas);

    workspace?.set({ fill: value });
    canvas.renderAll();

    save();
  };

  /**
   * Enables the drawing mode.
   */
  const enableDrawMode = () => {
    canvas.discardActiveObject();
    canvas.renderAll();

    canvas.isDrawingMode = true;
    canvas.freeDrawingBrush.width = strokeWidth;
    canvas.freeDrawingBrush.color = strokeColor;
  };

  /**
   * Disables the drawing mode.
   */
  const disableDrawMode = () => {
    canvas.isDrawingMode = false;
  };

  /**
   * Deletes the currently selected object.
   */
  const deleteSelected = () => {
    selectedObjects.forEach((object) => canvas.remove(object));

    canvas.discardActiveObject();
    canvas.renderAll();
  };

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
   * Changes the image filter.
   */
  const changeImageFilter = (value: Filter) => {
    selectedObjects.forEach((object) => {
      if (isImageType(object.type)) {
        const imageObject = object as fabric.Image;

        const effect = createFilter(value);

        imageObject.filters = effect ? [effect] : [];
        imageObject.applyFilters();
        canvas.renderAll();
      }
    });
  };

  /**
   * Changes the opacity.
   */
  const changeOpacity = (value: number) => {
    selectedObjects.forEach((object) => object.set({ opacity: value }));

    canvas.renderAll();
  };

  /**
   * Gets the active opacity.
   */
  const getActiveOpacity = () => {
    const defaultOpacity = 1;
    const selectedObject = selectedObjects[0];

    if (!selectedObject) {
      return defaultOpacity;
    }

    return selectedObject.get('opacity') || defaultOpacity;
  };

  /**
   * Changes the font style.
   */
  const changeFontStyle = (value: string) => {
    selectedObjects.forEach((object) => {
      if (isTextType(object.type)) {
        // @ts-ignore
        object.set({ fontStyle: value });
      }
    });

    canvas.renderAll();
  };

  /**
   * Gets the active font style.
   */
  const getActiveFontStyle = () => {
    const selectedObject = selectedObjects[0];

    if (!selectedObject) {
      return FONT_STYLE;
    }

    // @ts-ignore
    return selectedObject.get('fontStyle') || FONT_STYLE;
  };

  /**
   * Changes the font linethrough.
   */
  const changeFontLinethrough = (value: boolean) => {
    selectedObjects.forEach((object) => {
      if (isTextType(object.type)) {
        // @ts-ignore
        object.set({ linethrough: value });
      }
    });

    canvas.renderAll();
  };

  /**
   * Gets is the font linethrough active.
   */
  const getActiveFontLinethrough = () => {
    const selectedObject = selectedObjects[0];

    if (!selectedObject) {
      return FONT_LINETHROUGH;
    }

    // @ts-ignore
    return selectedObject.get('linethrough') || FONT_LINETHROUGH;
  };

  /**
   * Changes the font underline.
   */
  const changeFontUnderline = (value: boolean) => {
    selectedObjects.forEach((object) => {
      if (isTextType(object.type)) {
        // @ts-ignore
        object.set({ underline: value });
      }
    });

    canvas.renderAll();
  };

  /**
   * Gets is the font underline active.
   */
  const getActiveFontUnderline = () => {
    const selectedObject = selectedObjects[0];

    if (!selectedObject) {
      return FONT_UNDERLINE;
    }

    // @ts-ignore
    return selectedObject.get('underline') || FONT_UNDERLINE;
  };

  /**
   * Changes the text align.
   */
  const changeTextAlign = (value: string) => {
    selectedObjects.forEach((object) => {
      if (isTextType(object.type)) {
        // @ts-ignore
        object.set({ textAlign: value });
      }
    });

    canvas.renderAll();
  };

  /**
   * Gets the active text align.
   */
  const getActiveTextAlign = () => {
    const selectedObject = selectedObjects[0];

    if (!selectedObject) {
      return TEXT_ALIGN;
    }

    // @ts-ignore
    return selectedObject.get('textAlign') || TEXT_ALIGN;
  };

  /**
   * Changes the font size.
   */
  const changeFontSize = (value: number) => {
    selectedObjects.forEach((object) => {
      if (isTextType(object.type)) {
        // @ts-ignore
        object.set({ fontSize: value });
      }
    });

    canvas.renderAll();
  };

  /**
   * Gets the active font size.
   */
  const getActiveFontSize = () => {
    const selectedObject = selectedObjects[0];

    if (!selectedObject) {
      return FONT_SIZE;
    }

    // @ts-ignore
    return selectedObject.get('fontSize') || FONT_SIZE;
  };

  /**
   * Changes the font weight.
   */
  const changeFontWeight = (value: number) => {
    selectedObjects.forEach((object) => {
      if (isTextType(object.type)) {
        // @ts-ignore
        object.set({ fontWeight: value });
      }
    });

    canvas.renderAll();
  };

  /**
   * Gets the active font weight.
   */
  const getActiveFontWeight = () => {
    const selectedObject = selectedObjects[0];

    if (!selectedObject) {
      return FONT_WEIGHT;
    }

    // @ts-ignore
    return selectedObject.get('fontWeight') || FONT_WEIGHT;
  };

  /**
   * Changes the font family.
   */
  const changeFontFamily = (value: Font) => {
    setFontFamily(value);

    selectedObjects.forEach((object) => {
      if (isTextType(object.type)) {
        // @ts-ignore
        object.set({ fontFamily: value });
      }
    });

    canvas.renderAll();
  };

  /**
   * Gets the active font family.
   */
  const getActiveFontFamily = () => {
    const selectedObject = selectedObjects[0];

    if (!selectedObject) {
      return fontFamily;
    }

    // @ts-ignore
    return selectedObject.get('fontFamily') || fontFamily;
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

    canvas.freeDrawingBrush.color = value;
    canvas.renderAll();
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
   * Changes the stroke width.
   */
  const changeStrokeWidth = (value: number) => {
    setStrokeWidth(value);

    selectedObjects.forEach((object) => object.set({ strokeWidth: value }));
    canvas.freeDrawingBrush.width = value;
    canvas.renderAll();
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
   * Changes the stroke dash array.
   */
  const changeStrokeDashArray = (value: number[]) => {
    setStrokeDashArray(value);

    selectedObjects.forEach((object) => object.set({ strokeDashArray: value }));
    canvas.renderAll();
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
   * Adds the text to the canvas.
   */
  const addText = (value: string, options?: ITextOptions) => {
    const text = new fabric.Textbox(value, {
      ...TEXT_OPTIONS,
      fill: fillColor,
      ...options
    });

    addToCanvas(canvas, text);
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

  /**
   * Adds the image to the canvas.
   */
  const addImage = (url: string) => {
    fabric.Image.fromURL(url, (image) => {
      const workspace = getWorkspace(canvas);

      image.scaleToWidth(workspace?.width ?? 0);
      image.scaleToHeight(workspace?.height ?? 0);

      addToCanvas(canvas, image);
    }, { crossOrigin: 'anonymous' });
  };

  return {
    savePng,
    saveSvg,
    saveJpg,
    saveJson,
    loadJson,
    save,
    undo,
    redo,
    canUndo,
    canRedo,
    copy,
    paste,
    zoomIn,
    zoomOut,
    autoZoom,
    changeSize,
    changeBackground,
    enableDrawMode,
    disableDrawMode,
    deleteSelected,
    bringForward,
    sendBackwards,
    changeImageFilter,
    changeOpacity,
    getActiveOpacity,
    changeFontStyle,
    getActiveFontStyle,
    changeFontLinethrough,
    getActiveFontLinethrough,
    changeFontUnderline,
    getActiveFontUnderline,
    changeTextAlign,
    getActiveTextAlign,
    changeFontSize,
    getActiveFontSize,
    changeFontWeight,
    getActiveFontWeight,
    changeFontFamily,
    getActiveFontFamily,
    changeFillColor,
    getActiveFillColor,
    changeStrokeColor,
    getActiveStrokeColor,
    changeStrokeWidth,
    getActiveStrokeWidth,
    changeStrokeDashArray,
    getActiveStrokeDashArray,
    addText,
    addCircle,
    addSoftRectangle,
    addRectangle,
    addTriangle,
    addInverseTriangle,
    addDiamond,
    addImage,
    canvas,
    selectedObjects
  };
};

type UseEditorProps = {
  clearSelectionCallback?: () => void;
};

export function useEditor({ clearSelectionCallback }: UseEditorProps) {
  const [canvas, setCanvas] = useState<fabric.Canvas | null>(null);
  const [container, setContainer] = useState<HTMLDivElement | null>(null);
  const [selectedObjects, setSelectedObjects] = useState<fabric.Object[]>([]);

  const [fontFamily, setFontFamily] = useState<string>(FONT_FAMILY);
  const [fillColor, setFillColor] = useState<string>(FILL_COLOR);
  const [strokeColor, setStrokeColor] = useState<string>(STROKE_COLOR);
  const [strokeWidth, setStrokeWidth] = useState<number>(STROKE_WIDTH);
  const [strokeDashArray, setStrokeDashArray] = useState<number[]>(STROKE_DASH_ARRAY);

  useWindowEvents();

  const { save, canRedo, canUndo, redo, undo, canvasHistory, setHistoryIndex } = useHistory({ canvas });
  const { copy, paste } = useClipboard({ canvas });
  const { autoZoom } = useAutoResize({ canvas, container });
  useCanvasEvents({
    save,
    canvas,
    setSelectedObjects,
    clearSelectionCallback
  });
  useHotkeys({
    canvas,
    copy,
    paste,
    redo,
    save,
    undo
  });

  const editor = useMemo(() => {
    if (canvas) {
      return buildEditor({
        save,
        undo,
        redo,
        canUndo,
        canRedo,
        autoZoom,
        copy,
        paste,
        canvas,
        selectedObjects,
        fillColor,
        setFillColor,
        strokeColor,
        setStrokeColor,
        strokeWidth,
        setStrokeWidth,
        strokeDashArray,
        setStrokeDashArray,
        fontFamily,
        setFontFamily
      });
    }

    return undefined;
  },
  [
    autoZoom,
    canRedo,
    canUndo,
    canvas,
    copy,
    fillColor,
    fontFamily,
    paste,
    redo,
    save,
    selectedObjects,
    strokeColor,
    strokeDashArray,
    strokeWidth,
    undo
  ]);

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
      width: WORKSPACE_WIDTH,
      height: WORKSPACE_HEIGHT,
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

    // Initial history
    const currentState = initialCanvas.toJSON(JSON_PROPERTY_KEYS);
    const currentStateJson = JSON.stringify(currentState);

    canvasHistory.current = [currentStateJson];
    setHistoryIndex(0);
  }, [canvasHistory, setHistoryIndex]);

  return {
    init,
    editor
  };
}