import React, { useRef, useState, useEffect, useCallback } from 'react';
import { 
  X, 
  Check, 
  Pen, 
  RotateCcw, 
  RotateCw, 
  Trash2, 
  Smile, 
  ZoomIn
} from 'lucide-react';

// 16 Exact Swatches from Screenshot 3
const COLOR_PALETTE = [
  // Row 1
  '#000000', '#374151', '#64748b', '#ffffff', '#ef4444', '#ec4899', '#9333ea', '#6366f1',
  // Row 2
  '#3b82f6', '#0ea5e9', '#06b6d4', '#10b981', '#22c55e', '#84cc16', '#f97316', '#ea580c'
];

// Stickers / Emojis from Screenshot 1
const QUICK_STICKERS = ['🤪', '👏', '⭐', '🚀'];
const STICKER_GRID = [
  '🤪', '😂', '🥹', '😍', '🤩', '😎',
  '🥳', '🤔', '😴', '😇', '👻', '🤖'
];

export default function DrawingStudio({ initialDrawing, onSave, onDiscard }) {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);

  // Active Tool & Popovers State
  const [activeMenu, setActiveMenu] = useState(null); // 'brush', 'color', 'stickers' or null
  const [brushType, setBrushType] = useState('pen'); // 'pen', 'marker', 'highlighter', 'eraser'
  const [brushColor, setBrushColor] = useState('#000000');
  const [customHex, setCustomHex] = useState('#000000');
  const [brushSize, setBrushSize] = useState(6);
  const [selectedSticker, setSelectedSticker] = useState(null);

  // Drawing state
  const [isDrawing, setIsDrawing] = useState(false);
  const [lastPoint, setLastPoint] = useState(null);

  // Undo / Redo history
  const [history, setHistory] = useState([]);
  const [historyStep, setHistoryStep] = useState(-1);

  // Initialize canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const rect = container.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    
    const width = Math.min(rect.width - 32, 920);
    const height = Math.min(rect.height - 32, 620);

    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;

    const ctx = canvas.getContext('2d');
    ctx.scale(dpr, dpr);

    // Initial white background
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, width, height);

    if (initialDrawing) {
      const img = new Image();
      img.src = initialDrawing;
      img.onload = () => {
        ctx.drawImage(img, 0, 0, width, height);
        pushHistory(canvas.toDataURL());
      };
    } else {
      pushHistory(canvas.toDataURL());
    }
  }, []);

  const pushHistory = (dataUrl) => {
    setHistory((prev) => {
      const next = prev.slice(0, historyStep + 1);
      next.push(dataUrl);
      return next.slice(-20);
    });
    setHistoryStep((prev) => Math.min(prev + 1, 19));
  };

  const getCanvasCoords = (e) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();

    const clientX = e.touches && e.touches[0] ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches && e.touches[0] ? e.touches[0].clientY : e.clientY;

    return {
      x: clientX - rect.left,
      y: clientY - rect.top
    };
  };

  const startDrawing = (e) => {
    e.preventDefault();
    const coords = getCanvasCoords(e);

    // If sticker placement mode is active
    if (selectedSticker) {
      placeSticker(coords.x, coords.y);
      return;
    }

    setIsDrawing(true);
    setLastPoint(coords);

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.beginPath();
    ctx.arc(coords.x, coords.y, brushSize / 2, 0, Math.PI * 2);
    ctx.fillStyle = brushType === 'eraser' ? '#ffffff' : brushColor;
    ctx.fill();
  };

  const placeSticker = (x, y) => {
    const canvas = canvasRef.current;
    if (!canvas || !selectedSticker) return;
    const ctx = canvas.getContext('2d');

    ctx.font = `${brushSize * 4 + 24}px sans-serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(selectedSticker, x, y);

    pushHistory(canvas.toDataURL());
    setSelectedSticker(null); // Return to drawing mode after placement
  };

  const draw = (e) => {
    if (!isDrawing || !lastPoint || selectedSticker) return;
    e.preventDefault();

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const currentPoint = getCanvasCoords(e);

    ctx.beginPath();
    ctx.moveTo(lastPoint.x, lastPoint.y);
    ctx.lineTo(currentPoint.x, currentPoint.y);

    if (brushType === 'eraser') {
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = brushSize * 2.5;
      ctx.globalAlpha = 1.0;
    } else if (brushType === 'highlighter') {
      ctx.strokeStyle = brushColor;
      ctx.lineWidth = brushSize * 2.2;
      ctx.globalAlpha = 0.4;
    } else if (brushType === 'marker') {
      ctx.strokeStyle = brushColor;
      ctx.lineWidth = brushSize * 1.5;
      ctx.globalAlpha = 0.8;
    } else {
      ctx.strokeStyle = brushColor;
      ctx.lineWidth = brushSize;
      ctx.globalAlpha = 1.0;
    }

    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.stroke();
    ctx.globalAlpha = 1.0;

    setLastPoint(currentPoint);
  };

  const stopDrawing = () => {
    if (isDrawing) {
      setIsDrawing(false);
      setLastPoint(null);
      const canvas = canvasRef.current;
      if (canvas) {
        pushHistory(canvas.toDataURL());
      }
    }
  };

  const handleUndo = () => {
    if (historyStep <= 0) return;
    const targetStep = historyStep - 1;
    const targetData = history[targetStep];
    if (!targetData) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const img = new Image();
    img.src = targetData;
    img.onload = () => {
      const rect = canvas.getBoundingClientRect();
      ctx.clearRect(0, 0, rect.width, rect.height);
      ctx.drawImage(img, 0, 0, rect.width, rect.height);
      setHistoryStep(targetStep);
    };
  };

  const handleRedo = () => {
    if (historyStep >= history.length - 1) return;
    const targetStep = historyStep + 1;
    const targetData = history[targetStep];
    if (!targetData) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const img = new Image();
    img.src = targetData;
    img.onload = () => {
      const rect = canvas.getBoundingClientRect();
      ctx.clearRect(0, 0, rect.width, rect.height);
      ctx.drawImage(img, 0, 0, rect.width, rect.height);
      setHistoryStep(targetStep);
    };
  };

  const handleClear = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const rect = canvas.getBoundingClientRect();
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, rect.width, rect.height);
    pushHistory(canvas.toDataURL());
  };

  const handleDone = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    onSave(canvas.toDataURL());
  };

  const toggleMenu = (menu) => {
    setActiveMenu((prev) => (prev === menu ? null : menu));
  };

  return (
    <div className="fixed inset-0 z-[100] bg-[#000000] text-white flex flex-col justify-between select-none animate-in fade-in duration-200">
      {/* --------------------------------------------------------------------------
          TOP BAR
          -------------------------------------------------------------------------- */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 z-20 bg-[#000000]/80 backdrop-blur-md">
        <button
          onClick={onDiscard}
          className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-semibold text-gray-200 transition-colors cursor-pointer"
        >
          <X className="w-4 h-4" />
          <span>Discard</span>
        </button>

        <h1 className="text-sm font-semibold text-white tracking-wide">
          Drawing Canvas
        </h1>

        <button
          onClick={handleDone}
          className="flex items-center gap-1.5 px-5 py-2 rounded-xl font-bold text-xs text-white shadow-lg transition-all hover:scale-105 active:scale-95 cursor-pointer"
          style={{
            backgroundImage: 'linear-gradient(to right, #d4547e, #e07a9c)',
            boxShadow: '0 0 15px rgba(212, 84, 126, 0.4)'
          }}
        >
          <Check className="w-4 h-4" />
          <span>Done</span>
        </button>
      </div>

      {/* --------------------------------------------------------------------------
          CANVAS AREA & TOOLBAR WITH INTERACTIVE POPOVERS
          -------------------------------------------------------------------------- */}
      <div className="flex-1 relative flex items-center justify-center p-4 md:p-8 overflow-hidden bg-dots-pattern">
        {/* Left Vertical Floating Toolbar */}
        <div className="absolute left-6 top-1/2 -translate-y-1/2 z-30 flex flex-col items-center gap-2.5 p-2 rounded-2xl bg-[#111116] border border-white/15 backdrop-blur-xl shadow-2xl">
          {/* 1. Brush Tool Indicator */}
          <button
            type="button"
            onClick={() => toggleMenu('brush')}
            className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all cursor-pointer ${
              activeMenu === 'brush'
                ? 'bg-[#d4547e] text-white shadow-lg'
                : 'text-gray-400 hover:text-white hover:bg-white/10'
            }`}
            title="Brush Tools"
          >
            <Pen className="w-4 h-4" />
          </button>

          {/* 2. Brush Type & Size Quick Button (Screenshot 2) */}
          <button
            type="button"
            onClick={() => toggleMenu('brush')}
            className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all cursor-pointer ${
              brushType === 'eraser' || activeMenu === 'brush'
                ? 'bg-[#d4547e] text-white shadow-lg'
                : 'text-gray-400 hover:text-white hover:bg-white/10'
            }`}
            title="Brush Size & Type"
          >
            <div 
              className="rounded-full bg-white transition-all"
              style={{
                width: `${Math.min(18, Math.max(4, brushSize))}px`,
                height: `${Math.min(18, Math.max(4, brushSize))}px`
              }}
            />
          </button>

          {/* 3. Color Picker Tool (Screenshot 3) */}
          <button
            type="button"
            onClick={() => toggleMenu('color')}
            className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all cursor-pointer ${
              activeMenu === 'color' ? 'ring-2 ring-[#d4547e]' : ''
            }`}
            title="Color Palette"
          >
            <div 
              className="w-5 h-5 rounded-full border-2 border-white shadow-sm"
              style={{ backgroundColor: brushColor }}
            />
          </button>

          {/* 4. Stickers / Emojis Tool (Screenshot 1) */}
          <button
            type="button"
            onClick={() => toggleMenu('stickers')}
            className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all cursor-pointer ${
              activeMenu === 'stickers' || selectedSticker
                ? 'bg-[#d4547e] text-white shadow-lg'
                : 'text-gray-400 hover:text-white hover:bg-white/10'
            }`}
            title="Stickers & Emojis"
          >
            <Smile className="w-4 h-4" />
          </button>

          <div className="w-5 h-px bg-white/15 my-0.5" />

          {/* 5. Undo */}
          <button
            type="button"
            onClick={handleUndo}
            disabled={historyStep <= 0}
            className="w-8 h-8 rounded-xl flex items-center justify-center text-gray-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed hover:bg-white/10 cursor-pointer"
            title="Undo"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>

          {/* 6. Redo */}
          <button
            type="button"
            onClick={handleRedo}
            disabled={historyStep >= history.length - 1}
            className="w-8 h-8 rounded-xl flex items-center justify-center text-gray-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed hover:bg-white/10 cursor-pointer"
            title="Redo"
          >
            <RotateCw className="w-3.5 h-3.5" />
          </button>

          <div className="w-5 h-px bg-white/15 my-0.5" />

          {/* 7. Clear */}
          <button
            type="button"
            onClick={handleClear}
            className="w-8 h-8 rounded-xl flex items-center justify-center text-gray-400 hover:text-rose-400 hover:bg-rose-500/10 cursor-pointer transition-colors"
            title="Clear Canvas"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* --------------------------------------------------------------------------
            POPOVER 1: BRUSH TYPE & SIZE (Exact match to Screenshot 2)
            -------------------------------------------------------------------------- */}
        {activeMenu === 'brush' && (
          <div className="absolute left-20 top-1/2 -translate-y-1/2 z-40 w-72 p-4 rounded-2xl bg-[#111116] border border-white/20 shadow-2xl animate-in fade-in slide-in-from-left-2">
            <div className="mb-4">
              <span className="text-[11px] font-mono font-bold tracking-wider text-gray-400 uppercase block mb-2.5">
                BRUSH TYPE
              </span>
              <div className="flex items-center gap-1 bg-[#09090d] p-1 rounded-xl border border-white/10">
                {['pen', 'marker', 'highlighter', 'eraser'].map((type) => {
                  const isActive = brushType === type;
                  const label = type.charAt(0).toUpperCase() + type.slice(1);

                  return (
                    <button
                      key={type}
                      type="button"
                      onClick={() => setBrushType(type)}
                      className={`flex-1 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                        isActive
                          ? 'bg-[#d4547e] text-white shadow-md'
                          : 'text-gray-400 hover:text-white'
                      }`}
                    >
                      {label}
                    </button>
                  );
                })}
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between text-xs font-mono mb-2">
                <span className="text-gray-400 font-bold uppercase">SIZE</span>
                <span className="text-gray-300 font-bold">{brushSize}px</span>
              </div>

              <div className="flex items-center gap-3">
                <div 
                  className="rounded-full bg-white shrink-0"
                  style={{
                    width: `${Math.min(24, Math.max(4, brushSize))}px`,
                    height: `${Math.min(24, Math.max(4, brushSize))}px`
                  }}
                />
                <input
                  type="range"
                  min="2"
                  max="40"
                  value={brushSize}
                  onChange={(e) => setBrushSize(Number(e.target.value))}
                  className="w-full accent-[#d4547e] cursor-pointer"
                />
              </div>
            </div>
          </div>
        )}

        {/* --------------------------------------------------------------------------
            POPOVER 2: COLOR PALETTE (Exact match to Screenshot 3)
            -------------------------------------------------------------------------- */}
        {activeMenu === 'color' && (
          <div className="absolute left-20 top-1/2 -translate-y-1/2 z-40 w-72 p-4 rounded-2xl bg-[#111116] border border-white/20 shadow-2xl animate-in fade-in slide-in-from-left-2">
            <span className="text-[11px] font-mono font-bold tracking-wider text-gray-400 uppercase block mb-3">
              COLOR
            </span>

            {/* 16 Swatches Grid (2 rows of 8) */}
            <div className="grid grid-cols-8 gap-2 mb-4">
              {COLOR_PALETTE.map((hex) => {
                const isSelected = brushColor.toLowerCase() === hex.toLowerCase();

                return (
                  <button
                    key={hex}
                    type="button"
                    onClick={() => {
                      setBrushColor(hex);
                      if (brushType === 'eraser') setBrushType('pen');
                    }}
                    className={`w-6 h-6 rounded-full border transition-transform cursor-pointer hover:scale-115 ${
                      isSelected ? 'ring-2 ring-[#d4547e] scale-110' : 'border-white/20'
                    }`}
                    style={{ backgroundColor: hex }}
                  />
                );
              })}
            </div>

            {/* Custom Hex Color Box */}
            <div className="flex items-center gap-2 bg-[#09090d] p-2 rounded-xl border border-white/10">
              <input
                type="color"
                value={brushColor}
                onChange={(e) => {
                  setBrushColor(e.target.value);
                  setCustomHex(e.target.value);
                  if (brushType === 'eraser') setBrushType('pen');
                }}
                className="w-6 h-6 rounded-lg bg-transparent border-0 cursor-pointer p-0"
              />
              <span className="text-xs font-mono text-gray-300 font-semibold flex-1">
                Custom
              </span>
              <span className="text-xs font-mono text-gray-400 uppercase">
                {brushColor}
              </span>
            </div>
          </div>
        )}

        {/* --------------------------------------------------------------------------
            POPOVER 3: STICKERS / EMOJIS (Exact match to Screenshot 1)
            -------------------------------------------------------------------------- */}
        {activeMenu === 'stickers' && (
          <div className="absolute left-20 top-1/2 -translate-y-1/2 z-40 w-80 p-4 rounded-2xl bg-[#111116] border border-white/20 shadow-2xl animate-in fade-in slide-in-from-left-2">
            <span className="text-[11px] font-mono font-bold tracking-wider text-gray-400 uppercase block mb-3">
              STICKERS
            </span>

            {/* Quick Favorites Bar */}
            <div className="flex items-center gap-2 bg-[#09090d] p-1.5 rounded-xl border border-white/10 mb-4">
              {QUICK_STICKERS.map((emoji) => (
                <button
                  key={emoji}
                  type="button"
                  onClick={() => {
                    setSelectedSticker(emoji);
                    setActiveMenu(null);
                  }}
                  className={`flex-1 h-9 rounded-lg flex items-center justify-center text-xl hover:bg-white/10 transition-colors cursor-pointer ${
                    selectedSticker === emoji ? 'bg-[#d4547e]/20 ring-1 ring-[#d4547e]' : ''
                  }`}
                >
                  {emoji}
                </button>
              ))}
            </div>

            {/* Emoji Grid */}
            <div className="grid grid-cols-6 gap-2 mb-3">
              {STICKER_GRID.map((emoji) => (
                <button
                  key={emoji}
                  type="button"
                  onClick={() => {
                    setSelectedSticker(emoji);
                    setActiveMenu(null);
                  }}
                  className={`h-9 rounded-lg flex items-center justify-center text-xl hover:bg-white/10 transition-colors cursor-pointer ${
                    selectedSticker === emoji ? 'bg-[#d4547e]/20 ring-1 ring-[#d4547e]' : ''
                  }`}
                >
                  {emoji}
                </button>
              ))}
            </div>

            <p className="text-[11px] font-mono text-gray-400 text-center">
              Tap an emoji, then tap on the canvas to place it
            </p>
          </div>
        )}

        {/* Center White Drawing Canvas Sheet */}
        <div 
          ref={containerRef}
          className="w-full max-w-4xl h-[75vh] flex items-center justify-center relative"
          onClick={() => {
            if (activeMenu) setActiveMenu(null);
          }}
        >
          <canvas
            ref={canvasRef}
            onPointerDown={startDrawing}
            onPointerMove={draw}
            onPointerUp={stopDrawing}
            onPointerLeave={stopDrawing}
            className={`bg-white rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.8)] border border-white/20 touch-none select-none block ${
              selectedSticker ? 'cursor-cell' : 'cursor-crosshair'
            }`}
          />

          {/* Floating Helper Banner when Sticker placement is active */}
          {selectedSticker && (
            <div className="absolute top-4 px-4 py-2 rounded-full bg-[#111116]/95 border border-[#d4547e] text-xs font-mono text-white shadow-xl flex items-center gap-2 pointer-events-none animate-bounce">
              <span className="text-base">{selectedSticker}</span>
              <span>Tap anywhere on the white sheet to place sticker!</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
