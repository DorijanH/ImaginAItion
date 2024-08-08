import { ITextboxOptions } from 'fabric/fabric-impl';

export type ActiveTool =
  | 'select'
  | 'shapes'
  | 'text'
  | 'images'
  | 'draw'
  | 'fill'
  | 'stroke-color'
  | 'stroke-width'
  | 'font'
  | 'opacity'
  | 'filter'
  | 'settings'
  | 'ai'
  | 'remove-bg'
  | 'templates';

export type Editor = {
  bringForward: () => void;
  sendBackwards: () => void;
  changeOpacity: (value: number) => void;
  getActiveOpacity: () => number;
  changeFontStyle: (value: string) => void;
  getActiveFontStyle: () => string;
  changeFontLinethrough: (value: boolean) => void;
  getActiveFontLinethrough: () => boolean;
  changeFontUnderline: (value: boolean) => void;
  getActiveFontUnderline: () => boolean;
  changeTextAlign: (value: string) => void;
  getActiveTextAlign: () => string;
  changeFontSize: (value: number) => void;
  getActiveFontSize: () => number;
  changeFontWeight: (value: number) => void;
  getActiveFontWeight: () => number;
  changeFontFamily: (value: string) => void;
  getActiveFontFamily: () => string;
  changeFillColor: (value: string) => void;
  getActiveFillColor: () => string;
  changeStrokeColor: (value: string) => void;
  getActiveStrokeColor: () => string;
  changeStrokeWidth: (value: number) => void;
  getActiveStrokeWidth: () => number;
  changeStrokeDashArray: (value: number[]) => void;
  getActiveStrokeDashArray: () => number[];
  addText: (value: string, options?: ITextboxOptions) => void;
  addCircle: () => void;
  addSoftRectangle: () => void;
  addRectangle: () => void;
  addTriangle: () => void;
  addInverseTriangle: () => void;
  addDiamond: () => void;
  canvas: fabric.Canvas;
  selectedObjects: fabric.Object[];
}