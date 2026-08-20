import React, { useState, useEffect } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import AboutBento from './components/AboutBento';
import ExperienceTimeline from './components/ExperienceTimeline';
import SkillsGrid from './components/SkillsGrid';
import ProjectsShowcase from './components/ProjectsShowcase';
import Certifications from './components/Certifications';
import GithubMiscWall from './components/GithubMiscWall';
import ContactCTA from './components/ContactCTA';
import Footer from './components/Footer';
import WallPage from './components/WallPage';
import { scrollToSection } from './utils/navigation';
import BackgroundAtmosphere from './components/BackgroundAtmosphere';

export default function App() {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  const isStandaloneWallPage = ['/ruins', '/words-left-in-the-ruins'].includes(currentPath);

  useEffect(() => {
    // 1. Initial route navigation from path (e.g. /projects or /about or /wall)
    const rawPath = window.location.pathname.replace(/^\//, '');
    setCurrentPath(window.location.pathname);

    if (rawPath && !['ruins', 'words-left-in-the-ruins'].includes(rawPath)) {
      const sectionId = rawPath;
      setTimeout(() => {
        const secElement = document.getElementById(sectionId);
        if (secElement) {
          scrollToSection(sectionId, `/${rawPath}`);
        }
      }, 350);
    }

    // 2. Browser Back / Forward and custom navigation listener
    const handlePopState = () => {
      const path = window.location.pathname;
      setCurrentPath(path);

      if (!['/ruins', '/words-left-in-the-ruins'].includes(path)) {
        const raw = path.replace(/^\//, '') || 'home';
        const sectionId = raw;
        const secElement = document.getElementById(sectionId);
        if (secElement || raw === 'home') {
          scrollToSection(sectionId, raw === 'home' ? '/' : `/${raw}`);
        }
      }
    };
    window.addEventListener('popstate', handlePopState);

    // 3. Global listener for interactive spotlight mouse tracking
    const handleGlobalMouseMove = (e) => {
      const cards = document.querySelectorAll('.spotlight-card');
      cards.forEach((card) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);
      });
    };

    window.addEventListener('mousemove', handleGlobalMouseMove);
    return () => {
      window.removeEventListener('popstate', handlePopState);
      window.removeEventListener('mousemove', handleGlobalMouseMove);
    };
  }, []);

  return (
    <ThemeProvider>
      {isStandaloneWallPage ? (
        <WallPage />
      ) : (
        <div className="min-h-screen bg-[var(--color-bg)] text-[var(--color-text)] selection:bg-[#d4547e] selection:text-white relative transition-colors duration-300">
          {/* Ambient Animated Cyber Atmosphere across entire page */}
          <BackgroundAtmosphere />

          {/* Dynamic Navbar */}
          <Navbar />

          {/* Main Portfolio Sections */}
          <main className="relative">
            <Hero />
            <AboutBento />
            <ExperienceTimeline />
            <SkillsGrid />
            <ProjectsShowcase />
            <Certifications />
            <GithubMiscWall />
            <ContactCTA />
          </main>

          {/* Modern Footer */}
          <Footer />
        </div>
      )}
    </ThemeProvider>
  );
}
