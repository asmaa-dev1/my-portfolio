import React, { useState, useEffect } from 'react';

export default function AnalogWatch({ size = 220 }) {
  const [timeData, setTimeData] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0,
    milliseconds: 0,
    dayName: 'WED',
    dayNumber: '19',
    monthName: 'AUG',
    isNight: false
  });

  useEffect(() => {
    let animId;

    const updateWatch = () => {
      // Get Casablanca local time
      const now = new Date();
      // Use Intl to get exact time in Africa/Casablanca
      const casablancaString = now.toLocaleString('en-US', { timeZone: 'Africa/Casablanca' });
      const casaDate = new Date(casablancaString);

      const hours = casaDate.getHours();
      const minutes = casaDate.getMinutes();
      const seconds = casaDate.getSeconds();
      const milliseconds = now.getMilliseconds();

      const dayName = casaDate.toLocaleDateString('en-US', { weekday: 'short', timeZone: 'Africa/Casablanca' }).toUpperCase();
      const dayNumber = casaDate.toLocaleDateString('en-US', { day: '2-digit', timeZone: 'Africa/Casablanca' });
      const monthName = casaDate.toLocaleDateString('en-US', { month: 'short', timeZone: 'Africa/Casablanca' }).toUpperCase();

      setTimeData({
        hours: hours % 12,
        minutes,
        seconds,
        milliseconds,
        dayName,
        dayNumber,
        monthName,
        isNight: hours < 6 || hours >= 19
      });

      animId = requestAnimationFrame(updateWatch);
    };

    animId = requestAnimationFrame(updateWatch);
    return () => cancelAnimationFrame(animId);
  }, []);

  // Compute angles for ultra-smooth 60fps mechanical sweep
  const secondAngle = (timeData.seconds + timeData.milliseconds / 1000) * 6; // 360 / 60 = 6 deg/sec
  const minuteAngle = timeData.minutes * 6 + (timeData.seconds / 60) * 6;
  const hourAngle = timeData.hours * 30 + (timeData.minutes / 60) * 30;

  // 12 hour positions
  const hourMarks = Array.from({ length: 12 }, (_, i) => i * 30);
  // 60 minute ticks
  const minuteTicks = Array.from({ length: 60 }, (_, i) => i * 6);

  return (
    <div
      className="relative flex items-center justify-center select-none"
      style={{ width: size, height: size }}
    >
      {/* Outer Watch Case Bezel with Brushed Metal Glow */}
      <svg
        viewBox="0 0 300 300"
        className="w-full h-full drop-shadow-[0_15px_35px_rgba(0,0,0,0.8)] filter"
      >
        <defs>
          {/* Bezel Metallic Radial Gradient */}
          <radialGradient id="bezel-grad" cx="50%" cy="50%" r="50%">
            <stop offset="85%" stopColor="#1a1a24" />
            <stop offset="93%" stopColor="#2e3040" />
            <stop offset="97%" stopColor="#0d0d12" />
            <stop offset="100%" stopColor="#3a3d52" />
          </radialGradient>

          {/* Dial Face Dark Texture */}
          <radialGradient id="dial-grad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#0c0d12" />
            <stop offset="70%" stopColor="#08080c" />
            <stop offset="100%" stopColor="#050508" />
          </radialGradient>

          {/* Lume Glow Filter */}
          <filter id="lume-glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="1.5" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>

          {/* Hand Metallic Gradient */}
          <linearGradient id="hand-grad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="50%" stopColor="#d1d5db" />
            <stop offset="100%" stopColor="#9ca3af" />
          </linearGradient>

          {/* Pink Second Hand Gradient */}
          <linearGradient id="second-hand-grad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#ff7096" />
            <stop offset="100%" stopColor="#d4547e" />
          </linearGradient>
        </defs>

        {/* 1. Outer Bezel Ring */}
        <circle cx="150" cy="150" r="148" fill="url(#bezel-grad)" stroke="#3f4357" strokeWidth="2" />
        <circle cx="150" cy="150" r="142" fill="none" stroke="#12131a" strokeWidth="3" />
        <circle cx="150" cy="150" r="139" fill="url(#dial-grad)" stroke="#222533" strokeWidth="1.5" />

        {/* 2. Minute Ticks (60 marks) */}
        {minuteTicks.map((angle, i) => {
          if (i % 5 === 0) return null; // Hour marks take precedence
          return (
            <line
              key={i}
              x1="150"
              y1="17"
              x2="150"
              y2="22"
              stroke="rgba(255, 255, 255, 0.25)"
              strokeWidth="1"
              transform={`rotate(${angle} 150 150)`}
            />
          );
        })}

        {/* 3. Hour Markers (12 prominent arrow/triangle markers with luminous glow) */}
        {hourMarks.map((angle, i) => {
          if (i === 0) {
            // 12 o'clock double luminous index
            return (
              <g key={i} transform={`rotate(${angle} 150 150)`}>
                <rect x="145" y="18" width="3.5" height="15" rx="1" fill="#ffffff" filter="url(#lume-glow)" />
                <rect x="151.5" y="18" width="3.5" height="15" rx="1" fill="#ffffff" filter="url(#lume-glow)" />
              </g>
            );
          }

          if (i === 3 || i === 9) {
            // 3 and 9 o'clock index
            return (
              <g key={i} transform={`rotate(${angle} 150 150)`}>
                <polygon points="150,18 155,30 145,30" fill="#ffffff" filter="url(#lume-glow)" />
              </g>
            );
          }

          if (i === 6) {
            // 6 o'clock index
            return (
              <g key={i} transform={`rotate(${angle} 150 150)`}>
                <polygon points="150,18 155,30 145,30" fill="#ffffff" filter="url(#lume-glow)" />
              </g>
            );
          }

          // Other Hour Markers (1, 2, 4, 5, 7, 8, 10, 11)
          return (
            <g key={i} transform={`rotate(${angle} 150 150)`}>
              <polygon points="150,18 154,28 146,28" fill="#ffffff" filter="url(#lume-glow)" />
            </g>
          );
        })}

        {/* 4. Left Subdial (Moon / Day-Night Phase at 9 o'clock) */}
        <g transform="translate(100, 150)">
          <circle cx="0" cy="0" r="22" fill="#090a0f" stroke="rgba(255,255,255,0.12)" strokeWidth="1" />
          <text x="0" y="-12" textAnchor="middle" fill="#6b7280" fontSize="6" fontFamily="monospace" fontWeight="bold">
            MOON
          </text>
          {/* Day / Night Crescent */}
          <path
            d="M 0,-10 A 10,10 0 0,1 0,10 A 10,10 0 0,0 0,-10"
            fill={timeData.isNight ? '#38bdf8' : '#fbbf24'}
            opacity="0.85"
          />
          <circle cx="0" cy="0" r="2" fill="#d4547e" />
        </g>

        {/* 5. Right Date Window Complication (at 3 o'clock) */}
        <g transform="translate(200, 150)">
          {/* Outer Date Frame */}
          <rect x="-18" y="-10" width="36" height="20" rx="3" fill="#090a0e" stroke="rgba(255,255,255,0.18)" strokeWidth="1" />
          {/* Day of week (e.g. WED) */}
          <text x="-7" y="-2" textAnchor="middle" fill="#9ca3af" fontSize="6.5" fontFamily="monospace" fontWeight="bold">
            {timeData.dayName}
          </text>
          {/* Date number (e.g. 19) */}
          <text x="7" y="4" textAnchor="middle" fill="#ffffff" fontSize="10" fontFamily="sans-serif" fontWeight="900">
            {timeData.dayNumber}
          </text>
        </g>

        {/* 6. Watch Dial Brand Text (Casablanca GMT+1) */}
        <text
          x="150"
          y="205"
          textAnchor="middle"
          fill="rgba(255,255,255,0.75)"
          fontSize="8"
          fontFamily="monospace"
          fontWeight="bold"
          letterSpacing="2.5"
        >
          CASABLANCA
        </text>
        <text
          x="150"
          y="216"
          textAnchor="middle"
          fill="#d4547e"
          fontSize="5.5"
          fontFamily="monospace"
          fontWeight="semibold"
          letterSpacing="1.5"
        >
          GMT +1 · LIVE TIME
        </text>

        {/* 7. Hour Hand */}
        <g transform={`rotate(${hourAngle} 150 150)`}>
          {/* Sword Shape with Inset Lume */}
          <polygon
            points="148,150 148,85 150,75 152,85 152,150"
            fill="url(#hand-grad)"
            stroke="#1f2937"
            strokeWidth="0.8"
          />
          {/* Inset Luminous Core */}
          <line x1="150" y1="135" x2="150" y2="87" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" filter="url(#lume-glow)" />
          {/* Counterbalance tail */}
          <polygon points="148,150 149,165 151,165 152,150" fill="#4b5563" />
        </g>

        {/* 8. Minute Hand */}
        <g transform={`rotate(${minuteAngle} 150 150)`}>
          {/* Longer Arrow Shape */}
          <polygon
            points="148.5,150 148.5,55 150,42 151.5,55 151.5,150"
            fill="url(#hand-grad)"
            stroke="#111827"
            strokeWidth="0.8"
          />
          {/* Inset Luminous Core */}
          <line x1="150" y1="135" x2="150" y2="58" stroke="#ffffff" strokeWidth="2.2" strokeLinecap="round" filter="url(#lume-glow)" />
          {/* Counterbalance tail */}
          <polygon points="148.5,150 149,168 151,168 151.5,150" fill="#4b5563" />
        </g>

        {/* 9. Second Hand (Smooth Sweeping Hand with Glowing Tip) */}
        <g transform={`rotate(${secondAngle} 150 150)`}>
          {/* Main Needle */}
          <line x1="150" y1="180" x2="150" y2="35" stroke="url(#second-hand-grad)" strokeWidth="1.2" />
          {/* Arrow Tip */}
          <polygon points="148,45 152,45 150,30" fill="#ff7096" filter="url(#lume-glow)" />
          {/* Counterweight Disc */}
          <circle cx="150" cy="168" r="4.5" fill="#d4547e" />
        </g>

        {/* 10. Center Pinion Cap */}
        <circle cx="150" cy="150" r="6" fill="#1f2430" stroke="#d1d5db" strokeWidth="1" />
        <circle cx="150" cy="150" r="3" fill="#d4547e" />
        <circle cx="150" cy="150" r="1" fill="#ffffff" />
      </svg>
    </div>
  );
}
