import React, { useEffect, useRef } from 'react';

export default function BackgroundAtmosphere() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    // Subtle drifting stars/particles
    const numParticles = 45;
    const particles = Array.from({ length: numParticles }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 1.5 + 0.4,
      vx: (Math.random() - 0.5) * 0.25,
      vy: (Math.random() - 0.5) * 0.25,
      color: Math.random() > 0.6 ? 'rgba(212, 84, 126, ' : Math.random() > 0.3 ? 'rgba(99, 68, 245, ' : 'rgba(24, 204, 252, ',
      baseAlpha: Math.random() * 0.45 + 0.1,
      phase: Math.random() * Math.PI * 2
    }));

    let tick = 0;

    const render = () => {
      tick += 0.015;
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        const currentAlpha = p.baseAlpha + Math.sin(tick + p.phase) * 0.15;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `${p.color}${Math.max(0.05, currentAlpha)})`;
        ctx.shadowColor = p.color.includes('212') ? '#d4547e' : '#6344F5';
        ctx.shadowBlur = 8;
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* 1. Subtle Dot Matrix Texture */}
      <div className="absolute inset-0 bg-dots-pattern opacity-40 dark:opacity-40 opacity-20" />

      {/* 2. Floating Ambient Glow Nebulas */}
      <div className="absolute -top-[10%] left-[15%] w-[550px] h-[550px] rounded-full bg-[#d4547e]/10 blur-[130px] aurora-orb" />
      <div className="absolute top-[35%] right-[10%] w-[600px] h-[600px] rounded-full bg-[#6344F5]/10 blur-[140px] aurora-orb-reverse" />
      <div className="absolute top-[65%] left-[8%] w-[500px] h-[500px] rounded-full bg-[#18CCFC]/8 blur-[120px] aurora-orb" />
      <div className="absolute top-[85%] right-[15%] w-[550px] h-[550px] rounded-full bg-[#d4547e]/8 blur-[130px] aurora-orb-reverse" />

      {/* 3. Smooth Canvas Particles */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full opacity-70" />
    </div>
  );
}
