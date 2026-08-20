import React, { useState } from 'react';
import { Code, Terminal, Database, Wrench, Sparkles, Check } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { portfolioData } from '../data/portfolioData';

export default function SkillsGrid() {
  const { t } = useTranslation();
  const [activeCategory, setActiveCategory] = useState('All');

  const categoryIcons = {
    'Programming Languages': <Terminal className="w-4 h-4" />,
    'Frontend Development': <Code className="w-4 h-4" />,
    'Backend & Databases': <Database className="w-4 h-4" />,
    'Tools & Methodologies': <Wrench className="w-4 h-4" />
  };

  const allSkills = portfolioData.skillsCategories.flatMap((cat) =>
    cat.skills.map((s) => ({ ...s, category: cat.name }))
  );

  const displayedSkills =
    activeCategory === 'All'
      ? allSkills
      : allSkills.filter((s) => s.category === activeCategory);

  return (
    <section id="skills" className="py-24 md:py-32 relative overflow-hidden">
      {/* Ambient background glows */}
      <div className="absolute top-1/4 right-[5%] w-[500px] h-[500px] bg-gradient-to-br from-[#22c55e]/8 to-[#18CCFC]/8 rounded-full blur-[130px] pointer-events-none aurora-orb" />
      <div className="absolute bottom-10 left-[5%] w-[450px] h-[450px] bg-gradient-to-tr from-[#d4547e]/8 to-[#6344F5]/8 rounded-full blur-[120px] pointer-events-none aurora-orb-reverse" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        {/* Section Heading */}
        <div className="mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] dark:bg-white/[0.04] bg-slate-900/[0.04] border border-white/10 dark:border-white/10 border-slate-200 text-xs font-mono text-[#22c55e] mb-3">
            <Sparkles className="w-3 h-3" />
            <span>{t('skills.tag')}</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-white dark:text-white text-slate-900 tracking-tight">
            {t('skills.title')}
          </h2>
          <div className="mt-3 h-1 w-20 rounded-full bg-gradient-to-r from-[#22c55e] to-[#18CCFC]" />
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap gap-2 mb-10">
          <button
            onClick={() => setActiveCategory('All')}
            className={`px-4 py-2 rounded-full text-xs font-mono font-bold transition-all duration-200 ${
              activeCategory === 'All'
                ? 'bg-[#d4547e] text-white shadow-lg shadow-[#d4547e]/25'
                : 'bg-white/5 dark:bg-white/5 bg-slate-100 border border-white/10 dark:border-white/10 border-slate-200 text-gray-400 dark:text-gray-400 text-slate-600 hover:text-white dark:hover:text-white hover:text-slate-900 hover:bg-white/10'
            }`}
          >
            {t('skills.all')} ({allSkills.length})
          </button>

          {portfolioData.skillsCategories.map((cat) => (
            <button
              key={cat.name}
              onClick={() => setActiveCategory(cat.name)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-mono font-bold transition-all duration-200 ${
                activeCategory === cat.name
                  ? 'bg-white/20 dark:bg-white/20 bg-slate-900/10 border border-white/30 text-white dark:text-white text-slate-900 shadow-lg'
                  : 'bg-white/5 dark:bg-white/5 bg-slate-100 border border-white/10 dark:border-white/10 border-slate-200 text-gray-400 dark:text-gray-400 text-slate-600 hover:text-white dark:hover:text-white hover:text-slate-900 hover:bg-white/10'
              }`}
            >
              {categoryIcons[cat.name]}
              <span>{cat.name}</span>
            </button>
          ))}
        </div>

        {/* Skills Cards Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {displayedSkills.map((skill, idx) => (
            <div
              key={idx}
              className="spotlight-card group p-5 rounded-2xl flex flex-col items-center justify-center text-center transition-all duration-300 hover:-translate-y-1.5 hover:border-white/20 cursor-default"
              style={{
                '--spotlight-color': `${skill.color}25`
              }}
            >
              {/* Skill Glow Ring */}
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-3 transition-transform duration-300 group-hover:scale-110 shadow-lg"
                style={{
                  backgroundColor: `${skill.color}15`,
                  border: `1px solid ${skill.color}40`,
                  boxShadow: `0 0 15px -3px ${skill.color}30`
                }}
              >
                <span className="font-mono font-black text-sm" style={{ color: skill.color }}>
                  {skill.name.slice(0, 2).toUpperCase()}
                </span>
              </div>

              <h4 className="text-sm font-bold text-white dark:text-white text-slate-900 mb-1 group-hover:text-white dark:group-hover:text-white transition-colors">
                {skill.name}
              </h4>

              <span
                className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded-full border mt-1"
                style={{
                  color: skill.color,
                  backgroundColor: `${skill.color}10`,
                  borderColor: `${skill.color}25`
                }}
              >
                {skill.level}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
