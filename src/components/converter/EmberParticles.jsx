import React, { useEffect, useRef } from 'react';

const EMBER_COUNT = 40;
const FEATHER_COUNT = 12;

export default function EmberParticles() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationId;
    let particles = [];
    let w, h;

    const resize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    };

    const rand = (min, max) => Math.random() * (max - min) + min;
    const randInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

    const createEmber = (yOverride) => ({
      type: 'ember',
      x: rand(0, w),
      y: yOverride ?? rand(0, h),
      size: rand(1.5, 4),
      speed: rand(0.3, 1.2),
      drift: rand(-0.3, 0.3),
      opacity: rand(0.3, 0.9),
      flicker: rand(0.02, 0.06),
      life: rand(0.3, 1),
      hue: Math.random() > 0.5 ? randInt(320, 345) : randInt(10, 30),
    });

    const createFeather = (yOverride) => ({
      type: 'feather',
      x: rand(-20, w + 20),
      y: yOverride ?? rand(-20, h + 20),
      size: rand(8, 18),
      speed: rand(0.15, 0.5),
      drift: rand(-0.5, 0.5),
      sway: rand(0.3, 1),
      swaySpeed: rand(0.01, 0.03),
      swayOffset: rand(0, Math.PI * 2),
      rotation: rand(0, Math.PI * 2),
      rotationSpeed: rand(-0.01, 0.01),
      opacity: rand(0.08, 0.2),
      hue: Math.random() > 0.5 ? randInt(320, 340) : randInt(340, 360),
    });

    const init = () => {
      resize();
      particles = [];
      for (let i = 0; i < EMBER_COUNT; i++) particles.push(createEmber());
      for (let i = 0; i < FEATHER_COUNT; i++) particles.push(createFeather());
    };

    const drawFeather = (p) => {
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rotation);
      ctx.globalAlpha = p.opacity;

      // Feather shape - an elongated teardrop with a central spine
      const size = p.size;
      const featherColor = `hsl(${p.hue}, 90%, 70%)`;

      // Spine
      ctx.beginPath();
      ctx.moveTo(-size * 0.6, 0);
      ctx.lineTo(size * 0.7, 0);
      ctx.strokeStyle = `hsl(${p.hue}, 80%, 80%)`;
      ctx.lineWidth = 0.5;
      ctx.globalAlpha = p.opacity * 1.5;
      ctx.stroke();

      // Left barbs
      ctx.globalAlpha = p.opacity;
      ctx.fillStyle = featherColor;
      ctx.beginPath();
      ctx.moveTo(-size * 0.6, 0);
      ctx.quadraticCurveTo(-size * 0.1, -size * 0.45, size * 0.5, -size * 0.05);
      ctx.quadraticCurveTo(size * 0.1, -size * 0.08, size * 0.7, 0);
      ctx.quadraticCurveTo(size * 0.1, size * 0.08, size * 0.5, size * 0.05);
      ctx.quadraticCurveTo(-size * 0.1, size * 0.45, -size * 0.6, 0);
      ctx.closePath();
      ctx.fill();

      ctx.restore();
    };

    const drawEmber = (p) => {
      ctx.save();
      ctx.globalAlpha = p.opacity;

      // Glow
      const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 3);
      gradient.addColorStop(0, `hsla(${p.hue}, 100%, 70%, 0.6)`);
      gradient.addColorStop(0.4, `hsla(${p.hue}, 100%, 60%, 0.2)`);
      gradient.addColorStop(1, 'transparent');
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size * 3, 0, Math.PI * 2);
      ctx.fill();

      // Core
      ctx.fillStyle = `hsl(${p.hue}, 100%, 80%)`;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();
    };

    const animate = () => {
      ctx.clearRect(0, 0, w, h);

      particles.forEach((p) => {
        if (p.type === 'ember') {
          p.y -= p.speed;
          p.x += p.drift + Math.sin(Date.now() * 0.002 + p.x * 0.01) * 0.2;
          p.opacity += (Math.random() - 0.5) * p.flicker;
          p.opacity = Math.max(0.15, Math.min(0.85, p.opacity));
          p.life -= 0.0003;
          if (p.y < -20 || p.life <= 0 || p.x < -20 || p.x > w + 20) {
            Object.assign(p, createEmber(h + 20));
          }
        } else {
          p.y -= p.speed;
          p.x += p.drift + Math.sin(Date.now() * p.swaySpeed + p.swayOffset) * p.sway;
          p.rotation += p.rotationSpeed;
          if (p.y < -40 || p.x < -40 || p.x > w + 40) {
            Object.assign(p, createFeather(h + 40));
          }
        }
      });

      particles.forEach((p) => {
        if (p.type === 'ember') drawEmber(p);
        else drawFeather(p);
      });

      animationId = requestAnimationFrame(animate);
    };

    init();
    animate();
    window.addEventListener('resize', init);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', init);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ opacity: 0.7 }}
    />
  );
}