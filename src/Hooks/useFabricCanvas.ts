import { fabric } from 'fabric';
import { useContext, useEffect, useMemo, useState } from 'react';
import { lineOptions, rectOptions } from '../config/defaultShapeOptions';
import { DrawMode } from '../constants';
import { DrawModeContext } from '../Providers/DrawModeProvider';

interface FabricCanvasProps {
  fabricCanvas: fabric.Canvas | null;
}

let originX = 0,
  originY = 0;

export const useFabricCanvas = ({ fabricCanvas }: FabricCanvasProps) => {
  const { mode } = useContext(DrawModeContext);

  const startAddingShape = useMemo(
    () => (e: fabric.IEvent) => {
      if (!fabricCanvas) return;

      const pointer = fabricCanvas.getPointer(e.e);

      originX = pointer.x;
      originY = pointer.y;

      let shape: fabric.Line | fabric.Rect;

      switch (mode) {
        case DrawMode.LINE:
          const points = [pointer.x, pointer.y, pointer.x, pointer.y];
          shape = new fabric.Line(points, lineOptions);
          break;
        case DrawMode.RECTANGLE:
          shape = new fabric.Rect({
            left: pointer.x,
            top: pointer.y,
            ...rectOptions
          });
          break;
        default:
          shape = new fabric.Object();
      }

      fabricCanvas.add(shape);
      fabricCanvas.setActiveObject(shape);
      fabricCanvas.renderAll();
    },
    [fabricCanvas, mode]
  );

  const drawLine = useMemo(
    () => (e: fabric.IEvent) => {
      if (!fabricCanvas) return;

      const activeObject = fabricCanvas.getActiveObject();
      if (!activeObject) return;

      const pointer = fabricCanvas.getPointer(e.e);

      switch (mode) {
        case DrawMode.LINE:
          const line = activeObject as fabric.Line;
          line.set({ x2: pointer.x, y2: pointer.y });
          line.setCoords();
          break;
        case DrawMode.RECTANGLE:
          const rect = activeObject as fabric.Rect;

          if (!rect.left) rect.left = 0;
          if (!rect.top) rect.top = 0;

          if (originX > pointer.x) {
            rect.set({
              left: Math.abs(pointer.x)
            });
          }
          if (originY > pointer.y) {
            rect.set({
              top: Math.abs(pointer.y)
            });
          }

          rect.set({
            width: Math.abs(originX - pointer.x)
          });
          rect.set({
            height: Math.abs(originY - pointer.y)
          });

          rect.setCoords();
          break;
        default:
          break;
      }
      fabricCanvas.renderAll();
    },
    [fabricCanvas, mode, originX, originY]
  );

  const finishDrawingLine = () => {
    if (!fabricCanvas) return;

    const activeObject = fabricCanvas.getActiveObject();
    if (activeObject) {
      activeObject.setCoords();
    }

    originX = 0;
    originY = 0;

    fabricCanvas.discardActiveObject();
  };

  const handleDeleteObject = (e: KeyboardEvent) => {
    if (!fabricCanvas) return;

    if (e.key === 'Delete') {
      fabricCanvas.getActiveObjects().forEach((obj) => {
        fabricCanvas.remove(obj);
      });
    }
  };

  useEffect(() => {
    if (!fabricCanvas) return;

    document.addEventListener('keydown', handleDeleteObject);

    return () => {
      document.removeEventListener('keydown', handleDeleteObject);
      fabricCanvas.dispose();
    };
  }, [fabricCanvas]);

  useEffect(() => {
    if (!fabricCanvas) return;

    if (mode === DrawMode.SELECT) {
      fabricCanvas.getObjects().forEach((obj) => {
        obj.set('borderColor', 'red');
        obj.set('borderScaleFactor', 2);
        obj.set('lockMovementX', false);
        obj.set('lockMovementY', false);
        obj.set('hoverCursor', 'pointer');
      });

      fabricCanvas.renderAll();
    } else {
      fabricCanvas.getObjects().forEach((obj) => {
        obj.set('borderColor', 'transparent');
        obj.set('lockMovementX', true);
        obj.set('lockMovementY', true);
        obj.set('hoverCursor', 'default');
      });

      fabricCanvas.on('mouse:down', startAddingShape);
      fabricCanvas.on('mouse:move', drawLine);
      fabricCanvas.on('mouse:up', finishDrawingLine);

      fabricCanvas.discardActiveObject().renderAll();
    }

    return () => {
      fabricCanvas.off('mouse:down', startAddingShape);
      fabricCanvas.off('mouse:move', drawLine);
      fabricCanvas.off('mouse:up', finishDrawingLine);
    };
  }, [fabricCanvas, mode]);
};
