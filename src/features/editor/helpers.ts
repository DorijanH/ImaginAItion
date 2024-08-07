import { RGBColor } from 'react-color';

import { WORKSPACE_NAME } from './constants';

export function getWorkspace(canvas: fabric.Canvas) {
  return canvas
    .getObjects()
    .find((object) => object.name === WORKSPACE_NAME);
}

export function centerObject(canvas: fabric.Canvas, object: fabric.Object) {
  const workspace = getWorkspace(canvas);
  const center = workspace?.getCenterPoint();

  if (!center) return;

  // @ts-ignore
  canvas._centerObject(object, center);
}

export function addToCanvas(canvas: fabric.Canvas, object: fabric.Object) {
  centerObject(canvas, object);

  canvas.add(object);
  canvas.setActiveObject(object);
}

export function isTextType(type: string | undefined) {
  return type === 'text' || type === 'i-text' || type === 'textbox';
}

export function rgbaObjectToString(rgba: RGBColor | 'transparent') {
  if (rgba === 'transparent') {
    return 'rgba(0, 0, 0, 0)';
  }

  const alpha = rgba.a ?? 1;

  return `rgba(${rgba.r}, ${rgba.g}, ${rgba.b}, ${alpha})`;
}