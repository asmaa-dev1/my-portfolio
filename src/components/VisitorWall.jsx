import React, { useState, useEffect } from 'react';
import { 
  Pen, 
  X, 
  Check, 
  Trash2, 
  Edit2, 
  Sparkles, 
  MessageSquare, 
  LogOut
} from 'lucide-react';
import confetti from 'canvas-confetti';
import DrawingStudio from './DrawingStudio';
import GoogleOAuthModal from './GoogleOAuthModal';

// 13 Color palette swatches matching the exact modal in screenshot 3
export const PIN_COLORS = [
  { id: 'purple', hex: '#3b1877', name: 'Deep Purple' },
  { id: 'red', hex: '#dc2626', name: 'Crimson Red' },
  { id: 'teal', hex: '#0d9488', name: 'Teal' },
  { id: 'sky', hex: '#0ea5e9', name: 'Sky Blue' },
  { id: 'orange', hex: '#ea580c', name: 'Vibrant Orange' },
  { id: 'pink', hex: '#db2777', name: 'Rose Pink' },
  { id: 'violet', hex: '#7c3aed', name: 'Electric Violet' },
  { id: 'cyan', hex: '#0284c7', name: 'Cyan' },
  { id: 'magenta', hex: '#be185d', name: 'Magenta' },
  { id: 'indigo', hex: '#4338ca', name: 'Indigo' },
  { id: 'amber', hex: '#d97706', name: 'Amber' },
  { id: 'green', hex: '#0f5132', name: 'Forest Green' },
  { id: 'emerald', hex: '#16a34a', name: 'Emerald' }
];

export default function VisitorWall() {
  // Purge any old legacy mock data on mount
  useEffect(() => {
    try {
      localStorage.removeItem('awrs_visitor_pins');
      localStorage.removeItem('visitor_wall_pins');
      localStorage.removeItem('awrs_real_visitor_pins_v3');
    } catch (e) {}
  }, []);

  // Real visitor submitted pins only
  const [pins, setPins] = useState(() => {
    try {
      const saved = localStorage.getItem('awrs_real_visitor_pins_v7');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {}
    return [];
  });

  // Google Authenticated User Session
  const [googleUser, setGoogleUser] = useState(() => {
    try {
      const saved = localStorage.getItem('awrs_connected_google_user');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.email && parsed.email.includes('@')) return parsed;
      }
    } catch (e) {}
    return null;
  });

  // Modals state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isGoogleOAuthOpen, setIsGoogleOAuthOpen] = useState(false);
  const [isStudioOpen, setIsStudioOpen] = useState(false);

  // Form State
  const [noteText, setNoteText] = useState('');
  const [selectedColor, setSelectedColor] = useState('#3b1877'); // Default Deep Purple
  const [drawingData, setDrawingData] = useState(null);

  // Persist real pins to LocalStorage
  useEffect(() => {
    try {
      localStorage.setItem('awrs_real_visitor_pins_v7', JSON.stringify(pins));
    } catch (e) {}
  }, [pins]);

  // Persist Google session to LocalStorage
  useEffect(() => {
    try {
      if (googleUser) {
        localStorage.setItem('awrs_connected_google_user', JSON.stringify(googleUser));
      } else {
        localStorage.removeItem('awrs_connected_google_user');
      }
    } catch (e) {}
  }, [googleUser]);

  // When clicking on "board.canvas.tapToDraw"
  const handleTapToDraw = () => {
    if (!googleUser) {
      // Must authenticate with Google OAuth Account Chooser first!
      setIsGoogleOAuthOpen(true);
    } else {
      // Already connected -> open Drawing Studio directly
      setIsStudioOpen(true);
    }
  };

  // When Google OAuth completes
  const handleGoogleAuthSuccess = (authenticatedAccount) => {
    setGoogleUser(authenticatedAccount);
    setIsGoogleOAuthOpen(false);

    // Open the Drawing Canvas Studio immediately
    setTimeout(() => {
      setIsStudioOpen(true);
    }, 150);
  };

  const handleSignOut = () => {
    setGoogleUser(null);
    localStorage.removeItem('awrs_connected_google_user');
  };

  // Pin Submit Handler
  const handlePinSubmit = (e) => {
    e.preventDefault();

    if (!googleUser) {
      setIsGoogleOAuthOpen(true);
      return;
    }

    if (!noteText.trim() && !drawingData) return;

    const newPin = {
      id: `pin-${Date.now()}`,
      email: googleUser.email,
      author: googleUser.name,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }),
      avatar: googleUser.initial || googleUser.name.charAt(0).toUpperCase(),
      avatarBg: googleUser.avatarBg || selectedColor,
      colorHex: selectedColor,
      note: noteText.trim(),
      drawing: drawingData
    };

    setPins([newPin, ...pins]);

    // Confetti celebration
    try {
      confetti({
        particleCount: 100,
        spread: 75,
        origin: { y: 0.6 },
        colors: ['#FF0099', '#ff9ad2', '#3b1877', '#10b981', '#f59e0b']
      });
    } catch (err) {}

    // Reset Form & Close Modal
    setNoteText('');
    setDrawingData(null);
    setIsModalOpen(false);
  };

  return (
    <div id="wall" className="w-full relative min-h-screen py-16 text-slate-900 dark:text-white font-sans select-none transition-colors duration-300">
      {/* --------------------------------------------------------------------------
          HEADER SECTION (Exact match to Screenshot 2)
          -------------------------------------------------------------------------- */}
      <div className="text-center mb-12">
        <p className="text-[11px] font-mono tracking-[0.25em] uppercase text-[#d4547e] dark:text-[#ff9ad2] font-bold mb-3">
          THE WALL REMEMBERS
        </p>

        <h2 className="text-4xl md:text-6xl font-serif font-bold text-slate-900 dark:text-white tracking-tight mb-8">
          Words Left in the{' '}
          <span 
            className="italic font-bold bg-clip-text text-transparent inline-block"
            style={{ backgroundImage: 'linear-gradient(to right, #d4547e, #ff9ad2)' }}
          >
            Ruins
          </span>
        </h2>

        {/* Pin Something Button */}
        <button
          onClick={() => setIsModalOpen(true)}
          className="group inline-flex items-center gap-2 px-8 py-3.5 rounded-full font-bold text-sm text-white shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer"
          style={{
            backgroundImage: 'linear-gradient(to right, #d4547e, #e07a9c, #a83d62)',
            boxShadow: '0 0 25px rgba(212, 84, 126, 0.45)'
          }}
        >
          <Pen className="w-4 h-4 transition-transform group-hover:rotate-12" />
          <span>Pin Something</span>
        </button>

        {/* Google User Status Indicator */}
        {googleUser && (
          <div className="mt-4 flex items-center justify-center gap-2 text-xs font-mono text-slate-700 dark:text-gray-300 bg-slate-200/90 dark:bg-white/5 py-1.5 px-4 rounded-full w-fit mx-auto border border-slate-300 dark:border-white/10 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <span>Connected:</span>
            <span className="font-bold text-slate-900 dark:text-white">{googleUser.name}</span>
            <span className="text-[11px] text-slate-500 dark:text-gray-400 font-mono">({googleUser.email})</span>
            <button
              onClick={handleSignOut}
              className="text-[#d4547e] hover:text-rose-600 dark:hover:text-rose-300 ml-2 font-bold cursor-pointer flex items-center gap-1"
              title="Sign out"
            >
              <LogOut className="w-3 h-3" />
              <span>Sign out</span>
            </button>
          </div>
        )}
      </div>

      {/* --------------------------------------------------------------------------
          MASONRY BOARD (Only Real Authenticated Visitor Pins with Google)
          -------------------------------------------------------------------------- */}
      {pins.length === 0 ? (
        <div className="max-w-md mx-auto p-12 text-center rounded-3xl bg-slate-100/90 dark:bg-white/[0.02] border border-slate-300 dark:border-white/10 backdrop-blur-xl shadow-lg">
          <div className="w-14 h-14 rounded-full bg-[#d4547e]/15 text-[#d4547e] flex items-center justify-center mx-auto mb-4 border border-[#d4547e]/30">
            <Pen className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">No drawings on the wall yet</h3>
          <p className="text-xs text-slate-600 dark:text-gray-400 font-mono mb-6 leading-relaxed">
            Connect with your Google account, draw your sketch, and be the first visitor to leave your mark!
          </p>
          <button
            onClick={() => setIsModalOpen(true)}
            className="px-6 py-3 rounded-full bg-gradient-to-r from-[#d4547e] to-[#a83d62] text-xs font-bold text-white hover:opacity-90 shadow-lg shadow-[#d4547e]/30 transition-all cursor-pointer inline-flex items-center gap-2"
          >
            <Pen className="w-3.5 h-3.5" />
            <span>+ Pin First Note</span>
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 items-start">
          {pins.map((pin) => (
            <div
              key={pin.id}
              className="rounded-3xl p-5 shadow-2xl transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between"
              style={{
                backgroundColor: pin.colorHex,
                border: '1px solid rgba(255, 255, 255, 0.12)',
                boxShadow: `0 12px 35px -10px ${pin.colorHex}90, 0 4px 12px rgba(0,0,0,0.5)`
              }}
            >
              {/* Top White Drawing Canvas Box (if has drawing) */}
              {pin.drawing && (
                <div className="w-full bg-white rounded-2xl p-4 mb-4 flex items-center justify-center min-h-[150px] shadow-sm overflow-hidden select-none">
                  <img
                    src={pin.drawing}
                    alt={`${pin.author}'s drawing`}
                    className="max-h-[140px] max-w-full object-contain"
                    draggable="false"
                  />
                </div>
              )}

              {/* Note Text (if present) */}
              {pin.note && (
                <div className="mb-4 px-1">
                  <p className="text-base md:text-lg font-bold text-white leading-snug">
                    {pin.note}
                  </p>
                </div>
              )}

              {/* Bottom Row: Google Author, Email & Date */}
              <div className="pt-3 border-t border-white/15 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2.5 min-w-0">
                  <div
                    className="w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs text-white uppercase shadow-sm shrink-0"
                    style={{ backgroundColor: pin.avatarBg || 'rgba(255,255,255,0.2)' }}
                  >
                    {pin.avatar || pin.author.charAt(0).toUpperCase()}
                  </div>
                  <div className="min-w-0">
                    <h4 className="font-bold text-white text-xs leading-tight truncate">
                      {pin.author}
                    </h4>
                    <p className="text-[10px] text-white/70 font-mono truncate max-w-[150px]">
                      {pin.email}
                    </p>
                  </div>
                </div>

                <span className="text-[10px] text-white/70 font-mono shrink-0 ml-2">
                  {pin.date}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* --------------------------------------------------------------------------
          PIN CREATION MODAL (Exact match to Screenshot 3 & Screenshot 1)
          -------------------------------------------------------------------------- */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
          <div 
            className="w-full max-w-md p-6 rounded-3xl relative border shadow-2xl overflow-hidden max-h-[95vh] overflow-y-auto"
            style={{
              backgroundColor: '#111116',
              borderColor: 'rgba(212, 84, 126, 0.4)',
              boxShadow: '0 25px 60px -15px rgba(212, 84, 126, 0.25)'
            }}
          >
            {/* Close Button */}
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-5 right-5 w-7 h-7 rounded-full bg-white/10 flex items-center justify-center text-gray-400 hover:text-white cursor-pointer transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Top User Profile Row (Exact match to Screenshot 3) */}
            <div className="flex items-center justify-between mb-5 pr-8">
              <div className="flex items-center gap-3">
                <div 
                  className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm text-white uppercase shadow-md shrink-0 transition-colors"
                  style={{ backgroundColor: googleUser ? googleUser.avatarBg : '#8b5cf6' }}
                >
                  {googleUser ? googleUser.initial : 'I'}
                </div>

                <div className="min-w-0">
                  <h3 className="font-bold text-sm text-white truncate leading-tight">
                    {googleUser ? googleUser.name : 'lll dfg'}
                  </h3>
                  <p className="text-[11px] text-gray-400 font-mono mt-0.5 truncate max-w-[200px]">
                    {googleUser ? `Composing... (${googleUser.email})` : 'Composing...'}
                  </p>
                </div>
              </div>

              {googleUser ? (
                <button
                  type="button"
                  onClick={handleSignOut}
                  className="text-[11px] text-gray-400 hover:text-rose-400 font-mono transition-colors cursor-pointer shrink-0 ml-2"
                >
                  Sign out
                </button>
              ) : (
                <span className="text-[11px] text-gray-400 font-mono">
                  Sign out
                </span>
              )}
            </div>

            {/* Note Textarea (Screenshot 3) */}
            <div className="relative mb-5">
              <textarea
                rows={3}
                maxLength={200}
                value={noteText}
                onChange={(e) => setNoteText(e.target.value)}
                placeholder="Type something nice..."
                className="w-full px-4 py-3 rounded-2xl bg-[#09090d] border border-white/15 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-[#d4547e] resize-none"
              />
              <span className="absolute right-3 bottom-3 text-[10px] font-mono text-gray-500">
                {noteText.length} / 200
              </span>
            </div>

            {/* Draw Something Section (Screenshot 3 & Screenshot 1) */}
            <div className="mb-5">
              <div className="flex items-center gap-1.5 mb-2 text-xs font-mono text-gray-300">
                <Pen className="w-3 h-3 text-[#d4547e]" />
                <span>Draw something</span>
              </div>

              {!drawingData ? (
                /* Tap to draw Box (Screenshot 3) -> Opens Google Account Chooser if not connected */
                <button
                  type="button"
                  onClick={handleTapToDraw}
                  className="w-full h-[120px] rounded-2xl border-2 border-dashed border-white/20 hover:border-[#d4547e]/60 bg-[#09090d] hover:bg-white/[0.03] flex flex-col items-center justify-center gap-2 text-gray-400 hover:text-white transition-all cursor-pointer group"
                >
                  <Pen className="w-5 h-5 text-gray-400 group-hover:text-[#d4547e] transition-colors" />
                  <span className="text-xs font-mono">board.canvas.tapToDraw</span>
                </button>
              ) : (
                /* Drawing Preview with Edit & Remove buttons (Screenshot 1) */
                <div className="flex flex-col gap-2">
                  <div 
                    onClick={handleTapToDraw}
                    className="w-full bg-white rounded-2xl p-3 flex items-center justify-center min-h-[140px] shadow-sm border border-white/30 cursor-pointer overflow-hidden group relative"
                    title="Click to edit drawing"
                  >
                    <img
                      src={drawingData}
                      alt="User drawing preview"
                      className="max-h-[130px] max-w-full object-contain"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-xs font-mono gap-1">
                      <Edit2 className="w-3.5 h-3.5" />
                      <span>Tap to Edit</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-end gap-2 text-xs font-mono">
                    <button
                      type="button"
                      onClick={handleTapToDraw}
                      className="px-3 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-gray-300 flex items-center gap-1 cursor-pointer transition-colors"
                    >
                      <Edit2 className="w-3 h-3" />
                      <span>Edit</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setDrawingData(null)}
                      className="px-3 py-1 rounded-lg bg-white/10 hover:bg-rose-500/20 text-gray-300 hover:text-rose-400 flex items-center gap-1 cursor-pointer transition-colors"
                    >
                      <Trash2 className="w-3 h-3" />
                      <span>Remove</span>
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Pick a Pin Color Palette (Screenshot 3) */}
            <div className="mb-6">
              <label className="block text-xs font-mono text-gray-300 mb-2.5">
                Pick a pin color
              </label>
              <div className="flex items-center gap-2.5 flex-wrap">
                {PIN_COLORS.map((c) => (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => setSelectedColor(c.hex)}
                    className="w-7 h-7 rounded-full flex items-center justify-center transition-transform hover:scale-110 cursor-pointer shadow-md"
                    style={{ backgroundColor: c.hex }}
                    title={c.name}
                  >
                    {selectedColor === c.hex && (
                      <Check className="w-4 h-4 text-white stroke-[3]" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Submit Button (Screenshot 3) */}
            <button
              onClick={handlePinSubmit}
              disabled={!noteText.trim() && !drawingData}
              className="w-full py-3.5 rounded-2xl font-bold text-sm text-white shadow-xl transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed hover:opacity-95 active:scale-[0.98] cursor-pointer flex items-center justify-center gap-2"
              style={{
                backgroundImage: 'linear-gradient(to right, #d4547e, #a83d62)',
                boxShadow: '0 8px 25px rgba(212, 84, 126, 0.35)'
              }}
            >
              <span>▲ Pin it!</span>
            </button>
          </div>
        </div>
      )}

      {/* --------------------------------------------------------------------------
          AUTHENTIC GOOGLE OAUTH MODAL (Exact match to Screenshots 1 & 2)
          -------------------------------------------------------------------------- */}
      <GoogleOAuthModal
        isOpen={isGoogleOAuthOpen}
        onClose={() => setIsGoogleOAuthOpen(false)}
        onSuccess={handleGoogleAuthSuccess}
      />

      {/* --------------------------------------------------------------------------
          FULLSCREEN DRAWING CANVAS STUDIO (Screenshot 2)
          -------------------------------------------------------------------------- */}
      {isStudioOpen && (
        <DrawingStudio
          initialDrawing={drawingData}
          onSave={(savedDataUrl) => {
            setDrawingData(savedDataUrl);
            setIsStudioOpen(false);
          }}
          onDiscard={() => {
            setIsStudioOpen(false);
          }}
        />
      )}
    </div>
  );
}
