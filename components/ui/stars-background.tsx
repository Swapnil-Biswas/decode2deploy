"use client";

import { useEffect, useRef } from "react";

interface Star {
  x: number; y: number; r: number;
  base: number; speed: number; phase: number;
}
interface Shooter {
  x: number; y: number; vx: number; vy: number;
  len: number; life: number; max: number; active: boolean;
}

export function StarsBackground() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf: number;
    let stars: Star[] = [];
    let shooters: Shooter[] = [];
    let t = 0;

    const init = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      const n = Math.min(Math.floor((canvas.width * canvas.height) / 2600), 450);
      stars = Array.from({ length: n }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 1.5 + 0.2,
        base: Math.random() * 0.6 + 0.2,
        speed: Math.random() * 0.014 + 0.003,
        phase: Math.random() * Math.PI * 2,
      }));
    };

    const spawn = () => {
      const spd = Math.random() * 7 + 5;
      const ang = Math.PI / 5 + (Math.random() - 0.5) * 0.5;
      shooters.push({
        x: Math.random() * canvas.width * 0.6,
        y: Math.random() * canvas.height * 0.5,
        vx: Math.cos(ang) * spd, vy: Math.sin(ang) * spd,
        len: Math.random() * 100 + 50,
        life: 0, max: Math.random() * 55 + 35, active: true,
      });
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      t++;

      for (const s of stars) {
        const tw = 0.55 + 0.45 * Math.sin(t * s.speed + s.phase);
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${(s.base * tw).toFixed(3)})`;
        ctx.fill();
      }

      if (t % 190 === 0 && Math.random() < 0.7) spawn();

      shooters = shooters.filter((s) => s.active);
      for (const s of shooters) {
        s.life++;
        if (s.life >= s.max) { s.active = false; continue; }
        s.x += s.vx; s.y += s.vy;
        const p = s.life / s.max;
        const a = p < 0.15 ? p / 0.15 : 1 - (p - 0.15) / 0.85;
        const spd = Math.hypot(s.vx, s.vy);
        const g = ctx.createLinearGradient(
          s.x, s.y,
          s.x - (s.vx / spd) * s.len, s.y - (s.vy / spd) * s.len
        );
        g.addColorStop(0, `rgba(255,255,255,${(a * 0.9).toFixed(3)})`);
        g.addColorStop(0.4, `rgba(180,210,255,${(a * 0.4).toFixed(3)})`);
        g.addColorStop(1, "rgba(255,255,255,0)");
        ctx.beginPath();
        ctx.moveTo(s.x, s.y);
        ctx.lineTo(s.x - (s.vx / spd) * s.len, s.y - (s.vy / spd) * s.len);
        ctx.strokeStyle = g;
        ctx.lineWidth = 1.5;
        ctx.stroke();
      }

      raf = requestAnimationFrame(draw);
    };

    window.addEventListener("resize", init);
    init();
    draw();
    return () => { window.removeEventListener("resize", init); cancelAnimationFrame(raf); };
  }, []);

  return <canvas ref={ref} aria-hidden className="fixed inset-0 z-0 pointer-events-none" />;
}
