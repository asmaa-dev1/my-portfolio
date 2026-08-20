import React, { useRef } from 'react';
import { MapPin, Clock, GraduationCap, Download, CheckCircle2, Quote, Sparkles, Award, Globe, Compass, ExternalLink } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { portfolioData } from '../data/portfolioData';
import Globe3D from './Globe3D';
import AnalogWatch from './AnalogWatch';
import { scrollToSection } from '../utils/navigation';

export default function AboutBento() {
  const { t } = useTranslation();
  const bentoRef = useRef(null);

  // Mouse Move Spotlight Tracker
  const handleMouseMove = (e) => {
    const cards = bentoRef.current?.querySelectorAll('.spotlight-card');
    cards?.forEach((card) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    });
  };

  return (
    <section id="about" className="py-24 md:py-32 relative" ref={bentoRef} onMouseMove={handleMouseMove}>
      <div className="max-w-6xl mx-auto px-6">
        {/* Section Heading */}
        <div className="mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] dark:bg-white/[0.04] bg-slate-900/[0.04] border border-white/10 dark:border-white/10 border-slate-200 text-xs font-mono text-[#d4547e] mb-3">
            <Sparkles className="w-3 h-3" />
            <span>{t('about.tag')}</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-white dark:text-white text-slate-900 tracking-tight">
            {t('about.title')}
          </h2>
          <div className="mt-3 h-1 w-20 rounded-full bg-gradient-to-r from-[#d4547e] to-[#6344F5]" />
        </div>

        {/* --------------------------------------------------------------------------
            BENTO GRID LAYOUT
            -------------------------------------------------------------------------- */}
        <div className="grid grid-cols-1 md:grid-cols-6 lg:grid-cols-12 gap-4">
          {/* Bento 1: Profile & Bio (Col 1-4 on lg) */}
          <div
            className="spotlight-card group md:col-span-6 lg:col-span-4 p-7 md:p-8 flex flex-col justify-between rounded-3xl border border-white/10 dark:border-white/10 border-slate-200 relative overflow-hidden"
            style={{ '--spotlight-color': 'rgba(212, 84, 126, 0.16)' }}
          >
            <div>
              <div className="flex items-center gap-4 mb-6">
                {/* Monogram Avatar with Glow Ring */}
                <div className="relative w-16 h-16 md:w-20 md:h-20 rounded-2xl p-[2px] bg-gradient-to-br from-[#d4547e] via-[#6344F5] to-[#18CCFC] shrink-0 shadow-lg group-hover:scale-105 transition-transform duration-300">
                  <div className="w-full h-full rounded-[14px] bg-[#111116] dark:bg-[#111116] bg-white flex items-center justify-center p-2">
                    <img src="/favicon.png" alt="Asmaa Elhint" className="w-full h-full object-contain" />
                  </div>
                </div>

                <div>
                  <h3 className="text-xl md:text-2xl font-bold text-white dark:text-white text-slate-900 leading-tight">
                    {portfolioData.personal.name}
                  </h3>
                  <p className="text-xs md:text-sm text-[#d4547e] font-mono mt-1 font-semibold">
                    {t('about.role')}
                  </p>
                </div>
              </div>

              <p className="text-sm md:text-base leading-relaxed text-gray-300 dark:text-gray-300 text-slate-600 mb-4">
                {t('about.bio')}
              </p>
            </div>

            <div className="pt-4 border-t border-white/10 dark:border-white/10 border-slate-200 flex items-center gap-2 text-xs font-mono text-gray-400 dark:text-gray-400 text-slate-500">
              <span className="text-emerald-400">●</span>
              <span>{t('about.availableWorldwide')}</span>
            </div>
          </div>

          {/* Bento 2: 3D Dotted Rotating Earth Globe (Col 5-8 on lg) */}
          <div
            className="spotlight-card group md:col-span-6 lg:col-span-4 p-6 flex flex-col justify-between rounded-3xl border border-white/10 dark:border-white/10 border-slate-200 relative overflow-hidden bg-[#08080c]"
            style={{ '--spotlight-color': 'rgba(24, 204, 252, 0.18)' }}
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-mono text-gray-400 dark:text-gray-400 text-slate-500 uppercase tracking-widest flex items-center gap-1.5">
                  <Globe className="w-3.5 h-3.5 text-[#18CCFC]" />
                  <span>{t('about.baseZone')}</span>
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  ● GMT+1
                </span>
              </div>

              <h4 className="text-lg md:text-xl font-bold text-white dark:text-white text-slate-900">
                Based in Casablanca, <span className="text-[#18CCFC]">available globally</span>
              </h4>
            </div>

            {/* 3D Rotating Dotted Earth Canvas */}
            <div className="py-2 flex items-center justify-center relative">
              <Globe3D size={240} />
            </div>

            <div className="pt-3 border-t border-white/10 dark:border-white/10 border-slate-200 flex items-center justify-between text-[11px] text-gray-400 dark:text-gray-400 text-slate-500 font-mono">
              <span>{t('about.casablanca')}</span>
              <span className="text-[#d4547e] font-semibold">Morocco 🇲🇦</span>
            </div>
          </div>

          {/* Bento 3: Education & Academic Path (Col 9-12 on lg) */}
          <div
            className="spotlight-card group md:col-span-6 lg:col-span-4 p-6 flex flex-col justify-between rounded-3xl border border-white/10 dark:border-white/10 border-slate-200 relative overflow-hidden"
            style={{ '--spotlight-color': 'rgba(99, 68, 245, 0.16)' }}
          >
            <div>
              <div className="flex items-center gap-2.5 mb-4">
                <div className="p-2 rounded-xl bg-[#6344F5]/10 text-[#6344F5]">
                  <GraduationCap className="w-5 h-5" />
                </div>
                <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#6344F5]">
                  {t('about.educationTag')}
                </span>
              </div>

              <div className="space-y-3">
                {portfolioData.education.map((edu, idx) => (
                  <div key={idx} className="p-3 rounded-xl bg-white/[0.03] dark:bg-white/[0.03] bg-slate-50 border border-white/5 dark:border-white/5 border-slate-200 hover:border-white/15 transition-colors">
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <p className="text-xs md:text-sm font-bold text-white dark:text-white text-slate-900 leading-tight">
                          {edu.degree}
                        </p>
                        <p className="text-[11px] text-gray-400 dark:text-gray-400 text-slate-500 mt-0.5">{edu.institution}</p>
                      </div>
                      <span className="text-[9px] font-mono font-semibold text-emerald-400 bg-emerald-500/10 rounded-full px-2 py-0.5 shrink-0 border border-emerald-500/20">
                        {edu.period}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-white/10 dark:border-white/10 border-slate-200 flex items-center justify-between text-[11px] text-gray-400 dark:text-gray-400 text-slate-500 font-mono">
              <span>Hassan II University</span>
              <span className="text-[#6344F5] font-semibold">Casablanca</span>
            </div>
          </div>

          {/* Bento 4: Available for Work & Resume Download (Col 1-4 on lg) */}
          <div
            className="spotlight-card group md:col-span-6 lg:col-span-4 p-6 md:p-8 flex flex-col justify-between conic-border-glow rounded-3xl border border-white/10 dark:border-white/10 border-slate-200"
            style={{ '--spotlight-color': 'rgba(34, 197, 94, 0.15)' }}
          >
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 mb-4">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 radar-pulse" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
                </span>
                <span className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-wide">
                  {t('about.availableTag')}
                </span>
              </div>

              <h3 className="text-2xl md:text-3xl font-extrabold text-white dark:text-white text-slate-900 leading-tight mb-2">
                {t('about.haveVision')}{' '}
                <span className="gradient-text">{t('about.letsBuild')}</span>{' '}
                <span className="italic font-serif text-gray-400 dark:text-gray-400 text-slate-500">{t('about.together')}</span>
              </h3>

              <p className="text-xs md:text-sm text-gray-300 dark:text-gray-300 text-slate-600 max-w-lg leading-relaxed mt-2">
                {t('about.availableDesc')}
              </p>
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-2.5">
              <a
                href="/contact"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection('contact', '/contact');
                }}
                className="px-4 py-2 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs transition-all duration-200 shadow-lg shadow-emerald-600/20 no-underline flex items-center gap-1.5 cursor-pointer"
              >
                <span>{t('about.letsTalk')}</span>
              </a>

              <a
                href="/cv_asmaa_elhint_en.pdf"
                download="CV_Asmaa_Elhint_EN.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="px-3.5 py-2 rounded-full bg-white/5 dark:bg-white/5 bg-slate-100 border border-white/15 dark:border-white/15 border-slate-200 text-gray-200 dark:text-gray-200 text-slate-700 font-semibold text-xs transition-all duration-200 hover:border-[#d4547e] hover:text-white no-underline flex items-center gap-1.5 cursor-pointer"
                title="Download CV in English"
              >
                <Download className="w-3.5 h-3.5 text-[#d4547e]" />
                <span>CV (EN)</span>
              </a>

              <a
                href="/cv_asmaa_elhint_fr.pdf"
                download="CV_Asmaa_Elhint_FR.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="px-3.5 py-2 rounded-full bg-white/5 dark:bg-white/5 bg-slate-100 border border-white/15 dark:border-white/15 border-slate-200 text-gray-200 dark:text-gray-200 text-slate-700 font-semibold text-xs transition-all duration-200 hover:border-[#3b82f6] hover:text-white no-underline flex items-center gap-1.5 cursor-pointer"
                title="Télécharger le CV en Français"
              >
                <Download className="w-3.5 h-3.5 text-[#3b82f6]" />
                <span>CV (FR)</span>
              </a>

              <a
                href="/cv_asmaa_elhint_de.pdf"
                download="CV_Asmaa_Elhint_DE.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="px-3.5 py-2 rounded-full bg-white/5 dark:bg-white/5 bg-slate-100 border border-white/15 dark:border-white/15 border-slate-200 text-gray-200 dark:text-gray-200 text-slate-700 font-semibold text-xs transition-all duration-200 hover:border-[#f59e0b] hover:text-white no-underline flex items-center gap-1.5 cursor-pointer"
                title="Lebenslauf auf Deutsch herunterladen"
              >
                <Download className="w-3.5 h-3.5 text-[#f59e0b]" />
                <span>CV (DE)</span>
              </a>
            </div>
          </div>

          {/* Bento 5: Luxury Casablanca Analog Clock ("had lmagana") (Col 5-8 on lg) */}
          <div
            className="spotlight-card group md:col-span-6 lg:col-span-4 p-6 flex flex-col justify-between items-center rounded-3xl border border-white/10 dark:border-white/10 border-slate-200 relative overflow-hidden bg-[#07070a]"
            style={{ '--spotlight-color': 'rgba(212, 84, 126, 0.2)' }}
          >
            {/* Ambient Background Radial Glow */}
            <div className="absolute inset-0 bg-radial-gradient from-[#d4547e]/10 via-transparent to-transparent pointer-events-none" />

            <div className="w-full flex items-center justify-between mb-2 relative z-10">
              <span className="text-[11px] font-mono text-gray-400 dark:text-gray-400 text-slate-500 uppercase tracking-widest flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-[#d4547e]" />
                <span>{t('about.localTime')}</span>
              </span>
              <span className="text-[10px] font-mono text-[#d4547e] px-2 py-0.5 rounded-full bg-[#d4547e]/10 border border-[#d4547e]/20 font-bold">
                CASABLANCA
              </span>
            </div>

            {/* High-Fidelity Realistic Swiss Watch Face */}
            <div className="my-2 relative z-10 hover:scale-105 transition-transform duration-500">
              <AnalogWatch size={225} />
            </div>

            <div className="w-full pt-3 border-t border-white/10 dark:border-white/10 border-slate-200 flex items-center justify-between text-[11px] text-gray-400 dark:text-gray-400 text-slate-500 font-mono relative z-10">
              <span>Timezone: Africa/Casablanca</span>
              <span className="text-emerald-400 font-bold">● Active 60fps</span>
            </div>
          </div>

          {/* Bento 6: Philosophy Quote Card (Col 9-12 on lg) */}
          <div
            className="spotlight-card group md:col-span-6 lg:col-span-4 p-6 md:p-8 flex flex-col justify-between rounded-3xl border border-white/10 dark:border-white/10 border-slate-200"
            style={{ '--spotlight-color': 'rgba(212, 84, 126, 0.14)' }}
          >
            <div className="relative">
              <Quote className="w-8 h-8 text-[#d4547e]/30 mb-3" />
              <p className="text-xl md:text-2xl font-serif italic text-white dark:text-white text-slate-900 leading-snug font-medium">
                Real artists ship.
              </p>
              <p className="text-sm font-serif italic text-gray-300 dark:text-gray-300 text-slate-600 mt-2 leading-relaxed">
                {t('about.philosophy')}
              </p>
              <p className="text-xs font-mono text-[#d4547e] mt-4 uppercase tracking-widest font-bold">
                — Asmaa Elhint Philosophy
              </p>
            </div>

            <div className="pt-4 border-t border-white/10 dark:border-white/10 border-slate-200 flex items-center gap-2">
              <span className="text-[11px] font-mono text-gray-400 dark:text-gray-400 text-slate-500">
                {t('about.languages')}
              </span>
            </div>
          </div>

          {/* --------------------------------------------------------------------------
              BENTO 7: 4 ORBITAL ROTATING IMPACT STATS (Col 1-12)
              -------------------------------------------------------------------------- */}
          <div
            className="spotlight-card group md:col-span-6 lg:col-span-12 p-6 md:p-8 rounded-3xl border border-white/10 dark:border-white/10 border-slate-200"
            style={{ '--spotlight-color': 'rgba(212, 84, 126, 0.12)' }}
          >
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
              {portfolioData.stats.map((stat, idx) => (
                <div
                  key={idx}
                  className="p-5 rounded-2xl bg-[#0b0b0f] dark:bg-[#0b0b0f] bg-slate-50 border border-white/5 dark:border-white/5 border-slate-200 hover:border-white/15 transition-all duration-300 flex flex-col items-center justify-center text-center relative overflow-hidden group/stat"
                >
                  {/* Rotating Orbital Circles */}
                  <div className="relative w-20 h-20 md:w-24 md:h-24 flex items-center justify-center mb-3">
                    <svg className="absolute inset-0 w-full h-full orbital-ring" viewBox="0 0 120 120">
                      <circle
                        cx="60"
                        cy="60"
                        r="50"
                        fill="none"
                        strokeWidth="1"
                        strokeDasharray="4 8"
                        stroke={stat.color}
                        opacity="0.3"
                      />
                    </svg>

                    {/* Orbiting Dot */}
                    <svg className="absolute inset-0 w-full h-full orbital-dot" viewBox="0 0 120 120">
                      <circle cx="60" cy="10" r="3" fill={stat.color} />
                    </svg>

                    {/* Counter Value */}
                    <span className="text-2xl md:text-3xl font-black font-mono tracking-tight" style={{ color: stat.color }}>
                      {stat.value}
                    </span>
                  </div>

                  <p className="text-xs md:text-sm font-semibold text-gray-300 dark:text-gray-300 text-slate-700">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

