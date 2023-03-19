import { useRef } from 'react';
import { useCanvas } from '../../Hooks/useCanvas';
import * as S from './Canvas.styles';

export const Canvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const { startDrawing, finishDrawing, draw } = useCanvas({ canvasRef });

  return (
    <S.CanvasContainer>
      <canvas
        ref={canvasRef}
        onMouseDown={startDrawing as any}
        onMouseMove={draw as any}
        onMouseUp={finishDrawing}
        onMouseLeave={finishDrawing}
        width={window.innerWidth - 64}
        height={window.innerHeight}
      ></canvas>
    </S.CanvasContainer>
  );
};
