'use client';

import { useEffect, useRef } from 'react';
import { fabric } from 'fabric';

import { useEditor } from '@/features/editor/hooks/use-editor';

import Toolbar from './toolbar';
import Sidebar from './sidebar';
import Navbar from './navbar';
import Footer from './footer';

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

    return () => {
      canvas.dispose();
    };
  }, [init]);

  return (
    <div className="flex h-full flex-col">
      <Navbar />

      <div className="absolute top-[68px] flex h-[calc(100%-68px)] w-full">
        <Sidebar />

        <main className="relative flex flex-1 flex-col overflow-auto bg-muted">
          <Toolbar />

          <div className="h-[calc(100%-124px)] flex-1" ref={containerRef}>
            <canvas ref={canvasRef} />
          </div>

          <Footer />
        </main>
      </div>
    </div>
  );
}