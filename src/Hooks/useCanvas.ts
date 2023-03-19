import { useState, useEffect, useRef, useLayoutEffect } from 'react';

interface Canvas {
  canvasRef: React.RefObject<HTMLCanvasElement>;
}

export const useCanvas = ({ canvasRef }: Canvas) => {
  const [context, setContext] = useState<CanvasRenderingContext2D | null>(null);
  const [shape, setShape] = useState<'line' | 'rectangle'>('line');
  const [elements, setElements] = useState<CanvasImageSource[]>([]);
  const [isDrawing, setIsDrawing] = useState(false);
  const canvasOffSetX = useRef<number | null>(null);
  const canvasOffSetY = useRef<number | null>(null);
  const startX = useRef<number | null>(null);
  const startY = useRef<number | null>(null);

  let canvas = canvasRef.current;

  useEffect(() => {
    if (!canvas) return;
    setContext(canvas.getContext('2d'));
    const { left, top } = canvas.getBoundingClientRect();
    canvasOffSetX.current = left;
    canvasOffSetY.current = top;
  }, [canvas]);

  useLayoutEffect(() => {
    if (!context) return;

    context.clearRect(0, 0, context.canvas.width, context.canvas.height);

    elements.forEach((element) => {
      context.drawImage(element, 0, 0);
    });
  }, [elements, context]);

  const startDrawing = (event: React.MouseEvent<HTMLCanvasElement>) => {
    event.preventDefault();
    event.stopPropagation();

    if (!context) return;

    const { clientX, clientY } = event;
    const x = clientX - canvasOffSetX.current!;
    const y = clientY - canvasOffSetY.current!;

    startX.current = x;
    startY.current = y;

    setIsDrawing(true);
  };

  const finishDrawing = () => {
    if (!context) return;

    setIsDrawing(false);
  };

  const draw = (event: React.MouseEvent<HTMLCanvasElement>) => {
    if (!context || !isDrawing) return;

    event.preventDefault();
    event.stopPropagation();

    context.clearRect(0, 0, context.canvas.width, context.canvas.height);

    const { clientX, clientY } = event;
    const x = clientX - canvasOffSetX.current!;
    const y = clientY - canvasOffSetY.current!;

    if (shape === 'line') {
      context.beginPath();
      context.moveTo(startX.current!, startY.current!);
      context.lineTo(x, y);
      context.stroke();
    } else if (shape === 'rectangle') {
      context.beginPath();
      context.strokeRect(
        startX.current!,
        startY.current!,
        x - startX.current!,
        y - startY.current!
      );
    }
  };

  return { startDrawing, finishDrawing, draw };
};
