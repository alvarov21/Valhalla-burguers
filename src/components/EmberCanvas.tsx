"use client";

import React, { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  alpha: number;
  decay: number;
  isGold: boolean;
}

export default function EmberCanvas({
  maxParticles = 42,
  className = "",
}: {
  maxParticles?: number;
  className?: string;
}) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId = 0;
    let isVisible = true;
    let width = (canvas.width = canvas.offsetWidth || window.innerWidth);
    let height = (canvas.height = canvas.offsetHeight || window.innerHeight);

    const createParticle = (startBottom = false): Particle => ({
      x: Math.random() * width,
      y: startBottom ? height + Math.random() * 40 : Math.random() * height,
      vx: (Math.random() - 0.5) * 0.35,
      vy: -(0.25 + Math.random() * 0.65),
      radius: 0.8 + Math.random() * 1.9,
      alpha: 0.15 + Math.random() * 0.65,
      decay: 0.0008 + Math.random() * 0.0018,
      isGold: Math.random() > 0.45,
    });

    const particles: Particle[] = Array.from({ length: maxParticles }, () =>
      createParticle(false)
    );

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth || window.innerWidth;
      height = canvas.height = canvas.offsetHeight || window.innerHeight;
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isVisible = entry.isIntersecting;
        });
      },
      { threshold: 0.05 }
    );

    observer.observe(canvas);
    window.addEventListener("resize", handleResize);

    const render = () => {
      if (isVisible) {
        ctx.clearRect(0, 0, width, height);
        for (let i = 0; i < particles.length; i++) {
          const p = particles[i];
          p.x += p.vx;
          p.y += p.vy;
          p.alpha -= p.decay;

          if (p.y < -10 || p.alpha <= 0.02) {
            particles[i] = createParticle(true);
            continue;
          }

          ctx.save();
          ctx.beginPath();
          const color = p.isGold
            ? `rgba(200, 164, 110, ${p.alpha})`
            : `rgba(217, 88, 43, ${p.alpha})`;
          ctx.fillStyle = color;
          ctx.shadowColor = p.isGold ? "#C8A46E" : "#D9582B";
          ctx.shadowBlur = 8;
          ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        }
      }
      animationFrameId = window.requestAnimationFrame(render);
    };

    render();

    return () => {
      window.cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      observer.disconnect();
    };
  }, [maxParticles]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}
    />
  );
}
