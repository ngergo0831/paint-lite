import { useState, useEffect } from 'react';

interface Canvas {
  canvasRef: React.RefObject<HTMLCanvasElement>;
}

class Line {
  startX = 0;
  startY = 0;
  endX = 0;
  endY = 0;
}

export const useCanvas = ({ canvasRef }: Canvas) => {
  const [context, setContext] = useState<CanvasRenderingContext2D | null>(null);
  //   const [shape, setShape] = useState<'line' | 'rectangle'>('rectangle'); // TODO implement
  const [isDrawing, setIsDrawing] = useState(false);
  const [lines, setLines] = useState<Line[]>([]);

  useEffect(() => {
    if (canvasRef.current) {
      const renderCtx = canvasRef.current.getContext('2d');
      if (renderCtx) {
        setContext(renderCtx);
      }
    }
  }, [canvasRef]);

  const startDrawing = (event: React.MouseEvent<HTMLCanvasElement>) => {
    if (!context) return;
    setIsDrawing(true);
    const line = new Line();
    line.startX = event.clientX - 64;
    line.startY = event.clientY;
    line.endX = event.clientX - 64;
    line.endY = event.clientY;
    setLines((prev) => [...prev, line]);
  };

  const finishDrawing = () => {
    if (!context) return;
    setIsDrawing(false);
    context.closePath();
  };

  const drawLines = () => {
    if (!context) return;

    context.clearRect(0, 0, context.canvas.width, context.canvas.height);
    lines.forEach((line) => {
      context.beginPath();
      context.moveTo(line.startX, line.startY);
      context.lineTo(line.endX, line.endY);
      context.stroke();
    });
  };

  const draw = (event: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing || !context) return;

    const line = lines[lines.length - 1];
    line.endX = event.clientX - 64;
    line.endY = event.clientY;

    drawLines();
  };

  return { startDrawing, finishDrawing, draw };
};
