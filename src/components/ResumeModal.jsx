import React, { useEffect } from 'react';
import { FileText, Download, ExternalLink, X, Eye, CheckCircle, Sparkles } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function ResumeModal({ isOpen, onClose }) {
  const { t } = useTranslation();

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const resumes = [
    {
      lang: 'English',
      flag: '🇬🇧',
      title: 'English Resume (PDF)',
      subtitle: 'Full Stack Developer profile, experience, skills, and certifications.',
      color: '#d4547e',
      borderHover: 'hover:border-[#d4547e]/50',
      tagBg: 'bg-[#d4547e]/15 text-[#d4547e] border-[#d4547e]/30',
      btnGrad: 'bg-gradient-to-r from-[#d4547e] to-[#ba436c]',
      btnShadow: 'shadow-[#d4547e]/20',
      pdfPath: '/cv_asmaa_elhint_en.pdf',
      downloadName: 'CV_Asmaa_Elhint_EN.pdf',
      viewLabel: 'View Online',
      downloadLabel: 'Download PDF'
    },
    {
      lang: 'Français',
      flag: '🇫🇷',
      title: 'CV Français (PDF)',
      subtitle: 'Profil Développeuse Full Stack, parcours, compétences et diplômes.',
      color: '#3b82f6',
      borderHover: 'hover:border-[#3b82f6]/50',
      tagBg: 'bg-[#3b82f6]/15 text-[#3b82f6] border-[#3b82f6]/30',
      btnGrad: 'bg-gradient-to-r from-[#3b82f6] to-[#2563eb]',
      btnShadow: 'shadow-[#3b82f6]/20',
      pdfPath: '/cv_asmaa_elhint_fr.pdf',
      downloadName: 'CV_Asmaa_Elhint_FR.pdf',
      viewLabel: 'Voir en ligne',
      downloadLabel: 'Télécharger PDF'
    },
    {
      lang: 'Deutsch',
      flag: '🇩🇪',
      title: 'Deutscher Lebenslauf (PDF)',
      subtitle: 'Full-Stack-Entwicklerin Profil, Werdegang, Skills und Zertifikate.',
      color: '#f59e0b',
      borderHover: 'hover:border-[#f59e0b]/50',
      tagBg: 'bg-[#f59e0b]/15 text-[#f59e0b] border-[#f59e0b]/30',
      btnGrad: 'bg-gradient-to-r from-[#f59e0b] to-[#d97706]',
      btnShadow: 'shadow-[#f59e0b]/20',
      pdfPath: '/cv_asmaa_elhint_de.pdf',
      downloadName: 'CV_Asmaa_Elhint_DE.pdf',
      viewLabel: 'Online ansehen',
      downloadLabel: 'PDF herunterladen'
    }
  ];

  return (
    <div 
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div 
        className="w-full max-w-3xl p-6 sm:p-8 rounded-3xl bg-[#0f0f14] dark:bg-[#0f0f14] bg-white border border-white/15 dark:border-white/15 border-slate-200 shadow-2xl space-y-6 animate-in zoom-in-95 duration-200 text-left relative max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-start justify-between border-b border-white/10 dark:border-white/10 border-slate-100 pb-5">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#d4547e] via-[#6344F5] to-[#f59e0b] text-white flex items-center justify-center shadow-lg shadow-[#d4547e]/20">
              <FileText className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white dark:text-white text-slate-900 leading-tight">
                Asmaa Elhint — Official Resume / CV
              </h3>
              <p className="text-xs text-gray-400 dark:text-gray-400 text-slate-500 font-mono mt-0.5">
                Full Stack Developer • Casablanca, Morocco
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 dark:bg-white/10 bg-slate-100 hover:bg-white/20 text-gray-300 dark:text-gray-300 text-slate-700 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
            title="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <p className="text-xs text-gray-300 dark:text-gray-300 text-slate-600 leading-relaxed">
          Choose your preferred language (English, French, or German) to view or download the official high-resolution PDF resume:
        </p>

        {/* 3 Resume Cards: EN, FR, DE */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {resumes.map((item) => (
            <div 
              key={item.lang}
              className={`p-5 rounded-2xl bg-white/[0.03] dark:bg-white/[0.03] bg-slate-50 border border-white/10 dark:border-white/10 border-slate-200 ${item.borderHover} transition-all flex flex-col justify-between group`}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-2xl">{item.flag}</span>
                  <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full border ${item.tagBg}`}>
                    {item.lang}
                  </span>
                </div>
                <h4 className="font-bold text-sm text-white dark:text-white text-slate-900 mb-1">
                  {item.title}
                </h4>
                <p className="text-[11px] text-gray-400 dark:text-gray-400 text-slate-500 mb-4 line-clamp-2">
                  {item.subtitle}
                </p>
              </div>

              <div className="space-y-2 pt-2 border-t border-white/5 dark:border-white/5 border-slate-200">
                <a
                  href={item.pdfPath}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 px-3 rounded-xl bg-white/10 dark:bg-white/10 bg-slate-200 hover:bg-white/20 text-white dark:text-white text-slate-800 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors no-underline cursor-pointer"
                >
                  <Eye className="w-3.5 h-3.5" style={{ color: item.color }} />
                  <span>{item.viewLabel}</span>
                  <ExternalLink className="w-3 h-3 opacity-60 ml-auto" />
                </a>

                <a
                  href={item.pdfPath}
                  download={item.downloadName}
                  className={`w-full py-2.5 px-3 rounded-xl ${item.btnGrad} hover:opacity-95 text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-all shadow-md ${item.btnShadow} no-underline cursor-pointer`}
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>{item.downloadLabel}</span>
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Footer info badge */}
        <div className="flex flex-wrap items-center justify-between text-[11px] font-mono text-gray-400 dark:text-gray-400 text-slate-500 pt-2 border-t border-white/10 dark:border-white/10 border-slate-100 gap-2">
          <span className="flex items-center gap-1 text-emerald-400">
            <CheckCircle className="w-3.5 h-3.5" />
            <span>Updated 2025 • High-Resolution Vector PDF</span>
          </span>
          <span>A4 Single-Page (EN • FR • DE)</span>
        </div>
      </div>
    </div>
  );
}
