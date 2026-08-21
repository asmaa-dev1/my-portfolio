import React, { useRef } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import { Briefcase, Building2, Terminal, Shield, Activity, Cpu, CheckCircle2, MapPin } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { portfolioData } from '../data/portfolioData';

const expIcons = [
  <Terminal className="w-4 h-4 text-white" />,
  <Cpu className="w-4 h-4 text-white" />,
  <Shield className="w-4 h-4 text-white" />
];

export default function ExperienceTimeline() {
  const { t } = useTranslation();
  const containerRef = useRef(null);

  // Framer Motion spring-accelerated scroll tracking
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 60%', 'end 70%']
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 400,
    damping: 35,
    mass: 0.1,
    restDelta: 0.0001
  });

  const scaleY = smoothProgress;
  const beadTop = useTransform(smoothProgress, [0, 1], ['0%', '100%']);
  const beadOpacity = useTransform(smoothProgress, [0, 0.02, 0.98, 1], [0, 1, 1, 0.8]);

  return (
    <section id="experience" className="py-28 md:py-36 relative overflow-hidden" ref={containerRef}>
      {/* Ambient background glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-[#d4547e]/6 rounded-full blur-[160px] pointer-events-none aurora-orb" />
      <div className="absolute bottom-1/4 right-[10%] w-[500px] h-[500px] bg-[#6344F5]/6 rounded-full blur-[140px] pointer-events-none aurora-orb-reverse" />

      <div className="max-w-5xl mx-auto px-6 relative z-10">
        {/* Section Heading */}
        <div className="mb-24 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] dark:bg-white/[0.04] bg-slate-900/[0.04] border border-white/10 dark:border-white/10 border-slate-200 text-xs font-mono text-[#d4547e] mb-3">
            <Briefcase className="w-3.5 h-3.5" />
            <span>{t('experience.tag')}</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-white dark:text-white text-slate-900 tracking-tight">
            {t('experience.title')}
          </h2>
          <div className="mt-3 h-1 w-20 rounded-full bg-gradient-to-r from-[#d4547e] via-[#6344F5] to-[#18CCFC] mx-auto" />
        </div>

        {/* --------------------------------------------------------------------------
            CENTER TRACING BEAM TIMELINE
            -------------------------------------------------------------------------- */}
        <div className="relative pb-16">
          {/* 1. Static Guide Track Line */}
          <div className="absolute top-4 bottom-4 left-6 md:left-1/2 -translate-x-1/2 w-[1.5px] bg-white/10 dark:bg-white/10 bg-slate-300 pointer-events-none" />

          {/* 2. Fluid 60fps Framer Motion Laser Beam */}
          <motion.div
            style={{ scaleY, transformOrigin: 'top' }}
            className="absolute top-4 bottom-4 left-6 md:left-1/2 -translate-x-1/2 w-[2px] bg-gradient-to-b from-[#d4547e] via-[#6344F5] to-[#18CCFC] shadow-[0_0_15px_#d4547e] pointer-events-none z-10"
          />

          {/* 3. Traveling Neon Tip Bead with Pulse */}
          <motion.div
            style={{
              top: beadTop,
              opacity: beadOpacity
            }}
            className="absolute left-6 md:left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-white shadow-[0_0_20px_6px_#d4547e] flex items-center justify-center pointer-events-none z-20"
          >
            <div className="w-2 h-2 rounded-full bg-[#d4547e] animate-ping" />
          </motion.div>

          {/* 4. Experience Milestone Entries */}
          <div className="space-y-24 md:space-y-36 relative z-20">
            {portfolioData.experiences.map((exp, idx) => {
              const isEven = idx % 2 === 0;

              return (
                <MilestoneItem
                  key={idx}
                  exp={exp}
                  idx={idx}
                  isEven={isEven}
                  smoothProgress={smoothProgress}
                  totalCount={portfolioData.experiences.length}
                />
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

function MilestoneItem({ exp, idx, isEven, smoothProgress, totalCount }) {
  const threshold = (idx + 0.2) / totalCount;
  
  // Transform activation colors based on smoothProgress
  const iconScale = useTransform(
    smoothProgress,
    [threshold - 0.05, threshold, threshold + 0.1],
    [0.9, 1.15, 1.05]
  );

  const opacity = useTransform(
    smoothProgress,
    [threshold - 0.1, threshold + 0.05],
    [0.35, 1]
  );

  const y = useTransform(
    smoothProgress,
    [threshold - 0.1, threshold + 0.05],
    [15, 0]
  );

  return (
    <div
      className={`relative flex flex-col md:flex-row items-start ${
        isEven ? 'md:flex-row' : 'md:flex-row-reverse'
      } gap-6 md:gap-16 pl-16 md:pl-0 group`}
    >
      {/* Center Milestone Circular Badge */}
      <motion.div
        style={{ scale: iconScale }}
        className="absolute left-6 md:left-1/2 -translate-x-1/2 top-0 z-30 flex items-center justify-center"
      >
        {/* Main Circular Icon Marker */}
        <div
          className="w-12 h-12 rounded-full flex items-center justify-center shadow-2xl transition-all duration-300 relative z-10 p-2 bg-white border-2 overflow-hidden"
          style={{
            borderColor: exp.color,
            boxShadow: `0 0 0 4px #060608, 0 0 25px 4px ${exp.color}70`
          }}
        >
          {exp.logo ? (
            <img
              src={exp.logo}
              alt={exp.company}
              className="w-full h-full object-contain select-none"
            />
          ) : (
            expIcons[idx % expIcons.length]
          )}
        </div>
      </motion.div>

      {/* Clean Minimalist Typography Block */}
      <motion.div
        style={{ opacity, y }}
        className={`w-full md:w-[calc(50%-3.5rem)] ${
          isEven ? 'md:text-right' : 'md:text-left'
        }`}
      >
        {/* Period Date Tag */}
        <div
          className={`text-xs font-mono font-bold tracking-widest uppercase mb-1.5 flex items-center gap-2 ${
            isEven ? 'md:justify-end' : 'md:justify-start'
          }`}
          style={{ color: exp.color }}
        >
          <span>{exp.period}</span>
        </div>

        {/* Job Title */}
        <h3 className="text-xl md:text-2xl font-black text-white dark:text-white text-slate-900 tracking-tight mb-1">
          {exp.role}
        </h3>

        {/* Company Name & Duration */}
        <p className="text-sm font-semibold mb-3 flex items-center gap-2" style={{ color: exp.color, justifyContent: isEven ? 'flex-end' : 'flex-start' }}>
          <span>{exp.company}</span>
          <span className="text-gray-500">·</span>
          <span className="text-gray-400 dark:text-gray-400 text-slate-500 text-xs font-mono">{exp.duration}</span>
        </p>

        {/* Description */}
        <p className="text-xs md:text-sm text-gray-300 dark:text-gray-300 text-slate-600 leading-relaxed mb-4">
          {exp.description}
        </p>

        {/* Key Highlights */}
        <ul className={`space-y-2 mb-5 text-xs text-gray-400 dark:text-gray-400 text-slate-600 ${
          isEven ? 'md:flex md:flex-col md:items-end' : ''
        }`}>
          {exp.highlights.map((h, i) => (
            <li key={i} className={`flex items-start gap-2 ${isEven ? 'md:flex-row-reverse md:text-right' : ''}`}>
              <CheckCircle2 className="w-3.5 h-3.5 shrink-0 mt-0.5" style={{ color: exp.color }} />
              <span className="leading-relaxed">{h}</span>
            </li>
          ))}
        </ul>

        {/* Tech Stack Dot-Separated List */}
        <div
          className={`flex flex-wrap gap-x-2 gap-y-1 text-xs font-mono text-gray-400 dark:text-gray-400 text-slate-500 ${
            isEven ? 'md:justify-end' : 'md:justify-start'
          }`}
        >
          {exp.skills.map((skill, i) => (
            <span key={i} className="inline-flex items-center">
              <span className="hover:text-white transition-colors">{skill}</span>
              {i < exp.skills.length - 1 && <span className="text-gray-600 ml-2">·</span>}
            </span>
          ))}
        </div>
      </motion.div>

      {/* Empty Side for Symmetric Balance */}
      <div className="hidden md:block md:w-[calc(50%-3.5rem)]" />
    </div>
  );
}
