"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

export default function LiquidWorkSection() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const section = sectionRef.current;
    if (!canvas || !section) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number | null = null;
    let isVisible = false;
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.parentElement?.clientWidth || window.innerWidth;
      height = canvas.height = canvas.parentElement?.clientHeight || window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    const dropSpawnPoints = [
      { relX: -0.32, relY: 0.12 },
      { relX: -0.25, relY: 0.15 },
      { relX: -0.09, relY: 0.14 },
      { relX: 0.08, relY: 0.16 },
      { relX: 0.28, relY: 0.13 },
      { relX: 0.35, relY: 0.15 },
    ];

    interface DropletType {
      x: number;
      y: number;
      vx: number;
      vy: number;
      gravity: number;
      size: number;
      targetY: number;
      alpha: number;
      color: string;
      update: () => boolean;
      draw: (c: CanvasRenderingContext2D) => void;
    }

    interface RippleType {
      x: number;
      y: number;
      radius: number;
      maxRadius: number;
      alpha: number;
      expansionRate: number;
      update: () => boolean;
      draw: (c: CanvasRenderingContext2D) => void;
    }

    const droplets: DropletType[] = [];
    const ripples: RippleType[] = [];

    class Droplet implements DropletType {
      x: number;
      y: number;
      vx: number;
      vy: number;
      gravity: number;
      size: number;
      targetY: number;
      alpha: number;
      color: string;

      constructor(x: number, y: number) {
        this.x = x + (Math.random() - 0.5) * 12;
        this.y = y;
        this.vx = (Math.random() - 0.5) * 0.4;
        this.vy = Math.random() * 0.8 + 0.6;
        this.gravity = 0.16 + Math.random() * 0.05;
        this.size = Math.random() * 3.5 + 2.5;
        this.targetY = height * 0.78 + (Math.random() - 0.5) * 40;
        this.alpha = 0.95;
        this.color = "#ddbf92";
      }

      update() {
        this.vy += this.gravity;
        this.y += this.vy;
        this.x += this.vx;

        if (this.y >= this.targetY) {
          ripples.push(new Ripple(this.x, this.targetY, this.size * 1.6));
          return false;
        }
        return true;
      }

      draw(c: CanvasRenderingContext2D) {
        c.save();
        c.fillStyle = this.color;
        c.globalAlpha = this.alpha;
        c.beginPath();
        const stretch = Math.min(this.vy * 1.5, 9);
        c.ellipse(this.x, this.y, this.size * 0.8, this.size + stretch, 0, 0, Math.PI * 2);
        c.fill();

        c.fillStyle = "#ffffff";
        c.globalAlpha = 0.5;
        c.beginPath();
        c.arc(this.x - 1, this.y - stretch * 0.3, this.size * 0.35, 0, Math.PI * 2);
        c.fill();
        c.restore();
      }
    }

    class Ripple implements RippleType {
      x: number;
      y: number;
      radius: number;
      maxRadius: number;
      alpha: number;
      expansionRate: number;

      constructor(x: number, y: number, maxRadius: number) {
        this.x = x;
        this.y = y;
        this.radius = 2;
        this.maxRadius = maxRadius * 4;
        this.alpha = 0.75;
        this.expansionRate = 0.8 + Math.random() * 0.6;
      }

      update() {
        this.radius += this.expansionRate;
        this.alpha -= 0.024;
        return this.alpha > 0;
      }

      draw(c: CanvasRenderingContext2D) {
        c.save();
        c.strokeStyle = "#ddbf92";
        c.lineWidth = 1.2;
        c.globalAlpha = Math.max(this.alpha, 0);
        c.beginPath();
        c.ellipse(this.x, this.y, this.radius * 2.2, this.radius * 0.55, 0, 0, Math.PI * 2);
        c.stroke();
        c.restore();
      }
    }

    let lastSpawn = performance.now();

    const spawnDrops = () => {
      const now = performance.now();
      if (now - lastSpawn > 380) {
        lastSpawn = now;
        const origin = dropSpawnPoints[Math.floor(Math.random() * dropSpawnPoints.length)];
        const centerX = width / 2;
        const centerY = height / 2;
        const spawnX = centerX + origin.relX * Math.min(width * 0.9, 1050);
        const spawnY = centerY + origin.relY * 220;
        droplets.push(new Droplet(spawnX, spawnY));
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!canvas || !isVisible) return;
      const rect = canvas.getBoundingClientRect();
      const clientX = e.clientX - rect.left;
      const clientY = e.clientY - rect.top;

      if (Math.random() > 0.65) {
        const drop = new Droplet(clientX, clientY);
        drop.vy = Math.random() * 1.5;
        droplets.push(drop);
      }

      if (containerRef.current) {
        const xPercent = (clientX / width) - 0.5;
        const yPercent = (clientY / height) - 0.5;
        containerRef.current.style.transform = `translate3d(${xPercent * 12}px, ${yPercent * 10}px, 0) rotateX(${-yPercent * 5}deg) rotateY(${xPercent * 6}deg)`;
      }
    };

    section.addEventListener("mousemove", handleMouseMove);

    const render = () => {
      if (!isVisible) return;
      ctx.clearRect(0, 0, width, height);
      spawnDrops();

      for (let i = droplets.length - 1; i >= 0; i--) {
        if (!droplets[i].update()) {
          droplets.splice(i, 1);
        } else {
          droplets[i].draw(ctx);
        }
      }

      for (let j = ripples.length - 1; j >= 0; j--) {
        if (!ripples[j].update()) {
          ripples.splice(j, 1);
        } else {
          ripples[j].draw(ctx);
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
        if (isVisible) {
          if (!animationFrameId) {
            animationFrameId = requestAnimationFrame(render);
          }
        } else {
          if (animationFrameId) {
            cancelAnimationFrame(animationFrameId);
            animationFrameId = null;
          }
        }
      },
      { threshold: 0.05 }
    );

    observer.observe(section);

    return () => {
      window.removeEventListener("resize", handleResize);
      section.removeEventListener("mousemove", handleMouseMove);
      observer.disconnect();
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="work"
      className="snap-section h-screen min-h-[560px] w-full select-none bg-[#0a0a0c] text-white flex flex-col justify-between relative font-mono overflow-hidden py-8 sm:py-12 px-4 md:px-12"
    >
      {/* SVG Filters for Liquid Gooey Physics */}
      <svg aria-hidden="true" className="absolute w-0 h-0 pointer-events-none">
        <defs>
          <filter id="gooey-filter">
            <feGaussianBlur in="SourceGraphic" result="blur" stdDeviation="4.5" />
            <feColorMatrix
              in="blur"
              mode="matrix"
              result="goo"
              values="1 0 0 0 0  
                      0 1 0 0 0  
                      0 0 1 0 0  
                      0 0 0 19 -8"
            />
            <feComposite in="SourceGraphic" in2="goo" operator="atop" />
          </filter>
        </defs>
      </svg>

      {/* Background Layer */}
      <div className="absolute inset-0 bg-grid-lines pointer-events-none z-0"></div>
      <div className="absolute inset-0 bg-radial from-[#ddbf92]/5 via-transparent to-[#0a0a0c] pointer-events-none z-0"></div>

      {/* Interactive Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 z-10 pointer-events-none w-full h-full"
      />

      {/* Header */}
      <header className="relative z-20 w-full pt-4 flex flex-col items-center justify-between">
        {/* Tech Stack Bar */}
        <nav className="w-full flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-[10px] md:text-xs tracking-[0.25em] uppercase text-zinc-500 font-medium">
          <span className="hover:text-zinc-300 transition-colors cursor-pointer">Next.js</span>
          <span className="text-zinc-800">•</span>
          <span className="hover:text-zinc-300 transition-colors cursor-pointer">React</span>
          <span className="text-zinc-800">•</span>
          <span className="hover:text-zinc-300 transition-colors cursor-pointer">TypeScript</span>
          <span className="text-zinc-800">•</span>
          <span className="text-[#ddbf92] font-semibold tracking-[0.3em] px-2.5 py-0.5 rounded border border-[#ddbf92]/20 bg-[#ddbf92]/5 shadow-[0_0_12px_rgba(221,191,146,0.15)] cursor-pointer">
            PostgreSQL
          </span>
          <span className="text-zinc-800">•</span>
          <span className="hover:text-zinc-300 transition-colors cursor-pointer">MSSQL</span>
          <span className="text-zinc-800">•</span>
          <span className="hover:text-zinc-300 transition-colors cursor-pointer">Prisma</span>
          <span className="text-zinc-800">•</span>
          <span className="hover:text-zinc-300 transition-colors cursor-pointer">Netsim N4</span>
        </nav>

        {/* Scroll Needle */}
        <div className="mt-8 flex flex-col items-center pointer-events-auto">
          <p className="text-[10px] md:text-[11px] tracking-[0.35em] text-zinc-400 uppercase font-light">
            PROJELERİ VE ÇALIŞMALARI KEŞFEDİN
          </p>
          <div className="mt-2 flex flex-col items-center animate-bounce">
            <div className="w-[1px] h-6 bg-gradient-to-b from-zinc-500 to-[#ddbf92]/80"></div>
            <div className="w-1.5 h-1.5 rounded-full border border-[#ddbf92] bg-transparent -mt-0.5"></div>
          </div>
        </div>
      </header>

      {/* Centerpiece: WORK Liquid Typography */}
      <main className="relative z-20 flex-1 flex items-center justify-center w-full my-auto py-12">
        <div
          ref={containerRef}
          className="transition-transform duration-200 ease-out will-change-transform flex items-center justify-center cursor-crosshair"
        >
          <div className="gooey-filter-target relative select-none">
            <motion.h2
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-[20vw] md:text-[22vw] lg:text-[240px] font-black uppercase tracking-tighter leading-none text-[#ddbf92] drop-shadow-[0_20px_40px_rgba(0,0,0,0.8)]"
              style={{
                fontFamily: "'Syne', sans-serif",
                textShadow: "0 0 35px rgba(221,191,146,0.3)",
              }}
            >
              WORK
            </motion.h2>

            {/* Gooey Droplet Bulges */}
            <div className="absolute -bottom-3 left-[18%] w-5 h-7 bg-[#ddbf92] rounded-full filter blur-[1px]"></div>
            <div className="absolute -bottom-4 left-[38%] w-4 h-6 bg-[#ddbf92] rounded-full filter blur-[1px]"></div>
            <div className="absolute -bottom-3 left-[62%] w-5 h-7 bg-[#ddbf92] rounded-full filter blur-[1px]"></div>
            <div className="absolute -bottom-4 left-[82%] w-4 h-6 bg-[#ddbf92] rounded-full filter blur-[1px]"></div>
          </div>
        </div>
      </main>

      {/* Footer Navigation Link */}
      <footer className="relative z-20 w-full flex items-center justify-between text-xs text-zinc-500 font-mono tracking-widest pb-4">
        <span>[ SEÇİLMİŞ PROJELER 2023 - 2026 ]</span>
        <a
          href="#showcase"
          className="text-[#ddbf92] hover:underline uppercase tracking-widest flex items-center gap-1.5"
        >
          PROJE VİTRİNİNİ İNCELEYİN ↓
        </a>
      </footer>
    </section>
  );
}
