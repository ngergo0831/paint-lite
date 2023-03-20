import { fabric } from 'fabric';

interface FabricCanvasProps {
  fabricCanvas: fabric.Canvas | null;
}

export const useFabricCanvas = ({ fabricCanvas }: FabricCanvasProps) => {
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

  return {
    startAddingLine,
    drawLine,
    finishDrawingLine,
    handleDeleteObject
  };
};
