import React from 'react';
import { PenLine, ArrowRight } from 'lucide-react';
import { navigateTo } from '../utils/navigation';

export default function MiscStickerBoard() {
  const handleCtaClick = (e) => {
    e.preventDefault();
    navigateTo('/wall');
  };

  return (
    <div className="w-full relative">
      {/* Sticker SVG Filter for White Cutline + Drop Shadow */}
      <svg width="0" height="0" className="absolute">
        <defs>
          <filter id="misc-image-sticker-cutline" x="-30%" y="-30%" width="160%" height="160%">
            <feMorphology in="SourceAlpha" result="DILATED" operator="dilate" radius="4" />
            <feFlood flood-color="#ffffff" result="WHITE" />
            <feComposite in="WHITE" in2="DILATED" operator="in" result="OUTLINE" />
            <feGaussianBlur in="OUTLINE" stdDeviation="2" result="BLUR" />
            <feOffset in="BLUR" dx="0" dy="5" result="SHADOW" />
            <feFlood flood-color="rgba(0,0,0,0.4)" result="SHADOW_COLOR" />
            <feComposite in="SHADOW_COLOR" in2="SHADOW" operator="in" result="COLORED_SHADOW" />
            <feMerge>
              <feMergeNode in="COLORED_SHADOW" />
              <feMergeNode in="OUTLINE" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
      </svg>

      {/* Section Header */}
      <div className="mb-6">
        <h3 className="text-2xl md:text-3xl font-black text-white dark:text-white text-slate-900 tracking-tight">
          Misc
        </h3>
        <div className="mt-2 h-1 w-12 rounded-full bg-[#d4547e]" />
      </div>

      {/* Sticker Board Canvas Container (Exact match to Screenshot 1) */}
      <div className="spotlight-card rounded-3xl p-6 md:p-10 relative overflow-hidden min-h-[500px] md:min-h-[560px] border border-white/10 dark:border-white/10 border-slate-300 bg-dots-pattern bg-[#0a0a0f] flex flex-col justify-between select-none">
        {/* Scattered Stickers Area */}
        <div className="relative w-full h-[400px] md:h-[460px]">
          {/* 1. Arabic Calligraphy Sticker */}
          <div 
            className="absolute cursor-default transition-transform duration-300 hover:scale-110"
            style={{ left: '3%', top: '3%', transform: 'rotate(-8deg)' }}
          >
            <div className="text-4xl md:text-5xl font-black text-white filter drop-shadow-[0_4px_10px_rgba(255,255,255,0.4)] px-3 py-1 bg-black/40 rounded-2xl border-2 border-white">
              س
            </div>
          </div>

          {/* 2. Hu Tao */}
          <div 
            className="absolute cursor-default transition-transform duration-300 hover:scale-110 z-10"
            style={{ left: '9%', top: '2%', transform: 'rotate(-4deg)' }}
          >
            <img 
              src="/misc/hutao.png" 
              alt="Hu Tao" 
              className="w-[85px] sm:w-[110px] md:w-[130px] h-auto object-contain"
              style={{ filter: 'url(#misc-image-sticker-cutline)' }}
              draggable="false"
            />
          </div>

          {/* 3. Aizen */}
          <div 
            className="absolute cursor-default transition-transform duration-300 hover:scale-110 z-10"
            style={{ left: '20%', top: '6%', transform: 'rotate(-3deg)' }}
          >
            <img 
              src="/misc/aizen.png" 
              alt="Aizen" 
              className="w-[100px] sm:w-[135px] md:w-[160px] h-auto object-contain"
              style={{ filter: 'url(#misc-image-sticker-cutline)' }}
              draggable="false"
            />
          </div>

          {/* 4. Flutter Bird */}
          <div 
            className="absolute cursor-default transition-transform duration-300 hover:scale-110 z-10"
            style={{ left: '44%', top: '3%', transform: 'rotate(2deg)' }}
          >
            <img 
              src="/misc/flutter.png" 
              alt="Flutter" 
              className="w-[65px] sm:w-[80px] md:w-[95px] h-auto object-contain"
              style={{ filter: 'url(#misc-image-sticker-cutline)' }}
              draggable="false"
            />
          </div>

          {/* 5. Gwen Stacy */}
          <div 
            className="absolute cursor-default transition-transform duration-300 hover:scale-110 z-10"
            style={{ left: '58%', top: '4%', transform: 'rotate(5deg)' }}
          >
            <img 
              src="/misc/gwen.png" 
              alt="Gwen" 
              className="w-[110px] sm:w-[145px] md:w-[170px] h-auto object-contain"
              style={{ filter: 'url(#misc-image-sticker-cutline)' }}
              draggable="false"
            />
          </div>

          {/* 6. Tung Mascot */}
          <div 
            className="absolute cursor-default transition-transform duration-300 hover:scale-110 z-10"
            style={{ left: '80%', top: '2%', transform: 'rotate(-3deg)' }}
          >
            <img 
              src="/misc/tung.png" 
              alt="Tung" 
              className="w-[70px] sm:w-[95px] md:w-[115px] h-auto object-contain"
              style={{ filter: 'url(#misc-image-sticker-cutline)' }}
              draggable="false"
            />
          </div>

          {/* 7. Itachi */}
          <div 
            className="absolute cursor-default transition-transform duration-300 hover:scale-110 z-10"
            style={{ left: '5%', top: '32%', transform: 'rotate(3deg)' }}
          >
            <img 
              src="/misc/itachi.png" 
              alt="Itachi" 
              className="w-[105px] sm:w-[140px] md:w-[165px] h-auto object-contain"
              style={{ filter: 'url(#misc-image-sticker-cutline)' }}
              draggable="false"
            />
          </div>

          {/* 8. Pain Quote Card */}
          <div 
            className="absolute cursor-default transition-transform duration-300 hover:scale-105 z-20"
            style={{ left: '25%', top: '38%', transform: 'rotate(-2deg)' }}
          >
            <div className="w-[150px] sm:w-[185px] md:w-[210px] rounded-2xl p-4 bg-[#111116]/95 backdrop-blur-md border border-white/20 shadow-2xl">
              <p className="text-xs sm:text-sm text-white font-medium leading-relaxed">
                痛みを知らぬ者に、本当の平和は分からん
              </p>
            </div>
          </div>

          {/* 9. Maki Zenin */}
          <div 
            className="absolute cursor-default transition-transform duration-300 hover:scale-110 z-10"
            style={{ left: '45%', top: '28%', transform: 'rotate(2deg)' }}
          >
            <img 
              src="/misc/maki.png" 
              alt="Maki" 
              className="w-[90px] sm:w-[125px] md:w-[145px] h-auto object-contain"
              style={{ filter: 'url(#misc-image-sticker-cutline)' }}
              draggable="false"
            />
          </div>

          {/* 10. Mikasa Ackerman */}
          <div 
            className="absolute cursor-default transition-transform duration-300 hover:scale-110 z-10"
            style={{ left: '65%', top: '36%', transform: 'rotate(4deg)' }}
          >
            <img 
              src="/misc/mikasa.png" 
              alt="Mikasa" 
              className="w-[95px] sm:w-[130px] md:w-[150px] h-auto object-contain"
              style={{ filter: 'url(#misc-image-sticker-cutline)' }}
              draggable="false"
            />
          </div>

          {/* 11. Sawako */}
          <div 
            className="absolute cursor-default transition-transform duration-300 hover:scale-110 z-10"
            style={{ left: '79%', top: '33%', transform: 'rotate(-2deg)' }}
          >
            <img 
              src="/misc/sawako.png" 
              alt="Sawako" 
              className="w-[100px] sm:w-[135px] md:w-[160px] h-auto object-contain"
              style={{ filter: 'url(#misc-image-sticker-cutline)' }}
              draggable="false"
            />
          </div>

          {/* 12. Kurapika */}
          <div 
            className="absolute cursor-default transition-transform duration-300 hover:scale-110 z-10"
            style={{ left: '4%', top: '64%', transform: 'rotate(-5deg)' }}
          >
            <img 
              src="/misc/kora.png" 
              alt="Kurapika" 
              className="w-[110px] sm:w-[150px] md:w-[175px] h-auto object-contain"
              style={{ filter: 'url(#misc-image-sticker-cutline)' }}
              draggable="false"
            />
          </div>

          {/* 13. Android Toolbot */}
          <div 
            className="absolute cursor-default transition-transform duration-300 hover:scale-110 z-10"
            style={{ left: '26%', top: '66%', transform: 'rotate(6deg)' }}
          >
            <img 
              src="/misc/android.png" 
              alt="Android" 
              className="w-[85px] sm:w-[115px] md:w-[135px] h-auto object-contain"
              style={{ filter: 'url(#misc-image-sticker-cutline)' }}
              draggable="false"
            />
          </div>

          {/* 14. Mikey */}
          <div 
            className="absolute cursor-default transition-transform duration-300 hover:scale-110 z-10"
            style={{ left: '46%', top: '63%', transform: 'rotate(-3deg)' }}
          >
            <img 
              src="/misc/mikey.png" 
              alt="Mikey" 
              className="w-[110px] sm:w-[150px] md:w-[175px] h-auto object-contain"
              style={{ filter: 'url(#misc-image-sticker-cutline)' }}
              draggable="false"
            />
          </div>

          {/* 15. Yuta Okkotsu */}
          <div 
            className="absolute cursor-default transition-transform duration-300 hover:scale-110 z-10"
            style={{ left: '68%', top: '67%', transform: 'rotate(4deg)' }}
          >
            <img 
              src="/misc/yuta.png" 
              alt="Yuta" 
              className="w-[110px] sm:w-[155px] md:w-[180px] h-auto object-contain"
              style={{ filter: 'url(#misc-image-sticker-cutline)' }}
              draggable="false"
            />
          </div>
        </div>

        {/* Bottom Call To Action Button (Direct navigation to /ruins page) */}
        <div className="flex justify-center mt-4">
          <a
            href="/ruins"
            onClick={(e) => {
              e.preventDefault();
              navigateTo('/ruins');
            }}
            className="group relative flex items-center gap-3 px-6 py-3 rounded-full bg-[#111116] dark:bg-[#111116] bg-white border border-white/20 dark:border-white/20 border-slate-300 shadow-xl hover:shadow-2xl hover:border-[#d4547e]/60 transition-all duration-300 no-underline cursor-pointer"
          >
            <PenLine className="w-4 h-4 text-[#d4547e] transition-transform duration-300 group-hover:rotate-12" />
            <span className="text-xs sm:text-sm text-gray-300 dark:text-gray-300 text-slate-700 group-hover:text-white transition-colors">
              wanna leave your mark?
            </span>
            <span className="text-xs sm:text-sm font-bold text-[#d4547e] group-hover:text-[#e07a9c] transition-colors flex items-center gap-1">
              <span>pin something on the visitor wall</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
            </span>
          </a>
        </div>
      </div>
    </div>
  );
}
