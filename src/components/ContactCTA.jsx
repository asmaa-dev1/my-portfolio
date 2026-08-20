import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, Copy, Check, Sparkles, MessageSquare, ExternalLink, MessageCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { portfolioData } from '../data/portfolioData';

export default function ContactCTA() {
  const { t } = useTranslation();
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [sentMessage, setSentMessage] = useState(false);
  const [lastSubmittedUrl, setLastSubmittedUrl] = useState(null);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const emailAddress = portfolioData.personal.email;
  const phoneNumber = portfolioData.personal.phone;
  const cleanPhone = phoneNumber.replace(/[^0-9]/g, '');

  const defaultSubject = "Project Inquiry / Collaboration — Asmaa Elhint";
  const defaultBody = "Hi Asmaa,\n\nI came across your portfolio and would love to connect regarding...";

  // Direct Gmail web compose link
  const gmailComposeUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${emailAddress}&su=${encodeURIComponent(defaultSubject)}&body=${encodeURIComponent(defaultBody)}`;

  const copyToClipboard = (e, text, type) => {
    if (e) {
      e.stopPropagation();
      e.preventDefault();
    }
    navigator.clipboard.writeText(text);
    if (type === 'email') {
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
    } else {
      setCopiedPhone(true);
      setTimeout(() => setCopiedPhone(false), 2000);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Construct professional WhatsApp message with visitor name, email & message
    const formattedMessage = `*New Message from Portfolio Visitor* 💬\n\n*Name:* ${formData.name || 'Anonymous'}\n*Email:* ${formData.email || 'Not provided'}\n\n*Message:*\n${formData.message}`;
    const whatsappUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(formattedMessage)}`;

    setLastSubmittedUrl(whatsappUrl);
    setSentMessage(true);

    // Open WhatsApp in a new tab with the pre-filled message
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');

    setTimeout(() => {
      setFormData({ name: '', email: '', message: '' });
    }, 1000);
  };

  return (
    <section id="contact" className="py-24 md:py-36 relative overflow-hidden">
      {/* Background Ambient Glow & Animated Ripple Rings */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[750px] h-[750px] rounded-full bg-gradient-to-tr from-[#d4547e]/20 via-[#6344F5]/15 to-transparent blur-3xl pointer-events-none aurora-orb" />
      
      {/* Concentric Animated Radar Rings */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none opacity-20">
        <div className="w-[500px] h-[500px] rounded-full border border-[#d4547e] animate-ping" style={{ animationDuration: '6s' }} />
      </div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none opacity-15">
        <div className="w-[800px] h-[800px] rounded-full border border-[#6344F5] animate-ping" style={{ animationDuration: '9s' }} />
      </div>

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        {/* Main CTA Spotlight Box */}
        <div className="spotlight-card rounded-3xl border border-white/10 dark:border-white/10 border-slate-200 p-8 md:p-16 text-center mb-16 conic-border-glow shadow-2xl">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 mb-6">
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 radar-pulse" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-400" />
            </span>
            <span className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-widest">
              {t('contact.availableBadge')}
            </span>
          </div>

          <h2 className="text-4xl sm:text-5xl md:text-7xl font-black text-white dark:text-white text-slate-900 tracking-tight leading-[1.1] mb-6">
            {t('contact.title1')}<span className="gradient-text">{t('contact.title2')}</span>
          </h2>

          <p className="text-lg sm:text-2xl font-extrabold text-gray-300 dark:text-gray-300 text-slate-700 mb-6 tracking-tight">
            {t('contact.subtitle')}
          </p>

          <p className="text-sm md:text-base text-gray-400 dark:text-gray-400 text-slate-600 max-w-xl mx-auto leading-relaxed mb-10">
            {t('contact.description')}
          </p>

          {/* Quick Contact Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-4">
            {/* Direct Send Email Button */}
            <a
              href={gmailComposeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-[#d4547e] to-[#a83d62] text-white font-bold text-sm shadow-xl shadow-[#d4547e]/30 hover:scale-105 transition-all duration-300 no-underline cursor-pointer"
            >
              <Mail className="w-4 h-4" />
              <span>{t('contact.sendEmail')}</span>
            </a>

            {/* Direct WhatsApp Button */}
            <a
              href={`https://wa.me/${cleanPhone}`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-[#111116] dark:bg-[#111116] bg-white border border-white/15 dark:border-white/15 border-slate-300 text-gray-200 dark:text-gray-200 text-slate-800 font-bold text-sm hover:border-[#d4547e]/50 hover:bg-white/5 transition-all duration-300 no-underline shadow-lg cursor-pointer hover:scale-105"
            >
              <Phone className="w-4 h-4 text-[#d4547e]" />
              <span>{t('contact.callWhatsapp')}</span>
            </a>
          </div>
        </div>

        {/* Contact Details & Direct Form Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Direct Info Cards */}
          <div className="lg:col-span-5 space-y-4">
            {/* Email Card (Click to open Gmail Web + Copy Button) */}
            <a
              href={gmailComposeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="spotlight-card p-5 rounded-2xl flex items-center justify-between no-underline group hover:border-[#d4547e]/50 transition-all cursor-pointer block"
              title="Click to write an email via Gmail"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-10 h-10 rounded-xl bg-[#d4547e]/10 text-[#d4547e] flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                  <Mail className="w-5 h-5" />
                </div>
                <div className="min-w-0">
                  <span className="text-[11px] font-mono text-gray-400 dark:text-gray-400 text-slate-500 block">
                    {t('contact.directEmail')}
                  </span>
                  <span className="text-sm font-bold text-white dark:text-white text-slate-900 font-mono truncate block group-hover:text-[#d4547e] transition-colors">
                    {emailAddress}
                  </span>
                </div>
              </div>
              <button
                onClick={(e) => copyToClipboard(e, emailAddress, 'email')}
                className="p-2 rounded-lg bg-white/5 dark:bg-white/5 bg-slate-100 hover:bg-white/10 text-gray-300 dark:text-gray-300 text-slate-700 hover:text-white transition-colors shrink-0 ml-2 cursor-pointer"
                title="Copy Email Address"
              >
                {copiedEmail ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              </button>
            </a>

            {/* Phone / WhatsApp Card */}
            <a
              href={`https://wa.me/${cleanPhone}`}
              target="_blank"
              rel="noreferrer"
              className="spotlight-card p-5 rounded-2xl flex items-center justify-between no-underline group hover:border-[#3b82f6]/50 transition-all cursor-pointer block"
              title="Click to chat on WhatsApp"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-10 h-10 rounded-xl bg-[#3b82f6]/10 text-[#3b82f6] flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                  <Phone className="w-5 h-5" />
                </div>
                <div className="min-w-0">
                  <span className="text-[11px] font-mono text-gray-400 dark:text-gray-400 text-slate-500 block">
                    {t('contact.phoneWhatsapp')}
                  </span>
                  <span className="text-sm font-bold text-white dark:text-white text-slate-900 font-mono truncate block group-hover:text-[#3b82f6] transition-colors">
                    {phoneNumber}
                  </span>
                </div>
              </div>
              <button
                onClick={(e) => copyToClipboard(e, phoneNumber, 'phone')}
                className="p-2 rounded-lg bg-white/5 dark:bg-white/5 bg-slate-100 hover:bg-white/10 text-gray-300 dark:text-gray-300 text-slate-700 hover:text-white transition-colors shrink-0 ml-2 cursor-pointer"
                title="Copy Phone Number"
              >
                {copiedPhone ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              </button>
            </a>

            {/* Location Card */}
            <div className="spotlight-card p-5 rounded-2xl flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#22c55e]/10 text-[#22c55e] flex items-center justify-center">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[11px] font-mono text-gray-400 dark:text-gray-400 text-slate-500 block">
                    {t('contact.location')}
                  </span>
                  <span className="text-sm font-bold text-white dark:text-white text-slate-900">
                    Casablanca, Morocco 🇲🇦
                  </span>
                </div>
              </div>
              <span className="text-[10px] font-mono px-2 py-1 rounded bg-white/5 dark:bg-white/5 bg-slate-100 text-gray-400 dark:text-gray-400 text-slate-600">
                {t('contact.remoteHybrid')}
              </span>
            </div>
          </div>

          {/* Right Column: Direct Quick Message Form (Sends via WhatsApp) */}
          <div className="lg:col-span-7">
            <div className="spotlight-card p-6 md:p-8 rounded-3xl">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-lg font-bold text-white dark:text-white text-slate-900 flex items-center gap-2">
                  <span>{t('contact.quickMsgTitle')}</span>
                </h3>
                <span className="text-[10px] font-mono font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span>WhatsApp Direct</span>
                </span>
              </div>
              <p className="text-xs text-gray-400 dark:text-gray-400 text-slate-500 mb-6">
                {t('contact.quickMsgSubtitle')}
              </p>

              {sentMessage ? (
                <div className="py-8 px-6 text-center space-y-4 bg-emerald-500/[0.04] dark:bg-emerald-500/[0.04] bg-emerald-50 rounded-2xl border border-emerald-500/20 animate-in fade-in zoom-in duration-200">
                  <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto shadow-lg shadow-emerald-500/10">
                    <Check className="w-6 h-6" />
                  </div>
                  <h4 className="text-lg font-bold text-white dark:text-white text-slate-900">
                    Opening WhatsApp... 💬
                  </h4>
                  <p className="text-xs text-gray-400 dark:text-gray-400 text-slate-600 max-w-md mx-auto leading-relaxed">
                    Your message has been formatted and opened in WhatsApp ready to send to <strong className="text-white dark:text-white text-slate-900">{phoneNumber}</strong>.
                  </p>

                  <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                    {lastSubmittedUrl && (
                      <a
                        href={lastSubmittedUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs transition-colors flex items-center gap-1.5 no-underline cursor-pointer shadow-lg shadow-emerald-600/20"
                      >
                        <span>Open WhatsApp Again</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                    <button
                      onClick={() => setSentMessage(false)}
                      className="px-4 py-2 rounded-xl bg-white/10 dark:bg-white/10 bg-slate-200 text-gray-300 dark:text-gray-300 text-slate-700 hover:text-white text-xs font-semibold transition-colors cursor-pointer"
                    >
                      Write Another Message
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono text-gray-300 dark:text-gray-300 text-slate-700 mb-1.5 font-semibold">
                        {t('contact.yourName')}
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Sarah Connor"
                        className="w-full px-4 py-2.5 rounded-xl bg-[#09090d] dark:bg-[#09090d] bg-slate-50 border border-white/15 dark:border-white/15 border-slate-200 text-white dark:text-white text-slate-900 placeholder-gray-500 text-sm focus:outline-none focus:border-[#d4547e]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono text-gray-300 dark:text-gray-300 text-slate-700 mb-1.5 font-semibold">
                        {t('contact.yourEmail')}
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="sarah@example.com"
                        className="w-full px-4 py-2.5 rounded-xl bg-[#09090d] dark:bg-[#09090d] bg-slate-50 border border-white/15 dark:border-white/15 border-slate-200 text-white dark:text-white text-slate-900 placeholder-gray-500 text-sm focus:outline-none focus:border-[#d4547e]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-gray-300 dark:text-gray-300 text-slate-700 mb-1.5 font-semibold">
                      {t('contact.message')}
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Hi Asmaa, I'd like to talk about a project or job opportunity..."
                      className="w-full px-4 py-2.5 rounded-xl bg-[#09090d] dark:bg-[#09090d] bg-slate-50 border border-white/15 dark:border-white/15 border-slate-200 text-white dark:text-white text-slate-900 placeholder-gray-500 text-sm focus:outline-none focus:border-[#d4547e] resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-xl bg-gradient-to-r from-emerald-600 via-emerald-500 to-[#d4547e] hover:opacity-95 text-white font-bold text-sm transition-all shadow-xl shadow-emerald-600/20 flex items-center justify-center gap-2 cursor-pointer hover:scale-[1.01]"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>{t('contact.sendMsgBtn')} (WhatsApp)</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
