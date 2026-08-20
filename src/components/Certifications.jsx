import React, { useState, useEffect } from 'react';
import { 
  Award, 
  ShieldCheck, 
  ExternalLink, 
  Download, 
  X, 
  Eye, 
  Maximize2, 
  ZoomIn, 
  ZoomOut, 
  RotateCcw, 
  Copy, 
  Check,
  FileText
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { portfolioData } from '../data/portfolioData';

export default function Certifications() {
  const { t } = useTranslation();
  const [activeCert, setActiveCert] = useState(null);
  const [modalMode, setModalMode] = useState('image'); // 'image' | 'pdf'
  const [zoomLevel, setZoomLevel] = useState(1);
  const [copiedId, setCopiedId] = useState(null);

  // Close modal on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setActiveCert(null);
      }
    };
    if (activeCert) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
      setZoomLevel(1);
      setModalMode('image');
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [activeCert]);

  const handleCopyId = (credentialId) => {
    if (!credentialId) return;
    navigator.clipboard.writeText(credentialId);
    setCopiedId(credentialId);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleZoomIn = () => setZoomLevel((prev) => Math.min(prev + 0.25, 2.5));
  const handleZoomOut = () => setZoomLevel((prev) => Math.max(prev - 0.25, 0.75));
  const handleResetZoom = () => setZoomLevel(1);

  return (
    <section id="certifications" className="py-24 md:py-32 relative">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section Heading */}
        <div className="mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] dark:bg-white/[0.04] bg-slate-900/[0.04] border border-white/10 dark:border-white/10 border-slate-200 text-xs font-mono text-[#f59e0b] mb-3">
            <Award className="w-3.5 h-3.5" />
            <span>{t('certs.tag', 'CREDENTIALS & HONORS')}</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-white dark:text-white text-slate-900 tracking-tight">
            {t('certs.title', 'Professional Certifications')}
          </h2>
          <div className="mt-3 h-1 w-20 rounded-full bg-gradient-to-r from-[#f59e0b] to-[#d4547e]" />
        </div>

        {/* Certifications Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {portfolioData.certifications.map((cert) => (
            <div
              key={cert.id}
              className="spotlight-card group p-6 md:p-7 rounded-3xl flex flex-col justify-between hover:-translate-y-1.5 transition-all duration-300 relative overflow-hidden border border-white/10 dark:border-white/10 border-slate-200 bg-[#0e0f17]/90 dark:bg-[#0e0f17]/90 bg-white shadow-xl hover:shadow-2xl"
              style={{
                '--spotlight-color': `${cert.color}18`
              }}
            >
              {/* Outer Visual Preview Box with Blurred Backdrop & Framed Certificate */}
              <div 
                onClick={() => setActiveCert(cert)}
                className="relative h-56 sm:h-64 rounded-2xl overflow-hidden mb-6 border border-white/10 dark:border-white/10 border-slate-200/80 bg-black/50 group/preview cursor-pointer select-none"
              >
                {/* 1. Ambient Blurred Background Layer (Mbedda / Flou artistique) */}
                <div 
                  className="absolute inset-0 w-full h-full bg-cover bg-center filter blur-xl scale-125 opacity-45 dark:opacity-40 transition-transform duration-700 ease-out group-hover/preview:scale-140 group-hover/preview:opacity-55"
                  style={{
                    backgroundImage: `url(${cert.image || cert.pdf})`,
                    backgroundColor: `${cert.color}20`
                  }}
                />
                
                {/* Radial gradient vignette for depth */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/30 pointer-events-none" />

                {/* 2. Framed Foreground Certificate Preview */}
                <div className="relative z-10 w-full h-full flex items-center justify-center p-4">
                  <div className="relative w-full max-w-[90%] h-[88%] rounded-xl overflow-hidden shadow-2xl border border-white/25 dark:border-white/20 border-slate-700/40 bg-black/40 backdrop-blur-xs transition-all duration-500 ease-out group-hover/preview:scale-[1.03] group-hover/preview:shadow-[0_12px_36px_rgba(0,0,0,0.6)]">
                    <img
                      src={cert.image}
                      alt={cert.title}
                      className="w-full h-full object-contain object-center transition-transform duration-500"
                      loading="lazy"
                    />
                    
                    {/* Glass shine sweep */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent pointer-events-none" />
                  </div>
                </div>

                {/* Floating Top Badges */}
                <div className="absolute top-3 left-3 right-3 z-20 flex items-center justify-between gap-2 pointer-events-none">
                  {/* Issuer Pill */}
                  <span
                    className="text-[11px] font-mono font-bold px-2.5 py-1 rounded-lg backdrop-blur-md border shadow-md flex items-center gap-1.5"
                    style={{
                      color: cert.color,
                      backgroundColor: `${cert.color}20`,
                      borderColor: `${cert.color}45`
                    }}
                  >
                    <Award className="w-3 h-3" />
                    <span>{cert.badge || cert.issuer}</span>
                  </span>

                  {/* Year / Validity Pill */}
                  <span className="text-[11px] font-mono px-2.5 py-1 rounded-lg bg-black/60 backdrop-blur-md border border-white/15 text-gray-300 font-medium">
                    {cert.year}
                  </span>
                </div>

                {/* Interactive Hover Action Overlay */}
                <div className="absolute inset-0 z-30 flex items-center justify-center bg-black/45 backdrop-blur-[2px] opacity-0 group-hover/preview:opacity-100 transition-all duration-300">
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 dark:bg-white/20 bg-black/70 backdrop-blur-md border border-white/30 text-white text-xs font-semibold shadow-2xl transform translate-y-2 group-hover/preview:translate-y-0 transition-transform duration-300">
                    <Maximize2 className="w-3.5 h-3.5 text-white" />
                    <span>{t('certs.viewPreview', 'Aperçu Plein Écran')}</span>
                  </div>
                </div>
              </div>

              {/* Certificate Details */}
              <div>
                {/* Title */}
                <h3 className="text-lg md:text-xl font-bold text-white dark:text-white text-slate-900 mb-1.5 leading-snug">
                  {cert.title}
                </h3>
                
                {/* Issuer */}
                <p className="text-xs font-mono font-semibold mb-3 text-gray-400 dark:text-gray-400 text-slate-500 flex items-center gap-1.5">
                  <span>{t('certs.issuedBy', 'Délivré par')}</span>
                  <span className="text-white dark:text-white text-slate-900 font-bold">
                    {cert.issuer}
                  </span>
                </p>

                {/* Credential ID & Validity Badge */}
                {cert.credentialId && (
                  <div className="flex flex-wrap items-center gap-2 mb-4">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleCopyId(cert.credentialId);
                      }}
                      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-white/[0.04] dark:bg-white/[0.04] bg-slate-100 hover:bg-white/[0.08] dark:hover:bg-white/[0.08] hover:bg-slate-200 border border-white/10 dark:border-white/10 border-slate-200 text-[11px] font-mono text-gray-300 dark:text-gray-300 text-slate-700 transition-colors group/btn"
                      title="Cliquez pour copier l'identifiant"
                    >
                      <span className="text-gray-400 dark:text-gray-400 text-slate-500">ID:</span>
                      <span className="font-semibold text-white dark:text-white text-slate-800">{cert.credentialId}</span>
                      {copiedId === cert.credentialId ? (
                        <Check className="w-3 h-3 text-emerald-400 ml-0.5" />
                      ) : (
                        <Copy className="w-3 h-3 text-gray-400 group-hover/btn:text-white transition-colors ml-0.5" />
                      )}
                    </button>

                    {cert.validity && (
                      <span className="inline-flex items-center px-2 py-0.5 rounded-md bg-white/[0.02] dark:bg-white/[0.02] bg-slate-100 border border-white/5 dark:border-white/5 border-slate-200 text-[10.5px] font-mono text-gray-400 dark:text-gray-400 text-slate-500">
                        {cert.validity}
                      </span>
                    )}
                  </div>
                )}

                {/* Description */}
                <p className="text-sm text-gray-300 dark:text-gray-300 text-slate-600 leading-relaxed mb-6">
                  {cert.description}
                </p>
              </div>

              {/* Action Buttons & Verification Footer */}
              <div>
                <div className="flex items-center gap-2.5 mb-4">
                  {cert.pdf && (
                    <button
                      onClick={() => setActiveCert(cert)}
                      className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold bg-white/[0.08] hover:bg-white/[0.15] dark:bg-white/[0.08] dark:hover:bg-white/[0.15] bg-slate-100 hover:bg-slate-200 border border-white/15 dark:border-white/15 border-slate-300 text-white dark:text-white text-slate-900 transition-all duration-200 shadow-sm active:scale-[0.98]"
                    >
                      <Eye className="w-3.5 h-3.5" style={{ color: cert.color }} />
                      <span>{t('certs.viewPdf', 'Voir le Certificat (HD / PDF)')}</span>
                    </button>
                  )}

                  {cert.pdf && (
                    <a
                      href={cert.pdf}
                      download
                      className="inline-flex items-center justify-center p-2.5 rounded-xl text-xs bg-white/[0.04] hover:bg-white/[0.09] dark:bg-white/[0.04] dark:hover:bg-white/[0.09] bg-slate-100 hover:bg-slate-200 border border-white/10 dark:border-white/10 border-slate-300 text-gray-300 hover:text-white dark:text-gray-300 dark:hover:text-white text-slate-700 transition-colors"
                      title={t('certs.download', 'Télécharger le PDF')}
                    >
                      <Download className="w-4 h-4" />
                    </a>
                  )}
                </div>

                <div className="pt-3 border-t border-white/10 dark:border-white/10 border-slate-200 flex items-center justify-between text-xs font-mono text-gray-400 dark:text-gray-400 text-slate-500">
                  <span className="flex items-center gap-1.5 text-emerald-400">
                    <ShieldCheck className="w-4 h-4" />
                    <span>{t('certs.verified', 'Certificat Vérifié')}</span>
                  </span>
                  <span className="text-gray-500">{t('certs.standard', 'Standard Industriel')}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Advanced Lightbox Modal (HD Image Zoomable + PDF Embed) */}
      {activeCert && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 md:p-8 bg-black/90 backdrop-blur-2xl animate-fade-in"
          onClick={() => setActiveCert(null)}
        >
          <div
            className="relative w-full max-w-5xl bg-[#0d0e15] border border-white/20 rounded-2xl shadow-2xl overflow-hidden flex flex-col h-[92vh] animate-scale-up"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between px-5 py-3.5 bg-black/70 border-b border-white/10 shrink-0">
              <div className="flex items-center gap-3 overflow-hidden">
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 shadow-md"
                  style={{
                    backgroundColor: `${activeCert.color}20`,
                    border: `1px solid ${activeCert.color}50`
                  }}
                >
                  <Award className="w-4 h-4" style={{ color: activeCert.color }} />
                </div>
                <div className="truncate">
                  <h4 className="text-sm font-bold text-white leading-tight truncate">
                    {activeCert.title}
                  </h4>
                  <p className="text-[11px] text-gray-400 font-mono truncate">
                    {activeCert.issuer} · {activeCert.year}
                  </p>
                </div>
              </div>

              {/* Mode Switch & Actions */}
              <div className="flex items-center gap-2 shrink-0">
                {/* Switch between HD Image & PDF Viewer */}
                <div className="hidden sm:flex items-center bg-white/10 p-0.5 rounded-lg border border-white/10 text-xs">
                  <button
                    onClick={() => setModalMode('image')}
                    className={`px-3 py-1 rounded-md transition-colors font-medium flex items-center gap-1.5 ${
                      modalMode === 'image'
                        ? 'bg-white/20 text-white shadow-sm'
                        : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    <Eye className="w-3 h-3" />
                    <span>Aperçu HD</span>
                  </button>
                  <button
                    onClick={() => setModalMode('pdf')}
                    className={`px-3 py-1 rounded-md transition-colors font-medium flex items-center gap-1.5 ${
                      modalMode === 'pdf'
                        ? 'bg-white/20 text-white shadow-sm'
                        : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    <FileText className="w-3 h-3" />
                    <span>Document PDF</span>
                  </button>
                </div>

                <a
                  href={activeCert.pdf}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs font-medium flex items-center gap-1.5 transition-colors"
                  title="Ouvrir dans un nouvel onglet"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span className="hidden md:inline">Ouvrir</span>
                </a>

                <button
                  onClick={() => setActiveCert(null)}
                  className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-gray-300 hover:text-white flex items-center justify-center transition-colors"
                  title="Fermer (Échap)"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Modal Body */}
            <div className="flex-1 bg-[#12131c] relative overflow-hidden flex items-center justify-center">
              {modalMode === 'image' ? (
                <div className="w-full h-full overflow-auto flex items-center justify-center p-4 sm:p-8 select-none relative">
                  {/* Floating Zoom Controls for Image */}
                  <div className="absolute top-4 right-4 z-30 flex items-center gap-1.5 bg-black/70 backdrop-blur-md px-2.5 py-1.5 rounded-xl border border-white/15 shadow-xl">
                    <button
                      onClick={handleZoomOut}
                      className="p-1 text-gray-300 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                      title="Zoom Arrière"
                    >
                      <ZoomOut className="w-4 h-4" />
                    </button>
                    <span className="text-[11px] font-mono text-gray-300 px-1 min-w-[3rem] text-center">
                      {Math.round(zoomLevel * 100)}%
                    </span>
                    <button
                      onClick={handleZoomIn}
                      className="p-1 text-gray-300 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                      title="Zoom Avant"
                    >
                      <ZoomIn className="w-4 h-4" />
                    </button>
                    {zoomLevel !== 1 && (
                      <button
                        onClick={handleResetZoom}
                        className="p-1 text-gray-300 hover:text-white hover:bg-white/10 rounded-lg transition-colors ml-1 border-l border-white/15 pl-1.5"
                        title="Réinitialiser"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>

                  {/* High-Res Certificate Image */}
                  <div 
                    className="transition-transform duration-200 ease-out origin-center flex items-center justify-center"
                    style={{ transform: `scale(${zoomLevel})` }}
                  >
                    <img
                      src={activeCert.image}
                      alt={activeCert.title}
                      className="max-h-[75vh] max-w-[92vw] sm:max-w-4xl object-contain rounded-xl shadow-2xl border border-white/20"
                    />
                  </div>
                </div>
              ) : (
                /* PDF Iframe Viewer */
                <iframe
                  src={`${activeCert.pdf}#toolbar=1&navpanes=0&scrollbar=1`}
                  title={activeCert.title}
                  className="w-full h-full border-0"
                />
              )}
            </div>

            {/* Modal Bottom Footer */}
            <div className="flex flex-wrap items-center justify-between gap-3 px-5 py-3 bg-black/70 border-t border-white/10 text-xs shrink-0">
              <div className="flex items-center gap-2 text-gray-400 font-mono">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>
                  ID: <strong className="text-white">{activeCert.credentialId || 'Vérifié'}</strong>
                </span>
                {activeCert.validity && (
                  <>
                    <span className="text-gray-600">·</span>
                    <span>{activeCert.validity}</span>
                  </>
                )}
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleCopyId(activeCert.credentialId)}
                  className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white font-medium text-xs flex items-center gap-1.5 transition-colors"
                >
                  {copiedId === activeCert.credentialId ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Copié !</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copier l'ID</span>
                    </>
                  )}
                </button>

                <a
                  href={activeCert.pdf}
                  download
                  className="px-4 py-1.5 rounded-lg bg-[#d4547e] hover:bg-[#b83d65] text-white font-semibold text-xs flex items-center gap-1.5 transition-colors shadow-lg active:scale-95"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>{t('certs.download', 'Télécharger le PDF')}</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
