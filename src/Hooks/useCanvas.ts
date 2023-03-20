import { useState, useEffect, useMemo } from 'react';

interface Canvas {
  canvasRef: React.RefObject<HTMLCanvasElement>;
}

class Line {
  startX = 0;
  startY = 0;
  endX = 0;
  endY = 0;
  isSelected = false;
}

export const useCanvas = ({ canvasRef }: Canvas) => {
  const [context, setContext] = useState<CanvasRenderingContext2D | null>(null);
  //   const [shape, setShape] = useState<'line' | 'rectangle'>('rectangle'); // TODO implement
  const [isDrawing, setIsDrawing] = useState(false);
  const [lines, setLines] = useState<Line[]>([]);
  const [selectedShapeIndex, setSelectedShapeIndex] = useState<number>(-1);
  const [mode, setMode] = useState<'draw' | 'select'>('draw');

  useEffect(() => {
    if ( !context) return;

    setLines((prevLines) => {
      const newLines = prevLines.map((line, index) => {
        if (index === selectedShapeIndex) {
          line.isSelected = true;
        } else {
          line.isSelected = false;
        }
        return line;
      });

      return newLines;
    });
  }, [selectedShapeIndex]);

  useEffect(() => {
    if (!context) return;
    if (lines.length >= 3) {
      setMode('select');
    }

    if (mode === 'select') {
      drawLines();
      context.closePath();
    }
  }, [lines, context, mode]);

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

    if (mode === 'select') {
      const selectedShape = lines.find(({ startX, startY, endX, endY }) => {
        const x = event.clientX - 64;
        const y = event.clientY;
        return (
          (x >= startX && x <= endX && y >= startY && y <= endY) ||
          (x >= endX && x <= startX && y >= endY && y <= startY)
        );
      });

      if (selectedShape) {
        setSelectedShapeIndex(lines.indexOf(selectedShape));
      } else {
        setSelectedShapeIndex(-1);
      }

      return;
    } else {
      setIsDrawing(true);
      const line = new Line();
      line.startX = event.clientX - 64;
      line.startY = event.clientY;
      line.endX = event.clientX - 64;
      line.endY = event.clientY;
      setLines((prev) => [...prev, line]);
    }
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
      context.lineWidth = 1;
      context.strokeStyle = line.isSelected ? 'red' : 'black';
      context.stroke();
    });
  };

  const draw = useMemo(
    () => (event: React.MouseEvent<HTMLCanvasElement>) => {
      if (!isDrawing || !context || mode === 'select') return;

      const line = lines[lines.length - 1];
      line.endX = event.clientX - 64;
      line.endY = event.clientY;

      drawLines();
    },
    [isDrawing, lines, selectedShapeIndex]
  );

  return { startDrawing, finishDrawing, draw };
};
