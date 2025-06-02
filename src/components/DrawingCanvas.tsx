
import React, { useRef, useEffect, useState } from 'react';

interface DrawingCanvasProps {
  onSave: (dataUrl: string) => void;
  existingData?: string;
}

const DrawingCanvas = ({ onSave, existingData }: DrawingCanvasProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [lastPos, setLastPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    canvas.width = 400;
    canvas.height = 200;

    // Set drawing styles
    ctx.strokeStyle = '#000000';
    ctx.lineWidth = 2;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    // Load existing drawing if provided
    if (existingData) {
      const img = new Image();
      img.onload = () => {
        ctx.drawImage(img, 0, 0);
        onSave(canvas.toDataURL());
      };
      img.src = existingData;
    } else {
      // Clear canvas and save initial state
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      onSave(canvas.toDataURL());
    }
  }, [existingData, onSave]);

  const getCanvasPos = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };

    const rect = canvas.getBoundingClientRect();
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    };
  };

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    setIsDrawing(true);
    const pos = getCanvasPos(e);
    setLastPos(pos);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;

    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!ctx || !canvas) return;

    const currentPos = getCanvasPos(e);

    ctx.beginPath();
    ctx.moveTo(lastPos.x, lastPos.y);
    ctx.lineTo(currentPos.x, currentPos.y);
    ctx.stroke();

    setLastPos(currentPos);
    onSave(canvas.toDataURL());
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!ctx || !canvas) return;

    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    onSave(canvas.toDataURL());
  };

  return (
    <div className="space-y-2">
      <canvas
        ref={canvasRef}
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={stopDrawing}
        onMouseLeave={stopDrawing}
        className="border border-gray-300 rounded cursor-crosshair w-full"
        style={{ maxWidth: '100%', height: 'auto' }}
      />
      <button
        onClick={clearCanvas}
        className="text-sm text-gray-600 hover:text-gray-800"
      >
        Clear drawing
      </button>
    </div>
  );
};

export default DrawingCanvas;
