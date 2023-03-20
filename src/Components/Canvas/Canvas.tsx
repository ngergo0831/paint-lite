import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import * as S from './Canvas.styles';
import { fabric } from 'fabric';
import { ToolbarWidth } from '../../constants';

export const Canvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [fabricCanvas, setFabricCanvas] = useState<fabric.Canvas | null>(null);
  const [isEditMode, setIsEditMode] = useState(true);

  useLayoutEffect(() => {
    const canvas = new fabric.Canvas(canvasRef.current, {
      selection: false
    });

    setFabricCanvas(canvas);
  }, []);

  const startAddingLine = (e: fabric.IEvent) => {
    if (!fabricCanvas) return;

    const pointer = fabricCanvas.getPointer(e.e);
    const points = [pointer.x, pointer.y, pointer.x, pointer.y];

    const line = new fabric.Line(points, {
      fill: 'red',
      stroke: 'red',
      strokeWidth: 5,
      perPixelTargetFind: true,
      hasControls: false,
      borderColor: 'transparent'
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

  useEffect(() => {
    if (!fabricCanvas) return;
    fabricCanvas.add(
      new fabric.Line([100, 100, 200, 200], {
        fill: 'red',
        stroke: 'red',
        strokeWidth: 5,
        perPixelTargetFind: true,
        hasControls: false
      })
    );

    fabricCanvas.on('mouse:down', startAddingLine);
    fabricCanvas.on('mouse:move', drawLine);
    fabricCanvas.on('mouse:up', finishDrawingLine);

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Delete') {
        fabricCanvas.getActiveObjects().forEach((obj) => {
          fabricCanvas.remove(obj);
        });
      }
    });

    return () => {
      fabricCanvas.dispose();
    };
  }, [fabricCanvas]);

  useEffect(() => {
    console.log('isEditMode', isEditMode);
  }, [isEditMode]);

  const handleClick = () => {
    console.log('click');
    setIsEditMode((prev) => !prev);
  };

  return (
    <S.CanvasContainer>
      <canvas ref={canvasRef} width={window.innerWidth - ToolbarWidth} height={window.innerHeight}></canvas>
    </S.CanvasContainer>
  );
};
