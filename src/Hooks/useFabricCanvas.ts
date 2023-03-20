import { fabric } from 'fabric';
import { useContext, useEffect } from 'react';
import { DrawMode } from '../constants';
import { DrawModeContext } from '../Providers/DrawModeProvider';

interface FabricCanvasProps {
  fabricCanvas: fabric.Canvas | null;
}

export const useFabricCanvas = ({ fabricCanvas }: FabricCanvasProps) => {
  const { mode } = useContext(DrawModeContext);

  const startAddingShape = (e: fabric.IEvent) => {
    if (!fabricCanvas) return;

    const pointer = fabricCanvas.getPointer(e.e);
    const points = [pointer.x, pointer.y, pointer.x, pointer.y];

    let shape: fabric.Line | fabric.Rect;

    switch (mode) {
      case DrawMode.LINE:
        shape = new fabric.Line(points, {
          fill: 'white',
          stroke: 'white',
          strokeWidth: 5,
          perPixelTargetFind: true,
          hasControls: false,
          lockMovementX: true,
          lockMovementY: true,
          borderColor: 'transparent',
          hoverCursor: 'default'
        });
        break;
      case DrawMode.RECTANGLE:
        shape = new fabric.Rect({
          left: pointer.x,
          top: pointer.y,
          width: 0,
          height: 0,
          hasControls: false,
          lockMovementX: true,
          lockMovementY: true,
          perPixelTargetFind: true,
          strokeWidth: 5,
          stroke: 'white',
          fill: 'transparent',
          hoverCursor: 'default'
        });
        break;
      default:
        shape = new fabric.Object();
    }

    fabricCanvas.add(shape);
    fabricCanvas.setActiveObject(shape);
    fabricCanvas.renderAll();
  };

  const drawLine = (e: fabric.IEvent) => {
    if (!fabricCanvas) return;

    const pointer = fabricCanvas.getPointer(e.e);
    const activeObject = fabricCanvas.getActiveObject();

    if (activeObject) {
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

          if (pointer.x > (rect.left ?? 0)) {
            rect.set({ width: pointer.x - (rect.left ?? 0) });
          }
          if (pointer.y > (rect.top ?? 0)) {
            rect.set({ height: pointer.y - (rect.top ?? 0) });
          }

          rect.setCoords();
          break;
        default:
          break;
      }
      fabricCanvas.renderAll();
    }
  };

  const finishDrawingLine = () => {
    if (!fabricCanvas) return;

    const activeObject = fabricCanvas.getActiveObject();
    if (activeObject) {
      activeObject.setCoords();
    }

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
