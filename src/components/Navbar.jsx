import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { Menu, X, ArrowUpRight, Sparkles, Send, Sun, Moon, Globe, ChevronDown, Check, FileText } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../context/ThemeContext';
import { portfolioData } from '../data/portfolioData';
import { scrollToSection, updateCleanUrl, isNavigating } from '../utils/navigation';
import ResumeModal from './ResumeModal';

const LANGUAGES = [
  { code: 'en', label: 'English', short: 'EN', flag: '🇬🇧' },
  { code: 'fr', label: 'Français', short: 'FR', flag: '🇫🇷' },
  { code: 'de', label: 'Deutsch', short: 'DE', flag: '🇩🇪' },
];

export default function Navbar() {
  const { t } = useTranslation();
  const { theme, toggleTheme, language, changeLanguage } = useTheme();

  const [greeting, setGreeting] = useState({ text: 'Good Day', icon: '✨' });
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [isResumeModalOpen, setIsResumeModalOpen] = useState(false);
  const langDropdownRef = useRef(null);
  
  // Magnetic Sliding Pill State
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [pillStyle, setPillStyle] = useState({ left: 0, width: 0, opacity: 0 });
  const navContainerRef = useRef(null);
  const itemRefs = useRef([]);

  const navLinks = useMemo(() => [
    { label: t('nav.home'), path: '/', id: 'home' },
    { label: t('nav.about'), path: '/about', id: 'about' },
    { label: t('nav.experience'), path: '/experience', id: 'experience' },
    { label: t('nav.skills'), path: '/skills', id: 'skills' },
    { label: t('nav.projects'), path: '/projects', id: 'projects' },
    { label: t('nav.certifications'), path: '/certifications', id: 'certifications' },
    { label: t('nav.wall'), path: '/wall', id: 'wall' },
    { label: t('nav.contact'), path: '/contact', id: 'contact' },
  ], [t]);

  // Position pill helper
  const updatePillToItem = useCallback((index, opacity = 1) => {
    if (index === -1 || !itemRefs.current[index] || !navContainerRef.current) {
      setPillStyle((prev) => ({ ...prev, opacity: 0 }));
      return;
    }
    const targetItem = itemRefs.current[index];
    const container = navContainerRef.current;
    const targetRect = targetItem.getBoundingClientRect();
    const containerRect = container.getBoundingClientRect();
    setPillStyle({
      left: targetRect.left - containerRect.left,
      width: targetRect.width,
      opacity
    });
  }, []);

  // Dynamic Greeting based on time
  useEffect(() => {
    const updateGreeting = () => {
      const hour = new Date().getHours();
      if (language === 'fr') {
        if (hour >= 5 && hour < 18) {
          setGreeting({ text: 'Bonjour', icon: '☀️' });
        } else {
          setGreeting({ text: 'Bonsoir', icon: '🌙' });
        }
      } else if (language === 'de') {
        if (hour >= 5 && hour < 18) {
          setGreeting({ text: 'Guten Tag', icon: '☀️' });
        } else {
          setGreeting({ text: 'Guten Abend', icon: '🌙' });
        }
      } else {
        if (hour >= 5 && hour < 12) {
          setGreeting({ text: 'Good Morning', icon: '☀️' });
        } else if (hour >= 12 && hour < 17) {
          setGreeting({ text: 'Good Afternoon', icon: '🌤️' });
        } else if (hour >= 17 && hour < 21) {
          setGreeting({ text: 'Good Evening', icon: '🌆' });
        } else {
          setGreeting({ text: 'Good Night', icon: '🌙' });
        }
      }
    };

    updateGreeting();
    const interval = setInterval(updateGreeting, 60000);
    return () => clearInterval(interval);
  }, [language]);

  // Scroll Spy with programmatic scroll protection
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrolled(window.scrollY > 30);

          if (!isNavigating()) {
            const sections = navLinks.map((l) => document.getElementById(l.id));
            const scrollPos = window.scrollY + 200;

            for (let i = sections.length - 1; i >= 0; i--) {
              const sec = sections[i];
              if (sec && sec.offsetTop <= scrollPos) {
                const currentId = navLinks[i].id;
                setActiveSection(currentId);
                updateCleanUrl(currentId);
                break;
              }
            }
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [navLinks]);

  // Update pill position whenever activeSection or hoveredIndex changes
  useEffect(() => {
    if (hoveredIndex !== null) {
      updatePillToItem(hoveredIndex, 1);
    } else {
      const activeIdx = navLinks.findIndex((l) => l.id === activeSection);
      updatePillToItem(activeIdx, 0.85);
    }
  }, [activeSection, hoveredIndex, navLinks, updatePillToItem]);

  // Handle clicking a link smoothly and cleanly
  const handleNavClick = (e, link, index) => {
    e.preventDefault();
    setActiveSection(link.id);
    updatePillToItem(index, 1);
    scrollToSection(link.id, link.path);
  };

  // Close language dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (langDropdownRef.current && !langDropdownRef.current.contains(event.target)) {
        setIsLangOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <>
      {/* Top Background Blur Mask */}
      <div aria-hidden="true" className="fixed top-0 left-0 right-0 z-30 pointer-events-none">
        <div
          className="absolute inset-x-0 top-0 h-[80px]"
          style={{
            backdropFilter: 'blur(16px) saturate(1.3)',
            WebkitBackdropFilter: 'blur(16px) saturate(1.3)',
            maskImage: 'linear-gradient(to bottom, black 0%, transparent 100%)',
            WebkitMaskImage: 'linear-gradient(to bottom, black 0%, transparent 100%)'
          }}
        />
      </div>

      {/* Floating Logo (Desktop Left) */}
      <a
        href="/"
        onClick={(e) => handleNavClick(e, { id: 'home', path: '/' }, 0)}
        className="hidden lg:flex fixed top-4 left-8 lg:left-12 z-50 items-center gap-2 group text-white cursor-pointer no-underline"
        aria-label="Asmaa Elhint Home"
      >
        <div className="w-10 h-10 rounded-xl bg-[#111116] dark:bg-[#111116] bg-white border border-white/10 dark:border-white/10 border-slate-200 flex items-center justify-center p-2 transition-transform duration-300 group-hover:scale-110 group-hover:border-[#d4547e]/50 shadow-lg">
          <img src="/favicon.png" alt="Asmaa Elhint" className="w-full h-full object-contain" />
        </div>
      </a>

      {/* --------------------------------------------------------------------------
          DYNAMIC ISLAND FLOATING NAVBAR
          -------------------------------------------------------------------------- */}
      <nav
        className="fixed top-4 inset-x-0 mx-auto w-fit z-40 rounded-full bg-[#0d0d12]/85 dark:bg-[#0d0d12]/85 bg-white/90 backdrop-blur-2xl border border-white/10 dark:border-white/10 border-slate-200 shadow-2xl transition-all duration-300 px-3 py-1.5 flex items-center gap-1.5"
        style={{
          boxShadow: scrolled
            ? '0 10px 30px -10px rgba(0,0,0,0.9), 0 0 25px 2px rgba(212,84,126,0.18)'
            : '0 4px 20px rgba(0,0,0,0.1)'
        }}
      >
        {/* Animated Laser Beam on Top Border */}
        <div className="absolute -top-[1px] h-[2px] rounded-full pointer-events-none nav-glow-beam inset-x-4" />

        {/* Live Greeting Pill */}
        <div className="hidden sm:flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] dark:bg-white/[0.04] bg-slate-100 border border-white/[0.06] dark:border-white/[0.06] border-slate-200 text-xs font-medium text-gray-300 dark:text-gray-300 text-slate-700 mr-1 select-none">
          <span className="text-sm">{greeting.icon}</span>
          <span className="font-semibold">{greeting.text}</span>
        </div>

        {/* Desktop Links with Magnetic Sliding Pill Indicator */}
        <div
          ref={navContainerRef}
          onMouseLeave={() => setHoveredIndex(null)}
          className="hidden md:flex items-center gap-1 relative px-1"
        >
          {/* Sliding Pill Background with Smooth Fluid Physics */}
          <div
            className="absolute top-1 bottom-1 rounded-full bg-white/10 dark:bg-white/10 bg-slate-900/10 backdrop-blur-md border border-white/15 dark:border-white/15 border-slate-300/40 transition-all duration-300 pointer-events-none ease-out shadow-sm"
            style={{
              left: `${pillStyle.left}px`,
              width: `${pillStyle.width}px`,
              opacity: pillStyle.opacity
            }}
          />

          {navLinks.map((link, index) => {
            const isActive = activeSection === link.id;

            return (
              <a
                key={link.id}
                ref={(el) => (itemRefs.current[index] = el)}
                href={link.path}
                onClick={(e) => handleNavClick(e, link, index)}
                onMouseEnter={() => setHoveredIndex(index)}
                className={`relative z-10 px-3.5 py-1.5 rounded-full text-xs font-semibold transition-colors duration-200 no-underline cursor-pointer select-none ${
                  isActive
                    ? 'text-white dark:text-white text-slate-900 font-bold'
                    : 'text-gray-400 dark:text-gray-400 text-slate-600 hover:text-white dark:hover:text-white hover:text-slate-900'
                }`}
              >
                {link.label}
              </a>
            );
          })}
        </div>

        {/* Theme Toggle (Light / Dark Mode) */}
        <button
          onClick={toggleTheme}
          className="flex items-center justify-center w-8 h-8 rounded-full bg-white/5 dark:bg-white/5 bg-slate-100 hover:bg-white/10 text-gray-300 dark:text-gray-300 text-slate-700 hover:text-white dark:hover:text-white transition-all shadow-sm cursor-pointer"
          aria-label="Toggle theme"
          title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
        >
          {theme === 'dark' ? (
            <Sun className="w-3.5 h-3.5 text-amber-400" />
          ) : (
            <Moon className="w-3.5 h-3.5 text-indigo-600" />
          )}
        </button>

        {/* Language Switcher Dropdown (EN / FR / DE) */}
        <div className="relative" ref={langDropdownRef}>
          <button
            onClick={() => setIsLangOpen(!isLangOpen)}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/5 dark:bg-white/5 bg-slate-100 hover:bg-white/10 text-[11px] font-mono font-bold text-gray-300 dark:text-gray-300 text-slate-700 transition-all border border-white/10 dark:border-white/10 border-slate-200 shadow-sm cursor-pointer"
            title="Select Language"
          >
            <Globe className="w-3 h-3 text-[#d4547e]" />
            <span>{language.toUpperCase()}</span>
            <ChevronDown className={`w-3 h-3 opacity-60 transition-transform duration-200 ${isLangOpen ? 'rotate-180' : ''}`} />
          </button>

          {/* Floating Dropdown Menu with all 3 languages */}
          {isLangOpen && (
            <div className="absolute right-0 top-full mt-2 w-36 p-1.5 rounded-2xl bg-[#111116]/95 dark:bg-[#111116]/95 bg-white/95 backdrop-blur-xl border border-white/15 dark:border-white/15 border-slate-200 shadow-2xl z-50 animate-in fade-in zoom-in-95 duration-150">
              {LANGUAGES.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => {
                    changeLanguage(lang.code);
                    setIsLangOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-all cursor-pointer ${
                    language === lang.code
                      ? 'bg-[#d4547e]/15 text-[#d4547e] font-bold'
                      : 'text-gray-300 dark:text-gray-300 text-slate-700 hover:bg-white/10 dark:hover:bg-white/10 hover:bg-slate-100'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <span>{lang.flag}</span>
                    <span>{lang.label}</span>
                  </span>
                  {language === lang.code && <Check className="w-3.5 h-3.5 text-[#d4547e]" />}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* CV / Resume Button */}
        <button
          onClick={() => setIsResumeModalOpen(true)}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 dark:bg-white/5 bg-slate-100 hover:bg-white/10 text-xs font-mono font-bold text-gray-200 dark:text-gray-200 text-slate-800 transition-all border border-white/10 dark:border-white/10 border-slate-200 shadow-sm hover:border-[#d4547e]/50 hover:text-white cursor-pointer"
          title="View & Download CV (EN / FR)"
        >
          <FileText className="w-3.5 h-3.5 text-[#d4547e]" />
          <span>CV</span>
        </button>

        {/* Quick Action Button */}
        <a
          href="/contact"
          onClick={(e) => handleNavClick(e, { id: 'contact', path: '/contact' }, 6)}
          className="flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-bold bg-gradient-to-r from-[#d4547e] to-[#a83d62] text-white hover:opacity-95 transition-all shadow-md hover:shadow-[#d4547e]/30 hover:scale-105 no-underline ml-1 cursor-pointer"
        >
          <Send className="w-3 h-3" />
          <span>{t('nav.hireMe')}</span>
        </a>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden flex items-center justify-center w-8 h-8 rounded-full bg-white/5 dark:bg-white/5 bg-slate-100 text-gray-300 dark:text-gray-300 text-slate-700 hover:text-white ml-1 cursor-pointer"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
        </button>
      </nav>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-x-4 top-20 z-50 md:hidden p-6 rounded-2xl bg-[#0e0e13]/95 dark:bg-[#0e0e13]/95 bg-white/95 backdrop-blur-2xl border border-white/10 dark:border-white/10 border-slate-200 shadow-2xl animate-in fade-in slide-in-from-top-4 duration-300">
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between pb-3 border-b border-white/10 dark:border-white/10 border-slate-200 mb-1">
              <div className="flex items-center gap-2">
                <span className="text-lg">{greeting.icon}</span>
                <span className="text-sm font-semibold text-white dark:text-white text-slate-800">
                  {greeting.text}
                </span>
              </div>
              
              <div className="flex items-center gap-2">
                <button
                  onClick={toggleTheme}
                  className="p-1.5 rounded-full bg-white/5 dark:bg-white/5 bg-slate-100 cursor-pointer"
                >
                  {theme === 'dark' ? <Sun className="w-3.5 h-3.5 text-amber-400" /> : <Moon className="w-3.5 h-3.5 text-indigo-600" />}
                </button>
                <div className="flex items-center bg-white/5 dark:bg-white/5 bg-slate-100 p-0.5 rounded-full border border-white/10 dark:border-white/10 border-slate-200">
                  {LANGUAGES.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => changeLanguage(lang.code)}
                      className={`px-2 py-0.5 rounded-full text-xs font-mono font-bold cursor-pointer transition-colors ${
                        language === lang.code
                          ? 'bg-[#d4547e] text-white shadow-sm'
                          : 'text-gray-400 dark:text-gray-400 text-slate-600 hover:text-white'
                      }`}
                    >
                      {lang.short}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {navLinks.map((link) => (
              <a
                key={link.id}
                href={link.path}
                onClick={(e) => {
                  e.preventDefault();
                  setMobileMenuOpen(false);
                  scrollToSection(link.id, link.path);
                }}
                className="px-4 py-2.5 rounded-xl text-sm font-medium text-gray-300 dark:text-gray-300 text-slate-700 hover:text-white dark:hover:text-white hover:text-slate-900 hover:bg-white/5 dark:hover:bg-white/5 hover:bg-slate-100 transition-colors no-underline flex items-center justify-between cursor-pointer"
              >
                <span>{link.label}</span>
                <ArrowUpRight className="w-3.5 h-3.5 opacity-50" />
              </a>
            ))}

            <div className="pt-3 border-t border-white/10 dark:border-white/10 border-slate-200 flex gap-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setIsResumeModalOpen(true);
                }}
                className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-bold bg-white/10 dark:bg-white/10 bg-slate-200 text-white dark:text-white text-slate-800 transition-colors cursor-pointer"
              >
                <FileText className="w-3.5 h-3.5 text-[#d4547e]" />
                <span>Resume / CV</span>
              </button>

              <a
                href="/contact"
                onClick={(e) => {
                  e.preventDefault();
                  setMobileMenuOpen(false);
                  scrollToSection('contact', '/contact');
                }}
                className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-bold bg-[#d4547e] text-white no-underline shadow-lg cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
                <span>{t('nav.hireMe')}</span>
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Global CV & Resume Modal */}
      <ResumeModal 
        isOpen={isResumeModalOpen} 
        onClose={() => setIsResumeModalOpen(false)} 
      />
    </>
  );
}
