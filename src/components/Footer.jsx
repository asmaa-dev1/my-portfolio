import React from 'react';
import { ArrowUp, Mail, Heart, Sparkles } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { portfolioData } from '../data/portfolioData';
import { GithubIcon, LinkedinIcon } from './SocialIcons';
import { scrollToSection } from '../utils/navigation';

export default function Footer() {
  const { t } = useTranslation();

  const scrollToTop = () => {
    scrollToSection('home', '/');
  };

  const navLinks = [
    { label: t('nav.home'), path: '/', id: 'home' },
    { label: t('nav.about'), path: '/about', id: 'about' },
    { label: t('nav.experience'), path: '/experience', id: 'experience' },
    { label: t('nav.skills'), path: '/skills', id: 'skills' },
    { label: t('nav.projects'), path: '/projects', id: 'projects' },
    { label: t('nav.certifications'), path: '/certifications', id: 'certifications' },
    { label: t('nav.wall'), path: '/wall', id: 'wall' },
    { label: t('nav.contact'), path: '/contact', id: 'contact' },
  ];

  return (
    <footer className="relative border-t border-white/10 dark:border-white/10 border-slate-200 bg-[#050507] dark:bg-[#050507] bg-slate-50 pt-16 pb-12 overflow-hidden transition-colors">
      {/* Top Border Glow Line */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#d4547e]/60 to-transparent" />

      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-white/10 dark:border-white/10 border-slate-200">
          {/* Col 1: Bio & Verse */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-white/5 dark:bg-white/5 bg-slate-200 border border-white/10 dark:border-white/10 border-slate-300 flex items-center justify-center p-1.5 shadow-sm">
                <img src="/favicon.png" alt="Asmaa Elhint" className="w-full h-full object-contain" />
              </div>
              <span className="text-lg font-bold text-white dark:text-white text-slate-900 tracking-wide">
                {portfolioData.personal.name}
              </span>
            </div>

            <p className="text-xs font-serif italic text-gray-400 dark:text-gray-400 text-slate-600 max-w-sm leading-relaxed">
              {t('footer.verse')}
            </p>

            <p className="text-xs text-gray-500 dark:text-gray-500 text-slate-500 font-mono">
              {t('footer.tagline')}
            </p>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="md:col-span-3">
            <h4 className="text-xs font-mono font-bold text-gray-200 dark:text-gray-200 text-slate-800 uppercase tracking-widest mb-4">
              {t('footer.navigation')}
            </h4>
            <ul className="space-y-2 text-xs">
              {navLinks.map((item) => (
                <li key={item.id}>
                  <a
                    href={item.path}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection(item.id, item.path);
                    }}
                    className="text-gray-400 dark:text-gray-400 text-slate-600 hover:text-[#d4547e] transition-colors no-underline cursor-pointer"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Social & Direct Links */}
          <div className="md:col-span-4 space-y-4">
            <h4 className="text-xs font-mono font-bold text-gray-200 dark:text-gray-200 text-slate-800 uppercase tracking-widest mb-4">
              {t('footer.connect')}
            </h4>

            <div className="flex gap-2">
              <a
                href={portfolioData.personal.github}
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-xl bg-white/5 dark:bg-white/5 bg-slate-200 border border-white/10 dark:border-white/10 border-slate-300 hover:border-[#d4547e] text-gray-300 dark:text-gray-300 text-slate-700 hover:text-white flex items-center justify-center transition-all duration-200"
                aria-label="GitHub"
              >
                <GithubIcon className="w-4 h-4" />
              </a>

              <a
                href={portfolioData.personal.linkedin}
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-xl bg-white/5 dark:bg-white/5 bg-slate-200 border border-white/10 dark:border-white/10 border-slate-300 hover:border-[#3b82f6] text-gray-300 dark:text-gray-300 text-slate-700 hover:text-white flex items-center justify-center transition-all duration-200"
                aria-label="LinkedIn"
              >
                <LinkedinIcon className="w-4 h-4" />
              </a>

              <a
                href={`mailto:${portfolioData.personal.email}`}
                className="w-10 h-10 rounded-xl bg-white/5 dark:bg-white/5 bg-slate-200 border border-white/10 dark:border-white/10 border-slate-300 hover:border-[#22c55e] text-gray-300 dark:text-gray-300 text-slate-700 hover:text-white flex items-center justify-center transition-all duration-200"
                aria-label="Email"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>

            <div className="pt-2 flex flex-wrap items-center gap-2">
              <a
                href="/cv_asmaa_elhint_en.pdf"
                download="CV_Asmaa_Elhint_EN.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="px-2.5 py-1 rounded-lg bg-white/5 dark:bg-white/5 bg-slate-200 hover:bg-white/10 text-gray-300 dark:text-gray-300 text-slate-700 hover:text-white text-[11px] font-mono font-semibold transition-colors no-underline flex items-center gap-1 border border-white/10 dark:border-white/10 border-slate-300"
              >
                <span>📄 CV (EN)</span>
              </a>
              <a
                href="/cv_asmaa_elhint_fr.pdf"
                download="CV_Asmaa_Elhint_FR.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="px-2.5 py-1 rounded-lg bg-white/5 dark:bg-white/5 bg-slate-200 hover:bg-white/10 text-gray-300 dark:text-gray-300 text-slate-700 hover:text-white text-[11px] font-mono font-semibold transition-colors no-underline flex items-center gap-1 border border-white/10 dark:border-white/10 border-slate-300"
              >
                <span>📄 CV (FR)</span>
              </a>
              <a
                href="/cv_asmaa_elhint_de.pdf"
                download="CV_Asmaa_Elhint_DE.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="px-2.5 py-1 rounded-lg bg-white/5 dark:bg-white/5 bg-slate-200 hover:bg-white/10 text-gray-300 dark:text-gray-300 text-slate-700 hover:text-white text-[11px] font-mono font-semibold transition-colors no-underline flex items-center gap-1 border border-white/10 dark:border-white/10 border-slate-300"
              >
                <span>📄 CV (DE)</span>
              </a>
            </div>

            <div className="text-xs font-mono text-gray-400 dark:text-gray-400 text-slate-500">
              <span>Location: Casablanca, Morocco 🇲🇦</span>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Back to Top */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-gray-500">
          <p>© {new Date().getFullYear()} Asmaa Elhint. {t('footer.allRights')}</p>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 dark:bg-white/5 bg-slate-200 border border-white/10 dark:border-white/10 border-slate-300 hover:bg-white/10 text-gray-300 dark:text-gray-300 text-slate-700 hover:text-white transition-all duration-200 group"
          >
            <span>{t('footer.backToTop')}</span>
            <ArrowUp className="w-3.5 h-3.5 transition-transform group-hover:-translate-y-0.5 text-[#d4547e]" />
          </button>
        </div>
      </div>
    </footer>
  );
}
