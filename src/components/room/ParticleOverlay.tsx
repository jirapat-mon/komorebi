"use client";

import { useRoomStore } from "@/stores/useRoomStore";
import { useRef, useEffect, useCallback } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  baseOpacity: number;
}

export function ParticleOverlay() {
  const particlesEnabled = useRoomStore((s) => s.particlesEnabled);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animFrameRef = useRef<number>(0);

  const initParticles = useCallback((width: number, height: number) => {
    const count = 30;
    particlesRef.current = Array.from({ length: count }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.3,
      vy: -0.1 - Math.random() * 0.2,
      size: 1 + Math.random() * 2,
      opacity: 0.1 + Math.random() * 0.3,
      baseOpacity: 0.1 + Math.random() * 0.3,
    }));
  }, []);

  useEffect(() => {
    if (!particlesEnabled) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      if (particlesRef.current.length === 0) {
        initParticles(canvas.width, canvas.height);
      }
    };

    resize();
    window.addEventListener("resize", resize);

    let time = 0;
    const animate = () => {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      time += 0.01;

      particlesRef.current.forEach((p) => {
        // Gentle drift
        p.x += p.vx + Math.sin(time + p.y * 0.01) * 0.1;
        p.y += p.vy;

        // Pulsing opacity
        p.opacity = p.baseOpacity + Math.sin(time * 2 + p.x * 0.01) * 0.1;

        // Wrap around
        if (p.y < -10) p.y = canvas.height + 10;
        if (p.x < -10) p.x = canvas.width + 10;
        if (p.x > canvas.width + 10) p.x = -10;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(245, 158, 11, ${Math.max(0, p.opacity)})`;
        ctx.fill();
      });

      animFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animFrameRef.current);
      window.removeEventListener("resize", resize);
    };
  }, [particlesEnabled, initParticles]);

  if (!particlesEnabled) return null;

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-20"
    />
  );
}
