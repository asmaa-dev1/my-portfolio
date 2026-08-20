import React, { useEffect, useRef } from 'react';

export default function Globe3D({ size = 260, color = '#d4547e', glowColor = '#18CCFC' }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId;
    let rotation = 0;

    // Generate points on sphere using Fibonacci distribution & land distribution
    const numPoints = 650;
    const points = [];

    // Realistic simplified world landmass approximations (lat, lon ranges in radians)
    // Africa, Europe, Americas, Asia, Australia
    const isLand = (lat, lon) => {
      // Normalize lon to -PI to PI
      let l = ((lon + Math.PI) % (2 * Math.PI)) - Math.PI;
      let lt = lat * (180 / Math.PI);
      let ln = l * (180 / Math.PI);

      // Africa & Europe & Middle East
      if (lt > -35 && lt < 70 && ln > -20 && ln < 55) return true;
      // Asia & India
      if (lt > 0 && lt < 75 && ln >= 55 && ln < 145) return true;
      // North America
      if (lt > 10 && lt < 75 && ln > -170 && ln < -50) return true;
      // South America
      if (lt > -55 && lt <= 12 && ln > -85 && ln < -35) return true;
      // Australia & Indonesia
      if (lt > -45 && lt < 0 && ln > 95 && ln < 160) return true;
      // Morocco & NW Africa highlight
      if (lt >= 20 && lt <= 36 && ln >= -15 && ln <= 0) return true;

      return Math.random() < 0.12; // faint ocean dots for sphere volume
    };

    const phi = (1 + Math.sqrt(5)) / 2; // Golden ratio
    for (let i = 0; i < numPoints; i++) {
      const y = 1 - (i / (numPoints - 1)) * 2; // y goes from 1 to -1
      const radiusAtY = Math.sqrt(1 - y * y);
      const theta = (2 * Math.PI * i) / phi;

      const x = Math.cos(theta) * radiusAtY;
      const z = Math.sin(theta) * radiusAtY;

      const lat = Math.asin(y);
      const lon = Math.atan2(z, x);

      const isLandPoint = isLand(lat, lon);
      // Only keep points that represent land or sparse ocean
      if (isLandPoint || Math.random() < 0.2) {
        points.push({
          x,
          y,
          z,
          isMorocco: lat >= 0.35 && lat <= 0.62 && lon >= -0.26 && lon <= 0.05,
          isLand: isLandPoint
        });
      }
    }

    const radius = size * 0.42;
    const centerX = size / 2;
    const centerY = size / 2;

    const render = () => {
      ctx.clearRect(0, 0, size, size);

      // Background ambient atmospheric glow
      const bgGlow = ctx.createRadialGradient(centerX, centerY, radius * 0.3, centerX, centerY, radius * 1.3);
      bgGlow.addColorStop(0, 'rgba(212, 84, 126, 0.08)');
      bgGlow.addColorStop(0.7, 'rgba(24, 204, 252, 0.03)');
      bgGlow.addColorStop(1, 'transparent');
      ctx.fillStyle = bgGlow;
      ctx.fillRect(0, 0, size, size);

      // Sphere halo ring
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius + 2, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(212, 84, 126, 0.18)';
      ctx.lineWidth = 1;
      ctx.stroke();

      rotation += 0.006;

      // Sort points by Z to render back-to-front
      const transformed = points.map((p) => {
        // Rotate around Y axis
        const cosR = Math.cos(rotation);
        const sinR = Math.sin(rotation);
        const rx = p.x * cosR - p.z * sinR;
        const rz = p.x * sinR + p.z * cosR;

        // Slight tilt around X axis (23.5 degrees)
        const tilt = 0.25;
        const cosT = Math.cos(tilt);
        const sinT = Math.sin(tilt);
        const ry = p.y * cosT - rz * sinT;
        const finalZ = p.y * sinT + rz * cosT;

        return {
          px: centerX + rx * radius,
          py: centerY + ry * radius,
          pz: finalZ,
          isMorocco: p.isMorocco,
          isLand: p.isLand
        };
      });

      transformed.sort((a, b) => a.pz - b.pz);

      // Render points
      for (const p of transformed) {
        // Only draw or fade points on the back
        const alpha = p.pz > 0 ? Math.min(1, 0.2 + p.pz * 0.8) : Math.max(0.04, (p.pz + 1) * 0.15);
        const dotRadius = p.pz > 0 ? (p.isMorocco ? 3.2 : p.isLand ? 1.8 : 1.0) : 0.8;

        ctx.beginPath();
        ctx.arc(p.px, p.py, dotRadius, 0, Math.PI * 2);

        if (p.isMorocco && p.pz > 0) {
          // Glowing Moroccan beacon
          ctx.fillStyle = '#22c55e';
          ctx.shadowColor = '#22c55e';
          ctx.shadowBlur = 10;
          ctx.fill();
          ctx.shadowBlur = 0;
        } else if (p.isLand) {
          ctx.fillStyle = p.pz > 0 ? `rgba(212, 84, 126, ${alpha})` : `rgba(255, 255, 255, ${alpha * 0.3})`;
          ctx.fill();
        } else {
          ctx.fillStyle = `rgba(24, 204, 252, ${alpha * 0.4})`;
          ctx.fill();
        }
      }

      // Draw radar sweep line across globe
      const sweepX = centerX + Math.sin(rotation * 2) * radius * 0.9;
      const sweepGrad = ctx.createLinearGradient(sweepX - 20, 0, sweepX + 20, 0);
      sweepGrad.addColorStop(0, 'transparent');
      sweepGrad.addColorStop(0.5, 'rgba(212, 84, 126, 0.12)');
      sweepGrad.addColorStop(1, 'transparent');
      ctx.fillStyle = sweepGrad;
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
      ctx.fill();

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [size, color, glowColor]);

  return (
    <div className="relative flex items-center justify-center pointer-events-none select-none">
      <canvas
        ref={canvasRef}
        width={size}
        height={size}
        className="w-full h-auto max-w-[280px] drop-shadow-[0_0_25px_rgba(212,84,126,0.25)]"
      />
    </div>
  );
}
