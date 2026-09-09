"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";

const TECH_MARQUEE_ITEMS = [
  "Next.js 16",
  "React 19",
  "TypeScript",
  ".NET 9 / C#",
  "WinUI 3",
  "PostgreSQL",
  "Prisma",
  "MSSQL",
  "Tailwind CSS",
  "Netsim N4 ERP",
  "Electron.js",
  "FFmpeg",
  "Node.js",
  "REST API & 2FA",
];

export default function LiquidWorkSection() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const sectionRef = useRef<HTMLElement | null>(null);
  const cordContainerRef = useRef<HTMLDivElement | null>(null);

  // Cord pull & deluge states
  const [mounted, setMounted] = useState(false);
  const [pullProgress, setPullProgress] = useState(0); // 0 to 1
  const [isTugging, setIsTugging] = useState(false);
  const [isFlushing, setIsFlushing] = useState(false);

  const pullProgressRef = useRef(0);
  const isFlushingRef = useRef(false);
  const isVisibleRef = useRef(false);
  const surgeActiveRef = useRef(false);
  const decayTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Drag interaction refs
  const isDraggingRef = useRef(false);
  const dragStartYRef = useRef(0);

  useEffect(() => {
    setMounted(true);
  }, []);

  /**
   * Trigger the Golden Liquid Deluge & Navigation to Showcase
   */
  const triggerDeluge = useCallback(() => {
    if (isFlushingRef.current) return;
    isFlushingRef.current = true;
    setIsFlushing(true);
    setIsTugging(true);
    surgeActiveRef.current = true;

    // Quick snap recoil on the cord
    setTimeout(() => {
      setIsTugging(false);
    }, 180);

    // At the climax of the golden waterfall (when it fully covers the screen at ~480ms),
    // trigger the slide transition to the next section (#showcase)
    setTimeout(() => {
      const win = window as unknown as {
        __portfolioTriggerSlideChange?: ((dir: number) => void) | null;
        __portfolioGoToSlide?: ((idx: number) => void) | null;
      };
      if (typeof win.__portfolioTriggerSlideChange === "function") {
        win.__portfolioTriggerSlideChange(1);
      } else if (typeof win.__portfolioGoToSlide === "function") {
        win.__portfolioGoToSlide(2);
      } else {
        document.getElementById("showcase")?.scrollIntoView({ behavior: "smooth" });
      }
    }, 480);

    // Stop canvas particle storm after the wave has passed
    setTimeout(() => {
      surgeActiveRef.current = false;
    }, 1200);

    // Reset deluge state after the full waterfall has drained off the screen
    setTimeout(() => {
      isFlushingRef.current = false;
      setIsFlushing(false);
      pullProgressRef.current = 0;
      setPullProgress(0);
    }, 1600);
  }, []);

  /**
   * Reset pull progress with elastic decay
   */
  const scheduleDecay = useCallback(() => {
    if (decayTimeoutRef.current) clearTimeout(decayTimeoutRef.current);
    decayTimeoutRef.current = setTimeout(() => {
      if (isFlushingRef.current) return;
      const step = () => {
        if (pullProgressRef.current > 0.02) {
          pullProgressRef.current *= 0.72;
          setPullProgress(pullProgressRef.current);
          requestAnimationFrame(step);
        } else {
          pullProgressRef.current = 0;
          setPullProgress(0);
        }
      };
      step();
    }, 420);
  }, []);

  /**
   * Direct Mouse Drag on the cord
   */
  const handleCordMouseDown = (e: React.MouseEvent) => {
    if (isFlushingRef.current) return;
    isDraggingRef.current = true;
    dragStartYRef.current = e.clientY;

    const handleMouseMove = (moveEvent: MouseEvent) => {
      if (!isDraggingRef.current) return;
      const dy = Math.max(0, moveEvent.clientY - dragStartYRef.current);
      const progress = Math.min(1, dy / 90);
      pullProgressRef.current = progress;
      setPullProgress(progress);
    };

    const handleMouseUp = () => {
      isDraggingRef.current = false;
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);

      if (pullProgressRef.current >= 0.7) {
        triggerDeluge();
      } else {
        scheduleDecay();
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
  };

  /**
   * Direct Touch Drag on the cord (mobile)
   */
  const handleCordTouchStart = (e: React.TouchEvent) => {
    if (isFlushingRef.current) return;
    isDraggingRef.current = true;
    dragStartYRef.current = e.touches[0].clientY;

    const handleTouchMove = (moveEvent: TouchEvent) => {
      if (!isDraggingRef.current) return;
      const dy = Math.max(0, moveEvent.touches[0].clientY - dragStartYRef.current);
      const progress = Math.min(1, dy / 90);
      pullProgressRef.current = progress;
      setPullProgress(progress);
    };

    const handleTouchEnd = () => {
      isDraggingRef.current = false;
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);

      if (pullProgressRef.current >= 0.7) {
        triggerDeluge();
      } else {
        scheduleDecay();
      }
    };

    window.addEventListener("touchmove", handleTouchMove);
    window.addEventListener("touchend", handleTouchEnd);
  };

  /**
   * Quick Click Trigger on the cord
   */
  const handleCordClick = () => {
    if (isFlushingRef.current) return;
    pullProgressRef.current = 1;
    setPullProgress(1);
    triggerDeluge();
  };

  /**
   * Canvas Liquid Physics & Particle Simulation
   */
  useEffect(() => {
    const canvas = canvasRef.current;
    const section = sectionRef.current;
    if (!canvas || !section) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number | null = null;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    const dropSpawnPoints = [
      { relX: -0.32, relY: 0.12 }, // Letter W left drip
      { relX: -0.25, relY: 0.15 }, // Letter W center drip
      { relX: -0.09, relY: 0.14 }, // Letter O underside
      { relX: 0.08, relY: 0.16 },  // Letter R leg drip
      { relX: 0.28, relY: 0.13 },  // Letter K bottom drip
      { relX: 0.35, relY: 0.15 },  // Letter K outer drip
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

      constructor(x: number, y: number, isStorm = false) {
        this.x = x + (Math.random() - 0.5) * (isStorm ? 35 : 12);
        this.y = y;
        this.vx = (Math.random() - 0.5) * (isStorm ? 1.5 : 0.4);
        this.vy = isStorm ? Math.random() * 4 + 6 : Math.random() * 0.8 + 0.6;
        this.gravity = isStorm ? 0.35 + Math.random() * 0.2 : 0.16 + Math.random() * 0.05;
        this.size = isStorm ? Math.random() * 5 + 3.5 : Math.random() * 3.5 + 2.5;
        this.targetY = height * 0.82 + (Math.random() - 0.5) * 40;
        this.alpha = 0.95;
        this.color = "#ddbf92";
      }

      update() {
        this.vy += this.gravity;
        this.y += this.vy;
        this.x += this.vx;

        if (this.y >= this.targetY) {
          ripples.push(new Ripple(this.x, this.targetY, this.size * 1.8));
          return false;
        }
        return true;
      }

      draw(c: CanvasRenderingContext2D) {
        c.save();
        c.fillStyle = this.color;
        c.globalAlpha = this.alpha;
        c.beginPath();
        const stretch = Math.min(this.vy * 1.8, 14);
        c.ellipse(this.x, this.y, this.size * 0.8, this.size + stretch, 0, 0, Math.PI * 2);
        c.fill();

        c.fillStyle = "#ffffff";
        c.globalAlpha = 0.6;
        c.beginPath();
        c.arc(this.x - 1, this.y - stretch * 0.35, this.size * 0.35, 0, Math.PI * 2);
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
        this.alpha = 0.8;
        this.expansionRate = 0.9 + Math.random() * 0.7;
      }

      update() {
        this.radius += this.expansionRate;
        this.alpha -= 0.022;
        return this.alpha > 0;
      }

      draw(c: CanvasRenderingContext2D) {
        c.save();
        c.strokeStyle = "#ddbf92";
        c.lineWidth = 1.3;
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
      const isMobile = width < 768;
      const spawnInterval = isMobile ? 500 : 360;

      // Normal ambient dripping from the WORK typography
      if (now - lastSpawn > spawnInterval) {
        lastSpawn = now;
        const origin = dropSpawnPoints[Math.floor(Math.random() * dropSpawnPoints.length)];
        const centerX = width / 2;
        const centerY = height / 2;
        const spawnX = centerX + origin.relX * Math.min(width * 0.9, 1050);
        const spawnY = centerY + origin.relY * 260;
        droplets.push(new Droplet(spawnX, spawnY, false));
      }

      // SURGE FLUSH: When the cord is pulled, spawn a torrential golden cloud of drops
      if (surgeActiveRef.current) {
        const stormBatch = isMobile ? 3 : 7;
        for (let s = 0; s < stormBatch; s++) {
          const spawnX = Math.random() * width;
          const spawnY = -20 + Math.random() * (height * 0.35);
          droplets.push(new Droplet(spawnX, spawnY, true));
        }
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!canvas || !isVisibleRef.current) return;
      const clientX = e.clientX;
      const clientY = e.clientY;

      if (Math.random() > 0.7) {
        const drop = new Droplet(clientX, clientY);
        drop.vy = Math.random() * 1.5;
        droplets.push(drop);
      }

      if (containerRef.current && window.innerWidth >= 768) {
        const xPercent = clientX / window.innerWidth - 0.5;
        const yPercent = clientY / window.innerHeight - 0.5;
        containerRef.current.style.transform = `translate3d(${xPercent * 10}px, ${yPercent * 8}px, 0) rotateX(${-yPercent * 4}deg) rotateY(${xPercent * 5}deg)`;
      }
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    const render = () => {
      if (!isVisibleRef.current) return;
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
        isVisibleRef.current = entry.isIntersecting;
        if (entry.isIntersecting) {
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
      { threshold: 0.1 }
    );

    observer.observe(section);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      observer.disconnect();
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="work"
      className="snap-section h-screen min-h-[520px] w-full max-w-[100vw] select-none bg-[#0a0a0c] text-white flex flex-col justify-between relative font-mono overflow-hidden py-4 sm:py-6 md:py-8 px-3 sm:px-6 md:px-12"
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

      {/* Background Architecture Layer */}
      <div className="absolute inset-0 bg-grid-lines pointer-events-none z-0"></div>
      <div className="absolute inset-0 vignette-overlay pointer-events-none z-0"></div>

      {/* Interactive Drops Canvas Layer */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 z-10 pointer-events-none w-full h-full"
        id="liquidCanvas"
      />

      {/* BEGIN: MainHeader */}
      <header className="relative z-20 w-full pt-2 sm:pt-5 px-2 sm:px-8 flex flex-col items-center justify-between">
        {/* Continuous Flowing Marquee (Right to Left / Kayar Yazı) */}
        <div className="w-full max-w-full overflow-hidden whitespace-nowrap py-1 relative select-none">
          {/* Subtle edge fade masks */}
          <div className="absolute left-0 inset-y-0 w-8 sm:w-16 bg-gradient-to-r from-[#050505] to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 inset-y-0 w-8 sm:w-16 bg-gradient-to-l from-[#050505] to-transparent z-10 pointer-events-none" />

          <motion.div
            className="flex items-center gap-6 sm:gap-10 whitespace-nowrap w-max"
            animate={{ x: ["0%", "-50%"] }}
            transition={{
              repeat: Infinity,
              ease: "linear",
              duration: 26,
            }}
          >
            {/* Duplicated list for seamless, gap-free infinite scrolling */}
            {[...TECH_MARQUEE_ITEMS, ...TECH_MARQUEE_ITEMS].map((tech, idx) => (
              <span
                key={idx}
                className="inline-flex items-center gap-3 sm:gap-5 text-[9px] sm:text-[10px] md:text-xs tracking-[0.14em] sm:tracking-[0.22em] uppercase font-mono text-zinc-400"
              >
                <span
                  className={
                    tech === "PostgreSQL" || tech === "Next.js 16"
                      ? "text-gold-champagne font-semibold px-2 py-0.5 rounded border border-gold-champagne/20 bg-gold-champagne/5 shadow-[0_0_10px_rgba(221,191,146,0.12)]"
                      : "hover:text-zinc-200 transition-colors"
                  }
                >
                  {tech}
                </span>
                <span className="text-zinc-700">•</span>
              </span>
            ))}
          </motion.div>
        </div>

        {/* Scroll Indicator & Interactive Pull-Cord to Showcase */}
        <div
          ref={cordContainerRef}
          onMouseDown={handleCordMouseDown}
          onTouchStart={handleCordTouchStart}
          onClick={handleCordClick}
          className="mt-2.5 sm:mt-5 flex flex-col items-center pointer-events-auto cursor-grab active:cursor-grabbing select-none group relative py-1.5 sm:py-2 px-3 sm:px-6"
          title="Aşağı kaydırın veya ipi çekerek sayfayı geçin"
        >
          <p className="text-[8.5px] sm:text-[10px] md:text-[11px] tracking-[0.14em] sm:tracking-[0.3em] text-zinc-400 uppercase font-light group-hover:text-gold-champagne transition-colors text-center whitespace-nowrap px-2">
            {pullProgress > 0.08
              ? `İPİ ÇEKİN [ ${Math.round(pullProgress * 100)}% ]`
              : "PROJELERİ VE ÇALIŞMALARI KEŞFEDİN"}
          </p>

          {/* Delicately styled descending needle icon / Pull-Cord */}
          <div
            className={`mt-2 flex flex-col items-center relative ${
              pullProgress === 0 ? "needle-animation" : ""
            }`}
            style={{
              transform: isTugging ? "translateY(22px) scale(0.94)" : "none",
              transition: isTugging ? "transform 0.15s cubic-bezier(0.2, 0, 0, 1)" : "none",
            }}
          >
            {/* Cord line that physically stretches with scroll or drag */}
            <div
              className="w-[1.5px] bg-gradient-to-b from-zinc-500 via-[#ddbf92] to-gold-champagne rounded-full transition-all duration-75"
              style={{
                height: `${24 + pullProgress * 75}px`,
                boxShadow:
                  pullProgress > 0.1
                    ? `0 0 ${pullProgress * 10}px rgba(221, 191, 146, 0.75)`
                    : "none",
              }}
            />

            {/* Bead handle at bottom of cord */}
            <div
              className="relative -mt-0.5 flex items-center justify-center transition-all duration-75"
              style={{
                transform: `scale(${1 + pullProgress * 0.35})`,
              }}
            >
              <div
                className="w-2.5 h-2.5 rounded-full border border-gold-champagne transition-colors duration-150"
                style={{
                  boxShadow: `0 0 ${6 + pullProgress * 14}px rgba(221, 191, 146, ${
                    0.5 + pullProgress * 0.5
                  })`,
                  backgroundColor: pullProgress > 0.5 ? "#ddbf92" : "transparent",
                }}
              />
              {/* Dynamic Ping Ring when tension builds */}
              {pullProgress > 0.3 && (
                <div className="absolute inset-0 rounded-full border border-gold-champagne animate-ping opacity-60" />
              )}
            </div>

            {/* Micro Helper Tag */}
            {pullProgress > 0.05 && (
              <span className="mt-1 text-[8px] font-mono tracking-widest text-gold-champagne uppercase font-bold animate-pulse">
                {pullProgress >= 0.94 ? "AKIŞ BAŞLATILIYOR!" : "AŞAĞI ÇEKİN ↓"}
              </span>
            )}
          </div>
        </div>
      </header>
      {/* END: MainHeader */}

      {/* BEGIN: MainContent */}
      <main className="relative z-20 flex-1 flex items-center justify-center w-full px-4 md:px-12 my-auto">
        {/* Central Gooey Vector Graphic: WORK with organic drips */}
        <div
          ref={containerRef}
          id="work-container"
          className="relative w-full max-w-6xl mx-auto flex items-center justify-center gooey-filter-target select-none transition-transform duration-150 ease-out will-change-transform"
        >
          <svg
            className="w-full h-auto max-h-[46vh] sm:max-h-[50vh] overflow-visible select-none drop-shadow-2xl mx-auto"
            viewBox="0 0 1170 350"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Ambient Backing Glow Filter */}
            <defs>
              <filter height="140%" id="liquid-glow" width="140%" x="-20%" y="-20%">
                <feGaussianBlur in="SourceAlpha" stdDeviation="10" />
                <feOffset dx="0" dy="6" result="offsetblur" />
                <feComponentTransfer>
                  <feFuncA slope="0.3" type="linear" />
                </feComponentTransfer>
                <feMerge>
                  <feMergeNode />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>
            <g className="cursor-pointer" fill="#ddbf92" filter="url(#liquid-glow)">
              {/* LETTER: W with melting bottom drops & fluid cuts */}
              <g className="letter-w" id="letter-w-group">
                <path
                  className="letter-path"
                  d="
                    M 35 45 
                    L 115 45 
                    L 160 200 
                    L 205 45 
                    L 285 45 
                    L 330 200 
                    L 375 45 
                    L 455 45 
                    L 380 270 
                    C 375 285 365 292 350 292
                    C 335 292 325 285 320 270
                    L 245 135 
                    L 170 270 
                    C 165 285 155 292 140 292 
                    C 125 292 115 285 110 270
                    L 35 45 
                    Z
                  "
                />
                {/* Custom Fluid Drops & Dripping Stems on 'W' */}
                <path
                  d="
                    M 165 260 
                    C 160 290, 150 320, 145 330 
                    C 142 338, 132 338, 130 330 
                    C 125 315, 132 270, 140 250 
                    Z
                  "
                />
                {/* Hanging droplet nodes on W (both feet) */}
                <circle cx="142" cy="336" r="6.5" />
                <circle cx="140" cy="354" r="3.5" />
                <circle cx="105" cy="280" r="5" />
                <circle cx="350" cy="318" r="7.5" />
                <circle cx="352" cy="336" r="4" />
                <circle cx="375" cy="295" r="5" />
                <circle cx="320" cy="290" r="4.5" />
              </g>

              {/* LETTER: O with bottom drip clusters & internal droplet */}
              <g className="letter-o" id="letter-o-group">
                {/* Outer and Inner compound circle for bold 'O' */}
                <path
                  className="letter-path"
                  fillRule="evenodd"
                  d="
                    M 550 40 
                    C 625 40, 680 95, 680 170 
                    C 680 245, 625 300, 550 300 
                    C 475 300, 420 245, 420 170 
                    C 420 95, 475 40, 550 40 
                    Z
                    M 550 105 
                    C 515 105, 495 132, 495 170 
                    C 495 208, 515 235, 550 235 
                    C 585 235, 605 208, 605 170 
                    C 605 132, 585 105, 550 105 
                    Z
                  "
                />
                {/* Dripping tendrils beneath 'O' */}
                <path
                  d="
                    M 440 230 
                    C 430 260, 410 275, 400 288 
                    C 392 298, 402 305, 412 298 
                    C 425 285, 442 260, 452 240 
                    Z
                  "
                />
                <circle cx="406" cy="302" r="7.5" />
                <circle cx="395" cy="324" r="4" />
                {/* Droplet inside 'O' cavity & bottom lip */}
                <circle className="animate-pulse-glow" cx="550" cy="170" fill="#ebd6b3" r="7" />
                <circle cx="630" cy="270" r="9" />
                <circle cx="633" cy="292" r="5" />
              </g>

              {/* LETTER: R with liquid melted leg and drooping curve */}
              <g className="letter-r" id="letter-r-group">
                <path
                  className="letter-path"
                  fillRule="evenodd"
                  d="
                    M 710 45 
                    L 815 45 
                    C 860 45, 890 70, 890 115 
                    C 890 150, 868 175, 830 183 
                    L 890 285 
                    C 895 295, 885 305, 870 295 
                    L 805 195 
                    L 775 195 
                    L 775 292 
                    L 710 292 
                    Z
                    M 775 100 
                    L 775 145 
                    L 810 145 
                    C 828 145, 838 135, 838 122 
                    C 838 110, 828 100, 810 100 
                    Z
                  "
                />
                {/* Hanging liquid drops under the R stem */}
                <path
                  d="
                    M 772 230 
                    C 768 260, 755 280, 755 298 
                    C 755 310, 768 310, 772 296 
                    C 778 275, 782 250, 785 230 
                    Z
                  "
                />
                <circle cx="762" cy="305" r="6" />
                <circle cx="764" cy="326" r="3.5" />
              </g>

              {/* LETTER: K with droplet clusters and sharp aesthetic serifs */}
              <g className="letter-k" id="letter-k-group">
                <path
                  className="letter-path"
                  d="
                    M 915 45 
                    L 980 45 
                    L 980 150 
                    L 1045 45 
                    L 1120 45 
                    L 1030 170 
                    L 1130 292 
                    L 1045 292 
                    L 980 190 
                    L 980 292 
                    L 915 292 
                    Z
                  "
                />
                {/* Hanging drops from the base of K */}
                <circle cx="1025" cy="275" r="8" />
                <circle cx="1028" cy="300" r="5" />
                <circle cx="1031" cy="318" r="3" />
                <circle cx="985" cy="310" r="6.5" />
                <circle cx="1115" cy="285" r="5" />
              </g>
            </g>
          </svg>
        </div>
      </main>
      {/* END: MainContent */}

      {/* BEGIN: BottomNavigation */}
      <footer className="relative z-20 w-full pb-3 sm:pb-6 pt-2 px-4 flex items-center justify-center">
        {/* Single Minimalist Clean Line */}
        <div className="flex items-center justify-center gap-2 sm:gap-4 text-[9px] sm:text-[11px] font-mono tracking-[0.16em] sm:tracking-[0.25em] uppercase text-zinc-400 whitespace-nowrap border-t border-zinc-800/60 pt-3 sm:pt-4 px-4 text-center">
          <span className="text-zinc-500">SEÇİLMİŞ PROJELER</span>
          <span className="text-zinc-700">•</span>
          <span className="text-zinc-200 font-semibold">SOFTWARE DEVELOPMENT</span>
          <span className="text-zinc-700">•</span>
          <span className="text-[#ddbf92]">BURAK İTİK</span>
        </div>
      </footer>
      {/* END: BottomNavigation */}

      {/* ========================================================================= */}
      {/* GOLDEN LIQUID WATERFALL DELUGE OVERLAY (Rendered directly into Body)     */}
      {/* ========================================================================= */}
      {mounted &&
        isFlushing &&
        typeof document !== "undefined" &&
        createPortal(
          <div className="fixed inset-0 z-[999999] pointer-events-none overflow-hidden select-none">
            {/* Ambient Screen Flash / Golden Liquid Glow */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.7, 0.85, 0.4, 0] }}
              transition={{ duration: 1.5, times: [0, 0.2, 0.45, 0.8, 1], ease: "easeOut" }}
              className="absolute inset-0 bg-gradient-to-b from-[#ddbf92]/40 via-[#ddbf92]/20 to-transparent backdrop-blur-[2px]"
            />

            {/* Golden Water Sheet / Torrent Cascading Down Across the Entire Page */}
            <motion.div
              initial={{ y: "-100%" }}
              animate={{ y: ["-100%", "0%", "118%"] }}
              transition={{
                duration: 1.55,
                times: [0, 0.45, 1],
                ease: [0.45, 0, 0.2, 1],
              }}
              className="absolute inset-x-0 top-0 h-[125vh] flex flex-col justify-end"
            >
              {/* Massive Molten Golden Fluid Body */}
              <div className="w-full h-full bg-gradient-to-b from-[#ddbf92]/30 via-[#ddbf92]/90 to-[#ddbf92] relative shadow-[0_25px_80px_rgba(221,191,146,0.6)]">
                {/* Vertical fluid stream lines */}
                <div className="absolute inset-0 opacity-40 bg-[repeating-linear-gradient(90deg,transparent,transparent_24px,rgba(255,255,255,0.4)_25px,transparent_26px)] animate-pulse" />
                <div className="absolute inset-0 opacity-30 bg-gradient-to-r from-transparent via-white/60 to-transparent" />
              </div>

              {/* Organic Liquid Drip Wave / Waterfall Crest using SVG with Gooey Filter */}
              <div className="w-full h-56 -mb-1 relative overflow-visible filter drop-shadow-[0_25px_30px_rgba(0,0,0,0.85)]">
                <svg
                  viewBox="0 0 1440 220"
                  preserveAspectRatio="none"
                  className="w-full h-full text-[#ddbf92] fill-current"
                >
                  <path d="M0,0 L1440,0 L1440,80 C1360,160 1280,40 1200,120 C1120,200 1040,60 960,140 C880,220 800,90 720,160 C640,230 560,70 480,150 C400,210 320,80 240,160 C160,230 80,90 0,160 Z" />
                </svg>

                {/* Hanging giant liquid droplets dripping down ahead of the wave */}
                <div className="absolute inset-x-0 bottom-0 flex justify-around items-end h-20 pointer-events-none">
                  {[12, 24, 38, 52, 66, 80, 92].map((leftPct, i) => (
                    <div
                      key={i}
                      className="w-5 h-9 bg-[#ddbf92] rounded-full filter blur-[1px] animate-bounce"
                      style={{
                        animationDuration: `${0.35 + (i % 3) * 0.1}s`,
                        transform: "scaleY(1.6)",
                      }}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          </div>,
          document.body
        )}
    </section>
  );
}
