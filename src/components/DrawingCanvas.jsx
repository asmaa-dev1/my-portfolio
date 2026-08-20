import React, { useRef, useState, useEffect } from 'react';
import { RotateCcw, Trash2, PenTool } from 'lucide-react';

export default function DrawingCanvas({ onSave, onClear }) {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [hasDrawn, setHasDrawn] = useState(false);
  const [history, setHistory] = useState([]);

  // Initialize Canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    
    // Set display and internal resolution
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * 2;
    canvas.height = 140 * 2;
    ctx.scale(2, 2);

    // Initial white background
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, rect.width, 140);

    // Default stroke settings
    ctx.strokeStyle = '#000000';
    ctx.lineWidth = 2.5;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    // Save initial blank state
    saveState();
  }, []);

  const saveState = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dataUrl = canvas.toDataURL();
    setHistory((prev) => [...prev.slice(-10), dataUrl]);
    if (onSave) {
      onSave(dataUrl);
    }
  };

  const getCoordinates = (e) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    
    // Support mouse and touch events
    if (e.touches && e.touches.length > 0) {
      return {
        x: e.touches[0].clientX - rect.left,
        y: e.touches[0].clientY - rect.top
      };
    }
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    };
  };

  const startDrawing = (e) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const { x, y } = getCoordinates(e);

    ctx.beginPath();
    ctx.moveTo(x, y);
    setIsDrawing(true);
    setHasDrawn(true);
  };

  const draw = (e) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const { x, y } = getCoordinates(e);

    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stopDrawing = () => {
    if (isDrawing) {
      setIsDrawing(false);
      saveState();
    }
  };

  const handleClear = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const rect = canvas.getBoundingClientRect();

    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, rect.width, 140);
    setHasDrawn(false);
    setHistory([]);
    saveState();
    if (onClear) onClear();
  };

  const handleUndo = () => {
    if (history.length <= 1) {
      handleClear();
      return;
    }

    const newHistory = [...history];
    newHistory.pop(); // Remove current
    const previousState = newHistory[newHistory.length - 1];

    const canvas = canvasRef.current;
    if (!canvas || !previousState) return;
    const ctx = canvas.getContext('2d');
    const img = new Image();
    img.src = previousState;
    img.onload = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0, canvas.width / 2, canvas.height / 2);
      setHistory(newHistory);
      if (onSave) onSave(previousState);
    };
  };

  return (
    <div className="w-full flex flex-col gap-2">
      <div className="relative w-full h-[140px] rounded-xl overflow-hidden border border-white/20 shadow-inner bg-white cursor-crosshair touch-none">
        <canvas
          ref={canvasRef}
          className="w-full h-full block"
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseLeave={stopDrawing}
          onTouchStart={startDrawing}
          onTouchMove={draw}
          onTouchEnd={stopDrawing}
        />
        {!hasDrawn && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none text-gray-400 text-xs font-mono select-none">
            <PenTool className="w-3.5 h-3.5 mr-1.5 opacity-60" />
            <span>Draw something here...</span>
          </div>
        )}
      </div>

      {/* Canvas Action Controls */}
      <div className="flex items-center justify-end gap-2 text-xs font-mono">
        <button
          type="button"
          onClick={handleUndo}
          disabled={history.length <= 1}
          className="px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-gray-300 disabled:opacity-30 disabled:cursor-not-allowed transition-colors flex items-center gap-1 cursor-pointer"
        >
          <RotateCcw className="w-3 h-3" />
          <span>Undo</span>
        </button>
        <button
          type="button"
          onClick={handleClear}
          className="px-2.5 py-1 rounded-lg bg-white/10 hover:bg-rose-500/20 text-gray-300 hover:text-rose-400 transition-colors flex items-center gap-1 cursor-pointer"
        >
          <Trash2 className="w-3 h-3" />
          <span>Clear</span>
        </button>
      </div>
    </div>
  );
}
