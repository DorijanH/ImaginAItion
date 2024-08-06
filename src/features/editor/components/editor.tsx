'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { fabric } from 'fabric';

import { useEditor } from '@/features/editor/hooks/use-editor';

import { ActiveTool } from '../types';
import Toolbar from './toolbar';
import Sidebar from './sidebar';
import ShapeSidebar from './shape-sidebar';
import Navbar from './navbar';
import Footer from './footer';

export default function Editor() {
  const [activeTool, setActiveTool] = useState<ActiveTool>('select');

  const { init, editor } = useEditor();

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  /**
   * Initializes the editor canvas.
   */
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

  /**
   * Handles the active tool change action.
   */
  const handleChangeActiveTool = useCallback((tool: ActiveTool) => {
    if (tool === activeTool) {
      return setActiveTool('select');
    }

    if (tool === 'draw') {
      // TODO: Enable draw mode
    }

    if (activeTool === 'draw') {
      // TODO: Disable draw mode
    }

    setActiveTool(tool);
  }, [activeTool]);

  return (
    <div className="flex h-full flex-col">
      <Navbar activeTool={activeTool} onChangeActiveTool={handleChangeActiveTool} />

      <div className="absolute top-[68px] flex h-[calc(100%-68px)] w-full">
        <Sidebar activeTool={activeTool} onChangeActiveTool={handleChangeActiveTool}  />
        <ShapeSidebar
          editor={editor}
          activeTool={activeTool}
          onChangeActiveTool={handleChangeActiveTool}
        />

        <main className="relative flex flex-1 flex-col overflow-auto">
          <Toolbar />

          <div className="h-[calc(100%-124px)] flex-1 bg-muted" ref={containerRef}>
            <canvas ref={canvasRef} />
          </div>

          <Footer />
        </main>
      </div>
    </div>
  );
}