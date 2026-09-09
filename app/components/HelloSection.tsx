"use client";

import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { RotateCcw, ArrowDown } from "lucide-react";

export default function HelloSection() {
  const [animKey, setAnimKey] = useState(0);
  const [showPrompt, setShowPrompt] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowPrompt(true);
    }, 3200);
    return () => clearTimeout(timer);
  }, [animKey]);

  const handleReplay = useCallback((e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setShowPrompt(false);
    setAnimKey((prev) => prev + 1);
  }, []);

  const handleScrollToNext = useCallback(() => {
    const nextSection = document.getElementById("creative-dev");
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  useEffect(() => {
    let isTransitioning = false;

    const triggerNext = () => {
      if (isTransitioning) return;
      // Only trigger if we are currently at the top (Hello section)
      const currentScroll = window.scrollY || window.pageYOffset || 0;
      if (currentScroll < 120) {
        isTransitioning = true;
        handleScrollToNext();
        setTimeout(() => {
          isTransitioning = false;
        }, 1200);
      }
    };

    // 1. Mouse wheel / trackpad scroll
    const handleWheel = (e: WheelEvent) => {
      if (e.deltaY > 15) {
        triggerNext();
      }
    };

    // 2. Touch gesture (swipe up / scroll down)
    let touchStartY = 0;
    const handleTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
    };
    const handleTouchMove = (e: TouchEvent) => {
      const touchY = e.touches[0].clientY;
      const diff = touchStartY - touchY;
      if (diff > 35) {
        triggerNext();
      }
    };

    // 3. Keyboard controls (Space, ArrowDown, PageDown)
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === "Space" || e.key === "ArrowDown" || e.key === "PageDown") {
        const currentScroll = window.scrollY || window.pageYOffset || 0;
        if (currentScroll < 120) {
          e.preventDefault();
          triggerNext();
        }
      } else if (e.key.toLowerCase() === "r") {
        handleReplay();
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: true });
    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: true });
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleScrollToNext, handleReplay]);

  return (
    <section
      id="hello"
      className="snap-section relative w-full h-screen flex flex-col items-center justify-center bg-[#050505] text-[#dfc3a2] bg-grain select-none overflow-hidden"
    >
      {/* Top System Minimal Bar */}
      <header className="absolute top-0 inset-x-0 h-16 px-6 md:px-12 flex items-center justify-between text-xs tracking-widest uppercase text-[#dfc3a2]/40 z-20">
        <div className="flex items-center space-x-3">
          <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          <span className="font-light tracking-wider text-[11px] text-zinc-400">
            Sistem Aktif · Portfolyo
          </span>
        </div>
        <button
          onClick={handleReplay}
          className="hover:text-zinc-200 transition-colors duration-200 cursor-pointer flex items-center space-x-1.5 opacity-60 hover:opacity-100"
          title="Animasyonu Yeniden Oynat (veya R tuşuna basın)"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span className="text-[10px] tracking-normal capitalize">tekrar oynat</span>
        </button>
      </header>

      {/* Center Stage: The Classic "hello" SVG Canvas */}
      <div
        onClick={handleScrollToNext}
        className="relative z-10 w-full max-w-4xl px-6 flex flex-col items-center justify-center cursor-pointer transition-transform duration-700 active:scale-95"
      >
        <div
          key={animKey}
          className="w-full max-w-2xl hello-glow-container flex items-center justify-center"
        >
          {/* Exact cursive Apple Macintosh ligature representation in vector strokes */}
          <svg
            className="w-full h-auto overflow-visible select-none pointer-events-none drop-shadow-sm"
            fill="none"
            viewBox="0 0 680 320"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient id="warmAppleGold" x1="0%" x2="100%" y1="20%" y2="80%">
                <stop offset="0%" stopColor="#f5e5d3" />
                <stop offset="50%" stopColor="#dfc3a2" />
                <stop offset="100%" stopColor="#cfab85" />
              </linearGradient>
              <filter id="softGlow" width="140%" height="140%" x="-20%" y="-20%">
                <feGaussianBlur in="SourceGraphic" result="blur" stdDeviation="1.5" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Main Continuous Cursive Stroke */}
            <path
              className="stroke-write"
              d="
                M 90 220
                C 80 200, 85 140, 115 78
                C 126 55, 142 42, 148 60
                C 152 75, 142 125, 134 185
                C 130 215, 126 238, 126 238
                C 126 238, 135 186, 160 162
                C 182 140, 206 142, 202 182
                C 198 214, 190 236, 218 236
                C 238 236, 258 210, 274 185
                C 285 168, 290 156, 280 152
                C 264 146, 250 178, 252 205
                C 255 233, 275 238, 305 236
                C 330 234, 345 200, 362 145
                C 378 95, 394 48, 408 55
                C 418 62, 408 110, 392 178
                C 382 222, 382 238, 404 238
                C 426 238, 444 198, 460 148
                C 478 92, 492 46, 508 55
                C 518 64, 506 112, 492 180
                C 482 226, 482 238, 506 238
                C 530 238, 552 215, 570 186
                C 586 160, 582 145, 560 146
                C 534 148, 524 184, 528 210
                C 532 232, 556 238, 580 232
                C 604 224, 626 198, 642 186
              "
              filter="url(#softGlow)"
              id="hello-path"
              stroke="url(#warmAppleGold)"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="12"
            />
          </svg>
        </div>
      </div>

      {/* Ambient Subtle Bottom Controls / Status Indicator */}
      <footer className="absolute bottom-10 inset-x-0 flex flex-col items-center justify-center space-y-3 pointer-events-auto">
        <motion.div
          animate={{ opacity: showPrompt ? 1 : 0 }}
          transition={{ duration: 0.8 }}
          onClick={handleScrollToNext}
          className="text-center cursor-pointer group"
        >
          <div className="flex flex-col items-center gap-1.5">
            <p className="text-xs font-normal tracking-[0.25em] text-[#dfc3a2]/60 group-hover:text-[#dfc3a2] transition-colors uppercase flex items-center gap-2">
              <span>Aşağı kaydırın veya giriş için tıklayın</span>
              <ArrowDown className="w-3.5 h-3.5 group-hover:translate-y-1 transition-transform animate-bounce" />
            </p>
            <p className="text-[10px] tracking-widest uppercase text-[#dfc3a2]/35 flex items-center gap-1">
              <span>veya</span>
              <kbd className="px-1.5 py-0.5 border border-[#dfc3a2]/25 rounded text-[9px] bg-white/5 font-mono text-zinc-300">
                Boşluk (Space)
              </kbd>
              <span>tuşuna basın</span>
            </p>
          </div>
        </motion.div>

        {/* Minimalist presence dot indicator */}
        <div className="flex items-center space-x-1.5 opacity-30">
          <span className="w-1.5 h-1.5 rounded-full bg-[#dfc3a2]"></span>
          <span className="w-1.5 h-1.5 rounded-full bg-[#dfc3a2]/40"></span>
          <span className="w-1.5 h-1.5 rounded-full bg-[#dfc3a2]/20"></span>
        </div>
      </footer>
    </section>
  );
}
