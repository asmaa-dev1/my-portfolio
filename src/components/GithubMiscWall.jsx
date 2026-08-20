import React, { useState } from 'react';
import { Star, GitFork, Users } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { portfolioData } from '../data/portfolioData';
import { GithubIcon } from './SocialIcons';
import MiscStickerBoard from './MiscStickerBoard';

export default function GithubMiscWall() {
  const { t } = useTranslation();

  // Generate 52 weeks of GitHub Commit Blocks for the heatmap
  const generateWeeks = () => {
    const weeks = [];
    for (let w = 0; w < 44; w++) {
      const days = [];
      for (let d = 0; d < 7; d++) {
        const level = Math.floor(Math.random() * 4); // 0 to 3
        days.push(level);
      }
      weeks.push(days);
    }
    return weeks;
  };

  const [heatmap] = useState(generateWeeks());

  const getHeatmapColor = (level) => {
    switch (level) {
      case 1:
        return 'bg-[#d4547e]/30 border-[#d4547e]/40';
      case 2:
        return 'bg-[#d4547e]/60 border-[#d4547e]/70';
      case 3:
        return 'bg-[#d4547e] border-rose-300';
      default:
        return 'bg-white/[0.04] dark:bg-white/[0.04] bg-slate-200 border-white/5 dark:border-white/5 border-slate-300';
    }
  };

  return (
    <section className="py-24 md:py-32 relative bg-[#07070a]/60 dark:bg-[#07070a]/60 bg-slate-100/50">
      <div className="max-w-6xl mx-auto px-6 space-y-24">
        {/* Section 1: GitHub Activity & Open Source Contributions */}
        <div id="github" className="scroll-mt-24">
          <div className="mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] dark:bg-white/[0.04] bg-slate-200 border border-white/10 dark:border-white/10 border-slate-300 text-xs font-mono text-[#d4547e] mb-3">
              <GithubIcon className="w-3.5 h-3.5" />
              <span>{t('githubWall.tag')}</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-black text-white dark:text-white text-slate-900 tracking-tight">
              {t('githubWall.title')}
            </h2>
            <div className="mt-3 h-1 w-20 rounded-full bg-gradient-to-r from-[#d4547e] to-[#6344F5]" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* GitHub Calendar Heatmap */}
            <div className="spotlight-card lg:col-span-8 p-6 md:p-8 rounded-3xl">
              <div className="flex items-center justify-between gap-4 mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-white/5 dark:bg-white/5 bg-slate-100 border border-white/10 dark:border-white/10 border-slate-200 flex items-center justify-center text-white dark:text-white text-slate-900">
                    <GithubIcon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white dark:text-white text-slate-900 leading-tight">
                      @ASMAA EL HINT
                    </h3>
                    <p className="text-xs text-gray-400 dark:text-gray-400 text-slate-500 font-mono">
                      {t('githubWall.subtitle')}
                    </p>
                  </div>
                </div>

                <a
                  href={portfolioData.personal.github}
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-1.5 rounded-full text-xs font-mono font-semibold bg-white/5 dark:bg-white/5 bg-slate-100 border border-white/10 dark:border-white/10 border-slate-200 hover:bg-white/10 text-gray-200 dark:text-gray-200 text-slate-700 transition-colors no-underline cursor-pointer"
                >
                  {t('githubWall.viewGithub')}
                </a>
              </div>

              {/* Heatmap Grid */}
              <div className="overflow-x-auto pb-4">
                <div className="flex gap-1 min-w-[650px] justify-between">
                  {heatmap.map((week, wIdx) => (
                    <div key={wIdx} className="flex flex-col gap-1">
                      {week.map((level, dIdx) => (
                        <div
                          key={dIdx}
                          className={`w-3 h-3 rounded-[3px] border transition-colors ${getHeatmapColor(level)}`}
                          title={`Contribution Activity Level: ${level}`}
                        />
                      ))}
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-white/10 dark:border-white/10 border-slate-200 text-[11px] font-mono text-gray-400 dark:text-gray-400 text-slate-500">
                <span>{t('githubWall.yearlyActive')}</span>
                <div className="flex items-center gap-1.5">
                  <span>{t('githubWall.less')}</span>
                  <div className="w-2.5 h-2.5 rounded-[2px] bg-white/[0.04] dark:bg-white/[0.04] bg-slate-200" />
                  <div className="w-2.5 h-2.5 rounded-[2px] bg-[#d4547e]/30" />
                  <div className="w-2.5 h-2.5 rounded-[2px] bg-[#d4547e]/60" />
                  <div className="w-2.5 h-2.5 rounded-[2px] bg-[#d4547e]" />
                  <span>{t('githubWall.more')}</span>
                </div>
              </div>
            </div>

            {/* GitHub Stats Badges */}
            <div className="lg:col-span-4 flex flex-col gap-4">
              <div className="spotlight-card p-5 rounded-2xl flex items-center justify-between">
                <div>
                  <span className="text-xs font-mono text-gray-400 dark:text-gray-400 text-slate-500 block mb-1">{t('githubWall.repositories')}</span>
                  <span className="text-2xl font-black text-white dark:text-white text-slate-900 font-mono">18+</span>
                </div>
                <div className="p-3 rounded-xl bg-cyan-500/10 text-cyan-400">
                  <GitFork className="w-5 h-5" />
                </div>
              </div>

              <div className="spotlight-card p-5 rounded-2xl flex items-center justify-between">
                <div>
                  <span className="text-xs font-mono text-gray-400 dark:text-gray-400 text-slate-500 block mb-1">{t('githubWall.publicStars')}</span>
                  <span className="text-2xl font-black text-amber-400 font-mono">35+</span>
                </div>
                <div className="p-3 rounded-xl bg-amber-500/10 text-amber-400">
                  <Star className="w-5 h-5" />
                </div>
              </div>

              <div className="spotlight-card p-5 rounded-2xl flex items-center justify-between">
                <div>
                  <span className="text-xs font-mono text-gray-400 dark:text-gray-400 text-slate-500 block mb-1">{t('githubWall.followers')}</span>
                  <span className="text-2xl font-black text-purple-400 font-mono">40+</span>
                </div>
                <div className="p-3 rounded-xl bg-purple-500/10 text-purple-400">
                  <Users className="w-5 h-5" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Section 2: Misc Section (The Wall / Sticker Board with direct ID) */}
        <div id="wall" className="scroll-mt-24">
          <MiscStickerBoard />
        </div>
      </div>
    </section>
  );
}
