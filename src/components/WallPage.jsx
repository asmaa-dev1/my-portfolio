import React from 'react';
import Navbar from './Navbar';
import VisitorWall from './VisitorWall';
import Footer from './Footer';
import BackgroundAtmosphere from './BackgroundAtmosphere';

export default function WallPage() {
  return (
    <div className="min-h-screen bg-[var(--color-bg)] text-[var(--color-text)] selection:bg-[#d4547e] selection:text-white relative transition-colors duration-300">
      {/* Ambient Cyber Atmosphere */}
      <BackgroundAtmosphere />

      {/* Floating Navbar */}
      <Navbar />

      {/* Main Wall Content Container */}
      <main className="relative pt-28 pb-16 max-w-6xl mx-auto px-6">
        <VisitorWall />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
