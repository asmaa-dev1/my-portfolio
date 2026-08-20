/**
 * Clean URL Navigation & Route Utility
 * Supports single-page section scrolling and dedicated standalone pages (like /ruins)
 */

let isProgrammaticScrolling = false;
let scrollTimeout = null;

export const isNavigating = () => isProgrammaticScrolling;

export const navigateTo = (path) => {
  const targetPath = path.startsWith('/') ? path : `/${path}`;
  
  if (window.location.pathname !== targetPath) {
    try {
      window.history.pushState({ path: targetPath }, '', targetPath);
      // Dispatch custom popstate event so App.jsx updates
      window.dispatchEvent(new Event('popstate'));
    } catch (e) {}
  }

  window.scrollTo({ top: 0, behavior: 'smooth' });
};

export const scrollToSection = (sectionId, path) => {
  const cleanPath = path || (sectionId === 'home' ? '/' : `/${sectionId}`);
  
  // If we are currently on a standalone subpage like /ruins, first navigate to home then scroll
  if (['/ruins', '/words-left-in-the-ruins'].includes(window.location.pathname)) {
    navigateTo('/');
    setTimeout(() => {
      scrollToSection(targetId, cleanPath);
    }, 150);
    return;
  }

  isProgrammaticScrolling = true;
  if (scrollTimeout) clearTimeout(scrollTimeout);

  if (sectionId === 'home') {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  } else {
    const element = document.getElementById(sectionId);
    if (element) {
      const navOffset = 65;
      const elementTop = element.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({
        top: Math.max(0, elementTop - navOffset),
        behavior: 'smooth'
      });
    }
  }

  // Update browser address bar cleanly without #
  if (window.location.pathname !== cleanPath) {
    try {
      window.history.pushState({ section: sectionId }, '', cleanPath);
    } catch (e) {}
  }

  // Unlock scroll spy after smooth scroll completes
  scrollTimeout = setTimeout(() => {
    isProgrammaticScrolling = false;
  }, 750);
};

export const updateCleanUrl = (sectionId) => {
  if (isProgrammaticScrolling || ['/ruins', '/words-left-in-the-ruins'].includes(window.location.pathname)) return;
  const cleanPath = sectionId === 'home' ? '/' : `/${sectionId}`;
  if (window.location.pathname !== cleanPath) {
    try {
      window.history.replaceState({ section: sectionId }, '', cleanPath);
    } catch (e) {}
  }
};
