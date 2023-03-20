import { useContext, useEffect, useLayoutEffect, useRef, useState } from 'react';
import * as S from './Canvas.styles';
import { fabric } from 'fabric';
import { DrawMode, ToolbarWidth } from '../../constants';
import { DrawModeContext } from '../../Providers/DrawModeProvider';
import { useFabricCanvas } from '../../Hooks/useFabricCanvas';

export const Canvas = () => {
  const { mode } = useContext(DrawModeContext);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [fabricCanvas, setFabricCanvas] = useState<fabric.Canvas | null>(null);

  const { startAddingLine, drawLine, finishDrawingLine, handleDeleteObject } = useFabricCanvas({
    fabricCanvas
  });

  useLayoutEffect(() => {
    const canvas = new fabric.Canvas(canvasRef.current, {
      selection: false
    });

    setFabricCanvas(canvas);
  }, []);

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

  return (
    <S.CanvasContainer>
      <canvas
        ref={canvasRef}
        width={window.innerWidth - ToolbarWidth}
        height={window.innerHeight}
      ></canvas>
    </S.CanvasContainer>
  );
};
