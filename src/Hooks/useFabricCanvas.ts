import { fabric } from 'fabric';
import { useContext, useEffect } from 'react';
import { DrawMode } from '../constants';
import { DrawModeContext } from '../Providers/DrawModeProvider';

interface FabricCanvasProps {
  fabricCanvas: fabric.Canvas | null;
}

export const useFabricCanvas = ({ fabricCanvas }: FabricCanvasProps) => {
  const { mode } = useContext(DrawModeContext);

  const startAddingLine = (e: fabric.IEvent) => {
    if (!fabricCanvas) return;

    const pointer = fabricCanvas.getPointer(e.e);
    const points = [pointer.x, pointer.y, pointer.x, pointer.y];

    const line = new fabric.Line(points, {
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

    fabricCanvas.add(line);
    fabricCanvas.setActiveObject(line);
    fabricCanvas.renderAll();
  };

  const drawLine = (e: fabric.IEvent) => {
    if (!fabricCanvas) return;

    const pointer = fabricCanvas.getPointer(e.e);
    const activeObject = fabricCanvas.getActiveObject();

    if (activeObject && activeObject.type === 'line') {
      const line = activeObject as fabric.Line;
      line.set({ x2: pointer.x, y2: pointer.y });
      line.setCoords();
      fabricCanvas.renderAll();
    }
  };

  const finishDrawingLine = () => {
    if (!fabricCanvas) return;

    const activeObject = fabricCanvas.getActiveObject();
    if (activeObject && activeObject.type === 'line') {
      const line = activeObject as fabric.Line;
      line.setCoords();
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

      fabricCanvas.on('mouse:down', startAddingLine);
      fabricCanvas.on('mouse:move', drawLine);
      fabricCanvas.on('mouse:up', finishDrawingLine);

      fabricCanvas.discardActiveObject().renderAll();
    }

    return () => {
      fabricCanvas.off('mouse:down', startAddingLine);
      fabricCanvas.off('mouse:move', drawLine);
      fabricCanvas.off('mouse:up', finishDrawingLine);
    };
  }, [fabricCanvas, mode]);

  return {
    startAddingLine,
    drawLine,
    finishDrawingLine,
    handleDeleteObject
  };
};
