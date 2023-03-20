import { useLayoutEffect, useRef, useState } from 'react';
import * as S from './Canvas.styles';
import { fabric } from 'fabric';
import { ToolbarWidth } from '../../constants';
import { useFabricCanvas } from '../../Hooks/useFabricCanvas';

export const Canvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [fabricCanvas, setFabricCanvas] = useState<fabric.Canvas | null>(null);

  useFabricCanvas({ fabricCanvas });

  useLayoutEffect(() => {
    const canvas = new fabric.Canvas(canvasRef.current, {
      selection: false
    });

    setFabricCanvas(canvas);
  }, []);

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
