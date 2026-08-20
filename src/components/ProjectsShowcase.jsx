import React, { useState, useEffect } from 'react';
import { Layers, ArrowUpRight, CheckCircle2, Lock, Maximize2, Eye, X, Globe, Sparkles } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { portfolioData } from '../data/portfolioData';

export default function ProjectsShowcase() {
  const { t } = useTranslation();
  const [activeModalProject, setActiveModalProject] = useState(null);

  // Close lightbox on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setActiveModalProject(null);
      }
    };
    if (activeModalProject) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [activeModalProject]);

  return (
    <section id="projects" className="py-28 md:py-36 relative bg-[#07070a]/80 dark:bg-[#07070a]/80 bg-slate-100/60 overflow-hidden">
      {/* Background ambient aurora glows */}
      <div className="absolute top-1/4 -left-[10%] w-[650px] h-[650px] bg-[#d4547e]/8 rounded-full blur-[150px] pointer-events-none aurora-orb" />
      <div className="absolute bottom-1/4 -right-[10%] w-[700px] h-[700px] bg-[#f59e0b]/6 rounded-full blur-[160px] pointer-events-none aurora-orb-reverse" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-[#6344F5]/6 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        {/* Section Heading */}
        <div className="mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] dark:bg-white/[0.04] bg-slate-200 border border-white/10 dark:border-white/10 border-slate-300 text-xs font-mono text-[#d4547e] mb-3">
            <Layers className="w-3.5 h-3.5" />
            <span>{t('projects.tag')}</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-white dark:text-white text-slate-900 tracking-tight">
            {t('projects.title')}
          </h2>
          <div className="mt-3 h-1 w-20 rounded-full bg-gradient-to-r from-[#d4547e] to-[#f59e0b]" />
        </div>

        {/* Projects Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {portfolioData.projects.map((project, idx) => (
            <div
              key={project.id}
              className="spotlight-card group conic-border-glow rounded-3xl p-6 md:p-8 flex flex-col justify-between hover:shadow-2xl transition-all duration-300 relative overflow-hidden border border-white/10 dark:border-white/10 border-slate-200"
              style={{
                '--spotlight-color': `${project.accentColor}20`
              }}
            >
              <div>
                {/* Card Top Meta */}
                <div className="flex items-center justify-between gap-3 mb-4 pb-3 border-b border-white/10 dark:border-white/10 border-slate-200">
                  <div className="flex items-center gap-2.5">
                    <span
                      className="text-xs font-mono font-black px-2.5 py-1 rounded-lg"
                      style={{
                        backgroundColor: `${project.accentColor}20`,
                        color: project.accentColor
                      }}
                    >
                      0{idx + 1}
                    </span>
                    <span className="text-xs font-mono text-gray-400 dark:text-gray-400 text-slate-500 uppercase tracking-widest font-semibold">
                      {project.category}
                    </span>
                  </div>

                  <span className="text-xs font-mono text-gray-400 dark:text-gray-400 text-slate-500">
                    {project.period}
                  </span>
                </div>

                {/* Title & Subtitle */}
                <div className="flex items-start justify-between gap-4 mb-2">
                  <h3 className="text-2xl md:text-3xl font-black text-white dark:text-white text-slate-900 leading-tight">
                    {project.title}
                  </h3>
                  <div className="w-8 h-8 rounded-full border border-white/15 dark:border-white/15 border-slate-300 flex items-center justify-center shrink-0 group-hover:scale-110 group-hover:border-white/40 transition-all">
                    <ArrowUpRight className="w-4 h-4 text-gray-300 dark:text-gray-300 text-slate-700 group-hover:text-white dark:group-hover:text-white group-hover:text-slate-900" />
                  </div>
                </div>

                <p className="text-xs font-mono font-semibold mb-4" style={{ color: project.accentColor }}>
                  {project.subtitle}
                </p>

                <p className="text-sm text-gray-300 dark:text-gray-300 text-slate-600 leading-relaxed mb-6">
                  {project.description}
                </p>

                {/* Project Visual Showcase (Screenshot Mockup or 3D Abstract Devices) */}
                {project.image ? (
                  <div
                    onClick={() => setActiveModalProject(project)}
                    className="rounded-2xl mb-6 relative overflow-hidden shadow-2xl border border-white/10 dark:border-white/10 border-slate-300/80 bg-[#0c0d14] group/mockup cursor-pointer transition-all duration-300 hover:border-white/30 group-hover:shadow-[0_12px_40px_rgba(0,0,0,0.5)]"
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => e.key === 'Enter' && setActiveModalProject(project)}
                    title={t('projects.viewPreview', 'Aperçu Plein Écran')}
                  >
                    {/* Sleek Browser Window Top Bar */}
                    <div className="flex items-center justify-between px-3.5 py-2.5 bg-black/50 dark:bg-black/50 bg-slate-900/90 border-b border-white/10 backdrop-blur-md">
                      {/* Window Controls */}
                      <div className="flex items-center gap-1.5">
                        <div className="w-2.5 h-2.5 rounded-full bg-[#ef4444]/90" />
                        <div className="w-2.5 h-2.5 rounded-full bg-[#f59e0b]/90" />
                        <div className="w-2.5 h-2.5 rounded-full bg-[#10b981]/90" />
                      </div>

                      {/* Mockup Address Pill */}
                      <div className="flex items-center gap-1.5 px-3 py-0.5 rounded-md bg-white/[0.06] border border-white/10 text-[10px] font-mono text-gray-300 max-w-[220px] truncate">
                        <Lock className="w-2.5 h-2.5 text-emerald-400 shrink-0" />
                        <span className="truncate">
                          {project.id === 'jb-manager'
                            ? 'jbmanager.vtcfrance.app'
                            : project.id === 'secoreg-tracking'
                            ? 'secoreg.vtcfrance.app/tracking'
                            : project.id === 'seeward-threat-intel'
                            ? 'seeward.app/vulnerabilities'
                            : project.id === 'elite-solutions-portal'
                            ? 'elitesolutions.ma/teledeclaration'
                            : `${project.id}.app`}
                        </span>
                      </div>

                      {/* Expand Indicator */}
                      <div className="flex items-center gap-1 text-gray-400 group-hover/mockup:text-white transition-colors">
                        <Maximize2 className="w-3.5 h-3.5" />
                      </div>
                    </div>

                    {/* Screenshot Preview with Smooth Zoom */}
                    <div className="relative overflow-hidden aspect-[16/10] bg-[#08080c] flex items-start justify-center">
                      <img
                        src={project.image}
                        alt={`${project.title} screenshot`}
                        className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover/mockup:scale-[1.03]"
                        loading="lazy"
                      />

                      {/* Ambient Accent Radial Glow */}
                      <div
                        className="absolute inset-0 opacity-0 group-hover/mockup:opacity-100 transition-opacity duration-500 pointer-events-none"
                        style={{
                          background: `radial-gradient(circle at center, ${project.accentColor}20 0%, transparent 75%)`
                        }}
                      />

                      {/* Interactive Hover Pill Overlay */}
                      <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px] opacity-0 group-hover/mockup:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none">
                        <div className="px-4 py-2 rounded-full bg-black/85 border border-white/20 text-white text-xs font-semibold flex items-center gap-2 shadow-2xl transform translate-y-2 group-hover/mockup:translate-y-0 transition-transform duration-300">
                          <Eye className="w-3.5 h-3.5 text-[#d4547e]" />
                          <span>{t('projects.viewPreview', 'Aperçu Plein Écran')}</span>
                          <ArrowUpRight className="w-3.5 h-3.5 text-gray-400" />
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  /* 3D Device Screen Layered Illustration (Fallback for projects without dedicated screenshots) */
                  <div
                    className="rounded-2xl p-6 mb-6 relative overflow-hidden flex flex-col justify-center items-center shadow-2xl min-h-[240px]"
                    style={{
                      background: `linear-gradient(145deg, ${project.accentColor}22, #0a0a0f)`
                    }}
                  >
                    {/* Grid Dot Pattern */}
                    <div
                      className="absolute inset-0 opacity-15 pointer-events-none"
                      style={{
                        backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.6) 1px, transparent 1px)',
                        backgroundSize: '16px 16px'
                      }}
                    />

                    {/* 3 Layered Devices in 3D Perspective */}
                    <div className="flex items-end justify-center relative z-10 gap-3 pt-4 translate-y-3">
                      {/* Left Device */}
                      <div className="w-24 sm:w-28 md:w-32 rounded-2xl bg-[#08080c] p-2 border border-white/15 shadow-2xl transition-transform duration-500 group-hover:-translate-x-2 group-hover:-rotate-3">
                        <div className="w-full aspect-[9/18] rounded-xl bg-[#111118] p-2 flex flex-col justify-between relative overflow-hidden">
                          <div className="w-6 h-1 rounded-full bg-white/20 mx-auto mb-2" />
                          <div className="space-y-1.5">
                            <div className="h-1.5 w-3/4 rounded bg-white/20 shimmer-bg" />
                            <div className="h-1.5 w-1/2 rounded bg-white/10" />
                          </div>
                          <div className="p-1.5 rounded-lg bg-white/5 border border-white/10 text-center">
                            <span className="text-[8px] font-mono text-gray-400 block">Status</span>
                            <span className="text-[9px] font-bold text-emerald-400">Online</span>
                          </div>
                        </div>
                      </div>

                      {/* Center Main Device */}
                      <div className="w-28 sm:w-32 md:w-36 rounded-2xl bg-[#0a0a10] p-2.5 border-2 shadow-2xl z-10 transition-transform duration-500 group-hover:-translate-y-2" style={{ borderColor: `${project.accentColor}60` }}>
                        <div className="w-full aspect-[9/18] rounded-xl bg-[#12121c] p-2.5 flex flex-col justify-between relative overflow-hidden">
                          <div className="flex items-center justify-between pb-1 mb-2 border-b border-white/10">
                            <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                            <div className="w-8 h-1 rounded-full bg-white/30" />
                            <div className="w-1.5 h-1.5 rounded-full bg-white/20" />
                          </div>

                          <div className="space-y-2">
                            <div className="h-2 w-full rounded bg-white/20 shimmer-bg" />
                            <div className="h-2 w-4/5 rounded bg-white/10" />
                            <div className="p-2 rounded-lg bg-white/[0.04] border border-white/10">
                              <span className="text-[8px] font-mono text-gray-400 block">Metric</span>
                              <span className="text-[10px] font-bold text-white block truncate">{project.stat}</span>
                            </div>
                          </div>

                          <div className="pt-2 border-t border-white/10 flex justify-between items-center text-[8px] font-mono text-gray-400">
                            <span>API v2</span>
                            <span style={{ color: project.accentColor }}>● Active</span>
                          </div>
                        </div>
                      </div>

                      {/* Right Device */}
                      <div className="w-24 sm:w-28 md:w-32 rounded-2xl bg-[#08080c] p-2 border border-white/15 shadow-2xl transition-transform duration-500 group-hover:translate-x-2 group-hover:rotate-3">
                        <div className="w-full aspect-[9/18] rounded-xl bg-[#111118] p-2 flex flex-col justify-between relative overflow-hidden">
                          <div className="w-6 h-1 rounded-full bg-white/20 mx-auto mb-2" />
                          <div className="space-y-1.5">
                            <div className="h-1.5 w-2/3 rounded bg-white/20 shimmer-bg" />
                            <div className="h-1.5 w-1/3 rounded bg-white/10" />
                          </div>
                          <div className="p-1.5 rounded-lg bg-white/5 border border-white/10 text-center">
                            <span className="text-[8px] font-mono text-gray-400 block">Cloud</span>
                            <span className="text-[9px] font-bold text-cyan-400">Synced</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Rotating Circular Badge */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-20">
                      <div className="relative w-24 h-24 rounded-full bg-black/70 backdrop-blur-md border border-white/20 flex items-center justify-center shadow-2xl">
                        <svg viewBox="0 0 120 120" className="w-full h-full animate-spin-slow">
                          <defs>
                            <path id={`circle-path-${idx}`} d="M60,60 m-45,0 a45,45 0 1,1 90,0 a45,45 0 1,1 -90,0" />
                          </defs>
                          <text className="fill-white text-[10px] font-bold font-mono uppercase tracking-[0.28em]">
                            <textPath href={`#circle-path-${idx}`}>
                              {t('projects.exploreText')}
                            </textPath>
                          </text>
                        </svg>
                        <div className="absolute w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                          <ArrowUpRight className="w-4 h-4 text-white" />
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Key Features Bullet List */}
                <div className="space-y-2 mb-6">
                  {project.features.map((feat, fIdx) => (
                    <div key={fIdx} className="flex items-start gap-2.5 text-xs text-gray-300 dark:text-gray-300 text-slate-600">
                      <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" style={{ color: project.accentColor }} />
                      <span className="leading-relaxed">{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Technologies Badges */}
              <div className="flex flex-wrap gap-1.5 pt-4 border-t border-white/10 dark:border-white/10 border-slate-200">
                {project.technologies.map((tech, tIdx) => (
                  <span
                    key={tIdx}
                    className="px-3 py-1 rounded-full text-[11px] font-mono bg-white/[0.04] dark:bg-white/[0.04] bg-slate-100 border border-white/10 dark:border-white/10 border-slate-200 text-gray-300 dark:text-gray-300 text-slate-700"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* High-Resolution Screenshot Lightbox Modal */}
      {activeModalProject && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 bg-black/85 backdrop-blur-xl animate-fade-in"
          onClick={() => setActiveModalProject(null)}
        >
          <div
            className="relative w-full max-w-5xl bg-[#0e0f17] border border-white/20 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh] animate-scale-up"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between px-5 py-3.5 bg-black/60 border-b border-white/10">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-[#ef4444]" />
                  <div className="w-3 h-3 rounded-full bg-[#f59e0b]" />
                  <div className="w-3 h-3 rounded-full bg-[#10b981]" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white leading-none">
                    {activeModalProject.title}
                  </h4>
                  <p className="text-[11px] text-gray-400 font-mono mt-0.5">
                    {activeModalProject.subtitle}
                  </p>
                </div>
              </div>

              <button
                onClick={() => setActiveModalProject(null)}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-gray-300 hover:text-white flex items-center justify-center transition-colors"
                title={t('projects.close', 'Fermer')}
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Image Area */}
            <div className="overflow-auto p-3 sm:p-5 bg-[#08080c] flex items-center justify-center">
              <img
                src={activeModalProject.image}
                alt={`${activeModalProject.title} full interface`}
                className="w-full h-auto rounded-xl shadow-2xl border border-white/10 object-contain max-h-[72vh]"
              />
            </div>

            {/* Modal Footer */}
            <div className="flex flex-wrap items-center justify-between gap-3 px-5 py-3 bg-black/60 border-t border-white/10 text-xs">
              <div className="flex flex-wrap gap-1.5">
                {activeModalProject.technologies.map((tech, i) => (
                  <span
                    key={i}
                    className="px-2.5 py-0.5 rounded-full text-[10px] font-mono bg-white/5 border border-white/10 text-gray-300"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <button
                onClick={() => setActiveModalProject(null)}
                className="px-4 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white font-medium text-xs transition-colors"
              >
                {t('projects.close', 'Fermer')}
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

