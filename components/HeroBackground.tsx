"use client";

import { useEffect, useRef, useState } from "react";

export function HeroBackground() {
  const [videoOk, setVideoOk] = useState(true);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (videoOk) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      canvas.width = canvas.offsetWidth * dpr;
      canvas.height = canvas.offsetHeight * dpr;
    };
    resize();

    const particles = Array.from({ length: 110 }, () => ({
      x: Math.random(),
      y: Math.random(),
      r: Math.random() * 1.8 + 0.4,
      s: Math.random() * 0.0004 + 0.00012,
      a: Math.random() * 0.6 + 0.2,
    }));

    const draw = () => {
      const W = canvas.width;
      const H = canvas.height;

      const g = ctx.createLinearGradient(0, 0, 0, H);
      g.addColorStop(0, "#050b1a");
      g.addColorStop(0.55, "#0a1a38");
      g.addColorStop(1, "#071026");
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, W, H);

      ctx.fillStyle = "#4da3ff";
      for (const p of particles) {
        p.y -= p.s;
        if (p.y < -0.02) p.y = 1.02;
        const x = p.x * W;
        const y = p.y * H;
        ctx.globalAlpha = p.a * 0.45;
        ctx.beginPath();
        ctx.arc(x, y, p.r * dpr, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);

    window.addEventListener("resize", resize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, [videoOk]);

  return (
    <div className="absolute inset-0 z-0 overflow-hidden bg-navy-deep">
      {/* ambient radial glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(10,132,255,0.14)_0%,transparent_62%)]" />

      {videoOk && (
        <video
          className="absolute inset-0 h-full w-full object-cover opacity-45"
          src="/hero-bg.mp4"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          onError={() => setVideoOk(false)}
        />
      )}

      {!videoOk && (
        <canvas ref={canvasRef} className="absolute inset-0 h-full w-full opacity-70" />
      )}

      {/* tech grid + depth shading */}
      <div className="absolute inset-0 bg-grid-dark opacity-70" />
      <div className="absolute inset-0 bg-gradient-to-b from-navy-deep/70 via-transparent to-navy-deep" />
    </div>
  );
}
