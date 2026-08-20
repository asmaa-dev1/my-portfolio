import React, { useState } from 'react';
import { ArrowDown, Code2, Sparkles, Terminal, FileText, ChevronRight, Download } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { portfolioData } from '../data/portfolioData';
import { scrollToSection } from '../utils/navigation';
import ResumeModal from './ResumeModal';

export default function Hero() {
  const { t } = useTranslation();
  const [isResumeModalOpen, setIsResumeModalOpen] = useState(false);

  const firstNameLetters = "ASMAA".split('');
  const lastNameLetters = "EL HINT".split('');

  const marqueeKeywordsTop = [
    'Full-Stack Developer',
    'React.js Specialist',
    'Node.js & Python',
    'Laravel Architecture',
    'API Integrations',
    'Agile / Scrum Certified',
    'Database Optimization',
    'Task Automation'
  ];

  const marqueeKeywordsBottom = [
    'Problem Solver',
    'Clean Architecture',
    'Responsive Design',
    'Performance First',
    'Team Collaboration',
    'High Velocity Dev',
    'Security Conscious',
    'Continuous Learner'
  ];

  return (
    <section id="home" className="min-h-screen relative flex flex-col justify-between pt-28 pb-12 overflow-hidden">
      {/* --------------------------------------------------------------------------
          ORIGINAL DEEP PURPLE & ROSE AURORA BACKGROUND (PRESERVED 100%)
          -------------------------------------------------------------------------- */}
      <div className="absolute inset-0 pointer-events-none -z-10 overflow-hidden">
        {/* Deep Dark Space Background */}
        <div className="absolute inset-0 bg-[#07070a] dark:bg-[#07070a] bg-[#fbfbfe] transition-colors duration-300" />
        
        {/* Subtle Geometric Background Dot Matrix */}
        <div className="absolute inset-0 bg-[radial-gradient(#d4547e_1px,transparent_1px)] [background-size:24px_24px] opacity-10 dark:opacity-10 opacity-20 pointer-events-none" />

        {/* Dynamic Dual Gradient Beam Grid */}
        <svg
          className="absolute -top-40 left-1/2 -translate-x-1/2 w-[1400px] h-[900px] pointer-events-none opacity-35 dark:opacity-35 opacity-20"
          viewBox="0 0 1000 600"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g opacity="0.8">
            <path
              d="M100 0 L500 600 L900 0"
              stroke="url(#beam-gradient)"
              strokeWidth="1.5"
              strokeDasharray="6 6"
            />
            <path
              d="M250 0 L500 600 L750 0"
              stroke="url(#beam-gradient)"
              strokeWidth="1"
            />
            <circle
              cx="500"
              cy="250"
              r="280"
              fill="url(#aurora-radial)"
              opacity="0.4"
            />
          </g>
          <defs>
            <radialGradient
              id="aurora-radial"
              cx="0"
              cy="0"
              r="1"
              gradientUnits="userSpaceOnUse"
              gradientTransform="translate(355 115) rotate(90) scale(765 735)"
            >
              <stop offset="0.06" stopColor="#d4547e" />
              <stop offset="0.25" stopColor="#6344F5" />
              <stop offset="0.45" stopColor="#18CCFC" stopOpacity="0" />
            </radialGradient>

            <linearGradient id="beam-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#18CCFC" stopOpacity="0" />
              <stop offset="25%" stopColor="#18CCFC" />
              <stop offset="60%" stopColor="#6344F5" />
              <stop offset="90%" stopColor="#d4547e" />
              <stop offset="100%" stopColor="#d4547e" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Floating Micro-particles */}
      <div className="absolute top-[18%] left-[12%] w-1.5 h-1.5 rounded-full bg-[#d4547e]/40 float-slow pointer-events-none" />
      <div className="absolute top-[25%] right-[15%] w-2 h-2 rounded-full bg-[#18CCFC]/40 float-slow pointer-events-none" style={{ animationDelay: '1.2s' }} />
      <div className="absolute top-[70%] left-[18%] w-1 h-1 rounded-full bg-[#6344F5]/40 float-slow pointer-events-none" style={{ animationDelay: '2.4s' }} />
      <div className="absolute top-[65%] right-[20%] w-1.5 h-1.5 rounded-full bg-[#d4547e]/30 float-slow pointer-events-none" style={{ animationDelay: '0.8s' }} />

      {/* Hero Ambient Glow Orb */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-tr from-[#d4547e]/15 via-[#6344F5]/10 to-transparent rounded-full blur-3xl pointer-events-none" />

      {/* Main Content Container with Staggered Cascading Reveal */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto flex flex-col items-center">
        {/* Availability Badge */}
        <div className="reveal-fade-up delay-100 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] dark:bg-white/[0.04] bg-slate-900/[0.04] border border-white/10 dark:border-white/10 border-slate-200 backdrop-blur-md mb-6 shadow-inner">
          <span className="relative flex h-2.5 w-2.5">
            <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 radar-pulse" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-400" />
          </span>
          <span className="text-xs font-semibold text-gray-300 dark:text-gray-300 text-slate-700 font-mono tracking-wide">
            {t('hero.available')}
          </span>
        </div>

        {/* Small Intro Line */}
        <p className="reveal-fade-up delay-200 text-xs md:text-sm uppercase tracking-[0.3em] font-semibold text-gray-400 dark:text-gray-400 text-slate-500 mb-3 font-mono">
          {t('hero.greeting')}
        </p>
        <span className="reveal-fade-up delay-200 w-12 h-px bg-gradient-to-r from-transparent via-[#d4547e] to-transparent mb-6 block" />

        {/* --------------------------------------------------------------------------
            KINETIC NAME REVEAL (Formatted: ASMAA EL HINT together)
            -------------------------------------------------------------------------- */}
        <h1 className="reveal-fade-up delay-300 text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight leading-none mb-6 select-none flex flex-wrap justify-center items-center gap-x-4 md:gap-x-6 gap-y-2">
          {/* First Name: ASMAA */}
          <span className="inline-flex whitespace-nowrap">
            {firstNameLetters.map((char, index) => (
              <span
                key={`first-${index}`}
                className="inline-block transition-transform duration-300 hover:scale-110 hover:-translate-y-2 cursor-default gradient-text"
              >
                {char}
              </span>
            ))}
          </span>

          {/* Last Name: EL HINT */}
          <span className="inline-flex whitespace-nowrap">
            {lastNameLetters.map((char, index) => (
              <span
                key={`last-${index}`}
                className={`inline-block transition-transform duration-300 hover:scale-110 hover:-translate-y-2 cursor-default ${
                  char === ' ' ? 'w-3 md:w-5' : 'text-white dark:text-white text-slate-900'
                }`}
              >
                {char}
              </span>
            ))}
          </span>
        </h1>

        {/* Subtitle / Role Headline */}
        <div className="reveal-fade-up delay-400 inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-white/[0.03] dark:bg-white/[0.03] bg-slate-900/[0.03] border border-white/10 dark:border-white/10 border-slate-200 backdrop-blur-md mb-6 shadow-sm">
          <Terminal className="w-4 h-4 text-[#d4547e]" />
          <span className="text-sm sm:text-base font-bold text-gray-200 dark:text-gray-200 text-slate-800 font-mono tracking-tight">
            {t('hero.role')}
          </span>
          <span className="text-xs px-2 py-0.5 rounded-full bg-[#d4547e]/15 text-[#d4547e] font-semibold border border-[#d4547e]/30">
            Casablanca, Morocco
          </span>
        </div>

        {/* Bio / Value Prop */}
        <p className="reveal-fade-up delay-500 text-base sm:text-lg text-gray-400 dark:text-gray-400 text-slate-600 max-w-2xl mx-auto leading-relaxed mb-10">
          {t('hero.description')}
        </p>

        {/* CTA Buttons */}
        <div className="reveal-fade-up delay-600 flex flex-wrap items-center justify-center gap-3.5 mb-16">
          {/* Button 1: Explore Work */}
          <a
            href="/projects"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('projects', '/projects');
            }}
            className="group relative inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-gradient-to-r from-[#d4547e] via-[#e07a9c] to-[#a83d62] text-white font-semibold text-sm shadow-xl shadow-[#d4547e]/20 hover:shadow-[#d4547e]/40 hover:scale-105 transition-all duration-300 no-underline cursor-pointer"
          >
            <span>{t('hero.exploreBtn')}</span>
            <ChevronRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
          </a>

          {/* Button 2: About Me */}
          <a
            href="/about"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('about', '/about');
            }}
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-[#111116] dark:bg-[#111116] bg-white border border-white/15 dark:border-white/15 border-slate-200 text-gray-200 dark:text-gray-200 text-slate-700 font-semibold text-sm hover:border-[#d4547e]/50 hover:bg-white/5 hover:text-white transition-all duration-300 no-underline shadow-lg cursor-pointer"
          >
            <Code2 className="w-4 h-4 text-[#d4547e]" />
            <span>{t('hero.aboutBtn')}</span>
          </a>

          {/* Button 3: View & Download CV */}
          <button
            onClick={() => setIsResumeModalOpen(true)}
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-[#111116] dark:bg-[#111116] bg-white border border-[#d4547e]/30 hover:border-[#d4547e] text-gray-200 dark:text-gray-200 text-slate-700 font-semibold text-sm hover:bg-[#d4547e]/10 hover:text-white transition-all duration-300 shadow-lg cursor-pointer hover:scale-105"
            title="View or Download CV (English & French)"
          >
            <FileText className="w-4 h-4 text-[#d4547e]" />
            <span>Resume / CV</span>
          </button>
        </div>
      </div>

      {/* --------------------------------------------------------------------------
          DUAL OVERLAPPING TILTED MARQUEE RIBBONS
          -------------------------------------------------------------------------- */}
      <div className="w-full relative py-12 md:py-16 overflow-hidden select-none pointer-events-none mt-2">
        {/* Ribbon 1: Original Deep Rose/Burgundy Gradient Tilted +3.5deg */}
        <div
          className="w-[160%] -left-[30%] relative py-3 md:py-4 bg-gradient-to-r from-pink-950 via-rose-800 to-pink-950 border-y border-rose-500/30 text-white/90 shadow-2xl"
          style={{ transform: 'rotate(3.5deg)' }}
        >
          <div className="marquee-container">
            <div className="marquee-track-reverse">
              {[...marqueeKeywordsTop, ...marqueeKeywordsTop, ...marqueeKeywordsTop, ...marqueeKeywordsTop].map((item, idx) => (
                <span key={`top-${idx}`} className="inline-flex items-center shrink-0">
                  <span className="uppercase font-bold tracking-wider text-xs md:text-sm px-6 whitespace-nowrap text-white">
                    {item}
                  </span>
                  <span className="text-[0.6rem] text-rose-300/70">◆</span>
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Ribbon 2: Original Dark Glass Card Tilted -3.5deg */}
        <div
          className="w-[160%] -left-[30%] relative py-3 md:py-4 bg-[#101015]/95 dark:bg-[#101015]/95 bg-slate-900/90 backdrop-blur-md border-y border-white/10 text-gray-300 shadow-2xl -mt-4"
          style={{ transform: 'rotate(-3.5deg)' }}
        >
          <div className="marquee-container">
            <div className="marquee-track-forward">
              {[...marqueeKeywordsBottom, ...marqueeKeywordsBottom, ...marqueeKeywordsBottom, ...marqueeKeywordsBottom].map((item, idx) => (
                <span key={`bot-${idx}`} className="inline-flex items-center shrink-0">
                  <span className="uppercase font-bold tracking-wider text-xs md:text-sm px-6 whitespace-nowrap text-gray-200">
                    {item}
                  </span>
                  <span className="text-[0.6rem] text-[#d4547e]/70">◆</span>
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Global Resume Modal for Hero */}
      <ResumeModal
        isOpen={isResumeModalOpen}
        onClose={() => setIsResumeModalOpen(false)}
      />
    </section>
  );
}
