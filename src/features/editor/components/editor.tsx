'use client';

import { useEffect, useRef } from 'react';
import { fabric } from 'fabric';

import { useEditor } from '@/features/editor/hooks/use-editor';

export default function Editor() {
  const { init } = useEditor();

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = new fabric.Canvas(canvasRef.current, {
      controlsAboveOverlay: true,
      preserveObjectStacking: true
    });

    init({ initialCanvas: canvas, initialContainer: containerRef.current! });
  }, [init]);

  return (
    <div className="flex h-full flex-col">
      <div className="h-full flex-1 bg-muted" ref={containerRef}>
        <canvas ref={canvasRef} />
      </div>
    </div>
  );
}